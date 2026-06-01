-- cloudflare/schema.sql
-- D1 storage for FAM 1245 live data.
-- The API layer works without D1, but D1 lets you edit data centrally.

CREATE TABLE IF NOT EXISTS fam_data (
  kind TEXT PRIMARY KEY,
  payload TEXT NOT NULL,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_fam_data_updated_at ON fam_data(updated_at);

-- Optional history table for future admin/import work.
CREATE TABLE IF NOT EXISTS fam_events_log (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  kind TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
