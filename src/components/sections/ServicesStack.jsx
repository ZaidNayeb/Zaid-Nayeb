import { useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP } from '../../lib/gsap';
import { services as defaultServices } from '../../data/services';
import { projectImage } from '../../data/projects';
import ServicePanel from './ServicePanel';

// Split layout: service text panels scroll on the left while a sticky image stack on the right
// wipes to the matching screenshot.
export default function ServicesStack({ services = defaultServices }) {
  const ref = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(min-width: 900px)', () => {
        const imgs = gsap.utils.toArray('.services-stack__img');
        const panels = gsap.utils.toArray('.service-panel');
        gsap.set(imgs.slice(1), { clipPath: 'inset(100% 0% 0% 0%)' });

        panels.forEach((panel, i) => {
          if (i === 0) return;
          gsap
            .timeline({
              scrollTrigger: { trigger: panel, start: 'top bottom', end: 'top top', scrub: true },
            })
            .to(imgs[i], { clipPath: 'inset(0% 0% 0% 0%)', ease: 'none' }, 0)
            .fromTo(imgs[i].querySelector('img'), { scale: 1.25, yPercent: 8 }, { scale: 1, yPercent: 0, ease: 'none' }, 0)
            .to(imgs[i - 1].querySelector('img'), { scale: 0.92, opacity: 0.4, ease: 'none' }, 0);
        });

        // Counter in the sticky column
        ScrollTrigger.create({
          trigger: ref.current,
          start: 'top center',
          end: 'bottom center',
          onUpdate: (self) => {
            const idx = Math.min(panels.length - 1, Math.floor(self.progress * panels.length));
            gsap.to('.services-stack__counter-track', {
              yPercent: (-100 / panels.length) * idx,
              duration: 0.6,
              ease: 'power3.out',
              overwrite: true,
            });
          },
        });
      });
    },
    { scope: ref }
  );

  return (
    <section ref={ref} className="services-stack">
      <div className="services-stack__panels">
        {services.map((s, i) => (
          <ServicePanel key={s.title} service={s} index={i} />
        ))}
      </div>
      <div className="services-stack__visual" aria-hidden="true">
        <div className="services-stack__sticky">
          {services.map((s) => (
            <div className="services-stack__img" key={s.title}>
              <img src={projectImage(s.image)} alt="" className="img-mono" loading="lazy" />
            </div>
          ))}
          <div className="services-stack__counter display">
            <span className="services-stack__counter-window">
              <span className="services-stack__counter-track">
                {services.map((s, i) => (
                  <span key={s.title}>0{i + 1}</span>
                ))}
              </span>
            </span>
            <span className="muted">/ 0{services.length}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
