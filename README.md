# Pottawatomie County Business Intelligence Tracker

A full-stack intelligence dashboard for tracking incoming, rumored, and confirmed businesses in Pottawatomie County, Oklahoma.

## Tech Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Prisma ORM
- PostgreSQL (recommended for local + Netlify)

## Features

- Dashboard with summary cards and searchable/filterable business table
- Business CRUD (create, edit, delete) and archive flag
- Status categories and development stages
- Confidence score (0-100) with confidence history tracking
- Source tracking model and activity log model
- Watch Zones page
- Weekly intelligence briefing generator and PDF export
- CSV export and CSV import
- Mobile responsive UI
- Admin settings page

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Start a local PostgreSQL database (Docker example):

```bash
docker run --name pottco-pg -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=pottco_tracker -p 5432:5432 -d postgres:16
```

3. Create local environment file:

```bash
cp .env.example .env
```

4. Generate Prisma client and initialize database:

```bash
npx prisma migrate dev --name init
```

5. Seed starter data:

```bash
npm run prisma:seed
```

6. Start development server:

```bash
npm run dev
```

Open http://localhost:3000.

## Deploy to Netlify (Fix for non-loading deploys)

This repository now includes `netlify.toml` with the official Next.js Netlify plugin and a Netlify build script:

- Build command: `npm run netlify-build`
- Plugin: `@netlify/plugin-nextjs`

### Netlify environment variables

Set this required variable in Netlify Site Settings:

- `DATABASE_URL` = your managed PostgreSQL connection string (Neon, Supabase, RDS, etc.)

> Important: SQLite file databases are not reliable for Netlify serverless deployments because filesystem writes are ephemeral.

### First-time database setup for production

Run migrations against your production database (from your machine/CI):

```bash
npx prisma migrate deploy
npm run prisma:seed
```

## Seed Data Included

- Cavender's Boot City
- Unknown Retail — Harrison Corridor Expansion
- Shawnee Mall Redevelopment Watch
- King Street Housing Development
- Watch zones for Kickapoo Corridor, Harrison Street Corridor, Shawnee Mall Area, I-40 Access Points, and Downtown Shawnee
