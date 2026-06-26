import { Download, TrendingUp, Wallet } from "lucide-react";

import { PageHeader, PageShell } from "@/components/app/page-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { StatusChip } from "@/components/status-chip";
import {
  financeStats,
  revenueByClient,
  monthlyRevenue,
  expenseBreakdown,
} from "@/lib/mock";
import { formatINR, formatINRCompact } from "@/lib/utils";

export default function FinancePage() {
  const maxClient = Math.max(...revenueByClient.map((r) => r.amount));
  const maxMonth = Math.max(...monthlyRevenue.map((m) => m.revenue));
  const totalExpenses = expenseBreakdown.reduce((s, e) => s + e.amount, 0);

  return (
    <PageShell>
      <PageHeader
        title="Finance"
        subtitle="Revenue, margins & cash flow · INR"
        actions={
          <Button variant="secondary" size="sm">
            <Download className="size-4" /> Export P&amp;L
          </Button>
        }
      />

      {/* Stat cards */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card className="gap-2 p-5">
          <div className="eyebrow">Monthly Recurring</div>
          <div className="font-display text-[30px] font-semibold text-gold">
            {formatINR(financeStats.mrr.amount)}
          </div>
          <div className="text-[12px] text-muted-2">{financeStats.mrr.note}</div>
        </Card>
        <Card className="gap-2 p-5">
          <div className="eyebrow">Collected</div>
          <div className="font-display text-[30px] font-semibold text-success">
            {formatINR(financeStats.collected.amount)}
          </div>
          <div className="flex items-center gap-1 text-[12px] text-success">
            <TrendingUp className="size-3.5" strokeWidth={2} /> {financeStats.collected.note}
          </div>
        </Card>
        <Card className="gap-2 p-5">
          <div className="eyebrow">Outstanding</div>
          <div className="font-display text-[30px] font-semibold text-warning">
            {formatINR(financeStats.outstanding.amount)}
          </div>
          <div className="text-[12px] text-muted-2">{financeStats.outstanding.note}</div>
        </Card>
        <Card className="gap-2 p-5">
          <div className="eyebrow">Net Margin</div>
          <div className="font-display text-[30px] font-semibold text-ink">
            {financeStats.margin.pct}%
          </div>
          <div className="text-[12px] text-muted-2">{financeStats.margin.note}</div>
        </Card>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-3">
        {/* Revenue vs expenses trend */}
        <Card className="gap-4 p-5 lg:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[14px] font-semibold text-ink">Revenue vs Expenses</div>
              <div className="text-[12px] text-muted-2">Last 6 months</div>
            </div>
            <div className="flex items-center gap-4 text-[11px]">
              <span className="flex items-center gap-1.5 text-muted">
                <span className="size-2.5 rounded-sm bg-gold" /> Revenue
              </span>
              <span className="flex items-center gap-1.5 text-muted">
                <span className="size-2.5 rounded-sm bg-info" /> Expenses
              </span>
            </div>
          </div>
          <div className="mt-2 grid grid-cols-6 gap-3">
            {monthlyRevenue.map((m) => (
              <div key={m.month} className="flex flex-col items-center gap-2">
                <div className="flex h-40 w-full items-end justify-center gap-1">
                  <div
                    className="w-1/2 rounded-t-[3px] bg-gold transition-all"
                    style={{ height: `${(m.revenue / maxMonth) * 100}%` }}
                    title={formatINR(m.revenue)}
                  />
                  <div
                    className="w-1/2 rounded-t-[3px] bg-info/70 transition-all"
                    style={{ height: `${(m.expenses / maxMonth) * 100}%` }}
                    title={formatINR(m.expenses)}
                  />
                </div>
                <div className="text-[11px] text-muted-2">{m.month}</div>
              </div>
            ))}
          </div>
        </Card>

        {/* Expense breakdown */}
        <Card className="gap-4 p-5">
          <div>
            <div className="text-[14px] font-semibold text-ink">Expense Breakdown</div>
            <div className="text-[12px] text-muted-2">{formatINR(totalExpenses)} this month</div>
          </div>
          <div className="space-y-3.5">
            {expenseBreakdown.map((e) => (
              <div key={e.label}>
                <div className="flex items-center justify-between text-[12px]">
                  <span className="text-muted">{e.label}</span>
                  <span className="text-ink-2">{formatINR(e.amount)}</span>
                </div>
                <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-surface-3">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${(e.amount / totalExpenses) * 100}%`, background: e.tone }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Revenue by client */}
      <Card className="mt-5 gap-4 p-5">
        <div className="flex items-center gap-2">
          <Wallet className="size-4 text-gold" />
          <div className="text-[14px] font-semibold text-ink">Revenue by Client</div>
          <StatusChip tone="neutral" className="ml-auto">This month</StatusChip>
        </div>
        <div className="space-y-3">
          {revenueByClient.map((r) => (
            <div key={r.name} className="flex items-center gap-3">
              <div className="w-36 shrink-0 truncate text-[13px] text-ink-2">{r.name}</div>
              <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-surface-3">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${(r.amount / maxClient) * 100}%`, background: r.accent }}
                />
              </div>
              <div className="w-16 shrink-0 text-right font-display text-[13px] text-ink">
                {formatINRCompact(r.amount)}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Razorpay footer */}
      <div className="mt-5 flex flex-wrap items-center gap-3 rounded-[12px] border border-line bg-card p-4">
        <div className="grid size-8 place-items-center rounded-lg bg-[#3395ff] text-[13px] font-bold text-white">
          ₹
        </div>
        <div className="text-[12px] text-muted">
          <span className="font-medium text-ink">Razorpay payouts</span> · settlements every T+2 · GST reports auto-generated
        </div>
        <StatusChip tone="success" className="ml-auto">
          Live
        </StatusChip>
      </div>
    </PageShell>
  );
}
