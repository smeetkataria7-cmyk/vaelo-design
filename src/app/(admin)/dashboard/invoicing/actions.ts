"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { getViewer } from "@/lib/auth";
import { createInvoice, type InvoiceItem } from "@/lib/invoices";

export async function createInvoiceAction(formData: FormData) {
  const v = await getViewer();
  if (!v.isAdmin) throw new Error("Not authorized");

  const client_name = String(formData.get("client_name") || "").trim();
  const client_email = String(formData.get("client_email") || "").trim();
  const notes = String(formData.get("notes") || "").trim();
  const gst_percent = Number(String(formData.get("gst_percent") || "18").replace(/[^\d.]/g, "")) || 0;
  const due_date = String(formData.get("due_date") || "").trim() || null;
  let items: InvoiceItem[] = [];
  try {
    items = JSON.parse(String(formData.get("items") || "[]"));
  } catch {
    items = [];
  }
  if (!client_name || items.length === 0) return;

  await createInvoice({ client_name, client_email, items, gst_percent, due_date, notes });
  revalidatePath("/dashboard/invoicing");
  redirect("/dashboard/invoicing");
}
