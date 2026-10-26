import { useRef } from 'react';
import { gsap, useGSAP } from '../../lib/gsap';
import { projects } from '../../data/projects';
import SplitText from '../ui/SplitText';
import Button from '../ui/Button';
import FeaturedCard from './FeaturedCard';

// Pinned horizontal gallery of featured projects (vertical list on small screens).
export default function FeaturedWork() {
  const ref = useRef(null);
  const featured = projects.filter((p) => p.featured);

  useGSAP(
    () => {
      gsap.set('.featured__title .split-line', { y: 0, yPercent: 110 });
      gsap.to('.featured__title .split-line', {
        y: 0,
        yPercent: 0,
        duration: 1.2,
        stagger: 0.12,
        ease: 'power4.out',
        scrollTrigger: { trigger: ref.current, start: 'top 70%', once: true },
      });

      const mm = gsap.matchMedia();
      mm.add('(min-width: 900px)', () => {
        const track = ref.current.querySelector('.featured__track');
        const distance = () => track.scrollWidth - window.innerWidth;

        const tween = gsap.to(track, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top top',
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        gsap.utils.toArray('.featured-card').forEach((card) => {
          gsap.fromTo(
            card.querySelector('img'),
            { x: 0, xPercent: -8, scale: 1.15 },
            {
              xPercent: 8,
              ease: 'none',
              scrollTrigger: {
                trigger: card,
                containerAnimation: tween,
                start: 'left right',
                end: 'right left',
                scrub: true,
              },
            }
          );
        });
      });

      mm.add('(max-width: 899px)', () => {
        gsap.utils.toArray('.featured-card').forEach((card) => {
          gsap.from(card, { y: 50, opacity: 0, duration: 1, scrollTrigger: { trigger: card, start: 'top 88%', once: true } });
        });
      });
    },
    { scope: ref }
  );

  return (
    <section ref={ref} className="featured">
      <div className="featured__track">
        <div className="featured__intro">
          <p className="eyebrow muted">Selected work</p>
          <SplitText as="h2" mode="lines" text={['Previous', 'Builds']} className="display display-xl featured__title" />
          <p className="lead">
            A collection of websites shaped by structure, character and the people they were built for.
          </p>
          <Button to="/projects" arrow>
            Explore all projects
          </Button>
        </div>
        {featured.map((p, i) => (
          <FeaturedCard key={p.slug} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}
