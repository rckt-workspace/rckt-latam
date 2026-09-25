import { useId, useState } from "react";
import SectionHeader from "@/components/rckt/SectionHeader";

export type FaqItem = { question: string; answer: string };

export function faqJsonLd(items: FaqItem[]) {
  return {
    type: "application/ld+json",
    children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: items.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    }),
  };
}

export default function FaqSection({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const baseId = useId();
  if (items.length === 0) return null;
  return (
    <section className="system-section system-faq" id="faq">
      <div className="container">
        <SectionHeader num="FAQ." label="Preguntas frecuentes" title="Lo que nos preguntan." />
        <div className="system-faq__list">
          {items.map((item, index) => {
            const open = openIndex === index;
            const trigger = `${baseId}-trigger-${index}`;
            const panel = `${baseId}-panel-${index}`;
            return (
              <div className="system-faq__item" key={item.question}>
                <button id={trigger} type="button" aria-expanded={open} aria-controls={panel} onClick={() => setOpenIndex(open ? null : index)}>
                  <span>{item.question}</span><span aria-hidden="true">{open ? "−" : "+"}</span>
                </button>
                <div id={panel} role="region" aria-labelledby={trigger} hidden={!open}><p>{item.answer}</p></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}