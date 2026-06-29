"use client";

import { useState } from "react";
import Link from "next/link";
import { Bell } from "lucide-react";

import type { Notif } from "@/lib/notifications";

const TONE: Record<string, string> = {
  gold: "var(--gold)",
  info: "var(--info)",
  success: "var(--success)",
  error: "var(--error)",
  neutral: "var(--muted)",
};

function timeAgo(iso: string): string {
  if (!iso) return "";
  const s = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (s < 60) return "just now";
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  return `${d}d ago`;
}

export function NotificationsBell({ items }: { items: Notif[] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label="Notifications"
        className="relative grid size-9 place-items-center rounded-lg text-muted transition-colors hover:bg-surface-3 hover:text-ink"
      >
        <Bell className="size-[18px]" strokeWidth={1.7} />
        {items.length > 0 && (
          <span className="absolute right-1 top-1 grid h-4 min-w-4 place-items-center rounded-full bg-gold px-1 text-[9px] font-bold text-[#0a0a0a]">
            {items.length > 9 ? "9+" : items.length}
          </span>
        )}
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 z-50 mt-2 w-[320px] overflow-hidden rounded-xl border border-line bg-card shadow-[0_12px_40px_rgba(0,0,0,0.5)]">
            <div className="flex items-center justify-between border-b border-line-2 px-4 py-3">
              <span className="text-[13px] font-semibold text-ink">Notifications</span>
              {items.length > 0 && <span className="text-[11px] text-muted-2">{items.length}</span>}
            </div>
            {items.length === 0 ? (
              <p className="px-4 py-8 text-center text-[12px] text-muted-2">You&apos;re all caught up.</p>
            ) : (
              <div className="max-h-[360px] overflow-y-auto">
                {items.map((n) => (
                  <Link
                    key={n.id}
                    href={n.href}
                    onClick={() => setOpen(false)}
                    className="flex items-start gap-2.5 border-b border-line-2 px-4 py-3 last:border-0 hover:bg-surface-3/40"
                  >
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full" style={{ background: TONE[n.tone] }} />
                    <span className="flex-1">
                      <span className="block text-[12.5px] leading-snug text-ink-2">{n.text}</span>
                      <span className="mt-0.5 block text-[10px] text-muted-3">{timeAgo(n.at)}</span>
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
