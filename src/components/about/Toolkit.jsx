import { skills } from '../../data/skills';
import LineReveal from '../ui/LineReveal';
import Marquee from '../ui/Marquee';
import FadeIn from '../ui/FadeIn';

export default function Toolkit() {
  return (
    <section className="toolkit">
      <div className="container toolkit__head">
        <p className="eyebrow muted">Toolkit</p>
        <LineReveal lines={['The Tools', 'Behind The Work']} className="display display-lg" />
      </div>
      <Marquee items={skills} className="toolkit__marquee display" speed={45} />
      <FadeIn as="ul" className="toolkit__grid container" stagger={0.05}>
        {skills.map((skill, i) => (
          <li key={skill} className="toolkit__item">
            <span className="eyebrow muted">{String(i + 1).padStart(2, '0')}</span>
            <span className="toolkit__name">{skill}</span>
          </li>
        ))}
      </FadeIn>
    </section>
  );
}
