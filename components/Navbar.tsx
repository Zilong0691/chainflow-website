import { CalendarDays } from "lucide-react";
import { navItems } from "@/lib/content";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-graphite/80 text-rice backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-5 py-4 lg:px-8">
        <a href="#top" className="flex items-center gap-3" aria-label="ChainFlow home">
            <span className="grid h-8 w-8 place-items-center rounded-full border border-rice/20 bg-rice/10 text-sm font-semibold">
            CF
          </span>
          <span className="text-base font-semibold">ChainFlow</span>
        </a>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary navigation">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="text-sm text-rice/70 transition hover:text-rice">
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className="hidden items-center gap-2 rounded-full border border-rice/20 bg-rice/10 px-4 py-2 text-sm font-medium text-rice transition hover:border-rice/30 hover:bg-rice/20 sm:flex"
        >
          <CalendarDays size={16} />
          Book
        </a>
      </div>

      <nav
        className="no-scrollbar flex gap-5 overflow-x-auto border-t border-white/10 px-5 py-3 md:hidden"
        aria-label="Mobile navigation"
      >
        {navItems.map((item) => (
          <a key={item.href} href={item.href} className="shrink-0 text-sm text-rice/70">
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
