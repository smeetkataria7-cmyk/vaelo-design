-- ============================================================================
-- VAELO — complete database setup for a FRESH Supabase project.
-- Run this entire script once: Supabase Dashboard → SQL Editor → New query →
-- paste → Run. It is idempotent (safe to re-run). Auth (email/password) is
-- built in — no SQL needed for it.
-- All tables are accessed server-side with the service-role key, which bypasses
-- RLS; RLS is enabled with no public policies so the anon key can't read them.
-- ============================================================================

grant usage on schema public to service_role;

-- ---------------------------------------------------------------- leads (CRM)
create table if not exists public.leads (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  brand       text not null,
  email       text not null,
  instagram   text default '',
  goal        text default '',
  source      text default 'website',
  status      text default 'new',
  created_at  timestamptz not null default now()
);
create index if not exists leads_created_at_idx on public.leads (created_at desc);
alter table public.leads enable row level security;
grant all privileges on table public.leads to service_role;

-- ------------------------------------------------- team_members (admin roles)
create table if not exists public.team_members (
  id         uuid primary key default gen_random_uuid(),
  email      text unique not null,
  role       text not null default 'admin',   -- 'admin' | 'super'
  added_by   text default '',
  created_at timestamptz not null default now()
);
alter table public.team_members enable row level security;
grant all privileges on table public.team_members to service_role;

-- ----------------------------------------------------------------- proposals
create table if not exists public.proposals (
  id           uuid primary key default gen_random_uuid(),
  title        text not null,
  client_name  text not null,
  client_email text default '',
  items        jsonb not null default '[]',
  total        numeric not null default 0,
  notes        text default '',
  public_token text unique not null,
  status       text not null default 'sent',  -- draft|sent|viewed|accepted|declined
  viewed_at    timestamptz,
  accepted_at  timestamptz,
  created_by   text default '',
  created_at   timestamptz not null default now()
);
create index if not exists proposals_created_at_idx on public.proposals (created_at desc);
create index if not exists proposals_token_idx on public.proposals (public_token);
create index if not exists proposals_email_idx on public.proposals (client_email);
alter table public.proposals enable row level security;
grant all privileges on table public.proposals to service_role;

-- ------------------------------------------------------------------ invoices
create table if not exists public.invoices (
  id              uuid primary key default gen_random_uuid(),
  number          text not null,
  client_name     text not null,
  client_email    text default '',
  proposal_id     uuid,
  items           jsonb not null default '[]',
  subtotal        numeric not null default 0,
  gst_percent     numeric not null default 0,
  total           numeric not null default 0,
  due_date        date,
  notes           text default '',
  public_token    text unique not null,
  status          text not null default 'sent',  -- draft|sent|paid|overdue|void
  paid_at         timestamptz,
  last_reminded_on date,
  created_by      text default '',
  created_at      timestamptz not null default now()
);
create index if not exists invoices_created_at_idx on public.invoices (created_at desc);
create index if not exists invoices_email_idx on public.invoices (client_email);
create index if not exists invoices_token_idx on public.invoices (public_token);
alter table public.invoices enable row level security;
grant all privileges on table public.invoices to service_role;

-- ----------------------------------------------------------------- contracts
create table if not exists public.contracts (
  id           uuid primary key default gen_random_uuid(),
  title        text not null,
  client_name  text not null,
  client_email text default '',
  body         text default '',
  file_path    text default '',
  file_link    text default '',
  public_token text unique not null,
  status       text not null default 'sent',  -- sent | signed
  signer_name  text default '',
  signed_at    timestamptz,
  created_by   text default '',
  created_at   timestamptz not null default now()
);
create index if not exists contracts_email_idx on public.contracts (client_email);
create index if not exists contracts_token_idx on public.contracts (public_token);
alter table public.contracts enable row level security;
grant all privileges on table public.contracts to service_role;

-- ------------------------------------------------------------------ projects
create table if not exists public.projects (
  id           uuid primary key default gen_random_uuid(),
  title        text not null,
  client_name  text not null,
  client_email text default '',
  status       text not null default 'active',  -- onboarding|active|paused|completed
  proposal_id  uuid,
  created_by   text default '',
  created_at   timestamptz not null default now()
);
create index if not exists projects_created_at_idx on public.projects (created_at desc);
create index if not exists projects_email_idx on public.projects (client_email);
alter table public.projects enable row level security;
grant all privileges on table public.projects to service_role;

-- ----------------------------------------------------- finance_entries (P&L)
create table if not exists public.finance_entries (
  id         uuid primary key default gen_random_uuid(),
  label      text not null,
  amount     numeric not null default 0,
  kind       text not null default 'expense',  -- income | expense
  recurring  boolean not null default false,
  months     integer not null default 1,
  start_date date not null default current_date,
  notes      text default '',
  created_by text default '',
  created_at timestamptz not null default now()
);
create index if not exists finance_created_at_idx on public.finance_entries (created_at desc);
alter table public.finance_entries enable row level security;
grant all privileges on table public.finance_entries to service_role;

-- --------------------------------------------------------------- brand_brain
create table if not exists public.brand_brain (
  id           uuid primary key default gen_random_uuid(),
  client_email text unique not null,
  client_name  text default '',
  colors       text default '',
  fonts        text default '',
  tone         text default '',
  audience     text default '',
  competitors  text default '',
  rules        text default '',
  links        text default '',
  notes        text default '',
  updated_at   timestamptz not null default now(),
  created_at   timestamptz not null default now()
);
create index if not exists brand_brain_email_idx on public.brand_brain (client_email);
alter table public.brand_brain enable row level security;
grant all privileges on table public.brand_brain to service_role;

-- ------------------------------------------------------------------- reports
create table if not exists public.reports (
  id           uuid primary key default gen_random_uuid(),
  client_email text not null,
  title        text not null,
  period       text default '',
  platform     text default '',
  link         text default '',
  spend        numeric,
  reach        numeric,
  clicks       numeric,
  conversions  numeric,
  roas         text default '',
  notes        text default '',
  created_by   text default '',
  created_at   timestamptz not null default now()
);
create index if not exists reports_email_idx on public.reports (client_email);
create index if not exists reports_created_at_idx on public.reports (created_at desc);
alter table public.reports enable row level security;
grant all privileges on table public.reports to service_role;

-- --------------------------------------------------------- works (portfolio)
create table if not exists public.works (
  id           uuid primary key default gen_random_uuid(),
  slug         text not null unique,
  title        text not null,
  image_url    text not null default '',
  accent_color text not null default '#1a1a1a',
  categories   text[] not null default '{}',
  case_url     text not null default '',
  sort_order   int not null default 0,
  published    boolean not null default true,
  created_by   text default '',
  created_at   timestamptz not null default now()
);
create index if not exists works_order_idx on public.works (sort_order asc, created_at desc);
alter table public.works enable row level security;
grant all privileges on table public.works to service_role;

-- ------------------------------------------------- files (client deliverables)
create table if not exists public.files (
  id           uuid primary key default gen_random_uuid(),
  client_email text not null,
  project_id   uuid,
  name         text not null,
  path         text default '',
  link         text default '',
  type         text default '',
  status       text default 'pending',  -- pending | approved | revision
  comment      text default '',
  created_at   timestamptz not null default now()
);
create index if not exists files_client_email_idx on public.files (lower(client_email));
alter table public.files enable row level security;
grant all privileges on table public.files to service_role;

-- --------------------------------------------------------- storage buckets
insert into storage.buckets (id, name, public) values
  ('client-files', 'client-files', false),
  ('works', 'works', true)
on conflict (id) do nothing;

-- Public read for portfolio images; service_role manages all objects.
do $$ begin
  create policy "works public read" on storage.objects
    for select using (bucket_id = 'works');
exception when duplicate_object then null; end $$;
