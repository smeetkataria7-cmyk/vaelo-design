import Link from "next/link";
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
import { listInvoices, isOverdue, type Invoice } from "@/lib/invoices";
import { formatINR } from "@/lib/utils";

export const dynamic = "force-dynamic";

const STATUS_TONE: Record<Invoice["status"], ChipTone> = {
  draft: "neutral",
  sent: "warning",
  paid: "success",
  overdue: "error",
  void: "neutral",
};

function sameMonth(iso: string | null): boolean {
  if (!iso) return false;
  const d = new Date(iso);
  const n = new Date();
  return d.getFullYear() === n.getFullYear() && d.getMonth() === n.getMonth();
}

export default async function InvoicingPage() {
  const invoices = await listInvoices().catch(() => [] as Invoice[]);
  const open = invoices.filter((i) => i.status === "sent" || i.status === "overdue");
  const outstanding = open.reduce((s, i) => s + i.total, 0);
  const overdueAmt = invoices
    .filter((i) => i.status === "overdue" || isOverdue(i))
    .reduce((s, i) => s + i.total, 0);
  const paidThisMonth = invoices
    .filter((i) => i.status === "paid" && sameMonth(i.paid_at))
    .reduce((s, i) => s + i.total, 0);

  const stats = [
    { label: "Outstanding", value: formatINR(outstanding), tone: "text-ink" },
    { label: "Overdue", value: formatINR(overdueAmt), tone: "text-error" },
    { label: "Paid this month", value: formatINR(paidThisMonth), tone: "text-success" },
    { label: "Invoices", value: String(invoices.length), tone: "text-gold" },
  ];

  return (
    <PageShell>
      <PageHeader
        title="Invoicing"
        subtitle="INR · GST included"
        actions={
          <Button asChild size="sm">
            <Link href="/dashboard/invoicing/new">
              <Plus className="size-4" /> New invoice
            </Link>
          </Button>
        }
      />

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label} className="gap-2 p-5">
            <div className="eyebrow">{s.label}</div>
            <div className={`font-display text-[30px] font-semibold ${s.tone}`}>{s.value}</div>
          </Card>
        ))}
      </div>

      {invoices.length === 0 ? (
        <div className="mt-5 grid place-items-center rounded-[12px] border border-dashed border-line bg-card/40 py-16 text-center">
          <p className="text-[14px] font-medium text-ink-2">No invoices yet</p>
          <p className="mt-1 text-[12px] text-muted-2">Create one and it'll appear here with live status.</p>
        </div>
      ) : (
        <Card className="mt-5 overflow-hidden p-0">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>Invoice #</TableHead>
                <TableHead>Client</TableHead>
                <TableHead className="text-right">Amount (incl. GST)</TableHead>
                <TableHead>Due</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((inv) => {
                const overdue = inv.status === "overdue" || isOverdue(inv);
                return (
                  <TableRow key={inv.id} className={overdue ? "bg-error/[0.04]" : ""}>
                    <TableCell className="font-medium text-ink">{inv.number}</TableCell>
                    <TableCell>
                      <div className="text-[13px] text-ink">{inv.client_name || inv.client_email}</div>
                      {inv.notes && <div className="text-[11px] text-muted-2">{inv.notes}</div>}
                    </TableCell>
                    <TableCell className="text-right font-display text-ink">{formatINR(inv.total)}</TableCell>
                    <TableCell className={overdue ? "text-error" : "text-muted-2"}>
                      {inv.due_date ? new Date(inv.due_date).toLocaleDateString() : "—"}
                    </TableCell>
                    <TableCell>
                      <StatusChip tone={overdue ? "error" : STATUS_TONE[inv.status]} className="capitalize">
                        {overdue ? "overdue" : inv.status}
                      </StatusChip>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Card>
      )}

      <div className="mt-5 flex flex-wrap items-center gap-3 rounded-[12px] border border-line bg-card p-4">
        <div className="grid size-8 place-items-center rounded-lg bg-[#3395ff] text-[13px] font-bold text-white">₹</div>
        <div className="text-[12px] text-muted">
          <span className="font-medium text-ink">Razorpay</span> · online checkout is being set up — invoices are tracked here in the meantime
        </div>
        <StatusChip tone="neutral" className="ml-auto">Setup</StatusChip>
      </div>
    </PageShell>
  );
}
