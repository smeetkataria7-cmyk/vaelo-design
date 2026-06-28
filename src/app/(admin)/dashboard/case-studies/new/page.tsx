import Link from "next/link";
import { ChevronLeft } from "lucide-react";

import { PageHeader, PageShell } from "@/components/app/page-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { WORK_CATEGORIES } from "@/lib/works";
import { addWorkAction } from "../actions";

export const dynamic = "force-dynamic";

const field =
  "h-10 w-full rounded-lg border border-line bg-input-bg px-3 text-[13px] text-ink placeholder:text-muted-2 outline-none focus-visible:border-gold/50";

export default function NewCaseStudyPage() {
  return (
    <PageShell className="max-w-[720px]">
      <Link href="/dashboard/case-studies" className="mb-4 inline-flex items-center gap-1 text-[12px] text-muted hover:text-ink">
        <ChevronLeft className="size-4" /> Case Studies
      </Link>
      <PageHeader title="New case study" subtitle="Adds to your portfolio" />

      <Card className="mt-6 gap-5 p-6">
        <form action={addWorkAction} className="space-y-5">
          <div>
            <label className="eyebrow !text-muted-2">Title</label>
            <input name="title" required placeholder="e.g. 360° Lead Gen Overhaul" className={`mt-1.5 ${field}`} />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="eyebrow !text-muted-2">Slug (optional)</label>
              <input name="slug" placeholder="auto from title" className={`mt-1.5 ${field}`} />
            </div>
            <div>
              <label className="eyebrow !text-muted-2">Accent colour</label>
              <input name="accent_color" type="color" defaultValue="#c8331f" className={`mt-1.5 ${field} p-1`} />
            </div>
          </div>
          <div>
            <label className="eyebrow !text-muted-2">Categories</label>
            <div className="mt-2 flex flex-wrap gap-2">
              {WORK_CATEGORIES.map((c) => (
                <label key={c} className="flex items-center gap-1.5 rounded-lg border border-line bg-input-bg px-2.5 py-1.5 text-[12px] text-ink-2">
                  <input type="checkbox" name="categories" value={c} className="accent-gold" /> {c}
                </label>
              ))}
            </div>
          </div>
          <div>
            <label className="eyebrow !text-muted-2">Cover image</label>
            <input name="image" type="file" accept="image/*" className={`mt-1.5 ${field} py-1.5 file:mr-2 file:rounded file:border-0 file:bg-surface-3 file:px-2 file:py-1 file:text-ink`} />
            <p className="mt-1 text-[11px] text-muted-3">Or paste an image URL below.</p>
            <input name="image_url" type="url" placeholder="https://…/image.jpg" className={`mt-1.5 ${field}`} />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="eyebrow !text-muted-2">Case study link</label>
              <input name="case_url" type="url" placeholder="https://…" className={`mt-1.5 ${field}`} />
            </div>
            <label className="flex h-10 items-center gap-2 self-end text-[13px] text-ink-2">
              <input type="checkbox" name="published" defaultChecked className="accent-gold" /> Published
            </label>
          </div>
          <div className="flex justify-end gap-2">
            <Button asChild variant="secondary" size="sm"><Link href="/dashboard/case-studies">Cancel</Link></Button>
            <Button type="submit" size="sm">Create</Button>
          </div>
        </form>
      </Card>
    </PageShell>
  );
}
