"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { getViewer } from "@/lib/auth";
import { upsertBrandBrain, BRAND_FIELDS } from "@/lib/brand-brain";

export async function saveBrandBrainAction(formData: FormData) {
  const v = await getViewer();
  if (!v.isAdmin) throw new Error("Not authorized");

  const email = String(formData.get("client_email") || "").trim().toLowerCase();
  if (!email) return;

  const fields: Record<string, string> = {};
  for (const f of BRAND_FIELDS) fields[f.name] = String(formData.get(f.name) || "");

  await upsertBrandBrain(email, fields);
  revalidatePath("/dashboard/brand-brain");
  redirect("/dashboard/brand-brain");
}
