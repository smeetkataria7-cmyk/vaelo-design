import { FileText, ExternalLink } from "lucide-react";

import { PageHeader, PageShell } from "@/components/app/page-header";
import { Card } from "@/components/ui/card";
import { StatusChip, type ChipTone } from "@/components/status-chip";
import { listAllFiles, type FileRec } from "@/lib/files";

export const dynamic = "force-dynamic";

const TONE: Record<FileRec["status"], ChipTone> = {
  pending: "warning",
  approved: "success",
  revision: "error",
};

export default async function CreativesPage() {
  const files = await listAllFiles().catch(() => [] as FileRec[]);
  const count = (s: FileRec["status"]) => files.filter((f) => f.status === s).length;

  const stats = [
    { label: "Pending", value: count("pending"), tone: "var(--warning)" },
    { label: "Approved", value: count("approved"), tone: "var(--success)" },
    { label: "Revisions", value: count("revision"), tone: "var(--error)" },
    { label: "Total", value: files.length, tone: "var(--ink)" },
  ];

  return (
    <PageShell>
      <PageHeader
        title="Creatives"
        subtitle={files.length ? `${files.length} deliverables across clients` : "Client deliverables appear here"}
      />

      <div className="mt-6 grid grid-cols-2 overflow-hidden rounded-[12px] border border-line bg-card sm:grid-cols-4">
        {stats.map((s, i) => (
          <div key={s.label} className={`px-4 py-4 ${i > 0 ? "border-l border-line-2" : ""}`}>
            <div className="font-display text-[24px] font-semibold" style={{ color: s.tone }}>
              {s.value}
            </div>
            <div className="eyebrow !text-muted-2 mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {files.length === 0 ? (
        <div className="mt-5 grid place-items-center rounded-[12px] border border-dashed border-line bg-card/40 py-16 text-center">
          <p className="text-[14px] font-medium text-ink-2">No creatives yet</p>
          <p className="mt-1 text-[12px] text-muted-2">
            Deliver files to clients and they show up here with approval status. (Uploads enable once the storage bucket is live.)
          </p>
        </div>
      ) : (
        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {files.map((f) => (
            <Card key={f.id} className="flex-row items-center gap-3 p-4">
              <div className="grid size-10 shrink-0 place-items-center rounded-lg bg-surface-3 text-muted">
                <FileText className="size-4" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="truncate text-[13px] font-medium text-ink">{f.name}</div>
                <div className="truncate text-[11px] text-muted-2">{f.client_email}</div>
              </div>
              <StatusChip tone={TONE[f.status]} className="capitalize">
                {f.status}
              </StatusChip>
              {f.link && (
                <a href={f.link} target="_blank" rel="noopener noreferrer" className="text-muted-2 hover:text-gold" aria-label="Open">
                  <ExternalLink className="size-4" />
                </a>
              )}
            </Card>
          ))}
        </div>
      )}
    </PageShell>
  );
}
