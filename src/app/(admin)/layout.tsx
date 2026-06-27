import { redirect } from "next/navigation";

import { Header } from "@/components/app/header";
import { Sidebar } from "@/components/app/sidebar";
import { getViewer, roleLabel } from "@/lib/auth";

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

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-paper">
      <Header
        searchPlaceholder="Search clients, assets, case studies…"
        email={viewer.email}
        roleLabel={roleLabel(viewer)}
      />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar isSuper={viewer.isSuper} />
        <main className="flex-1 overflow-y-auto bg-paper-2">{children}</main>
      </div>
    </div>
  );
}
