import { site } from '../../data/site';
import FadeIn from '../ui/FadeIn';
import SocialLinks from '../layout/SocialLinks';

export default function ContactInfo() {
  return (
    <FadeIn as="aside" className="contact-info" stagger={0.1}>
      <div className="contact-info__block">
        <span className="eyebrow muted">Email</span>
        <a href={`mailto:${site.email}`} className="contact-info__email display display-sm">
          {site.email}
        </a>
      </div>
      <div className="contact-info__block">
        <span className="eyebrow muted">Availability</span>
        <p className="contact-info__status">
          <span className="about-intro__dot" /> {site.availability}
        </p>
      </div>
      <div className="contact-info__block">
        <span className="eyebrow muted">Location</span>
        <p>{site.location}</p>
      </div>
      <div className="contact-info__block">
        <span className="eyebrow muted">Elsewhere</span>
        <SocialLinks size={20} />
      </div>
    </FadeIn>
  );
}
