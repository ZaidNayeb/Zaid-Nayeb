import { projectImage } from '../../data/projects';
import GatewayPanel from './GatewayPanel';

export default function Gateway() {
  return (
    <section className="gateways">
      <GatewayPanel
        to="/projects"
        title="All Projects"
        text="Twenty-four builds, from CSS layout studies to complete websites, all live online."
        cta="Browse projects"
        image={projectImage('responsive-page')}
      />
      <GatewayPanel
        to="/services"
        title="Services"
        text="Websites, responsive layouts, interaction and motion, built with intent and finished with care."
        cta="See what I do"
        image={projectImage('netlinks')}
      />
    </section>
  );
}
