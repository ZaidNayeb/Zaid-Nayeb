export default function JourneyItem({ item }) {
  return (
    <li className="journey-item">
      <span className="journey-item__dot" aria-hidden="true" />
      <span className="journey-item__step eyebrow muted">{item.step}</span>
      <h3 className="journey-item__title display display-md">{item.title}</h3>
      <p className="journey-item__text lead">{item.text}</p>
    </li>
  );
}
