import { Plus, Download } from "lucide-react";

import { PageHeader, PageShell } from "@/components/app/page-header";
import { Button } from "@/components/ui/button";
import { StatusChip } from "@/components/status-chip";
import { leads, LEAD_COLUMNS, type Lead, type LeadStatus } from "@/lib/mock";
import { formatINR } from "@/lib/utils";

function LeadCard({ lead }: { lead: Lead }) {
  return (
    <div className="rounded-[10px] border border-line bg-card p-3 transition-colors hover:border-line/80 hover:bg-surface-3/30">
      <div className="text-[13px] font-medium text-ink">{lead.brand}</div>
      <div className="mt-0.5 text-[11px] text-muted-2">
        {lead.handle} · {lead.industry}
      </div>
      {lead.service && (
        <span className="mt-2 inline-flex rounded-md bg-input-bg px-2 py-0.5 text-[10px] text-muted">
          {lead.service}
        </span>
      )}
      {lead.note && lead.status === "contacted" && (
        <div className="mt-2">
          <StatusChip tone="info">{lead.note}</StatusChip>
        </div>
      )}
      {lead.note && lead.status === "proposal" && (
        <div className="mt-2">
          <StatusChip tone="info">{lead.note} ↗</StatusChip>
        </div>
      )}
      {lead.note && (lead.status === "won" || lead.status === "lost") && (
        <div className="mt-2">
          <StatusChip tone={lead.status === "won" ? "success" : "error"}>
            {lead.note}
          </StatusChip>
        </div>
      )}
      {lead.monthly && (
        <div className="mt-2 font-display text-[14px] text-gold">
          {formatINR(lead.monthly)}
          <span className="text-[11px] text-muted-2">/mo</span>
        </div>
      )}
      {lead.meta && (
        <div className="mt-2 text-[10px] text-muted-3">{lead.meta}</div>
      )}
    </div>
  );
}

export default function CrmPage() {
  const byStatus = (s: LeadStatus) => leads.filter((l) => l.status === s);

  return (
    <PageShell className="max-w-none">
      <PageHeader
        title="CRM / Leads"
        subtitle="5 leads · ₹3.2L pipeline · 2 won this month"
        actions={
          <>
            <Button variant="secondary" size="sm">
              <Download className="size-4" /> Export CSV
            </Button>
            <Button size="sm">
              <Plus className="size-4" /> Add lead
            </Button>
          </>
        }
      />

      <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-3 xl:grid-cols-5">
        {LEAD_COLUMNS.map((col) => {
          const items = byStatus(col.key);
          const dimmed = col.key === "lost";
          return (
            <div key={col.key} className={dimmed ? "opacity-60" : ""}>
              <div className="mb-3 flex items-center gap-2 px-1">
                <span className="size-2 rounded-full" style={{ background: col.tone }} />
                <span className="eyebrow !text-muted-2">{col.label}</span>
                <span className="ml-auto rounded bg-input-bg px-1.5 text-[10px] text-muted-3">
                  {items.length}
                </span>
              </div>
              <div className="flex flex-col gap-2.5">
                {items.map((l) => (
                  <LeadCard key={l.id} lead={l} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </PageShell>
  );
}
