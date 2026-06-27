-- Vaelo — leads table (CRM). Almost certainly already exists in your shared
-- Supabase (your current site writes to it). Included for reference / fresh setup.
-- Run in Supabase → SQL Editor if it's missing.

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
create index if not exists leads_status_idx on public.leads (status);

-- Leads are accessed only via the service-role key on the server, which bypasses
-- RLS. Keep RLS on with no public policies so the anon key can't read/write leads.
alter table public.leads enable row level security;
grant usage on schema public to service_role;
grant all privileges on table public.leads to service_role;
