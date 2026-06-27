"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getViewer } from "@/lib/auth";

/**
 * Where a freshly signed-in user should land, based on their role.
 * Admins / master admins → the dashboard; everyone else → the client portal.
 * Returns a path string (the login page does the client-side redirect).
 */
export async function signedInDestination(): Promise<string> {
  const viewer = await getViewer();
  return viewer.isAdmin ? "/dashboard" : "/portal";
}

export async function signOutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/auth/login");
}
