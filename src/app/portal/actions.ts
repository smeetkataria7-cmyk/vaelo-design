"use server";

import { revalidatePath } from "next/cache";

import { getViewer } from "@/lib/auth";
import { listFilesForEmail, setFileStatus } from "@/lib/files";
import { getContractsForEmail, signContract } from "@/lib/contracts";

async function ownsFile(email: string, id: string): Promise<boolean> {
  const files = await listFilesForEmail(email);
  return files.some((f) => f.id === id);
}

export async function approveFileAction(id: string) {
  const v = await getViewer();
  if (!v.email || !(await ownsFile(v.email, id))) return;
  await setFileStatus(id, "approved");
  revalidatePath("/portal/approve");
  revalidatePath("/portal");
}

export async function reviseFileAction(id: string) {
  const v = await getViewer();
  if (!v.email || !(await ownsFile(v.email, id))) return;
  await setFileStatus(id, "revision");
  revalidatePath("/portal/approve");
  revalidatePath("/portal");
}

export async function signContractAction(token: string) {
  const v = await getViewer();
  if (!v.email) return;
  const contracts = await getContractsForEmail(v.email);
  const c = contracts.find((x) => x.public_token === token);
  if (!c) return;
  await signContract(token, c.client_name || v.email);
  revalidatePath("/portal/sign");
  revalidatePath("/portal");
}
