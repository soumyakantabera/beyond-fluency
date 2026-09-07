# Beyond Fluency Lab

30 routes, including seven original articles, four courses, four audience pages, the diagnostic, legal pages and a downloadable brand kit. Marketing pages are pre-rendered HTML served from the asset binding; form endpoints use a D1 database. The site is published privately for review.

## What works

- Seven-question diagnostic: six scored scenarios and one upcoming-situation question. Three named dimensions, deterministic tie handling and one course recommendation.
- Results appear without an email. Native share or clipboard fallback shares only the named dimension.
- Report and trial requests are saved in D1. Origin checks, input validation, prepared statements, consent records and short-interval duplicate control are implemented. No public endpoint exposes the lead table.
- Requested report email uses Resend when RESEND_API_KEY and EMAIL_FROM are configured as hosted environment secrets. Never commit secrets. Pending or failed email is reported honestly; no “sent” message is shown unless the provider accepts the message.
- UTM query parameters are preserved through internal navigation and saved only with a submitted request.
- No analytics pixels, application cookies, local-storage lead records or fabricated completion statistics.
- Exact university-affiliation answer on every FAQ surface; no rating schema.

## Required operating details

1. Supply and verify the legal entity, registered address, registration number, VAT treatment, controller contact, EU representative as applicable, actual processor arrangements and transfer safeguards.
2. Confirm cohort dates, session duration/frequency, cancellation/rescheduling terms, refund process and total payable fees before taking payment.
3. Connect a verified email sender through hosted RESEND_API_KEY and EMAIL_FROM to send new diagnostic reports. Existing pending reports require operator handling; this build does not claim to dispatch them automatically after configuration.
4. Establish an operator workflow for reviewing saved trial requests and arranging appointments. A trial submission is an enquiry, not a calendar booking.
5. Finalise retention periods and a deletion procedure. The Privacy Policy accurately identifies these as pending.
6. The attachment’s optional nurture sequence and newsletter are not activated. The current form consent is request-only and must not be treated as permission for marketing. No fake deadline or time-bounded discount has been invented.
7. Complete a cookie audit and legal review, then make a deliberate public-launch/access decision. Private access prevents search and AI crawlers despite allow rules. Update canonical origin, sitemap and llms.txt if a custom domain is connected.

## Evidence and assets

Parent academy history and counts are supplied in the brief and corroborated as self-reported on https://www.learnwithsmile.app/. India testimonial excerpts are attributed to its published stories; no European claims or ratings are made.

The report chart is conceptual. The 25–30 batch comparison is explicitly hypothetical. Thirty available individual-speaking minutes divided by 6, 25 or 30 yields 5, 1.2 or 1 minute per learner. This is not a measured competitor average or an outcome multiplier. The CEFR and British Council sources are linked inline.

Brand sources and built-in generated imagery live in public/assets. The downloadable ZIP contains editable SVG logo, favicon, card and letterhead, printable editable HTML letterhead, three 1200×630 social cards and the style guide. People are fictional AI-generated editorial scenes, not real trainers or learners.

## Validation

Run the existing build command to generate the Worker, all static HTML and migration package. It fails if the expected 31 HTML files (30 routes plus 404) are absent.

- node scripts/verify.mjs: all 2,187 diagnostic combinations and actual local D1 inserts through the form handler, plus invalid/duplicate/origin/consent cases. No test emails are sent.
- python scripts/verify-pages.py: all pages, headings, local links and assets, metadata, canonical URLs, exact FAQ answer, legal placeholders and no rating schema.
- node scripts/verify-delivery.mjs: pre-rendered HTML delivery for all routes, UTM-preserving canonical redirects, HEAD behavior.
- TypeScript check with generated Cloudflare runtime types.

Browser interaction testing was not requested and was not performed.


## Identity II redesign

The revised source adds self-hosted Bodoni Moda and Manrope fonts, a custom Beyond monogram, 27 original line icons, eight new original editorial photographs (14 total), at least two distinct editorial images on every marketing route, layered image compositions, image-led programme grids, and a three-chapter manual story carousel on Home and About. Entry reveals, photographic scaling and monogram drawing respect reduced-motion preferences. A motion control stores only a device-local preference.

The imagery never represents actual premises or historical documentary records. The source history remains the supplied and attributed seven-year Learn With Smile record. Original pricing, course mapping, diagnostic scoring, lead capture, FAQ wording and legal placeholders are preserved.

The new print kit includes front/back business cards, outlined SVG logos, favicon, original icon SVGs, A4 letterhead, and the updated social cards. Run scripts/brand-redesign.py to regenerate vector/print assets and the ZIP. Font downloads and SIL licences are tracked alongside the site.

This revision is prepared and saved without changing the existing published version until publishing is requested.


## Final international identity and Vercel release
Emerald and antique-gold accents replace wine. International professional imagery leads; Kolkata illustration is used only on About. Vercel uses native Next.js with an HTTPS libSQL adapter. Public form submission is disabled until TURSO_DATABASE_URL and TURSO_AUTH_TOKEN are configured; Resend also requires a verified sender. The diagnostic remains usable without either integration. User requested GitHub publication and Vercel deployment on 7 September 2026.
