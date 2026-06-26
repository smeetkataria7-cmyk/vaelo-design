import { Plus, FileDown, MoreVertical } from "lucide-react";

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
import { invoices, invoiceStats, type InvoiceStatus } from "@/lib/mock";
import { formatINR } from "@/lib/utils";

const STATUS_TONE: Record<InvoiceStatus, ChipTone> = {
  draft: "neutral",
  sent: "warning",
  paid: "success",
  overdue: "error",
  void: "neutral",
};

export default function InvoicingPage() {
  const stat = invoiceStats;
  return (
    <PageShell>
      <PageHeader
        title="Invoicing"
        subtitle="Razorpay · INR · GST included"
        actions={
          <>
            <Button variant="secondary" size="sm">
              <FileDown className="size-4" /> Export PDF
            </Button>
            <Button size="sm">
              <Plus className="size-4" /> New invoice
            </Button>
          </>
        }
      />

      {/* Overview cards */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card className="gap-2 p-5">
          <div className="eyebrow">Outstanding</div>
          <div className="font-display text-[30px] font-semibold text-ink">
            {formatINR(stat.outstanding.amount)}
          </div>
          <div className="text-[12px] text-muted-2">{stat.outstanding.note}</div>
        </Card>
        <Card className="gap-2 p-5">
          <div className="eyebrow">Overdue</div>
          <div className="font-display text-[30px] font-semibold text-error">
            {formatINR(stat.overdue.amount)}
          </div>
          <div className="text-[12px] text-error/80">{stat.overdue.note}</div>
        </Card>
        <Card className="gap-2 p-5">
          <div className="eyebrow">Paid This Month</div>
          <div className="font-display text-[30px] font-semibold text-success">
            {formatINR(stat.paidThisMonth.amount)}
          </div>
          <div className="text-[12px] text-muted-2">{stat.paidThisMonth.note}</div>
        </Card>
        <Card className="gap-2 p-5">
          <div className="eyebrow">Retainers</div>
          <div className="font-display text-[30px] font-semibold text-gold">
            {stat.retainers.count}
          </div>
          <div className="text-[12px] text-muted-2">{stat.retainers.note}</div>
        </Card>
      </div>

      {/* Table */}
      <Card className="mt-5 overflow-hidden p-0">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>Invoice #</TableHead>
              <TableHead>Client</TableHead>
              <TableHead className="text-right">Amount (incl. GST)</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Type</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((inv) => (
              <TableRow key={inv.id} className={inv.status === "overdue" ? "bg-error/[0.04]" : ""}>
                <TableCell className="font-medium text-ink">{inv.number}</TableCell>
                <TableCell>
                  <div className="text-[13px] text-ink">{inv.clientName}</div>
                  <div className="text-[11px] text-muted-2">{inv.memo}</div>
                </TableCell>
                <TableCell className="text-right font-display text-ink">
                  {formatINR(inv.total)}
                </TableCell>
                <TableCell className={inv.status === "overdue" ? "text-error" : "text-muted-2"}>
                  {inv.due ?? "—"}
                  {inv.dueNote && <span className="ml-1 text-[11px]">· {inv.dueNote}</span>}
                </TableCell>
                <TableCell>
                  <StatusChip tone={STATUS_TONE[inv.status]} className="capitalize">
                    {inv.status}
                  </StatusChip>
                </TableCell>
                <TableCell className="text-muted-2">{inv.type}</TableCell>
                <TableCell>
                  <button className="grid size-7 place-items-center rounded-md text-muted-3 hover:bg-surface-3 hover:text-ink">
                    <MoreVertical className="size-4" />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Razorpay footer */}
      <div className="mt-5 flex flex-wrap items-center gap-3 rounded-[12px] border border-line bg-card p-4">
        <div className="grid size-8 place-items-center rounded-lg bg-[#3395ff] text-[13px] font-bold text-white">
          ₹
        </div>
        <div className="text-[12px] text-muted">
          <span className="font-medium text-ink">Razorpay connected</span> · UPI · Cards · Netbanking · Subscriptions · Auto-reminders active
        </div>
        <StatusChip tone="success" className="ml-auto">
          Live
        </StatusChip>
      </div>
    </PageShell>
  );
}
