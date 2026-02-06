# RimaCare Hub — Frontend (React + Vite)

Minimal control-room UI with routing and auth guard. Dark, clean layout (sidebar, dashboard, shifts, patients, settings).

## Requirements
- Node 20+
- npm

## Setup
```bash
cd frontend
npm install
cp .env.example .env   # set VITE_API_BASE_URL (e.g., http://localhost:3000)
npm run dev
```

## Scripts
- `npm run dev` — local dev server
- `npm run build` — prod build
- `npm run preview` — preview build
- `npm run lint` — eslint

## Structure
- `src/main.jsx` — entry
- `src/App.jsx` — routes, shell, pages (Dashboard, Shifts, Patients, Settings, Login)
- `src/index.css` — global styles (dark UI)

## Routing & auth
- Public: `/login`, `/register`, `/forgot-password`
- Protected: `/dashboard`, `/shifts`, `/patients`, `/settings`
- Session management via localStorage (`rc-session`)
- API client with React Query hooks for data fetching

## Features
- Authentication flows (login, register, forgot password)
- API client with automatic token handling
- React Query hooks for data fetching
- Dashboard with stats and alerts
- Shifts and Patients management pages
