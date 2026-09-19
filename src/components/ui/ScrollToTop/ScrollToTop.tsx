import { useState, useEffect, useCallback } from 'react';
import { ChevronUp } from 'lucide-react';
import { useReducedMotion } from '../../../hooks/useReducedMotion';
import './ScrollToTop.css';

export function ScrollToTop() {
  const [visible, setVisible] = useState<boolean>(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const checkScroll = () => {
      // Show when scrolled down more than 300px
      const shouldShow = window.scrollY > 300;
      setVisible(shouldShow);
    };

    window.addEventListener('scroll', checkScroll, { passive: true });
    checkScroll();

    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  const handleScrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
  }, [prefersReducedMotion]);

  return (
    <button
      type="button"
      className={`scroll-to-top-btn ${visible ? 'is-visible' : ''}`}
      onClick={handleScrollToTop}
      aria-label="Kembali ke atas"
      tabIndex={visible ? 0 : -1}
    >
      <ChevronUp size={22} strokeWidth={2.2} aria-hidden="true" />
    </button>
  );
}
