import { stats } from '../../data/skills';
import FadeIn from '../ui/FadeIn';
import StatItem from './StatItem';

export default function StatsRow() {
  return (
    <FadeIn as="section" className="stats container" stagger={0.1}>
      {stats.map((s) => (
        <StatItem key={s.label} {...s} />
      ))}
    </FadeIn>
  );
}
