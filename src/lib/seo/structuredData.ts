import { siteConfig } from '../../config/siteConfig';
import { Article } from '../../data/articles';
import { Project } from '../../data/portfolioData';

export interface SeoContext {
  siteUrl: string;
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

/**
 * Generates Person schema representing the portfolio owner.
 */
export function buildPersonSchema(ctx: SeoContext): Record<string, unknown> {
  const { siteUrl } = ctx;
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${siteUrl}/#person`,
    name: siteConfig.name,
    jobTitle: siteConfig.role,
    description: siteConfig.bio,
    url: siteUrl,
    image: `${siteUrl}/assets/images/my-photo.png`,
    email: `mailto:${siteConfig.email}`,
    sameAs: [
      siteConfig.socials.github,
      siteConfig.socials.linkedin,
    ],
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'Politeknik Negeri Malang',
      alternateName: 'Polinema',
      url: 'https://www.polinema.ac.id/',
    },
    worksFor: [
      {
        '@type': 'Organization',
        name: 'PT Surabaya Autocomp Indonesia',
        alternateName: 'Yazaki Group',
      },
      {
        '@type': 'Organization',
        name: 'NexaCode',
        url: 'https://nexacode.dev/',
      },
    ],
    award: [
      '2nd Place — E-Government Poster (KMIPN VIII 2026)',
      'Top 15 Finalist — Hackathon (BytesFest 2026)',
      '1st Place — Web Development (Intercomp 2026)',
      '3rd Place Best Solver — Hackathon Web Application (PLAY IT! 2026)',
      '2nd Place — Team Collaboration Innovation (KMIPN VII 2025, Certificate No. 554/PL9/KM.01.02/2025)',
      'Juara Harapan 2 — English News Casting (Intercomp 2024)',
    ],
    knowsAbout: [
      'Systems Analysis',
      'Full-Stack Development',
      'Backend Architecture',
      'PostgreSQL',
      'Redis',
      'FastAPI',
      'Django',
      'Laravel',
      'TypeScript',
      'React',
      'Next.js',
      'Flutter',
      'Model Context Protocol (MCP)',
      'Linux Server Administration',
      'Nginx',
      'Offline-First Architectures',
      'Database Connection Optimization',
      'UI/UX Engineering',
    ],
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'ID',
    },
  };
}

/**
 * Generates ProfilePage schema for the portfolio homepage.
 */
export function buildProfilePageSchema(ctx: SeoContext): Record<string, unknown> {
  const { siteUrl } = ctx;
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': `${siteUrl}/#profilepage`,
    url: `${siteUrl}/`,
    name: `${siteConfig.name} — Profile & Portfolio`,
    description: siteConfig.bio,
    isPartOf: {
      '@id': `${siteUrl}/#website`,
    },
    mainEntity: {
      '@id': `${siteUrl}/#person`,
    },
    inLanguage: 'en',
    dateCreated: '2024-01-01',
    dateModified: '2026-09-14',
  };
}

/**
 * Generates WebSite schema.
 */
export function buildWebSiteSchema(ctx: SeoContext): Record<string, unknown> {
  const { siteUrl } = ctx;
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteUrl}/#website`,
    url: siteUrl,
    name: siteConfig.defaultTitle,
    description: siteConfig.defaultDescription,
    publisher: {
      '@id': `${siteUrl}/#person`,
    },
    inLanguage: 'en',
  };
}

/**
 * Generates Article / BlogPosting schema for an individual article.
 */
export function buildArticleSchema(article: Article, ctx: SeoContext): Record<string, unknown> {
  const { siteUrl } = ctx;
  const canonicalUrl = `${siteUrl}/articles/${article.slug}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${canonicalUrl}/#article`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl,
    },
    headline: article.title,
    description: article.excerpt,
    articleSection: article.category,
    keywords: article.tags.join(', '),
    wordCount: article.wordCount,
    timeRequired: article.readingTime,
    datePublished: article.publishedDate,
    dateModified: article.modifiedDate || article.publishedDate,
    image: `${siteUrl}${siteConfig.defaultOgImage}`,
    inLanguage: 'en',
    author: {
      '@type': 'Person',
      '@id': `${siteUrl}/#person`,
      name: siteConfig.name,
      url: siteUrl,
    },
    publisher: {
      '@type': 'Person',
      '@id': `${siteUrl}/#person`,
      name: siteConfig.name,
      url: siteUrl,
      image: `${siteUrl}/assets/images/my-photo.png`,
    },
    url: canonicalUrl,
  };
}

/**
 * Generates CreativeWork or SoftwareApplication schema for a project case study.
 * Only real and visible properties are used; no fake ratings, prices, or reviews.
 */
export function buildProjectSchema(project: Project, ctx: SeoContext): Record<string, unknown> {
  const { siteUrl } = ctx;
  const canonicalUrl = `${siteUrl}/projects/${project.slug}`;

  const isSoftware = project.id !== 'liza-makeup';

  const baseSchema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': isSoftware ? 'SoftwareApplication' : 'CreativeWork',
    '@id': `${canonicalUrl}/#project`,
    name: project.title,
    headline: project.title,
    description: project.shortDescription || project.description || project.intro,
    author: {
      '@type': 'Person',
      '@id': `${siteUrl}/#person`,
      name: siteConfig.name,
      url: siteUrl,
    },
    url: canonicalUrl,
    genre: project.category,
    keywords: project.stack.join(', '),
    dateCreated: project.year,
    datePublished: project.year,
  };

  if (project.repositoryUrl) {
    baseSchema.codeRepository = project.repositoryUrl;
  }

  if (project.liveUrl) {
    baseSchema.sameAs = project.liveUrl;
  }

  if (isSoftware) {
    baseSchema.applicationCategory = 'DeveloperApplication';
    baseSchema.operatingSystem = 'Cross-platform';
    baseSchema.softwareVersion = '1.0';
  }

  return baseSchema;
}

/**
 * Generates BreadcrumbList schema.
 */
export function buildBreadcrumbsSchema(items: BreadcrumbItem[], ctx: SeoContext): Record<string, unknown> {
  const { siteUrl } = ctx;

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${siteUrl}${item.url.startsWith('/') ? '' : '/'}${item.url}`,
    })),
  };
}

/**
 * Generates CollectionPage schema for the articles index.
 */
export function buildArticlesIndexSchema(articlesCount: number, ctx: SeoContext): Record<string, unknown> {
  const { siteUrl } = ctx;
  const canonicalUrl = `${siteUrl}/articles`;

  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${canonicalUrl}/#collection`,
    url: canonicalUrl,
    name: 'Articles & Technical Notes — Ekya Muhammad',
    description: 'Technical case studies, backend investigations, and engineering reflections on building software under real constraints.',
    numberOfItems: articlesCount,
    isPartOf: {
      '@id': `${siteUrl}/#website`,
    },
  };
}
