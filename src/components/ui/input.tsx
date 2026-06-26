import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex h-9 w-full min-w-0 rounded-lg border border-line bg-input-bg px-3 py-1 text-[13px] text-ink transition-colors",
        "placeholder:text-muted-2 selection:bg-gold selection:text-[#0a0a0a]",
        "focus-visible:border-gold/60 focus-visible:ring-2 focus-visible:ring-gold/20 outline-none",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "file:border-0 file:bg-transparent file:text-sm file:font-medium",
        "aria-invalid:border-error aria-invalid:ring-error/20",
        className
      )}
      {...props}
    />
  );
}

export { Input };
