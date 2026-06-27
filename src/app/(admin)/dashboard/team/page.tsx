import { redirect } from "next/navigation";
import { UserPlus, Mail, MoreVertical } from "lucide-react";

import { getViewer } from "@/lib/auth";
import { PageHeader, PageShell } from "@/components/app/page-header";
import { AccentAvatar } from "@/components/app/accent-avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { StatusChip } from "@/components/status-chip";
import { team, teamRoleTone } from "@/lib/mock";

export const dynamic = "force-dynamic";

export default async function TeamPage() {
  const viewer = await getViewer();
  if (!viewer.isSuper) redirect("/dashboard");

  const active = team.filter((m) => m.status === "active").length;
  const invited = team.filter((m) => m.status === "invited").length;

  return (
    <PageShell>
      <PageHeader
        title="Team"
        subtitle={`${active} active · ${invited} invited · roles & client assignments`}
        actions={
          <Button size="sm">
            <UserPlus className="size-4" /> Invite member
          </Button>
        }
      />

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {team.map((m) => (
          <Card key={m.id} className="gap-0 p-5">
            <div className="flex items-start gap-3">
              <AccentAvatar initial={m.initial} color={m.accent} size={44} />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="truncate font-display text-[15px] text-ink">{m.name}</span>
                  {m.status === "invited" && (
                    <StatusChip tone="warning">Invited</StatusChip>
                  )}
                </div>
                <StatusChip color={teamRoleTone[m.role]} className="mt-1">
                  {m.role}
                </StatusChip>
              </div>
              <button className="grid size-7 shrink-0 place-items-center rounded-md text-muted-3 hover:bg-surface-3 hover:text-ink">
                <MoreVertical className="size-4" />
              </button>
            </div>

            <div className="mt-4 flex items-center gap-1.5 text-[12px] text-muted-2">
              <Mail className="size-3.5" /> {m.email}
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-line-2 pt-3">
              <span className="eyebrow !text-muted-2">Assigned clients</span>
              <span className="font-display text-[16px] text-ink">{m.clients || "—"}</span>
            </div>
          </Card>
        ))}

        {/* Invite tile */}
        <button className="grid min-h-[180px] place-items-center rounded-[12px] border border-dashed border-line text-muted-2 transition-colors hover:border-gold/40 hover:text-gold">
          <div className="flex flex-col items-center gap-2">
            <div className="grid size-11 place-items-center rounded-full border border-dashed border-current">
              <UserPlus className="size-5" />
            </div>
            <span className="text-[13px]">Invite a team member</span>
          </div>
        </button>
      </div>
    </PageShell>
  );
}
