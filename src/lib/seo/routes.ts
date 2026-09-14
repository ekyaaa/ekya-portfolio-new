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
  // Derive latest article date for articles index
  const latestArticleDate = articlesData.reduce((latest, a) => {
    const d = a.modifiedDate || a.publishedDate;
    return d > latest ? d : latest;
  }, '2026-08-10');

  // Map known project last updated dates
  const projectLastModMap: Record<string, string> = {
    'git-trace': '2026-08-30',
    'deploy-packager': '2026-08-20',
    'resurva': '2026-09-10',
    'liza-makeup': '2026-07-15',
    'folder-sync-inspector': '2026-06-25',
  };

  const routes: AppRoute[] = [
    {
      path: '/',
      type: 'home',
      indexable: true,
      priority: 1.0,
      changefreq: 'weekly',
      lastmod: '2026-09-14',
    },
    {
      path: '/articles',
      type: 'articles_index',
      indexable: true,
      priority: 0.8,
      changefreq: 'weekly',
      lastmod: latestArticleDate,
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
      lastmod: article.modifiedDate || article.publishedDate,
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
      lastmod: projectLastModMap[project.slug] || `${project.year}-01-01`,
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
