import { getSupabaseAdmin } from "./supabase/admin";

export type ClientOption = { email: string; name: string };

/** Distinct clients gathered from across the platform (by email). */
export async function listClientOptions(): Promise<ClientOption[]> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return [];

  const map = new Map<string, string>();
  const add = (email?: string | null, name?: string | null) => {
    const e = (email || "").trim().toLowerCase();
    if (!e) return;
    const existing = map.get(e);
    if (existing === undefined || (!existing && name)) map.set(e, name || existing || "");
  };

  const sources: { table: string; emailCol: string; nameCol: string }[] = [
    { table: "proposals", emailCol: "client_email", nameCol: "client_name" },
    { table: "projects", emailCol: "client_email", nameCol: "client_name" },
    { table: "invoices", emailCol: "client_email", nameCol: "client_name" },
    { table: "contracts", emailCol: "client_email", nameCol: "client_name" },
    { table: "leads", emailCol: "email", nameCol: "name" },
  ];

  for (const s of sources) {
    const { data } = await supabase.from(s.table).select(`${s.emailCol}, ${s.nameCol}`);
    const rows = (data ?? []) as unknown as Record<string, string>[];
    rows.forEach((row) => add(row[s.emailCol], row[s.nameCol]));
  }

  return [...map.entries()]
    .map(([email, name]) => ({ email, name }))
    .sort((a, b) => (a.name || a.email).localeCompare(b.name || b.email));
}
