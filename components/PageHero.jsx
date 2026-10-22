import Link from "next/link";
import Reveal from "./Reveal";
import SplitText from "./SplitText";

export default function PageHero({ eyebrow, title, lead, image, crumb }) {
  return (
    <section className="page-hero">
      {image && (
        <div className="page-hero__media">
          <img src={image} alt="" fetchPriority="high" data-parallax="0.12" />
        </div>
      )}
      <div className="container page-hero__inner">
        <Reveal>
          <span className="eyebrow">{eyebrow}</span>
        </Reveal>
        <SplitText lines={[title]} baseDelay={0.1} />
        {lead && (
          <Reveal delay={0.3}>
            <p className="lead">{lead}</p>
          </Reveal>
        )}
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{crumb}</span>
        </nav>
      </div>
    </section>
  );
}
