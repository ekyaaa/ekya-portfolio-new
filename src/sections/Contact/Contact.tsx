import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '../../animations/gsap';
import { personalDetails } from '../../data/portfolioData';
import { Copy, Check, ArrowUpRight } from 'lucide-react';
import './Contact.css';

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState<boolean>(false);

  useGSAP(
    () => {
      gsap.from('[data-contact-reveal]', {
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
    },
    { scope: sectionRef }
  );

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalDetails.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section ref={sectionRef} id="contact" className="contact-section">
      <div className="container">
        <div className="section-label" data-contact-reveal>
          <span className="number">06</span> contact.
        </div>

        <div className="contact-content font-heading">
          <h2 className="contact-title" data-contact-reveal>
            Have an exciting project, design system, or creative idea?
          </h2>
          <p className="contact-subtitle body-large" data-contact-reveal>
            Let&apos;s make good ideas work in the real world.
          </p>

          <div className="email-box" data-contact-reveal>
            <a
              href={`mailto:${personalDetails.email}`}
              className="email-link"
              data-cursor="EMAIL"
            >
              {personalDetails.email}
            </a>
            <button
              type="button"
              className="btn-copy font-mono"
              onClick={handleCopyEmail}
              aria-label="Copy email address to clipboard"
            >
              {copied ? (
                <>
                  <Check size={16} /> Copied!
                </>
              ) : (
                <>
                  <Copy size={16} /> Copy Email
                </>
              )}
            </button>
          </div>

          <div className="contact-socials-grid" data-contact-reveal>
            {personalDetails.socials.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-social-item font-mono"
                data-cursor="OPEN"
              >
                <span className="social-name">{social.name}</span>
                <ArrowUpRight size={18} className="social-arrow" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
