import { Experience } from '../experience.types';
import { formatExperiencePeriod } from '../experience.utils';
import { ExperienceMetrics } from './ExperienceMetrics';
import { ExperiencePreview } from './ExperiencePreview';
import { ExternalLink } from 'lucide-react';

interface FeaturedExperienceProps {
  experience: Experience;
}

export function FeaturedExperience({ experience }: FeaturedExperienceProps) {
  const periodText = formatExperiencePeriod(experience);

  return (
    <div className="featured-experience-block" data-experience-reveal>
      <div className="featured-exp-header">
        <span className="featured-exp-tag font-mono">PRIMARY / CURRENT ROLE</span>
        {experience.scope && (
          <span className="featured-scope-tag font-mono">{experience.scope}</span>
        )}
      </div>

      <article className="featured-exp-card">
        <div className="featured-exp-main">
          <div className="featured-exp-content">
            {/* 1. Role Title */}
            <h4 className="role-title font-heading">{experience.role}</h4>

            {/* 2. Company & Affiliation */}
            <div className="company-info-block">
              {experience.companyUrl ? (
                <a
                  href={experience.companyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="company-title-link font-heading"
                  title={`View ${experience.company} on Google Maps`}
                >
                  <span>{experience.company}</span>
                  <ExternalLink size={20} className="visit-icon" aria-hidden="true" />
                </a>
              ) : (
                <h3 className="company-title font-heading">{experience.company}</h3>
              )}
              {experience.affiliation && (
                <div className="company-affiliation font-mono">
                  <span>{experience.affiliation}</span>
                </div>
              )}
            </div>

            {/* 3. Scope & Date Meta Rail */}
            <div className="featured-period-rail font-mono">
              {experience.scope && (
                <span className="scope-badge font-mono">{experience.scope}</span>
              )}
              <span className="period-text">{periodText}</span>
              <span className="type-badge">
                {experience.employmentType} &bull; {experience.remote ? 'Remote' : experience.location}
              </span>
            </div>

            {/* Summary */}
            <p className="summary-text body-regular">{experience.summary}</p>

            {/* Impact Metrics */}
            <ExperienceMetrics metrics={experience.metrics} />

            {/* Responsibilities list */}
            <ul className="responsibilities-list body-small">
              {experience.responsibilities.map((resp, i) => (
                <li key={i} className="responsibility-item">
                  <span className="resp-bullet" aria-hidden="true">&bull;</span>
                  <span>{resp}</span>
                </li>
              ))}
            </ul>

            {/* Subtle Tools List */}
            <div className="exp-tools-row font-mono">
              <span className="tools-label">CORE STACK:</span> {experience.tools.join(' \u00b7 ')}
            </div>
          </div>
        </div>

        <div className="featured-exp-visual">
          <ExperiencePreview
            images={experience.previewImages}
            caption={experience.previewCaption}
          />
          {experience.companyUrl && (
            <a
              href={experience.companyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="visit-action font-mono"
            >
              {experience.companyUrl.includes('maps') ? 'view on google maps' : 'visit website'}{' '}
              <ExternalLink size={14} />
            </a>
          )}
        </div>
      </article>
    </div>
  );
}
