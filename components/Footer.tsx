import { siteContent, type Language } from "@/lib/content";

type FooterProps = {
  lang: Language;
};

export function Footer({ lang }: FooterProps) {
  const copy = siteContent[lang].footer;

  return (
    <footer className="border-t border-white/10 bg-graphite text-rice">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-8 text-sm text-rice/50 md:flex-row md:items-center md:justify-between lg:px-8">
        <p>{copy.brand}</p>
        <p>{copy.line}</p>
      </div>
    </footer>
  );
}
