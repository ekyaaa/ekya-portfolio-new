import { useState, useEffect } from 'react';
import { personalDetails } from '../../../data/portfolioData';
import logoWithNameImg from '../../../assets/images/logo-with-name.png';
import './Footer.css';

export function Footer() {
  const [timeString, setTimeString] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Jakarta time (WIB UTC+7)
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Jakarta',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      };
      setTimeString(new Intl.DateTimeFormat('en-GB', options).format(now) + ' WIB');
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="footer" data-footer>
      <div className="container footer-container">
        <div className="footer-top">
          <div className="footer-brand">
            <img src={logoWithNameImg} alt="Ekya Muhammad" className="footer-logo-img" />
            <p className="footer-tagline">{personalDetails.tagline}</p>
          </div>

          <div className="footer-meta">
            <div className="meta-block">
              <span className="meta-label">Location</span>
              <span className="meta-value">{personalDetails.location}</span>
            </div>

            <div className="meta-block">
              <span className="meta-label">Local Time</span>
              <span className="meta-value font-mono">{timeString || '00:00:00 WIB'}</span>
            </div>
          </div>
        </div>

        <div className="footer-divider" aria-hidden="true" />

        <div className="footer-bottom">
          <p className="copyright font-mono">
            &copy; {new Date().getFullYear()} {personalDetails.name}.
          </p>

          <div className="social-links">
            {personalDetails.socials.map((social: { name: string; url: string }) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link font-mono"
                data-cursor="VISIT"
              >
                {social.name} ↗
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
