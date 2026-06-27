-- Vaelo — team_members (UI-managed admins / master admins)
-- Run once in Supabase: Dashboard → SQL Editor → New query → paste → Run.
--
-- Roles also come from env (NEXT_PUBLIC_SUPER_ADMIN_EMAILS / NEXT_PUBLIC_ADMIN_EMAILS),
-- so the owner is never locked out even if this table is empty. This table lets
-- you add/remove admins from the app without redeploying.
--   role = 'super' → master admin   |   role = 'admin' → admin
-- Anyone signed in who is in neither env list nor this table is a CLIENT.

create table if not exists public.team_members (
  id         uuid primary key default gen_random_uuid(),
  email      text unique not null,
  role       text not null default 'admin',  -- 'admin' | 'super'
  added_by   text default '',
  created_at timestamptz not null default now()
);

-- Role lookups run server-side with the service-role key, which bypasses RLS.
-- Keep RLS on with no public policies so the anon/public key can't read it.
alter table public.team_members enable row level security;
grant usage on schema public to service_role;
grant all privileges on table public.team_members to service_role;

-- Optional: seed your first master admin here too (env var does the same job):
-- insert into public.team_members (email, role) values ('owner@vaelocreative.com', 'super')
--   on conflict (email) do update set role = excluded.role;
