import { Plus, Download } from "lucide-react";

import { PageHeader, PageShell } from "@/components/app/page-header";
import { Button } from "@/components/ui/button";
import { getLeads, type Lead } from "@/lib/leads";

export const dynamic = "force-dynamic";

const LEAD_COLUMNS: { key: string; label: string; tone: string }[] = [
  { key: "new", label: "New", tone: "var(--info)" },
  { key: "contacted", label: "Contacted", tone: "var(--warning)" },
  { key: "proposal", label: "Proposal", tone: "var(--gold)" },
  { key: "won", label: "Won", tone: "var(--success)" },
  { key: "lost", label: "Lost", tone: "var(--error)" },
];

function LeadCard({ lead }: { lead: Lead }) {
  return (
    <div className="rounded-[10px] border border-line bg-card p-3 transition-colors hover:border-line/80 hover:bg-surface-3/30">
      <div className="text-[13px] font-medium text-ink">{lead.brand || lead.name}</div>
      <div className="mt-0.5 text-[11px] text-muted-2">
        {lead.name}
        {lead.instagram ? ` · ${lead.instagram}` : ""}
      </div>
      <a href={`mailto:${lead.email}`} className="mt-1 block truncate text-[11px] text-gold hover:underline">
        {lead.email}
      </a>
      {lead.goal && (
        <p className="mt-2 line-clamp-3 text-[11px] leading-relaxed text-muted">{lead.goal}</p>
      )}
      <div className="mt-2 flex items-center justify-between text-[10px] text-muted-3">
        <span>{lead.source || "website"}</span>
        <span>{new Date(lead.created_at).toLocaleDateString()}</span>
      </div>
    </div>
  );
}

export default async function CrmPage() {
  const leads = await getLeads().catch(() => [] as Lead[]);
  const byStatus = (s: string) => leads.filter((l) => (l.status || "new") === s);
  const total = leads.length;

  return (
    <PageShell className="max-w-none">
      <PageHeader
        title="CRM / Leads"
        subtitle={
          total > 0
            ? `${total} lead${total === 1 ? "" : "s"} · live from Supabase`
            : "Live from Supabase — leads appear here as they come in"
        }
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

      {total === 0 && (
        <div className="mt-6 grid place-items-center rounded-[12px] border border-dashed border-line bg-card/40 py-16 text-center">
          <p className="text-[14px] font-medium text-ink-2">No leads yet</p>
          <p className="mt-1 max-w-md text-[12px] text-muted-2">
            New submissions to <code className="text-gold">POST /api/leads</code> land here
            instantly and email your team.
          </p>
        </div>
      )}

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
