import { Download, TrendingUp } from "lucide-react";

import { PageHeader, PageShell } from "@/components/app/page-header";
import { MetricCard } from "@/components/app/metric-card";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { StatusChip, type ChipTone } from "@/components/status-chip";
import { OutputChart } from "@/components/charts/output-chart";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  reportKpis,
  adPerformance,
  audienceGrowth,
  creativeOutput,
} from "@/lib/mock";
import { formatINR } from "@/lib/utils";

const BAND_TONE: Record<"healthy" | "watch", ChipTone> = {
  healthy: "success",
  watch: "warning",
};

export default function ReportsPage() {
  const maxFollowers = Math.max(...audienceGrowth.map((a) => a.followers));

  return (
    <PageShell>
      <PageHeader
        title="Reports"
        subtitle="Instagram growth + ad performance · synced from Meta"
        actions={
          <Button variant="secondary" size="sm">
            <Download className="size-4" /> Export report
          </Button>
        }
      />

      {/* KPI row */}
      <div className="mt-6 grid grid-cols-2 gap-4 xl:grid-cols-4">
        {reportKpis.map((k) => (
          <MetricCard key={k.label} label={k.label} value={k.value} trend={k.trend} tone={k.tone} />
        ))}
      </div>

      {/* Creative output chart */}
      <Card className="mt-5 gap-4 p-5">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[14px] font-semibold text-ink">Creative Output</div>
            <div className="text-[12px] text-muted-2">Uploads · last 7 days</div>
          </div>
          <StatusChip tone="gold">75 total</StatusChip>
        </div>
        <OutputChart data={creativeOutput} />
      </Card>

      <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2">
        {/* Ad performance */}
        <Card className="overflow-hidden p-0">
          <div className="flex items-center justify-between p-5 pb-3">
            <div className="text-[14px] font-semibold text-ink">Ad Performance</div>
            <span className="text-[11px] text-muted-2">ROAS by client</span>
          </div>
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>Client</TableHead>
                <TableHead className="text-right">Spend</TableHead>
                <TableHead className="text-right">ROAS</TableHead>
                <TableHead className="text-right">Leads</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {adPerformance.map((a) => (
                <TableRow key={a.clientName}>
                  <TableCell>
                    <span className="flex items-center gap-2">
                      <span className="size-2 rounded-full" style={{ background: a.accent }} />
                      <span className="text-[13px] text-ink">{a.clientName}</span>
                    </span>
                  </TableCell>
                  <TableCell className="text-right text-muted-2">{formatINR(a.spend)}</TableCell>
                  <TableCell className="text-right">
                    <StatusChip tone={BAND_TONE[a.band]}>{a.roas}×</StatusChip>
                  </TableCell>
                  <TableCell className="text-right font-display text-ink">{a.leads}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>

        {/* Audience growth */}
        <Card className="gap-4 p-5">
          <div className="text-[14px] font-semibold text-ink">Audience Growth</div>
          <div className="space-y-4">
            {audienceGrowth.map((a) => (
              <div key={a.clientName}>
                <div className="flex items-center justify-between text-[12px]">
                  <span className="text-ink-2">{a.clientName}</span>
                  <span className="flex items-center gap-1 text-success">
                    <TrendingUp className="size-3.5" strokeWidth={2} />+{a.growth}%
                  </span>
                </div>
                <div className="mt-1.5 flex items-center gap-3">
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-surface-3">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${(a.followers / maxFollowers) * 100}%`, background: a.accent }}
                    />
                  </div>
                  <span className="w-16 shrink-0 text-right font-display text-[13px] text-ink">
                    {(a.followers / 1000).toFixed(1)}K
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </PageShell>
  );
}
