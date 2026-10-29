import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import "./marketing.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://chainflowlab.com"),
  title: "ChainFlow 链流 | 供应链 × AI 产品实验室",
  description:
    "让供应链，如水一般。连接 BOM、供料、价格与供应网络的供应链工作台。",
  openGraph: {
    title: "ChainFlow 链流",
    description: "让供应链，如水一般。",
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
