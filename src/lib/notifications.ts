import { getLeads } from "./leads";
import { listInvoices, isOverdue } from "./invoices";
import { listProposals } from "./proposals";
import { listContracts } from "./contracts";
import { listAllFiles } from "./files";

export type NotifTone = "gold" | "info" | "success" | "error" | "neutral";
export type Notif = { id: string; text: string; href: string; tone: NotifTone; at: string };

/** Builds a recent-activity / attention feed from real data. */
export async function getNotifications(): Promise<Notif[]> {
  const [leads, invoices, proposals, contracts, files] = await Promise.all([
    getLeads().catch(() => []),
    listInvoices().catch(() => []),
    listProposals().catch(() => []),
    listContracts().catch(() => []),
    listAllFiles().catch(() => []),
  ]);

  const n: Notif[] = [];

  leads
    .filter((l) => (l.status || "new") === "new")
    .forEach((l) =>
      n.push({ id: `lead-${l.id}`, text: `New lead — ${l.brand || l.name}`, href: "/dashboard/crm", tone: "gold", at: l.created_at })
    );

  invoices
    .filter((i) => i.status === "overdue" || isOverdue(i))
    .forEach((i) =>
      n.push({ id: `inv-${i.id}`, text: `Invoice ${i.number} is overdue`, href: "/dashboard/invoicing", tone: "error", at: i.created_at })
    );

  proposals
    .filter((p) => p.status === "accepted")
    .forEach((p) =>
      n.push({ id: `prop-a-${p.id}`, text: `Proposal accepted — ${p.title}`, href: "/dashboard/proposals", tone: "success", at: p.accepted_at || p.created_at })
    );
  proposals
    .filter((p) => p.status === "declined")
    .forEach((p) =>
      n.push({ id: `prop-d-${p.id}`, text: `Proposal declined — ${p.title}`, href: "/dashboard/proposals", tone: "error", at: p.created_at })
    );

  contracts
    .filter((c) => c.status === "signed")
    .forEach((c) =>
      n.push({ id: `ct-${c.id}`, text: `Contract signed — ${c.title}`, href: "/dashboard/contracts", tone: "success", at: c.signed_at || c.created_at })
    );

  files
    .filter((f) => f.status === "approved" || f.status === "revision")
    .forEach((f) =>
      n.push({
        id: `file-${f.id}`,
        text: f.status === "approved" ? `Client approved “${f.name}”` : `Revision requested on “${f.name}”`,
        href: "/dashboard/creatives",
        tone: f.status === "approved" ? "success" : "error",
        at: f.created_at,
      })
    );

  return n.sort((a, b) => (b.at || "").localeCompare(a.at || "")).slice(0, 20);
}
