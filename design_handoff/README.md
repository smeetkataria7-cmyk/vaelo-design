# Handoff: VAELO — AI-Native Creative Agency OS

## Overview

VAELO is an internal **Agency Operating System** for VAELO Creative — a digital
marketing agency specializing in AI-generated photoshoots, Instagram management,
and paid advertising. It replaces scattered tools (DMs, spreadsheets, WhatsApp,
manual invoices) with one system that runs the whole client lifecycle: lead →
proposal → onboarding → delivery/approval → payment → retention.

This bundle contains a **high-fidelity visual design** plus the **complete
product specification** (PRD, features, architecture, data model, integrations,
user flows, roadmap, security, setup, Brand Brain). Together they are enough to
build the product end-to-end.

> The design covers the **owner/admin side** (dashboard, CRM, proposals,
> invoicing, projects, retainers, Brand Brain, settings), the **client portal**
> (mobile-first), and **authentication**. It is dark-themed, editorial, and
> uses a gold accent.

## About the Design Files

The files in `design/` are a **design reference created in HTML** — a prototype
showing the intended look, layout, and behavior. **They are NOT production code
to copy directly.**

Your task is to **recreate these designs in the target stack** defined in
`specs/03-ARCHITECTURE.md` — **Next.js (App Router) + TypeScript + Tailwind CSS
+ shadcn/ui**, with Supabase (DB/Auth/Storage), Prisma, Razorpay, Resend,
WhatsApp Cloud API, and Claude API. Build with that stack's idioms and
component library; use the HTML only as the visual + interaction source of truth.

`design/Vaelo Agency OS.dc.html` is a self-contained design canvas with **13
frames** laid out on a pannable board (open it in a browser; it loads its runtime
from `support.js` in the same folder). Each frame is one screen of the product.

## Fidelity

**High-fidelity.** Final colors, typography, spacing, and component styling are
all intentional and specified below. Recreate the UI faithfully using shadcn/ui
primitives styled to match these tokens. Where the HTML used a placeholder
(gradient blocks standing in for creative thumbnails), substitute real image
components.

---

## Tech Stack (from `specs/03-ARCHITECTURE.md`)

| Layer | Choice |
|---|---|
| Framework | Next.js (App Router, React, TypeScript) — public site + app in one |
| UI | Tailwind CSS + shadcn/ui |
| DB | PostgreSQL via Supabase |
| ORM | Prisma |
| Auth | Supabase Auth (email/OTP, roles, RLS) |
| Storage | Supabase Storage (private buckets + signed URLs) |
| Payments | Razorpay (UPI, cards, subscriptions/retainers) — INR |
| Email | Resend |
| WhatsApp | Meta WhatsApp Cloud API (or BSP) |
| AI images | Fal / Replicate |
| AI text | Claude API (Anthropic) |
| Social/ads | Meta Graph + Marketing API |
| Hosting | Vercel |
| Jobs | Vercel Cron / Inngest (reminders, recurring billing, health scores) |

Three route groups: `/(marketing)` public site, `/(admin)` owner dashboard,
`/(portal)` client portal. Every client-scoped table carries `client_id` and is
protected by **Postgres Row-Level Security**.

---

## Screens / Views

The design canvas has 13 frames. Frames 01–03 use an earlier nav; **frames
07–13 carry the correct, complete sidebar** — use that nav everywhere.

### Global chrome (all admin screens)

- **Top header** — 64px tall, `#0a0a0a`, bottom border `#2d2d2d`. Left: 30px gold
  (`#d4af37`) rounded square logo with serif "V" + "Vaelo / AGENCY OS" lockup.
  Center: 280–300px search field (`#141414` bg, `#2d2d2d` border, 8px radius,
  magnifier icon, "⌘K" hint). Right: notification bell with red badge, vertical
  divider, 32px circular gold-gradient avatar "A" + "Alex Vaelo / Owner" + chevron.
- **Sidebar** — 260px wide, `#0a0a0a`, right border `#2d2d2d`, 10px padding.
  Grouped nav with 10px uppercase section labels (`#374151`): **Overview**
  (Dashboard, CRM / Leads `[5]`, Projects `[3]`), **Business** (Proposals,
  Invoicing, Retainers), **Clients** (Clients `[5]`, Brand Brain), **Production**
  (Creatives, Case Studies). Pinned to bottom: Reports, Settings.
  Item: 38–40px tall, 7px radius, 14px icon + 13px label (`#9ca3af`). Active item:
  background `rgba(212,175,55,0.1)`, icon + label gold (`#d4af37`), weight 500.
  Count badges: gold pill for clients/leads, blue pill `rgba(59,130,246,.15)` for projects.

### 01 — Dashboard (`/dashboard`)
- **Purpose:** owner's at-a-glance morning view.
- **Layout:** page header ("Dashboard" 28px Playfair + subtitle) with date-range
  segmented control (7d / **30d** / Custom) and Export button. Then a 4-column
  metric-card grid; then a 3-column row (Recent Creatives masonry / Case Studies
  list / Activity feed); then a full-width chart card.
- **Metric cards:** `#111` bg, `#2d2d2d` border, 12px radius, 18–20px padding.
  10px uppercase label, 38px Playfair value, trend line (green ↑ `#10b981`).
  Values: Active Clients 5 (+2), Total Assets 342 (+18), Creatives/Month 47
  (+12), Case Studies 5 (3 published · 2 draft).
- **Recent Creatives:** 4-col grid of 1:1 rounded tiles (gradient placeholders),
  play glyph + duration badge bottom-right, "+4 more" dashed tile.
- **Chart:** "Creative Output" line chart, gold stroke, 7-day uploads. (Design
  uses Chart.js; in-app use Recharts or the codebase's chart lib.)

### 02 — Clients (`/dashboard/clients`)
- **Purpose:** client roster.
- **Layout:** header + "New client" gold button; filter row (search, sort,
  grid/table toggle); 3-column card grid.
- **Client card:** `#111`, `#2d2d2d` border, 14px radius, centered. 52px rounded
  square avatar tinted to the client's accent (initial in Playfair), name (16px
  Playfair), category eyebrow, then a 2-up stat footer (Creatives / Case Studies)
  split by a vertical divider. Hover/active card gets a gold border + faint gold ring.
  Last tile is a dashed "Add new client".
- Clients + accents: DVOC Institute `#c8331f` (Ed-tech), Zerolys `#2a9d8f`
  (Sustainability), Marigold Miraya `#e76f51` (Fashion), Arcivox `#9b59b6`
  (Music), Lumina Labs `#3b82f6` (SaaS).

### 03 — Case Studies (`/dashboard/case-studies`)
- **Purpose:** list + inline editor for published/draft case studies.
- **Layout:** left list pane (table rows: accent dot + title/client, status badge,
  updated, Edit + ⋮) and a right 440px editor panel (tabs General / Challenge /
  Results / Media / SEO; form fields; 3-up results metrics; sticky Save draft /
  Publish bar). Status badges: Published green, Draft gray, Archived muted.

### 05 — Login / Auth (`/auth/login`)
- **Purpose:** sign in.
- **Layout:** split screen. Left 580px brand panel (gold-tinted radial glow,
  logo, a 4-step vertical pipeline "Lead captured → AI proposal → Creatives
  approved → Invoice paid", serif tagline). Right: centered 340px form — "Sign in
  to Vaelo", email field, password field with reveal eye, inline error chip
  (`rgba(239,68,68,.07)`), full-width 44px gold **Sign in** button, "Request
  access" link, divider, Google SSO button.
- **States:** default, error ("Invalid email or password"), loading (spinner in
  button), success (redirect).

### 06 — Client Portal (mobile, `portal.vaelocreative.com`)
- **Purpose:** mobile-first self-serve for clients.
- **Layout:** three 340×720 phone mockups on a dark board:
  1. **Home** — status bar; "Marigold Miraya / Good morning"; gold **AI Status
     Update** card; Pending Approvals (3) with thumbnail row; red invoice-due
     alert with Pay button; monthly package usage bars (Posts 18/20, Reels 5/5 ⚠);
     bottom tab bar (Home / Approve / Vault / Bills).
  2. **Creative Approval** — back nav + "3 pending"; large 1:1 creative preview
     with "Version 2" tag; reviewer comment card; **Approve** (green) / **Revise**
     buttons; pager dots.
  3. **Invoice & Payment** — "Invoice #INV-047"; ₹48,000 amount card; line-item
     breakdown with GST (18%) → ₹53,100 total; blue **Pay via Razorpay** button;
     "UPI · Cards · Net Banking" subtext.

### 07 — CRM / Leads (`/dashboard/crm`)
- **Purpose:** lead pipeline.
- **Layout:** header ("5 leads · ₹3.2L pipeline · 2 won") + Export CSV + Add lead;
  5-column Kanban: **New** (gray) / **Contacted** (blue) / **Proposal** (amber) /
  **Won** (green) / **Lost** (red, dimmed). Lead card: brand name, @handle ·
  industry, service chip, source/date; won cards show ₹/mo; contacted shows
  "AI sample sent" + follow-up date.
- Statuses map to `leads.status`: new / contacted / proposal_sent / won / lost.

### 08 — Proposals (`/dashboard/proposals`)
- **Purpose:** build, send, track proposals.
- **Layout:** header + New proposal; a 5-cell pipeline strip (Draft 1 / Sent 1 /
  Viewed 1 / Accepted 2 / Declined 0); a table (Client/Title, Amount, Status,
  Sent, Views, action). Bottom: gold **AI Proposal Draft** callout ("Generated
  from Brand Brain · scope + pricing pre-filled / Review draft →").
- Status badges: Accepted green, Viewed blue (with "3× ↗"), Draft gray.

### 09 — Invoicing / Finance (`/dashboard/invoicing`)
- **Purpose:** invoices + retainer billing, INR + GST, Razorpay.
- **Layout:** header + Export PDF + New invoice; 4 overview cards (Outstanding
  ₹1,24,000 / Overdue ₹48,000 red / Paid This Month ₹2,16,000 green / Retainers 5);
  invoice table (Invoice #, Client, Amount incl. GST, Due Date, Status, Type, ⋮).
  Bottom: "Razorpay connected · UPI · Cards · Subscriptions · Auto-reminders · Live".
- Status badges: Overdue red (with "8d late"), Sent amber, Paid green, Draft gray.
  Amounts use Indian grouping (₹1,24,000). GST 18%.

### 10 — Projects (`/dashboard/projects`)
- **Purpose:** per-client project tracking with AI status + health.
- **Layout:** header ("3 active · 1 onboarding") + New project; 2-column project
  cards. Card: accent avatar + client + service; status dot (Active green /
  At Risk amber / Onboarding blue); a gold **AI Status** summary card (or red
  Alert card for at-risk); milestone checklist (done = green check, current = gold
  ring, pending = empty); footer health score (🟢 94 / 🟡 62) + ₹/mo.

### 11 — Brand Brain (`/dashboard/brand-brain`)
- **Purpose:** the moat — per-client knowledge base feeding all AI actions.
- **Layout:** 220px client picker (selected = DVOC, gold), then editor. Header
  shows client + "AI uses this context automatically" gold chip. 2×2 cards:
  **Identity** (color swatches + add chip, fonts), **Tone of Voice** (paragraph +
  tag chips incl. a red "never: salesy"), **Audience & Market** (audience /
  positioning / USPs), **Approved Style Refs** (4-up thumbnails, approved ones get
  a green check). Full-width **Brand Rules** card: ✓ Always use / ✗ Never use columns.
- Backed by the `brand_brain` table (jsonb fields). See `specs/10-BRAND-BRAIN.md`.

### 12 — Retainers (`/dashboard/retainers`)
- **Purpose:** scope/usage tracking → revenue protection.
- **Layout:** header + red "2 clients at limit — upsell opportunity" pill;
  2-column client cards. Each: accent avatar + client + cycle/₹ + health pill;
  usage bars for Posts / Reels / Campaigns. At/over limit → bar turns red, "⚠",
  and an inline **Create upsell invoice / Invoice ₹8,000** button.
- Backed by `retainer_usage` (limits/used jsonb per cycle).

### 13 — Settings / Integrations (`/dashboard/settings`)
- **Purpose:** workspace + integration management.
- **Layout:** tabs (General / **Integrations** / Team / Billing). Integrations
  grid: Razorpay (Connected · KYC verified), WhatsApp (Connected · 3 templates),
  Claude API (Connected · model), Resend (Connected · DNS verified), Meta Graph +
  Marketing (Pending review · ~14d, amber), Fal.ai (Not connected · Connect).
  Bottom: red **Danger Zone** (Delete workspace).

---

## Interactions & Behavior

- **Navigation:** sidebar items route to their section; clicking a metric card or
  list row deep-links into that record. Header search = ⌘K / Ctrl+K command palette.
- **Lead → proposal → onboarding:** see `specs/06-USER-FLOWS.md` flows 2–3.
  Accepting a proposal auto-creates a project, a draft invoice, a client login +
  portal invite, and sends the onboarding form that populates Brand Brain.
- **Asset approval (Flow 4):** V1 → pinned comments → V2 → Approved; approved asset
  copies into the Asset Vault and links into Brand Brain `approved_creative_refs`.
- **Billing (Flow 5):** send invoice → Razorpay pay (UPI/card) → webhook marks Paid
  → receipt sent. Reminders fire before due / on due / overdue (email + WhatsApp).
- **Retainer limits (Flow 6):** as deliverables ship, usage increments; hitting a
  limit flags the owner and offers an auto-upsell invoice.
- **Health score (Flow 7):** background job recomputes 🟢/🟡/🔴 from payment delays,
  approval delays, activity, retainer age.
- **Transitions:** 150ms ease for hover/opacity/shadow; modal scale+fade; toast
  slide-up; number counters animate 0→value; skeleton shimmer while loading.
- **States to build for every data view:** loading (skeleton), empty, error, and
  populated. Forms get inline validation.
- **Responsive:** admin is desktop-first (sidebar collapses to a drawer < 1024px,
  tables become stacked cards < 640px). **Portal is mobile-first** per the mockups.

## State Management

- Server state via Next.js server components / server actions + Supabase queries;
  client cache with React Query (or the codebase's choice) for mutations
  (approve creative, send invoice, change lead status).
- Auth/session from Supabase Auth; role in `users.role` (`owner` | `team` |
  `client`) gates routes at the app layer **and** the DB layer (RLS).
- Key entities & status enums come straight from `specs/04-DATA-MODEL.md`
  (leads, clients, proposals, projects, deliverables, asset_versions, invoices,
  retainer_usage, brand_brain, asset_vault_items, health_scores, notifications).
- Webhooks (Razorpay, WhatsApp) must be **idempotent**.

## Design Tokens

**Color**
```
--paper          #0a0a0a   /* app background, header, sidebar */
--paper-2        #0f0f0f   /* frame background */
--card           #111111   /* cards, panels */
--input          #141414   /* inputs, search, secondary buttons */
--surface-3      #1a1a1a / #1d1d1d  /* hover / segmented active */
--line           #2d2d2d   /* primary borders */
--line-2         #222222   /* dividers inside dark panels */

--ink            #f4f3ee   /* primary text */
--ink-2          #d1d5db   /* secondary text */
--muted          #9ca3af   /* muted labels, inactive nav */
--muted-2        #6b7280   /* sublabels */
--muted-3        #4b5563   /* faint */
--muted-4        #374151   /* section labels, dimmest */

--accent (gold)  #d4af37   /* primary accent: active nav, CTAs, values */
--accent-grad    #9a7b0a / #b8960c   /* avatar/logo gradient stops */

--success        #10b981
--error          #ef4444
--warning        #f59e0b
--info           #3b82f6

/* Per-client accents */
DVOC #c8331f · Zerolys #2a9d8f · Marigold #e76f51 · Arcivox #9b59b6 · Lumina #3b82f6
```
Status-chip pattern: text in the status color over a 10–15% alpha fill of the same
color, ~5px radius, 10px weight-600 text.

**Typography**
- Display / headings: **Playfair Display** (600/700), tight letter-spacing
  (-0.02em on H1). H1 ≈ 26–28px, metric values ≈ 38–40px.
- Body / UI: **DM Sans** (300–600). Body 13px, labels 12px, eyebrows 10px
  uppercase +0.08–0.1em tracking.

**Spacing & shape**
- Sidebar 260px · header 64px · content padding 24–32px.
- Radius: 6px small · 7–8px buttons/inputs/nav · 10–12px cards · 14px large cards.
- Card padding 16–22px. Grid gaps 10–20px.
- Buttons: 44px primary (login), ~36–40px standard; gold solid = primary,
  `#141414`+`#2d2d2d` = secondary.

**Shadow**
- Card hover `0 4px 12px rgba(0,0,0,.5)`; frame `0 20px 80px rgba(0,0,0,.95)`.

## Assets

- **Fonts:** Playfair Display + DM Sans (Google Fonts).
- **Icons:** the mockup uses inline Lucide-style strokes (1.6–1.7 width). Use
  `lucide-react` in-app.
- **Imagery:** all creative thumbnails/avatars in the mockup are CSS gradient
  **placeholders** — replace with real uploaded media (Supabase Storage signed URLs).
- **Logo:** simple gold rounded-square "V"; swap for the real VAELO mark when available.
- No third-party brand assets are embedded.

## Files

```
design_handoff_vaelo_agency_os/
├── README.md                       ← this file (design spec)
├── BUILD-PROMPT.md                 ← paste into Claude Code to start the build
├── design/
│   ├── Vaelo Agency OS.dc.html     ← the 13-frame design canvas (open in browser)
│   └── support.js                  ← runtime for the canvas (keep beside the html)
└── specs/
    ├── 01-PRD.md          ├── 06-USER-FLOWS.md
    ├── 02-FEATURES.md     ├── 07-ROADMAP.md
    ├── 03-ARCHITECTURE.md ├── 08-SECURITY.md
    ├── 04-DATA-MODEL.md   ├── 09-SETUP.md
    ├── 05-INTEGRATIONS.md └── 10-BRAND-BRAIN.md
```

Open `design/Vaelo Agency OS.dc.html` in a browser and pan the board to see all
13 frames. Read `specs/` for the functional source of truth. Start from
`BUILD-PROMPT.md`.
