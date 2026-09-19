import { useRef, useState, useCallback } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '../../animations/gsap';
import { milestonesData } from '../../data/milestones';
import { Milestone } from './milestone.types';
import { MilestoneTimeline } from './components/MilestoneTimeline';
import { MilestoneModal } from './components/MilestoneModal';
import { setupMilestonesAnimations } from './milestones.animation';
import './Milestones.css';

export function Milestones() {
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedMilestone, setSelectedMilestone] = useState<Milestone | null>(null);

  // Handle cross-navigation between related milestones (e.g. BytesFest -> Intercomp)
  const handleSelectRelated = useCallback((relatedId: string) => {
    const found = milestonesData.find((m) => m.id === relatedId && !m.hidden);
    if (found) {
      setSelectedMilestone(found);
    }
  }, []);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      // Section intro reveal
      gsap.from('[data-milestone-reveal]', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });

      // Timeline rail scrub and item triggers
      return setupMilestonesAnimations(sectionRef.current);
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} id="milestones" className="milestones-section">
      <div className="container">
        {/* Section Label */}
        <div className="section-label" data-milestone-reveal>
          <span className="number">05</span> milestones.
        </div>

        {/* Section Intro Typography */}
        <div className="milestone-intro-block" data-milestone-reveal>
          <h2 className="milestone-heading font-heading">
            <span className="line-mask">
              <span>hands-on builds,</span>
            </span>
            <span className="line-mask">
              <span>competitions,</span>
            </span>
            <span className="line-mask">
              <span className="highlight">&amp; engineering growth.</span>
            </span>
          </h2>

          <p className="milestone-subcopy body-regular" data-milestone-reveal>
            A chronological trajectory through hackathons, public showcases, and collaborative
            products &mdash; evolving from an early campus communication milestone in 2024 into
            national-level innovation competitions and increasingly complex software systems.
          </p>
        </div>

        {/* Chronological Timeline */}
        <MilestoneTimeline
          items={milestonesData}
          onSelect={(item) => setSelectedMilestone(item)}
        />

        {/* Closing Microcopy */}
        <div className="milestone-closing-block" data-milestone-reveal>
          <div className="closing-line font-heading">
            building iteratively, <br />
            learning with every challenge.
          </div>
          <span className="closing-doodle" aria-hidden="true">&sim;&sim;</span>
        </div>
      </div>

      {/* Editorial Detail Reader Modal */}
      <MilestoneModal
        item={selectedMilestone}
        onClose={() => setSelectedMilestone(null)}
        onSelectRelated={handleSelectRelated}
      />
    </section>
  );
}
