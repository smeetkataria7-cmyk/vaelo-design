const PALETTE = [
  "#c8331f", // dvoc red
  "#2a9d8f", // zerolys teal
  "#e76f51", // marigold
  "#9b59b6", // arcivox purple
  "#3b82f6", // lumina blue
  "#d4af37", // gold
  "#f59e0b", // amber
  "#10b981", // emerald
];

/** Deterministic accent colour for a client/project (stable per key). */
export function accentFor(key: string): string {
  let h = 0;
  for (let i = 0; i < key.length; i++) h = (h * 31 + key.charCodeAt(i)) >>> 0;
  return PALETTE[h % PALETTE.length];
}
