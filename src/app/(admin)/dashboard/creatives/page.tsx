import { Plus, Search, Upload, Play, Check, Clock } from "lucide-react";

import { PageHeader, PageShell } from "@/components/app/page-header";
import { Button } from "@/components/ui/button";
import { StatusChip, type ChipTone } from "@/components/status-chip";
import { creativeLibrary, creativeStats, type CreativeStatus } from "@/lib/mock";

const STATUS: Record<CreativeStatus, { tone: ChipTone; label: string }> = {
  approved: { tone: "success", label: "Approved" },
  in_review: { tone: "warning", label: "In review" },
  delivered: { tone: "info", label: "Delivered" },
  draft: { tone: "neutral", label: "Draft" },
};

export default function CreativesPage() {
  return (
    <PageShell>
      <PageHeader
        title="Creatives"
        subtitle={`${creativeLibrary.length} assets · versions, approvals & delivery`}
        actions={
          <>
            <Button variant="secondary" size="sm">
              <Upload className="size-4" /> Upload
            </Button>
            <Button size="sm">
              <Plus className="size-4" /> New creative
            </Button>
          </>
        }
      />

      {/* Stat strip */}
      <div className="mt-6 grid grid-cols-2 overflow-hidden rounded-[12px] border border-line bg-card sm:grid-cols-4">
        {creativeStats.map((s, i) => (
          <div
            key={s.label}
            className={`px-4 py-4 ${i > 0 ? "border-l border-line-2" : ""}`}
          >
            <div className="font-display text-[24px] font-semibold text-ink">{s.value}</div>
            <div className="mt-0.5 flex items-center gap-1.5">
              <StatusChip tone={s.tone} className="!px-1.5">{s.label}</StatusChip>
            </div>
          </div>
        ))}
      </div>

      {/* Filter row */}
      <div className="mt-5 flex items-center gap-3">
        <div className="relative max-w-xs flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-3" strokeWidth={1.7} />
          <input
            placeholder="Search creatives…"
            className="h-9 w-full rounded-lg border border-line bg-input-bg pl-9 pr-3 text-[13px] text-ink placeholder:text-muted-2 outline-none focus-visible:border-gold/50"
          />
        </div>
        <Button variant="secondary" size="sm" className="text-muted">
          All clients
        </Button>
        <Button variant="secondary" size="sm" className="text-muted">
          All types
        </Button>
      </div>

      {/* Gallery */}
      <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {creativeLibrary.map((c) => {
          const s = STATUS[c.status];
          return (
            <div
              key={c.id}
              className="group overflow-hidden rounded-[12px] border border-line bg-card transition-all duration-150 hover:border-gold/40 hover:shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
            >
              <div
                className="relative aspect-square w-full"
                style={{ background: `linear-gradient(150deg, ${c.grad[0]}, ${c.grad[1]})` }}
              >
                <span className="absolute left-2 top-2">
                  <StatusChip tone={s.tone}>{s.label}</StatusChip>
                </span>
                <span className="absolute right-2 top-2 rounded bg-black/45 px-1.5 py-0.5 text-[9px] font-semibold text-white">
                  V{c.version}
                </span>
                {c.duration && (
                  <span className="absolute bottom-2 right-2 flex items-center gap-1 rounded bg-black/55 px-1.5 py-0.5 text-[9px] font-medium text-white">
                    <Play className="size-2.5" /> {c.duration}
                  </span>
                )}
                <span className="absolute bottom-2 left-2 rounded bg-black/45 px-1.5 py-0.5 text-[9px] font-medium text-white">
                  {c.kind}
                </span>
              </div>
              <div className="p-3">
                <div className="truncate text-[12.5px] font-medium text-ink">{c.title}</div>
                <div className="mt-1 flex items-center justify-between">
                  <span className="truncate text-[11px] text-muted-2">{c.clientName}</span>
                  <span className="text-muted-3">
                    {c.status === "in_review" ? (
                      <Clock className="size-3.5" />
                    ) : c.status === "draft" ? null : (
                      <Check className="size-3.5 text-success" />
                    )}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </PageShell>
  );
}
