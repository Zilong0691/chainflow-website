"use client";

import type { ReactNode } from "react";
import { AuthProvider } from "./AuthProvider";

export default function ClientLayout({ children }: { children: ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}
