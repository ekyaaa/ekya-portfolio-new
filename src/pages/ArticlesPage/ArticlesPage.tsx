import { useState, useEffect, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  getAllArticles,
  ARTICLE_CATEGORIES,
  Article,
} from '../../data/articles';
import { buildArticlesIndexMetadata } from '../../lib/seo/metadata';
import { useSEO, useResolvedSiteUrl } from '../../hooks/useSEO';
import { ArrowUpRight, ArrowLeft } from 'lucide-react';
import './ArticlesPage.css';

export function ArticlesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const siteUrl = useResolvedSiteUrl();

  const allArticles = useMemo(() => getAllArticles(), []);

  const seoMetadata = useMemo(() => {
    return buildArticlesIndexMetadata(allArticles.length, { siteUrl });
  }, [allArticles.length, siteUrl]);

  useSEO(seoMetadata);

  // Synchronize state when URL search param changes
  useEffect(() => {
    const cat = searchParams.get('category') || 'all';
    setSelectedCategory(cat);
  }, [searchParams]);

  // Handle category change and reflect in URL
  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    if (categoryId.toLowerCase() === 'all') {
      searchParams.delete('category');
      setSearchParams(searchParams, { replace: true });
    } else {
      setSearchParams({ category: categoryId }, { replace: true });
    }
  };

  // Filter articles
  const filteredArticles = useMemo(() => {
    if (selectedCategory.toLowerCase() === 'all') {
      return allArticles;
    }
    return allArticles.filter(
      (article) => article.category.toLowerCase() === selectedCategory.toLowerCase()
    );
  }, [allArticles, selectedCategory]);

  return (
    <div className="articles-page">
      <div className="container">
        {/* Navigation Breadcrumb Back to Home */}
        <div className="page-nav-bar font-mono">
          <Link to="/" className="back-link">
            <ArrowLeft size={14} />
            <span>back to portfolio</span>
          </Link>
        </div>

        {/* Hero Section */}
        <header className="articles-page-header">
          <div className="section-label">
            <span className="number">&bull;</span> Article Index
          </div>
          <h1 className="page-title font-heading">Writing about the work behind the work.</h1>
          <p className="body-large page-description">
            Case studies, technical investigations, and reflections from learning to build software
            under real constraints.
          </p>
        </header>

        {/* Filter Bar */}
        <div className="filter-bar-container">
          <div className="filter-tabs" role="tablist" aria-label="Article category filters">
            {ARTICLE_CATEGORIES.map((cat) => {
              const isSelected = selectedCategory.toLowerCase() === cat.id.toLowerCase();
              return (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  className={`filter-tab font-mono ${isSelected ? 'is-selected' : ''}`}
                  onClick={() => handleCategorySelect(cat.id)}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          <div className="filter-result-count font-mono">
            Showing {filteredArticles.length} {filteredArticles.length === 1 ? 'article' : 'articles'}
          </div>
        </div>

        {/* Articles List */}
        <div className="articles-list-container">
          {filteredArticles.length > 0 ? (
            <div className="articles-index-grid">
              {filteredArticles.map((article: Article, index: number) => {
                const articleIndexNum = (index + 1).toString().padStart(2, '0');
                return (
                  <Link
                    key={article.slug}
                    to={`/articles/${article.slug}`}
                    className="index-article-card"
                    data-cursor="READ"
                    aria-label={`Read article: ${article.title}`}
                  >
                    <div className="index-card-header font-mono">
                      <span className="index-number">{articleIndexNum}</span>
                      <span className="index-category">{article.category}</span>
                      {article.publishedDate && (
                        <span className="index-date">
                          {new Date(article.publishedDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                        </span>
                      )}
                      <span className="index-reading-time">{article.readingTime}</span>
                    </div>

                    <h2 className="index-article-title font-heading">{article.title}</h2>
                    <p className="index-article-excerpt body-regular">{article.excerpt}</p>

                    {/* Quiet Tags */}
                    <div className="index-tags-row font-mono">
                      {article.tags.map((tag) => (
                        <span key={tag} className="index-tag">
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <div className="index-card-footer font-mono">
                      <span className="read-action">Read complete note</span>
                      <ArrowUpRight size={16} className="index-arrow" />
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="articles-empty-state">
              <p className="body-regular empty-message">
                No articles found in this category.
              </p>
              <button
                type="button"
                className="reset-filter-btn font-mono"
                onClick={() => handleCategorySelect('all')}
              >
                Reset filters to view all articles &rarr;
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
