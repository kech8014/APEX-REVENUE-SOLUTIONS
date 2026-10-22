import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <section className="section">
      <div className="container">
        <span className="big-number" aria-hidden="true">404</span>
        <h1 className="h2" style={{ margin: "32px 0 16px" }}>
          This page couldn’t be found.
        </h1>
        <p className="lead">The page may have moved. Head back to the homepage or contact our team.</p>
        <div className="hero__actions" style={{ marginTop: 32 }}>
          <Link href="/" className="btn">
            Back to home <ArrowRight size={16} aria-hidden="true" />
          </Link>
          <Link href="/contact" className="btn btn--ghost">
            Contact us
          </Link>
        </div>
      </div>
    </section>
  );
}
