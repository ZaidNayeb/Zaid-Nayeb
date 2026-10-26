import { projectImage } from '../../data/projects';
import ArrowIcon from '../icons/ArrowIcon';

export default function FeaturedCard({ project, index }) {
  return (
    <a href={project.url} target="_blank" rel="noreferrer" className="featured-card">
      <div className="featured-card__media">
        <img src={projectImage(project.slug)} alt={project.title} className="img-mono" loading="lazy" />
      </div>
      <div className="featured-card__meta">
        <span className="eyebrow muted">
          0{index + 1} · {project.category}
          {project.team ? ' · Team' : ''}
        </span>
        <h3 className="display display-sm featured-card__title">{project.title}</h3>
        <p className="muted featured-card__desc">{project.description}</p>
        <span className="featured-card__cta eyebrow">
          Visit live site <ArrowIcon size={11} />
        </span>
      </div>
    </a>
  );
}
