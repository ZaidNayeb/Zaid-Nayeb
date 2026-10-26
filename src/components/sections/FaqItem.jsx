import { useRef } from 'react';
import { gsap, useGSAP } from '../../lib/gsap';

export default function FaqItem({ item, index, open, onToggle }) {
  const ref = useRef(null);

  useGSAP(
    () => {
      gsap.to('.faq-item__body', {
        height: open ? 'auto' : 0,
        opacity: open ? 1 : 0,
        duration: 0.6,
        ease: 'power3.inOut',
      });
      gsap.to('.faq-item__icon', { rotate: open ? 45 : 0, duration: 0.5, ease: 'power3.out' });
    },
    { scope: ref, dependencies: [open] }
  );

  return (
    <div ref={ref} className={`faq-item ${open ? 'is-open' : ''}`}>
      <button className="faq-item__head" onClick={onToggle} aria-expanded={open}>
        <span className="faq-item__index eyebrow muted">0{index + 1}</span>
        <span className="faq-item__q display display-sm">{item.q}</span>
        <span className="faq-item__icon" aria-hidden="true">
          +
        </span>
      </button>
      <div className="faq-item__body">
        <p className="lead">{item.a}</p>
      </div>
    </div>
  );
}
