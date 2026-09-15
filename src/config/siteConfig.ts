/**
 * Global Site Configuration & Production Domain Setup
 * 
 * MANUAL ACTION REQUIRED:
 * When deploying to production, set the SITE_URL (or VITE_SITE_URL) environment variable
 * in your hosting dashboard (Vercel, Netlify, Cloudflare, etc.) to your confirmed custom domain.
 * Example: SITE_URL=https://ekyamuhammad.com
 */

export const DEFAULT_PRODUCTION_DOMAIN = 'https://ekyamuhammad.com';
export const DEFAULT_DEV_DOMAIN = 'http://localhost:5173';

/**
 * Resolves the canonical base URL without trailing slash.
 * Pure and environment-agnostic.
 */
export function resolveSiteUrl(envUrl?: string, isProd: boolean = false): string {
  const candidate = (envUrl || '').trim();
  if (candidate) {
    return candidate.replace(/\/+$/, '');
  }
  if (isProd) {
    return DEFAULT_PRODUCTION_DOMAIN;
  }
  return DEFAULT_DEV_DOMAIN;
}

export interface SiteConfig {
  siteUrl: string;
  name: string;
  role: string;
  tagline: string;
  bio: string;
  location: string;
  email: string;
  socials: {
    github: string;
    linkedin: string;
  };
  defaultTitle: string;
  defaultDescription: string;
  defaultOgImage: string;
  locale: string;
}

export const siteConfig = {
  name: 'Ekya Muhammad',
  role: 'System Analyst and Full-Stack Developer',
  tagline: 'I turn ideas and real-world problems into thoughtful, reliable digital products.',
  bio: 'System Analyst & Full-Stack Developer focused on high-performance digital systems, workflow automation, and scalable architectures.',
  location: 'Indonesia',
  email: 'ekyamuhammad@gmail.com',
  socials: {
    github: 'https://github.com/ekyaaa',
    linkedin: 'https://www.linkedin.com/in/ekya-muhammad',
  },
  defaultTitle: 'Ekya Muhammad - System Analyst & Fullstack Developer',
  defaultDescription: 'Personal portfolio of Ekya Muhammad - System Analyst and Fullstack Developer building thoughtful, scalable, and high-performance digital systems.',
  defaultOgImage: '/assets/images/og-default.png',
  locale: 'en_US',
};
