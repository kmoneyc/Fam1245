import { json, getData } from "../_utils.js";

const fallback = {
  source: "embedded fallback",
  updatedAt: "2026-05-31T00:00:00Z",
  policy: "Grouped by 24-hour increments.",
  entries: []
};

export async function onRequestGet(context) {
  const data = await getData(context, "changelog", "/data/changelog.json", fallback);
  return json(data);
}
