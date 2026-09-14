import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from '../../../animations/gsap';
import { useReducedMotion } from '../../../hooks/useReducedMotion';
import { Milestone } from '../milestone.types';
import { getMilestoneAssetUrl } from '../milestoneMedia';
import { MilestoneMedia } from './MilestoneMedia';
import {
  X,
  Award,
  Flag,
  Presentation,
  ExternalLink,
  Calendar,
  MapPin,
  Building2,
  CheckCircle2,
  Sparkles,
  Layers,
  ArrowRight,
} from 'lucide-react';

interface MilestoneModalProps {
  item: Milestone | null;
  onClose: () => void;
  onSelectRelated?: (milestoneId: string) => void;
}

export function MilestoneModal({ item, onClose, onSelectRelated }: MilestoneModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [isClosing, setIsClosing] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Smooth GSAP Close Animation
  const handleClose = useCallback(() => {
    if (isClosing) return;

    if (prefersReducedMotion || !backdropRef.current || !modalRef.current) {
      onClose();
      return;
    }

    setIsClosing(true);

    const tl = gsap.timeline({
      onComplete: () => {
        setIsClosing(false);
        onClose();
      },
    });

    tl.to(modalRef.current, {
      opacity: 0,
      y: 18,
      scale: 0.98,
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

  // Entrance animation on modal mount / item change
  useEffect(() => {
    if (!item) return;
    if (prefersReducedMotion) return;

    if (backdropRef.current && modalRef.current) {
      gsap.set(backdropRef.current, { opacity: 0 });
      gsap.set(modalRef.current, { opacity: 0, y: 22, scale: 0.98 });

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.to(backdropRef.current, {
        opacity: 1,
        duration: 0.3,
      }).to(
        modalRef.current,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.38,
        },
        '-=0.16'
      );
    }
  }, [item, prefersReducedMotion]);

  // Focus trap & Escape key
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (activeImage) {
          setActiveImage(null);
        } else {
          handleClose();
        }
        return;
      }

      if (e.key === 'Tab' && modalRef.current) {
        const focusables = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;

        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    },
    [activeImage, handleClose]
  );

  useEffect(() => {
    if (!item) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    // Initial focus on close button
    const timer = setTimeout(() => {
      closeBtnRef.current?.focus();
    }, 60);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      clearTimeout(timer);
    };
  }, [item, handleKeyDown]);

  if (!item) return null;

  const heroImage = item.gallery.find((g) => g.isHero) || item.gallery[0];
  const heroImageUrl = heroImage
    ? getMilestoneAssetUrl(heroImage.folder || item.mediaFolder, heroImage.filename)
    : undefined;

  const renderTypeBadge = (type: Milestone['type']) => {
    switch (type) {
      case 'award':
        return (
          <span className="modal-badge badge-award font-mono">
            <Award size={14} /> Competition Award
          </span>
        );
      case 'finalist':
        return (
          <span className="modal-badge badge-finalist font-mono">
            <Flag size={14} /> National Finalist
          </span>
        );
      case 'showcase':
        return (
          <span className="modal-badge badge-showcase font-mono">
            <Presentation size={14} /> Product Showcase
          </span>
        );
      default:
        return (
          <span className="modal-badge badge-competition font-mono">
            <Sparkles size={14} /> Competition
          </span>
        );
    }
  };

  return (
    <div
      ref={backdropRef}
      className="milestone-modal-backdrop"
      onClick={handleClose}
      aria-modal="true"
      role="dialog"
      aria-labelledby="milestone-modal-title"
      data-lenis-prevent
    >
      <div
        ref={modalRef}
        className="milestone-modal-container"
        onClick={(e) => e.stopPropagation()}
        tabIndex={-1}
        data-lenis-prevent
      >
        {/* Close Button */}
        <button
          ref={closeBtnRef}
          type="button"
          className="modal-close-btn"
          onClick={handleClose}
          aria-label="Close milestone article modal"
          data-cursor="CLOSE"
        >
          <span className="close-key-hint font-mono">ESC</span>
          <X size={18} />
        </button>

        <article className="modal-editorial-article">
          {/* Article Header */}
          <header className="modal-article-header">
            <div className="modal-meta-top font-mono">
              <span className="meta-year-pill">{item.year}</span>
              <span className="meta-month-tag">{item.month}</span>
              {item.scope && (
                <>
                  <span className="meta-sep">&bull;</span>
                  <span className="meta-scope-tag">{item.scope} scope</span>
                </>
              )}
            </div>

            <h2 id="milestone-modal-title" className="modal-title font-heading">
              {item.title}
            </h2>

            {item.subtitle && <p className="modal-subtitle font-mono">{item.subtitle}</p>}

            {/* Badges and Placements */}
            <div className="modal-badge-group">
              {renderTypeBadge(item.type)}
              {item.result && (
                <span className="modal-result-pill font-mono">
                  <CheckCircle2 size={14} /> {item.result}
                </span>
              )}
            </div>

            {/* Event Logistics */}
            <div className="modal-logistics-bar font-mono">
              {item.organizer && (
                <div className="logistics-item">
                  <Building2 size={14} className="logistics-icon" />
                  <span>{item.organizer}</span>
                </div>
              )}
              {item.location && (
                <div className="logistics-item">
                  <MapPin size={14} className="logistics-icon" />
                  <span>{item.location}</span>
                </div>
              )}
              <div className="logistics-item">
                <Calendar size={14} className="logistics-icon" />
                <span>
                  {item.month} {item.year}
                </span>
              </div>
            </div>
          </header>

          <div className="modal-divider" aria-hidden="true" />

          {/* Lead Hero Media */}
          {heroImageUrl && (
            <figure className="modal-hero-figure">
              <MilestoneMedia
                src={heroImageUrl}
                alt={heroImage?.alt || item.title}
                kind={heroImage?.kind || (heroImage?.isDocument ? 'certificate' : 'photo')}
                fit={heroImage?.fit || 'auto'}
                position={heroImage?.position}
                aspectRatio={heroImage?.aspectRatio}
                className="modal-hero-media"
                onClick={() => setActiveImage(heroImageUrl)}
                priority={true}
              />
              {heroImage?.caption && (
                <figcaption className="modal-hero-caption font-mono">
                  {heroImage.caption} &bull; <span className="zoom-hint">click to expand</span>
                </figcaption>
              )}
            </figure>
          )}

          {/* Context & Background */}
          {item.story.context && (
            <section className="modal-section modal-context-section">
              <h4 className="section-label-heading font-mono">01 / CONTEXT & BACKGROUND</h4>
              <p className="body-large lead-paragraph">{item.story.context}</p>
            </section>
          )}

          {/* Project & Technical Challenge */}
          {item.story.projectAndChallenge && (
            <section className="modal-section modal-project-section">
              <h4 className="section-label-heading font-mono">02 / WHAT WAS BUILT & THE CHALLENGE</h4>
              <p className="body-regular section-paragraph">{item.story.projectAndChallenge}</p>
            </section>
          )}

          {/* Multi-Stage Progression (for Ceriaku) */}
          {item.progressionStages && item.progressionStages.length > 0 && (
            <section className="modal-section modal-progression-section">
              <h4 className="section-label-heading font-mono">PROGRESSION & SHOWCASE FLOW</h4>
              <div className="progression-stepper">
                {item.progressionStages.map((stage, idx) => (
                  <div key={stage.step} className="stepper-node">
                    <div className="stepper-header font-mono">
                      <span className="stepper-step">{stage.step}</span>
                      <span className="stepper-tag">{stage.tag}</span>
                    </div>
                    <h5 className="stepper-title font-heading">{stage.title}</h5>
                    <p className="stepper-desc body-regular">{stage.description}</p>
                    {idx < item.progressionStages!.length - 1 && (
                      <div className="stepper-arrow" aria-hidden="true">
                        <ArrowRight size={18} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Sub-Events Breakdown (for June 2026 Intercomp & PLAY IT!) */}
          {item.subEvents && item.subEvents.length > 0 && (
            <section className="modal-section modal-subevents-section">
              <h4 className="section-label-heading font-mono">
                <Layers size={14} /> INDIVIDUAL COMPETITION TRACKS
              </h4>
              <div className="subevents-grid">
                {item.subEvents.map((sub) => (
                  <div key={sub.id} className="subevent-card">
                    <div className="subevent-header">
                      <div className="subevent-meta font-mono">
                        <span className="subevent-date">{sub.date}</span>
                        {sub.scope && (
                          <>
                            <span className="meta-sep">&bull;</span>
                            <span className="subevent-scope">{sub.scope}</span>
                          </>
                        )}
                      </div>
                      <h5 className="subevent-title font-heading">{sub.title}</h5>
                      {sub.result && (
                        <div className="subevent-result-badge font-mono">{sub.result}</div>
                      )}
                    </div>

                    <div className="subevent-body body-regular">
                      <p className="subevent-desc">{sub.summary}</p>
                      <div className="subevent-detail-item">
                        <span className="detail-key font-mono">Project:</span>
                        <span className="detail-val">{sub.projectOrChallenge}</span>
                      </div>
                      {sub.constraintOrHighlight && (
                        <div className="subevent-detail-item">
                          <span className="detail-key font-mono">Constraint:</span>
                          <span className="detail-val">{sub.constraintOrHighlight}</span>
                        </div>
                      )}
                      {sub.outcome && (
                        <div className="subevent-detail-item">
                          <span className="detail-key font-mono">Outcome:</span>
                          <span className="detail-val">{sub.outcome}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Role & Specific Contribution */}
          {item.role && (
            <section className="modal-section modal-role-section">
              <h4 className="section-label-heading font-mono">03 / ROLE & CONTRIBUTION</h4>
              <div className="role-card">
                <div className="role-header font-mono">
                  <span className="role-tag-label">Designated Role:</span>
                  <span className="role-tag-value">{item.role}</span>
                </div>
                {item.story.roleContribution && (
                  <p className="body-regular section-paragraph">{item.story.roleContribution}</p>
                )}
              </div>
            </section>
          )}

          {/* Constraints / Interesting Aspects */}
          {item.story.constraint && (
            <section className="modal-section modal-constraint-section">
              <h4 className="section-label-heading font-mono">
                04 / CONSTRAINTS & WHAT MADE IT INTERESTING
              </h4>
              <p className="body-regular section-paragraph">{item.story.constraint}</p>
            </section>
          )}

          {/* Outcome & Key Results */}
          {item.story.outcome && (
            <section className="modal-section modal-outcome-section">
              <h4 className="section-label-heading font-mono">05 / OUTCOME & RESULTS</h4>
              <div className="outcome-box">
                <p className="body-regular outcome-text">{item.story.outcome}</p>
              </div>
            </section>
          )}

          {/* Photo & Document Gallery */}
          {item.gallery && item.gallery.length > 1 && (
            <section className="modal-section modal-gallery-section">
              <h4 className="section-label-heading font-mono">DOCUMENTATION & PHOTOS</h4>
              <div className="modal-gallery-grid">
                {item.gallery.slice(1).map((media) => {
                  const mediaFolder = media.folder || item.mediaFolder;
                  const mediaUrl = getMilestoneAssetUrl(mediaFolder, media.filename);
                  if (!mediaUrl) return null;

                  return (
                    <figure
                      key={`${mediaFolder}-${media.filename}`}
                      className={`gallery-figure ${media.isDocument ? 'is-document' : ''}`}
                    >
                      <MilestoneMedia
                        src={mediaUrl}
                        alt={media.alt}
                        kind={media.kind || (media.isDocument ? 'certificate' : 'photo')}
                        fit={media.fit || (media.isDocument ? 'contain' : 'auto')}
                        position={media.position}
                        aspectRatio={media.aspectRatio}
                        className="modal-gallery-media"
                        onClick={() => setActiveImage(mediaUrl)}
                        loading="lazy"
                      />
                      {media.caption && (
                        <figcaption className="gallery-caption font-mono">
                          {media.caption}
                        </figcaption>
                      )}
                    </figure>
                  );
                })}
              </div>
            </section>
          )}

          {/* External Verification & Project Links */}
          {(item.links?.project ||
            item.links?.verification ||
            item.links?.certificate ||
            item.relatedMilestoneId) && (
            <section className="modal-section modal-links-section">
              <div className="links-row">
                {/* External Project Link (Ceriaku) */}
                {item.links?.project && (
                  <a
                    href={item.links.project}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="modal-btn-link primary-link font-mono"
                  >
                    <span>{item.links.projectLabel || 'View Live Project'}</span>
                    <ExternalLink size={15} />
                  </a>
                )}

                {/* Verification Link (BytesFest UNS) */}
                {item.links?.verification && (
                  <a
                    href={item.links.verification}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="modal-btn-link secondary-link font-mono"
                  >
                    <span>{item.links.verificationLabel || 'Verify Certificate'}</span>
                    <ExternalLink size={15} />
                  </a>
                )}

                {/* Related Milestone Cross-Link */}
                {item.relatedMilestoneId && onSelectRelated && (
                  <button
                    type="button"
                    className="modal-btn-link outline-link font-mono"
                    onClick={() => onSelectRelated(item.relatedMilestoneId!)}
                  >
                    <span>{item.relatedMilestoneLabel || 'View Related Milestone'}</span>
                    <ArrowRight size={15} />
                  </button>
                )}
              </div>
            </section>
          )}
        </article>
      </div>

      {/* Lightbox Zoom Overlay */}
      {activeImage && (
        <div
          className="lightbox-overlay"
          onClick={() => setActiveImage(null)}
          role="dialog"
          aria-label="Full screen image preview"
        >
          <button
            type="button"
            className="lightbox-close"
            onClick={() => setActiveImage(null)}
            aria-label="Close image preview"
          >
            <X size={26} />
          </button>
          <img src={activeImage} alt="Expanded preview" className="lightbox-img" />
        </div>
      )}
    </div>
  );
}
