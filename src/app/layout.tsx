import type { Metadata } from "next";
import { Figtree, Fraunces } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";

const figtree = Figtree({ subsets: ["latin"], variable: "--font-figtree" });
const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces" });

export const metadata: Metadata = {
  title: {
    default: "MyBhubaneswar.com | A trusted guide to Bhubaneswar",
    template: "%s | MyBhubaneswar.com",
  },
  description:
    "Everything you need to know, do, discover and experience in Bhubaneswar, in one place.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${figtree.variable} ${fraunces.variable}`}>
      <body>{children}</body>
    </html>
  );
}
