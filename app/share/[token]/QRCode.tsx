"use client";

import { useEffect, useRef } from "react";

/* QR Code 组件 — 司机扫码查看任务 */

export default function QRCode({ url }: { url: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    import("qrcode").then(QR => {
      ref.current!.innerHTML = "";
      const canvas = document.createElement("canvas");
      QR.toCanvas(canvas, url, { width: 150, margin: 1, color: { dark: "#f2c76a", light: "#0b100d" } });
      ref.current!.appendChild(canvas);
    });
  }, [url]);

  return <div ref={ref} className="flex justify-center" />;
}
