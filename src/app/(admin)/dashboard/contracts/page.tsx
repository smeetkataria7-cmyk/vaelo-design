import Link from "next/link";
import { Plus, ShieldCheck } from "lucide-react";

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
import { listContracts, type Contract } from "@/lib/contracts";

export const dynamic = "force-dynamic";

const STATUS_TONE: Record<Contract["status"], ChipTone> = {
  sent: "warning",
  signed: "success",
};

export default async function ContractsPage() {
  const contracts = await listContracts().catch(() => [] as Contract[]);
  const sent = contracts.filter((c) => c.status === "sent").length;
  const signed = contracts.filter((c) => c.status === "signed").length;

  const stats = [
    { label: "Total", value: contracts.length, color: "var(--ink)" },
    { label: "Awaiting signature", value: sent, color: "var(--warning)" },
    { label: "Signed", value: signed, color: "var(--success)" },
  ];

  return (
    <PageShell>
      <PageHeader
        title="Contracts"
        subtitle={
          contracts.length
            ? `${contracts.length} agreements · e-signature enabled`
            : "Send an agreement and track its signature here"
        }
        actions={
          <Button asChild size="sm">
            <Link href="/dashboard/contracts/new">
              <Plus className="size-4" /> New contract
            </Link>
          </Button>
        }
      />

      {/* Stat strip */}
      <div className="mt-6 grid grid-cols-3 overflow-hidden rounded-[12px] border border-line bg-card">
        {stats.map((s, i) => (
          <div key={s.label} className={`px-4 py-5 text-center ${i > 0 ? "border-l border-line-2" : ""}`}>
            <div className="font-display text-[26px] font-semibold" style={{ color: s.color }}>
              {s.value}
            </div>
            <div className="eyebrow !text-muted-2 mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {contracts.length === 0 ? (
        <div className="mt-5 grid place-items-center rounded-[12px] border border-dashed border-line bg-card/40 py-16 text-center">
          <p className="text-[14px] font-medium text-ink-2">No contracts yet</p>
          <p className="mt-1 text-[12px] text-muted-2">
            Create one and your client signs it from their portal.
          </p>
        </div>
      ) : (
        <Card className="mt-5 overflow-hidden p-0">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>Agreement / Client</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Sent</TableHead>
                <TableHead>Signed</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contracts.map((c) => (
                <TableRow key={c.id}>
                  <TableCell>
                    <div className="text-[13px] font-medium text-ink">{c.title}</div>
                    <div className="text-[11px] text-muted-2">{c.client_name || c.client_email}</div>
                  </TableCell>
                  <TableCell>
                    <StatusChip tone={STATUS_TONE[c.status]} className="capitalize">
                      {c.status}
                    </StatusChip>
                  </TableCell>
                  <TableCell className="text-muted-2">
                    {new Date(c.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell className={c.status === "signed" ? "text-success" : "text-muted-2"}>
                    {c.signed_at
                      ? `${new Date(c.signed_at).toLocaleDateString()}${c.signer_name ? ` · ${c.signer_name}` : ""}`
                      : "—"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}

      {/* E-signature callout */}
      <div className="mt-5 flex flex-wrap items-center gap-4 rounded-[12px] border border-gold/25 bg-gold/[0.06] p-4">
        <ShieldCheck className="size-5 text-gold" />
        <div className="flex-1">
          <div className="text-[13px] font-medium text-ink">Legally-binding e-signatures</div>
          <div className="text-[12px] text-muted">
            Clients sign in their portal · audit trail + timestamp stored automatically
          </div>
        </div>
      </div>
    </PageShell>
  );
}
