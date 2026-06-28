import { redirect } from "next/navigation";

import { Header } from "@/components/app/header";
import { Sidebar } from "@/components/app/sidebar";
import { getViewer, roleLabel } from "@/lib/auth";
import { getLeads } from "@/lib/leads";
import { listProjects } from "@/lib/projects";
import { listClients } from "@/lib/clients";

export const dynamic = "force-dynamic";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const viewer = await getViewer();

  // Must be signed in, and must be an admin or master admin.
  if (!viewer.email) redirect("/auth/login?next=/dashboard");
  if (!viewer.isAdmin) redirect("/portal");

  // Real sidebar badge counts (no hard-coded demo numbers).
  const [leads, projects, clients] = await Promise.all([
    getLeads().catch(() => []),
    listProjects().catch(() => []),
    listClients().catch(() => []),
  ]);
  const counts = {
    leads: leads.filter((l) => (l.status || "new") === "new").length,
    projects: projects.filter((p) => p.status === "active").length,
    clients: clients.length,
  };

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-paper">
      <Header
        searchPlaceholder="Search clients, assets, case studies…"
        email={viewer.email}
        roleLabel={roleLabel(viewer)}
      />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar isSuper={viewer.isSuper} counts={counts} />
        <main className="flex-1 overflow-y-auto bg-paper-2">{children}</main>
      </div>
    </div>
  );
}
