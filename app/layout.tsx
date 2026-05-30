import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "ChainFlow | AI-native supply chain flow",
  description:
    "ChainFlow explores how AI can reduce friction, improve decisions, and create better connections across global supply chains.",
  openGraph: {
    title: "ChainFlow",
    description: "让供应链，如水流动。",
    images: ["/chainflow-hero-flow.png"]
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
