import { ChevronRight } from "lucide-react";
import { faqs } from "@/lib/site-config";

type Props = {
  preview?: boolean;
};

export function FAQSection({ preview = false }: Props) {
  const visibleFaqs = preview ? faqs.slice(0, 5) : faqs;

  return (
    <section className="scroll-mt-28 bg-white py-20" id="faq">
      <div className="section-shell max-w-5xl">
        <div className="text-center">
          <h2 className="text-3xl font-black text-brand-950 sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-slate-600">
            Everything you need to know about renting storage online.
          </p>
        </div>
        <div className="mt-10 divide-y">
          {visibleFaqs.map((faq, index) => (
            <details className="group py-6" key={faq.question} open={index === 1}>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-lg font-black text-brand-950">
                <span>{faq.question}</span>
                <ChevronRight
                  className="h-5 w-5 flex-none transition-transform group-open:rotate-90"
                  aria-hidden="true"
                />
              </summary>
              <p className="mt-4 max-w-3xl leading-7 text-slate-600">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
