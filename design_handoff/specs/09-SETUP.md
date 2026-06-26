# Setup & Procurement — VAELO

What to install, what accounts to create, and the order to do it in.

---

## A. Accounts to create (procurement checklist)

Do the **slow ones first** — they gate later phases.

- [ ] **Meta for Developers** app → request IG + Marketing API review ⏳ *(weeks — do first)*
- [ ] **Razorpay** account → complete business KYC ⏳ *(days — do first)*
- [ ] **WhatsApp Business** (Meta Cloud API or a BSP like Interakt/WATI) → submit message templates ⏳
- [ ] **Domain** (Namecheap/GoDaddy): `vaelocreative.com`
- [ ] **Vercel** account (hosting)
- [ ] **Supabase** account (DB + Auth + Storage)
- [ ] **Resend** account (email) → verify sending domain via DNS
- [ ] **AI image** provider (Fal or Replicate) — *confirm which VAELO already uses*
- [ ] **Anthropic** account (Claude API key)
- [ ] **Sentry** account (error monitoring)
- [ ] **GitHub** repo (code + CI/CD to Vercel)

See [Integrations](05-INTEGRATIONS.md) for what each is for and its env vars.

---

## B. Local development setup

### Prerequisites
- Node.js LTS (v20+)
- pnpm (or npm)
- Git
- A Supabase project (or local Supabase via Docker)

### Steps
```bash
# 1. Clone
git clone <repo-url> vaelo && cd vaelo

# 2. Install
pnpm install

# 3. Environment
cp .env.example .env.local
#   fill in values from the Integrations doc

# 4. Database
pnpm prisma migrate dev      # apply schema
pnpm prisma db seed          # optional: seed sample data

# 5. Run
pnpm dev                     # http://localhost:3000
```

### Useful scripts (define in package.json)
```
pnpm dev            # start dev server
pnpm build          # production build
pnpm lint           # eslint
pnpm typecheck      # tsc --noEmit
pnpm prisma studio  # browse the DB
pnpm test           # run tests
```

---

## C. Environment variables
Copy `.env.example` → `.env.local`. Full list in
[Integrations → Master .env checklist](05-INTEGRATIONS.md#master-env-checklist).

> **Rule:** integration secrets are **server-side only**. Never prefix them with
> `NEXT_PUBLIC_`. Only truly public values (e.g. site URL) may be public.

---

## D. Deployment (Vercel)
1. Connect the GitHub repo to Vercel.
2. Add all env vars in Vercel project settings (Production + Preview).
3. Point the domain's DNS to Vercel; add `portal.vaelocreative.com` subdomain.
4. Configure Supabase production project + run migrations.
5. Set up Vercel Cron for background jobs (reminders, recurring billing, health scores).
6. Add webhook URLs in Razorpay + WhatsApp dashboards → your `/api/webhooks/*` routes.
7. Verify Sentry receives a test error.

---

## E. Pre-launch checklist
- [ ] Phase 0 + Phase 1 features working (see [Roadmap](07-ROADMAP.md))
- [ ] Security checklist passed (see [Security](08-SECURITY.md))
- [ ] Privacy policy + terms live
- [ ] Lead form tested end-to-end (submit → DB → email → CRM)
- [ ] Payments tested in Razorpay test mode, then live
- [ ] Mobile portal tested on a real phone
- [ ] Backups confirmed working
