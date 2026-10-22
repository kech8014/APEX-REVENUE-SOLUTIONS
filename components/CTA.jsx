import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { videos } from "@/lib/data";
import LazyVideo from "./LazyVideo";
import Reveal from "./Reveal";

export default function CTA({
  title = "Let’s take a clear look at your revenue cycle.",
  text = "Schedule a no-obligation consultation. We’ll learn how your practice works today and outline where focused support could help.",
}) {
  return (
    <section className="cta">
      <div className="cta__media">
        <LazyVideo {...videos.handshake} data-parallax="0.15" />
      </div>
      <div className="container cta__inner">
        <Reveal>
          <span className="eyebrow">Next step</span>
          <h2>{title}</h2>
        </Reveal>
        <Reveal className="cta__side" delay={0.1}>
          <p>{text}</p>
          <div className="cta__actions">
            <Link href="/contact" className="btn">
              Schedule a Consultation <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <Link href="/services" className="btn btn--ghost-light">
              Explore Our Services
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
