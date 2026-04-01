"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { useCart } from "@/app/context/CartContext";

export default function CheckoutSuccessPage() {
  const { clearCart } = useCart();
  const cleared = useRef(false);

  useEffect(() => {
    if (cleared.current) return;
    cleared.current = true;
    clearCart();
  }, [clearCart]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-16 text-center">
      <h1
        className="text-3xl font-bold text-(--text)"
        style={{ fontFamily: "var(--font-bitter), serif" }}
      >
        Thank you for your order!
      </h1>
      <p className="text-lg text-(--text-muted) mt-4 max-w-md mx-auto">
        Your order has been placed successfully.
      </p>
      <Link
        href="/"
        className="inline-block mt-8 text-(--accent) font-semibold underline"
      >
        Home
      </Link>
    </div>
  );
}
