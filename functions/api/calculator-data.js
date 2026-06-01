import { json, getData } from "../_utils.js";

const fallback = {
  source: "embedded fallback",
  updatedAt: "2026-05-31T00:00:00Z",
  kingdom: 1245,
  constants: {
    bearRatio: "10/10/80+",
    castleBeginnerDelaySeconds: 60,
    castleAdvancedDelaySeconds: 30,
    recommendedRallyGapSeconds: [10, 30]
  }
};

export async function onRequestGet(context) {
  const data = await getData(context, "calculator-data", "/data/calculator-data.json", fallback);
  return json(data);
}
