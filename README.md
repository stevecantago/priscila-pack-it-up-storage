# Pack-It-Up Self Storage

Custom SEO-ready website for Pack-It-Up Self Storage / Kings Mountain Self Storage, built for Priscila Moore and All States Equity Group. The site provides the branded customer-facing experience, while the embedded Storable Online Rental App handles secure rental operations.

## Architecture Overview

The project follows a clear responsibility split:

- The custom website controls branding, local SEO, marketing content, facility messaging, images, calls to action, analytics, and fallback lead capture.
- Storable controls the rental transaction, including unit selection, move-in workflow, payment validation, lease signing, insurance selection, tenant setup, and facility-system updates.

Customer flow:

1. A visitor lands on the Next.js website.
2. Static pages and sections explain the facility, unit sizes, FAQs, location, and trust signals.
3. CTAs send the visitor to the “Move in online” section.
4. `components/storable/StorableRentalApp.tsx` loads Storable’s `<rental-app>` web component in the browser.
5. Storable completes the operational rental workflow.

## Technology Stack

- Next.js, React, and TypeScript for the SEO-ready frontend.
- Tailwind CSS and shadcn/ui-style primitives for responsive UI.
- Next.js Metadata API, sitemap, robots, and JSON-LD helpers for local SEO.
- Next.js API route contact handling for fallback lead capture.
- Storable Online Rental App for reservations and move-ins.
- Vercel-ready deployment workflow.

## Project Structure

- `app/` - App Router pages, API routes, sitemap, robots, and global styles.
- `components/layout/` - Header, footer, and mobile sticky CTA.
- `components/sections/` - Homepage sections, facility details, map, rental app, FAQs, and unit previews.
- `components/forms/` - Contact form UI.
- `components/storable/` - Browser-only Storable rental app embed.
- `components/ui/` - Shared UI primitives.
- `lib/` - Site configuration, SEO helpers, analytics helpers, and utilities.
- `public/images/` - Static facility images and placeholder assets.

## Development

```bash
npm install
npm run dev
```

Useful scripts:

- `npm run dev` - Start local development.
- `npm run dev:clean` - Remove `.next` and `tsconfig.tsbuildinfo`, then start development.
- `npm run build` - Create a production build.
- `npm run start` - Serve the production build locally.
- `npm run lint` - Run ESLint.
- `npm run typecheck` - Run TypeScript checks with no emit.
- `npm run clean` - Remove generated build artifacts.

## Configuration

Use `.env.example` as the template for both local development and deployment environments.
For day-to-day work, copy it to `.env.local` and keep that file aligned with the environment you
want to test locally.

### Local Development

Use the local `.env.local` file as the source of truth for local testing. It may point at a
different Storable environment than production:

```bash
NEXT_PUBLIC_STORABLE_ENV_URL=https://webapps.devable.io
NEXT_PUBLIC_STORABLE_PROVIDER_ID=[DEV_OR_PROD_PROVIDER_ID]
NEXT_PUBLIC_STORABLE_ORGANIZATION_ID=[DEV_OR_PROD_ORGANIZATION_ID]
NEXT_PUBLIC_STORABLE_FACILITY_ID=[DEV_OR_PROD_FACILITY_ID]
NEXT_PUBLIC_STORABLE_SOURCE=website
NEXT_PUBLIC_STORABLE_ACCESS_KEY=[DEV_OR_PROD_STORABLE_ACCESS_KEY]
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_GA4_ID=[GA4_MEASUREMENT_ID]
GOOGLE_PLACES_API_KEY=[GOOGLE_PLACES_API_KEY]
GOOGLE_PLACE_ID=[GOOGLE_PLACE_ID]
CONTACT_TO_EMAIL=[CONTACT_TO_EMAIL]
SMTP_HOST=[SMTP_HOST]
SMTP_PORT=[SMTP_PORT]
SMTP_USER=[SMTP_USERNAME]
SMTP_PASS=[SMTP_PASSWORD_OR_APP_PASSWORD]
SMTP_FROM=[FROM_EMAIL_ADDRESS]
```

### Environment Mapping

Set `NEXT_PUBLIC_STORABLE_ENV_URL` per environment:

| Environment | URL |
| --- | --- |
| Development | `https://webapps.devable.io` |
| Staging | `https://webapps.stageable.io` |
| Production | `https://webapps.storable.io` |

Set the remaining values in each deployment target as needed, and keep the allowlisted origin
aligned with the live domain:

- `NEXT_PUBLIC_STORABLE_ENV_URL`
- `NEXT_PUBLIC_STORABLE_PROVIDER_ID`
- `NEXT_PUBLIC_STORABLE_ORGANIZATION_ID`
- `NEXT_PUBLIC_STORABLE_FACILITY_ID`
- `NEXT_PUBLIC_STORABLE_SOURCE`
- `NEXT_PUBLIC_STORABLE_ACCESS_KEY`
- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_GA4_ID`
- `GOOGLE_PLACES_API_KEY`
- `GOOGLE_PLACE_ID`
- `CONTACT_TO_EMAIL`
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASS`
- `SMTP_FROM`

Any `NEXT_PUBLIC_*` value is visible in the browser. Confirm with Storable that the access key is intended for public embed usage and whether allowed-origin controls are available.

When adding or updating an environment, mirror the values already present in the local `.env.local`
file unless you are intentionally changing the deployment target or provider settings.

If Storable gave you an API Access Secret, store it in a server-only variable such as
`STORABLE_API_ACCESS_SECRET` in `.env.local` and in your deployment platform. Do not place that
secret in any `NEXT_PUBLIC_*` variable, because those values are exposed to the browser.

### Current Production Gap

The last Vercel production env pull returned empty values for the app-specific variables above,
so production must be populated manually in Vercel before the live site can authenticate with
Storable and send contact emails reliably.

## Site Content and Assets

Site-wide content is managed in `lib/site-config.ts`, including address, phone, hours, Google Maps links, image paths, amenities, unit previews, local SEO copy, FAQs, and analytics event names.

Current notable assets and integrations:

- Facility corridor imagery uses `public/images/facility-1.jpg`.
- Google Maps cards use the configured directions and embed URLs in `lib/site-config.ts`.
- The “Move in online” section uses a blue background and embeds the Storable rental workflow when required environment variables are present.

## SEO and Analytics

The embedded rental app is not the only meaningful page content. Keep crawlable content outside Storable, including local facility copy, unit-size guidance, FAQs, NAP details, metadata, sitemap, robots, image alt text, and JSON-LD.

Tracked site events are defined in `lib/site-config.ts` and include homepage views, unit CTA clicks, rental app section views, phone clicks, contact form submissions, and directions clicks. If Storable does not expose internal funnel events, compare website entry events with completed rentals from Storable reporting.

## Verification and QA

Run before committing or deploying:

```bash
npm run lint
npm run typecheck
npm run build
```

No dedicated automated test suite is currently configured. Manual QA should confirm mobile and desktop layout, CTA links, phone links, contact form delivery, map links, image loading, metadata, `/sitemap.xml`, `/robots.txt`, JSON-LD, and Storable rental app loading with the correct facility.

## Go-Live Checklist

- Confirm Storable provider ID, organization ID, facility ID, source, and access key.
- Confirm online rental, payment, lease, insurance, tenant confirmation, and access workflow settings in Storable.
- Confirm address, phone, hours, brand colors, logo, and facility photos.
- Configure production domain, SSL, analytics, and contact form recipient.
- Test the full rental flow on mobile and desktop before launch.
