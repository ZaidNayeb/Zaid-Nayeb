import TransitionLink from './TransitionLink';
import ArrowIcon from '../icons/ArrowIcon';

// Outlined box button with a light sweep + fill on hover.
// Use `to` for internal routes, `href` for external links, or neither for a <button>.
export default function Button({ to, href, children, variant = 'outline', arrow = false, className = '', ...rest }) {
  const classes = `btn btn--${variant} ${className}`.trim();
  const inner = (
    <>
      <span className="btn__shine" aria-hidden="true" />
      <span className="btn__label">{children}</span>
      {arrow && (
        <span className="btn__arrow">
          <ArrowIcon size={12} />
        </span>
      )}
    </>
  );

  if (to) {
    return (
      <TransitionLink to={to} className={classes} {...rest}>
        {inner}
      </TransitionLink>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} target="_blank" rel="noreferrer" {...rest}>
        {inner}
      </a>
    );
  }

  return (
    <button className={classes} type="button" {...rest}>
      {inner}
    </button>
  );
}
