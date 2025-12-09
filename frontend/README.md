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
- Public: `/login`
- Protected: `/dashboard`, `/shifts`, `/patients`, `/settings`
- Simple localStorage session (`rc-session`) with email/token placeholder; redirects to login when missing.

## TODO (next frontend steps)
- Hook API client + React Query to real backend endpoints.
- Build full auth flows (login/signup/forgot) and validation.
- Flesh out Shifts/Patients data views with filters and pagination.
- Add settings/profile edit, theme tokens, responsiveness polish.
