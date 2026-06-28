import Link from "next/link";
import { ChevronLeft } from "lucide-react";

import { StatusChip, type ChipTone } from "@/components/status-chip";
import { getViewer } from "@/lib/auth";
import { getInvoicesForEmail, type Invoice } from "@/lib/invoices";
import { formatINR } from "@/lib/utils";

export const dynamic = "force-dynamic";

const TONE: Record<Invoice["status"], ChipTone> = {
  draft: "neutral",
  sent: "warning",
  paid: "success",
  overdue: "error",
  void: "neutral",
};

export default async function PortalBills() {
  const { email } = await getViewer();
  const invoices = await getInvoicesForEmail(email ?? "").catch(() => []);
  const outstanding = invoices
    .filter((i) => i.status === "sent" || i.status === "overdue")
    .reduce((s, i) => s + i.total, 0);

  return (
    <div className="flex h-full flex-col pb-6">
      <div className="flex items-center gap-3 px-4 py-4">
        <Link href="/portal" className="grid size-9 place-items-center rounded-lg text-muted hover:bg-surface-3 hover:text-ink">
          <ChevronLeft className="size-5" />
        </Link>
        <span className="text-[14px] font-semibold text-ink">Bills</span>
      </div>

      {/* Outstanding summary */}
      <div className="mx-4 rounded-[16px] border border-line bg-card p-5 text-center">
        <div className="eyebrow">Outstanding</div>
        <div className="mt-2 font-display text-[34px] font-semibold text-ink">{formatINR(outstanding)}</div>
        <div className="mt-1 text-[12px] text-muted-2">
          {invoices.length} {invoices.length === 1 ? "invoice" : "invoices"} total
        </div>
      </div>

      {/* Invoice list */}
      <div className="mx-4 mt-4 space-y-2.5">
        {invoices.length === 0 ? (
          <p className="py-10 text-center text-[12px] text-muted-2">No invoices yet.</p>
        ) : (
          invoices.map((inv) => (
            <div key={inv.id} className="rounded-[14px] border border-line bg-card p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[13px] font-medium text-ink">{inv.number}</div>
                  <div className="text-[11px] text-muted-2">
                    {inv.due_date ? `Due ${new Date(inv.due_date).toLocaleDateString()}` : inv.notes || "—"}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-display text-[16px] text-ink">{formatINR(inv.total)}</div>
                  <StatusChip tone={TONE[inv.status]} className="mt-1 capitalize">
                    {inv.status}
                  </StatusChip>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Payment (deferred) */}
      {outstanding > 0 && (
        <div className="mt-auto px-4 pt-6">
          <div className="rounded-[12px] border border-line bg-card p-3 text-center text-[12px] text-muted-2">
            Online payment is being set up. For now, pay by bank transfer or reach out to your account
            manager — we&apos;ll mark it paid here.
          </div>
        </div>
      )}
    </div>
  );
}
