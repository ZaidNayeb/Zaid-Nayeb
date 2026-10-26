import { useRef } from 'react';
import { gsap, useGSAP } from '../../lib/gsap';
import usePageTransition from '../../hooks/usePageTransition';
import { site } from '../../data/site';
import SplitText from '../ui/SplitText';

// Portrait unveiled by a clip-path wipe, with the name set large beside it.
export default function AboutIntro() {
  const ref = useRef(null);
  const { introDone } = usePageTransition();

  useGSAP(
    () => {
      const lines = ref.current.querySelectorAll('.split-line');
      gsap.set('.about-intro__portrait', { clipPath: 'inset(100% 0% 0% 0%)' });
      gsap.set('.about-intro__portrait img', { scale: 1.35 });
      gsap.set(lines, { y: 0, yPercent: 110 });
      gsap.set('.about-intro__fade', { opacity: 0, y: 20 });
      if (!introDone) return;

      gsap
        .timeline({ delay: 0.75 })
        .to('.about-intro__portrait', { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.6, ease: 'power4.inOut' }, 0)
        .to('.about-intro__portrait img', { scale: 1, duration: 2.2, ease: 'power3.out' }, 0)
        .to(lines, { y: 0, yPercent: 0, duration: 1.3, stagger: 0.1, ease: 'power4.out' }, 0.3)
        .to('.about-intro__fade', { opacity: 1, y: 0, stagger: 0.1, duration: 1 }, 0.8);

      gsap.to('.about-intro__portrait img', {
        yPercent: 10,
        ease: 'none',
        scrollTrigger: { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: true },
      });
    },
    { scope: ref, dependencies: [introDone] }
  );

  return (
    <section ref={ref} className="about-intro container">
      <div className="about-intro__text">
        <p className="eyebrow muted about-intro__fade">About me</p>
        <SplitText as="h1" mode="lines" text={[site.firstName, site.lastName]} className="display display-xl" />
        <p className="about-intro__role display display-sm about-intro__fade">{site.role}</p>
        <p className="lead about-intro__fade">
          I design and build websites that feel considered from the first scroll: responsive, animated, and crafted in
          the details most people never notice but always feel.
        </p>
        <p className="eyebrow about-intro__fade about-intro__status">
          <span className="about-intro__dot" /> {site.availability}
        </p>
      </div>
      <div className="about-intro__portrait">
        <img src="/images/profile.png" alt={`Portrait of ${site.name}`} />
      </div>
    </section>
  );
}
