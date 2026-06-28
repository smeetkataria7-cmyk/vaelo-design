import Link from "next/link";
import { ChevronLeft } from "lucide-react";

import { PageHeader, PageShell } from "@/components/app/page-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { listClientOptions } from "@/lib/clients";
import { createReportAction } from "../actions";

export const dynamic = "force-dynamic";

const field =
  "h-10 w-full rounded-lg border border-line bg-input-bg px-3 text-[13px] text-ink placeholder:text-muted-2 outline-none focus-visible:border-gold/50";

export default async function NewReportPage() {
  const clients = await listClientOptions().catch(() => []);

  return (
    <PageShell className="max-w-[720px]">
      <Link href="/dashboard/reports" className="mb-4 inline-flex items-center gap-1 text-[12px] text-muted hover:text-ink">
        <ChevronLeft className="size-4" /> Reports
      </Link>
      <PageHeader title="New report" subtitle="Performance report for a client" />

      <Card className="mt-6 gap-5 p-6">
        <form action={createReportAction} className="space-y-5">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="eyebrow !text-muted-2">Client email</label>
              <input name="client_email" type="email" required list="clients-email" placeholder="client@brand.com" className={`mt-1.5 ${field}`} />
            </div>
            <div>
              <label className="eyebrow !text-muted-2">Title</label>
              <input name="title" required placeholder="e.g. June performance" className={`mt-1.5 ${field}`} />
            </div>
            <div>
              <label className="eyebrow !text-muted-2">Period</label>
              <input name="period" placeholder="e.g. Jun 2026" className={`mt-1.5 ${field}`} />
            </div>
            <div>
              <label className="eyebrow !text-muted-2">Platform</label>
              <input name="platform" placeholder="Meta / Google / Instagram" className={`mt-1.5 ${field}`} />
            </div>
            <div>
              <label className="eyebrow !text-muted-2">Spend (₹)</label>
              <input name="spend" inputMode="decimal" className={`mt-1.5 ${field}`} />
            </div>
            <div>
              <label className="eyebrow !text-muted-2">Reach</label>
              <input name="reach" inputMode="decimal" className={`mt-1.5 ${field}`} />
            </div>
            <div>
              <label className="eyebrow !text-muted-2">Clicks</label>
              <input name="clicks" inputMode="decimal" className={`mt-1.5 ${field}`} />
            </div>
            <div>
              <label className="eyebrow !text-muted-2">ROAS</label>
              <input name="roas" placeholder="e.g. 3.2x" className={`mt-1.5 ${field}`} />
            </div>
          </div>
          <div>
            <label className="eyebrow !text-muted-2">Report link (optional)</label>
            <input name="link" type="url" placeholder="https://… (full report)" className={`mt-1.5 ${field}`} />
          </div>
          <div>
            <label className="eyebrow !text-muted-2">Notes</label>
            <textarea name="notes" rows={2} className={`mt-1.5 ${field} h-auto py-2`} />
          </div>
          <div className="flex justify-end gap-2">
            <Button asChild variant="secondary" size="sm"><Link href="/dashboard/reports">Cancel</Link></Button>
            <Button type="submit" size="sm">Save report</Button>
          </div>
        </form>
      </Card>

      <datalist id="clients-email">
        {clients.map((c) => <option key={c.email} value={c.email} />)}
      </datalist>
    </PageShell>
  );
}
