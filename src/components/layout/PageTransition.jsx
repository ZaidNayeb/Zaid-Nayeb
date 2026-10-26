import usePageTransition from '../../hooks/usePageTransition';
import Logo from './Logo';

// The overlay the TransitionContext animates between routes.
export default function PageTransition() {
  const { overlayRef } = usePageTransition();

  return (
    <div ref={overlayRef} className="page-transition" aria-hidden="true">
      <div className="page-transition__panel page-transition__panel--back" data-panel />
      <div className="page-transition__panel page-transition__panel--front" data-panel>
        <div className="page-transition__mark" data-mark>
          <Logo size={64} />
        </div>
      </div>
    </div>
  );
}
