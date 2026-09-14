import { useEffect } from 'react';
import { PageMetadata } from '../lib/seo/metadata';
import { resolveSiteUrl } from '../config/siteConfig';

/**
 * Resolves the active site URL in browser runtime.
 */
export function useResolvedSiteUrl(): string {
  if (typeof window !== 'undefined') {
    const envUrl = import.meta.env.VITE_SITE_URL;
    return resolveSiteUrl(envUrl || window.location.origin);
  }
  return resolveSiteUrl();
}

/**
 * Helper to update or create a meta tag.
 */
function setMetaTag(name: string, content: string, isProperty: boolean = false) {
  const attr = isProperty ? 'property' : 'name';
  let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.content = content;
}

/**
 * Helper to update or create a canonical link.
 */
function setCanonicalLink(href: string) {
  let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement('link');
    link.rel = 'canonical';
    document.head.appendChild(link);
  }
  link.href = href;
}

/**
 * Helper to inject or update JSON-LD structured data.
 */
function setJsonLd(schemas: Record<string, unknown>[]) {
  const SCRIPT_ID = 'seo-jsonld-schema';
  let script = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;

  if (schemas.length === 0) {
    if (script) {
      script.remove();
    }
    return;
  }

  if (!script) {
    script = document.createElement('script');
    script.id = SCRIPT_ID;
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }

  const payload = schemas.length === 1 ? schemas[0] : { '@context': 'https://schema.org', '@graph': schemas };
  script.textContent = JSON.stringify(payload, null, 2);
}

/**
 * Synchronizes document head metadata and JSON-LD upon client-side route transitions.
 */
export function useSEO(metadata: PageMetadata | null | undefined) {
  useEffect(() => {
    if (!metadata) return;

    // 1. Document Title
    document.title = metadata.title;

    // 2. Standard Meta
    setMetaTag('description', metadata.description);
    setMetaTag('robots', metadata.robots);

    // 3. Canonical Link
    setCanonicalLink(metadata.canonicalUrl);

    // 4. Open Graph
    setMetaTag('og:title', metadata.ogTitle, true);
    setMetaTag('og:description', metadata.ogDescription, true);
    setMetaTag('og:type', metadata.ogType, true);
    setMetaTag('og:url', metadata.ogUrl, true);
    setMetaTag('og:image', metadata.ogImage, true);
    setMetaTag('og:image:alt', metadata.ogImageAlt, true);
    setMetaTag('og:site_name', 'Ekya Muhammad Portfolio', true);
    setMetaTag('og:locale', 'en_US', true);

    // 5. Twitter / X Cards
    setMetaTag('twitter:card', metadata.twitterCard);
    setMetaTag('twitter:title', metadata.ogTitle);
    setMetaTag('twitter:description', metadata.ogDescription);
    setMetaTag('twitter:image', metadata.ogImage);
    setMetaTag('twitter:image:alt', metadata.ogImageAlt);

    // 6. JSON-LD Structured Data
    setJsonLd(metadata.schemas);
  }, [metadata]);
}
