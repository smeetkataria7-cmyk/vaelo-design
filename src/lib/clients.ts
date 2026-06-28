import { getSupabaseAdmin } from "./supabase/admin";
import { adminEmails } from "./admin";
import { listTeam } from "./team";

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

/** Emails that are admins/master admins (env + team_members) — never "clients". */
async function adminEmailSet(): Promise<Set<string>> {
  const set = new Set(adminEmails().map((e) => e.toLowerCase()));
  try {
    (await listTeam()).forEach((m) => set.add(m.email.toLowerCase()));
  } catch {
    // team_members unreachable — env admins still excluded
  }
  return set;
}

/**
 * All clients = signed-up client accounts (anyone who isn't an admin/master)
 * merged with clients referenced in records (proposals/invoices/etc.).
 * This is what the Clients page shows.
 */
export async function listClients(): Promise<ClientOption[]> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return [];

  const admins = await adminEmailSet();
  const map = new Map<string, string>();

  // 1) Real auth accounts that aren't admins → these are clients with portal access.
  try {
    const { data } = await supabase.auth.admin.listUsers();
    for (const u of data?.users ?? []) {
      const e = (u.email || "").toLowerCase();
      if (!e || admins.has(e)) continue;
      const name = (u.user_metadata?.name as string) || (u.user_metadata?.full_name as string) || "";
      map.set(e, name);
    }
  } catch {
    // listUsers unavailable — fall back to record-derived only
  }

  // 2) Clients referenced in records (may not have signed up yet).
  for (const c of await listClientOptions().catch(() => [])) {
    if (admins.has(c.email)) continue;
    if (!map.has(c.email) || (!map.get(c.email) && c.name)) map.set(c.email, c.name);
  }

  return [...map.entries()]
    .map(([email, name]) => ({ email, name }))
    .sort((a, b) => (a.name || a.email).localeCompare(b.name || b.email));
}
