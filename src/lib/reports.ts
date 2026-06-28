import { getSupabaseAdmin } from "./supabase/admin";
import { getViewer } from "./auth";

export type Report = {
  id: string;
  client_email: string;
  title: string;
  period: string;
  platform: string;
  link: string;
  spend: number | null;
  reach: number | null;
  clicks: number | null;
  conversions: number | null;
  roas: string;
  notes: string;
  created_by: string;
  created_at: string;
};

function db() {
  const supabase = getSupabaseAdmin();
  if (!supabase) throw new Error("Supabase is not configured.");
  return supabase;
}

const num = (v: FormDataEntryValue | null): number | null => {
  const s = String(v ?? "").trim();
  if (!s) return null;
  const n = Number(s.replace(/[^\d.]/g, ""));
  return Number.isFinite(n) ? n : null;
};

export async function createReportFromForm(formData: FormData): Promise<void> {
  const client_email = String(formData.get("client_email") || "").trim().toLowerCase();
  const title = String(formData.get("title") || "").trim();
  if (!client_email || !title) return;

  const { error } = await db().from("reports").insert({
    client_email,
    title,
    period: String(formData.get("period") || "").trim(),
    platform: String(formData.get("platform") || "").trim(),
    link: String(formData.get("link") || "").trim(),
    spend: num(formData.get("spend")),
    reach: num(formData.get("reach")),
    clicks: num(formData.get("clicks")),
    conversions: num(formData.get("conversions")),
    roas: String(formData.get("roas") || "").trim(),
    notes: String(formData.get("notes") || "").trim(),
    created_by: (await getViewer()).email ?? "",
  });
  if (error) throw new Error(error.message);
}

export async function listReports(): Promise<Report[]> {
  const { data, error } = await db()
    .from("reports")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? []) as Report[];
}

export async function getReportsForEmail(email: string): Promise<Report[]> {
  if (!email) return [];
  const { data, error } = await db()
    .from("reports")
    .select("*")
    .ilike("client_email", email)
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? []) as Report[];
}

export async function deleteReport(id: string): Promise<void> {
  const { error } = await db().from("reports").delete().eq("id", id);
  if (error) throw new Error(error.message);
}
