import { FileText, ExternalLink } from "lucide-react";

import { StatusChip, type ChipTone } from "@/components/status-chip";
import { getViewer } from "@/lib/auth";
import { listFilesForEmail, type FileRec } from "@/lib/files";

export const dynamic = "force-dynamic";

const TONE: Record<FileRec["status"], ChipTone> = {
  pending: "warning",
  approved: "success",
  revision: "error",
};

export default async function PortalVault() {
  const { email } = await getViewer();
  const files = await listFilesForEmail(email ?? "").catch(() => []);

  return (
    <div className="pb-6">
      <div className="px-5 py-5">
        <h1 className="font-display text-[22px] font-semibold text-ink">Asset Vault</h1>
        <p className="text-[12px] text-muted-2">
          {files.length} {files.length === 1 ? "item" : "items"} · your deliverables
        </p>
      </div>

      {files.length === 0 ? (
        <p className="px-5 py-10 text-center text-[12px] text-muted-2">
          Your deliverables will appear here as they&apos;re shared.
        </p>
      ) : (
        <div className="space-y-2.5 px-5">
          {files.map((f) => (
            <div key={f.id} className="flex items-center gap-3 rounded-[12px] border border-line bg-card p-3.5">
              <div className="grid size-9 shrink-0 place-items-center rounded-lg bg-surface-3 text-muted">
                <FileText className="size-4" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="truncate text-[13px] font-medium text-ink">{f.name}</div>
                <div className="text-[11px] text-muted-3">{f.type || "file"}</div>
              </div>
              <StatusChip tone={TONE[f.status]} className="capitalize">
                {f.status}
              </StatusChip>
              {f.link && (
                <a
                  href={f.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="grid size-8 shrink-0 place-items-center rounded-md text-muted-2 hover:bg-surface-3 hover:text-gold"
                  aria-label="Open"
                >
                  <ExternalLink className="size-4" />
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
