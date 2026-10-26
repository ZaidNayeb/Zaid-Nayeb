import SplitText from '../ui/SplitText';
import Button from '../ui/Button';
import { projectImage } from '../../data/projects';

export default function ProcessStep({ step, index, total }) {
  return (
    <article className="process-step" data-step={index}>
      <img src={projectImage(step.image)} alt="" className="process-step__mobile-img img-mono" loading="lazy" />
      <p className="process-step__count display">
        0{index + 1} <span className="muted">/ 0{total}</span>
      </p>
      <SplitText as="h3" text={step.title} className="process-step__title display display-lg" />
      <p className="process-step__text lead">{step.text}</p>
      <Button to="/contact">Start your project</Button>
    </article>
  );
}
