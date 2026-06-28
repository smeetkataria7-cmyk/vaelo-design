import Link from "next/link";
import { Plus } from "lucide-react";

import { PageHeader, PageShell } from "@/components/app/page-header";
import { AccentAvatar } from "@/components/app/accent-avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { StatusChip, type ChipTone } from "@/components/status-chip";
import { listProjects, type Project } from "@/lib/projects";
import { accentFor } from "@/lib/accent";

export const dynamic = "force-dynamic";

const STATUS: Record<Project["status"], { label: string; tone: ChipTone }> = {
  active: { label: "Active", tone: "success" },
  onboarding: { label: "Onboarding", tone: "info" },
  paused: { label: "Paused", tone: "warning" },
  completed: { label: "Completed", tone: "neutral" },
};

function ProjectCard({ p }: { p: Project }) {
  const s = STATUS[p.status] ?? { label: p.status, tone: "neutral" as ChipTone };
  const who = p.client_name || p.client_email || "—";
  return (
    <Card className="gap-0 p-5">
      <div className="flex items-center gap-3">
        <AccentAvatar
          initial={(who[0] || "P").toUpperCase()}
          color={accentFor(p.client_email || p.client_name || p.id)}
          size={40}
        />
        <div className="min-w-0 flex-1">
          <div className="truncate text-[14px] font-medium text-ink">{p.title}</div>
          <div className="truncate text-[11px] text-muted-2">{who}</div>
        </div>
        <StatusChip tone={s.tone}>{s.label}</StatusChip>
      </div>
      <div className="mt-4 flex items-center justify-between border-t border-line-2 pt-4 text-[11px] text-muted-3">
        <span className="truncate">{p.client_email || "no email on file"}</span>
        <span className="shrink-0">Started {new Date(p.created_at).toLocaleDateString()}</span>
      </div>
    </Card>
  );
}

export default async function ProjectsPage() {
  const projects = await listProjects().catch(() => [] as Project[]);
  const active = projects.filter((p) => p.status === "active").length;
  const onboarding = projects.filter((p) => p.status === "onboarding").length;

  return (
    <PageShell>
      <PageHeader
        title="Projects"
        subtitle={
          projects.length
            ? `${projects.length} total · ${active} active · ${onboarding} onboarding`
            : "Projects appear here as clients are onboarded"
        }
        actions={
          <Button asChild size="sm">
            <Link href="/dashboard/projects/new">
              <Plus className="size-4" /> New project
            </Link>
          </Button>
        }
      />

      {projects.length === 0 ? (
        <div className="mt-6 grid place-items-center rounded-[12px] border border-dashed border-line bg-card/40 py-16 text-center">
          <p className="text-[14px] font-medium text-ink-2">No projects yet</p>
          <p className="mt-1 text-[12px] text-muted-2">
            They&apos;re created when a proposal is accepted, or add one manually.
          </p>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-2">
          {projects.map((p) => (
            <ProjectCard key={p.id} p={p} />
          ))}
        </div>
      )}
    </PageShell>
  );
}
