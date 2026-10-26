import { useRef } from 'react';
import { gsap, useGSAP } from '../../lib/gsap';
import usePageTransition from '../../hooks/usePageTransition';
import SplitText from '../ui/SplitText';

// Shared hero for inner pages: eyebrow, large serif title, lead text, optional backdrop image.
export default function PageHero({ eyebrow, title, lead, image, children }) {
  const ref = useRef(null);
  const { introDone } = usePageTransition();

  useGSAP(
    () => {
      const lines = ref.current.querySelectorAll('.split-line');
      gsap.set(lines, { y: 0, yPercent: 110 });
      gsap.set('.page-hero__fade', { opacity: 0, y: 20 });
      if (image) gsap.set('.page-hero__bg', { scale: 1.2, opacity: 0 });
      if (!introDone) return;

      const tl = gsap.timeline({ delay: 0.75 });
      if (image) tl.to('.page-hero__bg', { scale: 1, opacity: 1, duration: 2, ease: 'power2.out' }, 0);
      tl.to(lines, { y: 0, yPercent: 0, duration: 1.3, stagger: 0.1, ease: 'power4.out' }, 0.1).to(
        '.page-hero__fade',
        { opacity: 1, y: 0, duration: 1, stagger: 0.1 },
        0.6
      );

      if (image) {
        gsap.to('.page-hero__bg', {
          yPercent: 18,
          ease: 'none',
          scrollTrigger: { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: true },
        });
      }
      gsap.to('.page-hero__content', {
        yPercent: -20,
        opacity: 0.2,
        ease: 'none',
        scrollTrigger: { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: true },
      });
    },
    { scope: ref, dependencies: [introDone] }
  );

  return (
    <section ref={ref} className={`page-hero ${image ? 'page-hero--image' : ''}`}>
      {image && (
        <div className="page-hero__media" aria-hidden="true">
          <img src={image} alt="" className="page-hero__bg img-mono" />
          <div className="page-hero__shade" />
        </div>
      )}
      <div className="page-hero__content container">
        <p className="eyebrow muted page-hero__fade">{eyebrow}</p>
        <SplitText as="h1" mode="lines" text={title} className="display display-xl page-hero__title" />
        {lead && <p className="lead page-hero__fade">{lead}</p>}
        {children && <div className="page-hero__fade">{children}</div>}
      </div>
    </section>
  );
}
