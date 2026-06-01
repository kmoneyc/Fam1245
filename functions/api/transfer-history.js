import { json, getData } from "../_utils.js";

const fallback = {
  source: "embedded fallback",
  updatedAt: "2026-05-31T00:00:00Z",
  kingdom: 1245,
  notes: [],
  history: []
};

export async function onRequestGet(context) {
  const data = await getData(context, "transfer-history", "/data/transfer-history.json", fallback);
  return json(data);
}
