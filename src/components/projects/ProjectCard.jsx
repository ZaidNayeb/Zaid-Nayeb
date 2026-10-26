import { projectImage } from '../../data/projects';
import ArrowIcon from '../icons/ArrowIcon';

export default function ProjectCard({ project, index, hidden }) {
  return (
    <a
      href={project.url}
      target="_blank"
      rel="noreferrer"
      className={`project-card ${hidden ? 'is-hidden' : ''}`}
      data-flip-id={project.slug}
      tabIndex={hidden ? -1 : 0}
      aria-hidden={hidden}
    >
      <div className="project-card__media">
        <img src={projectImage(project.slug)} alt={project.title} className="img-mono" loading="lazy" />
        <span className="project-card__view eyebrow">
          View live <ArrowIcon size={11} />
        </span>
      </div>
      <div className="project-card__meta">
        <span className="project-card__index eyebrow muted">{String(index + 1).padStart(2, '0')}</span>
        <div>
          <h3 className="project-card__title">{project.title}</h3>
          <p className="project-card__desc muted">{project.description}</p>
        </div>
        <span className="project-card__cat eyebrow muted">{project.category}</span>
      </div>
    </a>
  );
}
