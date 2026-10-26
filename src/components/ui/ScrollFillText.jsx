import { useRef } from 'react';
import { gsap, useGSAP } from '../../lib/gsap';
import SplitText from './SplitText';

// Words light up one after another as the paragraph scrolls through the viewport.
export default function ScrollFillText({ text, as = 'p', className = '' }) {
  const ref = useRef(null);

  useGSAP(
    () => {
      const words = ref.current.querySelectorAll('.split-word');
      words.forEach((w) => w.classList.add('fill-word'));
      gsap.fromTo(
        words,
        { '--p': 0 },
        {
          '--p': 1,
          ease: 'none',
          stagger: 0.1,
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 80%',
            end: 'bottom 45%',
            scrub: true,
          },
        }
      );
    },
    { scope: ref }
  );

  return <SplitText ref={ref} text={text} mode="words" as={as} className={className} />;
}
