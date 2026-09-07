# Beyond Fluency Lab

An independent English-communication coaching brand for fluent speakers in Europe, from Learn With Smile in Kolkata, India. Thirty marketing pages, seven-question Plateau Diagnostic, original editorial photography, custom identity and accessible motion.

## Run and deploy

Node 22 or later. `npm ci`, then `npm run dev:vercel` for Next.js. Set `NEXT_PUBLIC_SITE_URL` to the verified HTTPS production origin. `npm run build:vercel` builds the Vercel application; `vercel.json` selects this command automatically. Canonical metadata, sitemap and robots use the configured production origin. Vercel's production-domain environment value is used when no explicit origin is set.

The Sites review build remains available with `npm run build`. Its managed D1 binding is separate from the public Vercel deployment. The existing `.openai/hosting.json` identifies that review site; do not reuse its ID for another project.

## Enable trial and report requests on Vercel

The diagnostic and course recommendations work without a database or email account. Form submission is disabled when lead storage is not connected; no success message is fabricated.

1. Provision a Turso libSQL database and apply the SQL migration under `drizzle/`.
2. Add `TURSO_DATABASE_URL` and `TURSO_AUTH_TOKEN` as Vercel environment secrets. Redeploy.
3. Verify a sending domain in Resend. Add `RESEND_API_KEY` and `EMAIL_FROM` to send requested personalised reports. Redeploy.
4. Test a real request, database entry and report delivery before opening booking.

`lib/server-db.vercel.ts` implements parameterised SQL over HTTPS using Turso's documented v2 pipeline. `scripts/prepare-vercel.mjs` selects this adapter before the Vercel build. The separate Sites build uses its existing Cloudflare D1 adapter. No database is stored on a serverless filesystem. Mail is only marked sent after Resend accepts it. Never commit environment secrets or learner data.

## Before paid enrolment

Visible legal identity, VAT, retention, privacy contact and session-scheduling placeholders must be completed by the operator. No payment checkout is enabled. Do not invent partnerships, reviews or European outcomes. Source testimonials remain attributed to the original India programmes.

## Brand

Bodoni Moda and Manrope, emerald, warm stone and restrained gold. Original 27-icon family. All photographs depict fictional people and places; the Kolkata-inspired courtyard is confined to About. Editable and print-ready assets are at `/brand-kit`.

## Verification

`node node_modules/typescript/bin/tsc --noEmit --incremental false` checks types. `python scripts/verify-pages.py` checks the pre-rendered Sites pages, including links, SEO, schema, exact affiliation FAQ and two distinct editorial photos per page. Vercel's Next build statically generates the same marketing routes.
