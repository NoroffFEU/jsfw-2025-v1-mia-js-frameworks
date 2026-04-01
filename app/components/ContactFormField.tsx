import type { ReactNode } from "react";

export const contactInputClass =
  "mt-1 w-full rounded-md border border-[var(--border)] bg-[var(--bg-card)] px-3 py-2 text-[var(--text)] outline-none focus:ring-2 focus:ring-[var(--accent-soft)]";

export const contactTextareaClass = `${contactInputClass} resize-y`;

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
        className="block text-sm font-medium text-[var(--text)]"
      >
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1 text-sm text-[var(--sale)]">
          {error}
        </p>
      )}
    </div>
  );
}
