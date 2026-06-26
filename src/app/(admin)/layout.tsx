import { Header } from "@/components/app/header";
import { Sidebar } from "@/components/app/sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen flex-col overflow-hidden bg-paper">
      <Header searchPlaceholder="Search clients, assets, case studies…" />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto bg-paper-2">{children}</main>
      </div>
    </div>
  );
}
