import { getSupabaseAdmin } from "./supabase/admin";
import { getViewer } from "./auth";

export type ProposalItem = { desc: string; amount: number };

export type Proposal = {
  id: string;
  title: string;
  client_name: string;
  client_email: string;
  items: ProposalItem[];
  total: number;
  notes: string;
  public_token: string;
  status: "draft" | "sent" | "viewed" | "accepted" | "declined";
  viewed_at: string | null;
  accepted_at: string | null;
  created_by: string;
  created_at: string;
};

function db() {
  const supabase = getSupabaseAdmin();
  if (!supabase) throw new Error("Supabase is not configured.");
  return supabase;
}

export async function createProposal(input: {
  title: string;
  client_name: string;
  client_email?: string;
  items: ProposalItem[];
  notes?: string;
}): Promise<Proposal> {
  const total = input.items.reduce((s, i) => s + (Number(i.amount) || 0), 0);
  const { data, error } = await db()
    .from("proposals")
    .insert({
      title: input.title,
      client_name: input.client_name,
      client_email: input.client_email ?? "",
      items: input.items,
      total,
      notes: input.notes ?? "",
      public_token: crypto.randomUUID(),
      status: "sent",
      created_by: (await getViewer()).email ?? "",
    })
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data as Proposal;
}

export async function listProposals(): Promise<Proposal[]> {
  const { data, error } = await db()
    .from("proposals")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? []) as Proposal[];
}

export async function getProposalByToken(token: string): Promise<Proposal | null> {
  const { data, error } = await db()
    .from("proposals")
    .select("*")
    .eq("public_token", token)
    .maybeSingle();
  if (error) throw new Error(error.message);
  return (data as Proposal) ?? null;
}

export async function getProposalsForEmail(email: string): Promise<Proposal[]> {
  if (!email) return [];
  const { data, error } = await db()
    .from("proposals")
    .select("*")
    .ilike("client_email", email)
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? []) as Proposal[];
}

export async function markViewed(token: string): Promise<void> {
  await db()
    .from("proposals")
    .update({ status: "viewed", viewed_at: new Date().toISOString() })
    .eq("public_token", token)
    .eq("status", "sent");
}

export async function setProposalStatus(
  token: string,
  status: "accepted" | "declined"
): Promise<void> {
  const patch: Record<string, unknown> = { status };
  if (status === "accepted") patch.accepted_at = new Date().toISOString();
  const { error } = await db().from("proposals").update(patch).eq("public_token", token);
  if (error) throw new Error(error.message);
}
