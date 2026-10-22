"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowRight, ArrowUpRight, Mail, MapPin, Menu, Phone, X } from "lucide-react";
import { contact, nav } from "@/lib/data";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href) => (href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`));

  return (
    <>
      <header className={`header${scrolled ? " is-scrolled" : ""}`}>
        <div className="container header__inner">
          <Link href="/" className="header__logo" aria-label="APEX REVENUE SOLUTIONS — Home">
            <img src="/brand/apex-logo.png" alt="APEX REVENUE SOLUTIONS" width="987" height="337" />
          </Link>

          <nav className="header__nav" aria-label="Primary">
            {nav.map((item) => (
              <Link key={item.href} href={item.href} aria-current={isActive(item.href) ? "page" : undefined}>
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="header__actions">
            <Link href="/contact" className="btn header__cta">
              Schedule a Consultation <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <button
              type="button"
              className="menu-toggle"
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      <div className={`nav-backdrop${open ? " is-open" : ""}`} onClick={() => setOpen(false)} aria-hidden="true" />
      <nav id="mobile-nav" className={`mobile-nav${open ? " is-open" : ""}`} aria-label="Mobile" aria-hidden={!open}>
        <div className="mobile-nav__head">
          <img src="/brand/apex-logo.png" alt="" width="987" height="337" />
          <button
            type="button"
            className="menu-toggle"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            tabIndex={open ? 0 : -1}
          >
            <X size={20} />
          </button>
        </div>
        <div className="mobile-nav__links">
          {nav.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              className="mobile-nav__link"
              aria-current={isActive(item.href) ? "page" : undefined}
              tabIndex={open ? 0 : -1}
              style={{ "--i": i }}
            >
              <span>
                <small>{String(i + 1).padStart(2, "0")}</small>
                {item.label}
              </span>
              <ArrowUpRight size={20} aria-hidden="true" />
            </Link>
          ))}
        </div>
        <div className="mobile-nav__foot">
          <Link href="/contact" className="btn btn--block" tabIndex={open ? 0 : -1}>
            Schedule a Consultation <ArrowRight size={16} aria-hidden="true" />
          </Link>
          <a href={contact.phoneHref} tabIndex={open ? 0 : -1}>
            <Phone size={16} aria-hidden="true" /> {contact.phone}
          </a>
          <a href={`mailto:${contact.email}`} tabIndex={open ? 0 : -1}>
            <Mail size={16} aria-hidden="true" /> {contact.email}
          </a>
          <a href={contact.mapHref} target="_blank" rel="noopener noreferrer" tabIndex={open ? 0 : -1}>
            <MapPin size={16} aria-hidden="true" /> {contact.address}
          </a>
        </div>
      </nav>
    </>
  );
}
