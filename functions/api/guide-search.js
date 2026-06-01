import { json, getData } from "../_utils.js";

function scoreGuide(guide, q) {
  const hay = [guide.title, guide.summary, ...(guide.tags || [])].join(" ").toLowerCase();
  const words = q.toLowerCase().split(/\s+/).filter(Boolean);
  return words.reduce((sum, w) => sum + (hay.includes(w) ? 1 : 0), 0);
}

export async function onRequestGet(context) {
  const url = new URL(context.request.url);
  const q = (url.searchParams.get("q") || "").trim();
  const data = await getData(context, "guide-index", "/data/guide-index.json", {
    source: "embedded fallback",
    updatedAt: "2026-05-31T00:00:00Z",
    guides: []
  });

  const guides = data.guides || data.payload?.guides || [];
  const results = q
    ? guides.map(g => ({ ...g, score: scoreGuide(g, q) })).filter(g => g.score > 0).sort((a,b) => b.score - a.score).slice(0, 8)
    : guides.slice(0, 8).map(g => ({ ...g, score: 0 }));

  return json({ ok: true, kind: "guide-search", query: q, servedAt: new Date().toISOString(), results });
}
