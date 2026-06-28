import { getViewer } from "@/lib/auth";
import { getLeads } from "@/lib/leads";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const esc = (v: unknown) => `"${String(v ?? "").replace(/"/g, '""')}"`;

export async function GET() {
  const viewer = await getViewer();
  if (!viewer.isAdmin) return new Response("Forbidden", { status: 403 });

  const leads = await getLeads().catch(() => []);
  const header = ["Name", "Brand", "Email", "Instagram", "Goal", "Source", "Status", "Created"];
  const rows = leads.map((l) => [
    l.name, l.brand, l.email, l.instagram, l.goal, l.source, l.status, l.created_at,
  ]);
  const csv = [header, ...rows].map((r) => r.map(esc).join(",")).join("\r\n");

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="vaelo-leads-${new Date().toISOString().slice(0, 10)}.csv"`,
    },
  });
}
