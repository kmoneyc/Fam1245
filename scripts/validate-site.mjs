import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

const root = process.cwd();
const allowedExternal = /^(https?:|mailto:|tel:|data:|javascript:|#)/i;
const htmlFiles = fs.readdirSync(root).filter((f) => f.endsWith(".html"));
const cssFiles = fs.readdirSync(root).filter((f) => f.endsWith(".css"));
const jsFiles = [];
function walk(dir) {
  for (const item of fs.readdirSync(dir)) {
    if (item === ".git") continue;
    const full = path.join(dir, item);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) walk(full);
    else if (item.endsWith(".js")) jsFiles.push(full);
  }
}
walk(root);

let errors = [];

for (const file of jsFiles) {
  const result = spawnSync("node", ["--check", file], { encoding: "utf8" });
  if (result.status !== 0) errors.push(`${path.relative(root, file)} JS syntax: ${result.stderr}`);
}

for (const file of cssFiles) {
  const text = fs.readFileSync(path.join(root, file), "utf8");
  const open = (text.match(/{/g) || []).length;
  const close = (text.match(/}/g) || []).length;
  if (open !== close) errors.push(`${file} CSS brace mismatch ${open} vs ${close}`);
  for (const theme of ['html[data-theme="pink"]','html[data-theme="fire"]','html[data-theme="purple"]']) {
    if (!text.includes(theme)) errors.push(`${file} missing ${theme}`);
  }
}

for (const file of htmlFiles) {
  const text = fs.readFileSync(path.join(root, file), "utf8");
  const refs = [
    ...text.matchAll(/(?:href|src)="([^":#?]+)(?:\?[^"]*)?"/g),
    ...text.matchAll(/srcset="([^",\s]+)(?:\?[^"]*)?"/g)
  ].map((m) => m[1]);

  for (const ref of refs) {
    if (!ref || allowedExternal.test(ref)) continue;
    if (!fs.existsSync(path.join(root, ref))) errors.push(`${file} missing local ref ${ref}`);
  }

  for (const [label, term] of Object.entries({
    "theme toggle": "data-theme-toggle",
    "theme core": "theme-core.js",
    "motion script": "venator-motion.js",
    "legal text": "Not affiliated with Kingshot or its developers",
    "default light theme": "localStorage.getItem('fam_theme')||'pink'"
  })) {
    if (!text.includes(term)) errors.push(`${file} missing ${label}`);
  }

  if (!text.includes("<footer")) errors.push(`${file} missing footer`);
}

for (const file of fs.readdirSync(path.join(root, "data")).filter((f) => f.endsWith(".json"))) {
  try {
    JSON.parse(fs.readFileSync(path.join(root, "data", file), "utf8"));
  } catch (err) {
    errors.push(`data/${file} invalid JSON: ${err.message}`);
  }
}

const hub = fs.readFileSync(path.join(root, "calculators.html"), "utf8");
const cards = (hub.match(/data-calc-card/g) || []).length;
if (cards !== 22) errors.push(`Expected 22 calculator cards, found ${cards}`);

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`Site validation passed: ${htmlFiles.length} HTML, ${jsFiles.length} JS, ${cssFiles.length} CSS, ${cards} calculator cards.`);
