import { audiences, images, specialties } from "@/lib/data";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import SectionHead from "@/components/SectionHead";
import Icon from "@/components/Icon";
import CTA from "@/components/CTA";

export const metadata = {
  title: "Who We Serve",
  description: "Revenue cycle support for independent physicians, medical practices and healthcare organizations.",
};

const challenges = [
  { title: "Rising denials", text: "Payer rules change constantly, and denials that aren’t worked become lost revenue." },
  { title: "Aging receivables", text: "Balances age past timely-filing limits when follow-up is inconsistent." },
  { title: "Staffing gaps", text: "Turnover and leave leave billing work unattended at the worst moments." },
  { title: "Limited visibility", text: "Without clear reporting, it’s hard to know what’s working and what isn’t." },
];

export default function WhoWeServePage() {
  return (
    <>
      <PageHero
        eyebrow="Who we serve"
        title="Support that fits your practice."
        lead="From solo physicians to multi-location groups, we adapt to your specialty, payer mix and the systems you already use."
        image={images.consult}
        crumb="Who We Serve"
      />

      <section className="section">
        <div className="container">
          <div className="cards">
            {audiences.map((a, i) => (
              <Reveal className="card" key={a.title} delay={i * 0.08}>
                <div className="media media--mono">
                  <img src={images[a.image]} alt="" loading="lazy" />
                </div>
                <div className="card__body">
                  <span className="card__icon">
                    <Icon name={a.icon} size={20} />
                  </span>
                  <h3>{a.title}</h3>
                  <p>{a.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--navy">
        <div className="container">
          <SectionHead eyebrow="Common challenges" title="The problems we are brought in to solve.">
            Most practices come to us when billing has become a source of stress instead of a dependable process.
          </SectionHead>
          <div className="values">
            {challenges.map((c, i) => (
              <Reveal className="value" key={c.title} delay={i * 0.08}>
                <span className="index teal">{String(i + 1).padStart(2, "0")}</span>
                <h3>{c.title}</h3>
                <p>{c.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead eyebrow="Specialties" title="Specialty-aware billing.">
            Each specialty has its own coding patterns, payer rules and documentation requirements. Below are examples
            of the practice types we are prepared to support — ask us about yours.
          </SectionHead>
          <Reveal>
            <ul className="tags">
              {specialties.map((s, i) => (
                <li key={s}>
                  {s}
                  <span>{String(i + 1).padStart(2, "0")}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <CTA />
    </>
  );
}
