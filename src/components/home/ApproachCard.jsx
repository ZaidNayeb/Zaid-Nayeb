import { useRef } from 'react';
import { gsap, useGSAP } from '../../lib/gsap';
import { skills } from '../../data/skills';
import { projectImage } from '../../data/projects';
import Marquee from '../ui/Marquee';
import Button from '../ui/Button';

// Framed card that opens up as it scrolls in, heading sliding across, tech marquee inside.
export default function ApproachCard() {
  const ref = useRef(null);

  useGSAP(
    () => {
      gsap.fromTo(
        '.approach__frame',
        { clipPath: 'inset(12% 14% 12% 14%)' },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          ease: 'none',
          scrollTrigger: { trigger: ref.current, start: 'top 85%', end: 'top 15%', scrub: true },
        }
      );
      gsap.fromTo(
        '.approach__bg',
        { scale: 1.25, yPercent: -6 },
        {
          scale: 1.05,
          yPercent: 6,
          ease: 'none',
          scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom top', scrub: true },
        }
      );
      gsap.from('.approach__title .split-line', {
        xPercent: -18,
        opacity: 0,
        duration: 1.4,
        stagger: 0.12,
        ease: 'power4.out',
        scrollTrigger: { trigger: '.approach__title', start: 'top 80%', once: true },
      });
      gsap.from('.approach__aside > *', {
        y: 24,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        scrollTrigger: { trigger: '.approach__aside', start: 'top 90%', once: true },
      });
    },
    { scope: ref }
  );

  return (
    <section ref={ref} className="approach">
      <div className="approach__frame">
        <img src={projectImage('grid-layout')} alt="" className="approach__bg img-mono" loading="lazy" />
        <div className="approach__shade" aria-hidden="true" />
        <div className="approach__content">
          <h2 className="approach__title display display-lg">
            <span className="split-line">My Approach</span>
            <span className="split-line">To Every Build</span>
          </h2>
          <div className="approach__row">
            <Marquee items={skills} className="approach__marquee" speed={30} />
            <div className="approach__aside">
              <p>
                Every decision is intentional and every detail has a purpose, shaped around your goals, your audience and
                your standards.
              </p>
              <Button to="/contact">Start your project</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
