import { LogOut } from "lucide-react";

import { LogoLockup } from "@/components/app/logo";
import { signOutAction } from "@/app/auth/actions";

export function Header({
  email,
  roleLabel = "Client",
}: {
  searchPlaceholder?: string;
  email?: string | null;
  roleLabel?: string;
}) {
  const display = email ?? "";
  const initial = (display.trim()[0] || "V").toUpperCase();

  return (
    <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center justify-between border-b border-line bg-paper px-5">
      <LogoLockup />

      <div className="flex shrink-0 items-center gap-3">
        <div className="flex items-center gap-2.5 rounded-lg py-1 pl-1 pr-2">
          <div
            className="grid size-8 place-items-center rounded-full font-display text-[13px] font-semibold text-[#0a0a0a]"
            style={{ background: "linear-gradient(135deg, var(--gold-2), var(--gold-grad-1))" }}
          >
            {initial}
          </div>
          <div className="hidden max-w-[180px] text-left leading-tight sm:block">
            <div className="truncate text-[13px] font-medium text-ink">{display || "Signed in"}</div>
            <div className="text-[11px] text-muted-2">{roleLabel}</div>
          </div>
        </div>

        <form action={signOutAction}>
          <button
            type="submit"
            aria-label="Sign out"
            title="Sign out"
            className="grid size-9 place-items-center rounded-lg text-muted transition-colors hover:bg-surface-3 hover:text-ink"
          >
            <LogOut className="size-[17px]" strokeWidth={1.7} />
          </button>
        </form>
      </div>
    </header>
  );
}
