export type ContactFormValues = {
  fullName: string;
  subject: string;
  email: string;
  message: string;
};

export type ContactFieldErrors = Partial<
  Record<keyof ContactFormValues, string>
>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContactForm(
  values: ContactFormValues,
): ContactFieldErrors {
  const errors: ContactFieldErrors = {};

  const name = values.fullName.trim();
  if (name.length < 3) {
    errors.fullName = "Full name must be at least 3 characters.";
  }

  const subject = values.subject.trim();
  if (subject.length < 3) {
    errors.subject = "Subject must be at least 3 characters.";
  }

  const email = values.email.trim();
  if (!email) {
    errors.email = "Email is required.";
  } else if (!EMAIL_RE.test(email)) {
    errors.email = "Enter a valid email address.";
  }

  const message = values.message.trim();
  if (message.length < 10) {
    errors.message = "Message must be at least 10 characters.";
  }

  return errors;
}

export function isContactFormValid(errors: ContactFieldErrors): boolean {
  return Object.keys(errors).length === 0;
}
