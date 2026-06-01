# FAM static JSON database

GitHub Pages cannot run a server-side database directly, so this site uses a static JSON database.

## Data files

- `data/gift-codes.json`
- `data/events.json`
- `data/calculator-data.json`
- `data/transfer-history.json`
- `data/changelog.json`
- `data/guide-index.json`

## Refresh system

`.github/workflows/refresh-data.yml` runs `scripts/sync-data.mjs` on a schedule and commits updated JSON files back to the repository.

The browser then reads the JSON files through `fam-live-sync.js` and caches results in `localStorage`.

## KV replacement

For GitHub Pages, the KV equivalent is:

1. Static JSON files in `/data`
2. GitHub Actions scheduled refresh
3. Browser `localStorage` cache

This is not a private database. Do not store secrets.
