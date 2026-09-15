import { useEffect, useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  getArticleBySlug,
  getAllArticles,
  extractArticleHeadings,
  Article,
} from '../../data/articles';
import { ArticleContent } from '../../components/ui/ArticleContent/ArticleContent';
import { buildArticleMetadata, buildNotFoundMetadata } from '../../lib/seo/metadata';
import { useSEO, useResolvedSiteUrl } from '../../hooks/useSEO';
import { ArrowLeft, ArrowRight, Clock, Hash } from 'lucide-react';
import './ArticleDetailPage.css';

export function ArticleDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const siteUrl = useResolvedSiteUrl();
  const [readingProgress, setReadingProgress] = useState(0);

  const allArticles = useMemo(() => getAllArticles(), []);
  const article: Article | undefined = useMemo(() => {
    return slug ? getArticleBySlug(slug) : undefined;
  }, [slug]);

  const currentIndex = useMemo(() => {
    return allArticles.findIndex((a) => a.slug === slug);
  }, [allArticles, slug]);

  const prevArticle = currentIndex > 0 ? allArticles[currentIndex - 1] : null;
  const nextArticle = currentIndex >= 0 && currentIndex < allArticles.length - 1 ? allArticles[currentIndex + 1] : null;

  const headings = useMemo(() => {
    return article ? extractArticleHeadings(article.body) : [];
  }, [article]);

  const seoMetadata = useMemo(() => {
    if (article) {
      return buildArticleMetadata(article, { siteUrl });
    }
    return buildNotFoundMetadata({ siteUrl });
  }, [article, siteUrl]);

  useSEO(seoMetadata);

  // Scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // Reading progress tracking
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        const progress = Math.min(100, Math.max(0, (scrollY / docHeight) * 100));
        setReadingProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!article) {
    return (
      <div className="article-not-found-page">
        <div className="container">
          <div className="not-found-box">
            <h1 className="font-heading">Article Not Found</h1>
            <p className="body-regular">
              The article you are looking for does not exist or has been moved.
            </p>
            <Link to="/articles" className="back-to-articles-btn font-mono">
              &larr; Return to Article Index
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <article className="article-detail-page">
      {/* Slim Reading Progress Bar */}
      <div
        className="reading-progress-bar"
        style={{ width: `${readingProgress}%` }}
        role="progressbar"
        aria-valuenow={Math.round(readingProgress)}
        aria-valuemin={0}
        aria-valuemax={100}
      />

      <div className="container">
        {/* Top Navigation Bar */}
        <nav className="detail-top-nav font-mono" aria-label="Breadcrumb">
          <Link to="/articles" className="back-link">
            <ArrowLeft size={14} />
            <span>all articles</span>
          </Link>
          <span className="nav-sep">&bull;</span>
          <span className="current-category">{article.category}</span>
        </nav>

        {/* Article Editorial Header */}
        <header className="article-header">
          <div className="article-meta-top font-mono">
            <span className="category-pill">{article.category}</span>
            <span className="meta-divider">&bull;</span>
            <span className="read-time-pill">
              <Clock size={13} className="meta-icon" />
              {article.readingTime}
            </span>
            {article.publishedDate && (
              <>
                <span className="meta-divider">&bull;</span>
                <time className="publish-date-pill" dateTime={article.publishedDate}>
                  {new Date(article.publishedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </time>
              </>
            )}
          </div>

          <h1 className="article-main-title font-heading">{article.title}</h1>

          <p className="article-lead-excerpt body-large">{article.excerpt}</p>

          {/* Tags Row */}
          <div className="article-header-tags font-mono">
            {article.tags.map((tag) => (
              <span key={tag} className="tag-pill">
                <Hash size={11} />
                {tag}
              </span>
            ))}
          </div>

          <div className="header-bottom-divider" aria-hidden="true" />
        </header>

        {/* Main Article Content & Table of Contents Layout */}
        <div className="article-layout-grid">
          {/* Main Reading Column */}
          <main className="article-main-column">
            <ArticleContent content={article.body} />
          </main>

          {/* Desktop Table of Contents Sidebar */}
          {headings.length > 0 && (
            <aside className="article-toc-sidebar" aria-label="Table of contents">
              <div className="toc-sticky-box">
                <h4 className="toc-heading font-mono">CONTENTS</h4>
                <ul className="toc-list font-mono">
                  {headings.map((heading) => (
                    <li key={heading.id} className="toc-item">
                      <button
                        type="button"
                        onClick={() => scrollToHeading(heading.id)}
                        className="toc-anchor"
                      >
                        {heading.text}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          )}
        </div>

        {/* Next / Previous Article Navigation */}
        <footer className="article-footer-nav">
          <div className="footer-nav-grid">
            {prevArticle ? (
              <Link
                to={`/articles/${prevArticle.slug}`}
                className="nav-card prev-card"
                data-cursor="READ"
                aria-label={`Previous article: ${prevArticle.title}`}
              >
                <div className="nav-card-label font-mono">
                  <ArrowLeft size={13} />
                  <span>PREVIOUS NOTE</span>
                </div>
                <h4 className="nav-card-title font-heading">{prevArticle.title}</h4>
                <p className="nav-card-excerpt body-small">{prevArticle.excerpt}</p>
              </Link>
            ) : (
              <div className="nav-card-placeholder" />
            )}

            {nextArticle ? (
              <Link
                to={`/articles/${nextArticle.slug}`}
                className="nav-card next-card"
                data-cursor="READ"
                aria-label={`Next article: ${nextArticle.title}`}
              >
                <div className="nav-card-label font-mono">
                  <span>NEXT NOTE</span>
                  <ArrowRight size={13} />
                </div>
                <h4 className="nav-card-title font-heading">{nextArticle.title}</h4>
                <p className="nav-card-excerpt body-small">{nextArticle.excerpt}</p>
              </Link>
            ) : (
              <div className="nav-card-placeholder" />
            )}
          </div>

          <div className="back-to-index-row font-mono">
            <button
              type="button"
              onClick={() => navigate('/articles')}
              className="footer-index-btn"
            >
              &larr; View all articles in index
            </button>
          </div>
        </footer>
      </div>
    </article>
  );
}
