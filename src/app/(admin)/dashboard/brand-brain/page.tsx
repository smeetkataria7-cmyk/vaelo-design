import Link from "next/link";
import { Sparkles, Plus } from "lucide-react";

import { PageHeader, PageShell } from "@/components/app/page-header";
import { AccentAvatar } from "@/components/app/accent-avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { StatusChip } from "@/components/status-chip";
import { listBrandBrains, type BrandBrain } from "@/lib/brand-brain";
import { accentFor } from "@/lib/accent";

export const dynamic = "force-dynamic";

function Field({ label, value }: { label: string; value: string }) {
  if (!value) return null;
  return (
    <div>
      <div className="eyebrow !text-muted-2">{label}</div>
      <p className="mt-1 whitespace-pre-line text-[13px] leading-relaxed text-ink-2">{value}</p>
    </div>
  );
}

function BrandCard({ b }: { b: BrandBrain }) {
  const name = b.client_name || b.client_email;
  return (
    <Card className="gap-4 p-5">
      <div className="flex items-center gap-3">
        <AccentAvatar initial={(name[0] || "?").toUpperCase()} color={accentFor(b.client_email)} size={36} />
        <div className="min-w-0 flex-1">
          <div className="truncate font-display text-[16px] text-ink">{name}</div>
          <div className="truncate text-[11px] text-muted-2">{b.client_email}</div>
        </div>
        <StatusChip tone="gold">
          <Sparkles className="size-3" /> AI context
        </StatusChip>
      </div>
      <div className="grid grid-cols-1 gap-4 border-t border-line-2 pt-4 sm:grid-cols-2">
        <Field label="Colours" value={b.colors} />
        <Field label="Fonts" value={b.fonts} />
        <Field label="Tone of voice" value={b.tone} />
        <Field label="Audience" value={b.audience} />
        <Field label="Competitors" value={b.competitors} />
        <Field label="Brand rules" value={b.rules} />
        <Field label="Asset links" value={b.links} />
        <Field label="Notes" value={b.notes} />
      </div>
    </Card>
  );
}

export default async function BrandBrainPage() {
  const brains = await listBrandBrains().catch(() => [] as BrandBrain[]);

  return (
    <PageShell>
      <PageHeader
        title="Brand Brain"
        subtitle={brains.length ? `${brains.length} client brand profiles` : "Brand profiles your clients fill in appear here"}
        actions={
          <Button asChild size="sm">
            <Link href="/dashboard/brand-brain/new">
              <Plus className="size-4" /> Add / update
            </Link>
          </Button>
        }
      />

      {brains.length === 0 ? (
        <div className="mt-6 grid place-items-center rounded-[12px] border border-dashed border-line bg-card/40 py-16 text-center">
          <p className="text-[14px] font-medium text-ink-2">No brand profiles yet</p>
          <p className="mt-1 text-[12px] text-muted-2">
            Each client&apos;s colours, tone, audience & rules show here once captured.
          </p>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-2">
          {brains.map((b) => (
            <BrandCard key={b.id} b={b} />
          ))}
        </div>
      )}
    </PageShell>
  );
}
