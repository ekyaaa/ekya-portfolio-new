import { useEffect, useRef, lazy, Suspense, useMemo } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import { gsap, ScrollTrigger } from './animations/gsap';

import { Header } from './components/layout/Header/Header';
import { Footer } from './components/layout/Footer/Footer';
import { CustomCursor } from './components/ui/CustomCursor/CustomCursor';

import { Hero } from './sections/Hero/Hero';
import { About } from './sections/About/About';
import { Projects } from './sections/Projects/Projects';
import { Experience } from './sections/Experience/Experience';
import { Expertise } from './sections/Expertise/Expertise';
import { Process } from './sections/Process/Process';
import { Milestones } from './sections/Milestones/Milestones';
import { Articles } from './sections/Articles/Articles';
import { Contact } from './sections/Contact/Contact';
import { buildHomeMetadata } from './lib/seo/metadata';
import { useSEO, useResolvedSiteUrl } from './hooks/useSEO';
import { useFaviconTheme } from './hooks/useFaviconTheme';

const ArticlesPage = lazy(() =>
  import('./pages/ArticlesPage/ArticlesPage').then((m) => ({ default: m.ArticlesPage }))
);
const ArticleDetailPage = lazy(() =>
  import('./pages/ArticleDetailPage/ArticleDetailPage').then((m) => ({ default: m.ArticleDetailPage }))
);
const ProjectDetailPage = lazy(() =>
  import('./pages/ProjectDetailPage/ProjectDetailPage').then((m) => ({ default: m.ProjectDetailPage }))
);
const NotFoundPage = lazy(() =>
  import('./pages/NotFoundPage/NotFoundPage').then((m) => ({ default: m.NotFoundPage }))
);

import './styles/globals.css';

function ScrollHandler({ lenisRef }: { lenisRef: React.MutableRefObject<Lenis | null> }) {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const targetId = hash.replace('#', '');
      const el = document.getElementById(targetId);
      if (el) {
        if (lenisRef.current) {
          lenisRef.current.scrollTo(el, { offset: -60, duration: 1.2 });
        } else {
          el.scrollIntoView({ behavior: 'smooth' });
        }
        return;
      }
    }

    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }

    // Refresh ScrollTrigger calculations after DOM settle
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => clearTimeout(timer);
  }, [pathname, hash, lenisRef]);

  return null;
}

function HomePage() {
  const siteUrl = useResolvedSiteUrl();
  const homeMetadata = useMemo(() => buildHomeMetadata({ siteUrl }), [siteUrl]);
  useSEO(homeMetadata);

  return (
    <main>
      <Hero />
      <About />
      <Projects />
      <Experience />
      <Expertise />
      <Process />
      <Milestones />
      <Articles />
      <Contact />
    </main>
  );
}

export function App() {
  const lenisRef = useRef<Lenis | null>(null);

  // Sync favicon with system/browser dark or light mode
  useFaviconTheme();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Initialize Lenis Smooth Scroll once globally
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    const tickerCb = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCb);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerCb);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return (
    <div className="portfolio-app">
      <ScrollHandler lenisRef={lenisRef} />
      <Header />

      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/articles" element={<ArticlesPage />} />
          <Route path="/articles/:slug" element={<ArticleDetailPage />} />
          <Route path="/projects/:slug" element={<ProjectDetailPage />} />
          {/* 404 Route */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>

      <Footer />
      <CustomCursor />
    </div>
  );
}

export default App;
