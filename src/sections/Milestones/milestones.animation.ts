import { gsap } from '../../animations/gsap';

export function setupMilestonesAnimations(container: HTMLElement) {
  const mm = gsap.matchMedia();

  mm.add('(min-width: 768px)', () => {
    // Progress bar scaleY scrub animation
    const progressBar = container.querySelector('[data-milestone-progress]');
    const timelineContainer = container.querySelector('[data-milestone-timeline]');

    if (progressBar && timelineContainer) {
      gsap.fromTo(
        progressBar,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: timelineContainer,
            start: 'top 70%',
            end: 'bottom 80%',
            scrub: true,
          },
        }
      );
    }

    // Subtle scroll reveal for individual timeline items
    const milestoneItems = container.querySelectorAll('[data-milestone-item]');
    milestoneItems.forEach((item) => {
      gsap.from(item, {
        y: 32,
        opacity: 0.2,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: item,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      });
    });
  });

  return () => {
    mm.revert();
  };
}
