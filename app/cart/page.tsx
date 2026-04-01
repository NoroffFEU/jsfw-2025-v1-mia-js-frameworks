"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useCart,
  lineSubtotal,
  lineSavings,
  type CartLine,
} from "@/app/context/CartContext";
import { useToast } from "../context/ToastContext";
import { formatKr } from "@/shared/format";

function LinePricing({ line }: { line: CartLine }) {
  const subtotal = lineSubtotal(line);
  const saved = lineSavings(line);
  const list = line.listPrice ?? line.unitPrice;
  const hasDiscount = list > line.unitPrice;

  return (
    <div className="mt-1 space-y-0.5 text-sm">
      <p className="text-[var(--text-muted)]">
        {formatKr(line.unitPrice)} each × {line.quantity}
      </p>
      <p className="font-semibold text-[var(--text)]">
        Line total: {formatKr(subtotal)}
      </p>
      {hasDiscount && (
        <p className="text-[var(--text-muted)]">
          <span className="line-through">{formatKr(list * line.quantity)}</span>
        </p>
      )}
      {saved > 0 && (
        <p className="text-[var(--sale)] font-medium">
          You save {formatKr(saved)} on this item
        </p>
      )}
    </div>
  );
}

export default function CartPage() {
  const { showToast } = useToast();
  const {
    lines,
    setQuantity,
    removeLine,
    clearCart,
    total,
    totalSavings,
    itemCount,
  } = useCart();

  if (!lines.length) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-2xl font-bold text-[var(--text)]">Cart</h1>
        <p className="text-[var(--text-muted)] mt-4">No items in cart.</p>
        <Link
          href="/"
          className="text-[var(--accent)] underline mt-4 inline-block"
        >
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text)]">Cart</h1>
          <p className="text-[var(--text-muted)] text-sm mt-1">
            {itemCount} items
          </p>
        </div>
        <button
          type="button"
          className="shrink-0 rounded border border-[var(--border)] bg-[var(--bg-card)] px-3 py-2 text-sm font-medium text-[var(--text)] transition-colors hover:bg-[var(--border)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--text)]"
          onClick={() => {
            clearCart();
            showToast("Cart emptied");
          }}
        >
          Empty cart
        </button>
      </div>
      <ul className="mt-8 space-y-4">
        {lines.map((line) => (
          <li
            key={line.id}
            className="flex flex-wrap items-start gap-4 border border-[var(--border)] bg-[var(--bg-card)] p-4"
          >
            <Link
              href={`/product/${line.id}`}
              className="group flex min-w-0 flex-1 items-start gap-4 transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--text)]"
            >
              <div className="relative h-24 w-24 shrink-0 overflow-hidden bg-[var(--border)]">
                {line.imageUrl ? (
                  <Image
                    src={line.imageUrl}
                    alt={line.title}
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-xs text-[var(--text-muted)]">
                    No image
                  </div>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-[var(--text)] underline-offset-2 group-hover:underline">
                  {line.title}
                </p>
                <LinePricing line={line} />
              </div>
            </Link>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="min-h-11 min-w-11 rounded border border-[var(--border)] text-[var(--text)] transition-colors hover:bg-[var(--border)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--text)]"
                aria-label="Decrease quantity"
                onClick={() => setQuantity(line.id, line.quantity - 1)}
              >
                −
              </button>
              <span className="min-w-[2ch] text-center tabular-nums">
                {line.quantity}
              </span>
              <button
                type="button"
                className="min-h-11 min-w-11 rounded border border-[var(--border)] text-[var(--text)] transition-colors hover:bg-[var(--border)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--text)]"
                aria-label="Increase quantity"
                onClick={() => setQuantity(line.id, line.quantity + 1)}
              >
                +
              </button>
            </div>
            <button
              type="button"
              className="shrink-0 text-[var(--accent)] underline underline-offset-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--text)]"
              onClick={() => {
                removeLine(line.id);
                showToast(`Removed ${line.title} from cart`);
              }}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      <div className="mt-8 flex flex-col gap-4 border-t border-[var(--border)] pt-8 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between">
        <div className="space-y-1">
          {totalSavings > 0 && (
            <p className="text-lg font-semibold text-[var(--sale)]">
              Total saved: {formatKr(totalSavings)}
            </p>
          )}
          <p className="text-xl font-bold text-[var(--text)]">
            Order total: {formatKr(total)}
          </p>
        </div>
        <Link
          href="/checkout/success"
          className="inline-flex items-center justify-center px-4 py-2 bg-[var(--accent)] text-white font-semibold transition-colors hover:bg-[var(--text)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--text)]"
        >
          Checkout
        </Link>
      </div>
    </div>
  );
}
