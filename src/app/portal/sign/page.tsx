import Link from "next/link";
import { ChevronLeft, ShieldCheck, FileText, PenLine, CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { StatusChip } from "@/components/status-chip";
import { getViewer } from "@/lib/auth";
import { getContractsForEmail } from "@/lib/contracts";
import { signContractAction } from "../actions";

export const dynamic = "force-dynamic";

export default async function PortalSign() {
  const { email } = await getViewer();
  const contracts = await getContractsForEmail(email ?? "").catch(() => []);
  const toSign = contracts.filter((c) => c.status === "sent");
  const signed = contracts.filter((c) => c.status === "signed");

  return (
    <div className="flex h-full flex-col pb-6">
      <div className="flex items-center gap-3 px-4 py-4">
        <Link href="/portal" className="grid size-9 place-items-center rounded-lg text-muted hover:bg-surface-3 hover:text-ink">
          <ChevronLeft className="size-5" />
        </Link>
        <span className="text-[14px] font-semibold text-ink">Agreements</span>
        {toSign.length > 0 && (
          <StatusChip tone="warning" className="ml-auto">{toSign.length} to sign</StatusChip>
        )}
      </div>

      {toSign.length === 0 && signed.length === 0 ? (
        <div className="grid flex-1 place-items-center px-6 text-center">
          <div>
            <FileText className="mx-auto size-9 text-muted-3" strokeWidth={1.5} />
            <p className="mt-3 text-[14px] font-medium text-ink">No agreements yet</p>
            <p className="mt-1 text-[12px] text-muted-2">Anything sent for signature shows up here.</p>
          </div>
        </div>
      ) : (
        <div className="space-y-4 px-4">
          {toSign.map((c) => (
            <div key={c.id} className="rounded-[16px] border border-line bg-card p-5">
              <div className="flex items-center gap-2 text-gold">
                <FileText className="size-4" />
                <span className="eyebrow !text-gold">Agreement</span>
              </div>
              <h1 className="mt-2 font-display text-[17px] font-semibold leading-snug text-ink">{c.title}</h1>
              {c.body && (
                <p className="mt-2 max-h-40 overflow-y-auto whitespace-pre-line text-[12.5px] leading-relaxed text-ink-2">
                  {c.body}
                </p>
              )}
              {c.file_link && (
                <a href={c.file_link} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-[12px] text-gold hover:underline">
                  View document →
                </a>
              )}
              <div className="mt-3 flex items-center gap-2 rounded-[12px] border border-line bg-paper p-3 text-[12px] text-muted-2">
                <ShieldCheck className="size-4 shrink-0 text-success" />
                A signed copy + timestamp are stored automatically.
              </div>
              <form action={signContractAction.bind(null, c.public_token)} className="mt-3">
                <Button type="submit" className="h-12 w-full bg-success text-white hover:bg-success/90">
                  <PenLine className="size-4" /> Review &amp; sign
                </Button>
              </form>
            </div>
          ))}

          {signed.map((c) => (
            <div key={c.id} className="flex items-center gap-3 rounded-[14px] border border-line bg-card p-4">
              <CheckCircle2 className="size-5 shrink-0 text-success" />
              <div className="min-w-0 flex-1">
                <div className="truncate text-[13px] font-medium text-ink">{c.title}</div>
                <div className="text-[11px] text-muted-2">
                  Signed{c.signed_at ? ` ${new Date(c.signed_at).toLocaleDateString()}` : ""}
                </div>
              </div>
              <StatusChip tone="success">Signed</StatusChip>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
