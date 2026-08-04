import type { Metadata } from "next";
import { Figtree, Reddit_Mono } from "next/font/google";
import "./globals.css";

/**
 * Consensus ships CircularXXWeb (licensed) + Reddit Mono.
 * Reddit Mono is on Google Fonts, so the mono is exact.
 * Figtree stands in for Circular — closest freely available geometric sans.
 * Noted as an assumption in the presentation.
 */
const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
});

const redditMono = Reddit_Mono({
  variable: "--font-reddit-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rethinking the Research Thread — Consensus",
  description:
    "A design challenge response: making a paper a persistent object that carries its provenance across every surface in Consensus.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme="light"
      className={`${figtree.variable} ${redditMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg-base text-fg-base">
        {children}
      </body>
    </html>
  );
}
