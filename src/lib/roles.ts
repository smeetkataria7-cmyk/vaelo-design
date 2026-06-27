import { getSupabaseAdmin } from "./supabase/admin";
import { adminEmails, superAdminEmails } from "./admin";

export type Roles = { isAdmin: boolean; isSuper: boolean };

/**
 * Resolves a user's role from env (always-on bootstrap) OR the team_members
 * table (UI-managed). If the DB lookup fails, env roles still apply — so the
 * owner can never be locked out.
 */
export async function resolveRoles(email?: string | null): Promise<Roles> {
  if (!email) return { isAdmin: false, isSuper: false };
  const e = email.toLowerCase();

  let isSuper = superAdminEmails().includes(e);
  let isAdmin = adminEmails().includes(e) || isSuper;
  if (isAdmin && isSuper) return { isAdmin, isSuper };

  try {
    const supabase = getSupabaseAdmin();
    if (supabase) {
      const { data } = await supabase
        .from("team_members")
        .select("role")
        .ilike("email", e)
        .maybeSingle();
      const role = (data as { role?: string } | null)?.role;
      if (role === "super") {
        isSuper = true;
        isAdmin = true;
      } else if (role === "admin") {
        isAdmin = true;
      }
    }
  } catch {
    // DB unavailable — env roles already applied.
  }

  return { isAdmin, isSuper };
}
