import Counter from '../ui/Counter';

export default function StatItem({ value, suffix, label }) {
  return (
    <div className="stat">
      <Counter value={value} suffix={suffix} className="stat__value display display-xl" />
      <span className="stat__label eyebrow muted">{label}</span>
    </div>
  );
}
