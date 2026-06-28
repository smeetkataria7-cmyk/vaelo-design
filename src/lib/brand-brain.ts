import { getSupabaseAdmin } from "./supabase/admin";

export type BrandBrain = {
  id: string;
  client_email: string;
  client_name: string;
  colors: string;
  fonts: string;
  tone: string;
  audience: string;
  competitors: string;
  rules: string;
  links: string;
  notes: string;
  updated_at: string;
  created_at: string;
};

export const BRAND_FIELDS = [
  { name: "client_name", label: "Brand name", placeholder: "Your brand" },
  { name: "colors", label: "Colours", placeholder: "Hex codes or description — e.g. #0A0A0A, gold #C9A24B" },
  { name: "fonts", label: "Fonts", placeholder: "Montserrat, etc." },
  { name: "tone", label: "Tone of voice", placeholder: "Confident, warm, premium…" },
  { name: "audience", label: "Target audience", placeholder: "Who are we speaking to?" },
  { name: "competitors", label: "Competitors", placeholder: "Brands you compare to" },
  { name: "rules", label: "Brand rules", placeholder: "Dos & don'ts, must-use / never-use" },
  { name: "links", label: "Asset links", placeholder: "Drive/Dropbox links to logos & assets" },
  { name: "notes", label: "Anything else", placeholder: "Other context we should know" },
] as const;

function db() {
  const supabase = getSupabaseAdmin();
  if (!supabase) throw new Error("Supabase is not configured.");
  return supabase;
}

export async function getBrandBrainForEmail(email: string): Promise<BrandBrain | null> {
  if (!email) return null;
  const { data, error } = await db()
    .from("brand_brain")
    .select("*")
    .ilike("client_email", email)
    .maybeSingle();
  if (error) throw new Error(error.message);
  return (data as BrandBrain) ?? null;
}

export async function listBrandBrains(): Promise<BrandBrain[]> {
  const { data, error } = await db()
    .from("brand_brain")
    .select("*")
    .order("updated_at", { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? []) as BrandBrain[];
}

export async function upsertBrandBrain(
  email: string,
  fields: Record<string, string>
): Promise<void> {
  const row = {
    client_email: email.toLowerCase(),
    client_name: fields.client_name ?? "",
    colors: fields.colors ?? "",
    fonts: fields.fonts ?? "",
    tone: fields.tone ?? "",
    audience: fields.audience ?? "",
    competitors: fields.competitors ?? "",
    rules: fields.rules ?? "",
    links: fields.links ?? "",
    notes: fields.notes ?? "",
    updated_at: new Date().toISOString(),
  };
  const { error } = await db().from("brand_brain").upsert(row, { onConflict: "client_email" });
  if (error) throw new Error(error.message);
}
