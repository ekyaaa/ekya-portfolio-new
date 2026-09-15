import { siteConfig } from '../../config/siteConfig';
import { Article } from '../../data/articles';
import { Project } from '../../data/portfolioData';
import {
  SeoContext,
  buildPersonSchema,
  buildProfilePageSchema,
  buildWebSiteSchema,
  buildArticleSchema,
  buildProjectSchema,
  buildBreadcrumbsSchema,
  buildArticlesIndexSchema,
} from './structuredData';

export interface PageMetadata {
  title: string;
  description: string;
  canonicalUrl: string;
  robots: string;
  ogTitle: string;
  ogDescription: string;
  ogType: 'website' | 'article';
  ogUrl: string;
  ogImage: string;
  ogImageAlt: string;
  twitterCard: 'summary_large_image';
  schemas: Record<string, unknown>[];
}

/**
 * Resolves an absolute URL given a path and base site URL.
 */
function toAbsoluteUrl(pathOrUrl: string, siteUrl: string): string {
  if (!pathOrUrl) return `${siteUrl}${siteConfig.defaultOgImage}`;
  if (pathOrUrl.startsWith('http://') || pathOrUrl.startsWith('https://')) {
    return pathOrUrl;
  }
  const cleanPath = pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`;
  return `${siteUrl}${cleanPath}`;
}

/**
 * Builds metadata for the Homepage (`/`).
 */
export function buildHomeMetadata(ctx: SeoContext): PageMetadata {
  const { siteUrl } = ctx;
  const canonicalUrl = `${siteUrl}/`;
  const defaultOgImage = toAbsoluteUrl(siteConfig.defaultOgImage, siteUrl);

  return {
    title: siteConfig.defaultTitle,
    description: siteConfig.defaultDescription,
    canonicalUrl,
    robots: 'index, follow',
    ogTitle: siteConfig.defaultTitle,
    ogDescription: siteConfig.defaultDescription,
    ogType: 'website',
    ogUrl: canonicalUrl,
    ogImage: defaultOgImage,
    ogImageAlt: 'Ekya Muhammad Portfolio Overview',
    twitterCard: 'summary_large_image',
    schemas: [buildProfilePageSchema(ctx), buildPersonSchema(ctx), buildWebSiteSchema(ctx)],
  };
}

/**
 * Builds metadata for the Articles Index (`/articles`).
 */
export function buildArticlesIndexMetadata(articlesCount: number, ctx: SeoContext): PageMetadata {
  const { siteUrl } = ctx;
  const canonicalUrl = `${siteUrl}/articles`;
  const defaultOgImage = toAbsoluteUrl(siteConfig.defaultOgImage, siteUrl);

  const title = 'Articles & Engineering Notes — Ekya Muhammad - System Analyst & Fullstack Developer';
  const description =
    'Technical case studies, system debugging, and engineering reflections on backend scalability, AI workflows, and software under real constraints.';

  return {
    title,
    description,
    canonicalUrl,
    robots: 'index, follow',
    ogTitle: title,
    ogDescription: description,
    ogType: 'website',
    ogUrl: canonicalUrl,
    ogImage: defaultOgImage,
    ogImageAlt: 'Ekya Muhammad Articles Index',
    twitterCard: 'summary_large_image',
    schemas: [
      buildArticlesIndexSchema(articlesCount, ctx),
      buildBreadcrumbsSchema(
        [
          { name: 'Home', url: '/' },
          { name: 'Articles', url: '/articles' },
        ],
        ctx
      ),
    ],
  };
}

/**
 * Builds metadata for an individual Article Detail Page (`/articles/:slug`).
 */
export function buildArticleMetadata(article: Article, ctx: SeoContext): PageMetadata {
  const { siteUrl } = ctx;
  const canonicalUrl = `${siteUrl}/articles/${article.slug}`;

  // Title pattern: Article Title — Ekya Muhammad - System Analyst & Fullstack Developer
  const title = `${article.title} — Ekya Muhammad - System Analyst & Fullstack Developer`;
  const description = article.excerpt;

  // Prefer article-specific image if available, otherwise fallback
  const ogImage = toAbsoluteUrl(siteConfig.defaultOgImage, siteUrl);

  return {
    title,
    description,
    canonicalUrl,
    robots: 'index, follow',
    ogTitle: title,
    ogDescription: description,
    ogType: 'article',
    ogUrl: canonicalUrl,
    ogImage,
    ogImageAlt: `${article.title} — Technical Case Study by Ekya Muhammad`,
    twitterCard: 'summary_large_image',
    schemas: [
      buildArticleSchema(article, ctx),
      buildBreadcrumbsSchema(
        [
          { name: 'Home', url: '/' },
          { name: 'Articles', url: '/articles' },
          { name: article.title, url: `/articles/${article.slug}` },
        ],
        ctx
      ),
    ],
  };
}

/**
 * Builds metadata for an individual Project Case Study Page (`/projects/:slug`).
 */
export function buildProjectMetadata(project: Project, ctx: SeoContext): PageMetadata {
  const { siteUrl } = ctx;
  const canonicalUrl = `${siteUrl}/projects/${project.slug}`;

  const title = `${project.title} — Ekya Muhammad - System Analyst & Fullstack Developer`;
  const description = project.shortDescription || project.description || project.intro.slice(0, 160);

  // Use project representative preview image if available
  const repImage = project.images && project.images.length > 0 ? project.images[0].src : siteConfig.defaultOgImage;
  const ogImage = toAbsoluteUrl(repImage, siteUrl);
  const ogImageAlt = project.images && project.images.length > 0 ? project.images[0].alt : project.title;

  return {
    title,
    description,
    canonicalUrl,
    robots: 'index, follow',
    ogTitle: title,
    ogDescription: description,
    ogType: 'website',
    ogUrl: canonicalUrl,
    ogImage,
    ogImageAlt,
    twitterCard: 'summary_large_image',
    schemas: [
      buildProjectSchema(project, ctx),
      buildBreadcrumbsSchema(
        [
          { name: 'Home', url: '/' },
          { name: 'Portfolio', url: '/#work' },
          { name: project.title, url: `/projects/${project.slug}` },
        ],
        ctx
      ),
    ],
  };
}

/**
 * Builds metadata for the 404 Not Found Page.
 */
export function buildNotFoundMetadata(ctx: SeoContext): PageMetadata {
  const { siteUrl } = ctx;
  const canonicalUrl = `${siteUrl}/404`;

  return {
    title: 'Page Not Found — Ekya Muhammad - System Analyst & Fullstack Developer',
    description: 'The requested page does not exist or has been moved.',
    canonicalUrl,
    robots: 'noindex, follow',
    ogTitle: 'Page Not Found — Ekya Muhammad - System Analyst & Fullstack Developer',
    ogDescription: 'The requested page does not exist or has been moved.',
    ogType: 'website',
    ogUrl: canonicalUrl,
    ogImage: toAbsoluteUrl(siteConfig.defaultOgImage, siteUrl),
    ogImageAlt: 'Ekya Muhammad Portfolio',
    twitterCard: 'summary_large_image',
    schemas: [],
  };
}
