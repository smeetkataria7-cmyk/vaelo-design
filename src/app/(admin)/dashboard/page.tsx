import { Download, Play } from "lucide-react";

import { PageHeader, PageShell } from "@/components/app/page-header";
import { MetricCard } from "@/components/app/metric-card";
import { OutputChart } from "@/components/charts/output-chart";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { StatusChip } from "@/components/status-chip";
import {
  activityFeed,
  caseStudies,
  creativeOutput,
  dashboardMetrics,
  recentCreatives,
} from "@/lib/mock";

function renderBold(text: string) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <span key={i} className="font-medium text-ink">
        {part.slice(2, -2)}
      </span>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

const ACTIVITY_DOT: Record<string, string> = {
  success: "var(--success)",
  info: "var(--info)",
  neutral: "var(--muted)",
  error: "var(--error)",
};

function Segmented() {
  const opts = ["7d", "30d", "Custom"];
  return (
    <div className="flex items-center rounded-lg border border-line bg-input-bg p-0.5">
      {opts.map((o) => (
        <button
          key={o}
          className={
            o === "30d"
              ? "rounded-md bg-surface-4 px-3 py-1.5 text-[12px] font-medium text-ink"
              : "rounded-md px-3 py-1.5 text-[12px] text-muted hover:text-ink-2"
          }
        >
          {o}
        </button>
      ))}
    </div>
  );
}

export default function DashboardPage() {
  return (
    <PageShell>
      <PageHeader
        title="Dashboard"
        subtitle="Welcome back, Alex. Here's what's happening."
        actions={
          <>
            <Segmented />
            <Button variant="secondary" size="sm">
              <Download className="size-4" /> Export
            </Button>
          </>
        }
      />

      {/* Metric grid */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {dashboardMetrics.map((m) => (
          <MetricCard key={m.label} {...m} />
        ))}
      </div>

      {/* 3-up row */}
      <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-12">
        {/* Recent creatives */}
        <Card className="lg:col-span-6">
          <div className="flex items-center justify-between p-5 pb-3">
            <h2 className="font-display text-[17px] text-ink">Recent Creatives</h2>
            <button className="text-[12px] text-gold hover:underline">View all →</button>
          </div>
          <div className="grid grid-cols-4 gap-2.5 p-5 pt-0">
            {recentCreatives.map((c) => (
              <div
                key={c.id}
                className="group relative aspect-square overflow-hidden rounded-[10px]"
                style={{
                  background: `linear-gradient(150deg, ${c.grad[0]}, ${c.grad[1]})`,
                }}
              >
                <div className="absolute inset-0 grid place-items-center opacity-90 transition-opacity group-hover:opacity-100">
                  <div className="grid size-7 place-items-center rounded-full bg-black/35 backdrop-blur-sm">
                    <Play className="size-3 fill-white text-white" />
                  </div>
                </div>
                <span className="absolute bottom-1.5 right-1.5 rounded bg-black/55 px-1.5 py-0.5 text-[9px] font-medium text-white">
                  {c.duration}
                </span>
              </div>
            ))}
            <div className="grid aspect-square place-items-center rounded-[10px] border border-dashed border-line text-[11px] text-muted-2">
              +4 more
            </div>
          </div>
        </Card>

        {/* Case studies */}
        <Card className="lg:col-span-3">
          <div className="flex items-center justify-between p-5 pb-3">
            <h2 className="font-display text-[17px] text-ink">Case Studies</h2>
            <button className="text-[12px] text-gold hover:underline">All →</button>
          </div>
          <div className="flex flex-col gap-2 p-5 pt-0">
            {caseStudies.slice(0, 3).map((cs) => (
              <div
                key={cs.id}
                className="rounded-[10px] border border-line-2 bg-paper-2/40 p-3"
              >
                <div className="flex items-center gap-2">
                  <span className="size-1.5 rounded-full" style={{ background: cs.accent }} />
                  <span className="eyebrow !text-muted-2">{cs.clientName}</span>
                  <div className="ml-auto">
                    <StatusChip tone={cs.status === "published" ? "success" : "neutral"}>
                      {cs.status === "published" ? "Published" : "Draft"}
                    </StatusChip>
                  </div>
                </div>
                <div className="mt-1.5 text-[13px] font-medium text-ink">{cs.title}</div>
                <div className="mt-0.5 text-[11px] text-muted-2">Updated {cs.updated}</div>
              </div>
            ))}
          </div>
        </Card>

        {/* Activity */}
        <Card className="lg:col-span-3">
          <div className="p-5 pb-3">
            <h2 className="font-display text-[17px] text-ink">Activity</h2>
          </div>
          <div className="flex flex-col gap-3.5 p-5 pt-0">
            {activityFeed.map((a) => (
              <div key={a.id} className="flex gap-2.5">
                <span
                  className="mt-1.5 size-1.5 shrink-0 rounded-full"
                  style={{ background: ACTIVITY_DOT[a.kind] }}
                />
                <div className="leading-tight">
                  <div className="text-[12.5px] text-muted">{renderBold(a.text)}</div>
                  <div className="mt-0.5 text-[11px] text-muted-3">{a.time}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Chart */}
      <Card className="mt-5 p-5">
        <div className="mb-2 flex items-center justify-between">
          <div>
            <h2 className="font-display text-[17px] text-ink">Creative Output</h2>
            <p className="text-[11px] text-muted-2">uploads per day · last 7 days</p>
          </div>
          <span className="text-[12px] font-medium text-gold">75 total</span>
        </div>
        <OutputChart data={creativeOutput} />
      </Card>
    </PageShell>
  );
}
