import GithubIcon from './GithubIcon';
import LinkedinIcon from './LinkedinIcon';
import InstagramIcon from './InstagramIcon';

const icons = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  instagram: InstagramIcon,
};

export default function SocialIcon({ name, size }) {
  const Icon = icons[name];
  return Icon ? <Icon size={size} /> : null;
}
