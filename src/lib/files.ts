import { getSupabaseAdmin } from "./supabase/admin";

const BUCKET = "client-files";

export type FileRec = {
  id: string;
  client_email: string;
  project_id: string | null;
  name: string;
  path: string;
  link: string;
  type: string;
  status: "pending" | "approved" | "revision";
  comment: string;
  created_at: string;
};

function db() {
  const supabase = getSupabaseAdmin();
  if (!supabase) throw new Error("Supabase is not configured.");
  return supabase;
}

/** Uploads a file to private storage and records it. */
export async function uploadClientFile(email: string, file: File): Promise<void> {
  const supabase = db();
  const safeName = file.name.replace(/[^\w.\-]/g, "_");
  const path = `${email.toLowerCase()}/${Date.now()}-${safeName}`;

  const { error: upErr } = await supabase.storage
    .from(BUCKET)
    .upload(path, file, { contentType: file.type || undefined, upsert: false });
  if (upErr) throw new Error(upErr.message);

  const { error } = await supabase.from("files").insert({
    client_email: email.toLowerCase(),
    name: file.name,
    path,
    type: file.type || "",
    status: "pending",
  });
  if (error) throw new Error(error.message);
}

export async function addFileLink(email: string, name: string, link: string): Promise<void> {
  const { error } = await db().from("files").insert({
    client_email: email.toLowerCase(),
    name,
    path: "",
    link,
    type: "link",
    status: "pending",
  });
  if (error) throw new Error(error.message);
}

export async function deleteFile(id: string): Promise<void> {
  const supabase = db();
  const { data } = await supabase.from("files").select("path").eq("id", id).maybeSingle();
  const path = (data as { path?: string } | null)?.path;
  if (path) await supabase.storage.from(BUCKET).remove([path]);
  const { error } = await supabase.from("files").delete().eq("id", id);
  if (error) throw new Error(error.message);
}

export async function listAllFiles(): Promise<FileRec[]> {
  const { data, error } = await db()
    .from("files")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? []) as FileRec[];
}

export async function listFilesForEmail(email: string): Promise<FileRec[]> {
  if (!email) return [];
  const { data, error } = await db()
    .from("files")
    .select("*")
    .ilike("client_email", email)
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? []) as FileRec[];
}

/** Short-lived signed URL to view/download a private file. */
export async function signedUrlFor(path: string): Promise<string | null> {
  const { data, error } = await db().storage.from(BUCKET).createSignedUrl(path, 60 * 60);
  if (error) return null;
  return data?.signedUrl ?? null;
}

export async function setFileStatus(
  id: string,
  status: FileRec["status"],
  comment = ""
): Promise<void> {
  const { error } = await db().from("files").update({ status, comment }).eq("id", id);
  if (error) throw new Error(error.message);
}
