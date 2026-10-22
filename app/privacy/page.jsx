import PageHero from "@/components/PageHero";
import { contact } from "@/lib/data";

export const metadata = {
  title: "Privacy Policy",
  description: "How APEX REVENUE SOLUTIONS handles information submitted through this website.",
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Privacy Policy." crumb="Privacy Policy" />
      <section className="section">
        <div className="container">
          <div className="prose">
            <p className="notice">Sample policy text — have this reviewed by legal counsel before launch.</p>
            <h2>Information we collect</h2>
            <p>
              When you submit a consultation request, we collect the details you provide, such as your name, organization,
              contact information and message. We do not request protected health information through this website.
            </p>
            <h2>How we use information</h2>
            <p>
              We use the information you submit to respond to your inquiry and to discuss our services with you. We do
              not sell personal information.
            </p>
            <h2>Protected health information</h2>
            <p>
              Protected health information handled as part of client engagements is governed by a Business Associate
              Agreement and applicable HIPAA requirements, not by this website policy.
            </p>
            <h2>Contact</h2>
            <p>
              Questions about this policy can be sent to <a href={`mailto:${contact.email}`}>{contact.email}</a>.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
