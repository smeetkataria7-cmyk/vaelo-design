"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { getViewer } from "@/lib/auth";
import { createContract } from "@/lib/contracts";

export async function createContractAction(formData: FormData) {
  const v = await getViewer();
  if (!v.isAdmin) throw new Error("Not authorized");

  const title = String(formData.get("title") || "").trim();
  const client_name = String(formData.get("client_name") || "").trim();
  const client_email = String(formData.get("client_email") || "").trim();
  const body = String(formData.get("body") || "").trim();
  const file_link = String(formData.get("file_link") || "").trim();
  if (!title || !client_name) return;

  await createContract({ title, client_name, client_email, body, file_link });
  revalidatePath("/dashboard/contracts");
  redirect("/dashboard/contracts");
}
