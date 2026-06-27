import { createClient } from "./supabase/server";
import { resolveRoles } from "./roles";

export type Viewer = { email: string | null; isAdmin: boolean; isSuper: boolean };

/** The currently signed-in viewer (email + roles). */
export async function getViewer(): Promise<Viewer> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const email = user?.email?.toLowerCase() ?? null;
  const { isAdmin, isSuper } = await resolveRoles(email);
  return { email, isAdmin, isSuper };
}

/** Admin can see everything; a client can only see records matching their email. */
export function canAccess(viewer: Viewer, clientEmail: string): boolean {
  if (viewer.isAdmin) return true;
  return !!viewer.email && !!clientEmail && viewer.email === clientEmail.toLowerCase();
}

/** A short label for the viewer's role, for the header. */
export function roleLabel(v: Viewer): string {
  if (v.isSuper) return "Master admin";
  if (v.isAdmin) return "Admin";
  return "Client";
}
