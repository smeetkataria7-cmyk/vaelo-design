"use client";

import { Check } from "lucide-react";

import { PageHeader, PageShell } from "@/components/app/page-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StatusChip } from "@/components/status-chip";
import { integrations, type Integration } from "@/lib/mock";

function IntegrationCard({ it }: { it: Integration }) {
  return (
    <Card className="flex-row items-center gap-3.5 p-4">
      <div
        className="grid size-10 shrink-0 place-items-center rounded-[10px] text-[15px] font-bold text-white"
        style={{ background: it.iconBg }}
      >
        {it.name[0]}
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-[13px] font-medium text-ink">{it.name}</div>
        <div className="truncate text-[11px] text-muted-2">{it.desc}</div>
      </div>
      <div className="flex flex-col items-end gap-1">
        {it.status === "connected" && (
          <StatusChip tone="success">
            <Check className="size-3" /> Connected
          </StatusChip>
        )}
        {it.status === "pending" && <StatusChip tone="warning">Pending review</StatusChip>}
        {it.status === "disconnected" && <StatusChip tone="neutral">Not connected</StatusChip>}
        {it.status === "disconnected" ? (
          <Button size="sm" variant="secondary" className="h-6 px-2 text-[11px]">
            Connect
          </Button>
        ) : (
          <span className="text-[10px] text-muted-3">{it.note}</span>
        )}
      </div>
    </Card>
  );
}

export default function SettingsPage() {
  return (
    <PageShell>
      <PageHeader title="Settings" />

      <Tabs defaultValue="integrations" className="mt-5 gap-6">
        <TabsList>
          {["General", "Integrations", "Team", "Billing"].map((t) => (
            <TabsTrigger key={t} value={t.toLowerCase()}>
              {t}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
        {integrations.map((it) => (
          <IntegrationCard key={it.key} it={it} />
        ))}
      </div>

      {/* Danger zone */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-[12px] border border-error/30 bg-error/[0.04] p-5">
        <div>
          <div className="text-[13px] font-medium text-error">Danger Zone</div>
          <p className="text-[12px] text-muted">
            Permanently delete this workspace and all data. This cannot be undone.
          </p>
        </div>
        <Button variant="destructive" size="sm">
          Delete workspace
        </Button>
      </div>
    </PageShell>
  );
}
