import { navLinks } from '../../data/nav';
import { site } from '../../data/site';
import TransitionLink from '../ui/TransitionLink';
import FooterCta from './FooterCta';
import SocialLinks from './SocialLinks';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="footer">
      <FooterCta />
      <div className="footer__bar container">
        <div className="footer__brand">
          <Logo size={34} />
          <p className="muted">
            {site.name} — {site.role}. {site.tagline}
          </p>
        </div>
        <ul className="footer__nav">
          {navLinks.map((link) => (
            <li key={link.to}>
              <TransitionLink to={link.to} className="footer__link">
                {link.label}
              </TransitionLink>
            </li>
          ))}
        </ul>
        <div className="footer__meta">
          <a href={`mailto:${site.email}`} className="footer__email">
            {site.email}
          </a>
          <SocialLinks />
        </div>
      </div>
      <div className="footer__legal container">
        <span className="eyebrow muted">© {site.year} {site.name}</span>
        <span className="eyebrow muted">Designed &amp; built by {site.firstName}</span>
      </div>
    </footer>
  );
}
