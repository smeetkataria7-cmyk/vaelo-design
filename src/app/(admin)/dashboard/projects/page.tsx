import { Plus, Sparkles, AlertCircle, Check } from "lucide-react";

import { PageHeader, PageShell } from "@/components/app/page-header";
import { AccentAvatar } from "@/components/app/accent-avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { type ChipTone } from "@/components/status-chip";
import { projects, type Milestone, type Project, type ProjectStatus } from "@/lib/mock";
import { formatINR, cn } from "@/lib/utils";

const STATUS_LABEL: Record<ProjectStatus, { label: string; tone: ChipTone }> = {
  active: { label: "Active", tone: "success" },
  at_risk: { label: "At Risk", tone: "warning" },
  onboarding: { label: "Onboarding", tone: "info" },
};

function MilestoneRow({ m }: { m: Milestone }) {
  const dot =
    m.state === "done" ? (
      <span className="grid size-4 place-items-center rounded-full bg-success/15">
        <Check className="size-2.5 text-success" strokeWidth={3} />
      </span>
    ) : m.state === "current" ? (
      <span className="size-4 rounded-full border-2 border-gold" />
    ) : m.state === "alert" ? (
      <span className="size-4 rounded-full bg-error/20 ring-2 ring-error/40" />
    ) : (
      <span className="size-4 rounded-full border border-line" />
    );

  return (
    <div className="flex items-center gap-2.5">
      {dot}
      <span
        className={cn(
          "flex-1 text-[12.5px]",
          m.state === "done" && "text-muted-2",
          m.state === "current" && "font-medium text-ink",
          m.state === "alert" && "text-error",
          m.state === "pending" && "text-muted-2"
        )}
      >
        {m.label}
      </span>
      {m.date && <span className="text-[11px] text-muted-3">{m.date}</span>}
    </div>
  );
}

function ProjectCard({ p }: { p: Project }) {
  const status = STATUS_LABEL[p.status];
  return (
    <Card className="gap-0 p-5">
      <div className="flex items-center gap-3">
        <AccentAvatar initial={p.clientName[0]} color={p.accent} size={40} />
        <div className="flex-1">
          <div className="text-[14px] font-medium text-ink">{p.clientName}</div>
          <div className="text-[11px] text-muted-2">{p.service}</div>
        </div>
        <span className="flex items-center gap-1.5 text-[12px]" style={{ color: status.tone === "success" ? "var(--success)" : status.tone === "warning" ? "var(--warning)" : "var(--info)" }}>
          <span className="size-1.5 rounded-full bg-current" /> {status.label}
        </span>
      </div>

      {/* AI status / alert */}
      <div
        className={cn(
          "mt-4 flex gap-2.5 rounded-[10px] border p-3",
          p.ai.kind === "alert"
            ? "border-error/25 bg-error/[0.06]"
            : "border-gold/25 bg-gold/[0.06]"
        )}
      >
        {p.ai.kind === "alert" ? (
          <AlertCircle className="size-4 shrink-0 text-error" />
        ) : (
          <Sparkles className="size-4 shrink-0 text-gold" />
        )}
        <div>
          <div className={cn("eyebrow", p.ai.kind === "alert" ? "!text-error" : "!text-gold")}>
            {p.ai.kind === "alert" ? "Alert" : "AI Status"}
          </div>
          <p className="mt-1 text-[12.5px] leading-relaxed text-ink-2">{p.ai.text}</p>
        </div>
      </div>

      {/* Milestones */}
      {p.milestones.length > 0 && (
        <div className="mt-4 flex flex-col gap-2.5">
          {p.milestones.map((m, i) => (
            <MilestoneRow key={i} m={m} />
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="mt-4 flex items-center justify-between border-t border-line-2 pt-4">
        {p.health ? (
          <span className="flex items-center gap-1.5 text-[12px] text-muted">
            <span>{p.health.band === "healthy" ? "🟢" : "🟡"}</span>
            Health{" "}
            <span className={p.health.band === "healthy" ? "text-success" : "text-warning"}>
              {p.health.score}
            </span>
          </span>
        ) : p.onboardingStep ? (
          <span className="text-[12px] text-info">
            Step {p.onboardingStep.current} of {p.onboardingStep.total}
          </span>
        ) : (
          <span />
        )}
        <span className="font-display text-[15px] text-gold">
          {formatINR(p.monthly)}
          <span className="text-[11px] text-muted-2">/mo</span>
        </span>
      </div>
    </Card>
  );
}

export default function ProjectsPage() {
  return (
    <PageShell>
      <PageHeader
        title="Projects"
        subtitle="3 active · 1 onboarding · 0 overdue milestones"
        actions={
          <Button size="sm">
            <Plus className="size-4" /> New project
          </Button>
        }
      />
      <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-2">
        {projects.map((p) => (
          <ProjectCard key={p.id} p={p} />
        ))}
      </div>
    </PageShell>
  );
}
