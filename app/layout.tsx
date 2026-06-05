import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://chainflowlab.com"),
  title: "ChainFlow | Supply Chain AI Product Lab",
  description:
    "ChainFlow is a Supply Chain AI product lab for practical tools, workflow pilots, and decision intelligence.",
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
