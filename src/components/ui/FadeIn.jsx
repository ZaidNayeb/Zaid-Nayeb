import { useRef } from 'react';
import { gsap, useGSAP } from '../../lib/gsap';

// Fades and lifts its children (or each direct child, when `stagger` is set) into view.
export default function FadeIn({
  as: Tag = 'div',
  children,
  className = '',
  delay = 0,
  y = 40,
  stagger = 0,
  start = 'top 88%',
  ...rest
}) {
  const ref = useRef(null);

  useGSAP(
    () => {
      const targets = stagger ? ref.current.children : ref.current;
      gsap.from(targets, {
        y,
        opacity: 0,
        duration: 1.1,
        delay,
        stagger,
        ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start, once: true },
      });
    },
    { scope: ref }
  );

  return (
    <Tag ref={ref} className={className} {...rest}>
      {children}
    </Tag>
  );
}
