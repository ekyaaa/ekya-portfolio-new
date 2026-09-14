import { gsap } from './gsap';
import { motionTokens } from './motion.tokens';

export function createSectionReveal(triggerElement: HTMLElement, targets: Element[] | string) {
  return gsap.from(targets, {
    y: 40,
    opacity: 0,
    duration: motionTokens.duration.slow,
    stagger: motionTokens.stagger.normal,
    ease: motionTokens.ease.smooth,
    scrollTrigger: {
      trigger: triggerElement,
      start: 'top 82%',
      toggleActions: 'play none none none',
    },
  });
}
