import { useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { gsap, useGSAP } from '../../lib/gsap';

// Thin line pinned to the bottom of the viewport that fills as you scroll.
export default function ScrollProgress() {
  const ref = useRef(null);
  const { pathname } = useLocation();

  useGSAP(
    () => {
      gsap.fromTo(
        '.progress__fill',
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: { trigger: document.body, start: 'top top', end: 'bottom bottom', scrub: 0.3 },
        }
      );
    },
    { scope: ref, dependencies: [pathname], revertOnUpdate: true }
  );

  return (
    <div ref={ref} className="progress" aria-hidden="true">
      <span className="progress__fill" />
    </div>
  );
}
