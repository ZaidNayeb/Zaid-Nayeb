export default function HeroScreen({ position, src, color = false }) {
  return (
    <div className={`hero-screen hero-screen--${position}`}>
      <div className="hero-screen__inner">
        <div className="hero-screen__bar" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <img src={src} alt="" className={`hero-screen__img ${color ? '' : 'img-mono'}`} />
      </div>
    </div>
  );
}
