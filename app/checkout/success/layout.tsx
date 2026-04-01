import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Order placed",
  description:
    "Thank you for your order at Loot Locker. Your purchase is confirmed.",
};

export default function CheckoutSuccessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
