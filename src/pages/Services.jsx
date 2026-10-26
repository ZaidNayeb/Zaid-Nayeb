import PageHero from '../components/sections/PageHero';
import ServicesStack from '../components/sections/ServicesStack';
import ProcessSteps from '../components/sections/ProcessSteps';
import FaqList from '../components/sections/FaqList';
import { projectImage } from '../data/projects';

export default function Services() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title={['Shaped With', 'Intent']}
        lead="From the first wireframe to the final transition, each service sharpens a site’s character without overpowering it."
        image={projectImage('restaurant')}
      />
      <ServicesStack />
      <ProcessSteps />
      <FaqList />
    </>
  );
}
