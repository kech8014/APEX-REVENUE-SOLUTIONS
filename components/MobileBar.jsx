"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CalendarCheck, Mail, Phone } from "lucide-react";
import { contact } from "@/lib/data";

// Sticky quick-action bar shown on phones only, once the visitor scrolls past
// the opening screen so it never covers the hero buttons.
export default function MobileBar() {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`mobile-bar${shown ? " is-shown" : ""}`} aria-label="Quick actions">
      <a href={contact.phoneHref}>
        <Phone size={18} aria-hidden="true" />
        Call
      </a>
      <a href={`mailto:${contact.email}`}>
        <Mail size={18} aria-hidden="true" />
        Email
      </a>
      <Link href="/contact" className="mobile-bar__primary">
        <CalendarCheck size={18} aria-hidden="true" />
        Book a Consultation
      </Link>
    </nav>
  );
}
