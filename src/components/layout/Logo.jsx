// "ZN" monogram — a single folded stroke that reads as a Z, with an N echo.
export default function Logo({ size = 40, withName = false, className = '' }) {
  return (
    <span className={`logo ${className}`}>
      <svg width={size} height={size * 0.62} viewBox="0 0 64 40" fill="currentColor" aria-hidden="true">
        <path d="M2 2h34L14 30h22l-4 8H2l22-28H6z" />
        <path d="M40 38V2h6l12 20V2h4v36h-6L44 18v20z" opacity="0.92" />
      </svg>
      {withName && <span className="logo__name">Zaid Nayeb</span>}
    </span>
  );
}
