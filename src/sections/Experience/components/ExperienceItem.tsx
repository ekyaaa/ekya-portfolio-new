import { Experience } from '../experience.types';
import { formatExperiencePeriod } from '../experience.utils';
import { ExperienceMetrics } from './ExperienceMetrics';
import { ExperiencePreview } from './ExperiencePreview';
import { ExternalLink } from 'lucide-react';

interface ExperienceItemProps {
  experience: Experience;
}

export function ExperienceItem({ experience }: ExperienceItemProps) {
  const periodText = formatExperiencePeriod(experience);

  return (
    <article className="experience-item-row" data-experience-item>
      <div className="item-year-rail font-mono">
        <span className="item-period">{periodText}</span>
        <span className="item-type-badge">{experience.employmentType}</span>
        <span className="item-location-badge">
          {experience.remote ? 'Remote' : experience.location}
        </span>
      </div>

      <div className="item-content-body">
        {/* 1. Role */}
        <h4 className="role-name font-heading">{experience.role}</h4>

        {/* 2. Company & Affiliation */}
        <div className="company-header">
          <div className="company-title-wrap">
            {experience.companyUrl ? (
              <a
                href={experience.companyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="company-name-link font-heading"
                title={`Visit ${experience.company} website`}
              >
                <span>{experience.company}</span>
                <ExternalLink size={16} className="visit-icon" aria-hidden="true" />
              </a>
            ) : (
              <h3 className="company-name font-heading">{experience.company}</h3>
            )}

            {experience.affiliation && (
              <span className="company-affiliation font-mono">{experience.affiliation}</span>
            )}
          </div>
        </div>

        {/* 3. Scope & Date Meta */}
        <div className="item-meta-rail font-mono">
          <span className="item-meta-period">{periodText}</span>
          {experience.scope && (
            <span className="scope-badge font-mono">{experience.scope}</span>
          )}
        </div>

        <p className="summary-paragraph body-regular">{experience.summary}</p>

        {/* Impact Metrics */}
        <ExperienceMetrics metrics={experience.metrics} />

        {/* Responsibilities */}
        {experience.responsibilities && experience.responsibilities.length > 0 && (
          <ul className="timeline-responsibilities body-small">
            {experience.responsibilities.map((resp, idx) => (
              <li key={idx} className="responsibility-item">
                <span className="resp-bullet" aria-hidden="true">&bull;</span>
                <span>{resp}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Tools Per Experience */}
        <div className="item-tools font-mono">
          <span className="tools-label">STACK:</span> {experience.tools.join(' \u00b7 ')}
        </div>
      </div>

      {experience.previewImages && experience.previewImages.length > 0 && (
        <div className="item-preview-side">
          <ExperiencePreview
            images={experience.previewImages}
            caption={experience.previewCaption}
          />
        </div>
      )}
    </article>
  );
}
