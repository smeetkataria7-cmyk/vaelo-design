import { redirect } from "next/navigation";
import { UserPlus, ShieldCheck } from "lucide-react";

import { getViewer } from "@/lib/auth";
import { adminEmails, superAdminEmails } from "@/lib/admin";
import { listTeam, teamConfigured } from "@/lib/team";
import { PageHeader, PageShell } from "@/components/app/page-header";
import { AccentAvatar } from "@/components/app/accent-avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { StatusChip } from "@/components/status-chip";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { inviteTeamMemberAction, removeTeamMemberAction } from "./actions";

export const dynamic = "force-dynamic";

type Row = {
  email: string;
  label: "Master admin" | "Admin";
  removable: boolean;
  source: string;
};

export default async function TeamPage() {
  const viewer = await getViewer();
  if (!viewer.isSuper) redirect("/dashboard");

  // Merge env-configured roles (not removable) with invited team_members.
  const envSupers = new Set(superAdminEmails());
  const rows = new Map<string, Row>();
  adminEmails().forEach((e) =>
    rows.set(e, {
      email: e,
      label: envSupers.has(e) ? "Master admin" : "Admin",
      removable: false,
      source: "env",
    })
  );

  let dbError = false;
  if (teamConfigured()) {
    try {
      const team = await listTeam();
      team.forEach((m) => {
        if (!rows.has(m.email)) {
          rows.set(m.email, {
            email: m.email,
            label: m.role === "super" ? "Master admin" : "Admin",
            removable: true,
            source: "invited",
          });
        }
      });
    } catch {
      dbError = true;
    }
  }

  const members = [...rows.values()];

  return (
    <PageShell>
      <PageHeader
        title="Team"
        subtitle={`${members.length} ${members.length === 1 ? "member" : "members"} · admins & master admins`}
      />

      {/* Invite */}
      <Card className="mt-6 gap-4 p-5">
        <div className="flex items-center gap-2">
          <UserPlus className="size-4 text-gold" />
          <div className="text-[14px] font-semibold text-ink">Invite a team member</div>
        </div>
        <form action={inviteTeamMemberAction} className="flex flex-wrap items-end gap-3">
          <div className="flex-1 min-w-[220px]">
            <label htmlFor="email" className="eyebrow !text-muted-2">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="person@email.com"
              className="mt-1.5 h-9 w-full rounded-lg border border-line bg-input-bg px-3 text-[13px] text-ink placeholder:text-muted-2 outline-none focus-visible:border-gold/50"
            />
          </div>
          <div>
            <label htmlFor="role" className="eyebrow !text-muted-2">Role</label>
            <select
              id="role"
              name="role"
              defaultValue="client"
              className="mt-1.5 h-9 rounded-lg border border-line bg-input-bg px-3 text-[13px] text-ink outline-none focus-visible:border-gold/50"
            >
              <option value="client">Client (portal)</option>
              <option value="admin">Admin</option>
              <option value="super">Master admin</option>
            </select>
          </div>
          <Button type="submit" size="sm" className="h-9">
            <UserPlus className="size-4" /> Send invite
          </Button>
        </form>
        <p className="text-[12px] text-muted-2">
          Sets their role, then they sign up at the login page with this email.
          <span className="text-ink-2"> Clients</span> land in the portal;
          <span className="text-ink-2"> admins</span> get the dashboard;
          <span className="text-ink-2"> master admins</span> also get Finance &amp; Team.
        </p>
        {dbError && (
          <p className="text-[12px] text-error">
            Can&apos;t reach the team_members table — check Supabase keys and that team_members.sql has been run.
          </p>
        )}
      </Card>

      {/* Members */}
      <Card className="mt-5 overflow-hidden p-0">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>Member</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Source</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {members.map((m) => (
              <TableRow key={m.email}>
                <TableCell>
                  <div className="flex items-center gap-2.5">
                    <AccentAvatar
                      initial={(m.email[0] || "?").toUpperCase()}
                      color={m.label === "Master admin" ? "#d4af37" : "#3b82f6"}
                      size={32}
                    />
                    <span className="text-[13px] text-ink">{m.email}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <StatusChip color={m.label === "Master admin" ? "var(--gold)" : "var(--info)"}>
                    {m.label}
                  </StatusChip>
                </TableCell>
                <TableCell className="text-muted-2">
                  {m.source === "env" ? "Owner (env)" : "Invited"}
                </TableCell>
                <TableCell className="text-right">
                  {m.removable ? (
                    <form action={removeTeamMemberAction.bind(null, m.email)}>
                      <Button type="submit" variant="ghost" size="sm" className="text-error hover:text-error">
                        Remove
                      </Button>
                    </form>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[11px] text-muted-3">
                      <ShieldCheck className="size-3.5" /> Protected
                    </span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </PageShell>
  );
}
