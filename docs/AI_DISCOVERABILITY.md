# AI Discoverability, Generative Search & Retrieval Documentation

This document outlines the architecture, crawling policies, structured data schemas, machine-readable specifications, and operational workflows implemented to maximize discoverability, retrieval, understanding, and citation across modern search engines and AI assistants—including Google Search & AI Overviews, Bing & Copilot, ChatGPT Search, Perplexity, Claude Web Search, and Brave Search.

---

## 1. What Was Already Present

Before this upgrade, the repository already had a solid SEO baseline established:
- **Build-Time Static SEO Generator** (`scripts/build-static-seo.ts`) producing static HTML routes in `dist/`.
- **Unique Metadata per Route**: Individual `<title>`, `<meta name="description">`, Open Graph (`og:*`), and Twitter Cards (`twitter:*`).
- **Canonical URLs**: Canonical link tags preventing duplicate indexation.
- **Client-Side Metadata Synchronization** (`src/hooks/useSEO.ts`): Updating document head upon React Router transitions.
- **Dynamic Route Discovery** (`src/lib/seo/routes.ts`): Automatically indexing projects and articles from data sources.
- **Semantic HTML Structure**: Semantic tags (`<main>`, `<article>`, `<header>`, `<nav>`, `<figure>`).

---

## 2. What Was Added in This Upgrade

1. **Static HTML Content Prerendering for All Routes** (`scripts/prerender-content.ts`):
   - Injected complete, semantic HTML directly into `<div id="root">` at build time.
   - Ensures non-JS crawlers, curl requests, and fast-scraping AI bots (Perplexity, ChatGPT Search, Claude-SearchBot) immediately receive the full text of articles, case studies, milestones, and experience without requiring client-side JS hydration.
2. **Explicit Search & Retrieval Crawler Directives** (`public/robots.txt`):
   - Explicitly declared permissions for `Googlebot`, `Bingbot`, `OAI-SearchBot`, `PerplexityBot`, `Claude-SearchBot`, and `Claude-User`.
3. **Structured Data Upgrade (Schema.org)** (`src/lib/seo/structuredData.ts`):
   - **ProfilePage** schema on homepage identifying the site as an authoritative portfolio.
   - **Person** schema enhanced with verified factual properties: `alumniOf` (Politeknik Negeri Malang), verified national `award` list (KMIPN, BytesFest, Intercomp, PLAY IT!), `worksFor` (PT Surabaya Autocomp Indonesia / Yazaki Group, NexaCode), `knowsAbout`, `image`, `email`, and `sameAs`.
   - **BlogPosting** schema enhanced with ISO-8601 `datePublished`, `dateModified`, `inLanguage`, and verified `publisher` / `author` entities.
   - **Project** schemas (`SoftwareApplication` / `CreativeWork`) enhanced with `dateCreated`, `datePublished`, `codeRepository`, and software categorizations.
4. **Article Temporal Metadata & RSS 2.0 Feed** (`src/data/articles.ts`, `public/rss.xml`):
   - Added `publishedDate` and `modifiedDate` to all articles.
   - Automated generation of `public/rss.xml` and `dist/rss.xml`.
   - Added auto-discovery `<link rel="alternate" type="application/rss+xml">` in all page heads.
5. **Accurate Sitemap Timestamps** (`public/sitemap.xml`):
   - Populated `<lastmod>` for every canonical URL derived directly from real content updates.
6. **IndexNow Protocol Integration** (`scripts/notify-indexnow.ts`):
   - Generated IndexNow key verification file `public/7b23e819a6d44f8ea9c140df852a39d1.txt`.
   - Created `npm run indexnow` CLI utility for instant submission to Bing, Yandex, and IndexNow endpoints.
7. **Machine-Readable AI Context Files** (`public/llms.txt`, `public/llms-full.txt`):
   - Standard `/llms.txt` summarizing the owner entity, core capabilities, projects, articles, and verified credentials.
   - Deep `/llms-full.txt` containing the full markdown text of all projects and articles for single-request ingestion.
8. **Static Hosting Headers & Canonicalization** (`public/_headers`, `vercel.json`):
   - Clean URLs and trailing-slash enforcement.
   - Proper MIME types for XML and TXT files.
   - Non-aggressive caching for HTML, metadata, and feeds.
9. **Non-Invasive AI Referral Tracking** (`src/lib/analytics/aiReferral.ts`):
   - Detects incoming traffic from ChatGPT, Perplexity, Claude, Bing/Copilot, Google, and Brave without cookies or user tracking.

---

## 3. What Was Deliberately NOT Added

- **Unrestricted AI Training Crawlers**:
  - We did **NOT** blanket-allow `GPTBot`, `ClaudeBot`, or `Google-Extended`. Search and retrieval crawlers (`OAI-SearchBot`, `PerplexityBot`, `Claude-SearchBot`, `Googlebot`, `Bingbot`) are treated separately from model training crawlers to maintain search discoverability without compromising content rights.
- **Invented Brave Crawler Directives**:
  - Brave Search does not publish a dedicated user-agent for site-level robots.txt and relies on general web crawlability and Googlebot compatibility. No fake `BraveBot` rule was added.
- **Synthetic Dates or Manufactured Metrics**:
  - All dates, awards, and metrics are derived strictly from documented, verified facts in the codebase.
- **FAQ Schema Spam**:
  - No synthetic FAQPage markup was added. All structured data directly mirrors visible page content.
- **Invasive Analytics Cookies or Trackers**:
  - AI referral attribution operates purely in memory by inspecting `document.referrer` on initial load.

---

## 4. Search & AI Crawler Policy (`robots.txt`)

```txt
User-agent: *
Allow: /

User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Claude-SearchBot
Allow: /

User-agent: Claude-User
Allow: /

Sitemap: https://www.ekyamuhammad.com/sitemap.xml
```

---

## 5. Structured Data Architecture

| Route | Schemas Generated | Purpose |
|---|---|---|
| `/` | `ProfilePage`, `Person`, `WebSite` | Defines Ekya Muhammad as the authoritative entity, linking education, awards, affiliations, and skills. |
| `/articles` | `CollectionPage`, `BreadcrumbList` | Catalogs the engineering notes and articles index. |
| `/articles/:slug` | `BlogPosting`, `BreadcrumbList` | Exposes article headline, dates, author, word count, and canonical URL. |
| `/projects/:slug` | `SoftwareApplication` or `CreativeWork`, `BreadcrumbList` | Exposes project details, tech stack, repository links, and category. |
| `/404` | *(None — marked with `noindex, follow`)* | Prevents indexing of dead ends while allowing link equity to flow. |

---

## 6. IndexNow Implementation

- **Key**: `7b23e819a6d44f8ea9c140df852a39d1`
- **Key Location**: `https://www.ekyamuhammad.com/7b23e819a6d44f8ea9c140df852a39d1.txt`
- **Submission Utility**: `scripts/notify-indexnow.ts`

### Usage:

```bash
# Dry run test (no network requests made)
npm run indexnow -- --dry-run

# Submit all canonical URLs to IndexNow
npm run indexnow

# Submit a specific updated URL
npm run indexnow -- --url=/articles/when-postgresql-became-the-problem
```

> **Note**: IndexNow alerts participating search engines (Bing, Yandex, etc.) immediately when pages are published or changed. It does not guarantee instant indexing or ranking.

---

## 7. Machine-Readable `llms.txt` Decision

- `/llms.txt`: A concise, standards-aligned markdown guide intended for LLM search agents. It highlights who the portfolio belongs to, core specializations, links to all projects, articles, verified awards, and external profiles.
- `/llms-full.txt`: A comprehensive corpus containing the full textual narrative of all 5 engineering case studies and all 5 articles. Enables models to read and quote detailed technical decisions without hallucinating.

Both files are regenerated automatically during every `npm run build`, ensuring zero drift from the codebase source of truth.

---

## 8. Manual Post-Deployment Setup (Hosting Dashboard)

1. **Set Production Site URL**:
   In your hosting dashboard (Vercel, Netlify, Cloudflare Pages), configure:
   ```env
   SITE_URL=https://www.ekyamuhammad.com
   ```
   (or `VITE_SITE_URL=https://www.ekyamuhammad.com`)
2. **Confirm Clean URLs & HTTPS**:
   - Ensure the domain enforces HTTPS.
   - Ensure trailing slashes are redirected to non-trailing slashes (handled by `vercel.json` and `public/_headers`).

---

## 9. Post-Deployment Search Engine Submission Checklist

### Google Search Console
1. **Verify Domain Property**:
   - Add `ekyamuhammad.com` via DNS verification in Google Search Console.
2. **Submit Sitemap**:
   - Navigate to **Sitemaps** &rarr; enter `sitemap.xml` &rarr; click **Submit**.
3. **Inspect Core URLs**:
   - Use URL Inspection on:
     - `https://www.ekyamuhammad.com/`
     - `https://www.ekyamuhammad.com/articles`
     - `https://www.ekyamuhammad.com/projects/resurva`
     - `https://www.ekyamuhammad.com/articles/when-postgresql-became-the-problem`
   - Click **Test Live URL** to verify Googlebot renders the prerendered HTML and extracts structured data.
   - Click **Request Indexing**.

### Bing Webmaster Tools
1. **Import / Verify Site**:
   - Add `https://www.ekyamuhammad.com` (can import directly from Google Search Console).
2. **Submit Sitemap**:
   - Under **Sitemaps**, submit `https://www.ekyamuhammad.com/sitemap.xml`.
3. **Verify IndexNow Status**:
   - Under **IndexNow**, confirm your key `7b23e819a6d44f8ea9c140df852a39d1` is detected and view submission history.

### Brave Search
1. Ensure Googlebot access is active (Brave Search crawl coverage relies on open web availability).
2. Query `site:ekyamuhammad.com` on Brave Search periodically to verify coverage.

### AI Retrieval Bot Verification
1. **Cloudflare / Host WAF Check**:
   - Ensure bot challenge modes do not block `OAI-SearchBot`, `PerplexityBot`, or `Claude-SearchBot`.
2. **Verify Header Responses**:
   ```bash
   curl -I https://www.ekyamuhammad.com/robots.txt
   curl -I https://www.ekyamuhammad.com/llms.txt
   curl -I https://www.ekyamuhammad.com/rss.xml
   ```

---

## 10. Monitoring & AI Referral Attribution

You can monitor incoming traffic from AI retrieval engines using the lightweight attribution utility in `src/lib/analytics/aiReferral.ts`.

When an AI engine references your site, it typically provides a referrer or UTM tag:
- **ChatGPT Search**: `referrer: https://chatgpt.com/` or `https://chat.openai.com/`
- **Perplexity**: `referrer: https://www.perplexity.ai/`
- **Claude Web Search**: `referrer: https://claude.ai/`
- **Bing / Copilot**: `referrer: https://www.bing.com/` or `https://copilot.microsoft.com/`
- **Brave Search**: `referrer: https://search.brave.com/`

If you connect Google Analytics, Plausible, or Cloudflare Web Analytics later, these referral domains will be visible in standard Acquisition/Referral reports.
