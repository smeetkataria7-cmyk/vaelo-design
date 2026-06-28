import { redirect } from "next/navigation";
import { Plus } from "lucide-react";

import { getViewer } from "@/lib/auth";
import { listFinanceEntries, computeMonthly } from "@/lib/finance";
import { listInvoices } from "@/lib/invoices";
import { PageHeader, PageShell } from "@/components/app/page-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { StatusChip } from "@/components/status-chip";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatINR } from "@/lib/utils";
import { addFinanceEntryAction, deleteFinanceEntryAction } from "./actions";

export const dynamic = "force-dynamic";

const field =
  "h-9 rounded-lg border border-line bg-input-bg px-3 text-[13px] text-ink placeholder:text-muted-2 outline-none focus-visible:border-gold/50";

export default async function FinancePage() {
  const viewer = await getViewer();
  if (!viewer.isSuper) redirect("/dashboard");

  const [entries, invoices] = await Promise.all([
    listFinanceEntries().catch(() => []),
    listInvoices().catch(() => []),
  ]);

  const invoiceIncomes = invoices
    .filter((i) => i.status === "paid")
    .map((i) => ({ amount: i.total, date: i.paid_at || i.created_at }));

  const { points, totals } = computeMonthly(entries, invoiceIncomes, 12);
  const margin = totals.income > 0 ? Math.round((totals.net / totals.income) * 100) : 0;
  const maxMonth = Math.max(1, ...points.map((p) => Math.max(p.income, p.expense)));

  const cards = [
    { label: "Income (12 mo)", value: formatINR(totals.income), tone: "text-success" },
    { label: "Expenses (12 mo)", value: formatINR(totals.expense), tone: "text-error" },
    { label: "Net", value: formatINR(totals.net), tone: totals.net >= 0 ? "text-success" : "text-error" },
    { label: "Margin", value: `${margin}%`, tone: "text-ink" },
  ];

  return (
    <PageShell>
      <PageHeader title="Finance" subtitle="Profit & loss · paid invoices count as income · INR" />

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((c) => (
          <Card key={c.label} className="gap-2 p-5">
            <div className="eyebrow">{c.label}</div>
            <div className={`font-display text-[30px] font-semibold ${c.tone}`}>{c.value}</div>
          </Card>
        ))}
      </div>

      {/* Monthly income vs expense */}
      <Card className="mt-5 gap-4 p-5">
        <div className="flex items-center justify-between">
          <div className="text-[14px] font-semibold text-ink">Income vs Expenses</div>
          <div className="flex items-center gap-4 text-[11px]">
            <span className="flex items-center gap-1.5 text-muted"><span className="size-2.5 rounded-sm bg-success" /> Income</span>
            <span className="flex items-center gap-1.5 text-muted"><span className="size-2.5 rounded-sm bg-error" /> Expense</span>
          </div>
        </div>
        <div className="grid grid-cols-12 gap-2">
          {points.map((p) => (
            <div key={p.key} className="flex flex-col items-center gap-2">
              <div className="flex h-36 w-full items-end justify-center gap-0.5">
                <div className="w-1/2 rounded-t-[2px] bg-success" style={{ height: `${(p.income / maxMonth) * 100}%` }} title={formatINR(p.income)} />
                <div className="w-1/2 rounded-t-[2px] bg-error/70" style={{ height: `${(p.expense / maxMonth) * 100}%` }} title={formatINR(p.expense)} />
              </div>
              <div className="text-[9px] text-muted-3">{p.label.split(" ")[0]}</div>
            </div>
          ))}
        </div>
      </Card>

      {/* Add entry */}
      <Card className="mt-5 gap-4 p-5">
        <div className="text-[14px] font-semibold text-ink">Add income / expense</div>
        <form action={addFinanceEntryAction} className="flex flex-wrap items-end gap-3">
          <input name="label" required placeholder="Label (e.g. Claude API)" className={`${field} min-w-[200px] flex-1`} />
          <input name="amount" required placeholder="Amount ₹" className={`${field} w-32`} />
          <select name="kind" defaultValue="expense" className={field}>
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
          <label className="flex h-9 items-center gap-2 text-[12px] text-muted">
            <input type="checkbox" name="recurring" className="accent-gold" /> Recurring
          </label>
          <input name="months" type="number" min={1} defaultValue={6} className={`${field} w-20`} title="Months (if recurring)" />
          <input name="start_date" type="date" className={field} />
          <Button type="submit" size="sm" className="h-9">
            <Plus className="size-4" /> Add
          </Button>
        </form>
      </Card>

      {/* Entries */}
      {entries.length > 0 && (
        <Card className="mt-5 overflow-hidden p-0">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>Label</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>Recurring</TableHead>
                <TableHead>Start</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {entries.map((e) => (
                <TableRow key={e.id}>
                  <TableCell className="font-medium text-ink">{e.label}</TableCell>
                  <TableCell>
                    <StatusChip tone={e.kind === "income" ? "success" : "error"} className="capitalize">
                      {e.kind}
                    </StatusChip>
                  </TableCell>
                  <TableCell className="text-right font-display text-ink">{formatINR(e.amount)}</TableCell>
                  <TableCell className="text-muted-2">{e.recurring ? `${e.months} mo` : "one-off"}</TableCell>
                  <TableCell className="text-muted-2">{new Date(e.start_date).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <form action={deleteFinanceEntryAction.bind(null, e.id)}>
                      <Button type="submit" variant="ghost" size="sm" className="text-error hover:text-error">
                        Delete
                      </Button>
                    </form>
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
