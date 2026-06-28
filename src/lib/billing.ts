import { listInvoices } from "./invoices";
import { listClientOptions } from "./clients";

export type ClientBilling = {
  email: string;
  name: string;
  billed: number;
  paid: number;
  outstanding: number;
  count: number;
};

/** Per-client billing rollup (billed / paid / outstanding) from invoices. */
export async function clientBilling(): Promise<{
  rows: ClientBilling[];
  totals: { billed: number; paid: number; outstanding: number };
}> {
  const [invoices, clients] = await Promise.all([
    listInvoices().catch(() => []),
    listClientOptions().catch(() => []),
  ]);
  const nameByEmail = new Map(clients.map((c) => [c.email, c.name]));

  const map = new Map<string, ClientBilling>();
  for (const inv of invoices) {
    if (inv.status === "void") continue;
    const e = (inv.client_email || "").toLowerCase();
    if (!e) continue;
    const r =
      map.get(e) ||
      { email: e, name: nameByEmail.get(e) || "", billed: 0, paid: 0, outstanding: 0, count: 0 };
    r.billed += inv.total;
    r.count += 1;
    if (inv.status === "paid") r.paid += inv.total;
    else r.outstanding += inv.total;
    map.set(e, r);
  }

  const rows = [...map.values()].sort((a, b) => b.billed - a.billed);
  const totals = rows.reduce(
    (t, r) => ({
      billed: t.billed + r.billed,
      paid: t.paid + r.paid,
      outstanding: t.outstanding + r.outstanding,
    }),
    { billed: 0, paid: 0, outstanding: 0 }
  );
  return { rows, totals };
}
