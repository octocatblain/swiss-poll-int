# swiss-poll-int

Next.js website for Swiss Poll International — UI skeleton, components and static pages.

This repository contains the frontend for a polling / market research site built with Next.js and Tailwind CSS. The site currently provides static content, layout and UI components. The project needs a backend and a set of integrations to become a fully functional product (see docs/what-to-add.md).

## Quick start

Prerequisites

- Node.js 18+ (recommended)
- pnpm (recommended) or npm/yarn

Install dependencies

```bash
pnpm install
# or
npm install
```

Run the development server

```bash
pnpm dev
# or
npm run dev
```

Build for production

```bash
pnpm build
pnpm start
```

Available scripts (from package.json)

- dev: next dev
- build: next build
- start: next start
- lint: next lint

## Project structure (important folders)

- `app/` - Next.js app routes and pages (server / client components)
- `components/` - Shared UI components (header/footer, ui primitives)
- `hooks/` - Custom React hooks
- `lib/` - Utilities
- `public/` - Static assets (images)
- `styles/` - Global CSS / Tailwind

## Environment variables

This repo currently runs as a static frontend. When connecting to a backend or adding server functionality, create a `.env.local` file with values similar to the example below:

```bash
# Example .env.local (do NOT commit secrets)
NEXT_PUBLIC_API_URL=https://api.example.com
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_long_random_secret
DATABASE_URL=postgresql://user:pass@localhost:5432/swisspoll
SMTP_URL=smtps://user:pass@smtp.example.com:465
S3_BUCKET=your-bucket
S3_REGION=eu-central-1
S3_ACCESS_KEY_ID=AKIA...
S3_SECRET_ACCESS_KEY=...
REDIS_URL=redis://localhost:6379
ANALYTICS_ID=G-XXXXXXXXXX
```

Refer to `docs/what-to-add.md` for the full list of required environment variables and descriptions.

## What still needs to be done

This repo contains a design and components only. For a production-ready site you'll need a backend (APIs, database, auth), integrations (email, storage), and production deployment. See `docs/what-to-add.md` for a prioritized, detailed checklist and suggested architecture.

## Contributing

If you'd like to help implement the remaining work, please open issues or pull requests. Start by cloning the repo, running the dev server, and following the tasks in `docs/what-to-add.md`.

## License

Add a license file if you plan on publishing or sharing the project.

# swiss-poll-int
