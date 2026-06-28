import { Plus } from "lucide-react";

import { PageHeader, PageShell } from "@/components/app/page-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { StatusChip, type ChipTone } from "@/components/status-chip";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { listProposals, type Proposal } from "@/lib/proposals";
import { formatINR } from "@/lib/utils";

export const dynamic = "force-dynamic";

const STATUS_TONE: Record<Proposal["status"], ChipTone> = {
  draft: "neutral",
  sent: "warning",
  viewed: "info",
  accepted: "success",
  declined: "error",
};

const PIPELINE: { key: Proposal["status"]; label: string; color: string }[] = [
  { key: "draft", label: "Draft", color: "var(--muted)" },
  { key: "sent", label: "Sent", color: "var(--warning)" },
  { key: "viewed", label: "Viewed", color: "var(--info)" },
  { key: "accepted", label: "Accepted", color: "var(--success)" },
  { key: "declined", label: "Declined", color: "var(--error)" },
];

export default async function ProposalsPage() {
  const proposals = await listProposals().catch(() => [] as Proposal[]);
  const count = (s: Proposal["status"]) => proposals.filter((p) => p.status === s).length;
  const acceptedValue = proposals
    .filter((p) => p.status === "accepted")
    .reduce((s, p) => s + (p.total || 0), 0);

  return (
    <PageShell>
      <PageHeader
        title="Proposals"
        subtitle={
          proposals.length
            ? `${proposals.length} total · ${formatINR(acceptedValue)} accepted`
            : "Proposals you send appear here"
        }
        actions={
          <Button size="sm">
            <Plus className="size-4" /> New proposal
          </Button>
        }
      />

      {/* Pipeline strip */}
      <div className="mt-6 grid grid-cols-5 overflow-hidden rounded-[12px] border border-line bg-card">
        {PIPELINE.map((p, i) => (
          <div key={p.key} className={`px-4 py-5 text-center ${i > 0 ? "border-l border-line-2" : ""}`}>
            <div className="font-display text-[26px] font-semibold" style={{ color: p.color }}>
              {count(p.key)}
            </div>
            <div className="eyebrow !text-muted-2 mt-1">{p.label}</div>
          </div>
        ))}
      </div>

      {proposals.length === 0 ? (
        <div className="mt-5 grid place-items-center rounded-[12px] border border-dashed border-line bg-card/40 py-16 text-center">
          <p className="text-[14px] font-medium text-ink-2">No proposals yet</p>
          <p className="mt-1 text-[12px] text-muted-2">Create one and it'll show here with its live status.</p>
        </div>
      ) : (
        <Card className="mt-5 overflow-hidden p-0">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>Client / Title</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Sent</TableHead>
                <TableHead>Viewed</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {proposals.map((p) => (
                <TableRow key={p.id}>
                  <TableCell>
                    <div className="text-[13px] font-medium text-ink">{p.title}</div>
                    <div className="text-[11px] text-muted-2">{p.client_name || p.client_email}</div>
                  </TableCell>
                  <TableCell className="text-right font-display text-gold">
                    {formatINR(p.total)}
                  </TableCell>
                  <TableCell>
                    <StatusChip tone={STATUS_TONE[p.status]} className="capitalize">
                      {p.status}
                    </StatusChip>
                  </TableCell>
                  <TableCell className="text-muted-2">
                    {new Date(p.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-muted-2">
                    {p.viewed_at ? new Date(p.viewed_at).toLocaleDateString() : "—"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}
    </PageShell>
  );
}
