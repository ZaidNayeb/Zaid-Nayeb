import { useRef } from 'react';
import { gsap, useGSAP } from '../../lib/gsap';
import { projectImage } from '../../data/projects';
import SplitText from '../ui/SplitText';

// Top-down "drive-through": a full-page screenshot scrolls inside a centred frame
// flanked by two dimmed screens; once the stage fades back, the headline resolves from blur.
export default function Showcase() {
  const ref = useRef(null);

  useGSAP(
    () => {
      const chars = ref.current.querySelectorAll('.showcase__title .split-char');
      const mm = gsap.matchMedia();

      mm.add('(min-width: 768px)', () => {
        gsap.set(chars, { opacity: 0, filter: 'blur(12px)', y: 0, yPercent: 30 });
        gsap.set('.showcase__copy .lead', { opacity: 0, y: 20 });

        gsap
          .timeline({
            scrollTrigger: { trigger: ref.current, start: 'top top', end: '+=240%', pin: true, scrub: 1 },
          })
          .fromTo('.showcase__frame', { y: 0, yPercent: 30, scale: 0.9 }, { y: 0, yPercent: 0, scale: 1, duration: 0.3 }, 0)
          .fromTo('.showcase__long', { y: 0, yPercent: 0 }, { y: 0, yPercent: -78, duration: 1, ease: 'none' }, 0.15)
          .fromTo('.showcase__side--left', { y: 0, yPercent: 40 }, { y: 0, yPercent: -60, duration: 1.2, ease: 'none' }, 0)
          .fromTo('.showcase__side--right', { y: 0, yPercent: 70 }, { y: 0, yPercent: -40, duration: 1.2, ease: 'none' }, 0)
          .to('.showcase__stage', { opacity: 0.1, filter: 'blur(6px)', duration: 0.3 }, 1.0)
          .to(chars, { opacity: 1, filter: 'blur(0px)', yPercent: 0, stagger: 0.02, duration: 0.3 }, 1.15)
          .to('.showcase__copy .lead', { opacity: 1, y: 0, duration: 0.3 }, 1.4);
      });

      mm.add('(max-width: 767px)', () => {
        gsap.fromTo(
          chars,
          { opacity: 0, filter: 'blur(12px)' },
          {
            opacity: 1,
            filter: 'blur(0px)',
            stagger: 0.03,
            duration: 1,
            scrollTrigger: { trigger: ref.current, start: 'top 70%', once: true },
          }
        );
      });
    },
    { scope: ref }
  );

  return (
    <section ref={ref} className="showcase">
      <div className="showcase__stage" aria-hidden="true">
        <div className="showcase__side showcase__side--left">
          <img src={projectImage('vertex-studio', true)} alt="" className="img-mono" loading="lazy" />
        </div>
        <div className="showcase__frame">
          <img src={projectImage('restaurant', true)} alt="" className="showcase__long" loading="lazy" />
        </div>
        <div className="showcase__side showcase__side--right">
          <img src={projectImage('omid-academy', true)} alt="" className="img-mono" loading="lazy" />
        </div>
      </div>
      <div className="showcase__copy">
        <SplitText as="h2" text="Every Pixel Considered" className="showcase__title display display-xl" />
        <p className="lead">Complete expressions of structure, motion and detail, shaped through restraint and care.</p>
      </div>
    </section>
  );
}
