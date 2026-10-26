import { useRef, useState } from 'react';
import { gsap } from '../../lib/gsap';
import FormField from './FormField';
import ChipGroup from './ChipGroup';
import Button from '../ui/Button';

const PROJECT_TYPES = ['Website', 'Landing page', 'Portfolio', 'Redesign', 'Something else'];
const BUDGETS = ['< $1k', '$1k – $3k', '$3k – $5k', '$5k +'];
const EMPTY = { name: '', email: '', company: '', message: '', type: '', budget: '' };

// Styled form only — submission is simulated locally (no data is sent anywhere yet).
export default function ContactForm() {
  const ref = useRef(null);
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');

  const update = (field) => (e) => setValues((v) => ({ ...v, [field]: e.target ? e.target.value : e }));

  const validate = () => {
    const next = {};
    if (!values.name.trim()) next.name = 'Please tell me your name.';
    if (!/^\S+@\S+\.\S+$/.test(values.email)) next.email = 'Please enter a valid email.';
    if (values.message.trim().length < 10) next.message = 'A few more words about your project?';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = (e) => {
    e.preventDefault();
    if (!validate()) {
      gsap.fromTo(ref.current, { x: -8 }, { x: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' });
      return;
    }
    setStatus('sending');
    setTimeout(() => {
      gsap.to(ref.current.querySelector('.contact-form__fields'), {
        opacity: 0,
        y: -20,
        duration: 0.5,
        onComplete: () => {
          setStatus('sent');
          setValues(EMPTY);
        },
      });
    }, 900);
  };

  if (status === 'sent') {
    return (
      <div className="contact-form contact-form--sent">
        <p className="eyebrow muted">Message received</p>
        <h2 className="display display-lg">Thank you.</h2>
        <p className="lead">I&rsquo;ll be in touch soon to talk about your project.</p>
        <Button onClick={() => setStatus('idle')}>Send another</Button>
      </div>
    );
  }

  return (
    <form ref={ref} className="contact-form" onSubmit={submit} noValidate>
      <div className="contact-form__fields">
        <div className="contact-form__row">
          <FormField label="Your name" name="name" required value={values.name} onChange={update('name')} error={errors.name} />
          <FormField label="Email" name="email" type="email" required value={values.email} onChange={update('email')} error={errors.email} />
        </div>
        <FormField label="Company / brand" name="company" value={values.company} onChange={update('company')} />
        <ChipGroup label="Project type" options={PROJECT_TYPES} value={values.type} onChange={update('type')} />
        <ChipGroup label="Budget" options={BUDGETS} value={values.budget} onChange={update('budget')} />
        <FormField
          label="Tell me about your project"
          name="message"
          textarea
          required
          value={values.message}
          onChange={update('message')}
          error={errors.message}
        />
        <button type="submit" className="btn btn--solid contact-form__submit" disabled={status === 'sending'}>
          <span className="btn__shine" aria-hidden="true" />
          <span className="btn__label">{status === 'sending' ? 'Sending…' : 'Send message'}</span>
        </button>
      </div>
    </form>
  );
}
