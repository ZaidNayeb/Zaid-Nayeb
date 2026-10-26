export default function FormField({ label, name, type = 'text', textarea = false, required = false, value, onChange, error }) {
  const Input = textarea ? 'textarea' : 'input';
  return (
    <label className={`field ${value ? 'has-value' : ''} ${error ? 'has-error' : ''}`}>
      <Input
        className="field__input"
        name={name}
        type={textarea ? undefined : type}
        rows={textarea ? 5 : undefined}
        required={required}
        value={value}
        onChange={onChange}
        placeholder=" "
      />
      <span className="field__label eyebrow">
        {label}
        {required && ' *'}
      </span>
      <span className="field__line" aria-hidden="true" />
      {error && <span className="field__error">{error}</span>}
    </label>
  );
}
