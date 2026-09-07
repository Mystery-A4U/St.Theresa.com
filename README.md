# St. Theresa Matriculation Higher Secondary School — Website

A premium, full-stack school website built for **St. Theresa Matriculation Higher
Secondary School, Sendurai, Tamil Nadu**, with a Supabase-backed events system,
Cloudinary media storage, and a protected admin dashboard for managing events.

---

## Tech Stack

| Layer          | Technology                                   |
|----------------|-----------------------------------------------|
| Framework      | Next.js 14 (App Router) + TypeScript          |
| Styling        | Tailwind CSS                                  |
| Database       | Supabase (PostgreSQL) with Row Level Security |
| Media storage  | Cloudinary (images & videos)                  |
| Auth           | Supabase Auth (email + password, admin-only)  |
| Deployment     | Vercel                                        |

---

## 1. Project Structure

```
src/
  app/
    page.tsx                       Home page
    about/page.tsx                 About page
    academics/page.tsx             Academics page
    facilities/page.tsx            Facilities page
    contact/page.tsx               Contact page
    events/page.tsx                Public events listing (from Supabase)
    events/[slug]/page.tsx         Public event details (gallery + video)
    admin/
      login/page.tsx               Admin login
      dashboard/page.tsx           Admin dashboard (protected)
      events/page.tsx              Manage events (protected)
      events/new/page.tsx          Create event (protected)
      events/[id]/edit/page.tsx    Edit event (protected)
    api/
      upload/route.ts              Server-only Cloudinary upload endpoint
      media/delete/route.ts        Server-only Cloudinary delete endpoint
  components/                      Shared UI (Navbar, Footer, EventCard, ...)
  components/admin/                Admin-only UI (forms, uploaders, nav)
  lib/
    supabase/client.ts             Browser Supabase client
    supabase/server.ts             Server Supabase client (Server Components)
    cloudinary.ts                  Server-only Cloudinary config & helpers
    types.ts                       Shared TypeScript types
    slug.ts                        Slug + date formatting helpers
  middleware.ts                    Protects /admin routes, refreshes session
supabase/
  schema.sql                       Full database schema + RLS policies
.env.example                       Environment variable template
```

---

## 2. Set Up Supabase

1. Create a project at [supabase.com](https://supabase.com).
2. Open the **SQL Editor** and run the contents of [`supabase/schema.sql`](./supabase/schema.sql).
   This creates the `events` and `event_media` tables and all Row Level
   Security policies (public read access to published events; write access
   restricted to authenticated users only).
3. Go to **Authentication → Users** and manually create your admin account(s)
   (email + password). Sign-up is intentionally **not** exposed on the public
   site — only accounts created here can log in at `/admin/login`.
4. Copy your project's **URL** and **anon public key** from
   **Project Settings → API** into your `.env.local` (see step 4 below).

---

## 3. Set Up Cloudinary

1. Create a free account at [cloudinary.com](https://cloudinary.com).
2. From your Dashboard, copy your **Cloud Name**, **API Key**, and **API Secret**.
3. No bucket/folder setup is required — the app automatically uploads into an
   `st-theresa-school/events` folder.

---

## 4. Environment Variables

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key

NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

**Security note:** `CLOUDINARY_API_SECRET` and the service-level Cloudinary
config in `src/lib/cloudinary.ts` are only ever imported from server-side code
(`/api/upload`, `/api/media/delete`). It is never bundled into client
JavaScript. All Cloudinary uploads/deletes are proxied through these
authenticated API routes — an admin session (verified via the Supabase
session cookie) is required to reach either endpoint.

---

## 5. Install & Run Locally

```bash
npm install
npm run dev
```

Visit `http://localhost:3000` for the public site and
`http://localhost:3000/admin/login` for the admin dashboard.

---

## 6. Deploy to Vercel

1. Push this project to a Git repository (GitHub/GitLab/Bitbucket).
2. Import the repository in [Vercel](https://vercel.com/new).
3. Add the same environment variables from `.env.local` in
   **Project Settings → Environment Variables**.
4. Deploy. Vercel will automatically detect the Next.js App Router project.

---

## 7. How the Admin Event/Media Flow Works

1. Admin logs in at `/admin/login` (Supabase Auth session cookie is set).
2. `middleware.ts` protects every `/admin/*` route except `/admin/login`,
   redirecting unauthenticated visitors back to login.
3. On `/admin/events/new` or `/admin/events/[id]/edit`, the admin:
   - Enters title (a URL slug is generated automatically), description, and date.
   - Uploads a cover image, gallery images, and/or videos.
4. Each file upload is sent to `/api/upload`, a **server-side** Route Handler
   that verifies the admin's Supabase session, then uploads directly to
   Cloudinary using the secret API key. Cloudinary returns a secure HTTPS URL.
5. On **Create**, the event row is inserted into `events`, then all
   collected media URLs are bulk-inserted into `event_media` with the new
   `event_id`. On **Edit**, media rows are inserted immediately after each
   upload (the event already exists).
6. Deleting a media item calls `/api/media/delete` (removes the Cloudinary
   asset) and then removes the corresponding `event_media` row.
7. The public `/events` and `/events/[slug]` pages query Supabase directly
   (only `published = true` events are ever visible to the public, enforced
   by Row Level Security — not just application logic).

---

## 8. Notes & Next Steps

- **Contact form:** currently opens the visitor's email client with a
  pre-filled message (no backend table was specified in the brief). To
  collect submissions in Supabase instead, add a `contact_messages` table
  and a Route Handler, then swap the `mailto:` logic in
  `src/components/ContactForm.tsx`.
- **Orphaned uploads:** if an admin uploads media while creating a *new*
  event but never saves, the Cloudinary asset remains (not yet linked to any
  database row). Periodically review the `st-theresa-school/events` folder
  in Cloudinary if this matters for your storage quota.
- **Google Maps:** the contact page uses a keyless embed URL. For a pinned,
  branded map, replace the `iframe` `src` in `src/app/contact/page.tsx` with
  an embed URL from Google Maps Platform using your own API key.
- Replace all placeholder Unsplash imagery, phone numbers, and email
  addresses with the school's real assets and contact details before launch.

---

## License

Built for St. Theresa Matriculation Higher Secondary School, Sendurai. All
rights to the school's name, crest, and content belong to the institution.
