# Repository Guidelines

## Project Structure & Module Organization

This is a private Next.js 15 app for the Pack-It-Up Self Storage site. App Router routes live in `app/`, including pages such as `app/contact/page.tsx`, API handlers such as `app/api/contact/route.ts`, and metadata helpers like `app/sitemap.ts`.

Reusable UI is organized under `components/`: layout in `components/layout/`, page sections in `components/sections/`, forms in `components/forms/`, SEO helpers in `components/seo/`, and primitives in `components/ui/`. Shared utilities and configuration live in `lib/`. Static images belong in `public/images/`.

## Build, Test, and Development Commands

- `npm run dev` starts the local Next.js development server.
- `npm run dev:clean` removes cached build artifacts before starting development.
- `npm run build` creates a production build and catches many deployment issues.
- `npm run start` serves the production build after `npm run build`.
- `npm run lint` runs ESLint across the project.
- `npm run typecheck` runs TypeScript with `--noEmit`.
- `npm run clean` deletes `.next` and `tsconfig.tsbuildinfo`.

## Coding Style & Naming Conventions

Use TypeScript and React function components. Follow `PascalCase` for components, such as `HeroSection.tsx`, and `camelCase` for functions, variables, and utility exports. Prefer the `@/*` path alias from `tsconfig.json`.

Styling is Tailwind CSS-first, with shared class composition handled through `lib/utils.ts`. Keep page sections focused and reusable.

## Testing Guidelines

No dedicated test framework is currently configured. For changes, run `npm run lint`, `npm run typecheck`, and preferably `npm run build` before opening a pull request. If tests are added later, place them near the code they cover and use names like `ContactForm.test.tsx`.

## Commit & Pull Request Guidelines

The current Git history uses short, imperative commit messages such as `Fix vercel error` and `Add placeholder images`. Keep commits focused and describe the user-visible or deployment impact.

Pull requests should include a concise summary, screenshots for visual changes, notes about environment variables or configuration changes, and verification results for linting, type checking, and builds. Link related issues or deployment errors when applicable.

## Security & Configuration Tips

Use `.env.example` to document required environment variables. Keep real secrets in `.env.local` or the deployment platform, and never commit credentials, SMTP passwords, analytics keys, or customer-specific private data.
