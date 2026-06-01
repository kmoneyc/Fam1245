import { json, fromKV, fromD1 } from "../_utils.js";

export async function onRequestGet(context) {
  const env = context.env || {};
  const checks = {
    kvBinding: Boolean(env.FAM_KV),
    d1Binding: Boolean(env.FAM_DB),
    assetsBinding: Boolean(env.ASSETS)
  };

  let kvRead = false;
  let d1Read = false;

  try {
    if (env.FAM_KV) {
      await env.FAM_KV.get("fam1245:healthcheck");
      kvRead = true;
    }
  } catch (e) {}

  try {
    if (env.FAM_DB) {
      await env.FAM_DB.prepare("SELECT 1 AS ok").first();
      d1Read = true;
    }
  } catch (e) {}

  return json({
    ok: true,
    kind: "site-status",
    servedAt: new Date().toISOString(),
    checks: { ...checks, kvRead, d1Read },
    endpoints: [
      "/api/gift-codes",
      "/api/events",
      "/api/calendar/today",
      "/api/calculator-data",
      "/api/transfer-history",
      "/api/guide-search?q=bear",
      "/api/changelog"
    ]
  });
}
