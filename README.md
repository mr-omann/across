# Across Festival — Local Dev

```
cd /Users/otto/Documents/GitHub/ottomator/projects_ottomator/across && python3 -m http.server 8080
```

Then open **http://localhost:8080**

Stop with `Ctrl+C`.

## ⚠️ Versioning — mandatory on every push to main
Before **every** push to `main` (including branch merges), bump the version by 0.1 in the footer of all three pages:
- `index.html`
- `about.html`
- `artists.html`

Search for `v1.` in each file to find the line. All three must match. Never skip this.
