# RimaCare Hub — Backend (NestJS)

NestJS service powering RimaCare Hub (agencies, caregivers, clients). Full implementation with authentication, payments, wallets, and transactions.

## Requirements
- Node 20+
- npm
- PostgreSQL database

## Setup
```bash
cd backend
npm install
cp .env.example .env   # set PORT, DATABASE_URL, JWT_SECRET
```

## Scripts
```bash
npm run start:dev   # watch mode
npm run start       # prod mode
npm run build       # compile
npm run lint        # eslint
npm run test        # unit (placeholder)
npm run test:e2e    # e2e (placeholder)
```

## Structure
- `src/main.ts` — bootstrap with CORS and validation pipes
- `src/app.module.ts` — root module with all feature modules
- `src/auth/` — JWT + Local authentication, role guards
- `src/users/` — User management with TypeORM entities
- `src/payments/` — Paystack payment integration
- `src/wallets/` — Wallet management
- `src/transactions/` — Transaction tracking
- `src/webhooks/` — Webhook handling
- `prisma/` — Prisma schema and migrations
- `test/` — e2e tests

## Env
See `.env.example`. Required:
```
PORT=3000
DATABASE_URL=postgres://postgres:postgres@localhost:5432/rimacare_db
JWT_SECRET=please-change-me-to-secure-random-string
NODE_ENV=development
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=rimacare_db
```

## CI
GitHub Actions runs lint/build on push/PR to main/dev (see root `.github/workflows/ci.yml`).
