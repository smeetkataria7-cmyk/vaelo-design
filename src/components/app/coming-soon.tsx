import { Construction } from "lucide-react";

import { PageHeader, PageShell } from "@/components/app/page-header";

export function ComingSoon({
  title,
  subtitle,
  phase,
}: {
  title: string;
  subtitle?: string;
  phase?: string;
}) {
  return (
    <PageShell>
      <PageHeader title={title} subtitle={subtitle} />
      <div className="mt-8 grid place-items-center rounded-[12px] border border-dashed border-line bg-card/40 py-20 text-center">
        <Construction className="size-8 text-muted-3" strokeWidth={1.5} />
        <p className="mt-4 text-[14px] font-medium text-ink-2">On the roadmap</p>
        {phase && <p className="mt-1 text-[12px] text-muted-2">{phase}</p>}
      </div>
    </PageShell>
  );
}
