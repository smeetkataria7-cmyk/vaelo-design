import { Plus, FileSignature, Download, ShieldCheck, ArrowRight } from "lucide-react";

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
import { contracts, contractPipeline, type ContractStatus } from "@/lib/mock";
import { formatINR } from "@/lib/utils";

const STATUS_TONE: Record<ContractStatus, ChipTone> = {
  draft: "neutral",
  sent: "warning",
  signed: "success",
  expired: "error",
};

const PIPELINE_TONE: Record<string, string> = {
  Draft: "var(--muted)",
  Sent: "var(--warning)",
  Signed: "var(--success)",
  Expired: "var(--error)",
};

export default function ContractsPage() {
  const totalSigned = contracts
    .filter((c) => c.status === "signed")
    .reduce((s, c) => s + c.value, 0);

  return (
    <PageShell>
      <PageHeader
        title="Contracts"
        subtitle={`${contracts.length} agreements · ${formatINR(totalSigned)} signed value · e-signature enabled`}
        actions={
          <>
            <Button variant="secondary" size="sm">
              <Download className="size-4" /> Export
            </Button>
            <Button size="sm">
              <Plus className="size-4" /> New contract
            </Button>
          </>
        }
      />

      {/* Pipeline strip */}
      <div className="mt-6 grid grid-cols-4 overflow-hidden rounded-[12px] border border-line bg-card">
        {contractPipeline.map((p, i) => (
          <div
            key={p.label}
            className={`px-4 py-5 text-center ${i > 0 ? "border-l border-line-2" : ""}`}
          >
            <div
              className="font-display text-[26px] font-semibold"
              style={{ color: PIPELINE_TONE[p.label] }}
            >
              {p.value}
            </div>
            <div className="eyebrow !text-muted-2 mt-1">{p.label}</div>
          </div>
        ))}
      </div>

      {/* Table */}
      <Card className="mt-5 overflow-hidden p-0">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>Agreement / Client</TableHead>
              <TableHead className="text-right">Value</TableHead>
              <TableHead>Term</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Sent</TableHead>
              <TableHead>Signed</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {contracts.map((c) => (
              <TableRow key={c.id} className={c.status === "expired" ? "bg-error/[0.04]" : ""}>
                <TableCell>
                  <div className="text-[13px] font-medium text-ink">{c.title}</div>
                  <div className="text-[11px] text-muted-2">
                    {c.clientName}
                    {c.note && <span> · {c.note}</span>}
                  </div>
                </TableCell>
                <TableCell className="text-right font-display text-ink">
                  {formatINR(c.value)}
                </TableCell>
                <TableCell className="text-muted-2">{c.term}</TableCell>
                <TableCell>
                  <StatusChip tone={STATUS_TONE[c.status]} className="capitalize">
                    {c.status}
                  </StatusChip>
                </TableCell>
                <TableCell className="text-muted-2">{c.sent ?? "—"}</TableCell>
                <TableCell className={c.status === "signed" ? "text-success" : "text-muted-2"}>
                  {c.signed ?? "—"}
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="secondary" size="sm">
                    {c.status === "draft" ? "Send" : c.status === "expired" ? "Renew" : "View"}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* E-signature callout */}
      <div className="mt-5 flex flex-wrap items-center gap-4 rounded-[12px] border border-gold/25 bg-gold/[0.06] p-4">
        <ShieldCheck className="size-5 text-gold" />
        <div className="flex-1">
          <div className="text-[13px] font-medium text-ink">
            Legally-binding e-signatures
          </div>
          <div className="text-[12px] text-muted">
            Clients sign in their portal · audit trail + timestamp stored automatically
          </div>
        </div>
        <Button size="sm">
          <FileSignature className="size-4" /> Send for signature <ArrowRight className="size-4" />
        </Button>
      </div>
    </PageShell>
  );
}
