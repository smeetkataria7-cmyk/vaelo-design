import Link from "next/link";
import { ChevronLeft } from "lucide-react";

import { PageHeader, PageShell } from "@/components/app/page-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { listClientOptions } from "@/lib/clients";
import { createContractAction } from "../actions";

export const dynamic = "force-dynamic";

const field =
  "h-10 w-full rounded-lg border border-line bg-input-bg px-3 text-[13px] text-ink placeholder:text-muted-2 outline-none focus-visible:border-gold/50";

export default async function NewContractPage() {
  const clients = await listClientOptions().catch(() => []);

  return (
    <PageShell className="max-w-[720px]">
      <Link href="/dashboard/contracts" className="mb-4 inline-flex items-center gap-1 text-[12px] text-muted hover:text-ink">
        <ChevronLeft className="size-4" /> Contracts
      </Link>
      <PageHeader title="New contract" subtitle="The client signs it from their portal" />

      <Card className="mt-6 gap-5 p-6">
        <form action={createContractAction} className="space-y-5">
          <div>
            <label className="eyebrow !text-muted-2">Title</label>
            <input name="title" required placeholder="e.g. Master Services Agreement" className={`mt-1.5 ${field}`} />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="eyebrow !text-muted-2">Client name</label>
              <input name="client_name" required list="clients-name" placeholder="Brand / person" className={`mt-1.5 ${field}`} />
            </div>
            <div>
              <label className="eyebrow !text-muted-2">Client email</label>
              <input name="client_email" type="email" list="clients-email" placeholder="client@brand.com" className={`mt-1.5 ${field}`} />
            </div>
          </div>
          <div>
            <label className="eyebrow !text-muted-2">Agreement text</label>
            <textarea name="body" rows={8} placeholder="Paste the agreement terms the client will read and sign…" className={`mt-1.5 ${field} h-auto py-2`} />
          </div>
          <div>
            <label className="eyebrow !text-muted-2">Document link (optional)</label>
            <input name="file_link" type="url" placeholder="https://… (Drive/PDF)" className={`mt-1.5 ${field}`} />
          </div>
          <div className="flex justify-end gap-2">
            <Button asChild variant="secondary" size="sm">
              <Link href="/dashboard/contracts">Cancel</Link>
            </Button>
            <Button type="submit" size="sm">Create &amp; send</Button>
          </div>
        </form>
      </Card>

      <datalist id="clients-name">
        {clients.map((c) => <option key={c.email} value={c.name} />)}
      </datalist>
      <datalist id="clients-email">
        {clients.map((c) => <option key={c.email} value={c.email} />)}
      </datalist>
    </PageShell>
  );
}
