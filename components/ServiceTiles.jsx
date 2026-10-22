import { ArrowUpRight } from "lucide-react";
import { services } from "@/lib/data";
import Icon from "./Icon";
import Reveal from "./Reveal";

// Highlighted grid of the core services, each jumping to its detail block.
export default function ServiceTiles({ base = "" }) {
  return (
    <nav className="service-tiles" aria-label="Our services">
      {services.map((s, i) => (
        <Reveal as="a" key={s.slug} href={`${base}#${s.slug}`} className="service-tile" delay={i * 0.06}>
          <span className="service-tile__top">
            <span className="service-tile__icon">
              <Icon name={s.icon} size={22} />
            </span>
            <span className="index">{String(i + 1).padStart(2, "0")}</span>
          </span>
          <strong>{s.title}</strong>
          <span className="service-tile__text">{s.short}</span>
          <span className="service-tile__go" aria-hidden="true">
            <ArrowUpRight size={16} />
          </span>
        </Reveal>
      ))}
    </nav>
  );
}
