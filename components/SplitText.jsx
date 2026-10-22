// Splits a headline into masked lines that slide up in sequence on load.
// `lines` is an array of strings or React nodes, one per visual line.
export default function SplitText({ as: Tag = "h1", lines, className = "", baseDelay = 0.15, step = 0.11 }) {
  return (
    <Tag className={`split-text ${className}`}>
      {lines.map((line, i) => (
        <span className="split-text__line" key={i}>
          <span className="split-text__inner" style={{ animationDelay: `${baseDelay + i * step}s` }}>
            {line}
          </span>
        </span>
      ))}
    </Tag>
  );
}
