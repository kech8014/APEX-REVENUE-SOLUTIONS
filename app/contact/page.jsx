import { Clock, Globe, Mail, MapPin, Phone } from "lucide-react";
import { contact, images } from "@/lib/data";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import ConsultForm from "@/components/ConsultForm";

export const metadata = {
  title: "Schedule a Consultation",
  description: "Request a consultation with APEX REVENUE SOLUTIONS to discuss your practice’s revenue cycle.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Schedule a consultation."
        lead="Tell us a little about your practice. A member of our team will reach out to arrange a conversation at a time that works for you."
        image={images.clinic}
        crumb="Contact"
      />

      <section className="section section--gray">
        <div className="container contact-grid">
          <Reveal>
            <span className="eyebrow">What to expect</span>
            <h2 className="h2" style={{ margin: "20px 0 24px", fontSize: "clamp(30px, 3.4vw, 44px)" }}>
              A focused conversation about your revenue cycle.
            </h2>
            <p className="lead">
              We’ll discuss your specialty, payers, systems and current challenges, then outline how APEX could
              support your practice. There’s no obligation.
            </p>
            <ul className="contact-list">
              <li>
                <Mail size={20} aria-hidden="true" />
                <div>
                  <span>Email</span>
                  <a href={`mailto:${contact.email}`}>{contact.email}</a>
                </div>
              </li>
              <li>
                <Phone size={20} aria-hidden="true" />
                <div>
                  <span>Phone</span>
                  <a href={contact.phoneHref}>{contact.phone}</a>
                </div>
              </li>
              <li>
                <Clock size={20} aria-hidden="true" />
                <div>
                  <span>Hours</span>
                  <strong>{contact.hours}</strong>
                </div>
              </li>
              <li>
                <MapPin size={20} aria-hidden="true" />
                <div>
                  <span>Office</span>
                  <a href={contact.mapHref} target="_blank" rel="noopener noreferrer">
                    {contact.address}
                  </a>
                </div>
              </li>
              <li>
                <Globe size={20} aria-hidden="true" />
                <div>
                  <span>Coverage</span>
                  <strong>{contact.location}</strong>
                </div>
              </li>
            </ul>
          </Reveal>
          <Reveal delay={0.1}>
            <ConsultForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
