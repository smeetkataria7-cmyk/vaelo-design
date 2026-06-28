import { getSupabaseAdmin } from "./supabase/admin";
import { getViewer } from "./auth";

export type FinanceEntry = {
  id: string;
  label: string;
  amount: number;
  kind: "income" | "expense";
  recurring: boolean;
  months: number;
  start_date: string;
  notes: string;
  created_by: string;
  created_at: string;
};

function db() {
  const supabase = getSupabaseAdmin();
  if (!supabase) throw new Error("Supabase is not configured.");
  return supabase;
}

export async function addFinanceEntry(formData: FormData): Promise<void> {
  const label = String(formData.get("label") || "").trim();
  const amount = Number(String(formData.get("amount") || "").replace(/[^\d.]/g, "")) || 0;
  const kind = String(formData.get("kind") || "expense") === "income" ? "income" : "expense";
  const recurring = String(formData.get("recurring") || "") === "on";
  const months = Math.max(1, Number(formData.get("months") || 1) || 1);
  const start_date =
    String(formData.get("start_date") || "").trim() || new Date().toISOString().slice(0, 10);
  const notes = String(formData.get("notes") || "").trim();
  if (!label || !amount) return;

  const { error } = await db().from("finance_entries").insert({
    label,
    amount,
    kind,
    recurring,
    months: recurring ? months : 1,
    start_date,
    notes,
    created_by: (await getViewer()).email ?? "",
  });
  if (error) throw new Error(error.message);
}

export async function listFinanceEntries(): Promise<FinanceEntry[]> {
  const { data, error } = await db()
    .from("finance_entries")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? []) as FinanceEntry[];
}

export async function deleteFinanceEntry(id: string): Promise<void> {
  const { error } = await db().from("finance_entries").delete().eq("id", id);
  if (error) throw new Error(error.message);
}

export type MonthPoint = { key: string; label: string; income: number; expense: number; net: number };

const ymOf = (d: Date) => d.getFullYear() * 12 + d.getMonth();

/** Builds monthly income/expense/net for the last `monthsBack` months. */
export function computeMonthly(
  entries: FinanceEntry[],
  invoiceIncomes: { amount: number; date: string }[],
  monthsBack = 12
): { points: MonthPoint[]; totals: { income: number; expense: number; net: number } } {
  const now = new Date();
  const points: MonthPoint[] = [];
  const startYm = ymOf(now) - (monthsBack - 1);

  for (let i = 0; i < monthsBack; i++) {
    const ym = startYm + i;
    const d = new Date(Math.floor(ym / 12), ym % 12, 1);
    points.push({
      key: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`,
      label: d.toLocaleDateString("en-IN", { month: "short", year: "2-digit" }),
      income: 0,
      expense: 0,
      net: 0,
    });
  }
  const idxOf = (ym: number) => ym - startYm;

  for (const e of entries) {
    const start = new Date(e.start_date);
    const sYm = ymOf(start);
    const span = e.recurring ? Math.max(1, e.months) : 1;
    for (let m = 0; m < span; m++) {
      const i = idxOf(sYm + m);
      if (i < 0 || i >= points.length) continue;
      if (e.kind === "income") points[i].income += e.amount;
      else points[i].expense += e.amount;
    }
  }

  for (const inc of invoiceIncomes) {
    const i = idxOf(ymOf(new Date(inc.date)));
    if (i < 0 || i >= points.length) continue;
    points[i].income += inc.amount;
  }

  let income = 0;
  let expense = 0;
  for (const p of points) {
    p.net = p.income - p.expense;
    income += p.income;
    expense += p.expense;
  }
  return { points, totals: { income, expense, net: income - expense } };
}
