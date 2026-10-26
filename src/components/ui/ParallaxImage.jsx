import { useRef } from 'react';
import { gsap, useGSAP } from '../../lib/gsap';

// Image that drifts inside its frame while scrolling, with a clip-path reveal on entry.
export default function ParallaxImage({ src, alt = '', className = '', amount = 12, reveal = true, mono = true }) {
  const ref = useRef(null);

  useGSAP(
    () => {
      const img = ref.current.querySelector('img');
      gsap.fromTo(
        img,
        { y: 0, yPercent: -amount },
        {
          yPercent: amount,
          ease: 'none',
          scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom top', scrub: true },
        }
      );
      if (reveal) {
        gsap.from(ref.current, {
          clipPath: 'inset(100% 0% 0% 0%)',
          duration: 1.4,
          ease: 'power4.inOut',
          scrollTrigger: { trigger: ref.current, start: 'top 85%', once: true },
        });
      }
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={`parallax ${className}`}>
      <img src={src} alt={alt} className={mono ? 'img-mono' : ''} loading="lazy" />
    </div>
  );
}
