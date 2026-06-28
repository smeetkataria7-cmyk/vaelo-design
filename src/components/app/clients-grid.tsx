"use client";

import { useState } from "react";
import { Search } from "lucide-react";

import { AccentAvatar } from "@/components/app/accent-avatar";
import { Card } from "@/components/ui/card";
import { StatusChip } from "@/components/status-chip";
import { accentFor } from "@/lib/accent";

export type ClientItem = { email: string; name: string; count: number; active: boolean };

export function ClientsGrid({ items }: { items: ClientItem[] }) {
  const [q, setQ] = useState("");
  const query = q.trim().toLowerCase();
  const filtered = query
    ? items.filter((i) => `${i.name} ${i.email}`.toLowerCase().includes(query))
    : items;

  return (
    <>
      <div className="mt-6 flex items-center gap-3">
        <div className="relative max-w-xs flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-3" strokeWidth={1.7} />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search clients…"
            className="h-9 w-full rounded-lg border border-line bg-input-bg pl-9 pr-3 text-[13px] text-ink placeholder:text-muted-2 outline-none focus-visible:border-gold/50"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="mt-8 text-center text-[13px] text-muted-2">No clients match “{q}”.</p>
      ) : (
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((c) => {
            const display = c.name || c.email;
            return (
              <Card
                key={c.email}
                className="group relative items-center p-6 text-center transition-all duration-150 hover:border-gold/40 hover:shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
              >
                {c.active && (
                  <StatusChip tone="gold" className="absolute left-4 top-4">Active</StatusChip>
                )}
                <AccentAvatar
                  initial={(display[0] || "?").toUpperCase()}
                  color={accentFor(c.email)}
                  size={52}
                  className="mx-auto"
                />
                <div className="mt-3 truncate font-display text-[16px] text-ink">{display}</div>
                <div className="mt-1 truncate text-[11px] text-muted-2">{c.email}</div>
                <div className="mt-5 w-full border-t border-line-2 pt-4">
                  <div className="font-display text-[20px] text-ink">{c.count || "—"}</div>
                  <div className="eyebrow !text-muted-2 mt-0.5">{c.count === 1 ? "Project" : "Projects"}</div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </>
  );
}
