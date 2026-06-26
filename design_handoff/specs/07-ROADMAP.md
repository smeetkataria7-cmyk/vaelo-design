# Roadmap — VAELO

Phased build plan. Each phase ships something **usable on its own** — value is
delivered continuously, not all at the end. Priorities use P0/P1/P2 from
[Features](02-FEATURES.md).

> Time estimates assume one professional full-stack dev. Adjust to reality.

---

## Phase 0 — Foundations (week 1)
Goal: a running project the team can build on.
- [ ] Next.js + TypeScript + Tailwind + shadcn/ui scaffold
- [ ] Supabase project (DB + Auth + Storage), Prisma schema, first migration
- [ ] Deploy to Vercel, connect domain
- [ ] Env/secrets wired, Sentry installed
- [ ] **Start Meta app review + Razorpay KYC now** (long lead times)

## Phase 1 — Storefront + lead capture (weeks 1–2)  ◄ ships first value
Goal: stop pitching naked — a link to drop in every DM.
- [ ] Public pages: home, work/case studies, services (no public pricing — quoted per client), about
- [ ] Lead form ("free AI sample") → DB + email + auto-acknowledge
- [ ] Basic CRM: lead list + statuses + notes (owner side)
- [ ] Legal pages (privacy/terms) — also needed for Meta + payments
- **Outcome:** real website live, leads captured automatically.

## Phase 2 — Proposals + onboarding (weeks 3–4)
Goal: turn leads into signed, onboarded clients without manual setup.
- [ ] Proposal builder + hosted client view + accept
- [ ] Status tracking (sent/viewed/accepted)
- [ ] Auto onboarding: create project + client login + onboarding form
- [ ] Client portal shell (login, project view)
- **Outcome:** lead → proposal → onboarded client flows automatically.

## Phase 3 — Money (weeks 5–6)
Goal: stop revenue leakage.
- [ ] Invoicing (Razorpay): one-off + recurring retainers
- [ ] Auto reminders (email; WhatsApp if approved)
- [ ] Payment status dashboard, PDF invoices/receipts
- [ ] Retainer & scope tracking (usage counters + upsell flag)
- **Outcome:** invoices sent, paid, and chased automatically; no free overages.

## Phase 4 — Delivery + stickiness (weeks 7–9)
Goal: the moat — make leaving painful.
- [ ] Asset Approval 2.0 (versions, pinned comments, history)
- [ ] Asset Vault (permanent client repository)
- [ ] **Brand Brain** (knowledge base) — see [spec](10-BRAND-BRAIN.md)
- [ ] WhatsApp notifications across events
- **Outcome:** creatives delivered, versioned, approved; brand knowledge captured.

## Phase 5 — AI layer + intelligence (weeks 10–12)
Goal: stop being "another CRM."
- [ ] AI proposal drafts (from lead + Brand Brain)
- [ ] AI status updates (plain-language project summaries)
- [ ] Reports (IG + ad performance via Meta — once approved)
- [ ] Client health score
- **Outcome:** the platform actively helps run the agency.

## Phase 6 — Polish + differentiators (later, P2)
- [ ] AI Creative Workspace (client requests → AI drafts → refine → approve)
- [ ] White-label polish (custom domain portal, branding)
- [ ] Team-member roles (if the agency grows)

---

## Dependency notes
- **Meta API approval** gates reports (Phase 5) — apply in Phase 0.
- **Razorpay KYC** gates billing (Phase 3) — apply in Phase 0.
- **WhatsApp templates** need approval before Phase 4 notifications.
- **Brand Brain** (Phase 4) powers the AI layer (Phase 5) — build it first.

## Suggested first deliverable
Phase 0 + Phase 1 together = a live website with working lead capture. That alone
solves the most urgent problem (no website, manual DMs) and can ship in ~2 weeks.
