"use client";

import { useState } from "react";
import {
  validateContactForm,
  isContactFormValid,
  type ContactFormValues,
  type ContactFieldErrors,
} from "@/shared/contactValidation";
import ContactFormField, {
  contactInputClass,
  contactTextareaClass,
} from "@/app/components/ContactFormField";

const initialValues: ContactFormValues = {
  fullName: "",
  subject: "",
  email: "",
  message: "",
};

export default function ContactPage() {
  const [values, setValues] = useState<ContactFormValues>(initialValues);
  const [errors, setErrors] = useState<ContactFieldErrors>({});
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const next = validateContactForm(values);
    setErrors(next);
    if (!isContactFormValid(next)) {
      setSubmitted(false);
      return;
    }
    setSubmitted(true);
    setValues(initialValues);
  }

  function clearFieldError(field: keyof ContactFormValues) {
    setErrors((prev) => {
      const rest = { ...prev };
      delete rest[field];
      return rest;
    });
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1
        className="text-3xl font-bold text-[var(--text)]"
        style={{ fontFamily: "var(--font-bitter), serif" }}
      >
        Contact us
      </h1>
      <p className="text-[var(--text-muted)] mt-2">
        Send us a message and we&apos;ll get back to you.
      </p>

      {submitted && (
        <p
          className="mt-6 rounded-lg border border-[var(--border-success)] bg-[var(--bg-success)] px-4 py-3 text-[var(--text-success)]"
          role="status"
        >
          Thanks — your message has been sent.
        </p>
      )}

      <form onSubmit={handleSubmit} className="mt-8 space-y-6" noValidate>
        <ContactFormField id="fullName" label="Full name" error={errors.fullName}>
          <input
            id="fullName"
            name="fullName"
            type="text"
            autoComplete="name"
            value={values.fullName}
            onChange={(e) => {
              setValues((v) => ({ ...v, fullName: e.target.value }));
              clearFieldError("fullName");
            }}
            aria-invalid={Boolean(errors.fullName)}
            aria-describedby={errors.fullName ? "fullName-error" : undefined}
            className={contactInputClass}
          />
        </ContactFormField>

        <ContactFormField id="subject" label="Subject" error={errors.subject}>
          <input
            id="subject"
            name="subject"
            type="text"
            value={values.subject}
            onChange={(e) => {
              setValues((v) => ({ ...v, subject: e.target.value }));
              clearFieldError("subject");
            }}
            aria-invalid={Boolean(errors.subject)}
            aria-describedby={errors.subject ? "subject-error" : undefined}
            className={contactInputClass}
          />
        </ContactFormField>

        <ContactFormField id="email" label="Email" error={errors.email}>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={(e) => {
              setValues((v) => ({ ...v, email: e.target.value }));
              clearFieldError("email");
            }}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={contactInputClass}
          />
        </ContactFormField>

        <ContactFormField id="message" label="Message" error={errors.message}>
          <textarea
            id="message"
            name="message"
            rows={5}
            value={values.message}
            onChange={(e) => {
              setValues((v) => ({ ...v, message: e.target.value }));
              clearFieldError("message");
            }}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "message-error" : undefined}
            className={contactTextareaClass}
          />
        </ContactFormField>

        <button
          type="submit"
          className="rounded-md bg-[var(--accent)] px-5 py-2.5 font-semibold text-white hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-[var(--accent-soft)]"
        >
          Send message
        </button>
      </form>
    </div>
  );
}
