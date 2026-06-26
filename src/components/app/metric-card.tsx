import { TrendingUp } from "lucide-react";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function MetricCard({
  label,
  value,
  trend,
  tone = "neutral",
}: {
  label: string;
  value: React.ReactNode;
  trend?: string;
  tone?: "success" | "neutral";
}) {
  return (
    <Card className="gap-3 p-5">
      <div className="eyebrow">{label}</div>
      <div className="font-display text-[38px] font-semibold leading-none text-ink">
        {value}
      </div>
      {trend && (
        <div
          className={cn(
            "flex items-center gap-1 text-[12px]",
            tone === "success" ? "text-success" : "text-muted-2"
          )}
        >
          {tone === "success" && <TrendingUp className="size-3.5" strokeWidth={2} />}
          {trend}
        </div>
      )}
    </Card>
  );
}
