export default function MenuButton({ open, onClick }) {
  return (
    <button
      className={`menu-btn ${open ? 'is-open' : ''}`}
      onClick={onClick}
      aria-expanded={open}
      aria-controls="site-menu"
    >
      <span className="menu-btn__label eyebrow">
        <span className="menu-btn__text">Navigate</span>
        <span className="menu-btn__text">Close</span>
      </span>
      <span className="menu-btn__lines" aria-hidden="true">
        <span />
        <span />
        <span />
      </span>
    </button>
  );
}
