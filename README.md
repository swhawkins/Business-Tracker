# Pottawatomie County Business Intelligence Tracker

A full-stack intelligence dashboard for tracking incoming, rumored, and confirmed businesses in Pottawatomie County, Oklahoma.

## Tech Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Prisma ORM
- SQLite (default local database)

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

2. Create local environment file:

```bash
cp .env.example .env
```

3. Generate Prisma client and initialize database:

```bash
npx prisma migrate dev --name init
```

4. Seed starter data:

```bash
npm run prisma:seed
```

5. Start development server:

```bash
npm run dev
```

Open http://localhost:3000.

## Production Notes

- The app is currently configured for SQLite. For PostgreSQL, update `prisma/schema.prisma` datasource provider and set `DATABASE_URL` to your Postgres connection string.
- The data model is prepared for future integrations from city agendas, planning commission packets, permits, job postings, CRE listings, and local news feeds.

## Seed Data Included

- Cavender's Boot City
- Unknown Retail — Harrison Corridor Expansion
- Shawnee Mall Redevelopment Watch
- King Street Housing Development
- Watch zones for Kickapoo Corridor, Harrison Street Corridor, Shawnee Mall Area, I-40 Access Points, and Downtown Shawnee
