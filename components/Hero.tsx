import { ArrowRight, CalendarDays, Sparkles } from "lucide-react";
import { siteContent, type Language } from "@/lib/content";
import dynamic from "next/dynamic";

type HeroProps = { lang: Language };

const Globe3D = dynamic(() => import("./Globe3D"), { ssr: false });

export function Hero({ lang }: HeroProps) {
  const copy = siteContent[lang].hero;
  const zh = lang === "zh";
  return (
    <section id="top" className="relative isolate overflow-hidden bg-[#030b17] text-rice">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_50%,rgba(0,180,255,0.06)_0%,rgba(3,11,23,0.9)_60%)]" />
      <div className="mx-auto grid min-h-[88svh] max-w-7xl items-center gap-10 px-5 py-16 lg:grid-cols-[1fr_1fr] lg:px-8 lg:py-20">
        <div className="max-w-4xl lg:pr-4">
          <p className="mb-6 inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/[0.06] px-4 py-2 text-sm text-cyan-300/80 backdrop-blur-sm">{copy.eyebrow}</p>
          <h1 className="whitespace-nowrap text-[clamp(1.55rem,5.8vw,4.5rem)] font-semibold leading-[1.12] text-rice md:text-7xl md:leading-[1.08]">
            {zh ? (<>让供应链，如<span className="flow-word">水</span>一般</>) : copy.title}
          </h1>
          <p className="mt-6 max-w-3xl text-pretty text-xl leading-8 text-rice/80 md:text-2xl">{copy.subtitle}</p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a href="#skills" className="btn-primary">{copy.primaryCta}<ArrowRight size={18} /></a>
            <a href="#skills" className="btn-ghost"><Sparkles size={18} />{copy.secondaryCta}</a>
            <a href="#contact" className="btn-ghost"><CalendarDays size={18} />{copy.tertiaryCta}</a>
          </div>
        </div>
        <div className="relative flex min-h-[20rem] items-center justify-center sm:min-h-[26rem] lg:min-h-[36rem]">
          <Globe3D />
        </div>
      </div>
    </section>
  );
}
