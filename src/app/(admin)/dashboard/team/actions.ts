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
 * Invite a team member by email + role. Adds them to team_members so they get
 * that role the moment they sign in with this email. (They create their own
 * login at /auth/login → "Create an account" using this same email.)
 */
export async function inviteTeamMemberAction(formData: FormData) {
  const v = await requireSuper();
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const roleRaw = String(formData.get("role") || "admin");
  const role: "admin" | "super" = roleRaw === "super" ? "super" : "admin";
  if (!email) return;

  await addTeamMember(email, role, v.email ?? "");
  revalidatePath("/dashboard/team");
}

export async function removeTeamMemberAction(email: string) {
  await requireSuper();
  await removeTeamMember(email);
  revalidatePath("/dashboard/team");
}
