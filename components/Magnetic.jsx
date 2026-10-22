"use client";

import { useEffect } from "react";

// Primary buttons drift slightly toward the pointer for a tactile feel.
export default function Magnetic() {
  useEffect(() => {
    if (window.matchMedia("(hover: none), (prefers-reduced-motion: reduce)").matches) return;
    let current = null;

    const onMove = (e) => {
      const el = e.target.closest?.(".btn");
      if (current && current !== el) {
        current.style.translate = "";
        current = null;
      }
      if (!el) return;
      current = el;
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) * 0.18;
      const y = (e.clientY - r.top - r.height / 2) * 0.3;
      el.style.translate = `${x.toFixed(1)}px ${y.toFixed(1)}px`;
    };
    const onLeave = () => {
      if (current) current.style.translate = "";
      current = null;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return null;
}
