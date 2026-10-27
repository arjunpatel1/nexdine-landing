# Website contact email

The marketing site is a static Next.js export. Its contact form posts to `/api/contact` on the same origin. PHP files in this directory belong in a **private** server directory outside the static document root, not in `public` or the export.

The isolated nginx location executes `contact.php` through the existing PHP 8.4 FPM socket and supplies `NEXDINE_BACKEND_ROOT=/var/www/nexdine-api`. The loader bootstraps the existing Laravel mail/cache configuration; mail credentials never enter the JavaScript build. No tenant application routes or subscription prices are changed.

Recipient is fixed server-side as `info@myteknoland.com`; the visitor's email is Reply-To. Trusted website origins, JSON/body/field limits, a honeypot, IP/global rate limits and a per-submission lock protect the endpoint. Successful duplicate submissions are suppressed for ten minutes. Development log/array mailers do not return success. Provider errors produce a failure response and preserve the form for retry.

The backend PHPUnit environment runs `server/tests/ContactEndpointTest.php` with `Mail::fake`; no email is sent by those tests. A live explicitly labelled verification enquiry was submitted once to the requested inbox during deployment. A successful provider hand-off does not independently confirm inbox placement.

Deployment preserves the old static release and backs up the website-only nginx configuration. Nginx config is hash-guarded and syntax-tested before reload. Keep the contact script and its dependencies private/read-only for the FPM user. Do not expose a generic PHP handler for the static export or put MSG91/mail keys in `NEXT_PUBLIC_*` variables.

## Verified publication — 27 October 2026

Published at `https://myteknoland.in/`: Starter Free, Professional ₹580/month, email `info@myteknoland.com`, call/WhatsApp `+91-9182378253`. Updated contact cards/links, pricing/chat/related article copy and structured-data prices. The static build passed type/lint checks; five isolated mail tests passed (24 assertions). Live Chrome checks passed at desktop and 320/390px mobile widths, including mocked form success/failure with no browser errors. Wrong-origin/invalid live submissions returned 403/422 without sending mail.

One explicitly labelled verification enquiry returned HTTP 200/ok from the real email handler. Inbox placement is not independently verified. Original static release is retained at `/var/www/myteknoland-in/releases/site-20261005`; website nginx backup is `/var/backups/myteknoland-20261027-075040`. Final release is `/var/www/myteknoland-in/releases/site-pricing-final-20261027-075958`. Main API routes, other tenant hosts and subscription billing data were not deployed or modified. Private verification artifacts are under workspace `.local/marketing-deploy`.
