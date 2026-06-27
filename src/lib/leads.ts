import { getSupabaseAdmin } from "./supabase/admin";

export type Lead = {
  id: string;
  name: string;
  brand: string;
  email: string;
  instagram: string;
  goal: string;
  source: string;
  status: string;
  created_at: string;
};

export type NewLead = {
  name: string;
  brand: string;
  email: string;
  instagram?: string;
  goal?: string;
  source?: string;
};

/** Save a lead to the shared Supabase `leads` table. */
export async function saveLead(input: NewLead): Promise<Lead> {
  const supabase = getSupabaseAdmin();
  if (!supabase) throw new Error("Supabase is not configured.");

  const base = {
    name: input.name,
    brand: input.brand,
    email: input.email,
    instagram: input.instagram ?? "",
    goal: input.goal ?? "",
    source: input.source ?? "website",
    status: "new",
  };

  const { data, error } = await supabase.from("leads").insert(base).select().single();
  if (error) throw new Error(`Supabase insert failed: ${error.message}`);
  return data as Lead;
}

/** All leads, newest first (for the CRM board). Empty list if not configured. */
export async function getLeads(): Promise<Lead[]> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw new Error(`Supabase select failed: ${error.message}`);
  return (data ?? []) as Lead[];
}
