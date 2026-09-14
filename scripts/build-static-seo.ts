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
import { getProjectBySlug } from '../src/data/portfolioData';
import { resolveSiteUrl, DEFAULT_PRODUCTION_DOMAIN } from '../src/config/siteConfig';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const DIST_DIR = path.resolve(ROOT_DIR, 'dist');
const PUBLIC_DIR = path.resolve(ROOT_DIR, 'public');

// Resolve Production Site URL
const rawEnvUrl = process.env.SITE_URL || process.env.VITE_SITE_URL;
const siteUrl = resolveSiteUrl(rawEnvUrl, true);

console.log('\n========================================');
console.log('  [SEO Build] Route-Specific Static HTML & Metadata Generator');
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
 * Injects metadata, Open Graph, Twitter cards, and JSON-LD into the HTML template.
 */
function generateHtmlForRoute(metadata: PageMetadata): string {
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

  return html;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
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
console.log(`[SEO Build] Generating static HTML for ${allRoutes.length} routes...`);

for (const route of allRoutes) {
  const metadata = getMetadataForRoute(route);
  const htmlContent = generateHtmlForRoute(metadata);

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
  console.log(`  ✓ ${route.path.padEnd(45)} -> ${path.relative(ROOT_DIR, targetPath)}`);
}

// 2. Generate sitemap.xml
console.log('\n[SEO Build] Generating sitemap.xml...');
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
console.log('\n[SEO Build] Generating robots.txt...');
const robotsTxt = `# Production robots.txt for Ekya Muhammad Portfolio
User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`;

fs.writeFileSync(path.resolve(DIST_DIR, 'robots.txt'), robotsTxt, 'utf-8');
fs.writeFileSync(path.resolve(PUBLIC_DIR, 'robots.txt'), robotsTxt, 'utf-8');
console.log('  ✓ Created robots.txt referencing sitemap.');

console.log('\n[SEO Build] Complete. All routes statically primed for crawler compatibility.\n');
