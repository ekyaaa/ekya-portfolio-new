import { useEffect, useRef, useState, useCallback } from 'react';
import { Project, getProjectVideoUrl } from '../../../data/portfolioData';
import { gsap } from '../../../animations/gsap';
import { useReducedMotion } from '../../../hooks/useReducedMotion';
import { X, ExternalLink, GitFork, Play } from 'lucide-react';
import './ProjectModal.css';

interface ProjectModalProps {
  project: Project;
  totalProjects: number;
  onClose: () => void;
  triggerElement?: HTMLElement | null;
}

export function ProjectModal({
  project,
  totalProjects,
  onClose,
  triggerElement,
}: ProjectModalProps) {
  const backdropRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const mainImageRef = useRef<HTMLImageElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [isClosing, setIsClosing] = useState<boolean>(false);

  const prefersReducedMotion = useReducedMotion();

  // Resolve video URL safely via centralized helper
  const videoUrl = getProjectVideoUrl(project.videoConfig);

  // Handle smooth closing animation
  const handleClose = useCallback(() => {
    if (isClosing) return;

    if (prefersReducedMotion) {
      onClose();
      return;
    }

    setIsClosing(true);

    const tl = gsap.timeline({
      onComplete: () => {
        onClose();
      },
    });

    tl.to(modalRef.current, {
      opacity: 0,
      y: 12,
      duration: 0.22,
      ease: 'power2.in',
    }).to(
      backdropRef.current,
      {
        opacity: 0,
        duration: 0.2,
        ease: 'power2.in',
      },
      '-=0.1'
    );
  }, [isClosing, onClose, prefersReducedMotion]);

  // Keyboard navigation (ESC key) and focus trap
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        handleClose();
        return;
      }

      // Focus trap within modal
      if (e.key === 'Tab' && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, video, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Initial focus on close button
    const timer = setTimeout(() => {
      closeBtnRef.current?.focus();
    }, 50);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      clearTimeout(timer);
    };
  }, [handleClose]);

  // Lock body scroll and restore focus to trigger upon unmount
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
      if (triggerElement && typeof triggerElement.focus === 'function') {
        triggerElement.focus();
      }
    };
  }, [triggerElement]);

  // Modal open entrance animation
  useEffect(() => {
    if (prefersReducedMotion) return;

    if (backdropRef.current && modalRef.current) {
      gsap.set(backdropRef.current, { opacity: 0 });
      gsap.set(modalRef.current, { opacity: 0, y: 16 });

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.to(backdropRef.current, {
        opacity: 1,
        duration: 0.3,
      }).to(
        modalRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.35,
        },
        '-=0.15'
      );
    }
  }, [prefersReducedMotion]);

  // Crossfade main image on thumbnail click
  const handleSelectImage = (index: number) => {
    if (index === activeImageIndex) return;

    if (prefersReducedMotion || !mainImageRef.current) {
      setActiveImageIndex(index);
      return;
    }

    gsap.to(mainImageRef.current, {
      opacity: 0,
      duration: 0.15,
      ease: 'power2.out',
      onComplete: () => {
        setActiveImageIndex(index);
        gsap.to(mainImageRef.current, {
          opacity: 1,
          duration: 0.25,
          ease: 'power2.out',
        });
      },
    });
  };

  const images = project.images || [];
  const activeImage = images[activeImageIndex] || images[0];
  const hasMultipleImages = images.length > 1;

  const totalFormatted = totalProjects.toString().padStart(2, '0');

  return (
    <div
      ref={backdropRef}
      className="project-modal-backdrop"
      onClick={handleClose}
      aria-hidden="false"
    >
      <div
        ref={modalRef}
        className="project-modal-dialog"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        data-lenis-prevent
      >
        {/* Sticky / Fixed Close Button at Top-Right */}
        <button
          ref={closeBtnRef}
          type="button"
          className="modal-close-btn"
          onClick={handleClose}
          aria-label="Close project case study modal"
          data-cursor="CLOSE"
        >
          <span className="close-key-hint font-mono">ESC</span>
          <X size={18} />
        </button>

        {/* Modal Scrollable Container */}
        <div className="modal-scroll-content">
          {/* 1. PROJECT HERO */}
          <header className="modal-hero-header">
            <div className="modal-index-block font-mono">
              <span className="modal-index-tag">[{project.index} / {totalFormatted}]</span>
              {project.category && (
                <span className="modal-category-tag font-mono">
                  {project.category}
                </span>
              )}
              {project.collaborationType && (
                <span className="modal-collab-tag font-mono">
                  {project.collaborationType}
                </span>
              )}
            </div>

            <h2 id="project-modal-title" className="modal-headline font-heading">
              {project.title}
            </h2>

            <div className="modal-meta-row font-mono">
              <span className="modal-role">{project.role}</span>
              <span className="modal-meta-divider">&bull;</span>
              <span className="modal-year">{project.year}</span>
            </div>

            <div className="modal-lead-intro font-body">
              {project.intro.split('\n\n').map((paragraph, pIdx) => (
                <p key={pIdx} className="lead-paragraph">
                  {paragraph}
                </p>
              ))}
            </div>
          </header>

          {/* 2. PROJECT MEDIA (VIDEO OR IMAGE GALLERY) */}
          {videoUrl ? (
            <section className="modal-video-section" aria-label="Project Video Demonstration">
              <div className="modal-video-frame">
                <video
                  ref={videoRef}
                  src={videoUrl}
                  controls
                  playsInline
                  preload="metadata"
                  className="modal-video-player"
                  aria-label={`${project.title} interactive video walkthrough`}
                >
                  Your browser does not support the video tag.
                </video>
                <div className="video-caption-bar font-mono">
                  <span className="video-caption-icon"><Play size={12} /></span>
                  <span className="caption-text">Video Walkthrough &mdash; {project.title}</span>
                </div>
              </div>

              {/* Optional supplementary image gallery if images exist */}
              {images.length > 0 && (
                <div className="gallery-thumbnails-rail video-thumbs" role="tablist" aria-label="Supporting project screenshots">
                  {images.map((img, idx) => (
                    <div key={img.src} className="video-thumb-static">
                      <img src={img.src} alt={img.alt} className="thumb-img" loading="lazy" />
                      <span className="thumb-idx-label font-mono">0{idx + 1}</span>
                    </div>
                  ))}
                </div>
              )}
            </section>
          ) : activeImage ? (
            <section className="modal-visual-gallery" aria-label="Project Visual Gallery">
              <div className="gallery-main-frame">
                <img
                  ref={mainImageRef}
                  src={activeImage.src}
                  alt={activeImage.alt}
                  className="gallery-main-img"
                  loading="lazy"
                />
                <div className="gallery-caption-bar font-mono">
                  <span className="caption-text">{activeImage.caption}</span>
                </div>
              </div>

              {hasMultipleImages && (
                <div
                  className="gallery-thumbnails-rail"
                  role="tablist"
                  aria-label="Select preview image"
                >
                  {images.map((img, idx) => {
                    const isActive = idx === activeImageIndex;
                    return (
                      <button
                        key={img.src}
                        type="button"
                        role="tab"
                        aria-selected={isActive}
                        aria-label={`View image ${idx + 1}: ${img.caption}`}
                        className={`thumb-button ${isActive ? 'is-active' : ''}`}
                        onClick={() => handleSelectImage(idx)}
                        data-cursor="VIEW"
                      >
                        <img
                          src={img.src}
                          alt={img.alt}
                          className="thumb-img"
                          loading="lazy"
                        />
                        <span className="thumb-idx-label font-mono">
                          0{idx + 1}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </section>
          ) : null}

          {/* 3. EDITORIAL CASE STUDY STORY */}
          <div className="modal-story-narrative">
            {/* 01 — OVERVIEW */}
            {project.overview && project.overview.length > 0 && (
              <section className="story-section">
                <div className="story-section-label font-mono">
                  <span className="label-num">01</span> &mdash; OVERVIEW
                </div>
                <div className="story-section-body body-regular">
                  {project.overview.map((para, i) => (
                    <p key={i} className="story-para">
                      {para}
                    </p>
                  ))}
                </div>
              </section>
            )}

            {/* 02 — THE PROBLEM / WHY I BUILT IT */}
            {project.challenge && project.challenge.length > 0 && (
              <section className="story-section">
                <div className="story-section-label font-mono">
                  <span className="label-num">02</span> &mdash; THE PROBLEM
                </div>
                <div className="story-section-body body-regular">
                  {project.challenge.map((para, i) => (
                    <p key={i} className="story-para">
                      {para}
                    </p>
                  ))}
                </div>
              </section>
            )}

            {/* 03 — MY ROLE & CONTRIBUTIONS */}
            {project.contributions && project.contributions.length > 0 && (
              <section className="story-section">
                <div className="story-section-label font-mono">
                  <span className="label-num">03</span> &mdash; MY ROLE & CONTRIBUTIONS
                </div>
                <div className="story-section-body">
                  <p className="role-statement body-regular">
                    I took ownership of key architectural foundations and core implementations, focusing on reliable engineering, modular patterns, and maintainable software boundaries.
                  </p>

                  <div className="contributions-editorial-list">
                    {project.contributions.map((c, i) => (
                      <div key={i} className="contribution-item">
                        <div className="contribution-header font-mono">
                          <span className="c-number">0{i + 1}</span>
                          <span className="c-title">{c.title}</span>
                        </div>
                        <div className="contribution-desc body-regular">
                          {c.description}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* 04 — TECHNICAL APPROACH & ARCHITECTURE */}
            {project.technicalDecisions && project.technicalDecisions.length > 0 && (
              <section className="story-section">
                <div className="story-section-label font-mono">
                  <span className="label-num">04</span> &mdash; TECHNICAL APPROACH
                </div>
                <div className="story-section-body">
                  <div className="decisions-editorial-grid">
                    {project.technicalDecisions.map((tech, i) => (
                      <div key={i} className="decision-block">
                        <div className="decision-lead font-mono">
                          <span className="d-num">0{i + 1} /</span>
                          <span className="d-title">{tech.title}</span>
                        </div>
                        <p className="decision-text body-regular">
                          {tech.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* 05 — KEY FEATURES */}
            {project.keyFeatures && project.keyFeatures.length > 0 && (
              <section className="story-section">
                <div className="story-section-label font-mono">
                  <span className="label-num">05</span> &mdash; KEY FEATURES
                </div>
                <div className="story-section-body">
                  <div className="features-editorial-list">
                    {project.keyFeatures.map((feat, i) => (
                      <div key={i} className="feature-item">
                        <span className="f-num font-mono">0{i + 1}</span>
                        <p className="f-text body-regular">{feat}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* 06 — COLLABORATION & OWNERSHIP */}
            {project.collaborationDetails && (
              <section className="story-section">
                <div className="story-section-label font-mono">
                  <span className="label-num">06</span> &mdash; COLLABORATION & OWNERSHIP
                </div>
                <div className="story-section-body">
                  <div className="collab-editorial-card">
                    <div className="collab-meta-row font-mono">
                      <span className="collab-label-heading">PROJECT TYPE:</span>
                      <span className="collab-badge-indicator">{project.collaborationType}</span>
                    </div>
                    <p className="collab-narrative body-regular">
                      {project.collaborationDetails}
                    </p>
                  </div>
                </div>
              </section>
            )}

            {/* 07 — TECHNOLOGIES & STACK */}
            <section className="story-section">
              <div className="story-section-label font-mono">
                <span className="label-num">07</span> &mdash; TECHNOLOGIES & STACK
              </div>
              <div className="story-section-body">
                {project.groupedStack && project.groupedStack.length > 0 ? (
                  <div className="grouped-stack-layout">
                    {project.groupedStack.map((group, i) => (
                      <div key={i} className="stack-group-item">
                        <span className="group-name font-mono">{group.category}</span>
                        <div className="tech-tags-wrap">
                          {group.technologies.map((t) => (
                            <span key={t} className="tech-badge font-mono">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="tech-tags-wrap">
                    {project.stack.map((t) => (
                      <span key={t} className="tech-badge font-mono">
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </section>
          </div>

          {/* 4. FINAL PROJECT FOOTER */}
          <footer className="modal-bottom-footer">
            <div className="footer-identity-area">
              <span className="footer-project-id font-mono">
                {project.index} &mdash; {project.title}
              </span>
              {project.confidential && (
                <p className="confidential-disclaimer font-mono">
                  &bull; Some project details are intentionally limited due to confidentiality.
                </p>
              )}
            </div>

            <div className="footer-actions-area">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-modal-cta primary font-mono"
                  data-cursor="VISIT"
                >
                  View Live System <ExternalLink size={15} />
                </a>
              )}
              {project.repositoryUrl && (
                <a
                  href={project.repositoryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-modal-cta secondary font-mono"
                  data-cursor="CODE"
                >
                  View Repository <GitFork size={14} />
                </a>
              )}
              {project.companyUrl && (
                <a
                  href={project.companyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-modal-cta secondary font-mono"
                  data-cursor="VISIT"
                >
                  Visit Organization <ExternalLink size={14} />
                </a>
              )}
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
