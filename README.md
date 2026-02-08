# RimaCare Hub

Home care platform for Nigeria: connect agencies, caregivers, and clients. Manage shifts, patients, and payments in one place.

## Stack

- **Frontend:** React (Vite), React Router
- **Backend:** Node.js (NestJS), TypeORM + Prisma, SQLite (PostgreSQL planned)
- **Payments:** Paystack (NGN). Wallets and payouts for agencies/caregivers.
- **CI:** GitHub Actions (lint + build). Hosting target: Render.

## Run locally

**Prereqs:** Node 20+, npm.

```bash
# Frontend
cd frontend && npm install && cp .env.example .env && npm run dev

# Backend (separate terminal)
cd backend && npm install && cp .env.example .env && npm run start:dev
```

Set `VITE_API_BASE_URL` (frontend) and `PORT`, `DATABASE_URL`, `JWT_SECRET` (backend). See each app’s `.env.example`.

## Repo

- **Branches:** `main` (production), `dev` (integration). Feature branches from `dev`.
- **PRs:** Target `dev`, at least one reviewer, no self-merge. Release to `main` via PR when approved.
