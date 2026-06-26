import { Bell, Search } from "lucide-react";

import { LogoLockup } from "@/components/app/logo";
import { OWNER } from "@/lib/mock";

export function Header({ searchPlaceholder = "Search…" }: { searchPlaceholder?: string }) {
  return (
    <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center justify-between border-b border-line bg-paper px-5">
      {/* Left: logo lockup (aligned to sidebar column) */}
      <div className="flex w-[230px] shrink-0 items-center">
        <LogoLockup />
      </div>

      {/* Center: search */}
      <div className="flex flex-1 justify-center px-4">
        <div className="relative w-full max-w-[300px]">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-3" strokeWidth={1.7} />
          <input
            type="text"
            placeholder={searchPlaceholder}
            className="h-9 w-full rounded-lg border border-line bg-input-bg pl-9 pr-12 text-[13px] text-ink placeholder:text-muted-2 outline-none transition-colors focus-visible:border-gold/50"
          />
          <kbd className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 rounded border border-line bg-paper px-1.5 py-0.5 text-[10px] font-medium text-muted-3">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Right: bell + avatar */}
      <div className="flex shrink-0 items-center gap-3">
        <button
          type="button"
          aria-label="Notifications"
          className="relative grid size-9 place-items-center rounded-lg text-muted transition-colors hover:bg-surface-3 hover:text-ink"
        >
          <Bell className="size-[18px]" strokeWidth={1.7} />
          <span className="absolute right-2 top-2 size-1.5 rounded-full bg-error ring-2 ring-paper" />
        </button>

        <div className="h-6 w-px bg-line" />

        <button type="button" className="flex items-center gap-2.5 rounded-lg py-1 pl-1 pr-2 transition-colors hover:bg-surface-3">
          <div
            className="grid size-8 place-items-center rounded-full font-display text-[13px] font-semibold text-[#0a0a0a]"
            style={{ background: "linear-gradient(135deg, var(--gold-2), var(--gold-grad-1))" }}
          >
            {OWNER.initial}
          </div>
          <div className="hidden text-left leading-tight sm:block">
            <div className="text-[13px] font-medium text-ink">{OWNER.name}</div>
            <div className="text-[11px] text-muted-2">{OWNER.role}</div>
          </div>
        </button>
      </div>
    </header>
  );
}
