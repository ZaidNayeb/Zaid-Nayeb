import PageHero from '../components/sections/PageHero';
import Button from '../components/ui/Button';

export default function NotFound() {
  return (
    <PageHero eyebrow="404" title={['Lost', 'In The Grid']} lead="This page doesn’t exist, or it moved somewhere better.">
      <Button to="/" arrow>
        Back home
      </Button>
    </PageHero>
  );
}
