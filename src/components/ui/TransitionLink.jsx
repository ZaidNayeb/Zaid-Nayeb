import usePageTransition from '../../hooks/usePageTransition';

// Internal link that plays the page-transition overlay before routing.
export default function TransitionLink({ to, children, className, onClick, ...rest }) {
  const { go } = usePageTransition();

  const handleClick = (e) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return;
    e.preventDefault();
    onClick?.(e);
    go(to);
  };

  return (
    <a href={to} className={className} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
}
