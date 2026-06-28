import Link from "next/link";
import { ChevronLeft, Check, X, FileText, CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { StatusChip, type ChipTone } from "@/components/status-chip";
import { getViewer } from "@/lib/auth";
import { getProposalsForEmail, type Proposal } from "@/lib/proposals";
import { formatINR } from "@/lib/utils";
import { acceptProposalAction, declineProposalAction } from "../actions";

export const dynamic = "force-dynamic";

const TONE: Record<Proposal["status"], ChipTone> = {
  draft: "neutral",
  sent: "warning",
  viewed: "info",
  accepted: "success",
  declined: "error",
};

export default async function PortalProposals() {
  const { email } = await getViewer();
  const proposals = await getProposalsForEmail(email ?? "").catch(() => []);
  const open = proposals.filter((p) => p.status === "sent" || p.status === "viewed");

  return (
    <div className="flex flex-col pb-6">
      <div className="flex items-center gap-3 px-4 py-4 sm:px-5">
        <Link href="/portal" className="grid size-9 place-items-center rounded-lg text-muted hover:bg-surface-3 hover:text-ink">
          <ChevronLeft className="size-5" />
        </Link>
        <span className="text-[14px] font-semibold text-ink">Proposals</span>
        {open.length > 0 && (
          <StatusChip tone="warning" className="ml-auto">{open.length} to review</StatusChip>
        )}
      </div>

      {proposals.length === 0 ? (
        <div className="grid place-items-center px-6 py-16 text-center">
          <div>
            <FileText className="mx-auto size-9 text-muted-3" strokeWidth={1.5} />
            <p className="mt-3 text-[14px] font-medium text-ink">No proposals yet</p>
            <p className="mt-1 text-[12px] text-muted-2">Anything sent to you will appear here to review.</p>
          </div>
        </div>
      ) : (
        <div className="space-y-4 px-4 sm:px-5">
          {proposals.map((p) => {
            const reviewable = p.status === "sent" || p.status === "viewed";
            return (
              <div key={p.id} className="rounded-[16px] border border-line bg-card p-5">
                <div className="flex items-start justify-between gap-3">
                  <h2 className="font-display text-[17px] font-semibold leading-snug text-ink">{p.title}</h2>
                  <StatusChip tone={TONE[p.status]} className="capitalize">{p.status}</StatusChip>
                </div>

                {p.items?.length > 0 && (
                  <div className="mt-3 space-y-1.5 border-t border-line-2 pt-3">
                    {p.items.map((it, i) => (
                      <div key={i} className="flex items-center justify-between text-[13px]">
                        <span className="text-muted">{it.desc}</span>
                        <span className="text-ink-2">{formatINR(it.amount)}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="mt-3 flex items-center justify-between border-t border-line-2 pt-3">
                  <span className="text-[12px] text-muted-2">Total</span>
                  <span className="font-display text-[18px] font-semibold text-gold">{formatINR(p.total)}</span>
                </div>

                {p.notes && <p className="mt-3 text-[12.5px] leading-relaxed text-ink-2">{p.notes}</p>}

                {reviewable ? (
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <form action={declineProposalAction.bind(null, p.public_token)}>
                      <Button type="submit" variant="secondary" className="h-11 w-full">
                        <X className="size-4" /> Decline
                      </Button>
                    </form>
                    <form action={acceptProposalAction.bind(null, p.public_token)}>
                      <Button type="submit" className="h-11 w-full bg-success text-white hover:bg-success/90">
                        <Check className="size-4" /> Accept
                      </Button>
                    </form>
                  </div>
                ) : p.status === "accepted" ? (
                  <div className="mt-4 flex items-center gap-2 text-[13px] text-success">
                    <CheckCircle2 className="size-4" /> Accepted — thank you!
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
