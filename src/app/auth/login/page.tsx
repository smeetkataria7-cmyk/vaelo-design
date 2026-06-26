"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Loader2, AlertCircle } from "lucide-react";

import { LogoMark } from "@/components/app/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const PIPELINE = [
  "Lead captured",
  "AI proposal",
  "Creatives approved",
  "Invoice paid",
];

export default function LoginPage() {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    // Demo: simulate an auth round-trip then surface the error state.
    setTimeout(() => {
      setLoading(false);
      setError("Invalid email or password");
    }, 1100);
  }

  return (
    <div className="flex min-h-screen bg-paper">
      {/* Brand panel */}
      <div className="relative hidden w-[580px] shrink-0 overflow-hidden border-r border-line lg:flex">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 80% at 20% 10%, rgba(212,175,55,0.16), transparent 60%)",
          }}
        />
        <div className="relative z-10 flex flex-col justify-between p-12">
          <div className="flex items-center gap-2.5">
            <LogoMark className="size-9 text-[18px]" />
            <div className="font-display text-[18px] font-semibold text-ink">Vaelo</div>
          </div>

          <div className="space-y-8">
            <div className="space-y-4">
              {PIPELINE.map((step, i) => (
                <div key={step} className="flex items-center gap-3">
                  <div className="grid size-7 place-items-center rounded-full border border-gold/40 bg-gold/10 text-[12px] font-semibold text-gold">
                    {i + 1}
                  </div>
                  <span className="text-[14px] text-ink-2">{step}</span>
                </div>
              ))}
            </div>
            <p className="max-w-sm font-display text-[26px] leading-snug text-ink">
              One system for the entire client lifecycle.
            </p>
          </div>

          <p className="text-[12px] text-muted-3">
            © {new Date().getFullYear()} Vaelo Creative · Agency OS
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="flex flex-1 items-center justify-center p-6">
        <div className="w-full max-w-[340px]">
          <div className="mb-8 flex items-center gap-2.5 lg:hidden">
            <LogoMark className="size-8 text-[16px]" />
            <span className="font-display text-[16px] font-semibold text-ink">Vaelo</span>
          </div>

          <h1 className="font-display text-[24px] font-semibold text-ink">Sign in to Vaelo</h1>
          <p className="mt-1 text-[13px] text-muted">Welcome back. Please enter your details.</p>

          {error && (
            <div className="mt-5 flex items-center gap-2 rounded-lg border border-error/20 bg-error/[0.07] px-3 py-2 text-[12px] text-error">
              <AlertCircle className="size-4 shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={onSubmit} className="mt-5 space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@brand.com" defaultValue="alex@vaelocreative.com" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={show ? "text" : "password"}
                  placeholder="••••••••"
                  defaultValue="password"
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShow((s) => !s)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-3 hover:text-ink-2"
                  aria-label={show ? "Hide password" : "Show password"}
                >
                  {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </div>

            <Button type="submit" className="h-11 w-full" disabled={loading}>
              {loading ? <Loader2 className="size-4 animate-spin" /> : "Sign in"}
            </Button>
          </form>

          <div className="mt-4 text-center">
            <Link href="#" className="text-[12px] text-gold hover:underline">
              Request access
            </Link>
          </div>

          <div className="my-6 flex items-center gap-3 text-[11px] text-muted-3">
            <div className="h-px flex-1 bg-line" />
            OR
            <div className="h-px flex-1 bg-line" />
          </div>

          <Button variant="secondary" className="h-11 w-full">
            <svg className="size-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.06l3.66 2.84C6.71 7.3 9.14 5.38 12 5.38z" />
            </svg>
            Continue with Google
          </Button>
        </div>
      </div>
    </div>
  );
}
