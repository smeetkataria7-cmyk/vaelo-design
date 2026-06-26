# User Flows — VAELO

Step-by-step journeys for the main actors. These map directly to the
[features](02-FEATURES.md) and drive the UI screens to build.

---

## Flow 1: Visitor → Lead (public site)

```
1. Visitor lands on home (from a DM link or search)
2. Sees AI visuals + "real shoot vs AI" cost contrast + named case studies
3. Clicks CTA → "Get a free AI sample for your brand"
4. Fills form: name, brand, IG handle, goal, (optional) product photo
5. Submits
   → Lead saved to DB
   → Auto-acknowledgement email/WhatsApp sent
   → Owner notified instantly
   → Lead appears in CRM as "New"
```

## Flow 2: Owner works a lead → sends proposal

```
1. Owner sees new lead on dashboard
2. Opens lead, reviews brand + uploaded photo
3. (Optional) Generates a free AI sample to send as the hook
4. Moves status → Contacted, adds notes/follow-up reminder
5. Clicks "Create proposal"
   → (P1) AI drafts scope + pricing from lead info + Brand Brain
6. Owner edits, sets line items + total (INR)
7. Sends → client gets a hosted link (no login needed)
   → Status: Sent; WhatsApp "proposal sent" template fires
```

## Flow 3: Client accepts proposal → auto onboarding

```
1. Client opens proposal link, reviews scope + price
   → Status auto-updates: Viewed (owner notified via WhatsApp)
2. Client clicks "Accept" (and signs, if e-sign enabled)
   → Status: Accepted
3. System auto-runs onboarding:
   → Creates project (status: onboarding)
   → Creates client login + sends portal invite
   → Sends onboarding form (brand assets, social handles, ad account access)
   → Generates a draft invoice from the proposal
4. Client completes onboarding form
   → Brand Brain populated with logos, colors, audience, rules
   → Project status → active
```

## Flow 4: Deliver creative → approval (Asset Approval 2.0)

```
1. Owner uploads creative V1 to the project deliverable
   → Client notified (WhatsApp + in-app): "creative ready"
2. Client opens it in portal, leaves pinned comments
   → Status: revision; revision_count +1; owner notified
3. Owner uploads V2
4. Client approves
   → Status: approved; final asset locked
   → Approved asset copied into Asset Vault + Brand Brain refs
5. Six months later: full V1→comment→V2→approved history still visible
```

## Flow 5: Billing & reminders

```
1. Draft invoice created (from proposal or manually)
2. Owner sends invoice → client notified, can pay via Razorpay (UPI/card)
3. Reminder schedule (auto, background job):
   → Before due date: gentle reminder
   → On due date: reminder
   → Overdue: escalating reminders (email + WhatsApp)
4. Client pays → Razorpay webhook → status: Paid → receipt sent
5. Retainers: recurring invoice auto-generated each cycle
```

## Flow 6: Retainer / scope tracking (revenue protection)

```
1. Client package defined: 20 posts, 5 reels, 2 campaigns
2. As work is delivered, usage increments: Posts 18/20, Reels 5/5...
3. When a limit is hit:
   → Owner flagged: "Reels limit reached"
   → Client requests extra reel → prompt to auto-create upsell invoice
4. Each new cycle resets counters
```

## Flow 7: Client health & retention

```
1. Background job recomputes health score per client:
   factors = payment delays + approval delays + activity + retainer age
2. Dashboard shows 🟢 / 🟡 / 🔴 bands
3. Owner sees a client slipping to 🟡 → reaches out before churn
```

## Flow 8: Client self-serve (portal, mobile)

```
1. Client logs in on phone
2. Sees: project status (AI-generated summary), creatives to approve,
   invoices to pay, their asset vault, brand assets
3. Approves a creative / pays an invoice / re-downloads an old asset — all self-serve
4. Never needs to ask "where are we at?" or "can you resend that file?"
```

## Flow 9 (P2): AI Creative Workspace

```
1. Client requests in portal: "Need 5 Raksha Bandhan creatives"
2. Owner sees the request
3. AI generates first drafts using Brand Brain context
4. Designer refines → sends for approval (Flow 4)
5. Approved → vault
```
