import { useRef } from 'react';
import { gsap, useGSAP } from '../../lib/gsap';
import { journey } from '../../data/journey';
import LineReveal from '../ui/LineReveal';
import JourneyItem from './JourneyItem';

// Vertical timeline: the line draws itself with scroll and each milestone lights up as it's reached.
export default function Journey() {
  const ref = useRef(null);

  useGSAP(
    () => {
      gsap.fromTo(
        '.journey__line-fill',
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: { trigger: '.journey__track', start: 'top 70%', end: 'bottom 60%', scrub: true },
        }
      );
      gsap.utils.toArray('.journey-item').forEach((item) => {
        gsap.from(item.querySelectorAll(':scope > :not(.journey-item__dot)'), {
          opacity: 0,
          x: 40,
          stagger: 0.06,
          duration: 1,
          scrollTrigger: { trigger: item, start: 'top 75%', once: true },
        });
        gsap.to(item, {
          scrollTrigger: { trigger: item, start: 'top 62%', toggleClass: 'is-reached' },
        });
      });
    },
    { scope: ref }
  );

  return (
    <section ref={ref} className="journey container">
      <div className="journey__head">
        <p className="eyebrow muted">The journey</p>
        <LineReveal lines={['From First Line', 'To Live Sites']} className="display display-lg" />
      </div>
      <div className="journey__track">
        <span className="journey__line" aria-hidden="true">
          <span className="journey__line-fill" />
        </span>
        <ol className="journey__list">
          {journey.map((item) => (
            <JourneyItem key={item.step} item={item} />
          ))}
        </ol>
      </div>
    </section>
  );
}
