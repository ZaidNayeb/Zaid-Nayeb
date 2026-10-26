import { useState } from 'react';
import { faqs } from '../../data/faqs';
import LineReveal from '../ui/LineReveal';
import FadeIn from '../ui/FadeIn';
import FaqItem from './FaqItem';

export default function FaqList() {
  const [open, setOpen] = useState(0);

  return (
    <section className="faq container">
      <div className="faq__head">
        <p className="eyebrow muted">Questions</p>
        <LineReveal lines={['Before You', 'Reach Out']} className="display display-lg" />
      </div>
      <FadeIn className="faq__list" stagger={0.08}>
        {faqs.map((item, i) => (
          <FaqItem key={item.q} item={item} index={i} open={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />
        ))}
      </FadeIn>
    </section>
  );
}
