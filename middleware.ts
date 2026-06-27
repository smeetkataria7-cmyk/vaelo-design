import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";
import { resolveRoles } from "@/lib/roles";

const LOGIN = "/auth/login";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Refresh the Supabase session and learn who the user is.
  const { response, user } = await updateSession(req);

  // Admin area (the dashboard) — must be signed in AS an admin or master admin.
  if (pathname === "/dashboard" || pathname.startsWith("/dashboard/")) {
    if (!user) {
      const url = req.nextUrl.clone();
      url.pathname = LOGIN;
      url.searchParams.set("next", pathname);
      return NextResponse.redirect(url);
    }
    const { isAdmin } = await resolveRoles(user.email);
    if (!isAdmin) {
      // A signed-in client landing on the dashboard goes to their portal.
      const url = req.nextUrl.clone();
      url.pathname = "/portal";
      return NextResponse.redirect(url);
    }
    // Master-admin-only sections (Finance, Team) are also enforced in-page.
  }

  // Client portal — must be signed in (any role).
  if (pathname === "/portal" || pathname.startsWith("/portal/")) {
    if (!user) {
      const url = req.nextUrl.clone();
      url.pathname = LOGIN;
      url.searchParams.set("next", pathname);
      return NextResponse.redirect(url);
    }
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
