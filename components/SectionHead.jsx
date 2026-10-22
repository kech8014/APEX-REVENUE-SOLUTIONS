import Reveal from "./Reveal";

export default function SectionHead({ eyebrow, title, children, variant }) {
  return (
    <div className={`section-head${variant ? ` section-head--${variant}` : ""}`}>
      <Reveal>
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h2 className="h2">{title}</h2>
      </Reveal>
      {children && (
        <Reveal delay={0.1}>
          <div className="lead">{children}</div>
        </Reveal>
      )}
    </div>
  );
}
