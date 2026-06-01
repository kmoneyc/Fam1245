import { json, getData } from "../../_utils.js";

const dayNames = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
const baseline = new Date("2026-05-16T00:00:00Z"); // Week 3 Saturday
const baselineWeek = 3;
const baselineDayIndex = 5;

function todayFromBaseline(now = new Date()) {
  const utcMidnight = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  const days = Math.floor((utcMidnight - baseline.getTime()) / 86400000);
  const dayIndex = ((baselineDayIndex + days) % 7 + 7) % 7;
  const weekZero = baselineWeek - 1;
  const weekIndex = ((weekZero + Math.floor((baselineDayIndex + days) / 7)) % 4 + 4) % 4;
  return { week: weekIndex + 1, day: dayNames[dayIndex], dayIndex, daysFromBaseline: days };
}

export async function onRequestGet(context) {
  const events = await getData(context, "events", "/data/events.json", {});
  const current = todayFromBaseline(new Date());
  const reset = new Date();
  reset.setUTCHours(24, 0, 0, 0);
  return json({
    ok: true,
    kind: "calendar-today",
    servedAt: new Date().toISOString(),
    kingdom: 1245,
    timezone: "UTC",
    current,
    resetAt: reset.toISOString(),
    dataSource: events.source,
    calendar: events
  });
}
