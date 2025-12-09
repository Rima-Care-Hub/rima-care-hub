# RimaCare Hub — Backend (NestJS)

NestJS service powering RimaCare Hub (agencies, caregivers, clients). Currently a scaffold with sample controller; DB/auth modules coming next.

## Requirements
- Node 20+
- npm
- PostgreSQL (planned; not yet required)

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

## Structure (scaffold)
- `src/main.ts` — bootstrap
- `src/app.module.ts` — root module
- `src/app.controller.ts` — sample endpoint
- `src/app.service.ts` — sample service
- `test/` — e2e scaffold

## TODO (next backend steps)
- Add modules: auth (JWT), users (roles: admin/agency/caregiver), agencies, caregivers.
- Add PostgreSQL integration (Prisma or TypeORM) + migrations.
- Add validation pipes, global error filter.
- Add basic payouts module interface (payout accounts/requests).
- Add e2e tests for auth/login/current-user.

## Env
See `.env.example`. Minimum:
```
PORT=3000
DATABASE_URL=postgres://postgres:postgres@localhost:5432/rimacare
JWT_SECRET=please-change-me
NODE_ENV=development
```

## CI
GitHub Actions runs lint/build on push/PR to main/dev (see root `.github/workflows/ci.yml`).
