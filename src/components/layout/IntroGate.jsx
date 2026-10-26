import { useEffect, useRef, useState } from 'react';
import { gsap, useGSAP } from '../../lib/gsap';
import { getLenis } from '../../lib/lenis';
import usePageTransition from '../../hooks/usePageTransition';
import SplitText from '../ui/SplitText';
import Logo from './Logo';

const TAGLINE = 'Websites built on intent, detail and identity. Not simply to be seen.';

// First-visit gate: tagline drifts in, a loading line fills, then ENTER reveals the site.
export default function IntroGate() {
  const ref = useRef(null);
  const { introDone, finishIntro } = usePageTransition();
  const [visible, setVisible] = useState(!introDone);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!visible) return;
    const lenis = getLenis();
    lenis?.stop();
    document.documentElement.style.overflow = 'hidden';
    return () => {
      document.documentElement.style.overflow = '';
      getLenis()?.start();
    };
  }, [visible]);

  useGSAP(
    () => {
      if (!visible) return;
      const chars = ref.current.querySelectorAll('.split-char');
      const assetsReady = new Promise((resolve) => {
        if (document.readyState === 'complete') resolve();
        else window.addEventListener('load', resolve, { once: true });
      });

      gsap
        .timeline()
        .from('.gate__logo', { opacity: 0, y: -12, duration: 1 })
        .fromTo(
          chars,
          { opacity: 0, filter: 'blur(8px)' },
          { opacity: 1, filter: 'blur(0px)', duration: 0.6, stagger: 0.022, ease: 'power1.out' },
          0.3
        )
        .fromTo('.gate__bar-fill', { scaleX: 0 }, { scaleX: 0.85, duration: 2.2, ease: 'power2.inOut' }, 0.3)
        .add(() => {
          assetsReady.then(() => {
            gsap
              .timeline({ onComplete: () => setLoaded(true) })
              .to('.gate__bar-fill', { scaleX: 1, duration: 0.5, ease: 'power2.out' })
              .to('.gate__bar', { opacity: 0, duration: 0.4 })
              .fromTo('.gate__enter', { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.1');
          });
        });
    },
    { scope: ref, dependencies: [visible] }
  );

  const enter = () => {
    if (!loaded) return;
    gsap
      .timeline({
        onComplete: () => setVisible(false),
      })
      .to(ref.current.querySelectorAll('.gate__content > *'), { opacity: 0, y: -16, stagger: 0.05, duration: 0.5 })
      .add(() => finishIntro(), '-=0.1')
      .to(ref.current, { clipPath: 'inset(0% 0% 100% 0%)', duration: 1.1, ease: 'power4.inOut' }, '-=0.1');
  };

  if (!visible) return null;

  return (
    <div ref={ref} className="gate" role="dialog" aria-label="Welcome">
      <div className="gate__content">
        <div className="gate__logo">
          <Logo size={52} />
        </div>
        <SplitText text={TAGLINE} as="p" className="gate__tagline eyebrow" />
        <div className="gate__bottom">
          <div className="gate__bar">
            <span className="gate__bar-fill" />
          </div>
          <button className="gate__enter display" onClick={enter} disabled={!loaded}>
            Enter
          </button>
        </div>
      </div>
    </div>
  );
}
