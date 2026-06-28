"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { getViewer } from "@/lib/auth";
import { createProposal, type ProposalItem } from "@/lib/proposals";

export async function createProposalAction(formData: FormData) {
  const v = await getViewer();
  if (!v.isAdmin) throw new Error("Not authorized");

  const title = String(formData.get("title") || "").trim();
  const client_name = String(formData.get("client_name") || "").trim();
  const client_email = String(formData.get("client_email") || "").trim();
  const notes = String(formData.get("notes") || "").trim();
  let items: ProposalItem[] = [];
  try {
    items = JSON.parse(String(formData.get("items") || "[]"));
  } catch {
    items = [];
  }
  if (!title || !client_name || items.length === 0) return;

  await createProposal({ title, client_name, client_email, items, notes });
  revalidatePath("/dashboard/proposals");
  redirect("/dashboard/proposals");
}
