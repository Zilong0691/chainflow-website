import { siteContent, type Language } from "@/lib/content";

type PortfolioPositionProps = {
  lang: Language;
};

export function PortfolioPosition({ lang }: PortfolioPositionProps) {
  const copy = siteContent[lang].portfolio;

  return (
    <section className="section-band bg-graphite text-rice">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 lg:grid-cols-[0.8fr_1fr] lg:px-8 lg:py-20">
        <div>
          <p className="text-sm font-medium text-gold">{copy.eyebrow}</p>
          <h2 className="mt-4 max-w-2xl whitespace-nowrap text-3xl font-semibold leading-tight text-rice md:text-5xl">{copy.title}</h2>
        </div>

        <div className="flex flex-col justify-end">
          <div className="max-w-3xl space-y-3 text-pretty text-base leading-8 text-rice/65 md:text-lg">
            {copy.body.split("\n").map((p,i)=><p key={i}>{p}</p>)}
          </div>
          <div className="mt-7 flex flex-wrap gap-2">
            {copy.points.map((point) => (
              <span key={point} className="rounded-full border border-gold/20 bg-gold/10 px-4 py-2 text-sm font-medium text-gold">
                {point}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
