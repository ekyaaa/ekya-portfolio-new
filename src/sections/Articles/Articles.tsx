import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import { gsap } from '../../animations/gsap';
import { getLandingPreviewArticles } from '../../data/articles';
import { ArrowUpRight, ArrowRight, BookOpen } from 'lucide-react';
import './Articles.css';

export function Articles() {
  const sectionRef = useRef<HTMLElement>(null);
  const preview = getLandingPreviewArticles();

  useGSAP(
    () => {
      gsap.from('[data-articles-reveal]', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} id="articles" className="articles-section">
      <div className="container">
        {/* Section Label */}
        <div className="section-label" data-articles-reveal>
          <span className="number">05</span> articles.
        </div>

        {/* Section Header */}
        <div className="articles-header-group" data-articles-reveal>
          <h2 className="section-title">Articles &amp; Notes</h2>
          <p className="body-regular header-subtitle">
            Technical case studies, engineering notes, and reflections from the systems I build,
            debug, and learn from.
          </p>
        </div>

        {/* 3-Column Asymmetric Grid */}
        <div className="articles-grid" data-articles-reveal>
          {/* Card A: Large Featured Card (Spans Left 2 Columns) */}
          <Link
            to={`/articles/${preview.featured.slug}`}
            className="article-card featured-article-card"
            data-cursor="READ"
            aria-label={`Read article: ${preview.featured.title}`}
          >
            <div className="card-top">
              <span className="card-tag font-mono">{preview.featured.category}</span>
              <span className="read-time font-mono">{preview.featured.readingTime}</span>
            </div>

            <div className="featured-content">
              <h3 className="featured-title font-heading">{preview.featured.title}</h3>
              <p className="featured-excerpt body-regular">{preview.featured.excerpt}</p>
            </div>

            <div className="card-footer font-mono">
              <span className="open-text">Read case study</span>
              <ArrowUpRight size={16} className="card-arrow" />
            </div>
          </Link>

          {/* Card B: Upper-Right Card */}
          <Link
            to={`/articles/${preview.topRight.slug}`}
            className="article-card standard-article-card"
            data-cursor="READ"
            aria-label={`Read article: ${preview.topRight.title}`}
          >
            <div className="card-top">
              <span className="card-tag font-mono">{preview.topRight.category}</span>
              <span className="read-time font-mono">{preview.topRight.readingTime}</span>
            </div>

            <h3 className="card-item-title font-heading">{preview.topRight.title}</h3>
            <p className="card-item-desc body-small">{preview.topRight.excerpt}</p>

            <div className="card-footer font-mono">
              <span className="open-text">Read notes</span>
              <ArrowUpRight size={16} className="card-arrow" />
            </div>
          </Link>

          {/* Card C: Bottom-Left Card */}
          <Link
            to={`/articles/${preview.bottomLeft.slug}`}
            className="article-card standard-article-card"
            data-cursor="READ"
            aria-label={`Read article: ${preview.bottomLeft.title}`}
          >
            <div className="card-top">
              <span className="card-tag font-mono">{preview.bottomLeft.category}</span>
              <span className="read-time font-mono">{preview.bottomLeft.readingTime}</span>
            </div>

            <h3 className="card-item-title font-heading">{preview.bottomLeft.title}</h3>
            <p className="card-item-desc body-small">{preview.bottomLeft.excerpt}</p>

            <div className="card-footer font-mono">
              <span className="open-text">Read notes</span>
              <ArrowUpRight size={16} className="card-arrow" />
            </div>
          </Link>

          {/* Card D: Bottom-Center Card */}
          <Link
            to={`/articles/${preview.bottomCenter.slug}`}
            className="article-card standard-article-card"
            data-cursor="READ"
            aria-label={`Read article: ${preview.bottomCenter.title}`}
          >
            <div className="card-top">
              <span className="card-tag font-mono">{preview.bottomCenter.category}</span>
              <span className="read-time font-mono">{preview.bottomCenter.readingTime}</span>
            </div>

            <h3 className="card-item-title font-heading">{preview.bottomCenter.title}</h3>
            <p className="card-item-desc body-small">{preview.bottomCenter.excerpt}</p>

            <div className="card-footer font-mono">
              <span className="open-text">Read notes</span>
              <ArrowUpRight size={16} className="card-arrow" />
            </div>
          </Link>

          {/* Card E: Bottom-Right CTA Card */}
          <Link
            to="/articles"
            className="article-card cta-index-card"
            data-cursor="VIEW"
            aria-label="Browse all articles and notes"
          >
            <div className="card-top">
              <span className="card-tag font-mono">ARTICLE INDEX</span>
              <BookOpen size={16} className="cta-icon" />
            </div>

            <div className="cta-content">
              <h3 className="card-item-title font-heading">Browse All Articles</h3>
              <p className="card-item-desc body-small">
                Five long-form notes on engineering, infrastructure, AI tooling, architecture, and
                growth.
              </p>
            </div>

            <div className="card-footer font-mono cta-footer">
              <span className="cta-link-text">View archive</span>
              <ArrowRight size={16} className="card-arrow" />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
