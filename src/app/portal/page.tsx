import Link from "next/link";
import { ChevronRight, AlertCircle, CheckSquare, PenLine, FileText } from "lucide-react";

import { AccentAvatar } from "@/components/app/accent-avatar";
import { Button } from "@/components/ui/button";
import { StatusChip } from "@/components/status-chip";
import { getViewer } from "@/lib/auth";
import { getInvoicesForEmail } from "@/lib/invoices";
import { getContractsForEmail } from "@/lib/contracts";
import { getProjectsForEmail } from "@/lib/projects";
import { listFilesForEmail } from "@/lib/files";
import { getProposalsForEmail } from "@/lib/proposals";
import { accentFor } from "@/lib/accent";
import { formatINR } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function PortalHome() {
  const { email } = await getViewer();
  const [invoices, contracts, projects, files, proposals] = await Promise.all([
    getInvoicesForEmail(email ?? "").catch(() => []),
    getContractsForEmail(email ?? "").catch(() => []),
    getProjectsForEmail(email ?? "").catch(() => []),
    listFilesForEmail(email ?? "").catch(() => []),
    getProposalsForEmail(email ?? "").catch(() => []),
  ]);

  const name =
    invoices[0]?.client_name ||
    contracts[0]?.client_name ||
    projects[0]?.client_name ||
    proposals[0]?.client_name ||
    (email ? email.split("@")[0] : "there");

  const dueInvoice = invoices.find((i) => i.status === "sent" || i.status === "overdue" || i.status === "draft");
  const pendingFiles = files.filter((f) => f.status === "pending");
  const toSign = contracts.filter((c) => c.status === "sent");
  const openProposals = proposals.filter((p) => p.status === "sent" || p.status === "viewed");

  return (
    <div className="pb-6">
      {/* Greeting */}
      <div className="flex items-center gap-3 px-5 pb-4 pt-5">
        <AccentAvatar initial={(name[0] || "?").toUpperCase()} color={accentFor(email ?? name)} size={44} />
        <div className="min-w-0">
          <div className="truncate text-[15px] font-semibold text-ink">{name}</div>
          <div className="truncate text-[12px] text-muted-2">{email}</div>
        </div>
      </div>

      {/* Invoice due */}
      {dueInvoice && (
        <div className="mx-5 mt-1 flex items-center gap-3 rounded-[14px] border border-error/25 bg-error/[0.06] p-4">
          <AlertCircle className="size-5 shrink-0 text-error" />
          <div className="flex-1">
            <div className="text-[13px] font-medium text-ink">Invoice {dueInvoice.number}</div>
            <div className="text-[12px] text-muted-2">
              {formatINR(dueInvoice.total)}
              {dueInvoice.due_date ? ` · due ${new Date(dueInvoice.due_date).toLocaleDateString()}` : ""}
            </div>
          </div>
          <Button asChild size="sm" className="h-8 bg-info text-white hover:bg-info/90">
            <Link href="/portal/bills">View</Link>
          </Button>
        </div>
      )}

      {/* Action cards */}
      <div className="mt-4 space-y-3 px-5">
        <Link
          href="/portal/proposals"
          className="flex items-center gap-3 rounded-[14px] border border-line bg-card p-4 transition-colors hover:border-gold/40"
        >
          <FileText className="size-5 text-gold" />
          <div className="flex-1">
            <div className="text-[13px] font-medium text-ink">Proposals</div>
            <div className="text-[12px] text-muted-2">{openProposals.length} to review</div>
          </div>
          {openProposals.length > 0 && <StatusChip tone="warning">{openProposals.length}</StatusChip>}
          <ChevronRight className="size-4 text-muted-3" />
        </Link>

        <Link
          href="/portal/approve"
          className="flex items-center gap-3 rounded-[14px] border border-line bg-card p-4 transition-colors hover:border-gold/40"
        >
          <CheckSquare className="size-5 text-gold" />
          <div className="flex-1">
            <div className="text-[13px] font-medium text-ink">Approvals</div>
            <div className="text-[12px] text-muted-2">{pendingFiles.length} awaiting your review</div>
          </div>
          {pendingFiles.length > 0 && <StatusChip tone="warning">{pendingFiles.length}</StatusChip>}
          <ChevronRight className="size-4 text-muted-3" />
        </Link>

        <Link
          href="/portal/sign"
          className="flex items-center gap-3 rounded-[14px] border border-line bg-card p-4 transition-colors hover:border-gold/40"
        >
          <PenLine className="size-5 text-gold" />
          <div className="flex-1">
            <div className="text-[13px] font-medium text-ink">Agreements</div>
            <div className="text-[12px] text-muted-2">{toSign.length} to sign</div>
          </div>
          {toSign.length > 0 && <StatusChip tone="warning">{toSign.length}</StatusChip>}
          <ChevronRight className="size-4 text-muted-3" />
        </Link>
      </div>

      {/* Projects */}
      <div className="mt-6 px-5">
        <h2 className="text-[14px] font-semibold text-ink">Your projects</h2>
        {projects.length === 0 ? (
          <p className="mt-2 text-[12px] text-muted-2">No active projects yet.</p>
        ) : (
          <div className="mt-3 space-y-2.5">
            {projects.map((p) => (
              <div key={p.id} className="flex items-center justify-between rounded-[12px] border border-line bg-card p-3.5">
                <span className="text-[13px] text-ink">{p.title}</span>
                <StatusChip tone={p.status === "active" ? "success" : "neutral"} className="capitalize">
                  {p.status}
                </StatusChip>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
