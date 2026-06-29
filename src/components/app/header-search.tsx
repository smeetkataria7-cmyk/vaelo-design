"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

export function HeaderSearch() {
  const router = useRouter();
  const [q, setQ] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const t = q.trim();
    if (t) router.push(`/dashboard/search?q=${encodeURIComponent(t)}`);
  }

  return (
    <form onSubmit={submit} className="relative w-full max-w-[340px]">
      <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-3" strokeWidth={1.7} />
      <input
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search clients, proposals, invoices…"
        className="h-9 w-full rounded-lg border border-line bg-input-bg pl-9 pr-3 text-[13px] text-ink placeholder:text-muted-2 outline-none transition-colors focus-visible:border-gold/50"
      />
    </form>
  );
}
