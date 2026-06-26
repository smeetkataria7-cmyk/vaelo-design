"use client";

import { useState } from "react";
import { Plus, MoreHorizontal, ExternalLink } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StatusChip, type ChipTone } from "@/components/status-chip";
import { caseStudies, type CaseStudy, type CaseStudyStatus } from "@/lib/mock";
import { cn } from "@/lib/utils";

const STATUS_TONE: Record<CaseStudyStatus, ChipTone> = {
  published: "success",
  draft: "neutral",
  archived: "neutral",
};

function Editor({ cs }: { cs: CaseStudy }) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b border-line px-5 py-4">
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full" style={{ background: cs.accent }} />
          <span className="eyebrow !text-muted-2">{cs.clientName}</span>
          <span className="text-[10px] text-muted-3">· Saved just now</span>
        </div>
        <div className="flex gap-1.5">
          <StatusChip tone="neutral">Draft</StatusChip>
          <StatusChip tone="success">Published</StatusChip>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-5">
        <h2 className="font-display text-[22px] text-ink">{cs.title}</h2>
        <Tabs defaultValue="general" className="mt-4 gap-5">
          <TabsList>
            {["General", "Challenge", "Results", "Media", "SEO"].map((t) => (
              <TabsTrigger key={t} value={t.toLowerCase()}>
                {t}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <div className="mt-5 space-y-4">
          <div>
            <div className="eyebrow mb-1.5">Case study title</div>
            <Input defaultValue={cs.title} />
          </div>
          <div>
            <div className="eyebrow mb-1.5">Subtitle</div>
            <textarea
              defaultValue={cs.subtitle}
              rows={2}
              className="w-full resize-none rounded-lg border border-line bg-input-bg px-3 py-2 text-[13px] text-ink outline-none focus-visible:border-gold/50"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="eyebrow mb-1.5">Client</div>
              <Input defaultValue={cs.clientName} />
            </div>
            <div>
              <div className="eyebrow mb-1.5">Category</div>
              <Input defaultValue={cs.category} />
            </div>
          </div>
          {cs.results && (
            <div>
              <div className="eyebrow mb-1.5">Key results</div>
              <div className="grid grid-cols-3 gap-2">
                {cs.results.map((r) => (
                  <div
                    key={r.label}
                    className="rounded-lg border border-line bg-input-bg p-3 text-center"
                  >
                    <div className="font-display text-[20px]" style={{ color: cs.accent }}>
                      {r.value}
                    </div>
                    <div className="eyebrow !text-muted-2 mt-1">{r.label}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 border-t border-line px-5 py-3">
        <Button variant="secondary" size="sm">
          Save draft
        </Button>
        <Button size="sm">Publish</Button>
        <Button variant="ghost" size="icon" className="ml-auto">
          <ExternalLink className="size-4" />
        </Button>
      </div>
    </div>
  );
}

export default function CaseStudiesPage() {
  const [activeId, setActiveId] = useState(caseStudies[0].id);
  const active = caseStudies.find((c) => c.id === activeId)!;

  return (
    <div className="flex h-full">
      {/* List pane */}
      <div className="flex flex-1 flex-col overflow-y-auto p-6 lg:p-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-[28px] font-semibold text-ink">Case Studies</h1>
            <p className="text-[13px] text-muted">3 published · 2 draft · 1 archived</p>
          </div>
          <Button size="sm">
            <Plus className="size-4" /> New case study
          </Button>
        </div>

        <div className="mt-6 overflow-hidden rounded-[12px] border border-line bg-card">
          <div className="grid grid-cols-[1fr_auto_auto] gap-4 border-b border-line px-4 py-2.5">
            <span className="eyebrow !text-muted-4">Title / Client</span>
            <span className="eyebrow !text-muted-4 w-20">Status</span>
            <span className="eyebrow !text-muted-4 w-24">Updated</span>
          </div>
          {caseStudies.map((cs) => (
            <button
              key={cs.id}
              onClick={() => setActiveId(cs.id)}
              className={cn(
                "grid w-full grid-cols-[1fr_auto_auto] items-center gap-4 border-b border-line-2 px-4 py-3 text-left transition-colors last:border-0 hover:bg-surface-3/40",
                cs.id === activeId && "bg-surface-3/60"
              )}
            >
              <div className="flex items-center gap-2.5">
                <span className="size-1.5 shrink-0 rounded-full" style={{ background: cs.accent }} />
                <div>
                  <div className={cn("text-[13px] font-medium", cs.status === "archived" ? "text-muted-2" : "text-ink")}>
                    {cs.title}
                  </div>
                  <div className="text-[11px] text-muted-3">{cs.clientName}</div>
                </div>
              </div>
              <div className="w-20">
                <StatusChip tone={STATUS_TONE[cs.status]} className="capitalize">
                  {cs.status}
                </StatusChip>
              </div>
              <div className="flex w-24 items-center justify-between text-[11px] text-muted-2">
                {cs.updated}
                <MoreHorizontal className="size-4 text-muted-3" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Editor panel */}
      <div className="hidden w-[440px] shrink-0 border-l border-line bg-card xl:block">
        <Editor cs={active} />
      </div>
    </div>
  );
}
