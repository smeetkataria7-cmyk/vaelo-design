"use server";

import { revalidatePath } from "next/cache";

import { getViewer } from "@/lib/auth";
import { addTeamMember, removeTeamMember } from "@/lib/team";

async function requireSuper() {
  const v = await getViewer();
  if (!v.isSuper) throw new Error("Not authorized");
  return v;
}

/**
 * Assign a role by email. The person then signs up at the login page with this
 * same email and gets the role automatically:
 *  - admin/super → recorded in team_members
 *  - client → no row needed (anyone signed in who isn't admin/super is a client)
 * We deliberately do NOT pre-create the auth user, so their own sign-up works cleanly.
 */
export async function inviteTeamMemberAction(formData: FormData) {
  const v = await requireSuper();
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const role = String(formData.get("role") || "client"); // client | admin | super
  if (!email) return;

  if (role === "admin" || role === "super") {
    await addTeamMember(email, role, v.email ?? "");
  }
  revalidatePath("/dashboard/team");
}

export async function removeTeamMemberAction(email: string) {
  await requireSuper();
  await removeTeamMember(email);
  revalidatePath("/dashboard/team");
}
