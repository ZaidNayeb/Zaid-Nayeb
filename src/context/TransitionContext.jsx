import { createContext, useCallback, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { gsap, ScrollTrigger } from '../lib/gsap';
import { scrollToTop } from '../lib/lenis';

export const TransitionContext = createContext(null);

const hasSeenIntro = () => {
  try {
    return sessionStorage.getItem('zn-intro') === '1';
  } catch {
    return false;
  }
};

export default function TransitionProvider({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const overlayRef = useRef(null);
  const busy = useRef(false);
  const [introDone, setIntroDone] = useState(hasSeenIntro);
  const [menuOpen, setMenuOpen] = useState(false);

  const finishIntro = useCallback(() => {
    try {
      sessionStorage.setItem('zn-intro', '1');
    } catch {
      /* storage unavailable */
    }
    setIntroDone(true);
  }, []);

  const go = useCallback(
    (to) => {
      if (busy.current) return;
      setMenuOpen(false);
      if (to === location.pathname) {
        scrollToTop(false);
        return;
      }
      const overlay = overlayRef.current;
      if (!overlay) {
        navigate(to);
        return;
      }
      busy.current = true;
      const panels = overlay.querySelectorAll('[data-panel]');
      const mark = overlay.querySelector('[data-mark]');

      gsap
        .timeline({
          onComplete: () => {
            busy.current = false;
          },
        })
        .set(overlay, { pointerEvents: 'all' })
        .fromTo(panels, { y: 0, yPercent: 100 }, { y: 0, yPercent: 0, duration: 0.7, ease: 'power4.inOut', stagger: 0.08 })
        .fromTo(mark, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.4 }, '-=0.3')
        .add(() => {
          navigate(to);
          scrollToTop(true);
        })
        .add(() => ScrollTrigger.refresh(), '+=0.15')
        .to(mark, { autoAlpha: 0, y: -20, duration: 0.3 })
        .to(panels, { y: 0, yPercent: -100, duration: 0.7, ease: 'power4.inOut', stagger: 0.08 }, '-=0.1')
        .set(overlay, { pointerEvents: 'none' });
    },
    [location.pathname, navigate]
  );

  return (
    <TransitionContext.Provider value={{ go, overlayRef, introDone, finishIntro, menuOpen, setMenuOpen }}>
      {children}
    </TransitionContext.Provider>
  );
}
