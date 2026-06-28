import Link from "next/link";
import { ChevronLeft } from "lucide-react";

import { PageHeader, PageShell } from "@/components/app/page-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { listClientOptions } from "@/lib/clients";
import { createProjectAction } from "../actions";

export const dynamic = "force-dynamic";

const field =
  "h-10 w-full rounded-lg border border-line bg-input-bg px-3 text-[13px] text-ink placeholder:text-muted-2 outline-none focus-visible:border-gold/50";

export default async function NewProjectPage() {
  const clients = await listClientOptions().catch(() => []);

  return (
    <PageShell className="max-w-[640px]">
      <Link href="/dashboard/projects" className="mb-4 inline-flex items-center gap-1 text-[12px] text-muted hover:text-ink">
        <ChevronLeft className="size-4" /> Projects
      </Link>
      <PageHeader title="New project" />

      <Card className="mt-6 gap-5 p-6">
        <form action={createProjectAction} className="space-y-5">
          <div>
            <label className="eyebrow !text-muted-2">Project title</label>
            <input name="title" required placeholder="e.g. Instagram + Paid Ads" className={`mt-1.5 ${field}`} />
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
            <label className="eyebrow !text-muted-2">Status</label>
            <select name="status" defaultValue="active" className={`mt-1.5 ${field}`}>
              <option value="onboarding">Onboarding</option>
              <option value="active">Active</option>
              <option value="paused">Paused</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <div className="flex justify-end gap-2">
            <Button asChild variant="secondary" size="sm">
              <Link href="/dashboard/projects">Cancel</Link>
            </Button>
            <Button type="submit" size="sm">Create project</Button>
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
