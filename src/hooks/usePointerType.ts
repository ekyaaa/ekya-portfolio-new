import { useState, useEffect } from 'react';

export function usePointerType(): { isTouch: boolean; isFinePointer: boolean } {
  const [state, setState] = useState({
    isTouch: false,
    isFinePointer: true,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const finePointerQuery = window.matchMedia('(pointer: fine)');
    const updatePointer = () => {
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      setState({
        isTouch: hasTouch,
        isFinePointer: finePointerQuery.matches && !hasTouch,
      });
    };

    updatePointer();
    finePointerQuery.addEventListener('change', updatePointer);
    return () => finePointerQuery.removeEventListener('change', updatePointer);
  }, []);

  return state;
}
