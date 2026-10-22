import { Check } from "lucide-react";
import { images, process } from "@/lib/data";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import SectionHead from "@/components/SectionHead";
import CTA from "@/components/CTA";

export const metadata = {
  title: "Our Process",
  description: "How APEX REVENUE SOLUTIONS onboards and manages your revenue cycle, step by step.",
};

export default function ProcessPage() {
  return (
    <>
      <PageHero
        eyebrow="Our process"
        title="Structured from day one."
        lead="A clear, documented path from the first conversation to steady, day-to-day revenue cycle management — designed to avoid disruption to your practice."
        image={images.paperwork}
        crumb="Process"
      />

      <section className="section">
        <div className="container">
          <SectionHead eyebrow="Five stages" title="What working with APEX looks like." />
          <div className="timeline">
            {process.map((p, i) => (
              <Reveal className="timeline__item" key={p.title}>
                <span className="timeline__num">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{p.title}</h3>
                  <p className="lead">{p.text}</p>
                </div>
                <ul className="check-list">
                  {p.detail.map((d) => (
                    <li key={d}>
                      <Check size={18} aria-hidden="true" />
                      {d}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--gray">
        <div className="container split">
          <Reveal>
            <span className="eyebrow">Security & compliance</span>
            <h2 className="h2" style={{ margin: "20px 0 24px" }}>
              Patient data handled with care.
            </h2>
            <p className="lead">
              We follow HIPAA requirements in how we access, store and handle protected health information. Every
              client engagement is covered by a Business Associate Agreement.
            </p>
            <ul className="check-list">
              {[
                "Business Associate Agreement with every client",
                "Role-based, least-privilege system access",
                "Secure connections and documented handling procedures",
                "Activity logged within your systems for a clear audit trail",
              ].map((t) => (
                <li key={t}>
                  <Check size={18} aria-hidden="true" />
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal className="media media--tall media--mono" delay={0.1}>
            <img src={images.office} alt="" loading="lazy" />
          </Reveal>
        </div>
      </section>

      <CTA title="Ready for step one?" />
    </>
  );
}
