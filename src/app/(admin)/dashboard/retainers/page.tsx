import { AlertTriangle } from "lucide-react";

import { PageHeader, PageShell } from "@/components/app/page-header";
import { AccentAvatar } from "@/components/app/accent-avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { StatusChip } from "@/components/status-chip";
import { retainers, type Retainer, type RetainerLine } from "@/lib/mock";
import { formatINR, cn } from "@/lib/utils";

function UsageBar({ line }: { line: RetainerLine }) {
  const pct = Math.min(100, (line.used / line.limit) * 100);
  const atLimit = line.used >= line.limit;
  const over = line.used > line.limit;
  return (
    <div>
      <div className="flex items-center justify-between text-[12px]">
        <span className="text-muted">{line.label}</span>
        <span className={cn("font-medium", atLimit ? "text-error" : "text-ink-2")}>
          {line.used} / {line.limit}
          {atLimit && <AlertTriangle className="ml-1 inline size-3 text-error" />}
        </span>
      </div>
      <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-surface-3">
        <div
          className={cn("h-full rounded-full transition-all", atLimit ? "bg-error" : over ? "bg-error" : "")}
          style={{
            width: `${pct}%`,
            background: atLimit ? "var(--error)" : "var(--success)",
          }}
        />
      </div>
    </div>
  );
}

function RetainerCard({ r }: { r: Retainer }) {
  return (
    <Card className="gap-0 p-5">
      <div className="flex items-center gap-3">
        <AccentAvatar initial={r.clientName[0]} color={r.accent} size={40} />
        <div className="flex-1">
          <div className="text-[14px] font-medium text-ink">{r.clientName}</div>
          <div className="text-[11px] text-muted-2">
            Cycle: {r.cycle} · {formatINR(r.monthly)}/mo
          </div>
        </div>
        <StatusChip tone={r.band === "healthy" ? "success" : "warning"}>
          {r.band === "healthy" ? "Healthy" : "At Risk"}
        </StatusChip>
      </div>

      <div className="mt-4 flex flex-col gap-3.5">
        {r.lines.map((line) => (
          <UsageBar key={line.label} line={line} />
        ))}
      </div>

      {r.upsell && (
        <div className="mt-4 flex items-center justify-between rounded-[10px] border border-warning/25 bg-warning/[0.06] px-3 py-2">
          <span className="text-[12px] text-warning">{r.upsell.label}</span>
          <Button size="sm" className="h-7 bg-warning text-[#0a0a0a] hover:bg-warning/90">
            {r.upsell.cta}
          </Button>
        </div>
      )}
      {r.note && !r.upsell && (
        <p className="mt-3 text-[11px] text-muted-3">{r.note}</p>
      )}
    </Card>
  );
}

export default function RetainersPage() {
  return (
    <PageShell>
      <PageHeader
        title="Retainers"
        subtitle="Scope tracking · Jul cycle · Resets Aug 1"
        actions={
          <div className="flex items-center gap-1.5 rounded-lg border border-error/25 bg-error/[0.06] px-3 py-1.5 text-[12px] text-error">
            <AlertTriangle className="size-3.5" />2 clients at limit — upsell opportunity
          </div>
        }
      />
      <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-2">
        {retainers.map((r) => (
          <RetainerCard key={r.id} r={r} />
        ))}
      </div>
    </PageShell>
  );
}
