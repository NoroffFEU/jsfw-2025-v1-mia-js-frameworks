"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useCart,
  lineSubtotal,
  lineSavings,
  type CartLine,
} from "@/app/context/CartContext";
import { useToast } from "@/app/context/ToastContext";
import { formatKr } from "@/app/components/shared/format";

function LinePricing({ line }: { line: CartLine }) {
  const saved = lineSavings(line);

  return (
    <div className="mt-1 text-sm">
      <div className="space-y-2 sm:hidden">
        <p className="text-(--text-muted)">
          {formatKr(line.unitPrice)} × {line.quantity}
        </p>
        {saved > 0 && (
          <p className="text-center text-xs font-medium text-(--sale)">
            Save {formatKr(saved)}
          </p>
        )}
      </div>

      <div className="hidden sm:block">
        <p className="text-(--text-muted)">
          {formatKr(line.unitPrice)} each × {line.quantity}
        </p>
      </div>
    </div>
  );
}

function CartLineTotals({ line }: { line: CartLine }) {
  const subtotal = lineSubtotal(line);
  const list = line.listPrice ?? line.unitPrice;
  const hasDiscount = list > line.unitPrice;

  return (
    <div className="mt-2 flex w-full flex-col items-end gap-1 text-right sm:mt-3">
      <p className="text-lg font-bold text-(--accent)">
        Total price: {formatKr(subtotal)}
      </p>
      {hasDiscount && (
        <p className="text-sm text-(--text-muted) line-through">
          {formatKr(list * line.quantity)}
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
      <div className="mx-auto max-w-6xl px-4 py-12">
        <h1 className="text-2xl font-bold text-(--text)">Cart</h1>
        <p className="mt-4 text-(--text-muted)">No items in cart.</p>
        <Link href="/" className="mt-4 inline-block text-(--accent) underline">
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-(--text)">Cart</h1>
          <p className="mt-1 text-sm text-(--text-muted)">{itemCount} items</p>
        </div>
        <button
          type="button"
          className="shrink-0 rounded border border-(--border) bg-(--bg-card) px-3 py-2 text-sm font-medium text-(--text) transition-colors hover:bg-(--border) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--text)"
          onClick={() => {
            clearCart();
            showToast("Cart emptied");
          }}
        >
          Empty cart
        </button>
      </div>
      <ul className="mt-8 space-y-4">
        {lines.map((line) => {
          const saved = lineSavings(line);
          const showSave = saved > 0;
          return (
            <li
              key={line.id}
              className={`grid grid-cols-1 gap-4 border border-(--border) bg-(--bg-card) p-4 sm:items-start sm:gap-4 ${
                showSave
                  ? "sm:grid-cols-[1fr_auto_1fr]"
                  : "sm:grid-cols-[minmax(0,1fr)_auto]"
              }`}
            >
              <Link
                href={`/product/${line.id}`}
                className="group flex min-w-0 gap-4 transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--text) sm:min-w-0"
              >
                <div className="relative h-24 w-24 shrink-0 overflow-hidden bg-(--border) border border-(--border) rounded-lg">
                  {line.imageUrl ? (
                    <Image
                      src={line.imageUrl}
                      alt={line.title}
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-xs text-(--text-muted)">
                      No image
                    </div>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-(--text) underline-offset-2 group-hover:underline">
                    {line.title}
                  </p>
                  <LinePricing line={line} />
                </div>
              </Link>
              {showSave && (
                <div className="hidden min-w-0 justify-self-center self-center px-2 text-center sm:block">
                  <p className="text-sm font-medium text-(--sale)">
                    You save {formatKr(saved)} on this item
                  </p>
                </div>
              )}
              <div className="flex w-full shrink-0 flex-col gap-3 justify-self-end border-t border-(--border) pt-3 sm:w-auto sm:border-t-0 sm:pt-0">
                <div className="flex items-center justify-between gap-3 sm:justify-end">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      className="min-h-11 min-w-11 rounded border border-(--border) text-(--text) transition-colors hover:bg-(--border) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--text)"
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
                      className="min-h-11 min-w-11 rounded border border-(--border) text-(--text) transition-colors hover:bg-(--border) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--text)"
                      aria-label="Increase quantity"
                      onClick={() => setQuantity(line.id, line.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                  <button
                    type="button"
                    className="shrink-0 text-(--accent) underline underline-offset-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--text)"
                    onClick={() => {
                      removeLine(line.id);
                      showToast(`Removed ${line.title} from cart`, "danger");
                    }}
                  >
                    Remove
                  </button>
                </div>
                <CartLineTotals line={line} />
              </div>
            </li>
          );
        })}
      </ul>
      <div className="mt-8 flex flex-col gap-4 border-t border-(--border) pt-8 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between">
        <div className="space-y-1">
          {totalSavings > 0 && (
            <p className="text-lg font-semibold text-(--sale)">
              Total saved: {formatKr(totalSavings)}
            </p>
          )}
          <p className="text-xl font-bold text-(--text)">
            Order total: {formatKr(total)}
          </p>
        </div>
        <Link
          href="/checkout/success"
          className="inline-flex items-center justify-center bg-(--accent) px-4 py-2 font-semibold text-white transition-colors hover:bg-(--text) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--text)"
        >
          Checkout
        </Link>
      </div>
    </div>
  );
}
