# ACROSS website: what to do next year

Written November 2026, right after the 2026 festival, for whoever picks this up in 2027 (probably Otto, who will have forgotten all of it).

There are three jobs, roughly in this order:

1. **Get the email list** of people who signed up on the website.
2. **Bring back the full festival site** when the 2027 program is ready.
3. **After the 2027 festival**, switch back to the inter-season page and add 2027 to it.

If you're using Claude Code or opencode, you can open this repo and say "follow NEXT-YEAR.md, step X". Everything below is written so an agent can do it.

---

## How things are set up right now

| What | Where |
|---|---|
| Live website | https://acrossfestival.com (also https://across-d4e.pages.dev) |
| Code | GitHub repo `mr-omann/across`. **Public**, so never commit the email list. |
| Hosting | Cloudflare Pages, project name `across`, on Otto's personal Cloudflare account (the one the acrossfestival.com domain lives on) |
| Deploys | Automatic. Every push to `main` goes live within about a minute. |
| What `main` shows | The **inter-season page**: one English page (`index.html`) with the next edition, all past seasons (artists, programs, photos), about, venue, contact and an email sign-up box |
| The full 2026 festival site | Saved untouched on the **`festival-2026` branch** (Danish + English homepage, about and artists pages, ticket links). Viewable at https://festival-2026.across-d4e.pages.dev |
| Email sign-ups | Stored in Cloudflare KV. Namespace `across-subscribers`, id `39412a350f5b4c17b451d6c900c576f8` |
| Sign-up code | `functions/api/subscribe.js`. Runs at `/api/subscribe` |
| Old page links | `_redirects` sends `/about.html`, `/artists.html` and the `-en` pages to the matching section of the homepage |

**Version rule:** every push to `main` must bump the little version number in the footer by 0.1 (search `index.html` for `class="ver"`). It was **v2.7** when this was written. See `CLAUDE.md`.

---

## 1. Get the email list

The website only **stores** addresses. It has never sent an email, and it can't. You send the "program is out" email yourself, from a newsletter service.

### Export the list

You need Node.js installed (`node --version` should work) and access to the Cloudflare account.

```bash
cd path/to/across            # this repo
npx wrangler login           # opens the browser; log in to the Cloudflare account that owns acrossfestival.com
npx wrangler kv key list --namespace-id 39412a350f5b4c17b451d6c900c576f8 --remote > subscribers.json
```

`subscribers.json` looks like this:

```json
[
  { "name": "someone@example.dk", "metadata": { "signedUp": "2026-11-20T18:02:11.000Z", "source": "acrossfestival.com inter-season form" } }
]
```

`name` is the email address and `signedUp` is when they first signed up (UTC).

**Never commit the export.** The repo is public. `.gitignore` already ignores `subscribers*.json`, but keep it out of the repo folder anyway.

### Turn it into a CSV (for Mailchimp, MailerLite, Brevo, Excel, etc.)

```bash
python3 -c "import json,csv,sys;w=csv.writer(sys.stdout);w.writerow(['email','signed_up']);[w.writerow([r['name'],r['metadata']['signedUp']]) for r in json.load(open('subscribers.json'))]" > subscribers.csv
```

### Sending the email

Import the CSV into a newsletter service, such as MailerLite or Brevo (both European, both with free plans). Things to keep in mind:

- **Consent:** people signed up under this promise: *"We only use your address to tell you about ACROSS. Write to us any time and we'll delete it."* Only email them about ACROSS.
- **Unsubscribe link:** every email needs one. Newsletter services add it automatically.
- **Double opt-in:** the website didn't send a confirmation email. If the service asks whether the contacts confirmed, answer honestly ("signed up via website form, single opt-in").

### If someone asks to be deleted

```bash
npx wrangler kv key delete "their@email.dk" --namespace-id 39412a350f5b4c17b451d6c900c576f8 --remote
```

Also delete them in the newsletter service if you've imported the list already.

### If you see spam sign-ups

The form has a hidden trap field that catches simple bots, and that's all. If junk addresses show up, add Cloudflare Turnstile (a free human check) to the form and verify it in `functions/api/subscribe.js`. Delete junk with the command above.

---

## 2. Bring back the full festival site (spring/summer 2027)

The 2026 festival site is a good starting point. It has the full ticket and program layout in Danish and English.

```bash
git fetch
git checkout -b festival-2027 origin/festival-2026
```

Then:

1. **Update the content** in all six pages: `index.html` (Danish), `index-en.html`, `about.html`, `about-en.html`, `artists.html`, `artists-en.html`. Change the dates, artists, bios, photos, programs, ticket links and prices. Search for `2026` to find most places.
2. **Decide about the email box.** The festival pages don't have one. Leave `functions/` in the repo either way, because it does no harm.
3. **Set the version.** The festival pages use their own version numbers (Danish v2.4 / English v2.1 at the end of 2026), while the inter-season page reached v2.7+. Pick the next number above all of them and use it on **every page**.
4. **Preview before going live.** Push the branch (`git push -u origin festival-2027`) and Cloudflare builds a preview at https://festival-2027.across-d4e.pages.dev. Note that the email box doesn't save on previews, on purpose (see Troubleshooting).
5. **Check the inter-season page is saved** before it's replaced (you'll want it again in the autumn). The branch `interseason-2026` was made in November 2026. If anything on `main` changed since, refresh it:
   ```bash
   git checkout main
   git branch -f interseason-2026 main && git push -f origin interseason-2026
   ```
6. **Go live.** Don't `git merge`, because `main` deleted the pages the festival branch edits, so a merge is full of conflicts. Copy the festival files onto `main` instead:
   ```bash
   git checkout main
   git rm _redirects                        # otherwise /about.html keeps redirecting to the homepage
   git checkout festival-2027 -- index.html index-en.html about.html about-en.html artists.html artists-en.html images
   git commit -m "feat: festival 2027 site live; vX.Y"
   git push
   ```
7. **Update `CLAUDE.md`** so the "Current mode" section says festival mode instead of inter-season.


---

## 3. After the 2027 festival: back to the inter-season page

1. **Save the festival site** to a branch, like last time:
   ```bash
   git branch festival-2027 main && git push -u origin festival-2027
   ```
2. **Restore the inter-season page and its redirects** from the branch you saved in step 2.5:
   ```bash
   git checkout interseason-2026 -- index.html _redirects images/interseason
   ```
3. **Add 2027 to it.** `index.html` has marker comments:
   - `<!-- ===== NEXT EDITION ... -->`: change `2027` → `2028` and the text.
   - `<!-- ===== SEASON 2026 ... -->`: copy that whole `<section>…</section>` block, paste it above, and change the year, "Third edition" → "Fourth edition", artists, concerts and photos.
   - Put web-sized photos in `images/interseason/`, about 1100 px on the long side. On a Mac: `sips -Z 1100 photo.jpg --out images/interseason/name.jpg`.
4. **Delete the extra pages**: `git rm index-en.html about.html about-en.html artists.html artists-en.html`.
5. **Bump the version, commit, push.**
6. **Check that the sign-up box still saves**:
   ```bash
   curl -s -X POST https://acrossfestival.com/api/subscribe -H 'content-type: application/json' -d '{"email":"test@example.com"}'
   # → {"ok":true}
   npx wrangler kv key delete "test@example.com" --namespace-id 39412a350f5b4c17b451d6c900c576f8 --remote
   ```

---

## Troubleshooting

| Symptom | Cause and fix |
|---|---|
| Sign-up box says "Sign-up isn't working right now" | The function answered 503 ("Storage is not connected yet"), which means the KV binding is missing. In the Cloudflare dashboard go to Workers & Pages → `across` → Settings → Bindings → add a KV namespace with variable name **`SUBSCRIBERS`** and namespace **`across-subscribers`**, for **Production**. Then push any commit (with a version bump) so it redeploys. Bindings only apply to new deploys. |
| Sign-ups work on acrossfestival.com but not on a `*.across-d4e.pages.dev` preview | On purpose. Only Production is connected to the list, so tests on previews never end up in it. |
| `/api/subscribe` gives 404 or 405 | The `functions/` folder is missing from `main`, or you're testing with `python3 -m http.server`, which can't run functions. Use `npx wrangler pages dev .` locally. |
| `wrangler` asks to log in | Run `npx wrangler login`. You need access to the Cloudflare account that owns acrossfestival.com. |
| Changes don't show up on the site | Check the deploy in the Cloudflare dashboard (Workers & Pages → `across` → Deployments). A push to a branch other than `main` only makes a preview. |

---

## Costs

Everything runs on free plans: Cloudflare Pages, Pages Functions and KV (up to 1,000 new sign-ups a day). The only real cost is the acrossfestival.com domain renewal.
