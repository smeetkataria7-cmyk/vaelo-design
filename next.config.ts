import type { NextConfig } from "next";

/**
 * Static-export mode is enabled only when NEXT_OUTPUT=export (used by the
 * GitHub Pages workflow). Normal `next build` / Vercel keeps full SSR so the
 * Supabase + integrations work later.
 */
const isExport = process.env.NEXT_OUTPUT === "export";
const basePath = process.env.NEXT_BASE_PATH || "";

const nextConfig: NextConfig = {
  ...(isExport
    ? {
        output: "export",
        trailingSlash: true,
        images: { unoptimized: true },
        basePath: basePath || undefined,
        env: { NEXT_PUBLIC_BASE_PATH: basePath },
      }
    : {}),
};

export default nextConfig;
