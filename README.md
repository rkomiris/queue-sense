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
| Campus | `/campus` | Student services orchestration, adoption stats, and lever spotlight. |
| Notifications | `/notifications` | Sliding smart notification stack. |
| Admin Dashboard | `/dashboard` | Overview metrics, chart, and insights (org-admin only). |
| System Diagram | `/system` | Data inputs → analytics engine → outputs visualization. |
| Settings | `/settings` | Org info, theme toggle, and logout control. |

Mocked data lives in `src/data/mockWaitTimes.ts` and can be swapped for updated narratives without touching presentation logic.

## Admin Analytics Deep Dive
The admin dashboard (`/dashboard`) evolved into a FinOps-style command center. Each visualization tells a specific operational ROI story:

### Profit Runway Modeling
- **What it shows**: Monthly baseline operating cost, optimized plan, modeled scenario, and capital investments.
- **Data source**: `profitTimeline` synthesizes a 12-month view with baseline, optimized, and per-month investment values.
- **How it works**: Admins toggle optimization levers; the scenario line recomputes savings vs. the optimized budget using lever ROI, location pressure, and queue state. The stacked chart uses layered gradients for clarity and thick dots to emphasize intercept points.
- **Why it matters**: Reveals payback arc for the current experimentation stack, making it obvious why a queue program deserves funding.

### Scenario Lever Panel
- **What it shows**: Toggle buttons representing available optimization plays (triage lanes, SMS pre-check, staffing rituals, etc.).
- **Data source**: `buildRoiPlans` converts each `optimizationLever` into a scenario-ready object with effort, cost, savings, and payback.
- **How it works**: Selecting a lever adjusts modeled cumulative savings/investment metrics and updates the scenario line above.

### Wait-Time Curve
- **What it shows**: Live 12-hour wait history per location (or aggregate) with gradient fill for variance recognition.
- **Data source**: `adminTrend` when no location is selected; location-specific curves when focused.
- **How it works**: Uses Recharts with gradients and tooltips to show granular wait data—useful to see how interventions change queue shape.

### Insight Cards
- **What they show**: Narrative highlights (“Peak at 11:15 AM”, “Engagement is sticky”) backed by the `adminInsights` array.
- **Purpose**: Provide context around the numbers, focusing on predictive wins and consumer engagement.

### Optimization ROI Grid
- **What it shows**: ROI cards for each lever with effort hours, investment, projected monthly lift, and payback window.
- **Data source**: `optimizationLevers` + location state (pressure, trend).
- **How it works**: The cards reuse the same scenario computations, exposing the math that feeds the profit runway.

### Initiative Attribution
- **What it shows**: A grid of savings contributions by initiative with owners and investment notes.
- **Data source**: `initiativeAttribution` entries mapping lever → savings/investment.
- **Why it matters**: Communicates cross-functional impact so stakeholders know who’s driving value.

### Location Benchmarks
- **What it shows**: Table comparing cost per visit, throughput, and automation for each location (filtered by vertical for admins).
- **Data source**: `locationBenchmarks`.
- **Purpose**: Gives leaders a league-table view of performance to prioritize investment or celebrate wins.

All charts are powered by Recharts with custom gradients, drop shadows, and accessible tooltips. Every metric feeds from deterministic data pipelines wired up for this environment.

## Screenshots
Place exported page captures under `docs/screenshots/` (one per route). A helper checklist lives in `docs/screenshots/README.md` to keep quality consistent.

## Repo & Deliverables Checklist
- [x] React SPA with routing + mocked data
- [x] Env-driven credentials & org config
- [x] Netlify configuration (`netlify.toml`, `_redirects`)
- [x] Deployment-ready documentation

When you eventually deploy, update this README with the live Netlify link and attach the screenshot bundle for judges.
