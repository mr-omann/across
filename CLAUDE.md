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

## ⚠️ VERSIONING — MANDATORY BEFORE EVERY PUSH TO MAIN ⚠️

**This step is not optional. Do not push to `main` without doing this first.**

Every push to `main` — no exceptions, including merges from feature branches — must bump the version number by 0.1 in the footer of ALL three pages:

- `index.html` — search for `v1.` and increment
- `about.html` — search for `v1.` and increment
- `artists.html` — search for `v1.` and increment

The version appears as a faint `<p>` tag just below the copyright line in each footer. Increment by 0.1 (v1.2 → v1.3 → v1.4, etc.). All three files must show the same version number.
