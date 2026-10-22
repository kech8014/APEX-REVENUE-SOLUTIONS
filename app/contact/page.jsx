import Link from "next/link";
import { Clock, Mail, MapPin, Phone, ShieldCheck } from "lucide-react";
import { contact, faqs, images } from "@/lib/data";
import Reveal from "@/components/Reveal";
import SplitText from "@/components/SplitText";
import ConsultForm from "@/components/ConsultForm";
import FaqList from "@/components/FaqList";

export const metadata = {
  title: "Schedule a Consultation",
  description: "Request a consultation with APEX REVENUE SOLUTIONS to discuss your practice’s revenue cycle.",
};

const nextSteps = [
  {
    title: "We review your request",
    text: "A member of our team reads every request and prepares for your practice’s specialty and setup.",
  },
  {
    title: "We reach out within one business day",
    text: "We contact you by phone or email to find a time that suits your schedule.",
  },
  {
    title: "A focused consultation",
    text: "We discuss your payers, systems and challenges, then outline how APEX could support your practice.",
  },
];

const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(contact.address)}&output=embed`;

export default function ContactPage() {
  return (
    <>
      {/* Split hero: message on the left, form on the right */}
      <section className="page-hero contact-hero">
        <div className="page-hero__media">
          <img src={images.clinic} alt="" fetchPriority="high" data-parallax="0.12" />
        </div>
        <div className="container contact-hero__grid">
          <div className="contact-hero__intro">
            <Reveal>
              <span className="eyebrow">Contact</span>
            </Reveal>
            <SplitText lines={["Schedule a consultation."]} baseDelay={0.1} />
            <Reveal delay={0.3}>
              <p className="lead">
                Tell us a little about your practice. A member of our team will reach out to arrange a conversation at a
                time that works for you. There’s no obligation.
              </p>
            </Reveal>
            <Reveal delay={0.4}>
              <ul className="contact-hero__list">
                <li>
                  <Phone size={18} aria-hidden="true" />
                  <a href={contact.phoneHref}>{contact.phone}</a>
                </li>
                <li>
                  <Mail size={18} aria-hidden="true" />
                  <a href={`mailto:${contact.email}`}>{contact.email}</a>
                </li>
                <li>
                  <MapPin size={18} aria-hidden="true" />
                  <a href={contact.mapHref} target="_blank" rel="noopener noreferrer">
                    {contact.address}
                  </a>
                </li>
                <li>
                  <Clock size={18} aria-hidden="true" />
                  <span>{contact.hours}</span>
                </li>
              </ul>
            </Reveal>
            <nav className="breadcrumb" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">Contact</span>
            </nav>
          </div>

          <Reveal className="contact-hero__form" delay={0.2}>
            <div className="contact-hero__form-head">
              <h2>Request a consultation</h2>
              <p>Takes about two minutes. Fields marked * are required.</p>
            </div>
            <ConsultForm />
          </Reveal>
        </div>
      </section>

      {/* What happens next */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <Reveal>
              <span className="eyebrow">What happens next</span>
              <h2 className="h2">From request to conversation.</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="lead">
                Our process is simple and respectful of your time — no lengthy sales cycle, just a focused discussion
                about your revenue cycle.
              </p>
            </Reveal>
          </div>
          <div className="pillars next-steps">
            {nextSteps.map((s, i) => (
              <Reveal className="pillar spotlight" key={s.title} delay={i * 0.08}>
                <span className="pillar__label">Step {String(i + 1).padStart(2, "0")}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Ways to reach us + map */}
      <section className="section section--gray">
        <div className="container contact-reach">
          <div>
            <Reveal>
              <span className="eyebrow">Get in touch</span>
              <h2 className="h2" style={{ margin: "16px 0 28px" }}>
                Prefer to talk directly?
              </h2>
            </Reveal>
            <div className="reach-cards">
              <Reveal as="a" href={contact.phoneHref} className="reach-card spotlight">
                <Phone size={22} aria-hidden="true" />
                <span>Call us</span>
                <strong>{contact.phone}</strong>
              </Reveal>
              <Reveal as="a" href={`mailto:${contact.email}`} className="reach-card spotlight" delay={0.06}>
                <Mail size={22} aria-hidden="true" />
                <span>Email us</span>
                <strong>{contact.email}</strong>
              </Reveal>
              <Reveal
                as="a"
                href={contact.mapHref}
                target="_blank"
                rel="noopener noreferrer"
                className="reach-card spotlight"
                delay={0.12}
              >
                <MapPin size={22} aria-hidden="true" />
                <span>Visit our office</span>
                <strong>{contact.address}</strong>
              </Reveal>
            </div>
            <Reveal delay={0.16}>
              <p className="notice reach-notice">
                <ShieldCheck size={16} aria-hidden="true" />
                Please don’t send patient health information by email or through this website.
              </p>
            </Reveal>
          </div>
          <Reveal className="contact-map" delay={0.1}>
            <iframe
              title={`Map showing ${contact.address}`}
              src={mapSrc}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </Reveal>
        </div>
      </section>

      {/* Quick answers */}
      <section className="section">
        <div className="container split split--top">
          <Reveal>
            <span className="eyebrow">Before you reach out</span>
            <h2 className="h2" style={{ margin: "16px 0 20px" }}>
              Quick answers.
            </h2>
            <p className="lead">
              More questions? See the full <Link href="/faq" className="link-arrow">FAQ</Link>
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <FaqList items={faqs.filter((_, i) => [1, 4, 7].includes(i))} />
          </Reveal>
        </div>
      </section>
    </>
  );
}
