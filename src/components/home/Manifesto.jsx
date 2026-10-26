import ScrollFillText from '../ui/ScrollFillText';
import ParallaxImage from '../ui/ParallaxImage';
import FadeIn from '../ui/FadeIn';
import Button from '../ui/Button';

// Large serif statement that fills word-by-word, beside a tall portrait.
export default function Manifesto() {
  return (
    <section className="manifesto container">
      <div className="manifesto__text">
        <ScrollFillText
          as="h2"
          className="display display-md manifesto__statement"
          text="A website should say something before anyone scrolls. Every line, layout and interaction is considered."
        />
        <FadeIn className="manifesto__body" stagger={0.1}>
          <p className="lead">
            From the first sketch of a layout to the last easing curve, I build with intent: responsive structure, clean
            code and motion that sharpens a brand without overpowering it.
          </p>
          <Button to="/about" arrow>
            More about me
          </Button>
        </FadeIn>
      </div>
      <ParallaxImage src="/images/profile.png" alt="Portrait of Zaid Nayeb" className="manifesto__portrait" amount={8} mono={false} />
    </section>
  );
}
