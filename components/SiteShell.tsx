"use client";

import { useEffect, useState } from "react";
import { About } from "@/components/About";
import { BeyondScripts } from "@/components/BeyondScripts";
import { Contact } from "@/components/Contact";
import { DemoSection } from "@/components/DemoSection";
import { Footer } from "@/components/Footer";
import { FutureDirections } from "@/components/FutureDirections";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { Services } from "@/components/Services";
import { Skills } from "@/components/Skills";
import { ThreeLayers } from "@/components/ThreeLayers";
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
        <WhyChainFlow lang={lang} />
        <ThreeLayers lang={lang} />
        <Skills lang={lang} />
        <DemoSection lang={lang} />
        <BeyondScripts lang={lang} />
        <Services lang={lang} />
        <FutureDirections lang={lang} />
        <About lang={lang} />
        <Contact lang={lang} />
      </main>
      <Footer lang={lang} />
    </>
  );
}
