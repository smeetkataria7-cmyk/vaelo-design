# Features — VAELO

Each feature lists what it does and **acceptance criteria** (definition of done).
Priority: **P0** = V1 must-have, **P1** = next, **P2** = later.

---

## A. Public website (P0)

### A1. Marketing pages
Home, Work (case studies), Services, About, Contact.
- [ ] Home: hero with AI visuals, "real photoshoot vs AI" cost contrast, results strip, single clear CTA
- [ ] Work: case studies with brand name, before/after images, what was done, result number
- [ ] Services: AI photoshoots / Instagram / ads, each with inclusions (**no public pricing** — quoted per client via proposals); CTA = "request a quote / free sample"
- [ ] Fully responsive, fast (good Core Web Vitals), SEO meta tags per page
- [ ] Legal: privacy policy + terms (required for Meta API & payments)

### A2. Lead form / "Free AI sample" (P0)
- [ ] Fields: name, brand, Instagram handle, goal, optional product photo upload
- [ ] On submit: save lead to DB, email owner, auto-acknowledge the lead
- [ ] Spam protection (rate limit + captcha)
- [ ] Lead appears instantly in the owner CRM

---

## B. Owner / Admin side (P0 unless noted)

### B1. Admin dashboard
- [ ] Single screen: new leads, proposals pending, overdue invoices, active projects, at-risk clients
- [ ] Quick actions (reply to lead, create proposal, send invoice)

### B2. CRM / lead management
- [ ] Lead list with source, date, message, uploaded photo
- [ ] Pipeline statuses: New → Contacted → Proposal Sent → Won / Lost
- [ ] Notes, tags, follow-up reminders
- [ ] Search / filter, CSV export

### B3. Proposals
- [ ] Build proposal: scope, deliverables, timeline, price (from reusable templates)
- [ ] Send as hosted link (client needs no login to view)
- [ ] Track status: Draft → Sent → Viewed → Accepted / Declined
- [ ] Accepted proposal auto-creates a project + draft invoice
- [ ] **AI proposal draft** (P1): generate first draft from lead info + Brand Brain

### B4. Invoicing & billing
- [ ] Create invoice (line items, tax/GST, due date) — INR
- [ ] One-off invoices + **recurring retainers** (monthly auto-bill)
- [ ] Online payment via Razorpay (UPI, cards, netbanking)
- [ ] Auto reminders: before due, on due date, overdue (email + WhatsApp)
- [ ] Payment status dashboard, downloadable PDF invoices/receipts

### B5. Project tracking
- [ ] Each accepted client = a project with status + milestones
- [ ] Link deliverables, proposal, and invoices to the project
- [ ] **AI status update** (P1): auto-generate plain-language summary
      ("12 creatives delivered, 8 approved, 2 in review, milestone due Friday")

### B6. Retainer & scope tracking (P0 — revenue protection)
- [ ] Define package per client (e.g. 20 posts, 5 reels, 2 campaigns)
- [ ] Track usage: Posts 18/20, Reels 5/5, Campaigns 1/2
- [ ] Flag when limit hit → prompt auto-upsell / extra invoice
- [ ] Reset counters each retainer cycle

### B7. Asset approval 2.0 (P0 — stickiness)
- [ ] Upload creative for client review
- [ ] **Version history**: V1 → comment → V2 → Approved
- [ ] Comments pinned on the image, revision count tracked
- [ ] Clear "final approved asset" state
- [ ] Full history viewable months later

### B8. Brand Brain (P0 — see [full spec](10-BRAND-BRAIN.md))
- [ ] Per-client knowledge base: logos, colors, fonts, tone, audience, competitors,
      past campaigns, approved creatives, product photos, brand rules
- [ ] Feeds AI automatically so generation is context-aware

### B9. Client health score (P1)
- [ ] Auto-score from payment delays, approval delays, activity, retainer age
- [ ] 🟢 Healthy / 🟡 At Risk / 🔴 Likely to churn
- [ ] Surfaced on dashboard so owner acts before losing a client

### B10. Reports (P1)
- [ ] Pull Instagram growth + reach and ad performance from Meta
- [ ] Simple, fixed report per client (no complex builder)
- [ ] Shareable in the client portal

---

## C. Client portal (P0 unless noted)

- [ ] **C1. Secure login** — sees only their own data
- [ ] **C2. Project view** — status, timeline, milestones
- [ ] **C3. Creative approvals** — view AI shots, approve or request revision w/ comments
- [ ] **C4. Payments** — view invoices, pay online, see due dates
- [ ] **C5. Deliverables / Asset Vault** — permanent store of all final creatives, photos, videos, brand docs, reports; one-click re-download of anything
- [ ] **C6. Brand assets** — their Brand Brain inputs (logos, colors, etc.)
- [ ] **C7. Notifications** — payment due, new creatives, approvals (in-app + WhatsApp)
- [ ] **C8. White-label feel** (P1) — VAELO branding + custom domain (e.g. `portal.vaelocreative.com`)

---

## D. Automation (P0/P1)

### D1. Automated onboarding (P0)
On proposal acceptance, automatically:
- [ ] Create project
- [ ] Create client login + send invite
- [ ] Send onboarding form (collect brand assets, social handles, ad account access)
- [ ] Populate Brand Brain from the form

### D2. WhatsApp integration (P0 — India essential)
Push notifications via WhatsApp for:
- [ ] Proposal viewed/sent
- [ ] Invoice due / overdue
- [ ] Creative ready for approval
- [ ] Revision requested / approved

### D3. AI Creative Workspace (P2 — big differentiator)
- [ ] Client requests creatives ("5 Raksha Bandhan posts")
- [ ] AI generates first drafts (using Brand Brain context)
- [ ] Owner/designer refines → client approves
- [ ] Approved assets flow into the vault

---

## E. Explicitly removed (do NOT build)

- ❌ Internal messaging/chat (WhatsApp covers it)
- ❌ Complex/custom report builder
- ❌ Jira-style heavy project management
- ❌ Full accounting/bookkeeping
