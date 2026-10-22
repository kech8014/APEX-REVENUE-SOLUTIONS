import Link from "next/link";
import { contact, nav, services } from "@/lib/data";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer__top">
        <div className="footer__brand">
          <Link href="/" className="footer__logo" aria-label="APEX REVENUE SOLUTIONS — Home">
            <img src="/brand/apex-logo.png" alt="APEX REVENUE SOLUTIONS" width="987" height="337" />
          </Link>
          <p className="footer__tagline">
            People, Process,
            <br />
            Technology, Better Revenue
          </p>
          <p style={{ maxWidth: "38ch" }}>
            Revenue cycle management and medical billing services for physicians, independent practices and
            healthcare organizations.
          </p>
        </div>

        <div>
          <h4>Services</h4>
          <ul>
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/services#${s.slug}`}>{s.title}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4>Company</h4>
          <ul>
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href}>{n.label}</Link>
              </li>
            ))}
            <li>
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </div>

        <div>
          <h4>Contact</h4>
          <ul>
            <li>
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
            </li>
            <li>
              <a href={contact.phoneHref}>{contact.phone}</a>
            </li>
            <li>{contact.hours}</li>
            <li>{contact.location}</li>
          </ul>
        </div>
      </div>

      <div className="container footer__bottom">
        <span>© {year} APEX REVENUE SOLUTIONS. All rights reserved.</span>
        <nav aria-label="Legal">
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/contact">Contact</Link>
        </nav>
      </div>
    </footer>
  );
}
