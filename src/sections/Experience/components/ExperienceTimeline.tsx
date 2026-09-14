import { Fragment } from 'react';
import { Experience } from '../experience.types';
import { ExperienceItem } from './ExperienceItem';

interface ExperienceTimelineProps {
  experiences: Experience[];
}

export function ExperienceTimeline({ experiences }: ExperienceTimelineProps) {
  if (!experiences || experiences.length === 0) return null;

  return (
    <div className="experience-timeline-container" data-experience-timeline>
      <div className="timeline-header font-mono" data-experience-reveal>
        <span>CAREER TIMELINE</span>
      </div>

      <div className="timeline-items-list">
        {experiences.map((exp, idx) => (
          <Fragment key={exp.id}>
            <ExperienceItem experience={exp} />
            {idx < experiences.length - 1 && (
              <div className="item-divider" data-experience-divider aria-hidden="true" />
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
}
