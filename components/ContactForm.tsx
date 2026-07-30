"use client";

import { useState } from "react";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Errors = {
  firstName?: string;
  lastName?: string;
  email?: string;
};

const fieldLabelClasses =
  "mb-1.5 flex items-center gap-2 text-xs font-medium uppercase tracking-widest-luxe text-muted-foreground";

function fieldClasses(hasError: boolean) {
  return `w-full rounded-xl border bg-white px-4 py-3.5 text-sm text-onyx placeholder:text-muted-foreground/50 transition-colors focus:outline-none ${
    hasError ? "border-red-400 focus:border-red-400" : "border-stone focus:border-gold"
  }`;
}

function UserIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-3.5 w-3.5">
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20c0-3.9 3.1-7 7-7s7 3.1 7 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-3.5 w-3.5">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-3.5 w-3.5">
      <path d="M4 5c0 8.284 6.716 15 15 15l1-4-5-2-2 2c-2.5-1.2-4.3-3-5.5-5.5l2-2-2-5-4 1Z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MessageIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-3.5 w-3.5">
      <path d="M4 4h16v12H8l-4 4V4Z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Errors>({});

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const firstName = String(formData.get("firstName") ?? "").trim();
    const lastName = String(formData.get("lastName") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();

    const nextErrors: Errors = {};
    if (!firstName) nextErrors.firstName = "Please enter your first name.";
    if (!lastName) nextErrors.lastName = "Please enter your last name.";
    if (!email) {
      nextErrors.email = "Please enter your email.";
    } else if (!EMAIL_PATTERN.test(email)) {
      nextErrors.email = "Please enter a valid email address.";
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) {
      setSubmitted(true);
    }
  }

  if (submitted) {
    return (
      <div className="rounded-3xl border border-stone bg-white p-10 shadow-2xl shadow-onyx/10 sm:p-12">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gold/10 text-gold-dark">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="h-7 w-7">
            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3 className="mt-6 font-heading text-2xl font-medium text-onyx">Thank you.</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Our advisory team will reach out within 2 hours to arrange your private consultation.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-3xl border border-stone bg-white p-8 shadow-2xl shadow-onyx/10 sm:p-10"
    >
      <p className="text-xs font-medium uppercase tracking-widest-luxe text-gold-dark">
        Private Consultation
      </p>
      <h3 className="mt-2 font-heading text-2xl font-medium text-onyx">
        Request a Viewing
      </h3>

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label className={fieldLabelClasses}>
            <UserIcon /> First Name
          </label>
          <input
            type="text"
            name="firstName"
            placeholder="First name"
            aria-invalid={!!errors.firstName}
            className={fieldClasses(!!errors.firstName)}
          />
          {errors.firstName && <p className="mt-1.5 text-xs text-red-500">{errors.firstName}</p>}
        </div>
        <div>
          <label className={fieldLabelClasses}>
            <UserIcon /> Last Name
          </label>
          <input
            type="text"
            name="lastName"
            placeholder="Last name"
            aria-invalid={!!errors.lastName}
            className={fieldClasses(!!errors.lastName)}
          />
          {errors.lastName && <p className="mt-1.5 text-xs text-red-500">{errors.lastName}</p>}
        </div>
        <div>
          <label className={fieldLabelClasses}>
            <MailIcon /> Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="Email address"
            aria-invalid={!!errors.email}
            className={fieldClasses(!!errors.email)}
          />
          {errors.email && <p className="mt-1.5 text-xs text-red-500">{errors.email}</p>}
        </div>
        <div>
          <label className={fieldLabelClasses}>
            <PhoneIcon /> Phone
          </label>
          <input type="tel" name="phone" placeholder="+971 ..." className={fieldClasses(false)} />
        </div>
        <div className="sm:col-span-2">
          <label className={fieldLabelClasses}>
            <MessageIcon /> Message
          </label>
          <textarea
            name="message"
            rows={4}
            placeholder="Tell us about your ideal property..."
            className={`${fieldClasses(false)} resize-none`}
          />
        </div>
      </div>

      <button
        type="submit"
        className="mt-8 w-full rounded-xl bg-onyx px-10 py-4 text-sm font-medium uppercase tracking-widest-luxe text-alabaster transition-colors hover:bg-onyx/85"
      >
        Request Private Viewing
      </button>
      <p className="mt-3 text-center text-xs text-muted-foreground">
        By submitting, you agree to be contacted about your enquiry.
      </p>
    </form>
  );
}
