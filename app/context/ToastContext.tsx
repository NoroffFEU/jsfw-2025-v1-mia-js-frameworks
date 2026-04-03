"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

export type ToastVariant = "success" | "danger";

export interface ToastItem {
  id: string;
  message: string;
  variant: ToastVariant;
}

interface ToastContextValue {
  showToast: (message: string, variant?: ToastVariant) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

const toastCardClass: Record<ToastVariant, string> = {
  success:
    "border-2 border-(--border-success) bg-(--bg-success) text-(--text-success)",
  danger:
    "border-2 border-(--border-danger) bg-(--bg-danger) text-(--text-danger)",
};

function ToastHost({ toasts }: { toasts: ToastItem[] }) {
  if (!toasts.length) return null;
  return (
    <div
      className="fixed bottom-4 right-4 z-[1000] flex max-w-sm flex-col gap-2"
      role="region"
      aria-live="polite"
      aria-label="Notifications"
    >
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`px-4 py-3 shadow-lg ${toastCardClass[t.variant]}`}
        >
          {t.message}
        </div>
      ))}
    </div>
  );
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const idRef = useRef(0);

  const showToast = useCallback(
    (message: string, variant: ToastVariant = "success") => {
      idRef.current += 1;
      const id = `toast-${idRef.current}`;
      setToasts((t) => [...t, { id, message, variant }]);
      window.setTimeout(() => {
        setToasts((t) => t.filter((x) => x.id !== id));
      }, 3000);
    },
    [],
  );

  const value = useMemo(() => ({ showToast }), [showToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastHost toasts={toasts} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within a ToastProvider");
  return ctx;
}
