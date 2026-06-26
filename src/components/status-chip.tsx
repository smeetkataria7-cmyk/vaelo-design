import * as React from "react";

import { cn } from "@/lib/utils";

export type ChipTone =
  | "success"
  | "error"
  | "warning"
  | "info"
  | "gold"
  | "neutral";

const TONE_COLOR: Record<ChipTone, string> = {
  success: "var(--success)",
  error: "var(--error)",
  warning: "var(--warning)",
  info: "var(--info)",
  gold: "var(--gold)",
  neutral: "var(--muted)",
};

/**
 * Status chip per the Vaelo spec: text in the status color over a ~12% alpha
 * fill of the same color. Accepts a semantic `tone` or an arbitrary `color`
 * (e.g. a per-client accent hex).
 */
export function StatusChip({
  tone = "neutral",
  color,
  fill = 0.13,
  className,
  children,
  ...props
}: React.ComponentProps<"span"> & {
  tone?: ChipTone;
  color?: string;
  fill?: number;
}) {
  const c = color ?? TONE_COLOR[tone];
  return (
    <span
      className={cn("chip", className)}
      style={{
        color: c,
        backgroundColor: `color-mix(in srgb, ${c} ${fill * 100}%, transparent)`,
      }}
      {...props}
    >
      {children}
    </span>
  );
}
