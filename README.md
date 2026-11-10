# GPCS — Global Platform for Collaboration and Science

React + TypeScript + Vite + Tailwind CSS + React Router + Lucide, backed by Supabase (Auth, PostgreSQL, Storage, Realtime) with Row Level Security on every table.

## Run it

```bash
npm install
cp .env.example .env.local      # add your Supabase URL and publishable key
npm run dev
```

## Set up Supabase

1. Create a project at supabase.com.
2. In the SQL editor, run the files in `supabase/migrations/` in order: `0001_schema`, `0002_security`, `0003_storage`, `0004_seed`.
3. Authentication → Providers → Email: enable. Turn email confirmation on or off as you prefer; the app handles both.
4. Copy the project URL and publishable key (or legacy anon key) into `.env.local` as `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY`.

`0004_seed` loads reference data only: the OECD discipline taxonomy and the 17 UN Sustainable Development Goals. There are no fictional researchers, projects or discoveries. Every screen starts empty and fills with what real people add.

## Structure

| Route | Environment |
| --- | --- |
| `/discover` | Challenges, community-submitted discoveries and technologies (each with a required source link), world map |
| `/research`, `/research/:id` | Research list, workspace with sources, notes, documents |
| `/innovate`, `/innovate/:id` | Projects, stages, task board, progress |
| `/collaborate`, `/collaborate/workspaces/:id`, `/collaborate/people/:id` | People directory, workspaces, join requests, invitations, realtime discussion |
| `/knowledge`, `/knowledge/:slug` | Discipline map and list |
| `/my`, `/my/saved`, `/my/profile` | Personal overview, saved items, profile |
| `/login`, `/register` | Authentication |

```
src/
  components/{ui,layout,forms,map,knowledge}   design system and shell
  context/                                     theme, auth, saved items, taxonomy
  lib/api/                                     one typed module per domain
  pages/                                       one folder per environment
supabase/migrations/                           schema, RLS, storage, seed
```

## Security model

- Every table has RLS enabled. Public content is readable by anyone; private content only by its owner and members of workspaces it is shared with.
- Workspace roles: `owner` (lead), `editor` (may add sources, notes, documents and manage tasks on shared items), `viewer` (read and discuss).
- A workspace can only link research or projects its owner owns, so linking someone else's work never grants edit rights.
- Joining happens only through `respond_join_request` / `respond_workspace_invite` (SECURITY DEFINER RPCs that check the caller). Clients cannot insert themselves into `workspace_members`.
- Notifications are written by database triggers; clients can only mark them read. Profile updates are limited by column grants.
- Documents live in a private bucket and are served through 60-second signed URLs.

## Data honesty

- The map and discipline graph are computed from real public profiles and public research. They are empty until people add a country or tag disciplines.
- Discoveries and technologies are community submissions and must link to an original source. The platform does not generate or invent scientific claims.

## Scripts

`npm run dev` · `npm run build` (type-check and bundle) · `npm run typecheck` · `npm test`
