import Link from "next/link";
import { Search } from "lucide-react";

import { PageHeader, PageShell } from "@/components/app/page-header";
import { Card } from "@/components/ui/card";
import { StatusChip } from "@/components/status-chip";
import { listClients } from "@/lib/clients";
import { getLeads } from "@/lib/leads";
import { listProposals } from "@/lib/proposals";
import { listInvoices } from "@/lib/invoices";
import { listContracts } from "@/lib/contracts";
import { listProjects } from "@/lib/projects";
import { formatINR } from "@/lib/utils";

export const dynamic = "force-dynamic";

type Row = { label: string; sub: string; href: string; right?: string };

function Group({ title, rows }: { title: string; rows: Row[] }) {
  if (rows.length === 0) return null;
  return (
    <div>
      <div className="eyebrow mb-2">{title} · {rows.length}</div>
      <Card className="overflow-hidden p-0">
        {rows.map((r, i) => (
          <Link
            key={i}
            href={r.href}
            className="flex items-center justify-between gap-3 border-b border-line-2 px-4 py-3 last:border-0 hover:bg-surface-3/40"
          >
            <span className="min-w-0">
              <span className="block truncate text-[13px] text-ink">{r.label}</span>
              <span className="block truncate text-[11px] text-muted-2">{r.sub}</span>
            </span>
            {r.right && <span className="shrink-0 font-display text-[13px] text-gold">{r.right}</span>}
          </Link>
        ))}
      </Card>
    </div>
  );
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const q = ((await searchParams).q || "").trim();
  const ql = q.toLowerCase();
  const m = (...vals: (string | null | undefined)[]) => vals.some((v) => (v || "").toLowerCase().includes(ql));

  const [clients, leads, proposals, invoices, contracts, projects] = q
    ? await Promise.all([
        listClients().catch(() => []),
        getLeads().catch(() => []),
        listProposals().catch(() => []),
        listInvoices().catch(() => []),
        listContracts().catch(() => []),
        listProjects().catch(() => []),
      ])
    : [[], [], [], [], [], []];

  const groups = q
    ? [
        { title: "Clients", rows: clients.filter((c) => m(c.name, c.email)).map((c) => ({ label: c.name || c.email, sub: c.email, href: "/dashboard/clients" })) },
        { title: "Leads", rows: leads.filter((l) => m(l.brand, l.name, l.email)).map((l) => ({ label: l.brand || l.name, sub: l.email, href: "/dashboard/crm" })) },
        { title: "Proposals", rows: proposals.filter((p) => m(p.title, p.client_name, p.client_email)).map((p) => ({ label: p.title, sub: p.client_name || p.client_email, href: "/dashboard/proposals", right: formatINR(p.total) })) },
        { title: "Invoices", rows: invoices.filter((i) => m(i.number, i.client_name, i.client_email)).map((i) => ({ label: i.number, sub: i.client_name || i.client_email, href: "/dashboard/invoicing", right: formatINR(i.total) })) },
        { title: "Contracts", rows: contracts.filter((c) => m(c.title, c.client_name, c.client_email)).map((c) => ({ label: c.title, sub: c.client_name || c.client_email, href: "/dashboard/contracts" })) },
        { title: "Projects", rows: projects.filter((p) => m(p.title, p.client_name, p.client_email)).map((p) => ({ label: p.title, sub: p.client_name || p.client_email, href: "/dashboard/projects" })) },
      ]
    : [];

  const total = groups.reduce((s, g) => s + g.rows.length, 0);

  return (
    <PageShell>
      <PageHeader
        title="Search"
        subtitle={q ? `${total} result${total === 1 ? "" : "s"} for “${q}”` : "Search across clients, leads, proposals, invoices, contracts & projects"}
      />

      {!q ? (
        <div className="mt-6 grid place-items-center rounded-[12px] border border-dashed border-line bg-card/40 py-16 text-center">
          <Search className="size-7 text-muted-3" strokeWidth={1.5} />
          <p className="mt-3 text-[13px] text-muted-2">Type in the search bar above to find anything.</p>
        </div>
      ) : total === 0 ? (
        <div className="mt-6 grid place-items-center rounded-[12px] border border-dashed border-line bg-card/40 py-16 text-center">
          <p className="text-[14px] font-medium text-ink-2">No matches for “{q}”</p>
        </div>
      ) : (
        <div className="mt-6 space-y-6">
          {groups.map((g) => (
            <Group key={g.title} title={g.title} rows={g.rows} />
          ))}
        </div>
      )}
    </PageShell>
  );
}
