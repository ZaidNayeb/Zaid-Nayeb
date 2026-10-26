import ScrollFillText from '../ui/ScrollFillText';

export default function AboutStatement() {
  return (
    <section className="about-statement container">
      <p className="eyebrow muted">Philosophy</p>
      <ScrollFillText
        as="h2"
        className="display display-lg"
        text="Good websites are not decorated. They are built, line by line, until nothing is left to chance and everything feels inevitable."
      />
    </section>
  );
}
