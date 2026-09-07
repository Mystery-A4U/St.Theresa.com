-- ============================================================
-- ST. THERESA MATRICULATION HR SEC SCHOOL — Supabase Schema
-- Run this in the Supabase SQL editor for your project.
-- ============================================================

create extension if not exists "uuid-ossp";

-- ── events ────────────────────────────────────────────────
create table if not exists public.events (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  slug text not null unique,
  description text not null default '',
  event_date date not null,
  cover_image text,
  published boolean not null default true,
  created_at timestamptz not null default now()
);

-- ── event_media ───────────────────────────────────────────
create table if not exists public.event_media (
  id uuid primary key default uuid_generate_v4(),
  event_id uuid not null references public.events(id) on delete cascade,
  media_url text not null,
  media_type text not null check (media_type in ('image', 'video')),
  caption text,
  created_at timestamptz not null default now()
);

create index if not exists event_media_event_id_idx on public.event_media(event_id);
create index if not exists events_slug_idx on public.events(slug);
create index if not exists events_date_idx on public.events(event_date desc);

-- ============================================================
-- ROW LEVEL SECURITY
-- Public (anon) visitors may only READ published events/media.
-- Only authenticated users (school admins, added manually in
-- Supabase Auth) may INSERT / UPDATE / DELETE.
-- ============================================================

alter table public.events enable row level security;
alter table public.event_media enable row level security;

-- Public read access (published events only)
create policy "Public can read published events"
  on public.events for select
  using (published = true);

create policy "Public can read media of published events"
  on public.event_media for select
  using (
    exists (
      select 1 from public.events e
      where e.id = event_media.event_id and e.published = true
    )
  );

-- Authenticated admin full access
create policy "Authenticated users can read all events"
  on public.events for select
  to authenticated
  using (true);

create policy "Authenticated users can insert events"
  on public.events for insert
  to authenticated
  with check (true);

create policy "Authenticated users can update events"
  on public.events for update
  to authenticated
  using (true)
  with check (true);

create policy "Authenticated users can delete events"
  on public.events for delete
  to authenticated
  using (true);

create policy "Authenticated users can read all media"
  on public.event_media for select
  to authenticated
  using (true);

create policy "Authenticated users can insert media"
  on public.event_media for insert
  to authenticated
  with check (true);

create policy "Authenticated users can update media"
  on public.event_media for update
  to authenticated
  using (true)
  with check (true);

create policy "Authenticated users can delete media"
  on public.event_media for delete
  to authenticated
  using (true);

-- ============================================================
-- After running this file:
-- 1. Go to Authentication → Users in the Supabase dashboard.
-- 2. Manually create your admin user(s) with email + password.
--    (Sign-up is intentionally NOT exposed on the public site.)
-- 3. Only those users will be able to log in at /admin/login.
-- ============================================================
