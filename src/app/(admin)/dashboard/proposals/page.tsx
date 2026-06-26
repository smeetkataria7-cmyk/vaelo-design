import { Plus, Sparkles, ArrowRight } from "lucide-react";

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
import { proposals, proposalPipeline, type ProposalStatus } from "@/lib/mock";
import { formatINR } from "@/lib/utils";

const STATUS_TONE: Record<ProposalStatus, ChipTone> = {
  draft: "neutral",
  sent: "warning",
  viewed: "info",
  accepted: "success",
  declined: "error",
};

const PIPELINE_TONE: Record<string, string> = {
  Draft: "var(--muted)",
  Sent: "var(--warning)",
  Viewed: "var(--info)",
  Accepted: "var(--success)",
  Declined: "var(--error)",
};

export default function ProposalsPage() {
  return (
    <PageShell>
      <PageHeader
        title="Proposals"
        subtitle="4 total · 1 awaiting response · ₹1.8L in accepted proposals"
        actions={
          <Button size="sm">
            <Plus className="size-4" /> New proposal
          </Button>
        }
      />

      {/* Pipeline strip */}
      <div className="mt-6 grid grid-cols-5 overflow-hidden rounded-[12px] border border-line bg-card">
        {proposalPipeline.map((p, i) => (
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
              <TableHead>Client / Title</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Sent</TableHead>
              <TableHead>Views</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {proposals.map((p) => (
              <TableRow key={p.id}>
                <TableCell>
                  <div className="text-[13px] font-medium text-ink">{p.title}</div>
                  <div className="text-[11px] text-muted-2">{p.clientName}</div>
                </TableCell>
                <TableCell className="text-right font-display text-gold">
                  {formatINR(p.monthly)}
                  <span className="text-[11px] text-muted-2">/mo</span>
                </TableCell>
                <TableCell>
                  <StatusChip tone={STATUS_TONE[p.status]} className="capitalize">
                    {p.status}
                  </StatusChip>
                </TableCell>
                <TableCell className="text-muted-2">{p.sent ?? "—"}</TableCell>
                <TableCell className="text-muted-2">
                  {p.views ? `${p.views}×` : "—"}
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="secondary" size="sm">
                    {p.status === "draft" ? "Send" : p.status === "viewed" ? "Edit" : "View"}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* AI callout */}
      <div className="mt-5 flex flex-wrap items-center gap-4 rounded-[12px] border border-gold/25 bg-gold/[0.06] p-4">
        <Sparkles className="size-5 text-gold" />
        <div className="flex-1">
          <div className="text-[13px] font-medium text-ink">
            AI Proposal Draft ready for Spice Route
          </div>
          <div className="text-[12px] text-muted">
            Generated from Brand Brain · scope + pricing pre-filled
          </div>
        </div>
        <Button size="sm">
          Review draft <ArrowRight className="size-4" />
        </Button>
      </div>
    </PageShell>
  );
}
