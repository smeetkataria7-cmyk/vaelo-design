import Link from "next/link";
import { Sparkles, ChevronRight, AlertCircle, Signal, Wifi, BatteryFull } from "lucide-react";

import { AccentAvatar } from "@/components/app/accent-avatar";
import { Button } from "@/components/ui/button";
import { StatusChip } from "@/components/status-chip";
import {
  portalClient,
  portalAiStatus,
  pendingApprovals,
  portalUsage,
  portalInvoice,
} from "@/lib/portal-mock";
import { formatINR, cn } from "@/lib/utils";

function StatusBar() {
  return (
    <div className="flex items-center justify-between px-5 pt-3 text-[11px] font-medium text-ink">
      <span>9:41</span>
      <div className="flex items-center gap-1.5">
        <Signal className="size-3.5" />
        <Wifi className="size-3.5" />
        <BatteryFull className="size-4" />
      </div>
    </div>
  );
}

export default function PortalHome() {
  const total = portalInvoice.subtotal * (1 + portalInvoice.gstRate);
  return (
    <div className="pb-6">
      <StatusBar />

      {/* Greeting */}
      <div className="flex items-center gap-3 px-5 pb-4 pt-5">
        <AccentAvatar initial={portalClient.initial} color={portalClient.accent} size={44} />
        <div>
          <div className="text-[15px] font-semibold text-ink">{portalClient.name}</div>
          <div className="text-[12px] text-muted-2">Good morning</div>
        </div>
      </div>

      {/* AI status */}
      <div className="mx-5 rounded-[14px] border border-gold/25 bg-gold/[0.06] p-4">
        <div className="flex items-center gap-2">
          <Sparkles className="size-4 text-gold" />
          <span className="eyebrow !text-gold">AI Status Update</span>
        </div>
        <p className="mt-2 text-[13px] leading-relaxed text-ink-2">{portalAiStatus}</p>
      </div>

      {/* Invoice due alert */}
      <div className="mx-5 mt-4 flex items-center gap-3 rounded-[14px] border border-error/25 bg-error/[0.06] p-4">
        <AlertCircle className="size-5 shrink-0 text-error" />
        <div className="flex-1">
          <div className="text-[13px] font-medium text-ink">Invoice {portalInvoice.number} due</div>
          <div className="text-[12px] text-muted-2">
            {formatINR(total)} · due {portalInvoice.due}
          </div>
        </div>
        <Button asChild size="sm" className="h-8 bg-info text-white hover:bg-info/90">
          <Link href="/portal/bills">Pay</Link>
        </Button>
      </div>

      {/* Pending approvals */}
      <div className="mt-6 px-5">
        <div className="flex items-center justify-between">
          <h2 className="text-[14px] font-semibold text-ink">Pending Approvals</h2>
          <StatusChip tone="warning">{pendingApprovals.length}</StatusChip>
        </div>
        <Link href="/portal/approve" className="mt-3 flex gap-2.5">
          {pendingApprovals.map((a) => (
            <div
              key={a.id}
              className="relative aspect-square flex-1 overflow-hidden rounded-[10px]"
              style={{ background: `linear-gradient(150deg, ${a.grad[0]}, ${a.grad[1]})` }}
            >
              <span className="absolute bottom-1 left-1 rounded bg-black/55 px-1.5 py-0.5 text-[9px] font-medium text-white">
                V{a.version}
              </span>
            </div>
          ))}
        </Link>
        <Link
          href="/portal/approve"
          className="mt-2 flex items-center justify-center gap-1 text-[12px] text-gold"
        >
          Review all <ChevronRight className="size-3.5" />
        </Link>
      </div>

      {/* Usage */}
      <div className="mt-6 px-5">
        <h2 className="text-[14px] font-semibold text-ink">June Package</h2>
        <div className="mt-3 space-y-3.5">
          {portalUsage.map((u) => {
            const atLimit = u.used >= u.limit;
            const pct = Math.min(100, (u.used / u.limit) * 100);
            return (
              <div key={u.label}>
                <div className="flex items-center justify-between text-[12px]">
                  <span className="text-muted">{u.label}</span>
                  <span className={cn("font-medium", atLimit ? "text-error" : "text-ink-2")}>
                    {u.used} / {u.limit} {atLimit && "⚠"}
                  </span>
                </div>
                <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-surface-3">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${pct}%`, background: atLimit ? "var(--error)" : "var(--success)" }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
