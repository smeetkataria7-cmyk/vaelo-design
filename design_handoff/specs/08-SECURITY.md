# Security & Leakage Prevention — VAELO

"Leakage" here covers **three** kinds of loss. The platform must defend against all
three: losing leads, losing money, and losing/exposing data.

---

## 1. Lead leakage — prospects slip away

| Leak point | Prevention |
|------------|------------|
| Slow/no reply | Auto-acknowledge every lead instantly (email/WhatsApp) + notify owner |
| Form friction | Ask only: name, brand, IG handle, goal (photo optional) |
| No follow-up | CRM follow-up reminders; nothing goes cold |
| Prospect forgets | Capture email; light nurture sequence |
| Confusing site | One clear CTA per page; fast load |
| Spam drowning real leads | Rate limiting + captcha on the form |

## 2. Revenue leakage — work done, money not collected

| Leak point | Prevention |
|------------|------------|
| Forgotten invoices | Auto-generate invoice when project starts / cycle renews |
| Late payers | Automated reminders: before / on / after due date |
| Scope creep / free extras | Retainer & scope tracking; extras require a new invoice |
| Lapsed retainers | Recurring auto-billing via Razorpay subscriptions |
| Lost records | Every invoice logged with status + audit trail |
| Payment disputes | Webhook-confirmed payments; receipts auto-issued |

## 3. Data & security leakage — the dangerous one

| Leak point | Prevention |
|------------|------------|
| Client sees another client's data | **Row-Level Security (RLS)** in Postgres + app-layer role guards |
| Stored passwords | Never store; use Supabase Auth (hashed/managed) |
| Leaked API keys | All secrets server-side; never `NEXT_PUBLIC_`; stored in Vercel/Supabase |
| Card data exposure | Never touch cards — Razorpay handles all payment data |
| Exposed uploaded files | Private storage buckets; access via short-lived **signed URLs** only |
| Form spam/abuse/injection | Rate limit, captcha, validate + sanitize all input (Zod) |
| Webhook spoofing | Verify signatures (Razorpay/WhatsApp); make handlers idempotent |
| Account takeover | Strong auth (email OTP/2FA), session expiry, secure cookies |
| No backups | Supabase automated DB backups enabled + tested restore |
| Silent breaches | Audit log of key actions; Sentry alerts on anomalies |
| Over-broad access | Least privilege: clients get the minimum; service-role key server-only |

---

## Security checklist (developer must confirm before launch)

- [ ] RLS enabled + tested on **every** client-scoped table
- [ ] Role guards on all admin routes; portal users can't reach admin APIs
- [ ] All third-party secrets server-side only; none in client bundle
- [ ] File access exclusively via signed URLs; buckets private
- [ ] Razorpay + WhatsApp webhooks signature-verified + idempotent
- [ ] All form/API input validated and sanitized (Zod schemas)
- [ ] Rate limiting + captcha on public endpoints (lead form, auth)
- [ ] HTTPS everywhere; secure, httpOnly, sameSite cookies
- [ ] Auth: OTP/2FA available; sensible session expiry
- [ ] DB backups on; restore tested at least once
- [ ] Audit logging for: proposal accepted, invoice paid, asset approved, login
- [ ] Privacy policy + terms live (also required by Meta + payment providers)
- [ ] Sentry capturing prod errors; alerting configured
- [ ] Dependency/security scanning in CI

---

## Compliance notes (India)
- Maintain a clear **privacy policy** (data collected, why, retention) — required for
  Meta API approval and good practice under India's data protection rules.
- For GST on invoices, include correct tax fields and the agency's GSTIN.
- Get client consent before connecting their IG/ad accounts and storing their data.
