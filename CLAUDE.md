# Across Festival Website

Static HTML site for the Across Festival (acrossfestival.com).

## Deployment
- **Source:** This repo (`mr-omann/across` on GitHub)
- **Host:** Cloudflare Workers (static assets) — **not** Pages, does not auto-deploy on push
- **Domain:** `acrossfestival.com` — DNS managed by Kaya Kato Møller on simply.com (ns1/2/3.simply.com)
- **Preview URL:** https://across.ottooemann.workers.dev

## Structure
Pure static HTML — no build step, no framework. Files are served directly from the repo root.
- `index.html` — homepage
- `about.html` — about page
- `artists.html` — artists page
- `images/` — all photos and logos
- `videos/` — hero video and other video assets
- `Rundeck.otf/.ttf` — custom festival typeface

## History
Previously lived as a sub-folder (`/novo/`) of the `omann.org` repo. Extracted into its own repo in April 2026 when the site went live on its own domain. The `omann.org` site (otto@omann.org) is a separate Astro project.

## To make changes
1. Edit files locally and commit/push to `main` as usual
2. **Then manually deploy:** `npx wrangler deploy`
   - Requires a Cloudflare API token with Workers:Edit permission in `CLOUDFLARE_API_TOKEN`
   - `wrangler.toml` is configured to serve the repo root as static assets
   - `.assetsignore` excludes `.git/`, `.wrangler/`, `.claude/`, and config files from being uploaded as public assets
   - GitHub pushes alone do **not** update the live site — `wrangler deploy` must be run each time
