# Across Festival Website

Static HTML site for the Across Festival (acrossfestival.com).

## Deployment
- **Source:** This repo (`mr-omann/across` on GitHub)
- **Host:** Cloudflare Pages — auto-deploys on every push to `main`
- **Domain:** `acrossfestival.com` — DNS managed by Cloudflare (nameservers: ignacio/shubhi.ns.cloudflare.com)
- **Pages URL:** https://across-d4e.pages.dev

## Current mode: inter-season (since Nov 2026)
Between festivals, `main` serves a single page: `index.html` (English, "Sticky Year" timeline of all seasons + email sign-up).
- **2026 festival site is archived on the `festival-2026` branch** (DA/EN index, about, artists pages, last version DA v2.4 / EN v2.1). Next year: branch from it, update content, merge to `main`, delete `_redirects` and `images/interseason/` if unused.
- `_redirects` sends the old page URLs to `/` with 302s (not 301, so browsers don't cache them past next year).
- `functions/api/subscribe.js` — Cloudflare Pages Function that stores sign-up emails in the KV namespace bound as `SUBSCRIBERS` (key = email, metadata = sign-up time). It never sends mail. KV namespace `across-subscribers`, id `39412a350f5b4c17b451d6c900c576f8`, bound to **production only** via the Pages project settings (not a wrangler.toml), so preview deploys return 503 and stay out of the list. Export with `npx wrangler kv key list --namespace-id 39412a350f5b4c17b451d6c900c576f8 --remote`.

## Structure
Pure static HTML — no build step, no framework. Files are served directly from the repo root.
- `index.html` — the only page during the inter-season
- `functions/` — Cloudflare Pages Functions (`/api/subscribe`)
- `images/interseason/` — web-sized photos used by the inter-season page
- `images/` — all photos and logos
- `videos/` — hero video and other video assets
- `Rundeck.otf/.ttf` — custom festival typeface

## History
Previously lived as a sub-folder (`/novo/`) of the `omann.org` repo. Extracted into its own repo in April 2026 when the site went live on its own domain. The `omann.org` site (otto@omann.org) is a separate Astro project.

The header font was originally the browser default serif before being replaced with the custom Rundeck typeface (`Rundeck.otf/.ttf`).

## To make changes
Edit files locally, commit, push to `main` — Cloudflare Pages deploys automatically within ~60 seconds.

## ⚠️ VERSIONING — MANDATORY BEFORE EVERY PUSH TO MAIN ⚠️

**This step is not optional. Do not push to `main` without doing this first.**

Every push to `main` — no exceptions, including merges from feature branches — must bump the version number by 0.1 in the footer of every HTML page on `main`.

During the inter-season that is only `index.html` — search for `class="ver"` and increment (v2.6 → v2.7, etc.). When the festival pages come back, every page's footer must show the same version number.

The version appears as a faint `<p>` tag just below the copyright line in each footer.
