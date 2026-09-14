import { gsap } from '../../animations/gsap';

export function setupExperienceAnimations(container: HTMLElement) {
  const mm = gsap.matchMedia();

  mm.add('(min-width: 768px)', () => {
    // Divider line animation
    const dividers = container.querySelectorAll('[data-experience-divider]');
    dividers.forEach((divider) => {
      gsap.fromTo(
        divider,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.8,
          ease: 'power3.out',
          transformOrigin: 'left center',
          scrollTrigger: {
            trigger: divider,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    });
  });

  return () => {
    mm.revert();
  };
}
