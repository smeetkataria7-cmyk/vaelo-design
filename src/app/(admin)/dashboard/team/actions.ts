"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

import { getViewer } from "@/lib/auth";
import { addTeamMember, removeTeamMember, inviteUserByEmail } from "@/lib/team";

async function requireSuper() {
  const v = await getViewer();
  if (!v.isSuper) throw new Error("Not authorized");
  return v;
}

/**
 * Invite a person as client / admin / master admin.
 * - admin/super are recorded in team_members (so they get that role on sign-in)
 * - clients need no role row (anyone signed in who isn't admin/super is a client)
 * Everyone is emailed a Supabase invite to set a password (best-effort).
 */
export async function inviteTeamMemberAction(formData: FormData) {
  const v = await requireSuper();
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const role = String(formData.get("role") || "admin"); // client | admin | super
  if (!email) return;

  if (role === "admin" || role === "super") {
    await addTeamMember(email, role, v.email ?? "");
  }

  const h = await headers();
  const origin = process.env.NEXT_PUBLIC_SITE_URL || `https://${h.get("host")}`;
  await inviteUserByEmail(email, `${origin}/auth/callback?next=/set-password`);

  revalidatePath("/dashboard/team");
}

export async function removeTeamMemberAction(email: string) {
  await requireSuper();
  await removeTeamMember(email);
  revalidatePath("/dashboard/team");
}
