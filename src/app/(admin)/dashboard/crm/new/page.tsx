import Link from "next/link";
import { ChevronLeft } from "lucide-react";

import { PageHeader, PageShell } from "@/components/app/page-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { createLeadAction } from "../actions";

export const dynamic = "force-dynamic";

const field =
  "h-10 w-full rounded-lg border border-line bg-input-bg px-3 text-[13px] text-ink placeholder:text-muted-2 outline-none focus-visible:border-gold/50";

export default function NewLeadPage() {
  return (
    <PageShell className="max-w-[640px]">
      <Link href="/dashboard/crm" className="mb-4 inline-flex items-center gap-1 text-[12px] text-muted hover:text-ink">
        <ChevronLeft className="size-4" /> CRM / Leads
      </Link>
      <PageHeader title="Add lead" />

      <Card className="mt-6 gap-5 p-6">
        <form action={createLeadAction} className="space-y-5">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="eyebrow !text-muted-2">Brand</label>
              <input name="brand" required placeholder="Brand / company" className={`mt-1.5 ${field}`} />
            </div>
            <div>
              <label className="eyebrow !text-muted-2">Contact name</label>
              <input name="name" required placeholder="Person" className={`mt-1.5 ${field}`} />
            </div>
            <div>
              <label className="eyebrow !text-muted-2">Email</label>
              <input name="email" type="email" required placeholder="them@brand.com" className={`mt-1.5 ${field}`} />
            </div>
            <div>
              <label className="eyebrow !text-muted-2">Instagram</label>
              <input name="instagram" placeholder="@handle" className={`mt-1.5 ${field}`} />
            </div>
          </div>
          <div>
            <label className="eyebrow !text-muted-2">Goal / notes</label>
            <textarea name="goal" rows={3} placeholder="What do they want?" className={`mt-1.5 ${field} h-auto py-2`} />
          </div>
          <div className="flex justify-end gap-2">
            <Button asChild variant="secondary" size="sm"><Link href="/dashboard/crm">Cancel</Link></Button>
            <Button type="submit" size="sm">Add lead</Button>
          </div>
        </form>
      </Card>
    </PageShell>
  );
}
