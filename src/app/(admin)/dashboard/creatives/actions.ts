"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { getViewer } from "@/lib/auth";
import { uploadClientFile, addFileLink, signedUrlFor, listAllFiles } from "@/lib/files";

export async function deliverFileAction(formData: FormData) {
  const v = await getViewer();
  if (!v.isAdmin) throw new Error("Not authorized");

  const email = String(formData.get("client_email") || "").trim().toLowerCase();
  const link = String(formData.get("link") || "").trim();
  const name = String(formData.get("name") || "").trim();
  const file = formData.get("file");
  if (!email) return;

  if (file instanceof File && file.size > 0) {
    await uploadClientFile(email, file);
  } else if (link) {
    await addFileLink(email, name || "Delivered file", link);
  }
  revalidatePath("/dashboard/creatives");
}

/** Admin: open any stored file via a short-lived signed URL. */
export async function openFileAction(id: string) {
  const v = await getViewer();
  if (!v.isAdmin) throw new Error("Not authorized");
  const files = await listAllFiles();
  const f = files.find((x) => x.id === id);
  if (!f?.path) return;
  const url = await signedUrlFor(f.path);
  if (url) redirect(url);
}
