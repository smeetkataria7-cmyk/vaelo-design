"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { getViewer } from "@/lib/auth";
import { listFilesForEmail, setFileStatus, signedUrlFor } from "@/lib/files";
import { getContractsForEmail, signContract } from "@/lib/contracts";
import { getProposalsForEmail, setProposalStatus } from "@/lib/proposals";

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

export async function downloadFileAction(id: string) {
  const v = await getViewer();
  if (!v.email) return;
  const files = await listFilesForEmail(v.email);
  const f = files.find((x) => x.id === id);
  if (!f?.path) return;
  const url = await signedUrlFor(f.path);
  if (url) redirect(url);
}

async function ownsProposal(email: string, token: string) {
  const proposals = await getProposalsForEmail(email);
  return proposals.some((p) => p.public_token === token);
}

export async function acceptProposalAction(token: string) {
  const v = await getViewer();
  if (!v.email || !(await ownsProposal(v.email, token))) return;
  await setProposalStatus(token, "accepted");
  revalidatePath("/portal/proposals");
  revalidatePath("/portal");
}

export async function declineProposalAction(token: string) {
  const v = await getViewer();
  if (!v.email || !(await ownsProposal(v.email, token))) return;
  await setProposalStatus(token, "declined");
  revalidatePath("/portal/proposals");
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
