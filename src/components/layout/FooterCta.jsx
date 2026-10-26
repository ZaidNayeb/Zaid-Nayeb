import { useRef } from 'react';
import { gsap, useGSAP } from '../../lib/gsap';
import { scrollToTop } from '../../lib/lenis';
import { projectImage } from '../../data/projects';
import LineReveal from '../ui/LineReveal';
import Button from '../ui/Button';

const SCREENS = ['vertex-studio', 'restaurant', 'omid-academy'];

// Closing call to action: three screens rise from below behind a large serif line.
export default function FooterCta() {
  const ref = useRef(null);

  useGSAP(
    () => {
      const screens = gsap.utils.toArray('.footer-cta__screen');
      gsap.fromTo(
        screens,
        { y: 0, yPercent: (i) => (i === 1 ? 70 : 50), opacity: 0.2 },
        {
          yPercent: (i) => (i === 1 ? 12 : 22),
          opacity: 1,
          ease: 'none',
          scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom bottom', scrub: true },
        }
      );
      gsap.from('.footer-cta__actions > *', {
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 0.9,
        scrollTrigger: { trigger: '.footer-cta__actions', start: 'top 95%', once: true },
      });
    },
    { scope: ref }
  );

  return (
    <section ref={ref} className="footer-cta">
      <div className="footer-cta__screens" aria-hidden="true">
        {SCREENS.map((slug) => (
          <div className="footer-cta__screen" key={slug}>
            <img src={projectImage(slug)} alt="" className="img-mono" loading="lazy" />
          </div>
        ))}
      </div>
      <div className="footer-cta__shade" aria-hidden="true" />
      <div className="footer-cta__content">
        <p className="eyebrow muted">Are you ready to</p>
        <LineReveal lines={['Build Something', <em className="accent-word" key="r">Remarkable</em>]} className="display display-xl footer-cta__title" />
        <div className="footer-cta__actions">
          <Button to="/contact" variant="solid" arrow>
            Start your project
          </Button>
          <Button onClick={() => scrollToTop(false)}>Back to top</Button>
        </div>
      </div>
    </section>
  );
}
