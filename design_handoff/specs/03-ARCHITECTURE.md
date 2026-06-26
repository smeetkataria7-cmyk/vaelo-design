# Architecture — VAELO

## 1. Guiding principles

- **One codebase** for the public website *and* the logged-in app (no separate projects).
- **Automation over manual steps** — the owner is solo; the system should do the work.
- **Multi-tenant-clean** — scope all data by client/owner, never hardcode "VAELO" in logic.
- **Mobile-first** for the client portal.
- **Server-side secrets** — no API keys in the browser, ever.

## 2. Tech stack

| Layer | Choice | Why |
|-------|--------|-----|
| Framework | **Next.js (App Router, React, TypeScript)** | Public site + app in one; SSR for SEO, API routes for backend |
| Styling/UI | **Tailwind CSS + shadcn/ui** | Fast, professional, fully customizable |
| Database | **PostgreSQL** (via Supabase) | Relational data (clients, invoices, projects); free tier to start |
| ORM | **Prisma** | Type-safe schema + migrations |
| Auth | **Supabase Auth** | Email/OTP logins, roles, integrates with Postgres RLS |
| File storage | **Supabase Storage** | Creatives, logos, brand docs; private buckets + signed URLs |
| Payments | **Razorpay** | India-first: UPI, cards, netbanking, subscriptions, invoices |
| Email | **Resend** | Transactional email (reminders, notifications) |
| WhatsApp | **Meta WhatsApp Cloud API** (or BSP: Interakt/WATI) | Client comms in India |
| AI images | **Fal / Replicate** (provider TBD) | Generate AI photoshoots |
| AI text | **Claude API (Anthropic)** | Proposals, status updates, onboarding copy |
| Social/ads data | **Meta Graph + Marketing API** | IG insights + ad performance |
| Hosting | **Vercel** | One-click Next.js deploy, preview envs |
| Background jobs | **Vercel Cron / Inngest** | Reminders, recurring billing, health scores |
| Monitoring | **Sentry** | Error tracking in production |

> See [Integrations](05-INTEGRATIONS.md) for keys, costs, and setup of each.

## 3. High-level diagram

```
                    ┌─────────────────────────────┐
   Visitors  ─────► │   Public site (SSR pages)   │
                    │   home / work / services    │
                    └──────────────┬──────────────┘
                                   │ lead form
                                   ▼
   ┌──────────────────────────────────────────────────────┐
   │                 Next.js app (Vercel)                   │
   │  ┌───────────────┐        ┌────────────────────────┐  │
   │  │  Owner admin  │        │     Client portal      │  │
   │  │  (full access)│        │  (own data only / RLS) │  │
   │  └──────┬────────┘        └───────────┬────────────┘  │
   │         │      API routes / server actions            │
   │         └───────────────────┬────────────────────────┘ │
   └─────────────────────────────┼──────────────────────────┘
                                  ▼
        ┌─────────────┬──────────┴──────────┬───────────────┐
        ▼             ▼                      ▼               ▼
   Supabase      Razorpay              Resend /        AI providers
   (DB/Auth/      (payments)          WhatsApp        (Fal/Replicate,
   Storage)                          (notifications)    Claude)
        ▲
        │  Meta Graph/Marketing API ──► IG + ads reports
   Background jobs (cron): reminders, recurring billing, health scores
```

## 4. Project structure (suggested)

```
/app
  /(marketing)        # public site: home, work, services, about
  /(admin)            # owner dashboard, CRM, proposals, invoices...
  /(portal)           # client-facing portal
  /api                # webhooks (Razorpay, WhatsApp), cron, integrations
/components           # shared UI (shadcn)
/lib                  # integrations clients (razorpay, resend, ai, meta)
/server               # business logic, server actions
/prisma               # schema.prisma + migrations
/docs                 # this documentation
```

## 5. Access control model

- **Roles:** `owner`, `team` (future), `client`.
- Enforce at two layers:
  1. **App layer** — route guards by role.
  2. **Database layer** — Postgres **Row-Level Security (RLS)** so a client can
     *never* query another client's rows, even if the app has a bug.
- Every client-owned table carries a `client_id`; RLS policies filter by the
  authenticated user's client.

## 6. Key non-functional requirements

- **Security:** all secrets server-side; payments via Razorpay (never store cards);
  private file storage with signed URLs. See [Security](08-SECURITY.md).
- **Reliability:** webhooks must be idempotent (payments, WhatsApp).
- **Performance:** public pages statically rendered/cached; portal data paginated.
- **Auditability:** log key actions (proposal accepted, invoice paid, asset approved).
- **Backups:** Supabase automated DB backups enabled.
