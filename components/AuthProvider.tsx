"use client";

import { createContext, useContext, useEffect, useState, useRef, type ReactNode } from "react";
import type { User } from "@supabase/supabase-js";

interface AuthState {
  user: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthState>({ user: null, loading: true, signOut: async () => {} });

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [ready, setReady] = useState(false);
  const supabaseRef = useRef<any>(null);

  useEffect(() => {
    // 仅在客户端初始化 Supabase
    const init = async () => {
      const { createBrowserClient } = await import("@supabase/ssr");
      const sb = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL || "",
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
      );
      supabaseRef.current = sb;

      const { data } = await sb.auth.getUser();
      setUser(data.user);
      setLoading(false);

      const { data: { subscription } } = sb.auth.onAuthStateChange((_e: any, session: any) => {
        setUser(session?.user || null);
      });
      return () => subscription.unsubscribe();
    };

    if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
      init().then(() => { setReady(true); });
    } else {
      setLoading(false);
      setReady(true);
    }
  }, []);

  const signOut = async () => {
    if (supabaseRef.current) {
      await supabaseRef.current.auth.signOut();
      setUser(null);
    }
  };

  return <AuthContext.Provider value={{ user, loading, signOut }}>{children}</AuthContext.Provider>;
}

export function useAuth() { return useContext(AuthContext); }
