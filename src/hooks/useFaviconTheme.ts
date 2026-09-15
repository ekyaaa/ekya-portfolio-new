import { useEffect } from 'react';

/**
 * Dynamically switches the browser tab favicon between light and dark modes
 * based on system / browser preference for universal cross-browser support.
 */
export function useFaviconTheme() {
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;

    const matcher = window.matchMedia('(prefers-color-scheme: dark)');

    const updateFavicon = (e: MediaQueryListEvent | MediaQueryList) => {
      const isDark = e.matches;
      const faviconHref = isDark ? '/favicon-dark.png' : '/favicon-light.png';

      // Update dedicated dynamic favicon link if present
      const dynamicLink = document.querySelector<HTMLLinkElement>('link[data-dynamic-favicon]');
      if (dynamicLink) {
        dynamicLink.href = faviconHref;
      }
    };

    // Initial check
    updateFavicon(matcher);

    // Add event listener
    try {
      matcher.addEventListener('change', updateFavicon);
      return () => matcher.removeEventListener('change', updateFavicon);
    } catch {
      // Fallback for older browsers
      matcher.addListener(updateFavicon);
      return () => matcher.removeListener(updateFavicon);
    }
  }, []);
}
