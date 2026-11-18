# GitHub Pages setup for FAM 1245

This build is optimized for GitHub Pages.

GitHub Pages is static hosting, so there is no server database like Cloudflare D1/KV inside the site runtime. The replacement setup is:

- Static JSON database: `/data/*.json`
- Scheduled GitHub Actions refresh: `.github/workflows/refresh-data.yml`
- Browser cache/KV: `localStorage` inside `fam-live-sync.js`
- Validation workflow: `.github/workflows/site-checks.yml`
- Deploy workflow: `.github/workflows/deploy-pages.yml`

## Upload to GitHub

1. Create a GitHub repository, for example `fam1245`.
2. Upload all files from this ZIP to the repository root.
3. Commit and push to the `main` branch.

## Enable GitHub Pages

1. Open your repository on GitHub.
2. Go to **Settings**.
3. Go to **Pages**.
4. Under **Build and deployment**, set **Source** to **GitHub Actions**.
5. Push to `main`, or run the `Deploy FAM site to GitHub Pages` workflow manually.

## What the workflows do

### Deploy FAM site to GitHub Pages

File:

```txt
.github/workflows/deploy-pages.yml
```

Runs validation, uploads the whole static site, then deploys it to GitHub Pages.

### FAM site checks

File:

```txt
.github/workflows/site-checks.yml
```

Runs on pull requests and non-main pushes. It checks:

- JavaScript syntax
- CSS brace structure
- Local file references
- Theme scripts
- Theme toggle
- Footer/legal text
- JSON validity
- 22 calculator cards

### Refresh FAM static data

File:

```txt
.github/workflows/refresh-data.yml
```

Runs daily at `07:25 UTC` and can also be run manually. It refreshes metadata inside `/data/*.json`, updates `db/manifest.json`, validates the site, and commits changed data files.

## Static database

The JSON database is here:

```txt
data/gift-codes.json
data/events.json
data/calculator-data.json
data/transfer-history.json
data/changelog.json
data/guide-index.json
```

This replaces Cloudflare KV/D1 for GitHub Pages.

## How to edit data manually

Edit the JSON file directly, then commit.

Example:

```txt
data/gift-codes.json
```

Add a code under `active`, commit, and GitHub Pages will redeploy.

## How to test after deploy

Open:

```txt
data/gift-codes.json
data/events.json
data/calculator-data.json
data/transfer-history.json
data/guide-index.json
```

Then check the site pages that use live sync:

- Events & Packs Calendar
- Gift Codes
- Transfer Planner
- Calculator pages
- FAM Guide Assistant

## Important notes

- Do not store secrets in `/data`.
- GitHub Pages is public static hosting.
- For a real private database later, use Supabase, Firebase, Neon, or another external database with public read-only API endpoints.
