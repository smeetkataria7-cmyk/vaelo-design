import { redirect } from "next/navigation";

import { getViewer } from "@/lib/auth";

export const dynamic = "force-dynamic";

/**
 * Entry point. Routes to the right place by auth + role:
 *   not signed in → login
 *   admin / master admin → dashboard
 *   client → portal
 */
export default async function Home() {
  const viewer = await getViewer();
  if (!viewer.email) redirect("/auth/login");
  redirect(viewer.isAdmin ? "/dashboard" : "/portal");
}
