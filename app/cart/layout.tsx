import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cart",
  description:
    "Review your cart, update quantities, and continue to checkout at Loot Locker.",
};

export default function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
