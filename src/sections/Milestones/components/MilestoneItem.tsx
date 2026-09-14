import { Milestone } from '../milestone.types';
import { getMilestoneAssetUrl } from '../milestoneMedia';
import { MilestoneMedia } from './MilestoneMedia';
import { Award, Sparkles, Flag, Presentation, ArrowUpRight } from 'lucide-react';

interface MilestoneItemProps {
  item: Milestone;
  onSelect: (item: Milestone) => void;
}

export function MilestoneItem({ item, onSelect }: MilestoneItemProps) {
  const isHighEmphasis = item.emphasis === 'high';
  const coverUrl = item.coverFilename
    ? getMilestoneAssetUrl(item.mediaFolder, item.coverFilename)
    : undefined;

  const renderTypeIcon = (type: Milestone['type']) => {
    switch (type) {
      case 'award':
        return <Award size={13} className="badge-icon" />;
      case 'finalist':
        return <Flag size={13} className="badge-icon" />;
      case 'showcase':
        return <Presentation size={13} className="badge-icon" />;
      case 'competition':
      default:
        return <Sparkles size={13} className="badge-icon" />;
    }
  };

  return (
    <article
      className={`milestone-card ${isHighEmphasis ? 'is-high-emphasis' : 'is-standard-emphasis'}`}
      data-milestone-item
      onClick={() => onSelect(item)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(item);
        }
      }}
      data-cursor="OPEN"
      aria-label={`View details for ${item.title}`}
    >
      <div className="card-inner">
        {/* Card Header & Meta */}
        <div className="card-header">
          <div className="meta-left font-mono">
            <span className="meta-month">{item.month}</span>
            <span className="meta-sep">&bull;</span>
            {item.scope && (
              <>
                <span className="meta-scope">{item.scope}</span>
                <span className="meta-sep">&bull;</span>
              </>
            )}
            <span className={`meta-type-tag type-${item.type}`}>
              {renderTypeIcon(item.type)}
              {item.type}
            </span>
          </div>

          {item.result && (
            <div className="meta-result font-mono">
              <span className="result-pill">{item.result}</span>
            </div>
          )}
        </div>

        {/* Card Title & Organizer */}
        <div className="card-heading-group">
          <h3 className="card-title font-heading">{item.title}</h3>
          {item.subtitle && <p className="card-subtitle font-mono">{item.subtitle}</p>}
        </div>

        {/* Sub-events chips if grouped milestone */}
        {item.subEvents && item.subEvents.length > 0 && (
          <div className="sub-events-row font-mono">
            {item.subEvents.map((sub) => (
              <span key={sub.id} className={`sub-event-chip type-${sub.type}`}>
                <span className="chip-name">{sub.title}</span>
                {sub.result && <span className="chip-result">{sub.result}</span>}
              </span>
            ))}
          </div>
        )}

        {/* Role highlight if specified */}
        {item.role && (
          <div className="card-role-row font-mono">
            <span className="role-label">Role:</span>
            <span className="role-value">{item.role}</span>
          </div>
        )}

        {/* Concise 1-sentence summary */}
        <p className="card-summary body-regular">{item.summary}</p>

        {/* Media visual thumbnail */}
        {coverUrl && (() => {
          const coverMediaItem =
            item.gallery.find((g) => g.filename === item.coverFilename) || item.gallery[0];
          const coverConfig = item.coverMediaConfig;
          const effectiveKind = coverConfig?.kind || coverMediaItem?.kind || 'photo';
          const effectiveFit = coverConfig?.fit || coverMediaItem?.fit || 'auto';
          const effectivePosition = coverConfig?.position || coverMediaItem?.position;
          const effectiveAspectRatio = coverConfig?.aspectRatio || coverMediaItem?.aspectRatio;

          return (
            <div className="card-media-wrap">
              <MilestoneMedia
                src={coverUrl}
                alt={coverMediaItem?.alt || `${item.title} cover`}
                kind={effectiveKind}
                fit={effectiveFit}
                position={effectivePosition}
                aspectRatio={effectiveAspectRatio}
                className="card-milestone-media"
                loading="lazy"
              />
            </div>
          );
        })()}

        {/* Card bottom action cue */}
        <div className="card-footer">
          <span className="action-link font-mono">
            read story & details <ArrowUpRight size={14} className="arrow-icon" />
          </span>

          {item.relatedMilestoneLabel && (
            <span className="related-indicator font-mono">
              &larr; {item.relatedMilestoneLabel}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
