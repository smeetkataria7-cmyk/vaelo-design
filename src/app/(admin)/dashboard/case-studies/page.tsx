import Link from "next/link";
import { ExternalLink, Plus } from "lucide-react";

import { PageHeader, PageShell } from "@/components/app/page-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { StatusChip } from "@/components/status-chip";
import { listAllWorks, type Work } from "@/lib/works";

export const dynamic = "force-dynamic";

export default async function CaseStudiesPage() {
  const works = await listAllWorks().catch(() => [] as Work[]);
  const published = works.filter((w) => w.published).length;

  return (
    <PageShell>
      <PageHeader
        title="Case Studies"
        subtitle={
          works.length ? `${works.length} total · ${published} published` : "Your portfolio case studies appear here"
        }
        actions={
          <Button asChild size="sm">
            <Link href="/dashboard/case-studies/new">
              <Plus className="size-4" /> New case study
            </Link>
          </Button>
        }
      />

      {works.length === 0 ? (
        <div className="mt-6 grid place-items-center rounded-[12px] border border-dashed border-line bg-card/40 py-16 text-center">
          <p className="text-[14px] font-medium text-ink-2">No case studies yet</p>
          <p className="mt-1 text-[12px] text-muted-2">Publish work to your portfolio and it shows here.</p>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {works.map((w) => (
            <Card key={w.id} className="overflow-hidden p-0">
              <div
                className="relative aspect-[16/10] w-full bg-cover bg-center"
                style={{
                  backgroundColor: w.accent_color || "#1a1a1a",
                  backgroundImage: w.image_url ? `url(${w.image_url})` : undefined,
                }}
              >
                <span className="absolute right-2 top-2">
                  <StatusChip tone={w.published ? "success" : "neutral"}>
                    {w.published ? "Published" : "Draft"}
                  </StatusChip>
                </span>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between gap-2">
                  <div className="truncate text-[14px] font-medium text-ink">{w.title}</div>
                  {w.case_url && (
                    <a href={w.case_url} target="_blank" rel="noopener noreferrer" className="shrink-0 text-muted-2 hover:text-gold" aria-label="Open case study">
                      <ExternalLink className="size-4" />
                    </a>
                  )}
                </div>
                {w.categories?.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {w.categories.slice(0, 3).map((c) => (
                      <span key={c} className="rounded-md bg-input-bg px-2 py-0.5 text-[10px] text-muted">
                        {c}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}
    </PageShell>
  );
}
