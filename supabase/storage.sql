-- Vaelo — storage buckets. Run once in Supabase → SQL Editor.
-- The app accesses storage with the service-role key (bypasses RLS), so private
-- files are served via short-lived signed URLs. 'works' is public for portfolio images.

insert into storage.buckets (id, name, public) values
  ('client-files', 'client-files', false),
  ('works', 'works', true)
on conflict (id) do nothing;

-- Files metadata table (deliverables shown in Creatives + the client Vault/Approve).
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
grant usage on schema public to service_role;
grant all privileges on table public.files to service_role;
