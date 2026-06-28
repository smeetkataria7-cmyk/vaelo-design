import Link from "next/link";

import { PageHeader, PageShell } from "@/components/app/page-header";
import { MetricCard } from "@/components/app/metric-card";
import { Card } from "@/components/ui/card";
import { StatusChip, type ChipTone } from "@/components/status-chip";
import { getViewer } from "@/lib/auth";
import { listClientOptions } from "@/lib/clients";
import { listProjects } from "@/lib/projects";
import { listInvoices, type Invoice } from "@/lib/invoices";
import { listProposals } from "@/lib/proposals";
import { getLeads } from "@/lib/leads";
import { formatINR } from "@/lib/utils";

export const dynamic = "force-dynamic";

const INV_TONE: Record<Invoice["status"], ChipTone> = {
  draft: "neutral",
  sent: "warning",
  paid: "success",
  overdue: "error",
  void: "neutral",
};

export default async function DashboardPage() {
  const viewer = await getViewer();
  const name = viewer.email ? viewer.email.split("@")[0] : "there";

  const [clients, projects, invoices, proposals, leads] = await Promise.all([
    listClientOptions().catch(() => []),
    listProjects().catch(() => []),
    listInvoices().catch(() => []),
    listProposals().catch(() => []),
    getLeads().catch(() => []),
  ]);

  const activeProjects = projects.filter((p) => p.status === "active").length;
  const outstanding = invoices
    .filter((i) => i.status === "sent" || i.status === "overdue")
    .reduce((s, i) => s + i.total, 0);
  const openProposals = proposals.filter((p) => p.status === "sent" || p.status === "viewed").length;

  const metrics = [
    { label: "Clients", value: clients.length },
    { label: "Active projects", value: activeProjects },
    { label: "Outstanding", value: formatINR(outstanding) },
    { label: "Open proposals", value: openProposals },
  ];

  return (
    <PageShell>
      <PageHeader title="Dashboard" subtitle={`Welcome back, ${name}. Here's your workspace.`} />

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((m) => (
          <MetricCard key={m.label} label={m.label} value={m.value} />
        ))}
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2">
        {/* Recent leads */}
        <Card className="overflow-hidden p-0">
          <div className="flex items-center justify-between p-5 pb-3">
            <h2 className="font-display text-[16px] text-ink">Recent leads</h2>
            <Link href="/dashboard/crm" className="text-[12px] text-gold hover:underline">View all →</Link>
          </div>
          {leads.length === 0 ? (
            <p className="px-5 pb-5 text-[12px] text-muted-2">No leads yet.</p>
          ) : (
            <div className="divide-y divide-line-2">
              {leads.slice(0, 5).map((l) => (
                <div key={l.id} className="flex items-center justify-between px-5 py-3">
                  <div className="min-w-0">
                    <div className="truncate text-[13px] text-ink">{l.brand || l.name}</div>
                    <div className="truncate text-[11px] text-muted-2">{l.email}</div>
                  </div>
                  <StatusChip tone="warning" className="capitalize">{l.status || "new"}</StatusChip>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Recent invoices */}
        <Card className="overflow-hidden p-0">
          <div className="flex items-center justify-between p-5 pb-3">
            <h2 className="font-display text-[16px] text-ink">Recent invoices</h2>
            <Link href="/dashboard/invoicing" className="text-[12px] text-gold hover:underline">View all →</Link>
          </div>
          {invoices.length === 0 ? (
            <p className="px-5 pb-5 text-[12px] text-muted-2">No invoices yet.</p>
          ) : (
            <div className="divide-y divide-line-2">
              {invoices.slice(0, 5).map((inv) => (
                <div key={inv.id} className="flex items-center justify-between px-5 py-3">
                  <div className="min-w-0">
                    <div className="truncate text-[13px] text-ink">{inv.number}</div>
                    <div className="truncate text-[11px] text-muted-2">{inv.client_name || inv.client_email}</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-display text-[13px] text-ink">{formatINR(inv.total)}</span>
                    <StatusChip tone={INV_TONE[inv.status]} className="capitalize">{inv.status}</StatusChip>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </PageShell>
  );
}
