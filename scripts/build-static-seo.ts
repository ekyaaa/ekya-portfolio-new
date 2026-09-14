import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { getAllRoutes, getIndexableRoutes, AppRoute } from '../src/lib/seo/routes';
import {
  buildHomeMetadata,
  buildArticlesIndexMetadata,
  buildArticleMetadata,
  buildProjectMetadata,
  buildNotFoundMetadata,
  PageMetadata,
} from '../src/lib/seo/metadata';
import { getArticleBySlug, getAllArticles } from '../src/data/articles';
import { getProjectBySlug, projectsData } from '../src/data/portfolioData';
import { resolveSiteUrl, DEFAULT_PRODUCTION_DOMAIN, siteConfig } from '../src/config/siteConfig';
import { renderPrerenderedContent } from './prerender-content';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const DIST_DIR = path.resolve(ROOT_DIR, 'dist');
const PUBLIC_DIR = path.resolve(ROOT_DIR, 'public');

// Resolve Production Site URL
const rawEnvUrl = process.env.SITE_URL || process.env.VITE_SITE_URL;
const siteUrl = resolveSiteUrl(rawEnvUrl, true);

console.log('\n========================================');
console.log('  [SEO & AI Discovery Build] Static HTML, Feeds & Metadata Generator');
console.log('========================================');
console.log(`[SEO Build] Resolved SITE_URL: ${siteUrl}`);
if (!rawEnvUrl) {
  console.warn(
    `[SEO Build] Notice: SITE_URL environment variable was not set.\n` +
    `            Defaulting to '${DEFAULT_PRODUCTION_DOMAIN}'.\n` +
    `            MANUAL ACTION REQUIRED: Set SITE_URL in your production host dashboard if domain differs.`
  );
}

// Ensure dist directory exists
if (!fs.existsSync(DIST_DIR)) {
  console.error('[SEO Build] Error: dist/ directory not found. Please run "vite build" first.');
  process.exit(1);
}

const templatePath = path.resolve(DIST_DIR, 'index.html');
if (!fs.existsSync(templatePath)) {
  console.error('[SEO Build] Error: dist/index.html not found.');
  process.exit(1);
}
const baseHtml = fs.readFileSync(templatePath, 'utf-8');

/**
 * Escapes characters for XML/HTML output.
 */
function escapeXml(str: string): string {
  return (str || '')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function escapeHtml(str: string): string {
  return (str || '')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/**
 * Injects metadata, Open Graph, Twitter cards, JSON-LD, and route-specific
 * prerendered semantic HTML into the HTML template.
 */
function generateHtmlForRoute(route: AppRoute, metadata: PageMetadata): string {
  let html = baseHtml;

  // 1. Replace or insert <title>
  if (html.includes('<title>')) {
    html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(metadata.title)}</title>`);
  } else {
    html = html.replace('</head>', `  <title>${escapeHtml(metadata.title)}</title>\n</head>`);
  }

  // 2. Replace or insert description
  const descMeta = `<meta name="description" content="${escapeHtml(metadata.description)}" />`;
  if (html.includes('name="description"')) {
    html = html.replace(/<meta\s+name="description"[\s\S]*?>/i, descMeta);
  } else {
    html = html.replace('</head>', `  ${descMeta}\n</head>`);
  }

  // 3. Replace or insert robots
  const robotsMeta = `<meta name="robots" content="${escapeHtml(metadata.robots)}" />`;
  if (html.includes('name="robots"')) {
    html = html.replace(/<meta\s+name="robots"[\s\S]*?>/i, robotsMeta);
  } else {
    html = html.replace('</head>', `  ${robotsMeta}\n</head>`);
  }

  // 4. Build additional head tags
  const headAdditions: string[] = [];

  // Canonical Link
  headAdditions.push(`<link rel="canonical" href="${escapeHtml(metadata.canonicalUrl)}" />`);

  // RSS Feed discovery
  headAdditions.push(`<link rel="alternate" type="application/rss+xml" title="Ekya Muhammad - Articles RSS Feed" href="${siteUrl}/rss.xml" />`);

  // Open Graph
  headAdditions.push(`<meta property="og:title" content="${escapeHtml(metadata.ogTitle)}" />`);
  headAdditions.push(`<meta property="og:description" content="${escapeHtml(metadata.ogDescription)}" />`);
  headAdditions.push(`<meta property="og:type" content="${escapeHtml(metadata.ogType)}" />`);
  headAdditions.push(`<meta property="og:url" content="${escapeHtml(metadata.ogUrl)}" />`);
  headAdditions.push(`<meta property="og:image" content="${escapeHtml(metadata.ogImage)}" />`);
  headAdditions.push(`<meta property="og:image:alt" content="${escapeHtml(metadata.ogImageAlt)}" />`);
  headAdditions.push(`<meta property="og:site_name" content="Ekya Muhammad Portfolio" />`);
  headAdditions.push(`<meta property="og:locale" content="en_US" />`);

  // Twitter / X Cards
  headAdditions.push(`<meta name="twitter:card" content="${escapeHtml(metadata.twitterCard)}" />`);
  headAdditions.push(`<meta name="twitter:title" content="${escapeHtml(metadata.ogTitle)}" />`);
  headAdditions.push(`<meta name="twitter:description" content="${escapeHtml(metadata.ogDescription)}" />`);
  headAdditions.push(`<meta name="twitter:image" content="${escapeHtml(metadata.ogImage)}" />`);
  headAdditions.push(`<meta name="twitter:image:alt" content="${escapeHtml(metadata.ogImageAlt)}" />`);

  // JSON-LD Structured Data (if any schemas exist)
  if (metadata.schemas && metadata.schemas.length > 0) {
    const payload = metadata.schemas.length === 1
      ? metadata.schemas[0]
      : { '@context': 'https://schema.org', '@graph': metadata.schemas };
    headAdditions.push(
      `<script type="application/ld+json" id="seo-jsonld-schema">\n${JSON.stringify(payload, null, 2)}\n</script>`
    );
  }

  const injection = headAdditions.map((tag) => `    ${tag}`).join('\n');
  html = html.replace('</head>', `${injection}\n  </head>`);

  // 5. Inject route-specific semantic HTML into <div id="root">
  const prerenderBody = renderPrerenderedContent(route);
  if (html.includes('<div id="root"></div>')) {
    html = html.replace('<div id="root"></div>', `<div id="root">${prerenderBody}</div>`);
  } else if (html.includes('<div id="root">')) {
    html = html.replace(/<div id="root">[\s\S]*?<\/div>/i, `<div id="root">${prerenderBody}</div>`);
  }

  return html;
}

/**
 * Resolves metadata for a specific route.
 */
function getMetadataForRoute(route: AppRoute): PageMetadata {
  const ctx = { siteUrl };

  switch (route.type) {
    case 'home':
      return buildHomeMetadata(ctx);
    case 'articles_index':
      return buildArticlesIndexMetadata(getAllArticles().length, ctx);
    case 'article_detail': {
      const article = getArticleBySlug(route.slug || '');
      if (article) return buildArticleMetadata(article, ctx);
      return buildNotFoundMetadata(ctx);
    }
    case 'project_detail': {
      const project = getProjectBySlug(route.slug || '');
      if (project) return buildProjectMetadata(project, ctx);
      return buildNotFoundMetadata(ctx);
    }
    case 'not_found':
    default:
      return buildNotFoundMetadata(ctx);
  }
}

// 1. Generate Static HTML files for each route
const allRoutes = getAllRoutes();
console.log(`[SEO Build] Generating static HTML with prerendered semantic body for ${allRoutes.length} routes...`);

for (const route of allRoutes) {
  const metadata = getMetadataForRoute(route);
  const htmlContent = generateHtmlForRoute(route, metadata);

  let targetPath: string;

  if (route.path === '/') {
    targetPath = path.resolve(DIST_DIR, 'index.html');
  } else if (route.path === '/404') {
    targetPath = path.resolve(DIST_DIR, '404.html');
  } else {
    // Clean route directory with index.html for clean URL serving
    const routeSubdir = path.resolve(DIST_DIR, route.path.replace(/^\/+/, ''));
    fs.mkdirSync(routeSubdir, { recursive: true });
    targetPath = path.resolve(routeSubdir, 'index.html');
  }

  fs.writeFileSync(targetPath, htmlContent, 'utf-8');
  console.log(`  ✓ ${route.path.padEnd(55)} -> ${path.relative(ROOT_DIR, targetPath)}`);
}

// 2. Generate sitemap.xml with accurate lastmod
console.log('\n[SEO Build] Generating sitemap.xml with verified timestamps...');
const indexableRoutes = getIndexableRoutes();

const sitemapEntries = indexableRoutes
  .map((route) => {
    const loc = `${siteUrl}${route.path === '/' ? '' : route.path}`;
    const changefreq = `<changefreq>${route.changefreq}</changefreq>`;
    const priority = `<priority>${route.priority.toFixed(1)}</priority>`;
    const lastmod = route.lastmod ? `\n    <lastmod>${route.lastmod}</lastmod>` : '';

    return `  <url>\n    <loc>${loc}</loc>${lastmod}\n    ${changefreq}\n    ${priority}\n  </url>`;
  })
  .join('\n');

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries}
</urlset>
`;

fs.writeFileSync(path.resolve(DIST_DIR, 'sitemap.xml'), sitemapXml, 'utf-8');
fs.writeFileSync(path.resolve(PUBLIC_DIR, 'sitemap.xml'), sitemapXml, 'utf-8');
console.log(`  ✓ Created sitemap.xml with ${indexableRoutes.length} canonical URLs.`);

// 3. Generate robots.txt
console.log('\n[SEO Build] Generating robots.txt for search & AI discovery...');
const robotsTxt = `# Production robots.txt for Ekya Muhammad Portfolio
# Standards-compliant crawling policy for search and retrieval systems

User-agent: *
Allow: /

# General Search Engines
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

# AI Search & Retrieval Bots (Search discoverability only; training bots unchanged)
User-agent: OAI-SearchBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Claude-SearchBot
Allow: /

User-agent: Claude-User
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`;

fs.writeFileSync(path.resolve(DIST_DIR, 'robots.txt'), robotsTxt, 'utf-8');
fs.writeFileSync(path.resolve(PUBLIC_DIR, 'robots.txt'), robotsTxt, 'utf-8');
console.log('  ✓ Created robots.txt referencing sitemap.');

// 4. Generate RSS 2.0 Feed
console.log('\n[SEO Build] Generating RSS 2.0 Feed (rss.xml)...');
const articles = getAllArticles();
const latestDate = new Date(articles[articles.length - 1]?.publishedDate || '2026-09-08').toUTCString();

const rssItems = articles
  .map((a) => {
    const pubDate = new Date(a.publishedDate).toUTCString();
    const articleUrl = `${siteUrl}/articles/${a.slug}`;
    return `    <item>
      <title>${escapeXml(a.title)}</title>
      <link>${articleUrl}</link>
      <guid isPermaLink="true">${articleUrl}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${escapeXml(a.excerpt)}</description>
      <category>${escapeXml(a.category)}</category>
      <author>${escapeXml(siteConfig.email)} (${escapeXml(siteConfig.name)})</author>
    </item>`;
  })
  .join('\n');

const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(siteConfig.name)} — Articles &amp; Engineering Notes</title>
    <link>${siteUrl}/articles</link>
    <description>Technical case studies, system debugging, and engineering reflections on backend scalability, AI workflows, and software under real constraints.</description>
    <language>en-us</language>
    <lastBuildDate>${latestDate}</lastBuildDate>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml"/>
${rssItems}
  </channel>
</rss>
`;

fs.writeFileSync(path.resolve(DIST_DIR, 'rss.xml'), rssXml, 'utf-8');
fs.writeFileSync(path.resolve(PUBLIC_DIR, 'rss.xml'), rssXml, 'utf-8');
console.log(`  ✓ Created rss.xml with ${articles.length} published articles.`);

// 5. Generate llms.txt and llms-full.txt
console.log('\n[SEO Build] Generating llms.txt & llms-full.txt for LLM retrieval...');

const llmsTxt = `# Ekya Muhammad — Portfolio & Engineering Knowledge Base

> System Analyst & Full-Stack Developer specializing in high-performance digital systems, workflow automation, backend architectures, and developer tooling.

## Personal & Entity Overview
- Name: ${siteConfig.name}
- Role: ${siteConfig.role}
- Location: ${siteConfig.location}
- Bio: ${siteConfig.bio}
- Primary Stack: TypeScript, React, Next.js, Python (Django, FastAPI), PostgreSQL, Redis, Linux (Ubuntu/Nginx), GSAP, Flutter, SQLite
- Education: Politeknik Negeri Malang (Polinema)
- Professional Affiliations:
  - PT Surabaya Autocomp Indonesia (Yazaki Group) — Software Developer Intern (PPC & IC)
  - NexaCode — Freelance Software Developer (Offline POS, full-stack systems)

## Key Technical Case Studies
${projectsData.map((p) => `- [${p.title}](${siteUrl}/projects/${p.slug}): ${p.shortDescription || p.intro}`).join('\n')}

## Engineering Articles & Notes
${articles.map((a) => `- [${a.title}](${siteUrl}/articles/${a.slug}): ${a.excerpt}`).join('\n')}

## Verified Milestones & Achievements
- 2nd Place (Juara 2) — E-Government Poster at KMIPN VIII 2026 (National, Hosted by Politeknik Negeri Lampung / Bakorma)
- Top 15 Finalist — Hackathon at BytesFest 2026 (National, Hosted by UNS Surakarta, Verification: https://kegiatan.fkip.uns.ac.id/verify/20260726060490167)
- 1st Place (Juara 1) — Web Development at Intercomp 2026 (Politeknik Negeri Malang)
- 3rd Place Best Solver — Hackathon Web Application at PLAY IT! 2026 (Politeknik Negeri Malang)
- 2nd Place (Juara 2 Inovasi Kerja Sama Tim) at KMIPN VII 2025 (National, Certificate No. 554/PL9/KM.01.02/2025)
- Juara Harapan 2 — English News Casting at Intercomp 2024

## Verified Profiles & Contact
- Website: ${siteUrl}
- GitHub: ${siteConfig.socials.github}
- LinkedIn: ${siteConfig.socials.linkedin}
- Email: ${siteConfig.email}

## Machine-Readable Extensions
- Full Text Markdown Corpus: [llms-full.txt](${siteUrl}/llms-full.txt)
- RSS 2.0 Feed: [rss.xml](${siteUrl}/rss.xml)
- Sitemap: [sitemap.xml](${siteUrl}/sitemap.xml)
`;

fs.writeFileSync(path.resolve(DIST_DIR, 'llms.txt'), llmsTxt, 'utf-8');
fs.writeFileSync(path.resolve(PUBLIC_DIR, 'llms.txt'), llmsTxt, 'utf-8');
console.log('  ✓ Created llms.txt');

// Generate complete markdown corpus for llms-full.txt
const fullProjectsSection = projectsData
  .map(
    (p) => `
### ${p.title} (${p.year})
- URL: ${siteUrl}/projects/${p.slug}
- Role: ${p.role}
- Category: ${p.category}
- Collaboration: ${p.collaborationType}
- Stack: ${p.stack.join(', ')}
${p.liveUrl ? `- Live Demo: ${p.liveUrl}` : ''}
${p.repositoryUrl ? `- Repository: ${p.repositoryUrl}` : ''}

#### Overview
${(p.overview || []).join('\n\n')}

#### Challenges
${(p.challenge || []).join('\n\n')}

#### Architectural Decisions
${(p.technicalDecisions || []).map((d) => `* **${d.title}**: ${d.description}`).join('\n')}

#### Engineering Contributions
${(p.contributions || []).map((c) => `* **${c.title}**: ${c.description}`).join('\n')}
`
  )
  .join('\n---\n');

const fullArticlesSection = articles
  .map(
    (a) => `
### ${a.title}
- URL: ${siteUrl}/articles/${a.slug}
- Category: ${a.category}
- Published: ${a.publishedDate}
- Reading Time: ${a.readingTime}
- Tags: ${a.tags.join(', ')}

${a.body}
`
  )
  .join('\n---\n');

const llmsFullTxt = `${llmsTxt}

---

# Complete Project Case Studies

${fullProjectsSection}

---

# Complete Articles & Engineering Reflections

${fullArticlesSection}
`;

fs.writeFileSync(path.resolve(DIST_DIR, 'llms-full.txt'), llmsFullTxt, 'utf-8');
fs.writeFileSync(path.resolve(PUBLIC_DIR, 'llms-full.txt'), llmsFullTxt, 'utf-8');
console.log('  ✓ Created llms-full.txt (complete corpus for deep retrieval).');

console.log('\n[SEO Build] Complete. All routes statically primed for crawler and AI compatibility.\n');
