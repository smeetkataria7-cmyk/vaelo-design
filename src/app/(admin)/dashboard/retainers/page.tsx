import { PageHeader, PageShell } from "@/components/app/page-header";
import { AccentAvatar } from "@/components/app/accent-avatar";
import { Card } from "@/components/ui/card";
import { StatusChip } from "@/components/status-chip";
import { clientBilling } from "@/lib/billing";
import { accentFor } from "@/lib/accent";
import { formatINR } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function RetainersPage() {
  const { rows, totals } = await clientBilling().catch(() => ({
    rows: [],
    totals: { billed: 0, paid: 0, outstanding: 0 },
  }));

  return (
    <PageShell>
      <PageHeader
        title="Retainers & billing"
        subtitle={
          rows.length
            ? `${formatINR(totals.billed)} billed · ${formatINR(totals.paid)} collected · ${formatINR(totals.outstanding)} outstanding`
            : "Per-client billing appears here once you send invoices"
        }
      />

      {rows.length === 0 ? (
        <div className="mt-6 grid place-items-center rounded-[12px] border border-dashed border-line bg-card/40 py-16 text-center">
          <p className="text-[14px] font-medium text-ink-2">No billing yet</p>
          <p className="mt-1 text-[12px] text-muted-2">Send an invoice and each client&apos;s rollup shows here.</p>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-2">
          {rows.map((r) => {
            const pct = r.billed > 0 ? (r.paid / r.billed) * 100 : 0;
            return (
              <Card key={r.email} className="gap-0 p-5">
                <div className="flex items-center gap-3">
                  <AccentAvatar
                    initial={((r.name || r.email)[0] || "?").toUpperCase()}
                    color={accentFor(r.email)}
                    size={40}
                  />
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-[14px] font-medium text-ink">{r.name || r.email}</div>
                    <div className="text-[11px] text-muted-2">
                      {r.count} {r.count === 1 ? "invoice" : "invoices"}
                    </div>
                  </div>
                  <StatusChip tone={r.outstanding > 0 ? "warning" : "success"}>
                    {r.outstanding > 0 ? "Open" : "Cleared"}
                  </StatusChip>
                </div>

                <div className="mt-4">
                  <div className="flex items-center justify-between text-[12px]">
                    <span className="text-muted">Collected</span>
                    <span className="text-ink-2">
                      {formatINR(r.paid)} / {formatINR(r.billed)}
                    </span>
                  </div>
                  <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-surface-3">
                    <div className="h-full rounded-full bg-success" style={{ width: `${pct}%` }} />
                  </div>
                </div>

                {r.outstanding > 0 && (
                  <div className="mt-4 flex items-center justify-between rounded-[10px] border border-warning/25 bg-warning/[0.06] px-3 py-2 text-[12px] text-warning">
                    <span>Outstanding</span>
                    <span className="font-medium">{formatINR(r.outstanding)}</span>
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      )}
    </PageShell>
  );
}
