# Product Requirements Document — VAELO

## 1. Overview

VAELO is an internal **Agency Operating System** for VAELO Creative, a digital
marketing agency specializing in **AI-generated photoshoots, Instagram management,
and paid advertising**.

The platform replaces the scattered tools the agency uses today (DMs, spreadsheets,
WhatsApp, manual invoices) with one system that manages the entire client lifecycle.

## 2. Problem

Today VAELO operates manually:
- Leads are chased one-by-one via cold DMs with **no website to point to** → low trust, low conversion.
- Proposals, approvals, and feedback live in WhatsApp and get lost.
- Invoices and reminders are manual → late and missed payments.
- Client deliverables (AI creatives) have no version history or single home.
- There is no record of *why* a creative looks the way it does — brand context lives in the owner's head.

This causes **three kinds of leakage**: lost leads, lost revenue, and lost knowledge.

## 3. Goals

| Goal | Why it matters |
|------|----------------|
| Stop pitching "naked" | A credible public site + lead form so outreach converts |
| Centralize the client lifecycle | One place for proposals → delivery → payment |
| Stop revenue leakage | Auto invoicing, reminders, retainer/scope tracking |
| Build a knowledge moat | Brand Brain stores every client's brand context permanently |
| Make clients sticky | Asset vault, approvals history, reports they can't get elsewhere |

## 4. Non-goals (explicitly out of scope)

- ❌ Not a SaaS product sold to other agencies (internal tool only).
- ❌ No internal team chat (WhatsApp handles this).
- ❌ No Jira-style heavy project management.
- ❌ No full accounting suite (invoicing only; export to accountant).
- ❌ No complex custom report builder (fixed, useful reports only).

## 5. Users & roles

| Role | Who | Access |
|------|-----|--------|
| **Owner / Admin** | The VAELO owner (currently solo) | Everything |
| **Team member** *(future)* | Designers/marketers | Scoped admin access |
| **Client** | VAELO's 5–6 (and growing) clients | Their own data only |
| **Visitor** | Prospects on the public site | Public pages + lead form |

## 6. Scope summary

### Owner side
CRM, proposals, invoicing, project tracking, retainer/scope tracking, Brand Brain,
asset approval, client health score, reports, admin dashboard.

### Client side
Portal login, project view, creative approvals, payments, deliverables/asset vault,
brand assets, notifications (incl. WhatsApp).

### AI layer
Brand Brain (knowledge base that feeds AI), AI status updates, AI proposal drafts,
AI onboarding assistance, AI creative drafts.

See [Features](02-FEATURES.md) for the full breakdown.

## 7. Success metrics

| Metric | Target |
|--------|--------|
| Lead → reply time | < 5 minutes (automated acknowledgement) |
| Proposal acceptance rate | Track + improve baseline |
| Invoices paid on time | > 90% (via reminders) |
| Retainer overages caught | 100% (no free extra work) |
| Client retention | Increase vs. pre-platform |
| Owner time on admin | Reduce by automating onboarding/status/billing |

## 8. Constraints & assumptions

- **Region: India** — Razorpay for payments, WhatsApp-first comms, INR currency.
- **Mobile-first** for the client portal.
- **Solo owner** initially — automation > manual steps everywhere.
- Built **multi-tenant-clean** (no hardcoded agency) to keep future options open,
  but multi-agency features are **not** built now.

## 9. Open questions

- [ ] Exact pricing/package structure for retainer tracking?
- [ ] Which AI image provider(s) are already in use? (affects integration)
- [ ] WhatsApp: Meta Cloud API direct, or via a BSP (Interakt/WATI/Gupshup)?
- [ ] E-signature: legally binding required, or simple "Accept" button enough?
- [ ] Does the owner need team-member logins in V1, or owner-only?
