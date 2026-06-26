"use client";

import { useState } from "react";
import { Sparkles, Plus, Check } from "lucide-react";

import { PageShell } from "@/components/app/page-header";
import { AccentAvatar } from "@/components/app/accent-avatar";
import { Card } from "@/components/ui/card";
import { StatusChip } from "@/components/status-chip";
import { brandBrains, type BrandBrain } from "@/lib/mock";
import { cn } from "@/lib/utils";

function SectionCard({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Card className={cn("gap-3 p-5", className)}>
      <div className="eyebrow !text-gold/80">{label}</div>
      {children}
    </Card>
  );
}

function BrandBrainEditor({ b }: { b: BrandBrain }) {
  return (
    <div className="flex flex-1 flex-col gap-5">
      {/* Header */}
      <div className="flex items-center gap-3">
        <AccentAvatar initial={b.clientName[0]} color={b.accent} size={36} />
        <div className="flex-1">
          <h1 className="font-display text-[22px] text-ink">{b.clientName}</h1>
          <p className="text-[11px] text-muted-2">Brand Brain · Last updated {b.updated}</p>
        </div>
        <StatusChip tone="gold" className="!text-[11px]">
          <Sparkles className="size-3" /> AI uses this context automatically
        </StatusChip>
      </div>

      {/* 2x2 */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <SectionCard label="Identity">
          <div className="text-[11px] text-muted-2">Brand colors</div>
          <div className="flex items-center gap-2">
            {b.colors.map((c) => (
              <span
                key={c}
                className="size-7 rounded-md border border-line"
                style={{ background: c }}
                title={c}
              />
            ))}
            <button className="grid size-7 place-items-center rounded-md border border-dashed border-line text-muted-3 hover:text-gold">
              <Plus className="size-3.5" />
            </button>
          </div>
          <div className="mt-2 text-[11px] text-muted-2">Primary font</div>
          <div className="rounded-lg border border-line bg-input-bg px-3 py-2 text-[13px] text-ink">
            {b.fonts}
          </div>
        </SectionCard>

        <SectionCard label="Tone of Voice">
          <p className="text-[13px] leading-relaxed text-ink-2">{b.tone}</p>
          <div className="flex flex-wrap gap-1.5">
            {b.toneTags.map((t) => (
              <StatusChip key={t.label} tone={t.negative ? "error" : "info"}>
                {t.label}
              </StatusChip>
            ))}
          </div>
        </SectionCard>

        <SectionCard label="Audience & Market">
          <div>
            <div className="text-[11px] text-muted-2">Target audience</div>
            <div className="text-[13px] text-ink-2">{b.audience}</div>
          </div>
          <div>
            <div className="text-[11px] text-muted-2">Positioning</div>
            <div className="text-[13px] text-ink-2">{b.positioning}</div>
          </div>
          <div>
            <div className="text-[11px] text-muted-2">Key USPs</div>
            <div className="text-[13px] text-ink-2">{b.usps}</div>
          </div>
        </SectionCard>

        <SectionCard label="Approved Style Refs">
          <div className="grid grid-cols-4 gap-2">
            {b.styleRefs.map((s, i) => (
              <div
                key={i}
                className="relative aspect-square rounded-lg"
                style={{ background: `linear-gradient(150deg, ${s.grad[0]}, ${s.grad[1]})` }}
              >
                {s.approved && (
                  <span className="absolute bottom-1 right-1 grid size-4 place-items-center rounded-full bg-success">
                    <Check className="size-2.5 text-white" strokeWidth={3} />
                  </span>
                )}
              </div>
            ))}
          </div>
          <p className="text-[10px] text-muted-3">
            ✓ Approved creatives auto-link as style references
          </p>
        </SectionCard>
      </div>

      {/* Brand rules */}
      <SectionCard label="Brand Rules">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <div className="mb-2 text-[12px] font-medium text-success">✓ Always use</div>
            <p className="text-[12.5px] leading-relaxed text-ink-2">
              {b.rules.always.join(" · ")}
            </p>
          </div>
          <div>
            <div className="mb-2 text-[12px] font-medium text-error">✗ Never use</div>
            <p className="text-[12.5px] leading-relaxed text-ink-2">
              {b.rules.never.join(" · ")}
            </p>
          </div>
        </div>
      </SectionCard>
    </div>
  );
}

export default function BrandBrainPage() {
  const [activeKey, setActiveKey] = useState(brandBrains[0].key);
  const active = brandBrains.find((b) => b.key === activeKey)!;

  return (
    <PageShell className="max-w-none">
      <div className="flex flex-col gap-6 lg:flex-row">
        {/* Client picker */}
        <div className="w-full shrink-0 lg:w-[220px]">
          <div className="eyebrow mb-3">Select client</div>
          <div className="flex flex-col gap-1">
            {brandBrains.map((b) => (
              <button
                key={b.key}
                onClick={() => setActiveKey(b.key)}
                className={cn(
                  "flex items-center gap-2.5 rounded-[8px] px-3 py-2 text-left text-[13px] transition-colors",
                  b.key === activeKey
                    ? "bg-[rgba(212,175,55,0.1)] font-medium text-gold"
                    : "text-muted hover:bg-surface-3 hover:text-ink-2"
                )}
              >
                <AccentAvatar initial={b.clientName[0]} color={b.accent} size={24} />
                {b.clientName}
              </button>
            ))}
          </div>
        </div>

        <BrandBrainEditor b={active} />
      </div>
    </PageShell>
  );
}
