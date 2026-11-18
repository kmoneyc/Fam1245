CREATE TABLE IF NOT EXISTS players (
 id SERIAL PRIMARY KEY,
 kingdom INT,
 name TEXT,
 alliance TEXT,
 power BIGINT,
 last_seen TIMESTAMP
);

CREATE TABLE IF NOT EXISTS alliances (
 id SERIAL PRIMARY KEY,
 kingdom INT,
 name TEXT,
 members INT,
 total_power BIGINT,
 last_seen TIMESTAMP
);

CREATE TABLE IF NOT EXISTS power_snapshots (
 id SERIAL PRIMARY KEY,
 player_name TEXT,
 alliance TEXT,
 power BIGINT,
 recorded_at TIMESTAMP
);
