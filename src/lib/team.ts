import { getSupabaseAdmin } from "./supabase/admin";

export type TeamMemberRow = {
  id: string;
  email: string;
  role: "admin" | "super";
  added_by: string;
  created_at: string;
};

function db() {
  const supabase = getSupabaseAdmin();
  if (!supabase) throw new Error("Supabase is not configured.");
  return supabase;
}

/** Whether the team_members table is reachable (Supabase configured). */
export function teamConfigured(): boolean {
  return !!getSupabaseAdmin();
}

export async function listTeam(): Promise<TeamMemberRow[]> {
  const { data, error } = await db()
    .from("team_members")
    .select("*")
    .order("created_at", { ascending: true });
  if (error) throw new Error(error.message);
  return (data ?? []) as TeamMemberRow[];
}

export async function addTeamMember(
  email: string,
  role: "admin" | "super",
  by: string
): Promise<void> {
  const { error } = await db()
    .from("team_members")
    .upsert(
      { email: email.trim().toLowerCase(), role, added_by: by },
      { onConflict: "email" }
    );
  if (error) throw new Error(error.message);
}

export async function removeTeamMember(email: string): Promise<void> {
  const { error } = await db().from("team_members").delete().ilike("email", email);
  if (error) throw new Error(error.message);
}
