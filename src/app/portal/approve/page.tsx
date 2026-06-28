import Link from "next/link";
import { ChevronLeft, Check, RotateCcw, CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { StatusChip } from "@/components/status-chip";
import { getViewer } from "@/lib/auth";
import { listFilesForEmail } from "@/lib/files";
import { approveFileAction, reviseFileAction } from "../actions";

export const dynamic = "force-dynamic";

export default async function PortalApprove() {
  const { email } = await getViewer();
  const files = await listFilesForEmail(email ?? "").catch(() => []);
  const pending = files.filter((f) => f.status === "pending");

  return (
    <div className="flex h-full flex-col pb-6">
      <div className="flex items-center justify-between px-4 py-4">
        <Link href="/portal" className="grid size-9 place-items-center rounded-lg text-muted hover:bg-surface-3 hover:text-ink">
          <ChevronLeft className="size-5" />
        </Link>
        <span className="text-[14px] font-semibold text-ink">Approvals</span>
        <StatusChip tone={pending.length ? "warning" : "success"}>
          {pending.length} pending
        </StatusChip>
      </div>

      {pending.length === 0 ? (
        <div className="grid flex-1 place-items-center px-6 text-center">
          <div>
            <CheckCircle2 className="mx-auto size-9 text-success" strokeWidth={1.5} />
            <p className="mt-3 text-[14px] font-medium text-ink">All caught up</p>
            <p className="mt-1 text-[12px] text-muted-2">Nothing is waiting for your approval.</p>
          </div>
        </div>
      ) : (
        <div className="space-y-4 px-4">
          {pending.map((f) => (
            <div key={f.id} className="rounded-[14px] border border-line bg-card p-4">
              <div className="text-[13px] font-medium text-ink">{f.name}</div>
              <div className="text-[11px] text-muted-3">{f.type || "file"}</div>
              {f.comment && (
                <p className="mt-2 rounded-[10px] bg-surface-3/40 p-2.5 text-[12px] leading-relaxed text-ink-2">
                  {f.comment}
                </p>
              )}
              <div className="mt-3 grid grid-cols-2 gap-3">
                <form action={reviseFileAction.bind(null, f.id)}>
                  <Button type="submit" variant="secondary" className="h-10 w-full">
                    <RotateCcw className="size-4" /> Revise
                  </Button>
                </form>
                <form action={approveFileAction.bind(null, f.id)}>
                  <Button type="submit" className="h-10 w-full bg-success text-white hover:bg-success/90">
                    <Check className="size-4" /> Approve
                  </Button>
                </form>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
