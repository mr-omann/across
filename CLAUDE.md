# Across Festival Website

Static HTML site for the Across Festival (acrossfestival.com).

## Deployment
- **Source:** This repo (`mr-omann/across` on GitHub)
- **Host:** Cloudflare Pages — auto-deploys on every push to `main`
- **Domain:** `acrossfestival.com` — DNS managed by Cloudflare (nameservers: ignacio/shubhi.ns.cloudflare.com)
- **Pages URL:** https://across-d4e.pages.dev

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

The header font was originally the browser default serif before being replaced with the custom Rundeck typeface (`Rundeck.otf/.ttf`).

## To make changes
Edit files locally, commit, push to `main` — Cloudflare Pages deploys automatically within ~60 seconds.

## Versioning — REQUIRED on every push to main
The footer in **both `index.html` and `about.html`** contains a version number (`v1.1`, `v1.2`, etc.).
**Before every commit that will be pushed to `main`, increment the version by 0.1 in both files.**
Search for `v1.` in both files to find the lines. Never skip this step.
