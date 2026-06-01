import { json, getData } from "../_utils.js";

const fallback = {
  source: "embedded fallback",
  updatedAt: "2026-05-31T00:00:00Z",
  kingdom: 1245,
  active: [],
  expired: []
};

export async function onRequestGet(context) {
  const data = await getData(context, "gift-codes", "/data/gift-codes.json", fallback);
  return json(data);
}
