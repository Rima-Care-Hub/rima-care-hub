# RimaCare Hub

Digital platform connecting home care agencies, independent nurses/caregivers, and clients in Nigeria. Web + mobile marketplace with subscriptions, commissions, and automated payouts (future).

## Repos & branches
- Branches: `main` (production), `dev` (integration), feature/employee branches off `dev`.
- No self-merge; at least 1 reviewer. PRs should target `dev`.

## Stack
- Frontend: React (Vite), React Router, custom minimal UI shell.
- Backend: Node.js (NestJS).
- DB: PostgreSQL (planned).
- CI: GitHub Actions (lint + build for frontend/backend).
- Hosting target: Render.

## Quick start
Prereqs: Node 20+, npm, PostgreSQL (local, optional until DB is wired).

```bash
# clone
git clone git@github.com:Rima-Care-Hub/rima-care-hub.git
cd rima-care-hub

# frontend
cd frontend
npm install
npm run dev

# backend
cd ../backend
npm install
npm run start:dev
```

## Environment
- `frontend/.env.example` → copy to `frontend/.env` (set `VITE_API_BASE_URL`)
- `backend/.env.example` → copy to `backend/.env` (set PORT, DATABASE_URL, JWT_SECRET)

## Scripts (top-level of each app)
Frontend:
- `npm run dev` — local dev
- `npm run lint` — lint
- `npm run build` — prod build

Backend:
- `npm run start:dev` — watch mode
- `npm run lint` — lint
- `npm run build` — compile

## CI
GitHub Actions `.github/workflows/ci.yml` runs on push/PR to `main` and `dev`:
- Frontend: `npm ci`, lint, build
- Backend: `npm ci`, lint, build

## Workflows
1) Branch from `dev`.
2) Commit and push your branch.
3) PR into `dev` with 1+ reviewer; no self-merge.
4) Release to `main` via PR when approved.

## Current state
- **Backend**: Full NestJS implementation with:
  - Authentication (JWT + Local strategy)
  - User management with role-based access control
  - Payments integration (Paystack)
  - Wallets and transactions
  - Webhooks handling
  - TypeORM + Prisma for database
- **Frontend**: React app with:
  - Authentication flows (login, register, forgot password)
  - Dashboard, Shifts, Patients, Settings pages
  - API client with React Query
  - Dark minimal UI design

