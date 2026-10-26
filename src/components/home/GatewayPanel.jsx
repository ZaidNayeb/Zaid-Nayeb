import { useRef } from 'react';
import { gsap, useGSAP } from '../../lib/gsap';
import TransitionLink from '../ui/TransitionLink';
import ArrowIcon from '../icons/ArrowIcon';

// Full-width image panel linking to another page; the image scales out as it scrolls past.
export default function GatewayPanel({ to, title, text, cta, image }) {
  const ref = useRef(null);

  useGSAP(
    () => {
      gsap.fromTo(
        '.gateway__img',
        { scale: 1.25 },
        {
          scale: 1,
          ease: 'none',
          scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom top', scrub: true },
        }
      );
      gsap.from('.gateway__content > *', {
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 1.1,
        scrollTrigger: { trigger: ref.current, start: 'top 65%', once: true },
      });
    },
    { scope: ref }
  );

  return (
    <TransitionLink to={to} className="gateway">
      <span ref={ref} className="gateway__inner">
        <img src={image} alt="" className="gateway__img img-mono" loading="lazy" />
        <span className="gateway__shade" aria-hidden="true" />
        <span className="gateway__content">
          <span className="display display-xl gateway__title">{title}</span>
          <span className="lead gateway__text">{text}</span>
          <span className="btn btn--outline">
            <span className="btn__shine" aria-hidden="true" />
            <span className="btn__label">{cta}</span>
            <span className="btn__arrow">
              <ArrowIcon size={12} />
            </span>
          </span>
        </span>
      </span>
    </TransitionLink>
  );
}
