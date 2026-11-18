import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const dataDir = path.join(root, "data");
const dbDir = path.join(root, "db");
fs.mkdirSync(dataDir, { recursive: true });
fs.mkdirSync(dbDir, { recursive: true });

function readJson(file, fallback) {
  try {
    return JSON.parse(fs.readFileSync(file, "utf8"));
  } catch {
    return fallback;
  }
}

function writeJson(file, data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2) + "\n");
}

const now = new Date().toISOString();

const files = [
  "gift-codes.json",
  "events.json",
  "calculator-data.json",
  "transfer-history.json",
  "changelog.json",
  "guide-index.json"
];

for (const file of files) {
  const full = path.join(dataDir, file);
  const data = readJson(full, {});
  data.host = "github-pages";
  data.lastWorkflowRefresh = now;
  data.updatePolicy = data.updatePolicy || "Static JSON database refreshed by GitHub Actions.";
  writeJson(full, data);
}

const manifest = {
  host: "github-pages",
  updatedAt: now,
  database: "Static JSON files in /data",
  browserCache: "localStorage cache via fam-live-sync.js",
  files: files.map((file) => ({
    file: `data/${file}`,
    bytes: fs.statSync(path.join(dataDir, file)).size
  }))
};

writeJson(path.join(dbDir, "manifest.json"), manifest);
console.log("FAM static database refreshed:", now);
