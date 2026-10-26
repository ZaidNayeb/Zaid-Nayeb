import { useRef } from 'react';
import { gsap, useGSAP } from '../../lib/gsap';
import SplitText from './SplitText';

// Characters drift in from blur, staggered — the signature heading reveal.
// trigger="scroll" reveals when scrolled into view; trigger="mount" plays after `delay`.
export default function BlurReveal({
  text,
  as = 'h2',
  className = '',
  trigger = 'scroll',
  delay = 0,
  ready = true,
  start = 'top 85%',
  stagger = 0.035,
}) {
  const ref = useRef(null);

  useGSAP(
    () => {
      const chars = ref.current.querySelectorAll('.split-char');
      gsap.set(chars, { opacity: 0, y: 0, yPercent: 35, filter: 'blur(10px)' });
      if (!ready) return;

      const vars = {
        opacity: 1,
        yPercent: 0,
        filter: 'blur(0px)',
        duration: 1.1,
        stagger,
        delay,
        ease: 'power2.out',
      };
      if (trigger === 'scroll') {
        vars.scrollTrigger = { trigger: ref.current, start, once: true };
      }
      gsap.to(chars, vars);
    },
    { scope: ref, dependencies: [ready, text] }
  );

  return <SplitText ref={ref} text={text} mode="chars" as={as} className={className} />;
}
