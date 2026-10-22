import { Plus } from "lucide-react";

export default function FaqList({ items }) {
  return (
    <div className="faq">
      {items.map((item, i) => (
        <details key={item.q}>
          <summary>
            <span>
              <span className="faq__num">{String(i + 1).padStart(2, "0")}</span>
              {item.q}
            </span>
            <span className="faq__icon" aria-hidden="true">
              <Plus size={18} />
            </span>
          </summary>
          <p className="faq__answer">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
