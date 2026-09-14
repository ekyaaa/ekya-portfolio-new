import { useState, useCallback } from 'react';
import { MediaFit, MediaKind } from '../milestone.types';

export interface MilestoneMediaProps {
  src: string;
  alt: string;
  kind?: MediaKind;
  fit?: MediaFit;
  position?: string;
  aspectRatio?: string;
  className?: string;
  loading?: 'lazy' | 'eager';
  priority?: boolean;
  onClick?: () => void;
  caption?: string;
  showCaption?: boolean;
}

export function MilestoneMedia({
  src,
  alt,
  kind = 'photo',
  fit = 'auto',
  position,
  aspectRatio,
  className = '',
  loading = 'lazy',
  priority = false,
  onClick,
  caption,
  showCaption = false,
}: MilestoneMediaProps) {
  const [naturalDimensions, setNaturalDimensions] = useState<{
    width: number;
    height: number;
    ratio: number;
  } | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleImageLoad = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    if (img.naturalWidth && img.naturalHeight) {
      setNaturalDimensions({
        width: img.naturalWidth,
        height: img.naturalHeight,
        ratio: img.naturalWidth / img.naturalHeight,
      });
    }
    setIsLoaded(true);
  }, []);

  // Determine effective fit mode
  // 1. Explicit override
  // 2. Media kind priority (certificates, announcements, posters, screenshots always contain)
  // 3. Natural ratio inference (ratio < 0.85 = portrait -> contain)
  let effectiveFit: 'cover' | 'contain' = 'cover';
  if (fit === 'contain' || fit === 'cover') {
    effectiveFit = fit;
  } else {
    // fit === 'auto'
    if (
      kind === 'certificate' ||
      kind === 'announcement' ||
      kind === 'poster' ||
      kind === 'screenshot'
    ) {
      effectiveFit = 'contain';
    } else if (naturalDimensions && naturalDimensions.ratio < 0.85) {
      // Natural portrait photo
      effectiveFit = 'contain';
    } else if (aspectRatio && (aspectRatio.includes('9 / 16') || aspectRatio.includes('9/16'))) {
      effectiveFit = 'contain';
    } else {
      effectiveFit = 'cover';
    }
  }

  // Determine effective aspect ratio
  let effectiveAspectRatio = aspectRatio;
  if (!effectiveAspectRatio) {
    if (effectiveFit === 'contain') {
      // In contain mode, we allow the stage to flex to natural height within a safe clamp
      effectiveAspectRatio = undefined;
    } else if (naturalDimensions) {
      const r = naturalDimensions.ratio;
      if (r >= 2.0) {
        effectiveAspectRatio = '2 / 1';
      } else if (r >= 1.4) {
        effectiveAspectRatio = '16 / 9';
      } else if (r >= 1.15) {
        effectiveAspectRatio = '4 / 3';
      } else {
        effectiveAspectRatio = '1 / 1';
      }
    } else {
      // Default placeholder landscape ratio before load
      effectiveAspectRatio = '16 / 9';
    }
  }

  const isPortrait =
    (naturalDimensions && naturalDimensions.ratio < 0.85) ||
    (aspectRatio && (aspectRatio.includes('9 / 16') || aspectRatio.includes('9/16')));

  const isDocument =
    kind === 'certificate' ||
    kind === 'announcement' ||
    kind === 'poster' ||
    kind === 'screenshot';

  const containerClasses = [
    'milestone-media',
    `fit-${effectiveFit}`,
    `kind-${kind}`,
    isPortrait ? 'is-portrait' : 'is-landscape',
    isDocument ? 'is-document' : '',
    onClick ? 'is-clickable' : '',
    isLoaded ? 'is-loaded' : 'is-loading',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const imageStyle: React.CSSProperties = {
    objectFit: effectiveFit,
    objectPosition: position || (effectiveFit === 'cover' ? 'center' : 'center'),
  };

  const containerStyle: React.CSSProperties = {};
  if (effectiveAspectRatio && effectiveFit === 'cover') {
    containerStyle.aspectRatio = effectiveAspectRatio;
  }

  return (
    <div
      className={containerClasses}
      style={containerStyle}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick();
              }
            }
          : undefined
      }
      data-fit={effectiveFit}
      data-kind={kind}
    >
      <div className="milestone-media-stage">
        {!hasError ? (
          <img
            src={src}
            alt={alt}
            style={imageStyle}
            className="milestone-media-img"
            loading={priority ? 'eager' : loading}
            onLoad={handleImageLoad}
            onError={() => setHasError(true)}
          />
        ) : (
          <div className="milestone-media-fallback font-mono">
            <span>[ Documentation Media ]</span>
          </div>
        )}
      </div>

      {showCaption && caption && (
        <p className="milestone-media-caption font-mono">{caption}</p>
      )}
    </div>
  );
}
