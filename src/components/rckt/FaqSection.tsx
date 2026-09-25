import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
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
  if (!items || items.length === 0) return null;

  return (
    <section className="system-section system-faq" id="faq" aria-labelledby="faq-title">
      <div className="container">
        <SectionHeader num="FAQ." label="Preguntas frecuentes" title={<span id="faq-title">Lo que nos preguntan.</span>} />
        <div className="system-faq__list mt-8 max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {items.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b border-line py-2">
                <AccordionTrigger className="text-left font-semibold text-lg hover:no-underline py-4">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-carbon-soft text-base leading-relaxed pb-6">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
