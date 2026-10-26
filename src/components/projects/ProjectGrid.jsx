import { useLayoutEffect, useMemo, useRef, useState } from 'react';
import { gsap, Flip, ScrollTrigger, useGSAP } from '../../lib/gsap';
import { categories, projects } from '../../data/projects';
import ProjectFilter from './ProjectFilter';
import ProjectCard from './ProjectCard';

// Filterable grid. GSAP Flip animates cards between layouts when the filter changes.
export default function ProjectGrid() {
  const ref = useRef(null);
  const flipState = useRef(null);
  const [active, setActive] = useState('All');

  const counts = useMemo(() => {
    const c = { All: projects.length };
    categories.slice(1).forEach((cat) => {
      c[cat] = projects.filter((p) => p.category === cat).length;
    });
    return c;
  }, []);

  const changeFilter = (cat) => {
    if (cat === active) return;
    flipState.current = Flip.getState(ref.current.querySelectorAll('.project-card'));
    setActive(cat);
  };

  useLayoutEffect(() => {
    if (!flipState.current) return;
    Flip.from(flipState.current, {
      duration: 0.8,
      ease: 'power3.inOut',
      absolute: true,
      stagger: 0.02,
      onEnter: (els) => gsap.fromTo(els, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.6, delay: 0.25 }),
      onLeave: (els) => gsap.to(els, { opacity: 0, scale: 0.9, duration: 0.4 }),
      onComplete: () => ScrollTrigger.refresh(),
    });
    flipState.current = null;
  }, [active]);

  // Initial reveal of the cards as they scroll into view.
  useGSAP(
    () => {
      ScrollTrigger.batch('.project-card', {
        start: 'top 92%',
        once: true,
        onEnter: (batch) =>
          gsap.fromTo(
            batch,
            { y: 60, opacity: 0, clipPath: 'inset(20% 0% 0% 0%)' },
            { y: 0, opacity: 1, clipPath: 'inset(0% 0% 0% 0%)', duration: 1.1, stagger: 0.1, ease: 'power3.out' }
          ),
      });
    },
    { scope: ref }
  );

  return (
    <section className="projects container">
      <ProjectFilter categories={categories} active={active} counts={counts} onChange={changeFilter} />
      <div ref={ref} className="projects__grid">
        {projects.map((p, i) => (
          <ProjectCard key={p.slug} project={p} index={i} hidden={active !== 'All' && p.category !== active} />
        ))}
      </div>
    </section>
  );
}
