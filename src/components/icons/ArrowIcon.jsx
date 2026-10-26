export default function ArrowIcon({ size = 14, direction = 'up-right' }) {
  const rotation = { 'up-right': 0, right: 45, down: 135, up: -45 }[direction] ?? 0;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      style={{ transform: `rotate(${rotation}deg)` }}
      aria-hidden="true"
    >
      <path d="M4 12 12 4M5.5 4H12v6.5" />
    </svg>
  );
}
