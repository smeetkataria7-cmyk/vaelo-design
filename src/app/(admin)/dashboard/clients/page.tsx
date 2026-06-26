import { Plus, Search, LayoutGrid, List } from "lucide-react";

import { PageHeader, PageShell } from "@/components/app/page-header";
import { AccentAvatar } from "@/components/app/accent-avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { StatusChip } from "@/components/status-chip";
import { clients } from "@/lib/mock";

export default function ClientsPage() {
  const totalStudies = clients.reduce((s, c) => s + c.caseStudies, 0);

  return (
    <PageShell>
      <PageHeader
        title="Clients"
        subtitle={`${clients.length} active · 342 total assets · ${totalStudies} case studies`}
        actions={
          <Button size="sm">
            <Plus className="size-4" /> New client
          </Button>
        }
      />

      {/* Filter row */}
      <div className="mt-6 flex items-center gap-3">
        <div className="relative max-w-xs flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-3" strokeWidth={1.7} />
          <input
            placeholder="Search clients…"
            className="h-9 w-full rounded-lg border border-line bg-input-bg pl-9 pr-3 text-[13px] text-ink placeholder:text-muted-2 outline-none focus-visible:border-gold/50"
          />
        </div>
        <Button variant="secondary" size="sm" className="text-muted">
          Sort: Name A–Z
        </Button>
        <div className="ml-auto flex items-center rounded-lg border border-line bg-input-bg p-0.5">
          <button className="grid size-7 place-items-center rounded-md bg-surface-4 text-ink">
            <LayoutGrid className="size-4" />
          </button>
          <button className="grid size-7 place-items-center rounded-md text-muted hover:text-ink">
            <List className="size-4" />
          </button>
        </div>
      </div>

      {/* Card grid */}
      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {clients.map((c) => (
          <Card
            key={c.key}
            className="group relative cursor-pointer items-center p-6 text-center transition-all duration-150 hover:border-gold/40 hover:shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
          >
            {c.active && (
              <StatusChip tone="gold" className="absolute left-4 top-4">
                Active
              </StatusChip>
            )}
            <AccentAvatar initial={c.initial} color={c.accent} size={52} className="mx-auto" />
            <div className="mt-3 font-display text-[16px] text-ink">{c.name}</div>
            <div className="eyebrow mt-1">{c.category}</div>
            <div className="mt-5 grid w-full grid-cols-2 divide-x divide-line-2 border-t border-line-2 pt-4">
              <div>
                <div className="font-display text-[20px] text-ink">{c.creatives}</div>
                <div className="eyebrow !text-muted-2 mt-0.5">Creatives</div>
              </div>
              <div>
                <div className="font-display text-[20px] text-ink">
                  {c.caseStudies || "—"}
                </div>
                <div className="eyebrow !text-muted-2 mt-0.5">
                  {c.caseStudies === 1 ? "Case Study" : "Case Studies"}
                </div>
              </div>
            </div>
          </Card>
        ))}

        {/* Add new */}
        <button className="grid min-h-[220px] place-items-center rounded-[12px] border border-dashed border-line text-muted-2 transition-colors hover:border-gold/40 hover:text-gold">
          <div className="flex flex-col items-center gap-2">
            <div className="grid size-11 place-items-center rounded-full border border-dashed border-current">
              <Plus className="size-5" />
            </div>
            <span className="text-[13px]">Add new client</span>
            <span className="text-[11px] text-muted-3">+ New client</span>
          </div>
        </button>
      </div>
    </PageShell>
  );
}
