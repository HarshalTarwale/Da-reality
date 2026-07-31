"use client";

import { useState } from "react";
import { countryCodes, defaultCountryIso } from "@/lib/country-codes";

function ChevronDownIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      className="pointer-events-none h-3.5 w-3.5"
    >
      <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * Phone field with a country dialling-code selector.
 *
 * Submits two values so the server gets both parts unambiguously:
 *   - `${name}CountryCode` — e.g. "+971"
 *   - `${name}`            — the local number as typed
 */
export default function PhoneInput({
  name = "phone",
  required = false,
  variant = "boxed",
  hasError = false,
}: {
  name?: string;
  required?: boolean;
  /** "boxed" matches ContactForm's bordered fields; "underline" matches EnquiryForm. */
  variant?: "boxed" | "underline";
  hasError?: boolean;
}) {
  const [iso, setIso] = useState(defaultCountryIso);
  const selected = countryCodes.find((c) => c.iso === iso) ?? countryCodes[0];

  const boxed = variant === "boxed";

  // Shared shell so the code selector and the number field read as one control.
  const shellClasses = boxed
    ? `flex items-stretch overflow-hidden rounded-xl border bg-white transition-colors focus-within:border-gold ${
        hasError ? "border-red-400 focus-within:border-red-400" : "border-stone"
      }`
    : `flex items-stretch border-b bg-transparent transition-colors focus-within:border-onyx ${
        hasError ? "border-red-400" : "border-stone"
      }`;

  const triggerClasses = boxed
    ? "flex h-full items-center gap-1 border-r border-stone px-4 text-sm text-onyx"
    : "flex h-full items-center gap-1 border-r border-stone pr-3 text-sm text-onyx";

  const numberClasses = boxed
    ? "w-full bg-transparent px-4 py-3.5 text-sm text-onyx placeholder:text-muted-foreground/50 focus:outline-none"
    : "w-full bg-transparent pl-3 py-2 text-sm text-onyx placeholder:text-muted-foreground/60 focus:outline-none";

  return (
    <div className={shellClasses}>
      {/* The native select sits invisibly over the trigger so it stays keyboard
          accessible and uses the platform picker on mobile. */}
      <div className="relative shrink-0">
        <div className={triggerClasses} aria-hidden="true">
          <span className="tabular-nums font-medium">{selected.dial}</span>
          <span className="text-muted-foreground">
            <ChevronDownIcon />
          </span>
        </div>
        <select
          aria-label="Country dialling code"
          value={iso}
          onChange={(e) => setIso(e.target.value)}
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
        >
          {countryCodes.map((c) => (
            <option key={c.iso} value={c.iso}>
              {c.dial} — {c.name}
            </option>
          ))}
        </select>
      </div>

      <input type="hidden" name={`${name}CountryCode`} value={selected.dial} />
      <input
        type="tel"
        name={name}
        required={required}
        inputMode="tel"
        autoComplete="tel-national"
        placeholder="50 123 4567"
        aria-invalid={hasError}
        className={numberClasses}
      />
    </div>
  );
}
