import Link from "next/link";
import { UserPlus } from "lucide-react";

import { PageHeader, PageShell } from "@/components/app/page-header";
import { Button } from "@/components/ui/button";
import { ClientsGrid, type ClientItem } from "@/components/app/clients-grid";
import { listClients } from "@/lib/clients";
import { listProjects } from "@/lib/projects";

export const dynamic = "force-dynamic";

export default async function ClientsPage() {
  const [clients, projects] = await Promise.all([
    listClients().catch(() => []),
    listProjects().catch(() => []),
  ]);

  const items: ClientItem[] = clients.map((c) => {
    const mine = projects.filter((p) => (p.client_email || "").toLowerCase() === c.email);
    return {
      email: c.email,
      name: c.name,
      count: mine.length,
      active: mine.some((p) => p.status === "active"),
    };
  });

  return (
    <PageShell>
      <PageHeader
        title="Clients"
        subtitle={
          clients.length
            ? `${clients.length} ${clients.length === 1 ? "client" : "clients"}`
            : "Clients appear here when they sign up or get a proposal/invoice"
        }
        actions={
          <Button asChild size="sm">
            <Link href="/dashboard/team">
              <UserPlus className="size-4" /> New client
            </Link>
          </Button>
        }
      />

      {items.length === 0 ? (
        <div className="mt-6 grid place-items-center rounded-[12px] border border-dashed border-line bg-card/40 py-16 text-center">
          <p className="text-[14px] font-medium text-ink-2">No clients yet</p>
          <p className="mt-1 max-w-md text-[12px] text-muted-2">
            Invite a client (<span className="text-gold">New client</span>) or send a proposal — they show up here.
          </p>
        </div>
      ) : (
        <ClientsGrid items={items} />
      )}
    </PageShell>
  );
}
