"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";

import { formatINR } from "@/lib/utils";

type Row = { desc: string; amount: string };

const field =
  "h-9 rounded-lg border border-line bg-input-bg px-3 text-[13px] text-ink placeholder:text-muted-2 outline-none focus-visible:border-gold/50";

/**
 * Editable list of {desc, amount} rows. Serialises to a hidden `items` input as
 * JSON so a server action can read it from FormData. Shows a running total.
 */
export function LineItems() {
  const [rows, setRows] = useState<Row[]>([{ desc: "", amount: "" }]);

  const update = (i: number, key: keyof Row, val: string) =>
    setRows((rs) => rs.map((r, idx) => (idx === i ? { ...r, [key]: val } : r)));
  const add = () => setRows((rs) => [...rs, { desc: "", amount: "" }]);
  const remove = (i: number) => setRows((rs) => (rs.length === 1 ? rs : rs.filter((_, idx) => idx !== i)));

  const total = rows.reduce((s, r) => s + (Number(r.amount) || 0), 0);
  const serialised = JSON.stringify(
    rows.filter((r) => r.desc.trim()).map((r) => ({ desc: r.desc.trim(), amount: Number(r.amount) || 0 }))
  );

  return (
    <div>
      <input type="hidden" name="items" value={serialised} />
      <div className="space-y-2">
        {rows.map((r, i) => (
          <div key={i} className="flex items-center gap-2">
            <input
              value={r.desc}
              onChange={(e) => update(i, "desc", e.target.value)}
              placeholder="Description"
              className={`${field} flex-1`}
            />
            <input
              value={r.amount}
              onChange={(e) => update(i, "amount", e.target.value.replace(/[^\d.]/g, ""))}
              placeholder="Amount ₹"
              inputMode="decimal"
              className={`${field} w-32`}
            />
            <button
              type="button"
              onClick={() => remove(i)}
              className="grid size-9 shrink-0 place-items-center rounded-lg text-muted-3 hover:bg-surface-3 hover:text-error"
              aria-label="Remove line"
            >
              <X className="size-4" />
            </button>
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center justify-between">
        <button
          type="button"
          onClick={add}
          className="inline-flex items-center gap-1.5 text-[12px] text-gold hover:underline"
        >
          <Plus className="size-3.5" /> Add line
        </button>
        <div className="text-[13px] text-muted">
          Subtotal <span className="font-display text-ink">{formatINR(total)}</span>
        </div>
      </div>
    </div>
  );
}
