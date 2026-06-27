import { getSupabaseAdmin } from "./supabase/admin";
import { getViewer } from "./auth";

export type Project = {
  id: string;
  title: string;
  client_name: string;
  client_email: string;
  status: "onboarding" | "active" | "paused" | "completed";
  proposal_id: string | null;
  created_by: string;
  created_at: string;
};

function db() {
  const supabase = getSupabaseAdmin();
  if (!supabase) throw new Error("Supabase is not configured.");
  return supabase;
}

export async function createProject(input: {
  title: string;
  client_name: string;
  client_email?: string;
  proposal_id?: string | null;
  status?: Project["status"];
}): Promise<Project> {
  const { data, error } = await db()
    .from("projects")
    .insert({
      title: input.title,
      client_name: input.client_name,
      client_email: input.client_email ?? "",
      proposal_id: input.proposal_id ?? null,
      status: input.status ?? "active",
      created_by: (await getViewer()).email ?? "",
    })
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data as Project;
}

export async function listProjects(): Promise<Project[]> {
  const { data, error } = await db()
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? []) as Project[];
}

export async function getProjectsForEmail(email: string): Promise<Project[]> {
  if (!email) return [];
  const { data, error } = await db()
    .from("projects")
    .select("*")
    .ilike("client_email", email)
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? []) as Project[];
}

/** True when Supabase is configured (so pages can show an empty/setup state). */
export function projectsConfigured(): boolean {
  return !!getSupabaseAdmin();
}
