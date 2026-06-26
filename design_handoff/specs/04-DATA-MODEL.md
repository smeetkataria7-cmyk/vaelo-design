# Data Model — VAELO

Relational schema (PostgreSQL via Prisma). This is a starting blueprint — the dev
should refine types, indexes, and constraints during implementation.

## Entity overview

```
User ──< Client ──< Project ──< Deliverable ──< AssetVersion
  │         │           │
  │         │           ├──< Invoice
  │         │           └──< RetainerUsage
  │         ├──< Proposal
  │         ├──< BrandBrain
  │         ├──< AssetVaultItem
  │         └──< HealthScore
  └──< Lead
Notification, AuditLog (cross-cutting)
```

---

## Tables

### users
The owner (and future team members) + client login accounts.
| Field | Type | Notes |
|-------|------|-------|
| id | uuid (pk) | |
| email | text unique | |
| role | enum | `owner` \| `team` \| `client` |
| client_id | uuid (fk, nullable) | set for client users |
| created_at | timestamptz | |

### leads
Captured from the public lead form.
| Field | Type | Notes |
|-------|------|-------|
| id | uuid (pk) | |
| name | text | |
| brand | text | |
| instagram_handle | text | |
| goal | text | |
| photo_url | text (nullable) | uploaded product photo |
| source | text | e.g. `website`, `dm` |
| status | enum | `new` \| `contacted` \| `proposal_sent` \| `won` \| `lost` |
| notes | text | |
| tags | text[] | |
| follow_up_at | timestamptz (nullable) | |
| created_at | timestamptz | |

### clients
A signed client (converted lead).
| Field | Type | Notes |
|-------|------|-------|
| id | uuid (pk) | |
| name | text | brand/company name |
| contact_name | text | |
| email | text | |
| whatsapp | text | |
| industry | text | |
| status | enum | `active` \| `paused` \| `churned` |
| created_at | timestamptz | |

### proposals
| Field | Type | Notes |
|-------|------|-------|
| id | uuid (pk) | |
| client_id | uuid (fk, nullable) | |
| lead_id | uuid (fk, nullable) | |
| title | text | |
| scope | jsonb | deliverables, timeline |
| line_items | jsonb | name, qty, price |
| total | numeric | INR |
| public_token | text unique | hosted view link |
| status | enum | `draft` \| `sent` \| `viewed` \| `accepted` \| `declined` |
| viewed_at / accepted_at | timestamptz | |
| created_at | timestamptz | |

### projects
| Field | Type | Notes |
|-------|------|-------|
| id | uuid (pk) | |
| client_id | uuid (fk) | |
| proposal_id | uuid (fk, nullable) | |
| name | text | |
| status | enum | `onboarding` \| `active` \| `paused` \| `completed` |
| milestones | jsonb | label, due_date, done |
| created_at | timestamptz | |

### deliverables
A creative item delivered for review.
| Field | Type | Notes |
|-------|------|-------|
| id | uuid (pk) | |
| project_id | uuid (fk) | |
| title | text | |
| type | enum | `post` \| `reel` \| `ad` \| `photo` \| `other` |
| status | enum | `in_review` \| `revision` \| `approved` |
| revision_count | int | |
| current_version_id | uuid (fk) | |
| created_at | timestamptz | |

### asset_versions
Version history for each deliverable (Asset Approval 2.0).
| Field | Type | Notes |
|-------|------|-------|
| id | uuid (pk) | |
| deliverable_id | uuid (fk) | |
| version | int | 1, 2, 3... |
| file_url | text | private storage path |
| comments | jsonb | [{author, text, x, y, created_at}] pinned comments |
| is_approved | bool | |
| created_at | timestamptz | |

### invoices
| Field | Type | Notes |
|-------|------|-------|
| id | uuid (pk) | |
| client_id | uuid (fk) | |
| project_id | uuid (fk, nullable) | |
| number | text unique | invoice no. |
| line_items | jsonb | |
| subtotal / tax / total | numeric | INR, GST |
| due_date | date | |
| status | enum | `draft` \| `sent` \| `paid` \| `overdue` \| `void` |
| is_recurring | bool | retainer |
| recurring_interval | enum (nullable) | `monthly` |
| razorpay_id | text (nullable) | |
| paid_at | timestamptz (nullable) | |
| created_at | timestamptz | |

### retainer_usage
Scope tracking per client per cycle.
| Field | Type | Notes |
|-------|------|-------|
| id | uuid (pk) | |
| client_id | uuid (fk) | |
| cycle_start / cycle_end | date | |
| limits | jsonb | {posts: 20, reels: 5, campaigns: 2} |
| used | jsonb | {posts: 18, reels: 5, campaigns: 1} |
| created_at | timestamptz | |

### brand_brain
Permanent per-client knowledge base. See [Brand Brain spec](10-BRAND-BRAIN.md).
| Field | Type | Notes |
|-------|------|-------|
| id | uuid (pk) | |
| client_id | uuid (fk, unique) | one per client |
| logos | jsonb | file refs |
| colors | jsonb | hex palette |
| fonts | jsonb | |
| tone_of_voice | text | |
| audience | text | |
| competitors | jsonb | |
| brand_rules | text | dos/don'ts |
| past_campaigns | jsonb | |
| approved_creative_refs | uuid[] | links to asset_versions |
| updated_at | timestamptz | |

### asset_vault_items
Permanent repository of final assets.
| Field | Type | Notes |
|-------|------|-------|
| id | uuid (pk) | |
| client_id | uuid (fk) | |
| type | enum | `photo` \| `video` \| `logo` \| `doc` \| `report` \| `creative` |
| file_url | text | |
| title | text | |
| created_at | timestamptz | |

### health_scores
| Field | Type | Notes |
|-------|------|-------|
| id | uuid (pk) | |
| client_id | uuid (fk) | |
| score | int | 0–100 |
| band | enum | `healthy` \| `at_risk` \| `churn_risk` |
| factors | jsonb | payment_delay, approval_delay, activity, retainer_age |
| computed_at | timestamptz | |

### notifications
| Field | Type | Notes |
|-------|------|-------|
| id | uuid (pk) | |
| user_id | uuid (fk) | recipient |
| channel | enum | `in_app` \| `email` \| `whatsapp` |
| type | text | invoice_due, creative_ready... |
| payload | jsonb | |
| read_at | timestamptz (nullable) | |
| created_at | timestamptz | |

### audit_logs
| Field | Type | Notes |
|-------|------|-------|
| id | uuid (pk) | |
| actor_id | uuid (fk) | |
| action | text | proposal_accepted, invoice_paid... |
| entity | text / entity_id uuid | |
| created_at | timestamptz | |

---

## Notes for the developer
- Every client-scoped table has `client_id` → enforce **Row-Level Security**.
- Use `jsonb` for flexible/evolving structures (scope, comments, limits) and
  promote to columns if querying needs grow.
- Money as `numeric` (never float). Currency = INR throughout V1.
- Add indexes on foreign keys + status fields used in dashboards.
