"use server";

import { revalidatePath } from "next/cache";

import { getViewer } from "@/lib/auth";
import { addFinanceEntry, deleteFinanceEntry } from "@/lib/finance";

async function requireSuper() {
  const v = await getViewer();
  if (!v.isSuper) throw new Error("Not authorized");
}

export async function addFinanceEntryAction(formData: FormData) {
  await requireSuper();
  await addFinanceEntry(formData);
  revalidatePath("/dashboard/finance");
}

export async function deleteFinanceEntryAction(id: string) {
  await requireSuper();
  await deleteFinanceEntry(id);
  revalidatePath("/dashboard/finance");
}
