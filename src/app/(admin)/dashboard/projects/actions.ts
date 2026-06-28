"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { getViewer } from "@/lib/auth";
import { createProject, type Project } from "@/lib/projects";

export async function createProjectAction(formData: FormData) {
  const v = await getViewer();
  if (!v.isAdmin) throw new Error("Not authorized");

  const title = String(formData.get("title") || "").trim();
  const client_name = String(formData.get("client_name") || "").trim();
  const client_email = String(formData.get("client_email") || "").trim();
  const status = (String(formData.get("status") || "active") as Project["status"]) || "active";
  if (!title || !client_name) return;

  await createProject({ title, client_name, client_email, status });
  revalidatePath("/dashboard/projects");
  redirect("/dashboard/projects");
}
