import Link from "next/link";
import { ChevronLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { portalInvoice } from "@/lib/portal-mock";
import { formatINR } from "@/lib/utils";

export default function PortalBills() {
  const gst = portalInvoice.subtotal * portalInvoice.gstRate;
  const total = portalInvoice.subtotal + gst;

  return (
    <div className="flex h-full flex-col pb-6">
      <div className="flex items-center gap-3 px-4 py-4">
        <Link href="/portal" className="grid size-9 place-items-center rounded-lg text-muted hover:bg-surface-3 hover:text-ink">
          <ChevronLeft className="size-5" />
        </Link>
        <span className="text-[14px] font-semibold text-ink">Invoice {portalInvoice.number}</span>
      </div>

      {/* Amount card */}
      <div className="mx-4 rounded-[16px] border border-line bg-card p-5 text-center">
        <div className="eyebrow">Amount due</div>
        <div className="mt-2 font-display text-[36px] font-semibold text-ink">
          {formatINR(total)}
        </div>
        <div className="mt-1 text-[12px] text-muted-2">{portalInvoice.memo} · due {portalInvoice.due}</div>
      </div>

      {/* Line items */}
      <div className="mx-4 mt-4 rounded-[14px] border border-line bg-card p-4">
        <div className="space-y-2.5">
          {portalInvoice.lineItems.map((li) => (
            <div key={li.name} className="flex items-center justify-between text-[13px]">
              <span className="text-muted">{li.name}</span>
              <span className="text-ink-2">{formatINR(li.amount)}</span>
            </div>
          ))}
        </div>
        <div className="my-3 h-px bg-line-2" />
        <div className="flex items-center justify-between text-[13px]">
          <span className="text-muted">Subtotal</span>
          <span className="text-ink-2">{formatINR(portalInvoice.subtotal)}</span>
        </div>
        <div className="mt-2 flex items-center justify-between text-[13px]">
          <span className="text-muted">GST (18%)</span>
          <span className="text-ink-2">{formatINR(gst)}</span>
        </div>
        <div className="my-3 h-px bg-line-2" />
        <div className="flex items-center justify-between">
          <span className="text-[13px] font-medium text-ink">Total</span>
          <span className="font-display text-[18px] font-semibold text-gold">{formatINR(total)}</span>
        </div>
      </div>

      {/* Pay */}
      <div className="mt-auto px-4 pt-6">
        <Button className="h-12 w-full bg-info text-white hover:bg-info/90">
          Pay via Razorpay
        </Button>
        <p className="mt-2 text-center text-[11px] text-muted-3">UPI · Cards · Net Banking</p>
      </div>
    </div>
  );
}
