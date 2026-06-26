import { cn } from "@/lib/utils";

/** Rounded-square avatar tinted to a client's accent, with its initial. */
export function AccentAvatar({
  initial,
  color,
  size = 40,
  className,
}: {
  initial: string;
  color: string;
  size?: number;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid shrink-0 place-items-center rounded-[10px] font-display font-semibold",
        className
      )}
      style={{
        width: size,
        height: size,
        fontSize: size * 0.4,
        color,
        backgroundColor: `color-mix(in srgb, ${color} 16%, transparent)`,
        border: `1px solid color-mix(in srgb, ${color} 28%, transparent)`,
      }}
    >
      {initial}
    </div>
  );
}
