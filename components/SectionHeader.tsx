type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "left",
  tone = "light",
  className = ""
}: SectionHeaderProps) {
  const alignment = align === "center" ? "mx-auto items-center text-center" : "items-start";
  const eyebrowColor = tone === "dark" ? "text-[#75d4cb]" : "text-jade";
  const titleColor = tone === "dark" ? "text-rice" : "text-ink";
  const subtitleColor = tone === "dark" ? "text-rice/70" : "text-ink/70";

  return (
    <div className={`flex max-w-3xl flex-col gap-4 ${alignment} ${className}`}>
      {eyebrow ? <p className={`text-sm font-medium ${eyebrowColor}`}>{eyebrow}</p> : null}
      <h2 className={`text-balance text-3xl font-semibold leading-tight md:text-5xl ${titleColor}`}>{title}</h2>
      {subtitle ? <p className={`max-w-2xl text-pretty text-base leading-8 md:text-lg ${subtitleColor}`}>{subtitle}</p> : null}
    </div>
  );
}
