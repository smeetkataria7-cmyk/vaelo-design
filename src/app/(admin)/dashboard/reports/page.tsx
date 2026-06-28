import Link from "next/link";
import { ExternalLink, Plus } from "lucide-react";

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
import { listReports, type Report } from "@/lib/reports";
import { formatINR } from "@/lib/utils";

export const dynamic = "force-dynamic";

const fmt = (n: number | null) => (n == null ? "—" : new Intl.NumberFormat("en-IN").format(n));

export default async function ReportsPage() {
  const reports = await listReports().catch(() => [] as Report[]);

  return (
    <PageShell>
      <PageHeader
        title="Reports"
        subtitle={reports.length ? `${reports.length} performance reports` : "Client performance reports appear here"}
        actions={
          <Button asChild size="sm">
            <Link href="/dashboard/reports/new">
              <Plus className="size-4" /> New report
            </Link>
          </Button>
        }
      />

      {reports.length === 0 ? (
        <div className="mt-6 grid place-items-center rounded-[12px] border border-dashed border-line bg-card/40 py-16 text-center">
          <p className="text-[14px] font-medium text-ink-2">No reports yet</p>
          <p className="mt-1 max-w-md text-[12px] text-muted-2">
            Add ad/social performance reports per client (spend, reach, ROAS). Live Instagram/Meta sync can be connected later.
          </p>
        </div>
      ) : (
        <Card className="mt-6 overflow-hidden p-0">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>Report / Client</TableHead>
                <TableHead>Platform</TableHead>
                <TableHead className="text-right">Spend</TableHead>
                <TableHead className="text-right">Reach</TableHead>
                <TableHead className="text-right">ROAS</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reports.map((r) => (
                <TableRow key={r.id}>
                  <TableCell>
                    <div className="text-[13px] font-medium text-ink">{r.title}</div>
                    <div className="text-[11px] text-muted-2">
                      {r.client_email}
                      {r.period ? ` · ${r.period}` : ""}
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-2">{r.platform || "—"}</TableCell>
                  <TableCell className="text-right text-muted-2">
                    {r.spend == null ? "—" : formatINR(r.spend)}
                  </TableCell>
                  <TableCell className="text-right text-muted-2">{fmt(r.reach)}</TableCell>
                  <TableCell className="text-right">
                    {r.roas ? <StatusChip tone="success">{r.roas}</StatusChip> : "—"}
                  </TableCell>
                  <TableCell className="text-right">
                    {r.link && (
                      <a href={r.link} target="_blank" rel="noopener noreferrer" className="text-muted-2 hover:text-gold" aria-label="Open report">
                        <ExternalLink className="size-4" />
                      </a>
                    )}
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
