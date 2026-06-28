"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { getViewer } from "@/lib/auth";
import { saveLead } from "@/lib/leads";

export async function createLeadAction(formData: FormData) {
  const v = await getViewer();
  if (!v.isAdmin) throw new Error("Not authorized");

  const name = String(formData.get("name") || "").trim();
  const brand = String(formData.get("brand") || "").trim();
  const email = String(formData.get("email") || "").trim();
  if (!name || !brand || !email) return;

  await saveLead({
    name,
    brand,
    email,
    instagram: String(formData.get("instagram") || "").trim(),
    goal: String(formData.get("goal") || "").trim(),
    source: "manual",
  });
  revalidatePath("/dashboard/crm");
  redirect("/dashboard/crm");
}
