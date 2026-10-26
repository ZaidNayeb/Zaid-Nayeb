import PageHero from '../components/sections/PageHero';
import ProjectGrid from '../components/projects/ProjectGrid';
import { projects } from '../data/projects';

export default function Projects() {
  return (
    <>
      <PageHero
        eyebrow={`Projects · ${projects.length} builds`}
        title={['Previous', 'Builds']}
        lead="Every project here is live. Filter by type, then open any card to explore the real site."
      />
      <ProjectGrid />
    </>
  );
}
