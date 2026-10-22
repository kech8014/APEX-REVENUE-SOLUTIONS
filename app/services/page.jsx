import { Check } from "lucide-react";
import { images, services } from "@/lib/data";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import Icon from "@/components/Icon";
import CTA from "@/components/CTA";

export const metadata = {
  title: "Services",
  description:
    "Medical billing, insurance claims management, eligibility verification, denial management, A/R follow-up, payment reconciliation and revenue cycle reporting.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Revenue cycle services, end to end."
        lead="Engage APEX for your complete revenue cycle or for the specific functions where your practice needs focused support. Every service is delivered by a dedicated team under documented standards."
        image={images.physicianLaptop}
        crumb="Services"
      />

      <section className="section section--tight section--gray">
        <div className="container">
          <Reveal>
            <span className="eyebrow">Jump to a service</span>
            <nav className="toc mt-lg" aria-label="Services" style={{ marginTop: 24 }}>
              {services.map((s, i) => (
                <a key={s.slug} href={`#${s.slug}`}>
                  {String(i + 1).padStart(2, "0")} — {s.title}
                </a>
              ))}
            </nav>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {services.map((s, i) => (
            <article className="service-block" id={s.slug} key={s.slug}>
              <Reveal className="service-block__meta">
                <span className="index">{String(i + 1).padStart(2, "0")} / {String(services.length).padStart(2, "0")}</span>
                <span className="service-block__icon">
                  <Icon name={s.icon} size={26} />
                </span>
              </Reveal>
              <Reveal delay={0.06}>
                <h2>{s.title}</h2>
                <p className="lead">{s.body}</p>
              </Reveal>
              <Reveal delay={0.12}>
                <span className="eyebrow">What’s included</span>
                <ul className="check-list" style={{ marginTop: 20 }}>
                  {s.points.map((p) => (
                    <li key={p}>
                      <Check size={18} aria-hidden="true" />
                      {p}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </article>
          ))}
        </div>
      </section>

      <section className="section section--gray">
        <div className="container split">
          <Reveal className="media media--wide media--mono media--wipe">
            <img src={images.analytics} alt="Revenue cycle analytics on a laptop screen" loading="lazy" />
          </Reveal>
          <Reveal delay={0.1}>
            <span className="eyebrow">Flexible engagement</span>
            <h2 className="h2" style={{ margin: "20px 0 24px" }}>
              Full outsourcing or targeted support.
            </h2>
            <p className="lead">
              Some practices hand us the entire revenue cycle. Others keep billing in-house and bring us in for denial
              management, A/R cleanup or reporting. We define responsibilities clearly at the start, so every task has
              an owner.
            </p>
          </Reveal>
        </div>
      </section>

      <CTA title="Not sure which services you need?" text="Start with a consultation. We’ll review how your revenue cycle runs today and recommend where support will make the biggest difference." />
    </>
  );
}
