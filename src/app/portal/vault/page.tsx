import { Download } from "lucide-react";

import { vaultItems } from "@/lib/portal-mock";

export default function PortalVault() {
  return (
    <div className="pb-6">
      <div className="px-5 py-5">
        <h1 className="font-display text-[22px] font-semibold text-ink">Asset Vault</h1>
        <p className="text-[12px] text-muted-2">{vaultItems.length} items · all your final deliverables</p>
      </div>

      <div className="grid grid-cols-2 gap-3 px-5">
        {vaultItems.map((v) => (
          <div key={v.id} className="overflow-hidden rounded-[12px] border border-line bg-card">
            <div
              className="aspect-[4/3] w-full"
              style={{ background: `linear-gradient(150deg, ${v.grad[0]}, ${v.grad[1]})` }}
            />
            <div className="flex items-center justify-between p-2.5">
              <div className="min-w-0">
                <div className="truncate text-[12px] font-medium text-ink">{v.title}</div>
                <div className="text-[10px] text-muted-3">{v.type}</div>
              </div>
              <button className="grid size-7 shrink-0 place-items-center rounded-md text-muted-2 hover:bg-surface-3 hover:text-gold">
                <Download className="size-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
