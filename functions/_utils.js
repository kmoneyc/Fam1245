const JSON_HEADERS = {
  "content-type": "application/json; charset=utf-8",
  "cache-control": "no-store, max-age=0"
};

export function json(data, status = 200) {
  return new Response(JSON.stringify(data, null, 2), { status, headers: JSON_HEADERS });
}

export function stamp(kind, source, payload) {
  return {
    ok: true,
    kind,
    source,
    servedAt: new Date().toISOString(),
    kingdom: 1245,
    ...payload
  };
}

export async function fromKV(env, key) {
  if (!env || !env.FAM_KV) return null;
  const raw = await env.FAM_KV.get(key, "json");
  return raw || null;
}

export async function toKV(env, key, value, ttlSeconds = 21600) {
  if (!env || !env.FAM_KV) return false;
  await env.FAM_KV.put(key, JSON.stringify(value), { expirationTtl: ttlSeconds });
  return true;
}

export async function fromD1(env, kind) {
  if (!env || !env.FAM_DB) return null;
  try {
    const row = await env.FAM_DB
      .prepare("SELECT payload, updated_at FROM fam_data WHERE kind = ? ORDER BY updated_at DESC LIMIT 1")
      .bind(kind)
      .first();
    if (!row || !row.payload) return null;
    const payload = JSON.parse(row.payload);
    if (!payload.updatedAt && row.updated_at) payload.updatedAt = row.updated_at;
    return payload;
  } catch (err) {
    return null;
  }
}

export async function assetJson(env, request, path) {
  try {
    if (!env || !env.ASSETS) return null;
    const url = new URL(request.url);
    const res = await env.ASSETS.fetch(new URL(path, url.origin).toString());
    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    return null;
  }
}

export async function getData(context, kind, assetPath, fallback) {
  const { env, request } = context;
  const kvKey = `fam1245:${kind}:latest`;

  const kv = await fromKV(env, kvKey);
  if (kv) return stamp(kind, "Cloudflare KV", kv);

  const d1 = await fromD1(env, kind);
  if (d1) {
    await toKV(env, kvKey, d1).catch(() => false);
    return stamp(kind, "Cloudflare D1", d1);
  }

  const asset = await assetJson(env, request, assetPath);
  if (asset) return stamp(kind, "static fallback JSON", asset);

  return stamp(kind, "embedded fallback", fallback);
}
