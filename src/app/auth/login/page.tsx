"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Eye, EyeOff, Loader2, AlertCircle, MailCheck } from "lucide-react";

import { createClient } from "@/lib/supabase/client";
import { signedInDestination } from "@/app/auth/actions";
import { LogoMark } from "@/components/app/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const PIPELINE = ["Lead captured", "AI proposal", "Creatives approved", "Invoice paid"];

function LoginInner() {
  const params = useSearchParams();
  const next = params.get("next");

  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "confirm" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError(null);
    const supabase = createClient();
    const creds = { email: email.trim(), password };

    try {
      if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp(creds);
        if (error) throw error;
        if (!data.session) {
          setStatus("confirm");
          return;
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword(creds);
        if (error) throw error;
      }
      // Decide destination by role (resolved on the server), honoring ?next.
      const dest = await signedInDestination().catch(() => "/portal");
      const target = next && next.startsWith("/") ? next : dest;
      window.location.assign(target);
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  const loading = status === "loading";

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

          {status === "confirm" ? (
            <div className="rounded-xl border border-gold/25 bg-gold/[0.06] p-6 text-center">
              <MailCheck className="mx-auto size-7 text-gold" />
              <h1 className="mt-3 font-display text-[20px] font-semibold text-ink">Almost there</h1>
              <p className="mt-2 text-[13px] leading-relaxed text-muted">
                We&apos;ve emailed <span className="text-ink-2">{email}</span> a confirmation link.
                Click it, then come back and sign in.
              </p>
              <button
                onClick={() => {
                  setMode("signin");
                  setStatus("idle");
                }}
                className="mt-5 text-[12px] text-gold hover:underline"
              >
                Back to sign in
              </button>
            </div>
          ) : (
            <>
              <h1 className="font-display text-[24px] font-semibold text-ink">
                {mode === "signin" ? "Sign in to Vaelo" : "Create your account"}
              </h1>
              <p className="mt-1 text-[13px] text-muted">
                {mode === "signin"
                  ? "Welcome back. Please enter your details."
                  : "Set up your login to access your workspace."}
              </p>

              {status === "error" && error && (
                <div className="mt-5 flex items-center gap-2 rounded-lg border border-error/20 bg-error/[0.07] px-3 py-2 text-[12px] text-error">
                  <AlertCircle className="size-4 shrink-0" />
                  {error}
                </div>
              )}

              <form onSubmit={onSubmit} className="mt-5 space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="you@brand.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={show ? "text" : "password"}
                      required
                      minLength={6}
                      autoComplete={mode === "signin" ? "current-password" : "new-password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
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
                  {loading ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : mode === "signin" ? (
                    "Sign in"
                  ) : (
                    "Create account"
                  )}
                </Button>
              </form>

              <p className="mt-6 text-center text-[12px] text-muted">
                {mode === "signin" ? "First time here? " : "Already have an account? "}
                <button
                  onClick={() => {
                    setMode(mode === "signin" ? "signup" : "signin");
                    setStatus("idle");
                    setError(null);
                  }}
                  className="text-gold hover:underline"
                >
                  {mode === "signin" ? "Create an account" : "Sign in"}
                </button>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginInner />
    </Suspense>
  );
}
