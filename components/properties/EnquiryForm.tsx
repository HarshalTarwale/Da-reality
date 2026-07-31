"use client";

import { useState } from "react";
import PhoneInput from "@/components/PhoneInput";
import { formatAed } from "@/lib/types";

const labelClasses = "text-xs uppercase tracking-widest-luxe text-muted-foreground";
const inputClasses =
  "mt-2 w-full border-b border-stone bg-transparent py-2 text-sm text-onyx placeholder:text-muted-foreground/60 focus:border-onyx focus:outline-none";

export default function EnquiryForm({
  propertyTitle,
  price,
}: {
  propertyTitle: string;
  /** null when the developer has not published pricing. */
  price: number | null;
}) {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="rounded-3xl bg-muted p-6 sm:p-8">
      <p className="text-xs uppercase tracking-widest-luxe text-muted-foreground">
        {price === null ? "Pricing" : "Starting From"}
      </p>
      <p className="mt-1 font-heading text-2xl font-medium text-gold-dark">
        {price === null ? "On request" : formatAed(price)}
      </p>

      {submitted ? (
        <div className="mt-6">
          <h3 className="font-heading text-lg font-medium text-onyx">Thank you.</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Your enquiry has been received. A member of our advisory team will be in touch
            shortly.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <div>
            <label className={labelClasses}>Name</label>
            <input type="text" required placeholder="Full name" className={inputClasses} />
          </div>
          <div>
            <label className={labelClasses}>Phone</label>
            <div className="mt-2">
              <PhoneInput name="phone" variant="underline" required />
            </div>
          </div>
          <div>
            <label className={labelClasses}>Email</label>
            <input type="email" required placeholder="Email address" className={inputClasses} />
          </div>
          <div>
            <label className={labelClasses}>Message</label>
            <textarea
              rows={4}
              defaultValue={`I'm interested in ${propertyTitle}`}
              className={inputClasses}
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-lg bg-gold px-6 py-3.5 text-center text-sm font-medium uppercase tracking-widest-luxe text-onyx transition-colors hover:bg-gold-dark"
          >
            Send Enquiry
          </button>
        </form>
      )}
    </div>
  );
}
