import { site } from '../../data/site';
import SocialIcon from '../icons/SocialIcon';

export default function SocialLinks({ className = '', size = 17 }) {
  return (
    <ul className={`socials ${className}`}>
      {site.socials.map((s) => (
        <li key={s.label}>
          <a href={s.href} target="_blank" rel="noreferrer" aria-label={s.label} className="socials__link">
            <SocialIcon name={s.icon} size={size} />
          </a>
        </li>
      ))}
    </ul>
  );
}
