"use client";

import { useState } from "react";
import { Loader2, AlertCircle, KeyRound } from "lucide-react";

import { createClient } from "@/lib/supabase/client";
import { signedInDestination } from "@/app/auth/actions";
import { LogoMark } from "@/components/app/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SetPasswordPage() {
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError(null);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      const dest = await signedInDestination().catch(() => "/portal");
      window.location.assign(dest);
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <div className="grid min-h-screen place-items-center bg-paper p-6">
      <div className="w-full max-w-[340px]">
        <div className="mb-6 flex items-center gap-2.5">
          <LogoMark className="size-8 text-[16px]" />
          <span className="font-display text-[16px] font-semibold text-ink">Vaelo</span>
        </div>
        <h1 className="font-display text-[22px] font-semibold text-ink">Set your password</h1>
        <p className="mt-1 text-[13px] text-muted">Choose a password to finish setting up your account.</p>

        {status === "error" && error && (
          <div className="mt-5 flex items-center gap-2 rounded-lg border border-error/20 bg-error/[0.07] px-3 py-2 text-[12px] text-error">
            <AlertCircle className="size-4 shrink-0" />
            {error}
          </div>
        )}

        <form onSubmit={onSubmit} className="mt-5 space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="password">New password</Label>
            <Input
              id="password"
              type="password"
              required
              minLength={6}
              autoComplete="new-password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button type="submit" className="h-11 w-full" disabled={status === "loading"}>
            {status === "loading" ? <Loader2 className="size-4 animate-spin" /> : (
              <>
                <KeyRound className="size-4" /> Set password &amp; continue
              </>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
