"use client";

import { useEffect, useState } from "react";
import { About } from "@/components/About";
import { CommunityPilot } from "@/components/CommunityPilot";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { PortfolioPosition } from "@/components/PortfolioPosition";
import { Services } from "@/components/Services";
import { Skills } from "@/components/Skills";
import { WhyChainFlow } from "@/components/WhyChainFlow";
import type { Language } from "@/lib/content";

const storageKey = "chainflow-language";

export function SiteShell() {
  const [lang, setLang] = useState<Language>("zh");

  useEffect(() => {
    const stored = window.localStorage.getItem(storageKey);
    if (stored === "zh" || stored === "en") {
      setLang(stored);
    }
  }, []);

  function handleLanguageChange(nextLang: Language) {
    setLang(nextLang);
    window.localStorage.setItem(storageKey, nextLang);
  }

  return (
    <>
      <Navbar lang={lang} onLanguageChange={handleLanguageChange} />
      <main>
        <Hero lang={lang} />
        <PortfolioPosition lang={lang} />
        <WhyChainFlow lang={lang} />
        <Skills lang={lang} />
        <Services lang={lang} />
        <CommunityPilot lang={lang} />
        <About lang={lang} />
      </main>
      <Footer lang={lang} />
    </>
  );
}
