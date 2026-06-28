import Link from "next/link";
import { ChevronLeft } from "lucide-react";

import { PageHeader, PageShell } from "@/components/app/page-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { listClientOptions } from "@/lib/clients";
import { BRAND_FIELDS } from "@/lib/brand-brain";
import { saveBrandBrainAction } from "../actions";

export const dynamic = "force-dynamic";

const field =
  "w-full rounded-lg border border-line bg-input-bg px-3 py-2 text-[13px] text-ink placeholder:text-muted-2 outline-none focus-visible:border-gold/50";

export default async function NewBrandBrainPage() {
  const clients = await listClientOptions().catch(() => []);

  return (
    <PageShell className="max-w-[720px]">
      <Link href="/dashboard/brand-brain" className="mb-4 inline-flex items-center gap-1 text-[12px] text-muted hover:text-ink">
        <ChevronLeft className="size-4" /> Brand Brain
      </Link>
      <PageHeader title="Brand profile" subtitle="Captured per client — used as AI context" />

      <Card className="mt-6 gap-5 p-6">
        <form action={saveBrandBrainAction} className="space-y-4">
          <div>
            <label className="eyebrow !text-muted-2">Client email</label>
            <input name="client_email" type="email" required list="clients-email" placeholder="client@brand.com" className={`mt-1.5 h-10 ${field}`} />
          </div>
          {BRAND_FIELDS.map((f) => (
            <div key={f.name}>
              <label className="eyebrow !text-muted-2">{f.label}</label>
              {f.name === "client_name" ? (
                <input name={f.name} placeholder={f.placeholder} className={`mt-1.5 h-10 ${field}`} />
              ) : (
                <textarea name={f.name} rows={2} placeholder={f.placeholder} className={`mt-1.5 ${field}`} />
              )}
            </div>
          ))}
          <div className="flex justify-end gap-2">
            <Button asChild variant="secondary" size="sm"><Link href="/dashboard/brand-brain">Cancel</Link></Button>
            <Button type="submit" size="sm">Save profile</Button>
          </div>
        </form>
      </Card>

      <datalist id="clients-email">
        {clients.map((c) => <option key={c.email} value={c.email} />)}
      </datalist>
    </PageShell>
  );
}
