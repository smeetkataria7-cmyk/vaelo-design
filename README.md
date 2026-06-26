# VAELO — Agency OS

An internal **Agency Operating System** for an AI-native creative agency. It runs
the whole client lifecycle in one place: **lead → proposal → onboarding →
delivery/approval → payment → retention.**

Built to the design + product spec in [`design_handoff/`](./design_handoff)
(PRD, features, architecture, data model, integrations, user flows, roadmap,
security, Brand Brain, and the 13-frame visual canvas).

## Stack

- **Next.js (App Router, TypeScript)** — public site + app in one
- **Tailwind CSS v4 + shadcn/ui-style components** (authored locally)
- **Prisma + PostgreSQL (Supabase)** — DB, Auth, Storage *(wiring in progress)*
- **Recharts** — dashboard charts
- Razorpay · Resend · WhatsApp Cloud API · Claude API · Meta Graph/Marketing *(integrations: roadmap)*
- INR throughout, GST-aware.

## Status

This is an actively-built implementation. The **admin app** is a high-fidelity,
running recreation of the design, currently backed by demo data
(`src/lib/mock.ts`) so every screen renders without live credentials.

**Done**
- Design system (tokens, fonts, dark editorial theme) + UI primitives
- App shell: 64px header + 260px grouped sidebar
- Screens: Dashboard, Clients, CRM/Leads, Proposals, Invoicing, Projects,
  Retainers, Brand Brain, Case Studies, Settings/Integrations
- Complete Prisma schema (`prisma/schema.prisma`) from the data model

**Next** (see `design_handoff/specs/07-ROADMAP.md`)
- Auth (Login) + mobile client portal
- Wire live Supabase (DB/Auth/Storage) + RLS, replace mock data
- Razorpay / Resend / WhatsApp / Claude / Meta integrations
- Asset Approval 2.0, Reports, Health scores, AI layer

## Getting started

```bash
pnpm install
pnpm dev          # http://localhost:3000  (redirects to /dashboard)
```

Other scripts:

```bash
pnpm build        # production build
pnpm typecheck    # tsc --noEmit
pnpm lint         # eslint
pnpm db:generate  # prisma generate (after DATABASE_URL is set)
pnpm db:migrate   # prisma migrate dev
```

## Project structure

```
src/
  app/
    (admin)/dashboard/...   # owner admin screens
    layout.tsx, globals.css # fonts + design tokens
  components/
    app/                    # shell: header, sidebar, page-header, cards
    ui/                     # button, card, table, tabs, … (shadcn-style)
    charts/                 # recharts wrappers
    status-chip.tsx         # the status-chip pattern
  lib/
    mock.ts                 # demo data (swap for Prisma/Supabase)
    utils.ts                # cn(), INR formatting
prisma/schema.prisma        # full data model
design_handoff/             # the original spec + visual canvas
```

## Design tokens

Dark theme — background `#0a0a0a`, cards `#111`, borders `#2d2d2d`, primary text
`#f4f3ee`, gold accent `#d4af37`. Display type **Playfair Display**, UI type
**DM Sans**. Full token set lives in `src/app/globals.css`.
