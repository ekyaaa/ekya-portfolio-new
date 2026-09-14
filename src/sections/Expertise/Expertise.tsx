import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '../../animations/gsap';
import { expertiseData } from '../../data/portfolioData';
import './Expertise.css';

export function Expertise() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from('[data-expertise-reveal]', {
        y: 36,
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
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} id="expertise" className="expertise-section">
      <div className="container">
        <div className="section-label" data-expertise-reveal>
          <span className="number">04</span> expertise.
        </div>

        <div className="expertise-header-group" data-expertise-reveal>
          <h2 className="section-title">Capabilities &amp; Engineering Scope</h2>
          <p className="body-regular header-subtitle">
            I work across the software lifecycle, from turning requirements into system designs to building, optimizing, and deploying the final application.
          </p>
        </div>

        <div className="expertise-grid">
          {expertiseData.map((item) => (
            <article key={item.id} className="expertise-card" data-expertise-reveal>
              <div className="card-top-row font-mono">
                <span className="card-num">{item.number}</span>
                <span className="card-tag-label">CAPABILITY</span>
              </div>

              <h3 className="card-title font-heading">{item.title}</h3>

              <p className="card-desc body-regular">{item.description}</p>

              {item.evidence && item.evidence.length > 0 && (
                <div className="card-evidence">
                  <span className="evidence-header font-mono">PRACTICAL EVIDENCE:</span>
                  <ul className="evidence-list font-mono">
                    {item.evidence.map((point, idx) => (
                      <li key={idx} className="evidence-item">
                        <span className="bullet" aria-hidden="true">&bull;</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="card-skills-row font-mono">
                <span className="skills-label">CONCEPTS:</span>
                <span className="skills-tags">{item.skills.join(' \u00b7 ')}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
