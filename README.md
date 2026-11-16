# Across Festival — Local Dev

```
cd /Users/otto/Documents/GitHub/ottomator/projects_ottomator/across && python3 -m http.server 8080
```

Then open **http://localhost:8080**

Stop with `Ctrl+C`.

The `/api/subscribe` function doesn't run under `python3 -m http.server`. To test it locally use `npx wrangler pages dev .`

## ⚠️ Versioning — mandatory on every push to main
Before **every** push to `main` (including branch merges), bump the version by 0.1 in the footer of every page. During the inter-season that is only `index.html` (search for `class="ver"`). Never skip this.

## Inter-season
- The 2026 festival site is saved on the `festival-2026` branch.
- Sign-up emails are stored in Cloudflare KV (binding `SUBSCRIBERS`). Export them:
  ```
  npx wrangler kv key list --namespace-id <id> --remote > subscribers.json
  ```
  Each entry has `name` (the email) and `metadata.signedUp`. Don't commit the export.
