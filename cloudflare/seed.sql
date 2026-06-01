-- cloudflare/seed.sql
-- Optional seed data for D1. You can paste/edit these rows before running.
-- payload must be valid JSON text.

INSERT OR REPLACE INTO fam_data(kind, payload, updated_at)
VALUES
('gift-codes', '{"source":"D1 seed","updatedAt":"2026-05-31T00:00:00Z","kingdom":1245,"active":[{"code":"OFFICIALSTORE516","status":"active","reward":"Public active code"},{"code":"LOVEFAMILY","status":"active","reward":"Public active code"},{"code":"KSPRAWNING","status":"active","reward":"Public active code"},{"code":"VIP777","status":"active","reward":"Public active code"}],"expired":[]}', CURRENT_TIMESTAMP),
('events', '{"source":"D1 seed","updatedAt":"2026-05-31T00:00:00Z","kingdom":1245,"timezone":"UTC","baseline":{"week":3,"day":"Saturday","date":"2026-05-16"},"cycleWeeks":4}', CURRENT_TIMESTAMP),
('calculator-data', '{"source":"D1 seed","updatedAt":"2026-05-31T00:00:00Z","kingdom":1245,"constants":{"bearRatio":"10/10/80+","castleBeginnerDelaySeconds":60,"castleAdvancedDelaySeconds":30,"recommendedRallyGapSeconds":[10,30]}}', CURRENT_TIMESTAMP),
('transfer-history', '{"source":"D1 seed","updatedAt":"2026-05-31T00:00:00Z","kingdom":1245,"notes":["Verify current in-game transfer rules before locking invites."],"history":[]}', CURRENT_TIMESTAMP),
('guide-index', '{"source":"D1 seed","updatedAt":"2026-05-31T00:00:00Z","guides":[{"title":"Critical Rules","url":"index.html#critical","tags":["rally","bear","garrison"],"summary":"Must-know alliance rules."},{"title":"Calculator Hub","url":"calculators.html","tags":["calculator","tools"],"summary":"All FAM calculators."}]}', CURRENT_TIMESTAMP);
