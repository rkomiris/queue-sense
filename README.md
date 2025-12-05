# QueueSense

QueueSense is a single-page React experience that simulates a production-ready wait-time intelligence platform for clinics, DMV offices, pharmacies, and campus service centers. The UI follows an Apple-inspired aesthetic with purposeful whitespace, soft gradients, and subtle motion so judges feel like they are using a polished SaaS product.

## Highlights
- 🔐 **Simulated authentication** powered by environment-driven credentials (no backend).
- 🗂️ **Eight fully mocked screens**: login, consumer dashboard, clinic, DMV, notifications, admin analytics, system diagram, and settings.
- 📊 **Animated data visualizations** using Recharts for clinic trends, DMV traffic, and 12-hour admin history.
- ✨ **Micro-interactions** such as fade-in transitions, hover lifts, sliding notifications, and theme toggles.
- 🚀 **Netlify-ready setup** with SPA redirects and `netlify.toml` so a push-to-deploy flow “just works”.

## Getting Started
1. Install dependencies
   ```bash
   npm install
   ```
2. Create a `.env.local` (or `.env`) file using the template below and adjust values as needed.
3. Run the dev server
   ```bash
   npm start
   ```
4. Open `http://localhost:3000` in your browser.

## Environment Configuration
All credentials, organization details, and the Netlify site URL are loaded from environment variables.

Copy `.env.example` to `.env.local` and edit as needed:
```bash
cp .env.example .env.local
```

Variables:
- `REACT_APP_NETLIFY_SITE_URL` – your deployed Netlify preview/production domain.
- `REACT_APP_USERS` – JSON array of user objects (`username`, `password`, `role`, optional `orgId`).
- `REACT_APP_ORGANIZATIONS` – JSON array of organizations (`orgId`, `displayName`, optional metadata).

> ℹ️ The app parses these JSON strings at runtime. Update the arrays to add/remove users or tenants without touching code.

## Available Scripts
- `npm start` – runs the development server with live reload.
- `npm test` – executes the basic smoke test.
- `npm run build` – bundles the production build for Netlify.

## Deployment (Netlify)
1. Connect the repository inside Netlify and set the build command to `npm run build` with publish directory `build/`.
2. Configure the same environment variables from `.env.local` within Netlify’s site settings.
3. Confirm `_redirects` and `netlify.toml` are picked up automatically for SPA routing.

Once deployed, capture the site URL (e.g., `https://queuesense-demo.netlify.app`) and update `REACT_APP_NETLIFY_SITE_URL` locally to keep the sidebar reference in sync.

## Screens & Mock Data
| Screen | Path | Description |
| --- | --- | --- |
| Login | `/` | Faux-auth form with loader, toast errors, and deployment badge. |
| Consumer Home | `/home` | Service cards with wait times, hero notifications, and CTA navigation. |
| Clinic | `/clinic` | Predictive wait, trend chart, heatmap, and “alert me” toggle. |
| DMV | `/dmv` | Appointment vs walk-in analysis and congestion meter. |
| Notifications | `/notifications` | Sliding smart notification stack. |
| Admin Dashboard | `/dashboard` | Overview metrics, chart, and insights (org-admin only). |
| System Diagram | `/system` | Data inputs → analytics engine → outputs visualization. |
| Settings | `/settings` | Org info, theme toggle, and logout control. |

Mocked data lives in `src/data/mockWaitTimes.ts` and can be swapped for updated narratives without touching presentation logic.

## Screenshots
Place exported page captures under `docs/screenshots/` (one per route). A helper checklist lives in `docs/screenshots/README.md` to keep quality consistent.

## Repo & Deliverables Checklist
- [x] React SPA with routing + mocked data
- [x] Env-driven credentials & org config
- [x] Netlify configuration (`netlify.toml`, `_redirects`)
- [x] Deployment-ready documentation

When you eventually deploy, update this README with the live Netlify link and attach the screenshot bundle for judges.
