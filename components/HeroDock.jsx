"use client";

import { useState } from "react";
import { ChevronUp, X } from "lucide-react";

// Highlights docked inside the bottom of the hero video. Visitors can
// collapse it to see the footage, and reopen it from a small tab.
export default function HeroDock({ points }) {
  const [open, setOpen] = useState(true);

  return (
    <aside className={`hero-dock${open ? "" : " is-closed"}`} aria-label="Highlights">
      <div className="hero-dock__panel" aria-hidden={!open}>
        <ul>
          {points.map((p, i) => (
            <li key={p.title}>
              <span className="index">{String(i + 1).padStart(2, "0")}</span>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </li>
          ))}
        </ul>
        <button
          type="button"
          className="hero-dock__close"
          onClick={() => setOpen(false)}
          aria-label="Hide highlights"
          tabIndex={open ? 0 : -1}
        >
          <X size={14} aria-hidden="true" />
        </button>
      </div>
      <button
        type="button"
        className="hero-dock__open"
        onClick={() => setOpen(true)}
        aria-label="Show highlights"
        tabIndex={open ? -1 : 0}
      >
        <ChevronUp size={14} aria-hidden="true" />
        Highlights
      </button>
    </aside>
  );
}
