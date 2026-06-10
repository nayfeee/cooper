import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const ethnocentric = localFont({
  src: "../public/fonts/ethnocentric.woff2",
  variable: "--font-ethnocentric",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Cooper Plumbing & Heating | Luxury Bathrooms Blackburn",
  description:
    "Family-run bathroom installation, plumbing and heating specialists creating luxury bathrooms across Blackburn, Darwen and surrounding towns.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={ethnocentric.variable}>
      <body>{children}</body>
    </html>
  );
}
