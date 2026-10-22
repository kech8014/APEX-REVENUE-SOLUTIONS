"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowRight, ArrowUpRight, Menu, X } from "lucide-react";
import { nav } from "@/lib/data";

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

  const isActive = (href) => pathname === href || pathname.startsWith(`${href}/`);

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

      <nav id="mobile-nav" className={`mobile-nav${open ? " is-open" : ""}`} aria-label="Mobile" aria-hidden={!open}>
        {nav.map((item) => (
          <Link key={item.href} href={item.href} className="mobile-nav__link" tabIndex={open ? 0 : -1}>
            {item.label} <ArrowUpRight size={22} aria-hidden="true" />
          </Link>
        ))}
        <Link href="/contact" className="btn btn--block" tabIndex={open ? 0 : -1}>
          Schedule a Consultation <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </nav>
    </>
  );
}
