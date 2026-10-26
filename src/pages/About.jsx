import AboutIntro from '../components/about/AboutIntro';
import AboutStatement from '../components/about/AboutStatement';
import StatsRow from '../components/about/StatsRow';
import Toolkit from '../components/about/Toolkit';
import Journey from '../components/about/Journey';

export default function About() {
  return (
    <>
      <AboutIntro />
      <AboutStatement />
      <StatsRow />
      <Toolkit />
      <Journey />
    </>
  );
}
