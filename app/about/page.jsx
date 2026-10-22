import { images, pillars, values } from "@/lib/data";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import SectionHead from "@/components/SectionHead";
import CTA from "@/components/CTA";

export const metadata = {
  title: "About Us",
  description: "APEX REVENUE SOLUTIONS — a transparent revenue cycle partner for physicians and medical practices.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="A billing partner you can see into."
        lead="APEX REVENUE SOLUTIONS provides revenue cycle management and medical billing services to physicians, independent practices and healthcare organizations across the United States."
        image={images.professional}
        crumb="About"
      />

      <section className="section">
        <div className="container split">
          <Reveal>
            <span className="eyebrow">Our mission</span>
            <h2 className="h2" style={{ margin: "20px 0 24px" }}>
              Let physicians focus on patients — not payers.
            </h2>
            <div className="stack-sm lead">
              <p>
                Healthcare providers lose time and revenue to an increasingly complex billing environment. Claims are
                denied for avoidable reasons, receivables age without follow-up, and practice leaders rarely get a clear
                picture of where their money is.
              </p>
              <p>
                Our mission is to change that with a disciplined, transparent approach: experienced people,
                documented processes and practical technology, all focused on one outcome — better revenue for the
                practices we serve.
              </p>
            </div>
          </Reveal>
          <Reveal className="media media--tall media--mono media--wipe" delay={0.1}>
            <img src={images.teamMeeting} alt="Team collaborating in a meeting room" loading="lazy" />
            <span className="media__tag">
              <span className="index">APEX</span>Our team
            </span>
          </Reveal>
        </div>
      </section>

      <section className="section section--gray">
        <div className="container">
          <SectionHead
            eyebrow="What we stand for"
            title="People, Process, Technology, Better Revenue."
            variant="stack"
          />
          <div className="pillars">
            {pillars.map((p, i) => (
              <Reveal className="pillar spotlight" key={p.label} delay={i * 0.08}>
                <span className="pillar__label">
                  {String(i + 1).padStart(2, "0")} — {p.label}
                </span>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--navy">
        <div className="container">
          <SectionHead eyebrow="Our values" title="How we work with every client." />
          <div className="values">
            {values.map((v, i) => (
              <Reveal className="value" key={v.title} delay={i * 0.08}>
                <span className="index teal">{String(i + 1).padStart(2, "0")}</span>
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <Reveal className="media media--wide media--mono media--wipe">
            <img src={images.laptopCharts} alt="" loading="lazy" />
          </Reveal>
          <Reveal delay={0.1}>
            <span className="eyebrow">Why APEX</span>
            <h2 className="h2" style={{ margin: "20px 0 24px" }}>
              Healthcare consulting discipline, modern operations.
            </h2>
            <p className="lead">
              We bring the rigor of a consulting engagement to everyday billing work: clear scopes, defined owners,
              measurable activity and regular reporting. The result is a revenue cycle that is easier to understand and
              easier to trust.
            </p>
          </Reveal>
        </div>
      </section>

      <CTA />
    </>
  );
}
