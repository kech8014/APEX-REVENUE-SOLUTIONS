"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, X } from "lucide-react";
import { services } from "@/lib/data";
import Icon from "./Icon";

// Quick-view of the core services that slides in shortly after the homepage
// loads. Dismissing it keeps it closed for the rest of the visit.
export default function ServicesPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let dismissed = false;
    try {
      dismissed = sessionStorage.getItem("apex-services-popup") === "closed";
    } catch {}
    if (dismissed) return;
    const t = setTimeout(() => setOpen(true), 2200);
    return () => clearTimeout(t);
  }, []);

  const close = () => {
    setOpen(false);
    try {
      sessionStorage.setItem("apex-services-popup", "closed");
    } catch {}
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <aside className={`svc-pop${open ? " is-open" : ""}`} aria-label="Our services" aria-hidden={!open}>
      <div className="svc-pop__head">
        <div>
          <span className="eyebrow">What we handle</span>
          <strong>Our core services</strong>
        </div>
        <button type="button" className="svc-pop__close" onClick={close} aria-label="Close" tabIndex={open ? 0 : -1}>
          <X size={16} aria-hidden="true" />
        </button>
      </div>
      <ul>
        {services.map((s, i) => (
          <li key={s.slug} style={{ "--i": i }}>
            <Link href={`/services#${s.slug}`} onClick={close} tabIndex={open ? 0 : -1}>
              <span className="svc-pop__icon">
                <Icon name={s.icon} size={16} />
              </span>
              {s.title}
            </Link>
          </li>
        ))}
      </ul>
      <Link href="/contact" className="btn btn--block" onClick={close} tabIndex={open ? 0 : -1}>
        Schedule a Consultation <ArrowRight size={16} aria-hidden="true" />
      </Link>
    </aside>
  );
}
