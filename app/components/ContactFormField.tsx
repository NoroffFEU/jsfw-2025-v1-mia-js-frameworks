import type { ReactNode } from "react";

export const contactInputClass =
  "mt-1 w-full rounded-md border border-(--border) bg-(--bg-card) px-3 py-2 text-(--text) outline-none focus:ring-2 focus:ring-(--accent-soft)";

export const contactFieldErrorUnderlineClass = "border-b-2 border-b-(--sale)";

export function contactInputClassForError(hasError: boolean) {
  return hasError
    ? `${contactInputClass} ${contactFieldErrorUnderlineClass}`
    : contactInputClass;
}

export const contactTextareaClass = `${contactInputClass} resize-y`;

export function contactTextareaClassForError(hasError: boolean) {
  return hasError
    ? `${contactTextareaClass} ${contactFieldErrorUnderlineClass}`
    : contactTextareaClass;
}

export default function ContactFormField({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-(--text)"
      >
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1 text-sm text-(--sale)">
          {error}
        </p>
      )}
    </div>
  );
}
