import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '../../animations/gsap';
import './About.css';

export function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from('[data-about-reveal]', {
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
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} id="about" className="about-section">
      <div className="container">
        <div className="section-label" data-about-reveal>
          <span className="number">01</span> about.
        </div>

        <div className="about-grid">
          <div className="about-left">
            <h2 className="section-title" data-about-reveal>
              High-performance digital systems engineered for seamless efficiency and zero friction.
            </h2>
          </div>

          <div className="about-right">
            <p className="body-large" data-about-reveal>
              I am Ekya Muhammad, a System Analyst and Full-Stack Developer dedicated to building high-throughput, efficient digital solutions. My work bridges the gap between deep structural problem-solving and rigorous, scalable software engineering.
            </p>

            <p className="body-regular" data-about-reveal>
              I operate on a simple philosophy: great software should never overwhelm its users. Instead of piling on bloated abstractions, I focus on precise workflow automation, optimized data pipelines, and responsive architectures tailored to make complex operations feel effortless.
            </p>

            <div className="about-stats" data-about-reveal>
              <div className="stat-item">
                <span className="stat-num font-mono">03+</span>
                <span className="stat-label">Years Engineering Systems</span>
              </div>
              <div className="stat-item">
                <span className="stat-num font-mono">15+</span>
                <span className="stat-label">Production-Ready Deployments</span>
              </div>
              <div className="stat-item">
                <span className="stat-num font-mono">05+</span>
                <span className="stat-label">Achievements &amp; Recognitions</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
