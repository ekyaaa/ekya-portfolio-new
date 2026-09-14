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
    sameAs: [
      siteConfig.socials.github,
      siteConfig.socials.linkedin,
    ],
    knowsAbout: [
      'Systems Analysis',
      'Full-Stack Development',
      'Backend Architecture',
      'PostgreSQL',
      'FastAPI',
      'Django',
      'TypeScript',
      'React',
      'UI/UX Engineering',
    ],
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
  };

  if (isSoftware) {
    baseSchema.applicationCategory = 'DeveloperApplication';
    baseSchema.operatingSystem = 'Cross-platform';
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
