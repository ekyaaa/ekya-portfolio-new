import { articlesData } from '../../data/articles';
import { projectsData } from '../../data/portfolioData';

export type RouteType = 'home' | 'articles_index' | 'article_detail' | 'project_detail' | 'not_found';

export interface AppRoute {
  path: string;
  type: RouteType;
  slug?: string;
  id?: string;
  indexable: boolean;
  priority: number;
  changefreq: 'daily' | 'weekly' | 'monthly' | 'yearly';
  lastmod?: string;
}

/**
 * Returns all application routes derived dynamically from the central data sources.
 * When a new article or project is added to data, it is automatically registered here.
 */
export function getAllRoutes(): AppRoute[] {
  const routes: AppRoute[] = [
    {
      path: '/',
      type: 'home',
      indexable: true,
      priority: 1.0,
      changefreq: 'weekly',
    },
    {
      path: '/articles',
      type: 'articles_index',
      indexable: true,
      priority: 0.8,
      changefreq: 'weekly',
    },
  ];

  // Dynamically register all articles from data
  for (const article of articlesData) {
    routes.push({
      path: `/articles/${article.slug}`,
      type: 'article_detail',
      slug: article.slug,
      indexable: true,
      priority: 0.7,
      changefreq: 'monthly',
    });
  }

  // Dynamically register all projects from data using dedicated public slug
  for (const project of projectsData) {
    routes.push({
      path: `/projects/${project.slug}`,
      type: 'project_detail',
      slug: project.slug,
      id: project.id,
      indexable: true,
      priority: 0.8,
      changefreq: 'monthly',
    });
  }

  // Not found route (explicitly not indexable, omitted from sitemap)
  routes.push({
    path: '/404',
    type: 'not_found',
    indexable: false,
    priority: 0.0,
    changefreq: 'yearly',
  });

  return routes;
}

/**
 * Returns only public, indexable routes suitable for sitemap.xml.
 */
export function getIndexableRoutes(): AppRoute[] {
  return getAllRoutes().filter((r) => r.indexable);
}
