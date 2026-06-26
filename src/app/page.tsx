"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { LogoLockup } from "@/components/app/logo";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/dashboard");
  }, [router]);

  return (
    <div className="grid min-h-screen place-items-center bg-paper">
      <div className="flex flex-col items-center gap-6 text-center">
        <LogoLockup />
        <p className="text-[13px] text-muted">Loading your workspace…</p>
        <Link href="/dashboard" className="text-[13px] text-gold hover:underline">
          Continue to dashboard →
        </Link>
      </div>
    </div>
  );
}
