import { ArrowRight } from "lucide-react";
import { beyondCode } from "@/lib/content";
import { SectionHeader } from "./SectionHeader";

export function BeyondScripts() {
  return (
    <section className="section-band bg-graphite text-rice">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 lg:grid-cols-[0.95fr_1.05fr] lg:px-8 lg:py-28">
        <div>
          <SectionHeader
            eyebrow="Beyond Scripts"
            title="不止是一段代码"
            subtitle="单个脚本很容易被复制，真正有价值的是把供应链问题变成可运行、可交付、可复用的工作流。"
            tone="dark"
          />
          <a href="#contact" className="btn-ghost mt-9">
            Discuss Your Case
            <ArrowRight size={18} />
          </a>
        </div>

        <div className="grid gap-px overflow-hidden rounded-2xl border border-rice/10 bg-rice/10">
          {beyondCode.map((item, index) => (
            <div key={item} className="grid grid-cols-[3.5rem_1fr] items-center bg-graphite px-5 py-5">
              <span className="text-sm text-rice/40">0{index + 1}</span>
              <p className="text-base leading-7 text-rice/76">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
