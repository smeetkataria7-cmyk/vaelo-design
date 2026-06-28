import { getSupabaseAdmin } from "./supabase/admin";
import { getViewer } from "./auth";

export type InvoiceItem = { desc: string; amount: number };

export type Invoice = {
  id: string;
  number: string;
  client_name: string;
  client_email: string;
  proposal_id: string | null;
  items: InvoiceItem[];
  subtotal: number;
  gst_percent: number;
  total: number;
  due_date: string | null;
  notes: string;
  public_token: string;
  status: "draft" | "sent" | "paid" | "overdue" | "void";
  paid_at: string | null;
  last_reminded_on: string | null;
  created_by: string;
  created_at: string;
};

function db() {
  const supabase = getSupabaseAdmin();
  if (!supabase) throw new Error("Supabase is not configured.");
  return supabase;
}

export async function createInvoice(input: {
  client_name: string;
  client_email?: string;
  items: InvoiceItem[];
  gst_percent?: number;
  due_date?: string | null;
  notes?: string;
  proposal_id?: string | null;
}): Promise<Invoice> {
  const subtotal = input.items.reduce((s, i) => s + (Number(i.amount) || 0), 0);
  const gst = Number(input.gst_percent) || 0;
  const total = Math.round(subtotal * (1 + gst / 100));
  const number = `INV-${Date.now().toString().slice(-6)}`;

  const { data, error } = await db()
    .from("invoices")
    .insert({
      number,
      client_name: input.client_name,
      client_email: input.client_email ?? "",
      proposal_id: input.proposal_id ?? null,
      items: input.items,
      subtotal,
      gst_percent: gst,
      total,
      due_date: input.due_date || null,
      notes: input.notes ?? "",
      public_token: crypto.randomUUID(),
      status: "sent",
      created_by: (await getViewer()).email ?? "",
    })
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data as Invoice;
}

export async function listInvoices(): Promise<Invoice[]> {
  const { data, error } = await db()
    .from("invoices")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? []) as Invoice[];
}

export async function getInvoiceByToken(token: string): Promise<Invoice | null> {
  const { data, error } = await db()
    .from("invoices")
    .select("*")
    .eq("public_token", token)
    .maybeSingle();
  if (error) throw new Error(error.message);
  return (data as Invoice) ?? null;
}

export async function getInvoicesForEmail(email: string): Promise<Invoice[]> {
  if (!email) return [];
  const { data, error } = await db()
    .from("invoices")
    .select("*")
    .ilike("client_email", email)
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? []) as Invoice[];
}

export async function setInvoiceStatus(id: string, status: Invoice["status"]): Promise<void> {
  const patch: Record<string, unknown> = { status };
  if (status === "paid") patch.paid_at = new Date().toISOString();
  const { error } = await db().from("invoices").update(patch).eq("id", id);
  if (error) throw new Error(error.message);
}

/** True if a sent invoice is past its due date. */
export function isOverdue(inv: Invoice): boolean {
  return (
    inv.status === "sent" &&
    !!inv.due_date &&
    new Date(inv.due_date) < new Date(new Date().toDateString())
  );
}
