"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { getViewer } from "@/lib/auth";
import { createReportFromForm } from "@/lib/reports";

export async function createReportAction(formData: FormData) {
  const v = await getViewer();
  if (!v.isAdmin) throw new Error("Not authorized");
  await createReportFromForm(formData);
  revalidatePath("/dashboard/reports");
  redirect("/dashboard/reports");
}
