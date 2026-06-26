# BUILD PROMPT — paste this into Claude Code

Copy everything below the line into Claude Code (in an empty repo, or your existing
Next.js project). It assumes this whole `design_handoff_vaelo_agency_os/` folder is
available in the repo (or attach it). Build in phases — don't try to do it all at once.

---

You are building **VAELO**, an internal Agency Operating System for an AI-native
creative agency. The complete product spec and a high-fidelity visual design are in
this handoff folder. Read them before writing code.

**Read first, in this order:**
1. `README.md` — design spec, screen-by-screen breakdown, and all design tokens.
2. `specs/01-PRD.md`, `specs/02-FEATURES.md` — what to build and acceptance criteria.
3. `specs/03-ARCHITECTURE.md` — the stack and project structure (follow it exactly).
4. `specs/04-DATA-MODEL.md` — the Prisma/Postgres schema.
5. `specs/05-INTEGRATIONS.md`, `specs/06-USER-FLOWS.md`, `specs/07-ROADMAP.md`,
   `specs/08-SECURITY.md`, `specs/09-SETUP.md`, `specs/10-BRAND-BRAIN.md`.
6. `design/Vaelo Agency OS.dc.html` — open in a browser; it's a pannable board of
   13 screens. This is the **visual source of truth**. Match its layout, colors,
   typography, and spacing using the tokens documented in `README.md`.

**Stack (non-negotiable, from `specs/03-ARCHITECTURE.md`):**
Next.js (App Router, TypeScript) · Tailwind CSS · shadcn/ui · Supabase
(Postgres + Auth + Storage) · Prisma · Razorpay · Resend · Meta WhatsApp Cloud API ·
Claude API · Meta Graph/Marketing API · Vercel + Cron/Inngest. INR throughout.
Route groups: `/(marketing)`, `/(admin)`, `/(portal)`. Enforce role access at the
app layer AND with Postgres Row-Level Security on every `client_id`-scoped table.
All secrets server-side only.

**The design files are references, not code to copy.** Recreate the screens with
shadcn/ui components styled to the documented tokens. Replace the gradient
placeholder thumbnails with real image components backed by Supabase Storage
(signed URLs). Build loading/empty/error/populated states for every data view.

**Design system to set up first (see `README.md` → Design Tokens):**
- Dark theme. Background `#0a0a0a`, cards `#111`, borders `#2d2d2d`, primary text
  `#f4f3ee`, muted `#9ca3af`, gold accent `#d4af37`. Success/error/warning/info =
  `#10b981`/`#ef4444`/`#f59e0b`/`#3b82f6`.
- Fonts: Playfair Display (display/headings) + DM Sans (body/UI) via `next/font`.
- Status chips: colored text over 10–15% alpha fill of the same color.
- Shared chrome: 64px top header + 260px grouped sidebar (Overview / Business /
  Clients / Production groups; Reports + Settings pinned bottom). Active item =
  `rgba(212,175,55,.1)` bg + gold icon/label. Use the nav from frames 07–13.

**Build in phases (mirror `specs/07-ROADMAP.md` — ship each phase working):**

- **Phase 0 — Foundations.** Scaffold Next.js + TS + Tailwind + shadcn/ui. Create
  the Supabase project, Prisma schema from `specs/04-DATA-MODEL.md`, first
  migration, RLS policies. Wire env/secrets (`specs/05-INTEGRATIONS.md` checklist).
  Build the app shell: header + sidebar + theme + fonts. Auth (Supabase) with
  `owner`/`team`/`client` roles and the **Login** screen (design frame 05).

- **Phase 1 — Clients, CRM & Dashboard.** Clients list (frame 02) + client records.
  CRM/Leads Kanban (frame 07) with the lead pipeline + statuses + notes. Owner
  **Dashboard** (frame 01): metric cards, recent activity, output chart (use
  Recharts). Public lead form that writes a lead + sends an acknowledgement (Resend).

- **Phase 2 — Proposals & onboarding.** Proposals (frame 08): builder, hosted
  public view, status tracking, accept → auto-create project + draft invoice +
  client login + onboarding form. Client **Portal** shell (frame 06): login,
  project view.

- **Phase 3 — Money.** Invoicing (frame 09): one-off + recurring retainers via
  Razorpay, INR + 18% GST, idempotent webhooks, PDF receipts, auto-reminders
  (email; WhatsApp when approved). Retainer/scope tracking (frame 12) with usage
  bars + upsell-invoice flagging.

- **Phase 4 — Delivery & stickiness.** Asset Approval 2.0 (versions, pinned
  comments, history), Asset Vault, **Brand Brain** (frame 11), WhatsApp
  notifications across events. Projects view (frame 10) with milestones + AI status.

- **Phase 5 — AI & intelligence.** AI proposal drafts + AI status updates (Claude
  API, fed by Brand Brain). Reports from Meta (once approved). Client health score
  (🟢/🟡/🔴) on the dashboard + project cards. Settings/Integrations (frame 13).

**Working method:** propose a short plan for the current phase before coding; use
TDD where it makes sense; keep money as `numeric` (never float); make webhooks
idempotent; treat all client data as confidential (private buckets, signed URLs,
RLS). After each phase, give me a runnable app and a short summary of what's done
and what's next.

Start with **Phase 0**. Confirm the stack and your Phase 0 plan, then begin.
