import type { Lead } from "./leads";

/**
 * Email via the Resend REST API (no SDK dependency). Gracefully no-ops if
 * RESEND_API_KEY is unset, so the app keeps working before email is wired up.
 *
 * Env vars:
 *   RESEND_API_KEY   - from resend.com
 *   LEAD_NOTIFY_TO   - where new-lead alerts go (default hello@vaelocreative.com)
 *   LEAD_NOTIFY_FROM - verified sender (use onboarding@resend.dev for testing)
 */
export async function notifyOwnerOfLead(lead: Lead): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.log("[email] RESEND_API_KEY not set — skipping owner notification.");
    return;
  }

  const to = process.env.LEAD_NOTIFY_TO ?? "hello@vaelocreative.com";
  const from = process.env.LEAD_NOTIFY_FROM ?? "Vaelo <onboarding@resend.dev>";

  const text = [
    `New lead from the Vaelo website:`,
    ``,
    `Name:      ${lead.name}`,
    `Brand:     ${lead.brand}`,
    `Email:     ${lead.email}`,
    `Instagram: ${lead.instagram || "—"}`,
    `Goal:      ${lead.goal || "—"}`,
    ``,
    `Received:  ${new Date(lead.created_at).toLocaleString()}`,
  ].join("\n");

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to,
        subject: `New lead: ${lead.brand} (${lead.name})`,
        text,
      }),
    });
    if (!res.ok) {
      console.error("[email] Resend responded", res.status, await res.text());
    }
  } catch (err) {
    // Never fail the lead submission because of email.
    console.error("[email] Failed to send lead notification:", err);
  }
}
