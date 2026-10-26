export default function ChipGroup({ label, options, value, onChange }) {
  return (
    <fieldset className="chips">
      <legend className="eyebrow muted">{label}</legend>
      <div className="chips__list">
        {options.map((opt) => (
          <button
            type="button"
            key={opt}
            className={`chip ${value === opt ? 'is-active' : ''}`}
            aria-pressed={value === opt}
            onClick={() => onChange(value === opt ? '' : opt)}
          >
            {opt}
          </button>
        ))}
      </div>
    </fieldset>
  );
}
