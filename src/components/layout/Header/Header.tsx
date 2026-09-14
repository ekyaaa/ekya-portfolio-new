import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import logoImg from '../../../assets/images/logo.png';
import './Header.css';

interface NavItem {
  id: string;
  number: string;
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { id: 'about', number: '¹', label: 'about.', href: '#about' },
  { id: 'work', number: '²', label: 'portfolio.', href: '#work' },
  { id: 'experience', number: '³', label: 'experience.', href: '#experience' },
  { id: 'expertise', number: '⁴', label: 'expertise.', href: '#expertise' },
  { id: 'process', number: '⁵', label: 'process.', href: '#process' },
  { id: 'milestones', number: '⁶', label: 'milestones.', href: '#milestones' },
  { id: 'articles', number: '⁷', label: 'articles.', href: '#articles' },
  { id: 'contact', number: '⁸', label: 'contact.', href: '#contact' },
];

export function Header() {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname.startsWith('/articles')) {
      setActiveSection('articles');
      return;
    }

    const handleScroll = () => {
      const sections = ['hero', ...navItems.map((item) => item.id)];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = href.replace('#', '');

    if (location.pathname === '/') {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(`/${href}`);
      setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 150);
    }
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
    }
  };

  return (
    <header className="header" data-nav-header>
      <div className="header-container">
        {/* Brand / Logo Image */}
        <a
          href="#hero"
          onClick={handleLogoClick}
          className="brand-logo"
          data-cursor="HOME"
          aria-label="Ekya Muhammad Portfolio Home"
        >
          <img src={logoImg} alt="Ekya Muhammad Logo" className="brand-logo-img" />
        </a>

        {/* Desktop Editorial Navigation */}
        <nav className="desktop-nav" aria-label="Main Navigation">
          <ul className="nav-list">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <li key={item.id} className="nav-item" data-nav-item>
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`nav-link ${isActive ? 'is-active' : ''}`}
                    data-cursor="GO"
                  >
                    <sup className="nav-num">{item.number}</sup>
                    <span className="nav-label">{item.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          className="mobile-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="mobile-drawer" aria-modal="true">
          <nav className="mobile-nav">
            <ul>
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`mobile-link ${activeSection === item.id ? 'is-active' : ''}`}
                  >
                    <span className="mobile-num">{item.number}</span>
                    <span className="mobile-label">{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}
