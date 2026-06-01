import { json, getData } from "../_utils.js";

const fallback = {
  source: "embedded fallback",
  updatedAt: "2026-05-31T00:00:00Z",
  kingdom: 1245,
  timezone: "UTC",
  baseline: { week: 3, day: "Saturday", date: "2026-05-16" },
  cycleWeeks: 4
};

export async function onRequestGet(context) {
  const data = await getData(context, "events", "/data/events.json", fallback);
  return json(data);
}
