# Across Festival Website

Static HTML site for the Across Festival (acrossfestival.com).

## Deployment
- **Source:** This repo (`mr-omann/across` on GitHub)
- **Host:** Cloudflare Pages — auto-deploys on every push to `main`
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
Edit files locally, commit, push to `main` — Cloudflare deploys automatically within ~30 seconds.
