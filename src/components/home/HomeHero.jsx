import { useRef } from 'react';
import { gsap, useGSAP } from '../../lib/gsap';
import usePageTransition from '../../hooks/usePageTransition';
import { site } from '../../data/site';
import { projectImage } from '../../data/projects';
import SplitText from '../ui/SplitText';
import HeroScreen from './HeroScreen';

const STATEMENT = 'I Don’t Just Build Pages. I Build Experiences.';

// Pinned hero: three project screens like cars on a showroom floor.
// On scroll the side screens part, the centre one rushes forward and a statement resolves from blur.
export default function HomeHero() {
  const ref = useRef(null);
  const { introDone } = usePageTransition();

  // Entrance
  useGSAP(
    () => {
      const lines = ref.current.querySelectorAll('.hero__title .split-line');
      const screens = ref.current.querySelectorAll('.hero-screen__inner');
      gsap.set(lines, { y: 0, yPercent: 110 });
      gsap.set(screens, { y: 0, yPercent: 40, opacity: 0 });
      gsap.set('.hero__sub, .hero__hint', { opacity: 0, y: 16 });
      if (!introDone) return;

      gsap
        .timeline({ delay: 0.5 })
        .to(screens, { y: 0, yPercent: 0, opacity: 1, duration: 1.6, stagger: { each: 0.15, from: 'center' }, ease: 'power4.out' })
        .to(lines, { y: 0, yPercent: 0, duration: 1.3, stagger: 0.12, ease: 'power4.out' }, 0.2)
        .to('.hero__sub, .hero__hint', { opacity: 1, y: 0, duration: 1, stagger: 0.1 }, 0.8);
    },
    { scope: ref, dependencies: [introDone] }
  );

  // Scroll choreography
  useGSAP(
    () => {
      const chars = ref.current.querySelectorAll('.hero__statement .split-char');
      gsap.set(chars, { opacity: 0, filter: 'blur(12px)' });

      const mm = gsap.matchMedia();
      mm.add(
        { desktop: '(min-width: 768px)', mobile: '(max-width: 767px)' },
        ({ conditions }) => {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: ref.current,
              start: 'top top',
              end: '+=180%',
              pin: true,
              scrub: 1,
            },
          });

          tl.to('.hero__title', { y: 0, yPercent: -40, opacity: 0, filter: 'blur(12px)', duration: 0.5 }, 0)
            .to('.hero__sub, .hero__hint', { opacity: 0, y: -20, duration: 0.3 }, 0)
            .to('.hero-screen--left', { x: 0, xPercent: conditions.desktop ? -80 : -120, opacity: 0.25, duration: 1 }, 0)
            .to('.hero-screen--right', { x: 0, xPercent: conditions.desktop ? 80 : 120, opacity: 0.25, duration: 1 }, 0)
            .to('.hero-screen--center', { scale: conditions.desktop ? 2.4 : 1.3, yPercent: -10, duration: 1.2 }, 0)
            .to('.hero-screen--center .hero-screen__img', { filter: 'brightness(0.22) grayscale(1)', duration: 0.8 }, 0.35)
            .to(chars, { opacity: 1, filter: 'blur(0px)', stagger: 0.02, duration: 0.4 }, 0.7);
        }
      );
    },
    { scope: ref }
  );

  return (
    <section ref={ref} className="hero">
      <div className="hero__glow" aria-hidden="true" />

      <SplitText
        as="h1"
        mode="lines"
        className="hero__title display display-xl"
        text={['Crafted To Be', <em className="accent-word" key="r">Remembered</em>]}
      />

      <div className="hero__screens">
        <HeroScreen position="left" src={projectImage('vertex-studio')} />
        <HeroScreen position="center" src={projectImage('restaurant')} color />
        <HeroScreen position="right" src={projectImage('omid-academy')} />
      </div>

      <p className="hero__sub">
        {site.name} — {site.role.toLowerCase()} crafting responsive, animated and detail-led websites.
      </p>

      <SplitText as="h2" text={STATEMENT} className="hero__statement display display-lg" />

      <div className="hero__hint eyebrow" aria-hidden="true">
        <span>Scroll</span>
        <span className="hero__hint-line" />
      </div>
    </section>
  );
}
