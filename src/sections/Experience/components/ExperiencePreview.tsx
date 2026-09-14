interface ExperiencePreviewProps {
  images?: string[];
  caption?: string;
}

export function ExperiencePreview({ images, caption }: ExperiencePreviewProps) {
  if (!images || images.length === 0) return null;

  const imgSrc = images[0];

  return (
    <figure className="experience-preview-box">
      <div className="preview-media-frame">
        <img
          src={imgSrc}
          alt={caption || 'Experience documentation and workflow'}
          className="preview-image"
          loading="lazy"
        />
      </div>
      {caption && (
        <figcaption className="preview-caption font-mono">
          <span className="caption-dot" aria-hidden="true">&bull;</span> {caption}
        </figcaption>
      )}
    </figure>
  );
}
