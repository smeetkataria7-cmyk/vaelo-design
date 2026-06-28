import { redirect } from "next/navigation";
import { LogOut } from "lucide-react";

import { TabBar } from "@/components/portal/tab-bar";
import { LogoLockup } from "@/components/app/logo";
import { getViewer } from "@/lib/auth";
import { signOutAction } from "@/app/auth/actions";

export const dynamic = "force-dynamic";

export default async function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const viewer = await getViewer();
  if (!viewer.email) redirect("/auth/login?next=/portal");

  return (
    <div className="min-h-screen bg-paper">
      <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-line bg-paper px-4 sm:px-6">
        <LogoLockup />
        <div className="flex items-center gap-3">
          <span className="hidden max-w-[220px] truncate text-[13px] text-muted sm:block">
            {viewer.email}
          </span>
          <form action={signOutAction}>
            <button
              type="submit"
              aria-label="Sign out"
              title="Sign out"
              className="grid size-9 place-items-center rounded-lg text-muted transition-colors hover:bg-surface-3 hover:text-ink"
            >
              <LogOut className="size-[17px]" strokeWidth={1.7} />
            </button>
          </form>
        </div>
      </header>

      <TabBar />

      <main className="mx-auto w-full max-w-[760px] pb-12">{children}</main>
    </div>
  );
}
