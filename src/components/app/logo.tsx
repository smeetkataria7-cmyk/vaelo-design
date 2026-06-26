import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-[7px] font-display text-[#0a0a0a]",
        className
      )}
      style={{
        background: "linear-gradient(135deg, var(--gold-2), var(--gold-grad-1))",
      }}
    >
      <span className="font-semibold leading-none">V</span>
    </div>
  );
}

export function LogoLockup({ subtitle = "AGENCY OS" }: { subtitle?: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <LogoMark className="size-[30px] text-[15px]" />
      <div className="leading-tight">
        <div className="font-display text-[15px] font-semibold tracking-tight text-ink">
          Vaelo
        </div>
        <div className="text-[9px] font-semibold uppercase tracking-[0.16em] text-muted-3">
          {subtitle}
        </div>
      </div>
    </div>
  );
}
