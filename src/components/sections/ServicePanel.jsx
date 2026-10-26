import { projectImage } from '../../data/projects';
import BlurReveal from '../ui/BlurReveal';
import Button from '../ui/Button';

export default function ServicePanel({ service, index }) {
  return (
    <article className="service-panel" data-index={index}>
      <img src={projectImage(service.image)} alt="" className="service-panel__mobile-img img-mono" loading="lazy" />
      <p className="eyebrow muted">Service · 0{index + 1}</p>
      <BlurReveal text={service.title} as="h3" className="service-panel__title display display-lg" start="top 75%" />
      <p className="service-panel__text lead">{service.text}</p>
      <Button to="/contact">Start your project</Button>
    </article>
  );
}
