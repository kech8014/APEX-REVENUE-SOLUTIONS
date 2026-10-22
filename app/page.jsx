import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { audiences, faqs, images, pillars, process, services, videos } from "@/lib/data";
import Reveal from "@/components/Reveal";
import SplitText from "@/components/SplitText";
import SectionHead from "@/components/SectionHead";
import LazyVideo from "@/components/LazyVideo";
import CycleShowcase from "@/components/CycleShowcase";
import VideoCard from "@/components/VideoCard";
import HeroDock from "@/components/HeroDock";
import DashboardMock from "@/components/DashboardMock";
import FaqList from "@/components/FaqList";
import CTA from "@/components/CTA";

const heroPoints = [
  { title: "Clean claims, first time", text: "Front-end verification and payer-specific scrubbing." },
  { title: "Denials worked to resolution", text: "Correct, appeal and fix the root cause." },
  { title: "Reporting you can read", text: "Clear monthly visibility into every stage." },
];

const stripItems = [
  "Medical Billing",
  "Claims Management",
  "Eligibility Verification",
  "Denial Management",
  "A/R Follow-Up",
  "Payment Reconciliation",
  "Revenue Cycle Reporting",
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="hero__grid-bg" aria-hidden="true" />
        <div className="container hero__inner">
          <div className="hero__rail" aria-hidden="true">
            <span>Revenue Cycle Partner</span>
            <i className="rail-line" />
            <span>Scroll</span>
          </div>

          <div className="hero__main">
            <Reveal>
              <span className="eyebrow">Healthcare Revenue Cycle Management</span>
            </Reveal>
            <SplitText
              className="display hero__title"
              lines={["Get paid fully", "for the care", <em key="em">you deliver</em>]}
            />
            <Reveal delay={0.4}>
              <p className="hero__lead">
                APEX REVENUE SOLUTIONS manages medical billing and the full revenue cycle for physicians, independent
                practices and healthcare organizations — with dedicated people, disciplined process and clear
                reporting.
              </p>
            </Reveal>
            <Reveal delay={0.5} className="hero__actions">
              <Link href="/contact" className="btn">
                <span>
                  <span className="hide-sm">Schedule a </span>Consultation
                </span>{" "}
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <Link href="/services" className="btn btn--ghost">
                <span>
                  <span className="hide-sm">Explore Our </span>Services
                </span>
              </Link>
            </Reveal>
            <a href="#intro" className="hero__scroll">
              <span className="dot">
                <ArrowDown size={14} aria-hidden="true" />
              </span>
              Scroll to explore
            </a>
          </div>

          <div className="hero__visual">
            <div className="hero__ring" aria-hidden="true" />
            <div className="hero__media">
              <LazyVideo {...videos.hero} data-parallax="0.08" controls />
              <span className="hero__tag" aria-hidden="true">
                People · Process · Technology
              </span>
              <HeroDock points={heroPoints} />
            </div>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div className="strip" aria-hidden="true">
        <div className="strip__track">
          {[...stripItems, ...stripItems].map((s, i) => (
            <span className="strip__item" key={i}>
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* Intro / pillars */}
      <section className="section" id="intro">
        <div className="container">
          <SectionHead eyebrow="Our approach" title="People, process and technology — working for your revenue.">
            Billing problems are rarely about one claim. They come from gaps between the front desk, the billing team
            and the payer. We close those gaps with a structured, transparent approach built around four principles.
          </SectionHead>
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

      {/* Revenue cycle in motion */}
      <section className="section section--tight cycle-section">
        <div className="container">
          <SectionHead eyebrow="The revenue cycle, in motion" title="Every stage, handled with care.">
            From the front desk to the final report, see how APEX supports each step of getting your practice paid.
            Select a stage to explore.
          </SectionHead>
          <Reveal>
            <CycleShowcase />
          </Reveal>
        </div>
      </section>

      {/* Services */}
      <section className="section section--gray">
        <div className="container">
          <SectionHead eyebrow="Services" title="Complete revenue cycle support, from eligibility to reporting.">
            Engage us for your entire revenue cycle or for the specific functions where your team needs support.
          </SectionHead>
          <div className="service-list">
            {services.map((s, i) => (
              <Reveal key={s.slug} delay={i * 0.04}>
                <Link href={`/services#${s.slug}`} className="service-row">
                  <span className="index">{String(i + 1).padStart(2, "0")}</span>
                  <h3>{s.title}</h3>
                  <p>{s.short}</p>
                  <span className="service-row__arrow" aria-hidden="true">
                    <ArrowRight size={18} />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
          <div className="mt-lg">
            <Link href="/services" className="btn btn--ghost">
              View all services <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* Reporting / visibility */}
      <section className="section">
        <div className="container split">
          <Reveal>
            <span className="eyebrow">Visibility</span>
            <h2 className="h2" style={{ margin: "20px 0 24px" }}>
              Know exactly where your revenue stands.
            </h2>
            <p className="lead">
              Every engagement includes scheduled reporting on charges, collections, A/R aging, denials and payer
              performance — with plain-language commentary on what changed and what we are doing about it.
            </p>
            <ul className="check-list">
              {[
                "Monthly performance reports and review calls",
                "A/R aging by payer and timely-filing risk",
                "Denial trends with root-cause notes",
                "A named account lead for every question",
              ].map((t) => (
                <li key={t}>
                  <Check size={18} aria-hidden="true" />
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.12}>
            <DashboardMock />
          </Reveal>
        </div>
      </section>

      {/* Process */}
      <section className="section section--navy">
        <div className="container">
          <SectionHead eyebrow="How we work" title="A clear path from first call to steady results.">
            A structured onboarding means no disruption to your practice and no surprises about what happens next.
          </SectionHead>
          <div className="steps">
            {process.map((p, i) => (
              <Reveal className="step" key={p.title} delay={i * 0.08}>
                <span className="index">Step {String(i + 1).padStart(2, "0")}</span>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </Reveal>
            ))}
          </div>
          <div className="mt-lg">
            <Link href="/process" className="btn btn--ghost-light">
              See the full process <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* Who we serve */}
      <section className="section">
        <div className="container">
          <SectionHead eyebrow="Who we serve" title="Built for the way physicians and practices actually work.">
            Whether you are a solo physician or a multi-location group, our services scale to your volume, specialty
            and the systems you already use.
          </SectionHead>
          <div className="cards">
            {audiences.map((a, i) => (
              <Reveal key={a.title} delay={i * 0.08}>
                <VideoCard {...a} image={images[a.image]} video={videos[a.video]} />
              </Reveal>
            ))}
          </div>
          <div className="mt-lg">
            <Link href="/who-we-serve" className="link-arrow">
              Practices and specialties we support <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* About teaser */}
      <section className="section section--gray">
        <div className="container split">
          <Reveal className="media media--tall media--mono media--wipe">
            <LazyVideo {...videos.meeting} />
            <span className="media__tag">
              <span className="index">01</span>About us
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <span className="eyebrow">About APEX</span>
            <h2 className="h2" style={{ margin: "20px 0 24px" }}>
              An extension of your practice — not a black box.
            </h2>
            <p className="lead">
              APEX REVENUE SOLUTIONS exists to give physicians and practice leaders a billing partner they can
              see into. We combine experienced revenue cycle professionals with documented workflows and modern
              tools, so you always know what is happening with your revenue and why.
            </p>
            <div className="mt-lg">
              <Link href="/about" className="link-arrow">
                More about APEX <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="container split split--top">
          <Reveal>
            <span className="eyebrow">FAQ</span>
            <h2 className="h2" style={{ margin: "20px 0 24px" }}>
              Questions practices ask us.
            </h2>
            <p className="lead">Have a question that isn’t covered here? Our team is happy to help.</p>
            <div className="mt-lg">
              <Link href="/faq" className="link-arrow">
                View all questions <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <FaqList items={faqs.slice(0, 5)} />
          </Reveal>
        </div>
      </section>

      <CTA />
    </>
  );
}
