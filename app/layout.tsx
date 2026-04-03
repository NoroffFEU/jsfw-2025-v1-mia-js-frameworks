import type { Metadata } from "next";
import { Geist, Bitter } from "next/font/google";
import "./globals.css";
import Header from "@/app/components/Header";
import { CartProvider } from "@/app/context/CartContext";
import { ToastProvider } from "@/app/context/ToastContext";
import { SITE_DESCRIPTION } from "@/app/components/shared/site";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://lootlocker.netlify.app";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const bitter = Bitter({
  variable: "--font-bitter",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Loot Locker | Sell your loot",
    template: "%s | Loot Locker",
  },
  description: SITE_DESCRIPTION,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${bitter.variable} antialiased`}>
        <ToastProvider>
          <CartProvider>
            <Header />
            <main id="main-content">{children}</main>
          </CartProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
