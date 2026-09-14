import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '../../animations/gsap';
import { processData } from '../../data/portfolioData';
import './Process.css';

export function Process() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from('[data-process-reveal]', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} id="process" className="process-section">
      <div className="container">
        <div className="section-label" data-process-reveal>
          <span className="number">04</span> process.
        </div>

        <div className="process-header-group" data-process-reveal>
          <h2 className="section-title">Workflow & Methodology</h2>
          <p className="body-regular header-subtitle">
            A structured creative process ensuring high visual standards and flawless execution.
          </p>
        </div>

        <div className="process-timeline">
          {processData.map((step) => (
            <div key={step.number} className="process-step" data-process-reveal>
              <div className="step-num-box font-mono">{step.number}</div>
              <div className="step-content">
                <h3 className="step-title">{step.title}</h3>
                <span className="step-subtitle font-mono">{step.subtitle}</span>
                <p className="step-desc body-regular">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
