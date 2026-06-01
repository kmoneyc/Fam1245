# Cloudflare setup for FAM 1245

This build adds Cloudflare Pages Functions with optional KV and D1 bindings.

## What was added

API endpoints:

- `/api/gift-codes`
- `/api/events`
- `/api/calendar/today`
- `/api/calculator-data`
- `/api/transfer-history`
- `/api/guide-search?q=bear`
- `/api/changelog`
- `/api/site-status`

Fallback JSON:

- `/data/gift-codes.json`
- `/data/events.json`
- `/data/calculator-data.json`
- `/data/transfer-history.json`
- `/data/changelog.json`
- `/data/guide-index.json`

Cloudflare files:

- `functions/api/*`
- `functions/_utils.js`
- `cloudflare/schema.sql`
- `cloudflare/seed.sql`
- `wrangler.example.toml`
- `_headers`

## Dashboard setup

1. Upload or connect this project to Cloudflare Pages.
2. Go to **Workers & Pages**.
3. Open your FAM Pages project.
4. Go to **Settings**.
5. Go to **Functions**.
6. Add KV binding:
   - Variable name: `FAM_KV`
   - KV namespace: create/select your FAM namespace.
7. Add D1 binding:
   - Variable name: `FAM_DB`
   - D1 database: create/select your FAM database.
8. Redeploy the Pages project.

The API works without KV/D1 by using `/data/*.json`, but KV/D1 make it editable and cacheable.

## Create D1 tables

Using Wrangler:

```bash
npx wrangler d1 create fam1245
npx wrangler d1 execute fam1245 --file=cloudflare/schema.sql
npx wrangler d1 execute fam1245 --file=cloudflare/seed.sql
```

Then copy the D1 database ID into the Cloudflare Pages D1 binding if using dashboard config.

## Test after deployment

Open these URLs on your deployed site:

```txt
/api/site-status
/api/gift-codes
/api/events
/api/calendar/today
/api/calculator-data
/api/transfer-history
/api/guide-search?q=bear
```

`/api/site-status` will show whether KV, D1, and Assets bindings are visible to the Function.

## Data priority

Each endpoint uses this order:

1. KV key: `fam1245:<kind>:latest`
2. D1 table: `fam_data`
3. Static JSON file in `/data`
4. Embedded fallback inside the Function

This means the site still runs if a binding is missing.

## KV keys used

- `fam1245:gift-codes:latest`
- `fam1245:events:latest`
- `fam1245:calculator-data:latest`
- `fam1245:transfer-history:latest`
- `fam1245:changelog:latest`
- `fam1245:guide-index:latest`

## D1 table

The simple generic table is:

```sql
CREATE TABLE fam_data (
  kind TEXT PRIMARY KEY,
  payload TEXT NOT NULL,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
```

Store one JSON payload per `kind`.
