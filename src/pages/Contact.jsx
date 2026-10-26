import PageHero from '../components/sections/PageHero';
import ContactForm from '../components/contact/ContactForm';
import ContactInfo from '../components/contact/ContactInfo';

export default function Contact() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={['Start Your', 'Project']}
        lead="Tell me what you’re building. I usually reply within a day or two."
      />
      <section className="contact container">
        <ContactForm />
        <ContactInfo />
      </section>
    </>
  );
}
