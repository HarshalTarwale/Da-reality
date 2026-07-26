"use client";

import { useState } from "react";

export type FaqItem = { q: string; a: string };

export default function FAQAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-4">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={item.q} className="rounded-2xl border border-stone bg-white px-6 py-5">
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full cursor-pointer list-none items-center justify-between gap-4 text-left font-heading text-lg font-medium text-onyx"
            >
              {item.q}
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-stone text-onyx">
                {isOpen ? "−" : "+"}
              </span>
            </button>
            <div
              className="grid transition-all duration-300 ease-in-out"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <p className="pt-4 text-sm leading-relaxed text-muted-foreground">{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
