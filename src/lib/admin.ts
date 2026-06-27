/**
 * Roles come from env (comma-separated lists):
 *   NEXT_PUBLIC_ADMIN_EMAILS="a@x.com, b@x.com"        → admins
 *   NEXT_PUBLIC_SUPER_ADMIN_EMAILS="owner@x.com"        → master admins
 * (Singular NEXT_PUBLIC_ADMIN_EMAIL / NEXT_PUBLIC_SUPER_ADMIN_EMAIL still work.)
 * Super admins are automatically admins too.
 */
function parse(...vals: (string | undefined)[]): string[] {
  return vals
    .join(",")
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
}

export function superAdminEmails(): string[] {
  return parse(
    process.env.NEXT_PUBLIC_SUPER_ADMIN_EMAILS,
    process.env.NEXT_PUBLIC_SUPER_ADMIN_EMAIL
  );
}

export function adminEmails(): string[] {
  const all = [
    ...parse(process.env.NEXT_PUBLIC_ADMIN_EMAILS, process.env.NEXT_PUBLIC_ADMIN_EMAIL),
    ...superAdminEmails(),
  ];
  return [...new Set(all)];
}

export function isAdminEmail(email?: string | null): boolean {
  if (!email) return false;
  return adminEmails().includes(email.toLowerCase());
}

export function isSuperAdminEmail(email?: string | null): boolean {
  if (!email) return false;
  return superAdminEmails().includes(email.toLowerCase());
}
