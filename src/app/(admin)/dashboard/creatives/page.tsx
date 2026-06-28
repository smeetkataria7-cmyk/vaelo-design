import { FileText, ExternalLink, Upload, Download } from "lucide-react";

import { PageHeader, PageShell } from "@/components/app/page-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { StatusChip, type ChipTone } from "@/components/status-chip";
import { listAllFiles, type FileRec } from "@/lib/files";
import { listClientOptions } from "@/lib/clients";
import { deliverFileAction, openFileAction } from "./actions";

export const dynamic = "force-dynamic";

const TONE: Record<FileRec["status"], ChipTone> = {
  pending: "warning",
  approved: "success",
  revision: "error",
};

const field =
  "h-9 rounded-lg border border-line bg-input-bg px-3 text-[13px] text-ink placeholder:text-muted-2 outline-none focus-visible:border-gold/50";

export default async function CreativesPage() {
  const [files, clients] = await Promise.all([
    listAllFiles().catch(() => [] as FileRec[]),
    listClientOptions().catch(() => []),
  ]);
  const count = (s: FileRec["status"]) => files.filter((f) => f.status === s).length;

  const stats = [
    { label: "Pending", value: count("pending"), tone: "var(--warning)" },
    { label: "Approved", value: count("approved"), tone: "var(--success)" },
    { label: "Revisions", value: count("revision"), tone: "var(--error)" },
    { label: "Total", value: files.length, tone: "var(--ink)" },
  ];

  return (
    <PageShell>
      <PageHeader title="Creatives" subtitle="Deliver files to clients for approval" />

      {/* Deliver */}
      <Card className="mt-6 gap-4 p-5">
        <div className="flex items-center gap-2">
          <Upload className="size-4 text-gold" />
          <div className="text-[14px] font-semibold text-ink">Deliver a file</div>
        </div>
        <form action={deliverFileAction} className="flex flex-wrap items-end gap-3">
          <div className="min-w-[220px] flex-1">
            <label className="eyebrow !text-muted-2">Client email</label>
            <input name="client_email" type="email" required list="clients-email" placeholder="client@brand.com" className={`mt-1.5 w-full ${field}`} />
          </div>
          <div>
            <label className="eyebrow !text-muted-2">Upload file</label>
            <input name="file" type="file" className={`mt-1.5 ${field} py-1.5 file:mr-2 file:rounded file:border-0 file:bg-surface-3 file:px-2 file:py-1 file:text-ink`} />
          </div>
          <Button type="submit" size="sm" className="h-9">
            <Upload className="size-4" /> Deliver
          </Button>
        </form>
        <p className="text-[11px] text-muted-2">
          Goes to the client&apos;s Vault &amp; Approvals. (Requires the <code className="text-gold">client-files</code> storage bucket — see storage.sql.)
        </p>
      </Card>

      <div className="mt-5 grid grid-cols-2 overflow-hidden rounded-[12px] border border-line bg-card sm:grid-cols-4">
        {stats.map((s, i) => (
          <div key={s.label} className={`px-4 py-4 ${i > 0 ? "border-l border-line-2" : ""}`}>
            <div className="font-display text-[24px] font-semibold" style={{ color: s.tone }}>{s.value}</div>
            <div className="eyebrow !text-muted-2 mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {files.length === 0 ? (
        <div className="mt-5 grid place-items-center rounded-[12px] border border-dashed border-line bg-card/40 py-16 text-center">
          <p className="text-[14px] font-medium text-ink-2">No creatives delivered yet</p>
          <p className="mt-1 text-[12px] text-muted-2">Deliver a file above and it appears here with approval status.</p>
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
              <StatusChip tone={TONE[f.status]} className="capitalize">{f.status}</StatusChip>
              {f.link ? (
                <a href={f.link} target="_blank" rel="noopener noreferrer" className="text-muted-2 hover:text-gold" aria-label="Open">
                  <ExternalLink className="size-4" />
                </a>
              ) : f.path ? (
                <form action={openFileAction.bind(null, f.id)}>
                  <button type="submit" className="grid size-7 place-items-center rounded-md text-muted-2 hover:bg-surface-3 hover:text-gold" aria-label="Download">
                    <Download className="size-4" />
                  </button>
                </form>
              ) : null}
            </Card>
          ))}
        </div>
      )}

      <datalist id="clients-email">
        {clients.map((c) => <option key={c.email} value={c.email} />)}
      </datalist>
    </PageShell>
  );
}
