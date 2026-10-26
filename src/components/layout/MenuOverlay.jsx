import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { gsap, useGSAP } from '../../lib/gsap';
import { getLenis } from '../../lib/lenis';
import usePageTransition from '../../hooks/usePageTransition';
import { navLinks } from '../../data/nav';
import { site } from '../../data/site';
import TransitionLink from '../ui/TransitionLink';
import Logo from './Logo';
import SocialLinks from './SocialLinks';

export default function MenuOverlay() {
  const ref = useRef(null);
  const tl = useRef(null);
  const { menuOpen, setMenuOpen } = usePageTransition();
  const { pathname } = useLocation();

  useGSAP(
    () => {
      const links = ref.current.querySelectorAll('.menu__link-inner');
      tl.current = gsap
        .timeline({ paused: true })
        .set(ref.current, { visibility: 'visible' })
        .fromTo(
          ref.current,
          { clipPath: 'inset(0% 0% 100% 0%)' },
          { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.9, ease: 'power4.inOut' }
        )
        .fromTo('.menu__mark', { scale: 1.3, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.4, ease: 'power3.out' }, 0.3)
        .fromTo(
          links,
          { y: 0, yPercent: 110, filter: 'blur(6px)' },
          { y: 0, yPercent: 0, filter: 'blur(0px)', duration: 1, stagger: 0.07, ease: 'power4.out' },
          0.45
        )
        .fromTo('.menu__foot > *', { opacity: 0, y: 16 }, { opacity: 1, y: 0, stagger: 0.08, duration: 0.6 }, 0.8);
    },
    { scope: ref }
  );

  useEffect(() => {
    const lenis = getLenis();
    if (menuOpen) {
      lenis?.stop();
      tl.current?.timeScale(1).play();
    } else {
      lenis?.start();
      tl.current?.timeScale(1.6).reverse();
    }
  }, [menuOpen]);

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setMenuOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [setMenuOpen]);

  return (
    <nav id="site-menu" ref={ref} className="menu" aria-hidden={!menuOpen}>
      <div className="menu__mark" aria-hidden="true">
        <Logo size={720} />
      </div>
      <ul className="menu__list">
        {navLinks.map((link, i) => (
          <li key={link.to} className="menu__item">
            <TransitionLink
              to={link.to}
              className={`menu__link ${pathname === link.to ? 'is-active' : ''}`}
              tabIndex={menuOpen ? 0 : -1}
            >
              <span className="menu__link-inner">
                <span className="menu__index">0{i + 1}</span>
                {link.label}
              </span>
            </TransitionLink>
          </li>
        ))}
      </ul>
      <div className="menu__foot">
        <span className="eyebrow muted">© {site.year} {site.name}</span>
        <a href={`mailto:${site.email}`} className="menu__email">
          {site.email}
        </a>
        <SocialLinks />
      </div>
    </nav>
  );
}
