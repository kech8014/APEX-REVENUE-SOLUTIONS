"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

// Site-wide motion: smooth scrolling, scroll progress bar, header direction
// state and scroll-linked parallax for elements marked with data-parallax.
export default function Motion() {
  const barRef = useRef(null);
  const lenisRef = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lenis = reduce ? null : new Lenis({ duration: 1.15, smoothWheel: true, anchors: { offset: -90 } });
    lenisRef.current = lenis;

    let lastY = window.scrollY;
    let raf;

    const tick = (time) => {
      lenis?.raf(time);

      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (barRef.current) barRef.current.style.transform = `scaleX(${max > 0 ? y / max : 0})`;

      const root = document.documentElement;
      if (Math.abs(y - lastY) > 4) {
        root.dataset.scrollDir = y > lastY && y > 240 ? "down" : "up";
        lastY = y;
      }

      if (!reduce) {
        const vh = window.innerHeight;
        document.querySelectorAll("[data-parallax]").forEach((el) => {
          const r = el.getBoundingClientRect();
          if (r.bottom < -200 || r.top > vh + 200) return;
          const speed = parseFloat(el.dataset.parallax) || 0.1;
          const offset = (r.top + r.height / 2 - vh / 2) * speed;
          el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0) scale(1.12)`;
        });
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      lenis?.destroy();
    };
  }, []);

  useEffect(() => {
    if (window.location.hash) return;
    lenisRef.current ? lenisRef.current.scrollTo(0, { immediate: true }) : window.scrollTo(0, 0);
    document.documentElement.dataset.scrollDir = "up";
  }, [pathname]);

  return <div className="scroll-progress" ref={barRef} aria-hidden="true" />;
}
