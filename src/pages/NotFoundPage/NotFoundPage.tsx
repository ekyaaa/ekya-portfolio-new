import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { buildNotFoundMetadata } from '../../lib/seo/metadata';
import { useSEO, useResolvedSiteUrl } from '../../hooks/useSEO';
import { ArrowLeft, BookOpen } from 'lucide-react';
import './NotFoundPage.css';

export function NotFoundPage() {
  const siteUrl = useResolvedSiteUrl();

  const seoMetadata = useMemo(() => {
    return buildNotFoundMetadata({ siteUrl });
  }, [siteUrl]);

  useSEO(seoMetadata);

  return (
    <main className="not-found-page">
      <div className="not-found-container">
        <div className="not-found-code font-mono">404</div>
        <h1 className="not-found-title">Page Not Found</h1>
        <p className="not-found-desc">
          The page or case study you requested could not be located. It may have been moved, renamed, or does not exist.
        </p>

        <div className="not-found-actions font-mono">
          <Link to="/" className="not-found-btn primary">
            <ArrowLeft size={16} />
            <span>Back to Portfolio</span>
          </Link>
          <Link to="/articles" className="not-found-btn">
            <BookOpen size={16} />
            <span>Read Articles</span>
          </Link>
        </div>
      </div>
    </main>
  );
}

export default NotFoundPage;
