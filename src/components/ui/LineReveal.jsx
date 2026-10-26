import { useRef } from 'react';
import { gsap, useGSAP } from '../../lib/gsap';
import SplitText from './SplitText';

// Each line slides up out of its own mask.
export default function LineReveal({
  lines,
  as = 'h2',
  className = '',
  trigger = 'scroll',
  delay = 0,
  ready = true,
  start = 'top 85%',
}) {
  const ref = useRef(null);

  useGSAP(
    () => {
      const items = ref.current.querySelectorAll('.split-line');
      gsap.set(items, { y: 0, yPercent: 110, rotate: 2 });
      if (!ready) return;

      const vars = { y: 0, yPercent: 0, rotate: 0, duration: 1.2, stagger: 0.12, delay, ease: 'power4.out' };
      if (trigger === 'scroll') {
        vars.scrollTrigger = { trigger: ref.current, start, once: true };
      }
      gsap.to(items, vars);
    },
    { scope: ref, dependencies: [ready] }
  );

  return <SplitText ref={ref} text={lines} mode="lines" as={as} className={className} />;
}
