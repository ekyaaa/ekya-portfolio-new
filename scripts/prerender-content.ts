import { AppRoute } from '../src/lib/seo/routes';
import { siteConfig } from '../src/config/siteConfig';
import { getAllArticles, getArticleBySlug, Article } from '../src/data/articles';
import { projectsData, getProjectBySlug, Project } from '../src/data/portfolioData';
import { experienceData, toolboxData } from '../src/data/experience';
import { milestonesData } from '../src/data/milestones';

/**
 * Escapes characters for HTML output.
 */
function escapeHtml(str: string): string {
  return (str || '')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/**
 * Converts markdown body text into clean semantic HTML paragraphs, headings, and code.
 */
function formatMarkdownToHtml(markdown: string): string {
  if (!markdown) return '';

  const blocks = markdown.split(/\n\n+/);
  const htmlBlocks: string[] = [];

  for (const block of blocks) {
    const trimmed = block.trim();
    if (!trimmed) continue;

    // Heading level 3
    if (trimmed.startsWith('### ')) {
      const headingText = trimmed.replace(/^###\s+/, '');
      const id = headingText.toLowerCase().replace(/[^\w]+/g, '-');
      htmlBlocks.push(`<h3 id="${escapeHtml(id)}">${escapeHtml(headingText)}</h3>`);
      continue;
    }

    // Heading level 2
    if (trimmed.startsWith('## ')) {
      const headingText = trimmed.replace(/^##\s+/, '');
      const id = headingText.toLowerCase().replace(/[^\w]+/g, '-');
      htmlBlocks.push(`<h2 id="${escapeHtml(id)}">${escapeHtml(headingText)}</h2>`);
      continue;
    }

    // Unordered List
    if (trimmed.split('\n').every((line) => line.trim().startsWith('- ') || line.trim().startsWith('* '))) {
      const items = trimmed
        .split('\n')
        .map((line) => `<li>${formatInlineMarkdown(line.replace(/^[-*]\s+/, ''))}</li>`)
        .join('');
      htmlBlocks.push(`<ul>${items}</ul>`);
      continue;
    }

    // Regular Paragraph
    htmlBlocks.push(`<p>${formatInlineMarkdown(trimmed)}</p>`);
  }

  return htmlBlocks.join('\n      ');
}

/**
 * Formats inline markdown elements (bold, italic, code, quotes).
 */
function formatInlineMarkdown(text: string): string {
  let res = escapeHtml(text);
  // Inline code: `code`
  res = res.replace(/`([^`]+)`/g, '<code>$1</code>');
  // Bold: **text**
  res = res.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  // Italic: *text*
  res = res.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  return res;
}

/**
 * Generates rich semantic HTML to be injected inside <div id="root"> during static build.
 * This guarantees that non-JS crawlers, AI retrieval engines (ChatGPT, Perplexity, Claude),
 * and standard search bots receive the complete textual content immediately.
 */
export function renderPrerenderedContent(route: AppRoute): string {
  switch (route.type) {
    case 'home':
      return renderHomeHtml();
    case 'articles_index':
      return renderArticlesIndexHtml();
    case 'article_detail': {
      const article = getArticleBySlug(route.slug || '');
      return article ? renderArticleDetailHtml(article) : renderNotFoundHtml();
    }
    case 'project_detail': {
      const project = getProjectBySlug(route.slug || '');
      return project ? renderProjectDetailHtml(project) : renderNotFoundHtml();
    }
    case 'not_found':
    default:
      return renderNotFoundHtml();
  }
}

function renderHomeHtml(): string {
  const articles = getAllArticles();

  const projectsHtml = projectsData
    .map(
      (p) => `
        <article class="prerender-project-card" style="margin-bottom: 2rem;">
          <h3><a href="/projects/${p.slug}">${escapeHtml(p.index)} &bull; ${escapeHtml(p.title)} (${escapeHtml(p.year)})</a></h3>
          <p><strong>Role:</strong> ${escapeHtml(p.role)} &bull; <strong>Category:</strong> ${escapeHtml(p.category || 'System')}</p>
          <p>${escapeHtml(p.shortDescription || p.description || p.intro)}</p>
          <p><strong>Tech Stack:</strong> ${escapeHtml(p.stack.join(', '))}</p>
          <p><a href="/projects/${p.slug}">Read complete ${escapeHtml(p.title)} engineering case study &rarr;</a></p>
        </article>
      `
    )
    .join('');

  const experienceHtml = experienceData
    .map(
      (exp) => `
        <article class="prerender-experience-item" style="margin-bottom: 2rem;">
          <h3>${escapeHtml(exp.role)} &mdash; <a href="${escapeHtml(exp.companyUrl)}" target="_blank" rel="noopener noreferrer">${escapeHtml(exp.company)}</a> ${exp.affiliation ? `(${escapeHtml(exp.affiliation)})` : ''}</h3>
          <p class="meta">${escapeHtml(exp.startDate)} &ndash; ${escapeHtml(exp.endDate)} | ${escapeHtml(exp.location)} (${escapeHtml(exp.employmentType)})</p>
          <p>${escapeHtml(exp.summary)}</p>
          <ul>
            ${exp.responsibilities.map((r) => `<li>${escapeHtml(r)}</li>`).join('')}
          </ul>
          <p><strong>Technologies:</strong> ${escapeHtml(exp.tools.join(', '))}</p>
        </article>
      `
    )
    .join('');

  const toolboxHtml = toolboxData
    .map(
      (tb) => `
        <div class="prerender-toolbox-group" style="margin-bottom: 1.5rem;">
          <h4>${escapeHtml(tb.category)}</h4>
          <p><strong>Primary:</strong> ${escapeHtml(tb.items.join(', '))}</p>
          ${tb.supporting ? `<p><strong>Supporting &amp; Tooling:</strong> ${escapeHtml(tb.supporting.join(', '))}</p>` : ''}
        </div>
      `
    )
    .join('');

  const milestonesHtml = milestonesData
    .map(
      (m) => `
        <article class="prerender-milestone-item" style="margin-bottom: 1.5rem;">
          <h4>${escapeHtml(m.title)} (${escapeHtml(m.sortDate)})</h4>
          <p><strong>Result:</strong> ${escapeHtml(m.result)} | <strong>Scope:</strong> ${escapeHtml(m.scope)}</p>
          <p><strong>Organizer:</strong> ${escapeHtml(m.organizer)}</p>
          <p>${escapeHtml(m.summary)}</p>
          ${m.links?.verification ? `<p><a href="${escapeHtml(m.links.verification)}" target="_blank" rel="noopener noreferrer">${escapeHtml(m.links.verificationLabel || 'Certificate Verification')} &rarr;</a></p>` : ''}
        </article>
      `
    )
    .join('');

  const articlesListHtml = articles
    .map(
      (a) => `
        <article class="prerender-article-summary" style="margin-bottom: 1.5rem;">
          <h3><a href="/articles/${a.slug}">${escapeHtml(a.title)}</a></h3>
          <p class="meta">Category: ${escapeHtml(a.category)} &bull; Published: ${escapeHtml(a.publishedDate)} &bull; ${escapeHtml(a.readingTime)}</p>
          <p>${escapeHtml(a.excerpt)}</p>
          <p><a href="/articles/${a.slug}">Read article &rarr;</a></p>
        </article>
      `
    )
    .join('');

  return `
    <div class="prerender-wrapper" style="max-width: 960px; margin: 0 auto; padding: 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #454649;">
      <header style="margin-bottom: 40px; border-bottom: 1px solid #D4D4D6; padding-bottom: 20px;">
        <nav aria-label="Main Navigation">
          <ul style="list-style: none; display: flex; flex-wrap: wrap; gap: 16px; padding: 0; margin: 0; font-size: 14px;">
            <li><a href="#about" style="color: #3D4769; text-decoration: none;">1. About</a></li>
            <li><a href="#work" style="color: #3D4769; text-decoration: none;">2. Portfolio</a></li>
            <li><a href="#experience" style="color: #3D4769; text-decoration: none;">3. Experience</a></li>
            <li><a href="#expertise" style="color: #3D4769; text-decoration: none;">4. Expertise</a></li>
            <li><a href="#process" style="color: #3D4769; text-decoration: none;">5. Process</a></li>
            <li><a href="#milestones" style="color: #3D4769; text-decoration: none;">6. Milestones</a></li>
            <li><a href="/articles" style="color: #3D4769; text-decoration: none;">7. Articles</a></li>
            <li><a href="#contact" style="color: #3D4769; text-decoration: none;">8. Contact</a></li>
          </ul>
        </nav>
      </header>

      <main>
        <section id="hero" style="margin-bottom: 60px;">
          <h1 style="font-size: 2.75rem; line-height: 1.1; margin-bottom: 8px; color: #1a1a1a;">${escapeHtml(siteConfig.name)}</h1>
          <p style="font-size: 1.25rem; color: #3D4769; font-weight: 500; margin-top: 0;">${escapeHtml(siteConfig.role)}</p>
          <p style="font-size: 1.1rem; max-width: 680px; margin-bottom: 20px;">${escapeHtml(siteConfig.tagline)}</p>
          <p style="max-width: 680px; color: #62635B;">${escapeHtml(siteConfig.bio)}</p>
        </section>

        <section id="about" style="margin-bottom: 60px;">
          <h2 style="font-size: 1.75rem; border-bottom: 1px solid #D4D4D6; padding-bottom: 8px; color: #1a1a1a;">About &amp; Engineering Approach</h2>
          <p>I focus on understanding operational workflows before selecting frameworks. In production, code is only one part of a larger chain: identifying constraints, designing data structures, building APIs, deploying to Linux servers, and maintaining systems over time.</p>
          <p>My work combines deep backend development (PostgreSQL optimization, Redis queues, Django, FastAPI), offline-first architectures (SQLite, Flutter), and modern web engineering (TypeScript, React, GSAP).</p>
        </section>

        <section id="work" style="margin-bottom: 60px;">
          <h2 style="font-size: 1.75rem; border-bottom: 1px solid #D4D4D6; padding-bottom: 8px; color: #1a1a1a;">Selected Work &amp; Case Studies</h2>
          ${projectsHtml}
        </section>

        <section id="experience" style="margin-bottom: 60px;">
          <h2 style="font-size: 1.75rem; border-bottom: 1px solid #D4D4D6; padding-bottom: 8px; color: #1a1a1a;">Work Experience</h2>
          ${experienceHtml}
        </section>

        <section id="expertise" style="margin-bottom: 60px;">
          <h2 style="font-size: 1.75rem; border-bottom: 1px solid #D4D4D6; padding-bottom: 8px; color: #1a1a1a;">Technical Toolbox &amp; Capabilities</h2>
          ${toolboxHtml}
        </section>

        <section id="milestones" style="margin-bottom: 60px;">
          <h2 style="font-size: 1.75rem; border-bottom: 1px solid #D4D4D6; padding-bottom: 8px; color: #1a1a1a;">Verified Milestones &amp; Achievements</h2>
          ${milestonesHtml}
        </section>

        <section id="articles" style="margin-bottom: 60px;">
          <h2 style="font-size: 1.75rem; border-bottom: 1px solid #D4D4D6; padding-bottom: 8px; color: #1a1a1a;">Articles &amp; Engineering Reflections</h2>
          ${articlesListHtml}
          <p><a href="/articles" style="font-weight: 500; color: #3D4769;">Browse full article archive &rarr;</a></p>
        </section>

        <section id="contact" style="margin-bottom: 60px;">
          <h2 style="font-size: 1.75rem; border-bottom: 1px solid #D4D4D6; padding-bottom: 8px; color: #1a1a1a;">Contact &amp; Profiles</h2>
          <p>Feel free to reach out directly regarding engineering collaborations, backend architecture, or system analysis:</p>
          <ul>
            <li><strong>Email:</strong> <a href="mailto:${escapeHtml(siteConfig.email)}">${escapeHtml(siteConfig.email)}</a></li>
            <li><strong>GitHub:</strong> <a href="${escapeHtml(siteConfig.socials.github)}" target="_blank" rel="noopener noreferrer">${escapeHtml(siteConfig.socials.github)}</a></li>
            <li><strong>LinkedIn:</strong> <a href="${escapeHtml(siteConfig.socials.linkedin)}" target="_blank" rel="noopener noreferrer">${escapeHtml(siteConfig.socials.linkedin)}</a></li>
          </ul>
        </section>
      </main>

      <footer style="border-top: 1px solid #D4D4D6; padding-top: 20px; font-size: 14px; color: #817A75;">
        <p>&copy; ${new Date().getFullYear()} ${escapeHtml(siteConfig.name)}. Location: ${escapeHtml(siteConfig.location)}.</p>
      </footer>
    </div>
  `;
}

function renderArticlesIndexHtml(): string {
  const articles = getAllArticles();

  const articlesList = articles
    .map(
      (a, i) => `
        <article class="prerender-article-card" style="margin-bottom: 2.5rem; border-bottom: 1px solid #E5E5E7; padding-bottom: 1.5rem;">
          <div style="font-size: 13px; color: #817A75; margin-bottom: 4px;">
            <span>#${(i + 1).toString().padStart(2, '0')}</span> &bull;
            <span>${escapeHtml(a.category)}</span> &bull;
            <time datetime="${escapeHtml(a.publishedDate)}">${escapeHtml(a.publishedDate)}</time> &bull;
            <span>${escapeHtml(a.readingTime)}</span>
          </div>
          <h2 style="font-size: 1.5rem; margin: 4px 0 8px 0;"><a href="/articles/${a.slug}" style="color: #1a1a1a; text-decoration: none;">${escapeHtml(a.title)}</a></h2>
          <p style="margin: 0 0 10px 0; color: #454649;">${escapeHtml(a.excerpt)}</p>
          <p style="font-size: 13px; color: #817A75; margin: 0 0 8px 0;">Tags: ${escapeHtml(a.tags.join(', '))}</p>
          <a href="/articles/${a.slug}" style="color: #3D4769; font-weight: 500; font-size: 14px;">Read complete note &rarr;</a>
        </article>
      `
    )
    .join('');

  return `
    <div class="prerender-wrapper" style="max-width: 860px; margin: 0 auto; padding: 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #454649;">
      <nav aria-label="Breadcrumb" style="margin-bottom: 24px;">
        <a href="/" style="color: #3D4769; text-decoration: none; font-size: 14px;">&larr; Back to Portfolio</a>
      </nav>

      <header style="margin-bottom: 40px; border-bottom: 1px solid #D4D4D6; padding-bottom: 20px;">
        <h1 style="font-size: 2.25rem; margin-bottom: 8px; color: #1a1a1a;">Articles &amp; Engineering Notes</h1>
        <p style="font-size: 1.1rem; color: #62635B; margin-top: 0;">
          Technical case studies, system debugging, and engineering reflections on backend scalability, AI workflows, and software under real constraints.
        </p>
        <p style="font-size: 14px; color: #817A75;">By <strong>${escapeHtml(siteConfig.name)}</strong> &bull; ${articles.length} published notes</p>
      </header>

      <main>
        ${articlesList}
      </main>

      <footer style="margin-top: 40px; border-top: 1px solid #D4D4D6; padding-top: 20px; font-size: 14px;">
        <a href="/" style="color: #3D4769; text-decoration: none;">&larr; Return to Portfolio Home</a>
      </footer>
    </div>
  `;
}

function renderArticleDetailHtml(article: Article): string {
  const formattedBody = formatMarkdownToHtml(article.body);

  return `
    <div class="prerender-wrapper" style="max-width: 820px; margin: 0 auto; padding: 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.7; color: #454649;">
      <nav aria-label="Breadcrumb" style="margin-bottom: 24px; font-size: 14px;">
        <a href="/" style="color: #3D4769; text-decoration: none;">Home</a> &gt;
        <a href="/articles" style="color: #3D4769; text-decoration: none;">Articles</a> &gt;
        <span style="color: #817A75;">${escapeHtml(article.title)}</span>
      </nav>

      <article>
        <header style="margin-bottom: 32px; border-bottom: 1px solid #D4D4D6; padding-bottom: 24px;">
          <div style="font-size: 13px; color: #817A75; margin-bottom: 8px;">
            <span style="background: #F5F4F2; padding: 2px 8px; border-radius: 4px; color: #3D4769; font-weight: 500;">${escapeHtml(article.category)}</span>
            &bull;
            <span>Published on <time datetime="${escapeHtml(article.publishedDate)}">${escapeHtml(article.publishedDate)}</time></span>
            &bull;
            <span>${escapeHtml(article.readingTime)} (${article.wordCount} words)</span>
            &bull;
            <span>Author: <strong>${escapeHtml(siteConfig.name)}</strong></span>
          </div>

          <h1 style="font-size: 2.25rem; line-height: 1.2; margin: 12px 0; color: #1a1a1a;">${escapeHtml(article.title)}</h1>
          <p style="font-size: 1.15rem; color: #62635B; font-style: italic; margin-top: 0;">${escapeHtml(article.excerpt)}</p>

          <div style="font-size: 13px; color: #817A75; margin-top: 12px;">
            Tags: ${escapeHtml(article.tags.map((t) => `#${t}`).join(' '))}
          </div>
        </header>

        <div class="article-content" style="font-size: 1.05rem;">
          ${formattedBody}
        </div>

        <footer style="margin-top: 48px; border-top: 1px solid #D4D4D6; padding-top: 24px;">
          <div style="display: flex; justify-content: space-between; flex-wrap: wrap; gap: 16px; font-size: 14px;">
            <a href="/articles" style="color: #3D4769; text-decoration: none; font-weight: 500;">&larr; View all articles in index</a>
            <a href="/" style="color: #3D4769; text-decoration: none;">Return to Portfolio Home &rarr;</a>
          </div>
        </footer>
      </article>
    </div>
  `;
}

function renderProjectDetailHtml(project: Project): string {
  const overviewHtml = (project.overview || []).map((p) => `<p>${escapeHtml(p)}</p>`).join('\n');
  const challengeHtml = (project.challenge || []).map((p) => `<p>${escapeHtml(p)}</p>`).join('\n');

  const decisionsHtml = (project.technicalDecisions || [])
    .map(
      (d) => `
        <div style="margin-bottom: 1.25rem; padding: 16px; background: #F5F4F2; border-radius: 6px;">
          <h4 style="margin: 0 0 6px 0; font-size: 1.05rem; color: #1a1a1a;">${escapeHtml(d.title)}</h4>
          <p style="margin: 0; font-size: 0.95rem; color: #454649;">${escapeHtml(d.description)}</p>
        </div>
      `
    )
    .join('');

  const contributionsHtml = (project.contributions || [])
    .map(
      (c) => `
        <div style="margin-bottom: 1.25rem; padding: 16px; background: #F5F4F2; border-radius: 6px;">
          <h4 style="margin: 0 0 6px 0; font-size: 1.05rem; color: #1a1a1a;">${escapeHtml(c.title)}</h4>
          <p style="margin: 0; font-size: 0.95rem; color: #454649;">${escapeHtml(c.description)}</p>
        </div>
      `
    )
    .join('');

  const metricsHtml = (project.metrics || [])
    .map(
      (m) => `
        <div style="padding: 12px 16px; border: 1px solid #D4D4D6; border-radius: 6px; text-align: center; flex: 1 1 140px;">
          <div style="font-size: 1.5rem; font-weight: bold; color: #3D4769;">${escapeHtml(m.value)}</div>
          <div style="font-size: 0.85rem; color: #817A75;">${escapeHtml(m.label)}</div>
        </div>
      `
    )
    .join('');

  const linksHtml: string[] = [];
  if (project.liveUrl) {
    linksHtml.push(`<a href="${escapeHtml(project.liveUrl)}" target="_blank" rel="noopener noreferrer" style="color: #3D4769; font-weight: 500;">Live Demo ↗</a>`);
  }
  if (project.repositoryUrl) {
    linksHtml.push(`<a href="${escapeHtml(project.repositoryUrl)}" target="_blank" rel="noopener noreferrer" style="color: #3D4769; font-weight: 500;">GitHub Repository ↗</a>`);
  }
  if (project.companyUrl) {
    linksHtml.push(`<a href="${escapeHtml(project.companyUrl)}" target="_blank" rel="noopener noreferrer" style="color: #3D4769; font-weight: 500;">Company / Host ↗</a>`);
  }

  return `
    <div class="prerender-wrapper" style="max-width: 900px; margin: 0 auto; padding: 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.7; color: #454649;">
      <nav aria-label="Breadcrumb" style="margin-bottom: 24px; font-size: 14px;">
        <a href="/" style="color: #3D4769; text-decoration: none;">Home</a> &gt;
        <a href="/#work" style="color: #3D4769; text-decoration: none;">Portfolio</a> &gt;
        <span style="color: #817A75;">${escapeHtml(project.title)}</span>
      </nav>

      <article>
        <header style="margin-bottom: 32px; border-bottom: 1px solid #D4D4D6; padding-bottom: 24px;">
          <div style="font-size: 13px; color: #817A75; margin-bottom: 8px;">
            <span>Project ${escapeHtml(project.index || project.number || '01')}</span> &bull;
            <span>Year: ${escapeHtml(project.year)}</span> &bull;
            <span>Role: <strong>${escapeHtml(project.role)}</strong></span>
            ${project.category ? `&bull; <span>${escapeHtml(project.category)}</span>` : ''}
            ${project.collaborationType ? `&bull; <span>${escapeHtml(project.collaborationType)}</span>` : ''}
          </div>

          <h1 style="font-size: 2.5rem; line-height: 1.2; margin: 8px 0; color: #1a1a1a;">${escapeHtml(project.title)}</h1>
          <p style="font-size: 1.15rem; color: #62635B; margin-top: 0;">${escapeHtml(project.shortDescription || project.description || project.intro)}</p>

          ${linksHtml.length > 0 ? `<div style="display: flex; gap: 16px; margin-top: 16px;">${linksHtml.join(' &bull; ')}</div>` : ''}
        </header>

        ${metricsHtml ? `<section style="display: flex; flex-wrap: wrap; gap: 12px; margin-bottom: 36px;" aria-label="Key project metrics">${metricsHtml}</section>` : ''}

        ${overviewHtml ? `
          <section style="margin-bottom: 36px;">
            <h2 style="font-size: 1.5rem; border-bottom: 1px solid #D4D4D6; padding-bottom: 6px; color: #1a1a1a;">System Overview</h2>
            ${overviewHtml}
          </section>
        ` : ''}

        ${challengeHtml ? `
          <section style="margin-bottom: 36px;">
            <h2 style="font-size: 1.5rem; border-bottom: 1px solid #D4D4D6; padding-bottom: 6px; color: #1a1a1a;">Architectural &amp; Technical Challenges</h2>
            ${challengeHtml}
          </section>
        ` : ''}

        ${decisionsHtml ? `
          <section style="margin-bottom: 36px;">
            <h2 style="font-size: 1.5rem; border-bottom: 1px solid #D4D4D6; padding-bottom: 6px; color: #1a1a1a;">Key Architectural Decisions</h2>
            ${decisionsHtml}
          </section>
        ` : ''}

        ${contributionsHtml ? `
          <section style="margin-bottom: 36px;">
            <h2 style="font-size: 1.5rem; border-bottom: 1px solid #D4D4D6; padding-bottom: 6px; color: #1a1a1a;">Engineering Contributions</h2>
            ${contributionsHtml}
          </section>
        ` : ''}

        <section style="margin-bottom: 36px;">
          <h2 style="font-size: 1.5rem; border-bottom: 1px solid #D4D4D6; padding-bottom: 6px; color: #1a1a1a;">Technologies &amp; Core Stack</h2>
          <p>${escapeHtml(project.stack.join(' &bull; '))}</p>
        </section>

        <footer style="margin-top: 48px; border-top: 1px solid #D4D4D6; padding-top: 24px;">
          <div style="display: flex; justify-content: space-between; flex-wrap: wrap; gap: 16px; font-size: 14px;">
            <a href="/#work" style="color: #3D4769; text-decoration: none; font-weight: 500;">&larr; Back to Portfolio Showcase</a>
            <a href="/articles" style="color: #3D4769; text-decoration: none;">Explore Technical Articles &rarr;</a>
          </div>
        </footer>
      </article>
    </div>
  `;
}

function renderNotFoundHtml(): string {
  return `
    <div class="prerender-wrapper" style="max-width: 600px; margin: 60px auto; padding: 24px; text-align: center; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #454649;">
      <h1 style="font-size: 2rem; color: #1a1a1a;">Page Not Found</h1>
      <p>The requested page does not exist or has been moved.</p>
      <p><a href="/" style="color: #3D4769; font-weight: 500; text-decoration: none;">&larr; Return to Portfolio Home</a></p>
    </div>
  `;
}
