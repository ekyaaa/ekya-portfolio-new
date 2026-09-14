import { useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  getProjectBySlug,
  projectsData,
  getProjectVideoUrl,
  Project,
} from '../../data/portfolioData';
import { buildProjectMetadata, buildNotFoundMetadata } from '../../lib/seo/metadata';
import { useSEO, useResolvedSiteUrl } from '../../hooks/useSEO';
import { ArrowLeft, ExternalLink, GitFork } from 'lucide-react';
import './ProjectDetailPage.css';

export function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const siteUrl = useResolvedSiteUrl();

  const project: Project | undefined = useMemo(() => {
    return slug ? getProjectBySlug(slug) : undefined;
  }, [slug]);

  const currentIndex = useMemo(() => {
    return projectsData.findIndex((p) => p.slug === slug || p.id === slug);
  }, [slug]);

  const prevProject = currentIndex > 0 ? projectsData[currentIndex - 1] : null;
  const nextProject = currentIndex >= 0 && currentIndex < projectsData.length - 1 ? projectsData[currentIndex + 1] : null;

  // Build unified SEO metadata
  const seoMetadata = useMemo(() => {
    if (project) {
      return buildProjectMetadata(project, { siteUrl });
    }
    return buildNotFoundMetadata({ siteUrl });
  }, [project, siteUrl]);

  // Synchronize document head & structured data
  useSEO(seoMetadata);

  // Scroll to top on navigation
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!project) {
    return (
      <div className="project-not-found">
        <div className="not-found-box">
          <h1 className="block-heading">Project Not Found</h1>
          <p className="body-regular">
            The project case study you are looking for does not exist or has been moved.
          </p>
          <Link to="/#work" className="project-ext-btn font-mono" style={{ marginTop: '20px' }}>
            &larr; Return to Portfolio
          </Link>
        </div>
      </div>
    );
  }

  const videoUrl = getProjectVideoUrl(project.videoConfig);

  return (
    <article className="project-detail-page">
      <div className="project-detail-container">
        {/* Top Breadcrumb Navigation */}
        <nav className="project-top-nav font-mono" aria-label="Breadcrumb">
          <Link to="/#work" className="back-link">
            <ArrowLeft size={14} />
            <span>back to portfolio</span>
          </Link>
          <span className="nav-sep" aria-hidden="true">/</span>
          <span className="current-badge">{project.category || 'Case Study'}</span>
        </nav>

        {/* Hero Header */}
        <header className="project-hero-header">
          <div className="project-meta-pill-row font-mono">
            <span className="project-index-num">{project.index || project.number}</span>
            <span className="nav-sep" aria-hidden="true">&bull;</span>
            <span>{project.year}</span>
            <span className="nav-sep" aria-hidden="true">&bull;</span>
            <span>{project.role}</span>
            {project.collaborationType && (
              <span className="project-collab-pill">{project.collaborationType}</span>
            )}
          </div>

          <h1 className="project-main-title">{project.title}</h1>

          <p className="project-intro-lead">
            {project.shortDescription || project.description || project.intro}
          </p>

          <div className="project-actions-row font-mono">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="project-ext-btn primary-btn"
              >
                <span>Live Demo</span>
                <ExternalLink size={14} />
              </a>
            )}
            {project.repositoryUrl && (
              <a
                href={project.repositoryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="project-ext-btn"
              >
                <span>Repository</span>
                <GitFork size={14} />
              </a>
            )}
            {project.companyUrl && (
              <a
                href={project.companyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="project-ext-btn"
              >
                <span>Company / Event</span>
                <ExternalLink size={14} />
              </a>
            )}
          </div>
        </header>

        {/* Highlighted Metrics */}
        {project.metrics && project.metrics.length > 0 && (
          <section className="project-metrics-grid" aria-label="Key project metrics">
            {project.metrics.map((metric, i) => (
              <div key={i} className="metric-card">
                <span className="metric-value font-mono">{metric.value}</span>
                <span className="metric-label font-mono">{metric.label}</span>
              </div>
            ))}
          </section>
        )}

        {/* Video Player */}
        {videoUrl && (
          <section className="project-video-wrapper" aria-label="Interactive demonstration video">
            <video
              src={videoUrl}
              controls
              playsInline
              preload="metadata"
            >
              Your browser does not support the video tag.
            </video>
          </section>
        )}

        {/* Detailed Narrative / Overview */}
        {project.overview && project.overview.length > 0 && (
          <section className="project-content-block">
            <h2 className="block-heading">System Overview</h2>
            <div className="prose-paragraphs">
              {project.overview.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </section>
        )}

        {/* Challenges & Constraints */}
        {project.challenge && project.challenge.length > 0 && (
          <section className="project-content-block">
            <h2 className="block-heading">Architectural &amp; Technical Challenges</h2>
            <div className="prose-paragraphs">
              {project.challenge.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </section>
        )}

        {/* Key Architectural Decisions */}
        {project.technicalDecisions && project.technicalDecisions.length > 0 && (
          <section className="project-content-block">
            <h2 className="block-heading">Key Architectural Decisions</h2>
            <div className="decisions-grid">
              {project.technicalDecisions.map((dec, i) => (
                <div key={i} className="decision-item">
                  <h3 className="decision-title font-heading">{dec.title}</h3>
                  <p className="decision-desc">{dec.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Engineering Contributions */}
        {project.contributions && project.contributions.length > 0 && (
          <section className="project-content-block">
            <h2 className="block-heading">Engineering Contributions</h2>
            <div className="contributions-grid">
              {project.contributions.map((con, i) => (
                <div key={i} className="contribution-item">
                  <h3 className="contribution-title font-heading">{con.title}</h3>
                  <p className="contribution-desc">{con.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Gallery & Showcase */}
        {project.images && project.images.length > 0 && (
          <section className="project-gallery-block">
            <h2 className="block-heading">System Visuals &amp; Workflows</h2>
            <div className="gallery-grid">
              {project.images.map((img, i) => (
                <figure key={i} className="gallery-figure">
                  <img
                    src={img.src}
                    alt={img.alt || `${project.title} screenshot ${i + 1}`}
                    loading="lazy"
                    decoding="async"
                  />
                  {img.caption && (
                    <figcaption className="font-mono">{img.caption}</figcaption>
                  )}
                </figure>
              ))}
            </div>
          </section>
        )}

        {/* Technologies & Tooling */}
        {project.stack && project.stack.length > 0 && (
          <section className="tech-stack-group">
            <h2 className="block-heading">Technologies &amp; Core Stack</h2>
            <div className="tech-badges-list font-mono">
              {project.stack.map((tech) => (
                <span key={tech} className="tech-badge">
                  {tech}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Bottom Pagination */}
        <nav className="project-pagination-nav font-mono" aria-label="Project pagination">
          {prevProject ? (
            <Link to={`/projects/${prevProject.slug}`} className="pagination-item prev">
              <span className="pagination-label">&larr; Previous Case Study</span>
              <span className="pagination-title">{prevProject.title}</span>
            </Link>
          ) : <div />}

          {nextProject && (
            <Link to={`/projects/${nextProject.slug}`} className="pagination-item next">
              <span className="pagination-label">Next Case Study &rarr;</span>
              <span className="pagination-title">{nextProject.title}</span>
            </Link>
          )}
        </nav>
      </div>
    </article>
  );
}
