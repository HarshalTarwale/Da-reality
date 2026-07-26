import SectionHeading from "@/components/SectionHeading";
import { faqs } from "@/lib/data";

export default function Faq() {
  return (
    <section id="faq" className="bg-muted py-24">
      <div className="mx-auto max-w-3xl px-6 lg:px-12">
        <SectionHeading eyebrow="Questions & Answers" title="Frequently Asked Questions" align="center" />
        <div className="mt-14 space-y-4">
          {faqs.map((faq, i) => (
            <details
              key={faq.q}
              className="group rounded-2xl border border-stone bg-white px-6 py-5 open:pb-6"
              open={i === 0}
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-heading text-lg font-medium text-onyx">
                {faq.q}
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-stone text-onyx">
                  <span className="hidden group-open:inline">−</span>
                  <span className="group-open:hidden">+</span>
                </span>
              </summary>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
