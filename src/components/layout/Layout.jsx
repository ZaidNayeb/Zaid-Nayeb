import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ScrollTrigger } from '../../lib/gsap';
import useSmoothScroll from '../../hooks/useSmoothScroll';
import Header from './Header';
import MenuOverlay from './MenuOverlay';
import IntroGate from './IntroGate';
import PageTransition from './PageTransition';
import GrainOverlay from './GrainOverlay';
import ScrollProgress from './ScrollProgress';
import Footer from './Footer';

export default function Layout({ children }) {
  const { pathname } = useLocation();
  useSmoothScroll();

  // Re-measure every ScrollTrigger once the new page's images have loaded.
  useEffect(() => {
    const images = Array.from(document.images).filter((img) => !img.complete);
    const refresh = () => ScrollTrigger.refresh();
    images.forEach((img) => img.addEventListener('load', refresh, { once: true }));
    const t = setTimeout(refresh, 400);
    return () => {
      clearTimeout(t);
      images.forEach((img) => img.removeEventListener('load', refresh));
    };
  }, [pathname]);

  return (
    <>
      <IntroGate />
      <Header />
      <MenuOverlay />
      <main key={pathname} className="main">
        {children}
      </main>
      <Footer key={`footer-${pathname}`} />
      <ScrollProgress />
      <GrainOverlay />
      <PageTransition />
    </>
  );
}
