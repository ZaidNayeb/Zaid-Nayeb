import { useRef } from 'react';
import { gsap, useGSAP } from '../../lib/gsap';
import { approach } from '../../data/approach';
import { projectImage } from '../../data/projects';
import ProcessStep from './ProcessStep';

// Pinned storytelling block: image frame on the left swaps with a clip reveal,
// the step text on the right resolves from blur, the background drifts behind.
export default function ProcessSteps({ steps = approach }) {
  const ref = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add('(min-width: 900px)', () => {
        const imgs = gsap.utils.toArray('.process__img');
        const bgs = gsap.utils.toArray('.process__bg-img');
        const stepEls = gsap.utils.toArray('.process-step');

        gsap.set(imgs.slice(1), { clipPath: 'inset(100% 0% 0% 0%)' });
        gsap.set(bgs.slice(1), { opacity: 0 });
        gsap.set(stepEls.slice(1), { autoAlpha: 0 });
        gsap.set(stepEls.slice(1).map((el) => el.querySelectorAll('.split-char')), { opacity: 0, filter: 'blur(10px)', y: 0, yPercent: 30 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: ref.current,
            start: 'top top',
            end: `+=${steps.length * 90}%`,
            pin: true,
            scrub: 1,
          },
        });

        for (let i = 1; i < steps.length; i++) {
          const prev = stepEls[i - 1];
          const next = stepEls[i];
          const at = i - 0.5;
          tl.to(prev.querySelectorAll('.split-char'), { opacity: 0, filter: 'blur(10px)', yPercent: -30, stagger: 0.01, duration: 0.25 }, at)
            .to(prev, { autoAlpha: 0, duration: 0.2 }, at + 0.15)
            .to(imgs[i], { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.5, ease: 'power2.inOut' }, at)
            .fromTo(imgs[i].querySelector('img'), { scale: 1.3 }, { scale: 1, duration: 0.6 }, at)
            .to(bgs[i - 1], { opacity: 0, duration: 0.5 }, at)
            .to(bgs[i], { opacity: 1, duration: 0.5 }, at)
            .set(next, { autoAlpha: 1 }, at + 0.2)
            .to(next.querySelectorAll('.split-char'), { opacity: 1, filter: 'blur(0px)', yPercent: 0, stagger: 0.015, duration: 0.3 }, at + 0.22);
        }
        tl.to({}, { duration: 0.5 });

        // Gentle drift of the frame throughout
        gsap.fromTo('.process__media', { y: 0, yPercent: 4 }, {
          yPercent: -4,
          ease: 'none',
          scrollTrigger: { trigger: ref.current, start: 'top top', end: `+=${steps.length * 90}%`, scrub: true },
        });
      });

      mm.add('(max-width: 899px)', () => {
        gsap.utils.toArray('.process-step').forEach((el) => {
          gsap.from(el.children, {
            y: 30,
            opacity: 0,
            stagger: 0.08,
            duration: 0.9,
            scrollTrigger: { trigger: el, start: 'top 85%', once: true },
          });
        });
      });
    },
    { scope: ref }
  );

  return (
    <section ref={ref} className="process">
      <div className="process__bg" aria-hidden="true">
        {steps.map((s) => (
          <img key={s.title} src={projectImage(s.image)} alt="" className="process__bg-img img-mono" loading="lazy" />
        ))}
      </div>
      <div className="process__inner container">
        <div className="process__media">
          {steps.map((s) => (
            <div className="process__img" key={s.title}>
              <img src={projectImage(s.image)} alt={s.title} className="img-mono" loading="lazy" />
            </div>
          ))}
        </div>
        <div className="process__text">
          {steps.map((s, i) => (
            <ProcessStep key={s.title} step={s} index={i} total={steps.length} />
          ))}
        </div>
      </div>
    </section>
  );
}
