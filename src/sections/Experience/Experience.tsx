import { useRef, useMemo } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '../../animations/gsap';
import { experienceData, toolboxData } from '../../data/experience';
import { sortExperiencesChronologically } from './experience.utils';
import { ExperienceIntro } from './components/ExperienceIntro';
import { ToolSummary } from './components/ToolSummary';
import { FeaturedExperience } from './components/FeaturedExperience';
import { ExperienceTimeline } from './components/ExperienceTimeline';
import { setupExperienceAnimations } from './experience.animation';
import './Experience.css';

export function Experience() {
  const sectionRef = useRef<HTMLElement>(null);

  // Chronologically sorted experiences (most recent first)
  const sortedExperiences = useMemo(
    () => sortExperiencesChronologically(experienceData),
    []
  );

  // Separate featured primary role from timeline roles
  const featuredRole = useMemo(
    () => sortedExperiences.find((exp) => exp.featured) ?? sortedExperiences[0],
    [sortedExperiences]
  );

  const timelineRoles = useMemo(
    () => (featuredRole ? sortedExperiences.filter((exp) => exp.id !== featuredRole.id) : []),
    [featuredRole, sortedExperiences]
  );

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      gsap.from('[data-experience-reveal]', {
        y: 36,
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

      return setupExperienceAnimations(sectionRef.current);
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} id="experience" className="experience-section">
      <div className="container">
        {/* Section Label */}
        <div className="section-label" data-experience-reveal>
          <span className="number">03</span> experience.
        </div>

        {/* Intro Heading */}
        <ExperienceIntro />

        {/* Toolbox Summary */}
        <ToolSummary categories={toolboxData} />

        {/* Featured Active Current Role */}
        {featuredRole && <FeaturedExperience experience={featuredRole} />}

        {/* Chronological Career Timeline */}
        <ExperienceTimeline experiences={timelineRoles} />
      </div>
    </section>
  );
}
