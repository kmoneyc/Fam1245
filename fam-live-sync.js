// FAM 1245 Live Sync v4.52
// Safe static-site sync layer: tries public Kingshot.net-style endpoints, caches successful data, and falls back to local FAM K1245 data.
(function(){
  "use strict";

  var FAM_KINGDOM_ID = 1245;
  var CACHE_PREFIX = "fam1245_live_sync_";
  var DEFAULT_CACHE_HOURS = 6;

  var API = {
    base: "https://kingshot.net",
    docs: "https://kingshot.net/api-docs",
    endpoints: {
      giftCodes: [
        "/api/gift-codes",
        "https://kingshot.net/api/gift-codes",
        "https://kingshot.net/api/codes",
        "https://kingshot.net/api/tools/gift-codes",
        "https://kingshot.net/api/public/gift-codes",
        "https://kingshot.net/api/v1/gift-codes"
      ],
      calendar: [
        "/api/events",
        "/api/calendar/today",
        "https://kingshot.net/api/calendar",
        "https://kingshot.net/api/event-calendar",
        "https://kingshot.net/api/events/calendar",
        "https://kingshot.net/api/public/calendar",
        "https://kingshot.net/api/v1/calendar"
      ],
      calculatorData: [
        "/api/calculator-data",
        "https://kingshot.net/api/calculators/data",
        "https://kingshot.net/api/database",
        "https://kingshot.net/api/game-data",
        "https://kingshot.net/api/public/game-data",
        "https://kingshot.net/api/v1/database"
      ],
      transferHistory: [
        "/api/transfer-history",
        "https://kingshot.net/api/transfer-history?kingdom=1245",
        "https://kingshot.net/api/transfers/history?kingdom=1245",
        "https://kingshot.net/api/kingdoms/1245/transfer-history",
        "https://kingshot.net/api/v1/transfer-history?kingdom=1245",
        "https://v2.kingshot.net/api/transfer-history?kingdom=1245"
      ]
    }
  };

  var fallback = {
    giftCodes: {
      source: "FAM fallback",
      updatedAt: "2026-05-17T00:00:00Z",
      active: [
        {code:"OFFICIALSTORE516", status:"active", reward:"Public active code", note:"Copy and redeem from the official redeem page."},
        {code:"LOVEFAMILY", status:"active", reward:"Public active code", note:"Copy and redeem from the official redeem page."},
        {code:"KSPRAWNING", status:"active", reward:"Public active code", note:"Copy and redeem from the official redeem page."},
        {code:"VIP777", status:"active", reward:"Public active code", note:"Copy and redeem from the official redeem page."}
      ],
      expired: []
    },
    calendar: {
      source: "FAM K1245 fallback rotation",
      kingdom: 1245,
      timezone: "UTC",
      updatedAt: "2026-05-17T00:00:00Z",
      baseline: {
        note: "K1245 default anchor: Week 3 Saturday was set on 2026-05-16 UTC.",
        week: 3,
        day: "Saturday"
      }
    },
    calculatorData: {
      source: "FAM fallback estimates",
      updatedAt: "2026-05-17T00:00:00Z",
      governorGear: {
        materialNames: ["Satin","Gilded Threads","Artisan's Visions"],
        levels: {
          Green:{satin:45,threads:0,visions:0,power:1200},
          Blue:{satin:120,threads:12,visions:0,power:2800},
          Purple:{satin:360,threads:48,visions:1,power:7200},
          Gold:{satin:900,threads:130,visions:4,power:17000},
          Red:{satin:2200,threads:330,visions:12,power:42000}
        }
      },
      charms: {
        balanceNote: "Watch Charm Guides and Charm Designs together. If one is far ahead of the other, that material is not your bottleneck.",
        maxLevel: 10
      },
      pets: {
        k1245Focus: ["Bear Damage","PvP Attack","Defense","Gathering"]
      },
      widgets: {
        k1245Focus: ["Bear Rally","PvP Rally","Garrison"]
      }
    },
    transferHistory: {
      source: "FAM K1245 local references",
      kingdom: 1245,
      updatedAt: "2026-05-17T00:00:00Z",
      notes: [
        "K1245 transfer planning should verify current event rules and power caps in-game before locking invites.",
        "Use this page to track FAM candidates, status, invite type, power, and notes.",
        "Live transfer history is attempted from public endpoints, then cached if available."
      ],
      history: []
    }
  };

  function now(){ return Date.now(); }
  function hours(ms){ return ms / 3600000; }
  function key(name){ return CACHE_PREFIX + name; }

  function normalizePayload(kind, raw){
    if(!raw) return null;
    if(typeof raw === "string"){
      try { raw = JSON.parse(raw); } catch(e){ return null; }
    }

    if(kind === "giftCodes"){
      var active = raw.active || raw.activeCodes || raw.codes || raw.data || [];
      var expired = raw.expired || raw.expiredCodes || [];
      if(!Array.isArray(active) && active.items) active = active.items;
      if(!Array.isArray(active)) active = [];
      active = active.map(function(x){
        if(typeof x === "string") return {code:x,status:"active"};
        return {
          code: x.code || x.giftCode || x.name || x.id || "",
          status: x.status || (x.expired ? "expired" : "active"),
          reward: x.reward || x.rewards || x.description || "",
          note: x.note || x.notes || "",
          expiresAt: x.expiresAt || x.expiry || x.expiration || ""
        };
      }).filter(function(x){return x.code;});
      expired = Array.isArray(expired) ? expired.map(function(x){return typeof x === "string" ? {code:x,status:"expired"} : x;}) : [];
      return {source: raw.source || "Kingshot.net API", updatedAt: raw.updatedAt || raw.lastUpdated || new Date().toISOString(), active:active.filter(function(x){return x.status !== "expired";}), expired:expired};
    }

    if(kind === "calendar"){
      return {
        source: raw.source || "Kingshot.net API",
        updatedAt: raw.updatedAt || raw.lastUpdated || new Date().toISOString(),
        kingdom: raw.kingdom || raw.kingdomId || FAM_KINGDOM_ID,
        timezone: raw.timezone || "UTC",
        events: raw.events || raw.calendar || raw.weeks || raw.data || raw,
        raw: raw
      };
    }

    if(kind === "calculatorData"){
      return {
        source: raw.source || "Kingshot.net API",
        updatedAt: raw.updatedAt || raw.lastUpdated || new Date().toISOString(),
        data: raw.data || raw,
        governorGear: raw.governorGear || raw.governor_gear || raw.gear || null,
        buildings: raw.buildings || null,
        research: raw.research || raw.warAcademy || raw.war_academy || null,
        pets: raw.pets || null,
        charms: raw.charms || null,
        widgets: raw.widgets || raw.heroWidgets || null
      };
    }

    if(kind === "transferHistory"){
      var list = raw.history || raw.transfers || raw.events || raw.data || [];
      if(!Array.isArray(list)) list = [];
      return {
        source: raw.source || "Kingshot.net API",
        updatedAt: raw.updatedAt || raw.lastUpdated || new Date().toISOString(),
        kingdom: raw.kingdom || raw.kingdomId || FAM_KINGDOM_ID,
        history: list,
        notes: raw.notes || []
      };
    }

    return raw;
  }

  function getCache(kind, maxHours){
    try{
      var cached = JSON.parse(localStorage.getItem(key(kind)) || "null");
      if(!cached || !cached.savedAt || !cached.payload) return null;
      if(maxHours && hours(now() - cached.savedAt) > maxHours) return null;
      return cached.payload;
    }catch(e){ return null; }
  }

  function setCache(kind, payload){
    try{ localStorage.setItem(key(kind), JSON.stringify({savedAt:now(), payload:payload})); }catch(e){}
  }

  function fetchJson(url){
    var opts = {cache:"no-store", headers:{Accept:"application/json"}};
    if(/^https?:\/\//i.test(url)){
      opts.mode = "cors";
      opts.credentials = "omit";
    }
    return fetch(url, opts).then(function(r){
      if(!r.ok) throw new Error("HTTP "+r.status);
      return r.json();
    });
  }

  function firstWorking(kind){
    var urls = API.endpoints[kind] || [];
    var i = 0;
    function next(){
      if(i >= urls.length) return Promise.reject(new Error("No endpoint worked for "+kind));
      var url = urls[i++];
      return fetchJson(url).then(function(raw){
        var payload = normalizePayload(kind, raw);
        if(!payload) throw new Error("Invalid payload");
        payload.endpoint = url;
        setCache(kind, payload);
        return payload;
      }).catch(next);
    }
    return next();
  }

  function get(kind, opts){
    opts = opts || {};
    var maxHours = opts.cacheHours || DEFAULT_CACHE_HOURS;
    var cached = getCache(kind, maxHours);
    if(cached && !opts.force) return Promise.resolve({status:"cache", payload:cached});
    return firstWorking(kind).then(function(payload){
      return {status:"live", payload:payload};
    }).catch(function(err){
      var stale = getCache(kind, 24 * 30);
      if(stale) return {status:"stale-cache", payload:stale, error:String(err && err.message || err)};
      return {status:"fallback", payload:fallback[kind], error:String(err && err.message || err)};
    });
  }

  function lastSyncText(result){
    if(!result || !result.payload) return "No sync data";
    var source = result.status === "live" ? "Live sync" : result.status === "cache" ? "Cached live data" : result.status === "stale-cache" ? "Stale cached data" : "Fallback data";
    var when = result.payload.updatedAt ? new Date(result.payload.updatedAt).toLocaleString() : "unknown time";
    return source + " · " + when;
  }

  function injectSyncBadge(target, result, label){
    var el = typeof target === "string" ? document.querySelector(target) : target;
    if(!el) return;
    el.innerHTML = '<div class="sync-badge '+(result.status||"fallback")+'"><strong>'+label+'</strong><span>'+lastSyncText(result)+'</span></div>';
  }

  window.FAM_KINGDOM_ID = FAM_KINGDOM_ID;
  window.FAM_API_CONFIG = API;
  window.FAM_LIVE_SYNC = {
    get:get,
    getCache:getCache,
    setCache:setCache,
    fallback:fallback,
    endpoints:API.endpoints,
    lastSyncText:lastSyncText,
    injectSyncBadge:injectSyncBadge,
    normalizePayload:normalizePayload
  };
})();
