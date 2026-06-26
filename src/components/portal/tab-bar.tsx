"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, CheckSquare, FolderArchive, Receipt, type LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

const TABS: { label: string; href: string; icon: LucideIcon }[] = [
  { label: "Home", href: "/portal", icon: Home },
  { label: "Approve", href: "/portal/approve", icon: CheckSquare },
  { label: "Vault", href: "/portal/vault", icon: FolderArchive },
  { label: "Bills", href: "/portal/bills", icon: Receipt },
];

export function TabBar() {
  const pathname = usePathname();
  return (
    <nav className="sticky bottom-0 z-20 grid grid-cols-4 border-t border-line bg-paper/95 backdrop-blur">
      {TABS.map((t) => {
        const active = pathname === t.href;
        const Icon = t.icon;
        return (
          <Link
            key={t.href}
            href={t.href}
            className={cn(
              "flex flex-col items-center gap-1 py-2.5 text-[10px] font-medium transition-colors",
              active ? "text-gold" : "text-muted-2 hover:text-ink-2"
            )}
          >
            <Icon className="size-5" strokeWidth={active ? 2 : 1.6} />
            {t.label}
          </Link>
        );
      })}
    </nav>
  );
}
