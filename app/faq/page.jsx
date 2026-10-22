import { faqs, images } from "@/lib/data";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import FaqList from "@/components/FaqList";
import CTA from "@/components/CTA";

export const metadata = {
  title: "Frequently Asked Questions",
  description: "Answers to common questions about working with APEX REVENUE SOLUTIONS.",
};

export default function FaqPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHero
        eyebrow="FAQ"
        title="Questions, answered."
        lead="What practices most often ask before partnering with APEX REVENUE SOLUTIONS."
        image={images.physicianTablet}
        crumb="FAQ"
      />
      <section className="section">
        <div className="container" style={{ maxWidth: 1040 }}>
          <Reveal>
            <FaqList items={faqs} />
          </Reveal>
        </div>
      </section>
      <CTA title="Still have questions?" text="Talk with our team directly. We’ll answer your questions and explain how we would approach your practice." />
    </>
  );
}
