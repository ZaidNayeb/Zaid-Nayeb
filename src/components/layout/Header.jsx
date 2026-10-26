import { useRef } from 'react';
import { gsap, useGSAP } from '../../lib/gsap';
import usePageTransition from '../../hooks/usePageTransition';
import TransitionLink from '../ui/TransitionLink';
import Logo from './Logo';
import SocialLinks from './SocialLinks';
import ThemeToggle from './ThemeToggle';
import MenuButton from './MenuButton';

export default function Header() {
  const ref = useRef(null);
  const { introDone, menuOpen, setMenuOpen } = usePageTransition();

  useGSAP(
    () => {
      if (!introDone) {
        gsap.set(ref.current, { autoAlpha: 0 });
        return;
      }
      gsap.fromTo(ref.current, { autoAlpha: 0, y: -20 }, { autoAlpha: 1, y: 0, duration: 1, delay: 0.4 });
    },
    { dependencies: [introDone] }
  );

  return (
    <header ref={ref} className={`header ${menuOpen ? 'is-menu-open' : ''}`}>
      <div className="header__left">
        <SocialLinks />
      </div>
      <TransitionLink to="/" className="header__logo" aria-label="Zaid Nayeb — home">
        <Logo size={44} />
      </TransitionLink>
      <div className="header__right">
        <ThemeToggle />
        <MenuButton open={menuOpen} onClick={() => setMenuOpen(!menuOpen)} />
      </div>
    </header>
  );
}
