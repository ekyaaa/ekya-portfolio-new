import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { gsap } from '../../../animations/gsap';
import { useReducedMotion } from '../../../hooks/useReducedMotion';
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
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const location = useLocation();
  const navigate = useNavigate();
  const prefersReducedMotion = useReducedMotion();

  const drawerRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  // Monitor active section on scroll and scrolled state
  useEffect(() => {
    if (location.pathname.startsWith('/articles')) {
      setActiveSection('articles');
    }

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 20);

      if (location.pathname.startsWith('/articles')) return;

      const sections = ['hero', ...navItems.map((item) => item.id)];
      const scrollPosition = currentScrollY + 200;

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
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  // Lock body scroll and handle keyboard events when mobile drawer is open
  useEffect(() => {
    if (!mobileMenuOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };

    const handleResize = () => {
      if (window.innerWidth > 992) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', handleResize);

    // Initial focus on close button
    const timer = setTimeout(() => {
      closeBtnRef.current?.focus();
    }, 60);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
      clearTimeout(timer);
    };
  }, [mobileMenuOpen]);

  // GSAP animation when mobile drawer opens
  useEffect(() => {
    if (!mobileMenuOpen || prefersReducedMotion || !drawerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        drawerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.22, ease: 'power2.out' }
      );

      if (closeBtnRef.current) {
        gsap.fromTo(
          closeBtnRef.current,
          { opacity: 0, rotate: -90, scale: 0.8 },
          { opacity: 1, rotate: 0, scale: 1, duration: 0.3, ease: 'power2.out', delay: 0.05 }
        );
      }

      gsap.fromTo(
        '.mobile-nav-item',
        { opacity: 0, y: 14 },
        {
          opacity: 1,
          y: 0,
          duration: 0.3,
          stagger: 0.035,
          ease: 'power2.out',
          delay: 0.08,
        }
      );
    }, drawerRef);

    return () => ctx.revert();
  }, [mobileMenuOpen, prefersReducedMotion]);

  const closeMenu = useCallback(() => {
    setMobileMenuOpen(false);
    document.body.style.overflow = '';
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    closeMenu();
    const targetId = href.replace('#', '');

    if (location.pathname === '/') {
      const element = document.getElementById(targetId);
      if (element) {
        requestAnimationFrame(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        });
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
    closeMenu();
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
    }
  };

  return (
    <>
      <header
        className={`header ${isScrolled ? 'is-scrolled' : ''}`}
        data-nav-header
      >
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

          {/* Mobile Hamburger Toggle (Minimal Icon-Only Style) */}
          <button
            type="button"
            className="mobile-toggle"
            onClick={() => setMobileMenuOpen(true)}
            aria-expanded={mobileMenuOpen}
            aria-label="Open navigation menu"
          >
            <Menu size={22} className="mobile-toggle-icon" />
          </button>
        </div>
      </header>

      {/* Mobile Full-Screen Editorial Modal via React Portal */}
      {mobileMenuOpen &&
        createPortal(
          <div
            ref={drawerRef}
            className="mobile-drawer-portal"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation Menu"
          >
            {/* Modal Top Header Row */}
            <div className="mobile-drawer-header">
              <a
                href="#hero"
                onClick={handleLogoClick}
                className="brand-logo"
                aria-label="Ekya Muhammad Portfolio Home"
              >
                <img src={logoImg} alt="Ekya Muhammad Logo" className="brand-logo-img" />
              </a>

              {/* Minimal Icon-Only Close Button with Smooth Rotation */}
              <button
                ref={closeBtnRef}
                type="button"
                className="mobile-close-btn"
                onClick={closeMenu}
                aria-label="Close navigation menu"
              >
                <X size={22} className="mobile-close-icon" />
              </button>
            </div>

            {/* Modal Navigation Body (Clean Navigation Only, No Footer) */}
            <div className="mobile-drawer-body">
              <nav className="mobile-nav" aria-label="Mobile Navigation Links">
                <ul className="mobile-nav-list">
                  {navItems.map((item, index) => {
                    const isActive = activeSection === item.id;
                    const formattedNum = String(index + 1).padStart(2, '0');
                    return (
                      <li key={item.id} className="mobile-nav-item">
                        <a
                          href={item.href}
                          onClick={(e) => handleNavClick(e, item.href)}
                          className={`mobile-nav-link ${isActive ? 'is-active' : ''}`}
                        >
                          <div className="mobile-nav-item-left">
                            <span className="mobile-nav-index font-mono">{formattedNum}</span>
                            <span className="mobile-nav-label">{item.label}</span>
                          </div>
                          <span className="mobile-nav-arrow" aria-hidden="true">↗</span>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
