import { Check } from "lucide-react";

import { PageHeader, PageShell } from "@/components/app/page-header";
import { Card } from "@/components/ui/card";
import { StatusChip } from "@/components/status-chip";
import { getViewer, roleLabel } from "@/lib/auth";

export const dynamic = "force-dynamic";

const has = (k: string) => !!process.env[k];

export default async function SettingsPage() {
  const viewer = await getViewer();

  const integrations = [
    { name: "Supabase", desc: "Database + authentication", on: has("NEXT_PUBLIC_SUPABASE_URL"), pending: false },
    { name: "Resend", desc: "Email notifications", on: has("RESEND_API_KEY"), pending: false },
    { name: "Razorpay", desc: "Payments · UPI · Cards · INR", on: has("RAZORPAY_KEY_ID"), pending: !has("RAZORPAY_KEY_ID") },
    { name: "Storage", desc: "File uploads (client-files bucket)", on: has("SUPABASE_SERVICE_ROLE_KEY"), pending: false },
  ];

  return (
    <PageShell>
      <PageHeader title="Settings" />

      {/* Account */}
      <Card className="mt-6 gap-3 p-5">
        <div className="eyebrow !text-gold/80">Account</div>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="text-[14px] font-medium text-ink">{viewer.email ?? "Signed in"}</div>
            <div className="text-[12px] text-muted-2">Signed-in user</div>
          </div>
          <StatusChip color={viewer.isSuper ? "var(--gold)" : "var(--info)"}>{roleLabel(viewer)}</StatusChip>
        </div>
      </Card>

      {/* Integrations */}
      <div className="mt-6">
        <div className="eyebrow mb-3">Integrations</div>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {integrations.map((it) => (
            <Card key={it.name} className="flex-row items-center gap-3.5 p-4">
              <div className="grid size-10 shrink-0 place-items-center rounded-[10px] bg-surface-3 text-[15px] font-bold text-ink">
                {it.name[0]}
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[13px] font-medium text-ink">{it.name}</div>
                <div className="truncate text-[11px] text-muted-2">{it.desc}</div>
              </div>
              {it.on ? (
                <StatusChip tone="success">
                  <Check className="size-3" /> Connected
                </StatusChip>
              ) : it.pending ? (
                <StatusChip tone="warning">Setup</StatusChip>
              ) : (
                <StatusChip tone="neutral">Not connected</StatusChip>
              )}
            </Card>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
