"use client";

import { useState } from "react";
import EnquiryForm from "@/components/properties/EnquiryForm";
import { formatAed } from "@/lib/types";

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="h-5 w-5">
      <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function MobileEnquiryBar({
  propertyTitle,
  price,
}: {
  propertyTitle: string;
  /** null when the developer has not published pricing. */
  price: number | null;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-stone bg-white px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          <p className="font-heading text-base font-medium text-onyx">
            {price === null ? "Price on request" : formatAed(price)}
          </p>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="rounded-lg bg-gold px-8 py-3 text-center text-xs font-medium uppercase tracking-widest-luxe text-onyx transition-colors hover:bg-gold-dark"
          >
            Enquire Now
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-onyx/50" onClick={() => setOpen(false)} />
          <div className="absolute inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto rounded-t-3xl bg-white p-6">
            <div className="flex items-center justify-between">
              <h3 className="font-heading text-lg font-medium text-onyx">Enquire Now</h3>
              <button
                type="button"
                aria-label="Close enquiry form"
                onClick={() => setOpen(false)}
                className="text-onyx"
              >
                <CloseIcon />
              </button>
            </div>
            <div className="mt-6">
              <EnquiryForm propertyTitle={propertyTitle} price={price} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
