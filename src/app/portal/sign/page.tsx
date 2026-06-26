import Link from "next/link";
import { ChevronLeft, ShieldCheck, FileText, PenLine } from "lucide-react";

import { Button } from "@/components/ui/button";
import { StatusChip } from "@/components/status-chip";
import { portalContract } from "@/lib/portal-mock";
import { formatINR } from "@/lib/utils";

export default function PortalSign() {
  return (
    <div className="flex h-full flex-col pb-6">
      {/* Top nav */}
      <div className="flex items-center gap-3 px-4 py-4">
        <Link
          href="/portal"
          className="grid size-9 place-items-center rounded-lg text-muted hover:bg-surface-3 hover:text-ink"
        >
          <ChevronLeft className="size-5" />
        </Link>
        <span className="text-[14px] font-semibold text-ink">Sign agreement</span>
        <StatusChip tone="warning" className="ml-auto">
          Awaiting signature
        </StatusChip>
      </div>

      {/* Document header */}
      <div className="mx-4 rounded-[16px] border border-line bg-card p-5">
        <div className="flex items-center gap-2 text-gold">
          <FileText className="size-4" />
          <span className="eyebrow !text-gold">{portalContract.ref}</span>
        </div>
        <h1 className="mt-2 font-display text-[18px] font-semibold leading-snug text-ink">
          {portalContract.title}
        </h1>
        <div className="mt-3 grid grid-cols-2 gap-3 border-t border-line-2 pt-3">
          <div>
            <div className="eyebrow !text-muted-2">Value</div>
            <div className="mt-0.5 font-display text-[16px] text-ink">
              {formatINR(portalContract.monthly)}
              <span className="text-[11px] text-muted-2">/mo</span>
            </div>
          </div>
          <div>
            <div className="eyebrow !text-muted-2">Term</div>
            <div className="mt-0.5 text-[13px] text-ink-2">{portalContract.term}</div>
          </div>
        </div>
      </div>

      {/* Scope */}
      <div className="mx-4 mt-4">
        <div className="eyebrow">What's included</div>
        <ul className="mt-2 space-y-2">
          {portalContract.scope.map((s) => (
            <li key={s} className="flex gap-2.5 text-[13px] leading-relaxed text-ink-2">
              <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-gold" />
              {s}
            </li>
          ))}
        </ul>
      </div>

      {/* Sent-by note */}
      <div className="mx-4 mt-4 flex items-center gap-2 rounded-[12px] border border-line bg-card p-3 text-[12px] text-muted-2">
        <ShieldCheck className="size-4 shrink-0 text-success" />
        Sent by {portalContract.sentBy} · {portalContract.sentAt}. A signed copy and audit trail
        are stored automatically.
      </div>

      {/* Sign action */}
      <div className="mt-auto px-4 pt-6">
        <Button className="h-12 w-full bg-success text-white hover:bg-success/90">
          <PenLine className="size-4" /> Review &amp; sign
        </Button>
        <p className="mt-2 text-center text-[11px] text-muted-3">
          By signing you agree to the terms of this agreement
        </p>
      </div>
    </div>
  );
}
