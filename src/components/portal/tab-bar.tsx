"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, FileText, CheckSquare, PenLine, FolderArchive, Receipt, type LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

const TABS: { label: string; href: string; icon: LucideIcon }[] = [
  { label: "Home", href: "/portal", icon: Home },
  { label: "Proposals", href: "/portal/proposals", icon: FileText },
  { label: "Approve", href: "/portal/approve", icon: CheckSquare },
  { label: "Sign", href: "/portal/sign", icon: PenLine },
  { label: "Vault", href: "/portal/vault", icon: FolderArchive },
  { label: "Bills", href: "/portal/bills", icon: Receipt },
];

export function TabBar() {
  const pathname = usePathname();
  return (
    <nav className="sticky top-16 z-30 flex items-center gap-1 overflow-x-auto border-b border-line bg-paper/95 px-3 backdrop-blur sm:px-6">
      {TABS.map((t) => {
        const active = pathname === t.href;
        const Icon = t.icon;
        return (
          <Link
            key={t.href}
            href={t.href}
            className={cn(
              "-mb-px flex items-center gap-2 whitespace-nowrap border-b-2 px-3 py-3 text-[13px] font-medium transition-colors",
              active ? "border-gold text-gold" : "border-transparent text-muted hover:text-ink-2"
            )}
          >
            <Icon className="size-4" strokeWidth={active ? 2 : 1.7} />
            {t.label}
          </Link>
        );
      })}
    </nav>
  );
}
