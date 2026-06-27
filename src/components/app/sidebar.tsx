"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutGrid,
  UserSearch,
  ClipboardList,
  FileText,
  FileSignature,
  IndianRupee,
  Wallet,
  Repeat,
  Users,
  UserCog,
  Sparkles,
  Images,
  BookOpen,
  BarChart3,
  Settings,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  badge?: { value: number; tone: "gold" | "blue" };
  /** Only visible to master admins (isSuper). */
  master?: boolean;
}

interface NavGroup {
  label: string;
  items: NavItem[];
}

const GROUPS: NavGroup[] = [
  {
    label: "Overview",
    items: [
      { label: "Dashboard", href: "/dashboard", icon: LayoutGrid },
      { label: "CRM / Leads", href: "/dashboard/crm", icon: UserSearch, badge: { value: 5, tone: "gold" } },
      { label: "Projects", href: "/dashboard/projects", icon: ClipboardList, badge: { value: 3, tone: "blue" } },
    ],
  },
  {
    label: "Business",
    items: [
      { label: "Proposals", href: "/dashboard/proposals", icon: FileText },
      { label: "Contracts", href: "/dashboard/contracts", icon: FileSignature },
      { label: "Invoicing", href: "/dashboard/invoicing", icon: IndianRupee },
      { label: "Retainers", href: "/dashboard/retainers", icon: Repeat },
      { label: "Finance", href: "/dashboard/finance", icon: Wallet, master: true },
    ],
  },
  {
    label: "Clients",
    items: [
      { label: "Clients", href: "/dashboard/clients", icon: Users, badge: { value: 5, tone: "gold" } },
      { label: "Team", href: "/dashboard/team", icon: UserCog, master: true },
      { label: "Brand Brain", href: "/dashboard/brand-brain", icon: Sparkles },
    ],
  },
  {
    label: "Production",
    items: [
      { label: "Creatives", href: "/dashboard/creatives", icon: Images },
      { label: "Case Studies", href: "/dashboard/case-studies", icon: BookOpen },
    ],
  },
];

const PINNED: NavItem[] = [
  { label: "Reports", href: "/dashboard/reports", icon: BarChart3 },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

function isActive(pathname: string, href: string) {
  if (href === "/dashboard") return pathname === "/dashboard";
  return pathname === href || pathname.startsWith(href + "/");
}

function NavLink({ item, active }: { item: NavItem; active: boolean }) {
  const Icon = item.icon;
  return (
    <Link
      href={item.href}
      className={cn(
        "group flex h-10 items-center gap-3 rounded-[7px] px-3 text-[13px] transition-colors duration-150",
        active
          ? "bg-[rgba(212,175,55,0.1)] font-medium text-gold"
          : "text-muted hover:bg-surface-3 hover:text-ink-2"
      )}
    >
      <Icon className={cn("size-[15px] shrink-0", active ? "text-gold" : "text-muted")} strokeWidth={1.7} />
      <span className="flex-1 truncate">{item.label}</span>
      {item.badge && (
        <span
          className={cn(
            "flex h-[18px] min-w-[18px] items-center justify-center rounded-full px-1.5 text-[10px] font-semibold",
            item.badge.tone === "gold"
              ? "bg-gold/15 text-gold"
              : "bg-info/15 text-info"
          )}
        >
          {item.badge.value}
        </span>
      )}
    </Link>
  );
}

export function Sidebar({ isSuper = false }: { isSuper?: boolean }) {
  const pathname = usePathname();
  const visible = (items: NavItem[]) => items.filter((i) => !i.master || isSuper);

  return (
    <aside className="hidden w-[260px] shrink-0 flex-col border-r border-line bg-paper lg:flex">
      <nav className="flex flex-1 flex-col gap-5 overflow-y-auto p-2.5 pt-4">
        {GROUPS.map((group) => {
          const items = visible(group.items);
          if (items.length === 0) return null;
          return (
            <div key={group.label} className="flex flex-col gap-0.5">
              <div className="eyebrow px-3 pb-1.5">{group.label}</div>
              {items.map((item) => (
                <NavLink key={item.href} item={item} active={isActive(pathname, item.href)} />
              ))}
            </div>
          );
        })}
      </nav>
      <div className="flex flex-col gap-0.5 border-t border-line p-2.5">
        {PINNED.map((item) => (
          <NavLink key={item.href} item={item} active={isActive(pathname, item.href)} />
        ))}
      </div>
    </aside>
  );
}
