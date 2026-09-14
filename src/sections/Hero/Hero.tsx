import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '../../animations/gsap';
import { Character } from '../../components/visual/Character/Character';
import './Hero.css';

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
      });

      tl.from('[data-hero-line]', {
        yPercent: 115,
        duration: 1.0,
        stagger: 0.08,
      })
        .from(
          '[data-hero-desc]',
          {
            opacity: 0,
            y: 24,
            duration: 0.6,
            stagger: 0.1,
          },
          '-=0.4'
        )
        .from(
          '[data-character]',
          {
            opacity: 0,
            y: 40,
            duration: 0.8,
          },
          '-=0.5'
        );
    },
    { scope: heroRef }
  );

  return (
    <section ref={heroRef} id="hero" className="hero-section">
      <div className="container hero-container">
        {/* Left Column: Editorial Typography */}
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="line-mask">
              <span data-hero-line>hello,</span>
            </span>
            <span className="line-mask">
              <span data-hero-line>my name is</span>
            </span>
            <span className="line-mask">
              <span data-hero-line className="highlight">
                ekya muhammad.
              </span>
            </span>
          </h1>

          <div className="hero-description-group">
            <p data-hero-desc className="body-regular">
              I am a systems analyst, full-stack engineer, and solution-driven builder.
            </p>
            <p data-hero-desc className="body-small">
              I translate real-world workflows into reliable software, focusing on high performance, functionality, and pure efficiency.
            </p>
          </div>

          <div data-hero-desc className="hero-action font-mono">
            <a href="#work" className="action-link" data-cursor="EXPLORE">
              view portfolio <span className="arrow">↘</span>
            </a>
          </div>
        </div>

        {/* Right Column: Character Illustration */}
        <div className="hero-visual">
          <Character />
        </div>
      </div>
    </section>
  );
}
