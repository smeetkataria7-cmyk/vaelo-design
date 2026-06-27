import type { NextConfig } from "next";

/**
 * SSR app (deploys to Vercel). Real auth (Supabase middleware + cookies) needs
 * a server, so this is NOT a static export. Configure Supabase + role env vars
 * in the Vercel project — see .env.example.
 */
const nextConfig: NextConfig = {
  experimental: {
    // Allow larger uploads through server actions (creatives can be a few MB).
    serverActions: { bodySizeLimit: "20mb" },
  },
};

export default nextConfig;
