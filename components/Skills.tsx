import { ArrowRight, FlaskConical } from "lucide-react";
import { skills } from "@/lib/content";
import { SectionHeader } from "./SectionHeader";

function StatusBadge({ status }: { status: string }) {
  const ready = status === "Prototype Ready";

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

export function Skills() {
  return (
    <section id="skills" className="section-band bg-rice">
      <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHeader
            eyebrow="Prototype Skills"
            title="Small tools. Real workflows. Built from supply chain problems."
            subtitle="Two prototype-ready samples show how ChainFlow turns messy operational questions into usable AI workflows."
          />
          <a href="#contact" className="btn-outline w-fit">
            Request Demo
          </a>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {skills.map((skill, index) => (
            <article
              key={skill.name}
              className="group rounded-2xl border border-line bg-paper p-6 transition duration-300 hover:-translate-y-1 hover:border-jade/40 hover:shadow-soft"
            >
              <div className="mb-8 flex items-start justify-between gap-4">
                <div className="grid h-11 w-11 place-items-center rounded-full border border-ink/10 bg-rice text-jade">
                  <FlaskConical size={19} />
                </div>
                <StatusBadge status={skill.status} />
              </div>

              <h3 className="text-2xl font-semibold leading-tight text-ink">{skill.name}</h3>
              <p className="mt-2 text-base text-ink/50">{skill.cnName}</p>
              <p className="mt-4 text-base leading-8 text-ink/70">{skill.value}</p>

              <div className="mt-7 border-t border-line pt-6">
                <p className="text-sm font-medium text-ink">Problem</p>
                <p className="mt-2 text-sm leading-7 text-ink/62">{skill.problem}</p>
              </div>

              <div className="mt-6 grid gap-5 xl:grid-cols-2">
                <SkillList title="Input" items={skill.inputs} />
                <SkillList title="Output" items={skill.outputs} />
              </div>

              {index < 2 ? (
                <div className="mt-6 flex flex-wrap gap-2">
                  {skill.scenes.slice(0, 5).map((scene) => (
                    <span key={scene} className="rounded-full border border-line bg-rice px-3 py-1.5 text-xs text-ink/60">
                      {scene}
                    </span>
                  ))}
                </div>
              ) : null}

              <a href="#contact" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-ink hover:text-jade">
                {skill.cta}
                {skill.status === "Prototype Ready" ? <ArrowRight size={16} /> : null}
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillList({ title, items }: { title: string; items: string[] }) {
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
