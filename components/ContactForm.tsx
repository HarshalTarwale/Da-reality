"use client";

import { useState } from "react";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Errors = {
  firstName?: string;
  lastName?: string;
  email?: string;
};

const fieldLabelClasses = "text-xs uppercase tracking-widest-luxe text-muted-foreground";

function fieldClasses(hasError: boolean) {
  return `mt-2 w-full border-b bg-transparent py-2 text-sm text-onyx placeholder:text-muted-foreground/60 focus:outline-none ${
    hasError ? "border-red-500 focus:border-red-500" : "border-stone focus:border-onyx"
  }`;
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
      <div className="rounded-3xl bg-white p-10 shadow-2xl shadow-onyx/20">
        <h3 className="font-heading text-xl font-medium text-onyx">Thank you.</h3>
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
      className="rounded-3xl bg-white p-8 shadow-2xl shadow-onyx/20 sm:p-10"
    >
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label className={fieldLabelClasses}>First Name</label>
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
          <label className={fieldLabelClasses}>Last Name</label>
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
          <label className={fieldLabelClasses}>Email</label>
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
          <label className={fieldLabelClasses}>Phone</label>
          <input
            type="tel"
            name="phone"
            placeholder="+971 ..."
            className={fieldClasses(false)}
          />
        </div>
        <div className="sm:col-span-2">
          <label className={fieldLabelClasses}>Message</label>
          <textarea
            name="message"
            rows={4}
            placeholder="Tell us about your ideal property..."
            className={fieldClasses(false)}
          />
        </div>
      </div>

      <button
        type="submit"
        className="mt-10 w-full rounded-full bg-onyx px-10 py-4 text-sm font-medium uppercase tracking-widest-luxe text-alabaster transition-colors hover:bg-onyx/85"
      >
        Request Private Viewing
      </button>
      <p className="mt-3 text-center text-xs text-muted-foreground">
        By submitting, you agree to be contacted about your enquiry.
      </p>
    </form>
  );
}
