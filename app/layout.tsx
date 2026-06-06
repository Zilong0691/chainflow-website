import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://chainflowlab.com"),
  title: "ChainFlow 链流 | 供应链 × AI 产品实验室",
  description:
    "让供应链，如水一般。面向供应链从业者、商家与中小企业的实用 AI 小工具实验室。",
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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Ma+Shan+Zheng&family=Noto+Serif+SC:wght@400;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
