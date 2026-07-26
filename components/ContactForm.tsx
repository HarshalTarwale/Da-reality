"use client";

import { useState } from "react";
import { propertyTypes, budgetRanges, neighborhoods } from "@/lib/data";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-3xl bg-muted p-10">
        <h3 className="font-heading text-xl font-medium text-onyx">
          Thank you.
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Your enquiry has been received. A member of our advisory team will
          be in touch shortly to arrange a private consultation.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-3xl bg-muted p-8 sm:p-10">
      <p className="font-heading text-2xl leading-relaxed text-onyx">
        I am looking for a{" "}
        <select
          required
          defaultValue=""
          className="border-b border-onyx/30 bg-transparent px-1 font-heading text-2xl text-onyx focus:outline-none"
        >
          <option value="" disabled>
            property type
          </option>
          {propertyTypes.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>{" "}
        in{" "}
        <select
          required
          defaultValue=""
          className="border-b border-onyx/30 bg-transparent px-1 font-heading text-2xl text-onyx focus:outline-none"
        >
          <option value="" disabled>
            an area
          </option>
          {neighborhoods.map((n) => (
            <option key={n.name} value={n.name}>
              {n.name}
            </option>
          ))}
        </select>{" "}
        with a budget of{" "}
        <select
          required
          defaultValue=""
          className="border-b border-onyx/30 bg-transparent px-1 font-heading text-2xl text-onyx focus:outline-none"
        >
          <option value="" disabled>
            price range
          </option>
          {budgetRanges.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
        .
      </p>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label className="text-xs uppercase tracking-widest-luxe text-muted-foreground">
            My Name Is
          </label>
          <input
            type="text"
            required
            placeholder="Full name"
            className="mt-2 w-full border-b border-stone bg-transparent py-2 text-sm text-onyx placeholder:text-muted-foreground/60 focus:border-onyx focus:outline-none"
          />
        </div>
        <div>
          <label className="text-xs uppercase tracking-widest-luxe text-muted-foreground">
            Reach Me At
          </label>
          <input
            type="email"
            required
            placeholder="Email address"
            className="mt-2 w-full border-b border-stone bg-transparent py-2 text-sm text-onyx placeholder:text-muted-foreground/60 focus:border-onyx focus:outline-none"
          />
        </div>
        <div>
          <label className="text-xs uppercase tracking-widest-luxe text-muted-foreground">
            Phone
          </label>
          <input
            type="tel"
            placeholder="+971 ..."
            className="mt-2 w-full border-b border-stone bg-transparent py-2 text-sm text-onyx placeholder:text-muted-foreground/60 focus:border-onyx focus:outline-none"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="text-xs uppercase tracking-widest-luxe text-muted-foreground">
            Additional Details (Optional)
          </label>
          <textarea
            rows={3}
            placeholder="Tell us about your ideal property..."
            className="mt-2 w-full border-b border-stone bg-transparent py-2 text-sm text-onyx placeholder:text-muted-foreground/60 focus:border-onyx focus:outline-none"
          />
        </div>
      </div>

      <button
        type="submit"
        className="mt-10 w-full rounded-full bg-onyx px-10 py-4 text-sm font-medium uppercase tracking-widest-luxe text-alabaster transition-colors hover:bg-onyx/85"
      >
        Request Private Viewing
      </button>
    </form>
  );
}
