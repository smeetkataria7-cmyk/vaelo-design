import { Plus, Search } from "lucide-react";

import { PageHeader, PageShell } from "@/components/app/page-header";
import { AccentAvatar } from "@/components/app/accent-avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { StatusChip } from "@/components/status-chip";
import { listClientOptions } from "@/lib/clients";
import { listProjects } from "@/lib/projects";
import { accentFor } from "@/lib/accent";

export const dynamic = "force-dynamic";

export default async function ClientsPage() {
  const [clients, projects] = await Promise.all([
    listClientOptions().catch(() => []),
    listProjects().catch(() => []),
  ]);

  const projCount = (email: string) =>
    projects.filter((p) => (p.client_email || "").toLowerCase() === email).length;
  const hasActive = (email: string) =>
    projects.some((p) => (p.client_email || "").toLowerCase() === email && p.status === "active");

  return (
    <PageShell>
      <PageHeader
        title="Clients"
        subtitle={
          clients.length
            ? `${clients.length} ${clients.length === 1 ? "client" : "clients"} across your workspace`
            : "Clients appear here from proposals, projects & invoices"
        }
        actions={
          <Button size="sm">
            <Plus className="size-4" /> New client
          </Button>
        }
      />

      {clients.length === 0 ? (
        <div className="mt-6 grid place-items-center rounded-[12px] border border-dashed border-line bg-card/40 py-16 text-center">
          <p className="text-[14px] font-medium text-ink-2">No clients yet</p>
          <p className="mt-1 text-[12px] text-muted-2">
            Send a proposal or create a project and the client shows up here.
          </p>
        </div>
      ) : (
        <>
          <div className="mt-6 flex items-center gap-3">
            <div className="relative max-w-xs flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-3" strokeWidth={1.7} />
              <input
                placeholder="Search clients…"
                className="h-9 w-full rounded-lg border border-line bg-input-bg pl-9 pr-3 text-[13px] text-ink placeholder:text-muted-2 outline-none focus-visible:border-gold/50"
              />
            </div>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {clients.map((c) => {
              const count = projCount(c.email);
              const display = c.name || c.email;
              return (
                <Card
                  key={c.email}
                  className="group relative items-center p-6 text-center transition-all duration-150 hover:border-gold/40 hover:shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
                >
                  {hasActive(c.email) && (
                    <StatusChip tone="gold" className="absolute left-4 top-4">
                      Active
                    </StatusChip>
                  )}
                  <AccentAvatar
                    initial={(display[0] || "?").toUpperCase()}
                    color={accentFor(c.email)}
                    size={52}
                    className="mx-auto"
                  />
                  <div className="mt-3 truncate font-display text-[16px] text-ink">{display}</div>
                  <div className="mt-1 truncate text-[11px] text-muted-2">{c.email}</div>
                  <div className="mt-5 w-full border-t border-line-2 pt-4">
                    <div className="font-display text-[20px] text-ink">{count || "—"}</div>
                    <div className="eyebrow !text-muted-2 mt-0.5">
                      {count === 1 ? "Project" : "Projects"}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </>
      )}
    </PageShell>
  );
}
