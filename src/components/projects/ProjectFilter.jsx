export default function ProjectFilter({ categories, active, counts, onChange }) {
  return (
    <div className="project-filter" role="tablist" aria-label="Filter projects">
      {categories.map((cat) => (
        <button
          key={cat}
          role="tab"
          aria-selected={active === cat}
          className={`project-filter__btn eyebrow ${active === cat ? 'is-active' : ''}`}
          onClick={() => onChange(cat)}
        >
          {cat}
          <sup className="project-filter__count">{counts[cat]}</sup>
        </button>
      ))}
    </div>
  );
}
