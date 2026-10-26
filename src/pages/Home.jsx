import HomeHero from '../components/home/HomeHero';
import ApproachCard from '../components/home/ApproachCard';
import ProcessSteps from '../components/sections/ProcessSteps';
import Manifesto from '../components/home/Manifesto';
import ServicesStack from '../components/sections/ServicesStack';
import Showcase from '../components/home/Showcase';
import FeaturedWork from '../components/home/FeaturedWork';
import Gateway from '../components/home/Gateway';

export default function Home() {
  return (
    <>
      <HomeHero />
      <ApproachCard />
      <ProcessSteps />
      <Manifesto />
      <ServicesStack />
      <Showcase />
      <FeaturedWork />
      <Gateway />
    </>
  );
}
