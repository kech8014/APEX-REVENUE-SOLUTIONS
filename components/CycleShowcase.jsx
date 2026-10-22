"use client";

import { useEffect, useRef, useState } from "react";
import { cycleStages, videos } from "@/lib/data";
import LazyVideo from "./LazyVideo";

const DURATION = 7000;

// Tabbed walk-through of the revenue cycle. Each stage swaps in its own clip;
// stages auto-advance until the visitor hovers, focuses or picks one.
export default function CycleShowcase() {
  const [active, setActive] = useState(0);
  const [held, setHeld] = useState(false);
  const [cycle, setCycle] = useState(0);
  const timer = useRef(null);

  useEffect(() => {
    if (held || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    timer.current = setTimeout(() => {
      setActive((a) => (a + 1) % cycleStages.length);
      setCycle((c) => c + 1);
    }, DURATION);
    return () => clearTimeout(timer.current);
  }, [active, held, cycle]);

  const select = (i) => {
    setActive(i);
    setCycle((c) => c + 1);
  };

  const onKeyDown = (e) => {
    const dir = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key];
    if (!dir) return;
    e.preventDefault();
    const next = (active + dir + cycleStages.length) % cycleStages.length;
    select(next);
    document.getElementById(`cycle-tab-${next}`)?.focus();
  };

  return (
    <div
      className={`cycle${held ? " is-held" : ""}`}
      onMouseEnter={() => setHeld(true)}
      onMouseLeave={() => setHeld(false)}
      onFocus={() => setHeld(true)}
      onBlur={() => setHeld(false)}
    >
      <div className="cycle__tabs" role="tablist" aria-label="Revenue cycle stages" onKeyDown={onKeyDown}>
        {cycleStages.map((s, i) => (
          <button
            key={s.title}
            id={`cycle-tab-${i}`}
            type="button"
            role="tab"
            aria-selected={active === i}
            aria-controls="cycle-panel"
            tabIndex={active === i ? 0 : -1}
            className={`cycle__tab${active === i ? " is-active" : ""}`}
            onClick={() => select(i)}
          >
            <span className="index">{String(i + 1).padStart(2, "0")}</span>
            <span className="cycle__tab-body">
              <span className="cycle__tab-title">{s.title}</span>
              <span className="cycle__tab-text">
                <span>{s.text}</span>
              </span>
            </span>
            <span className="cycle__bar" aria-hidden="true">
              {active === i && <i key={cycle} style={{ animationDuration: `${DURATION}ms` }} />}
            </span>
          </button>
        ))}
      </div>

      <div className="cycle__stage" id="cycle-panel" role="tabpanel" aria-labelledby={`cycle-tab-${active}`}>
        {cycleStages.map((s, i) => (
          <div key={s.title} className={`cycle__video${active === i ? " is-active" : ""}`}>
            <LazyVideo {...videos[s.video]} active={active === i} />
          </div>
        ))}
        <div className="cycle__caption">
          <span className="index">
            {String(active + 1).padStart(2, "0")} / {String(cycleStages.length).padStart(2, "0")}
          </span>
          <strong key={active}>{cycleStages[active].title}</strong>
        </div>
      </div>
    </div>
  );
}
