import Link from "next/link";
import { ChevronLeft, Check, RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { StatusChip } from "@/components/status-chip";
import { pendingApprovals, approvalComment } from "@/lib/portal-mock";

export default function PortalApprove() {
  const item = pendingApprovals[0];
  return (
    <div className="flex h-full flex-col pb-6">
      {/* Top nav */}
      <div className="flex items-center justify-between px-4 py-4">
        <Link href="/portal" className="grid size-9 place-items-center rounded-lg text-muted hover:bg-surface-3 hover:text-ink">
          <ChevronLeft className="size-5" />
        </Link>
        <span className="text-[13px] font-medium text-ink">{item.title}</span>
        <StatusChip tone="warning">{pendingApprovals.length} pending</StatusChip>
      </div>

      {/* Preview */}
      <div className="px-4">
        <div
          className="relative aspect-square w-full overflow-hidden rounded-[16px]"
          style={{ background: `linear-gradient(150deg, ${item.grad[0]}, ${item.grad[1]})` }}
        >
          <span className="absolute left-3 top-3 rounded-md bg-black/55 px-2 py-1 text-[11px] font-medium text-white">
            Version {item.version}
          </span>
        </div>
      </div>

      {/* Comment */}
      <div className="mx-4 mt-4 rounded-[12px] border border-line bg-card p-3.5">
        <div className="flex items-center justify-between">
          <span className="text-[12px] font-medium text-ink">{approvalComment.author}</span>
          <span className="text-[11px] text-muted-3">{approvalComment.at}</span>
        </div>
        <p className="mt-1.5 text-[12.5px] leading-relaxed text-ink-2">{approvalComment.text}</p>
      </div>

      {/* Pager dots */}
      <div className="mt-4 flex justify-center gap-1.5">
        {pendingApprovals.map((a, i) => (
          <span
            key={a.id}
            className={i === 0 ? "h-1.5 w-5 rounded-full bg-gold" : "size-1.5 rounded-full bg-line"}
          />
        ))}
      </div>

      {/* Actions */}
      <div className="mt-auto grid grid-cols-2 gap-3 px-4 pt-6">
        <Button variant="secondary" className="h-12">
          <RotateCcw className="size-4" /> Revise
        </Button>
        <Button className="h-12 bg-success text-white hover:bg-success/90">
          <Check className="size-4" /> Approve
        </Button>
      </div>
    </div>
  );
}
