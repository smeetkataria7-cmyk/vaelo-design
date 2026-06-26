# Integrations & Procurement — VAELO

Every external service the platform needs, what it's for, the keys/env vars
required, cost, and gotchas. **Region: India** — choices favor the Indian market.

> ⚠️ **Plan Meta API approval EARLY.** Instagram + Ads APIs require an approved
> Meta app, a verified business, and a live privacy policy. Approval can take weeks.

---

## Summary table

| Service | Purpose | Cost (approx) | Setup difficulty |
|---------|---------|---------------|------------------|
| Domain (Namecheap/GoDaddy) | vaelocreative.com | ~₹800–1500/yr | Easy |
| Vercel | Hosting | Free → $20/mo | Easy |
| Supabase | DB + Auth + Storage | Free → $25/mo | Easy |
| Razorpay | Payments, retainers, invoices | ~2% per txn | Medium (KYC) |
| Resend | Transactional email | Free 3k/mo → $20/mo | Easy (DNS) |
| WhatsApp (Meta Cloud API or BSP) | Client notifications | Per-conversation pricing | Medium–Hard |
| Fal / Replicate | AI image generation | ~₹1–8 per image | Easy |
| Claude API (Anthropic) | AI text (proposals, status, onboarding) | Per token | Easy |
| Meta Graph + Marketing API | IG insights + ad reports | Free | Hard (app review) |
| Sentry | Error monitoring | Free tier | Easy |
| Plausible / GA4 | Site analytics | Free–$9/mo | Easy |

---

## Details

### 1. Domain — Namecheap / GoDaddy
- Buy `vaelocreative.com` (+ common variants). Point DNS to Vercel.
- Subdomain `portal.vaelocreative.com` for the client portal (white-label feel).

### 2. Hosting — Vercel
- Connect the GitHub repo; auto-deploys + preview environments.
- Env vars stored in Vercel project settings.
- `VERCEL_*` set automatically; add app secrets here too.

### 3. Database / Auth / Storage — Supabase
- One project covers Postgres + Auth + file Storage.
- Env: `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` (server only).
- Enable **Row-Level Security** on all client-scoped tables.
- Create private storage buckets; serve files via **signed URLs** only.
- Turn on automated backups.

### 4. Payments — Razorpay  *(India-first)*
- Supports UPI, cards, netbanking; **Subscriptions** (retainers) + **Invoices** APIs.
- Requires business KYC (PAN, GST, bank). Start this early.
- Env: `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, `RAZORPAY_WEBHOOK_SECRET`.
- Implement webhook (`payment.captured`, `subscription.charged`) — **idempotent**.
- *Never store card data* — Razorpay handles it.
- *(Alternative if going global later: Stripe.)*

### 5. Email — Resend
- Transactional: lead acknowledgement, invoice reminders, portal invites.
- Verify sending domain via DNS (SPF/DKIM) for deliverability.
- Env: `RESEND_API_KEY`. Use React Email for templates.

### 6. WhatsApp — Meta WhatsApp Cloud API *(or BSP)*
- **India-essential.** Clients live on WhatsApp.
- Two paths:
  - **Meta Cloud API direct** — cheaper, more setup (templates need approval).
  - **BSP (Interakt / WATI / Gupshup)** — faster to launch, friendlier APIs, costs more.
- Notifications: proposal viewed, invoice due/overdue, creative ready, revision requested.
- Requires pre-approved **message templates** for business-initiated messages.
- Env (Cloud API): `WHATSAPP_TOKEN`, `WHATSAPP_PHONE_NUMBER_ID`, `WHATSAPP_VERIFY_TOKEN`.

### 7. AI image generation — Fal / Replicate
- Generates the AI photoshoots / creative drafts.
- **Confirm which provider/models VAELO already uses** before building.
- Env: `FAL_KEY` or `REPLICATE_API_TOKEN`.
- Run generation server-side; store outputs in Supabase Storage.

### 8. AI text — Claude API (Anthropic)
- Powers AI proposal drafts, AI status updates, onboarding copy — all fed by Brand Brain.
- Use the latest Claude model. Env: `ANTHROPIC_API_KEY` (server only).
- Keep prompts in `/lib/ai`; never expose the key to the browser.

### 9. Social + ads data — Meta Graph & Marketing API
- **Graph API** → Instagram Business insights (followers, reach, post performance).
- **Marketing API** → ad campaign results.
- Needs: Meta app + **App Review** for permissions
  (`instagram_basic`, `instagram_manage_insights`, `ads_read`), business
  verification, and a live privacy policy.
- Clients connect their IG/ad accounts during onboarding (OAuth).
- Env: `META_APP_ID`, `META_APP_SECRET`, `META_REDIRECT_URI`.
- **Longest lead time of any integration — start the application first.**

### 10. Monitoring — Sentry
- Catch production errors. Env: `SENTRY_DSN`.

### 11. Analytics — Plausible / GA4
- Track site traffic + conversions on the lead form. Plausible = privacy-friendly.

---

## Master `.env` checklist
```
# Core
DATABASE_URL=
SUPABASE_URL=
SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
# Payments
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
RAZORPAY_WEBHOOK_SECRET=
# Email
RESEND_API_KEY=
# WhatsApp
WHATSAPP_TOKEN=
WHATSAPP_PHONE_NUMBER_ID=
WHATSAPP_VERIFY_TOKEN=
# AI
FAL_KEY=            # or REPLICATE_API_TOKEN
ANTHROPIC_API_KEY=
# Meta
META_APP_ID=
META_APP_SECRET=
META_REDIRECT_URI=
# Monitoring
SENTRY_DSN=
```
> All secrets are **server-side only**. Never prefix integration secrets with
> `NEXT_PUBLIC_`.
