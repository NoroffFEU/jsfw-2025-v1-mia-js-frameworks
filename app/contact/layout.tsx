import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Loot Locker - questions, order help, or feedback.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
