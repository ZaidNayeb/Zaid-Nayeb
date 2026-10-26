import { useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP } from '../../lib/gsap';

// Infinite horizontal ticker. Speeds up with scroll velocity and follows scroll direction.
export default function Marquee({ items, speed = 40, className = '', separator = '✦' }) {
  const ref = useRef(null);

  useGSAP(
    () => {
      const track = ref.current.querySelector('.marquee__track');
      const tween = gsap.to(track, {
        xPercent: -50,
        duration: speed,
        ease: 'none',
        repeat: -1,
      });

      const st = ScrollTrigger.create({
        trigger: ref.current,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          const boost = gsap.utils.clamp(1, 6, 1 + Math.abs(self.getVelocity()) / 400);
          gsap.to(tween, {
            timeScale: boost * self.direction,
            duration: 0.2,
            overwrite: true,
            onComplete: () => gsap.to(tween, { timeScale: self.direction, duration: 1 }),
          });
        },
      });

      return () => st.kill();
    },
    { scope: ref }
  );

  const row = items.map((item, i) => (
    <span className="marquee__item" key={i}>
      {item}
      <span className="marquee__sep" aria-hidden="true">
        {separator}
      </span>
    </span>
  ));

  return (
    <div ref={ref} className={`marquee ${className}`}>
      <div className="marquee__track">
        <div className="marquee__group">{row}</div>
        <div className="marquee__group" aria-hidden="true">
          {row}
        </div>
      </div>
    </div>
  );
}
