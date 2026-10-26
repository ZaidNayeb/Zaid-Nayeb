import { useRef } from 'react';
import { gsap, useGSAP } from '../../lib/gsap';

// Counts from 0 to `value` once it scrolls into view.
export default function Counter({ value, suffix = '', className = '' }) {
  const ref = useRef(null);

  useGSAP(
    () => {
      const state = { n: 0 };
      gsap.to(state, {
        n: value,
        duration: 2,
        ease: 'power2.out',
        scrollTrigger: { trigger: ref.current, start: 'top 90%', once: true },
        onUpdate: () => {
          ref.current.textContent = `${Math.round(state.n)}${suffix}`;
        },
      });
    },
    { scope: ref }
  );

  return (
    <span ref={ref} className={className}>
      0{suffix}
    </span>
  );
}
