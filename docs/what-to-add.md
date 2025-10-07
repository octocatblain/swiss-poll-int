# What to add to make the site fully functional

This document lists required frontend and backend work, integrations, deployment notes, and a recommended prioritized implementation plan to turn this Next.js UI skeleton into a production-ready polling / market research site.

Use this as a checklist when developing features or onboarding collaborators.

---

## Goals / Success criteria

- Users can view polls and reports, and authenticated clients can create and manage polls and see results.
- Poll responses are stored reliably and aggregated for analytics and reporting.
- The site is secure, performant, and deployed to a reliable platform.

---

## High-level architecture (recommended)

- Frontend: Next.js (the current repo) with React 19, Tailwind CSS for styling. Use Next.js App Router with server components for public pages and client components for interactive parts.
- Backend: Node.js (NestJS or Express) or Next.js API routes (if preferred) exposing REST or GraphQL endpoints.
- Database: PostgreSQL (primary), Redis (caching & job queue), and optional analytics DB (ClickHouse) for heavy analytical queries.
- Auth: NextAuth.js (OAuth + email), or a hosted Auth provider (Auth0, Clerk) for faster time-to-market.
- Storage: S3-compatible storage (AWS S3, DigitalOcean Spaces) for uploaded assets and report exports.
- Background jobs: BullMQ (Redis) or a serverless job system for email delivery, report generation, and heavy aggregation.
- Observability: Sentry for error tracking, Prometheus/Grafana or Datadog for metrics.

---

## Required environment variables

- NEXT_PUBLIC_API_URL — public API base URL used by the frontend.
- NEXTAUTH_URL — URL for NextAuth callbacks.
- NEXTAUTH_SECRET — secret for NextAuth session signing.
- DATABASE_URL — Postgres connection string.
- REDIS_URL — Redis connection string for caches and queues.
- SMTP_URL — SMTP connection for notifications and invites.
- S3_BUCKET, S3_REGION, S3_ACCESS_KEY_ID, S3_SECRET_ACCESS_KEY — for file storage.
- ANALYTICS_ID — external analytics ID (Google, Matomo, etc.)

Store secrets in secrets manager for production (AWS Secrets Manager, GitHub Actions secrets, or Vercel environment variables).

---

## Frontend: tasks and details

1. API integration layer

- Implement a typed API client (fetch wrappers or use react-query / SWR / TanStack Query) that calls the backend endpoints for polls, responses, reports, auth, and media.
- Add error handling, exponential backoff and retries for transient failures.

2. Auth flows

- Implement sign up / sign in pages using NextAuth.js (or chosen provider). Support email/password + magic link OR OAuth providers.
- Protect pages/routes that require authentication (dashboard, create poll, results) with server-side checks or middleware.

3. Poll creation & administration UI

- Build forms to create polls: question types (single choice, multiple choice, rating, text), target audience filters, scheduling, quotas.
- Use react-hook-form + zod for validation (already present in deps).
- Add preview and testing of polls.

4. Poll taking UX

- Create client-facing poll pages with accessibility, keyboard navigation, and mobile-first design.
- Support progress indicators, save-in-progress (localStorage or backend), and anti-fraud (rate limiting, one response per user/ip/cookie).

5. Response storage and offline handling

- For unreliable networks, implement optimistic updates and queue responses locally until successful submission.

6. Results & reporting

- Interactive charts (recharts is already a dependency). Build dashboards for polls with filters and export options (CSV, PDF).

7. Internationalization (i18n)

- If the site targets multiple languages, add i18n support (next-intl or next-translate) and store localized text in the DB or translation files.

8. Accessibility & SEO

- Use semantic html, aria attributes, and run Lighthouse audits.
- Add meta tags, OpenGraph, and structured data for public pages.

9. Forms, validation and spam protection

- Integrate server-side validation, rate limiting, and optional CAPTCHA on public forms.

10. Analytics & tracking

- Add event tracking for poll impressions, starts, completes, and conversions. Respect cookie consent and privacy rules.

11. Environment-aware builds

- Use NEXT*PUBLIC* variables for frontend config, and ensure production builds use production API endpoints.

12. Tests

- Unit tests for critical components, integration tests for forms, and end-to-end tests (Playwright/Cypress) for core flows: create poll, take poll, view results.

---

## Backend: tasks and details

1. API design

- Endpoints:
  - POST /api/auth/\* (or use NextAuth)
  - GET /api/polls
  - GET /api/polls/:id
  - POST /api/polls (auth required)
  - PATCH /api/polls/:id (auth+permissions)
  - POST /api/polls/:id/responses
  - GET /api/polls/:id/results
  - GET /api/reports/export
  - Webhooks for third-party integrations

2. Database schema

- Tables: users, polls, questions, options, responses, response_items, organizations, projects, api_keys, audit_logs.
- Store aggregated snapshots for heavy reporting queries (daily_rollups table).

3. Authentication & authorization

- Implement user accounts, organizations/teams, roles (admin, editor, viewer) and scope-based permissions for polls and datasets.

4. Rate limiting & abuse prevention

- Add API rate limiting (per IP / per API key) and response deduplication. Consider a server-side CAPTCHA fallback.

5. Storage & media

- Signed URLs for S3 uploads and optimized image serving (thumbs, WebP). Implement secure export storage for generated reports.

6. Background jobs

- Use Redis + BullMQ for email delivery, async report generation, and heavy aggregations. Schedule periodic aggregation jobs.

7. Webhooks & integrations

- Integrate with email providers (SendGrid, SES), analytics, Slack or webhook receivers for alerts.

8. Exporting & reporting

- Create CSV and PDF exports of poll responses, with pagination and background generation for large exports.

9. Observability & monitoring

- Add structured logs, request tracing, and error reporting. Track key metrics (polls created, responses/day, latency, errors).

10. Tests & CI

- Unit tests for services and DB layer, integration tests for API endpoints, and E2E tests that exercise the full stack. Add CI pipelines (GitHub Actions) to run tests and lint.

---

## Deployment recommendations

- Host frontend on Vercel or a static host (Netlify, Cloudflare Pages) connected to the repository for easy deploys.
- Host backend on a managed Node platform (Render, Fly.io, Heroku, AWS Elastic Beanstalk) or containerize and run on Kubernetes/ECS.
- Use managed Postgres (Supabase, RDS, Neon) and Redis (Upstash, ElastiCache, Redis Cloud).
- Configure HTTPS, CORS, and security headers.

---

## Security & compliance

- Use HTTPS everywhere and HSTS in production.
- Encrypt sensitive data at rest and in transit.
- Ensure proper access controls for data exports.
- Provide a privacy policy and cookie consent flow (there is a `privacy-policy` route already).

---

## Minimal MVP implementation (priority list)

1. API + Postgres: implement polls, responses, users (skeleton) + migrations.
2. Authentication: NextAuth or hosted provider for admin and user accounts.
3. Frontend API client + login flow + poll creation UI and public poll-taking flow.
4. Response collection & simple results page with charts.
5. Basic exports (CSV) and background jobs for larger exports.
6. Deployment pipeline and environment variable management.

---

## Example developer workflow for the MVP

1. Clone repo and run frontend locally.
2. Start a local Postgres and Redis (docker-compose recommended).
3. Boot the backend server and create initial migrations.
4. Configure `.env.local` in frontend to point to local API.
5. Implement API endpoints and wire them into frontend using a typed client.
6. Run tests and fix issues; iterate until core flows pass end-to-end tests.

---

## Useful libraries / starters

- Backend: NestJS, Prisma (ORM), TypeORM or Sequelize. Use Zod for schema validation.
- Jobs: BullMQ + IORedis.
- Storage: aws-sdk v3 or @aws-sdk/client-s3.
- Auth: NextAuth.js or Clerk.
- CI: GitHub Actions; CD: Vercel for frontend, Render/Fly for backend.

---

If you want, I can scaffold a minimal backend (Prisma schema + simple Express/Nest endpoints) and wire up the frontend API client so you can run an end-to-end demo locally. Tell me which backend stack you prefer and I'll create the initial artifacts.
