# Overview

AntropoUBA Horarios is a web application for displaying and managing class schedules for the Anthropological Sciences program at the University of Buenos Aires (UBA), Faculty of Philosophy and Letters. It allows students to browse course schedules, filter by orientation/cycle, search for specific courses, and download PDF versions. An admin panel enables uploading schedule data via CSV and managing announcements.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Framework
- **Next.js 15** with App Router (`app/` directory structure)
- **TypeScript** throughout
- **React** client components (most pages use `"use client"` directive)
- The app was originally built with v0.dev and deployed on Vercel

## UI Layer
- **Tailwind CSS** for styling with custom UBA brand colors (`uba-primary: #1d2554`, `uba-secondary: #46bfb0`, etc.) and a custom orange/red theme (`#c44928`)
- **shadcn/ui** component library (extensive set of Radix-based UI primitives in `components/ui/`)
- **Bitter** Google Font as the primary serif font
- **react-masonry-css** for masonry layout in schedule display
- **jsPDF** for client-side PDF generation of schedules

## Page Structure
- `app/page.tsx` — Main public page showing course schedules (`HorariosDisplay` component) with an optional announcement modal
- `app/admin/page.tsx` — Admin panel for uploading CSV schedules, managing period info, toggling features, and managing announcements (password-protected client-side)
- `app/not-found.tsx` — Custom 404 page
- Layout uses a shared `PageLayout` component (Header → NavigationBar → Content → Footer)

## Data Architecture
- **Supabase** is the primary backend database (configured in `lib/supabase.ts`)
  - Two clients: a public read-only client (anon key) and an admin client (service role key) for write operations
  - Environment variables: `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`
- **Static fallback data** in `data/horarios-data.json` and `lib/sample-data-loader.ts` with hardcoded course and plan data
- **Plans de estudios** (study plans) data embedded in `lib/sample-data-loader.ts` and processed by `lib/planes-utils.ts`
  - Supports multiple orientations: Profesorado, Licenciatura en Antropología Sociocultural, Licenciatura en Arqueología
  - Maps courses between 1985 and 2023 curriculum codes

## API Routes
- The app uses Next.js API routes (referenced as `/api/horarios`, `/api/announcement`, etc.) — these fetch from and write to Supabase
- CSV upload flow: admin uploads CSV → parsed client-side → sent to API → stored in Supabase

## Key Business Logic
- `lib/planes-utils.ts` — Enriches course data with study plan information, handles cycle classification, orientation filtering, and cross-referencing between old (1985) and new (2023) curriculum codes
- `lib/text-utils.ts` — Spanish text formatting utilities (title case with Spanish articles/prepositions, Roman numeral handling, surname extraction)
- `components/horarios-display.tsx` — Main display component with search, filtering by day/orientation/cycle, and PDF download
- `components/csv-uploader.tsx` — CSV parsing and upload component for admin use

## Feature Flags
- "Planes de estudios" feature can be toggled on/off via localStorage (`planes-estudios-habilitado`)
- Announcement system with enable/disable toggle stored in Supabase

## Scripts
- `scripts/cargar-planes-supabase.js` — Utility script to load study plans into Supabase (run via `pnpm cargar-planes`)

# External Dependencies

## Supabase (Database & Backend)
- Used for storing course schedules, period information, study plans, and announcement configuration
- Requires three environment variables: `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`
- Public client for read operations, admin client (service role) for write operations

## Vercel (Deployment)
- Primary deployment platform, auto-deployed from GitHub

## Key NPM Packages
- `@supabase/supabase-js` — Supabase client
- `jspdf` — PDF generation for schedule downloads
- `react-masonry-css` — Masonry grid layout
- `next-themes` — Theme provider (dark mode support infrastructure)
- `react-hook-form` + `@hookform/resolvers` — Form handling
- `recharts` — Charting library (available but usage unclear)
- `vaul` — Drawer component
- `sonner` — Toast notifications
- `embla-carousel-react` — Carousel component
- Full suite of `@radix-ui` primitives via shadcn/ui