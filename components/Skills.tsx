import { ArrowRight, FlaskConical } from "lucide-react";
import { siteContent, type Language } from "@/lib/content";
import { SectionHeader } from "./SectionHeader";

type SkillsProps = {
  lang: Language;
};

type Skill = (typeof siteContent)[Language]["skills"][number];

function StatusBadge({ status, ready }: { status: string; ready: boolean }) {
  return (
    <span
      className={`inline-flex rounded-full px-3 py-1.5 text-xs font-medium ${
        ready ? "bg-jade/10 text-jade" : "bg-clay/10 text-clay"
      }`}
    >
      {status}
    </span>
  );
}

export function Skills({ lang }: SkillsProps) {
  const copy = siteContent[lang];

  return (
    <section id="skills" className="section-band bg-rice">
      <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHeader
            eyebrow={copy.skillsHeader.eyebrow}
            title={copy.skillsHeader.title}
            subtitle={copy.skillsHeader.subtitle}
          />
          <a href="#contact" className="btn-outline w-fit">
            {copy.skillsDemoCta}
          </a>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {copy.skills.map((skill, index) => {
            const ready = index < 2;

            return (
              <article
                key={skill.name}
                className="group rounded-2xl border border-line bg-paper p-6 transition duration-300 hover:-translate-y-1 hover:border-jade/40 hover:shadow-soft"
              >
                <div className="mb-8 flex items-start justify-between gap-4">
                  <div className="grid h-11 w-11 place-items-center rounded-full border border-ink/10 bg-rice text-jade">
                    <FlaskConical size={19} />
                  </div>
                  <StatusBadge status={skill.status} ready={ready} />
                </div>

                <p className="text-sm font-medium text-jade">{skill.name}</p>
                <h3 className="mt-2 text-2xl font-semibold leading-tight text-ink">{skill.title}</h3>
                <p className="mt-4 text-base leading-8 text-ink/70">{skill.value}</p>

                <div className="mt-7 border-t border-line pt-6">
                  <p className="text-sm font-medium text-ink">{copy.labels.problem}</p>
                  <p className="mt-2 text-sm leading-7 text-ink/60">{skill.problem}</p>
                </div>

                <div className="mt-6 grid gap-5 xl:grid-cols-2">
                  <SkillList title={copy.labels.input} items={skill.inputs} />
                  <SkillList title={copy.labels.output} items={skill.outputs} />
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  {skill.scenes.slice(0, 5).map((scene) => (
                    <span key={scene} className="rounded-full border border-line bg-rice px-3 py-1.5 text-xs text-ink/60">
                      {scene}
                    </span>
                  ))}
                </div>

                <DemoPreview skill={skill} ready={ready} />

                <a href="#contact" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-ink hover:text-jade">
                  {skill.cta}
                  {ready ? <ArrowRight size={16} /> : null}
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function SkillList({ title, items }: { title: string; items: readonly string[] }) {
  return (
    <div>
      <p className="text-sm font-medium text-ink">{title}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {items.map((item) => (
          <span key={item} className="rounded-full border border-line bg-rice px-3 py-1.5 text-xs text-ink/60">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function DemoPreview({ skill, ready }: { skill: Skill; ready: boolean }) {
  return (
    <div
      className={`mt-7 rounded-xl border p-4 ${
        ready ? "border-jade/25 bg-jade/5" : "border-line bg-rice/70"
      }`}
    >
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm font-semibold text-ink">{skill.demoTitle}</p>
        <span className={`h-2.5 w-2.5 rounded-full ${ready ? "bg-jade" : "bg-clay"}`} />
      </div>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <DemoList title={skill.demoInputLabel} items={skill.demoInput} />
        <DemoList title={skill.demoOutputLabel} items={skill.demoOutput} />
      </div>
    </div>
  );
}

function DemoList({ title, items }: { title: string; items: readonly string[] }) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-[0.08em] text-ink/50">{title}</p>
      <div className="mt-3 grid gap-2">
        {items.map((item) => (
          <p key={item} className="rounded-lg bg-paper px-3 py-2 text-xs leading-5 text-ink/70">
            {item}
          </p>
        ))}
      </div>
    </div>
  );
}
