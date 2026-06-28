"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { getViewer } from "@/lib/auth";
import { addWork } from "@/lib/works";

export async function addWorkAction(formData: FormData) {
  const v = await getViewer();
  if (!v.isAdmin) throw new Error("Not authorized");
  await addWork(formData);
  revalidatePath("/dashboard/case-studies");
  redirect("/dashboard/case-studies");
}
