// FAM Events & Packs Calendar v1.3
// Updated from supplied Kingshot calendar screenshots for May 25 – June 21, 2026.
// Default baseline: Monday, Week 1 on 2026-05-25 UTC; June 1 is Monday Week 2, June 2 is Tuesday Week 2 after reset.
(function(){
  var MS_DAY = 86400000;
  var STORAGE_ANCHOR = 'fam_event_anchor_utc';
  var STORAGE_VERSION = 'fam_event_calendar_version';
  var CALENDAR_VERSION = '2026-06-02-screenshot-pack-schedule-v4';
  var DEFAULT_ANCHOR = '2026-05-25T00:00:00Z';
  var dayNames = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
  var shortDayNames = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];


  // v4.17 live calendar sync: safe API attempt + K1245 fallback status.
  var liveCalendarResult = null;
  function syncLiveCalendar(){
    if(!window.FAM_LIVE_SYNC) return;
    FAM_LIVE_SYNC.get('calendar',{cacheHours:6}).then(function(result){
      liveCalendarResult = result;
      FAM_LIVE_SYNC.injectSyncBadge('#calendarSyncStatus', result, 'Events & Packs Sync');
      // The local K1245 rotation remains the source of truth for rendering unless a future API returns a compatible events/weeks object.
      // This keeps the page stable if the public API changes shape or blocks CORS.
    }).catch(function(){});
  }

  var dailyPacks = [
    {name:'Pet Chests', type:'Daily Available', note:'Listed as Daily Available on Kingshot calendar.'},
    {name:'Gear Enhancement', type:'Daily Available', note:'Listed as Daily Available on Kingshot calendar.'}
  ];

  var specialNotes = [
    'Governor Stamina Pack: available for 3 days during Cesares Fury.',
    'Does not include Custom Pet Chests or Enhance Gear unless those packs are explicitly listed for the day.',
    'Some screenshot days show +more collapsed items. Those are marked as hidden placeholders until expanded/verified.'
  ];

  var calendarWeeks = [
    {name:"Week 1", tone:"pink", focus:"May 25 – May 31 screenshot schedule", verified:true, source:"User screenshot from Kingshot calendar", days:[{event:"Custom Selection", category:"Pack", type:"Pack", icon:"🎁", packs:[{name:"Custom Selection", type:"Pack", note:"Screenshot calendar item"},{name:"Combat Medic", type:"Pack", note:"Screenshot calendar item"}], prep:"Screenshot date: May 25. Pack window day."},{event:"Custom Selection", category:"Pack", type:"Pack", icon:"🎁", packs:[{name:"Custom Selection", type:"Pack", note:"Screenshot calendar item"}], prep:"Screenshot date: May 26. Pack window day."},{event:"Custom Selection", category:"Pack", type:"Pack", icon:"🎁", packs:[{name:"Custom Selection", type:"Pack", note:"Screenshot calendar item"},{name:"Charm Craftsman", type:"Pack", note:"Screenshot calendar item"}], prep:"Screenshot date: May 27. Pack window day."},{event:"Conqueror", category:"Pack", type:"Pack", icon:"🛡️", packs:[{name:"Conqueror", type:"Pack", note:"Screenshot calendar item"},{name:"Charm Craftsman", type:"Pack", note:"Screenshot calendar item"},{name:"Custom Arms Set", type:"Pack", note:"Screenshot calendar item"}], prep:"Screenshot date: May 28. Pack window day."},{event:"Hope Market", category:"Pack", type:"Pack", icon:"🏪", packs:[{name:"Hope Market", type:"Pack", note:"Friday – Sunday"},{name:"Conqueror", type:"Pack", note:"Thursday – Saturday"},{name:"Combat Medic", type:"Pack", note:"Friday"},{name:"Top Governor - Governor Gear", type:"Pack", note:"Friday – Sunday"},{name:"Custom Arms Set", type:"Pack", note:"Thursday – Friday"}], prep:"Screenshot date: May 29. Expanded day showed 5 packs."},{event:"Hope Market", category:"Pack", type:"Pack", icon:"🏪", packs:[{name:"Hope Market", type:"Pack", note:"Screenshot calendar item"},{name:"Conqueror", type:"Pack", note:"Screenshot calendar item"},{name:"Top Governor - Governor Gear", type:"Pack", note:"Screenshot calendar item"}], prep:"Screenshot date: May 30. Pack window day."},{event:"Hope Market", category:"Pack", type:"Pack", icon:"🏪", packs:[{name:"Hope Market", type:"Pack", note:"Screenshot calendar item"},{name:"Top Governor - Governor Gear", type:"Pack", note:"Screenshot calendar item"},{name:"Custom Forging Set", type:"Pack", note:"Screenshot calendar item"}], prep:"Screenshot date: May 31. Pack window day."}]},
    {name:"Week 2", tone:"violet", focus:"Jun 1 – Jun 7 screenshot schedule", verified:true, source:"User screenshot from Kingshot calendar", days:[{event:"Truegold Wonders", category:"Event/Pack", type:"Event", icon:"✨", packs:[{name:"Truegold Wonders", type:"Event", note:"Screenshot calendar item"},{name:"Governor Stamina", type:"Pack", note:"Screenshot calendar item"},{name:"Custom Forging Set", type:"Pack", note:"Screenshot calendar item"}], prep:"Screenshot date: June 1. This is Monday Week 2."},{event:"Truegold Wonders", category:"Event/Pack", type:"Event", icon:"✨", packs:[{name:"Truegold Wonders", type:"Event", note:"Screenshot calendar item"}], prep:"Screenshot date: June 2. Shown as Today in screenshot."},{event:"Truegold Wonders", category:"Event/Pack", type:"Event", icon:"✨", packs:[{name:"Truegold Wonders", type:"Event", note:"Screenshot calendar item"},{name:"Charm Craftsman", type:"Pack", note:"Screenshot calendar item"},{name:"Troop Training", type:"Pack", note:"Screenshot calendar item"}], prep:"Screenshot date: June 3."},{event:"Truegold Wonders", category:"Event/Pack", type:"Event", icon:"✨", packs:[{name:"Truegold Wonders", type:"Event", note:"Screenshot calendar item"},{name:"Charm Craftsman", type:"Pack", note:"Screenshot calendar item"},{name:"Troop Training", type:"Pack", note:"Screenshot calendar item"},{name:"Additional items hidden in screenshot", type:"More", note:"Screenshot shows +4 more; verify by expanding this day on Kingshot."}], prep:"Screenshot date: June 4. Screenshot shows +4 more hidden items."},{event:"Truegold Wonders", category:"Event/Pack", type:"Event", icon:"✨", packs:[{name:"Truegold Wonders", type:"Event", note:"Screenshot calendar item"},{name:"Governor Gear Enhancement", type:"Pack", note:"Screenshot calendar item"},{name:"Hall of Governors", type:"Pack", note:"Screenshot calendar item"},{name:"Additional items hidden in screenshot", type:"More", note:"Screenshot shows +4 more; verify by expanding this day on Kingshot."}], prep:"Screenshot date: June 5. Screenshot shows +4 more hidden items."},{event:"Truegold Wonders", category:"Event/Pack", type:"Event", icon:"✨", packs:[{name:"Truegold Wonders", type:"Event", note:"Screenshot calendar item"},{name:"Governor Gear Enhancement", type:"Pack", note:"Screenshot calendar item"},{name:"Hall of Governors", type:"Pack", note:"Screenshot calendar item"},{name:"Additional items hidden in screenshot", type:"More", note:"Screenshot shows +2 more; verify by expanding this day on Kingshot."}], prep:"Screenshot date: June 6. Screenshot shows +2 more hidden items."},{event:"Governor Gear Enhancement", category:"Pack", type:"Pack", icon:"⚙️", packs:[{name:"Governor Gear Enhancement", type:"Pack", note:"Screenshot calendar item"},{name:"Hall of Governors", type:"Pack", note:"Screenshot calendar item"}], prep:"Screenshot date: June 7."}]},
    {name:"Week 3", tone:"rose", focus:"Jun 8 – Jun 14 screenshot schedule", verified:true, source:"User screenshot from Kingshot calendar", days:[{event:"Custom Selection", category:"Pack", type:"Pack", icon:"🎁", packs:[{name:"Custom Selection", type:"Pack", note:"Screenshot calendar item"}], prep:"Screenshot date: June 8."},{event:"Custom Selection", category:"Pack", type:"Pack", icon:"🎁", packs:[{name:"Custom Selection", type:"Pack", note:"Screenshot calendar item"}], prep:"Screenshot date: June 9."},{event:"Charm Craftsman", category:"Pack", type:"Pack", icon:"🧰", packs:[{name:"Charm Craftsman", type:"Pack", note:"Screenshot calendar item"},{name:"Custom Selection", type:"Pack", note:"Screenshot calendar item"}], prep:"Screenshot date: June 10."},{event:"Charm Craftsman", category:"Pack", type:"Pack", icon:"🧰", packs:[{name:"Charm Craftsman", type:"Pack", note:"Screenshot calendar item"},{name:"Conqueror", type:"Pack", note:"Screenshot calendar item"},{name:"Custom Arms Set", type:"Pack", note:"Screenshot calendar item"}], prep:"Screenshot date: June 11."},{event:"Hope Market", category:"Pack", type:"Pack", icon:"🏪", packs:[{name:"Hope Market", type:"Pack", note:"Screenshot calendar item"},{name:"Conqueror", type:"Pack", note:"Screenshot calendar item"},{name:"Custom Arms Set", type:"Pack", note:"Screenshot calendar item"},{name:"Additional item hidden in screenshot", type:"More", note:"Screenshot shows +1 more; verify by expanding this day on Kingshot."}], prep:"Screenshot date: June 12. Screenshot shows +1 more hidden item."},{event:"Hope Market", category:"Pack", type:"Pack", icon:"🏪", packs:[{name:"Hope Market", type:"Pack", note:"Screenshot calendar item"},{name:"Conqueror", type:"Pack", note:"Screenshot calendar item"},{name:"Jeweler's Collection", type:"Pack", note:"Screenshot calendar item"}], prep:"Screenshot date: June 13."},{event:"Hope Market", category:"Pack", type:"Pack", icon:"🏪", packs:[{name:"Hope Market", type:"Pack", note:"Screenshot calendar item"},{name:"Combat Medic", type:"Pack", note:"Screenshot calendar item"},{name:"Custom Forging Set", type:"Pack", note:"Screenshot calendar item"},{name:"Additional item hidden in screenshot", type:"More", note:"Screenshot shows +1 more; verify by expanding this day on Kingshot."}], prep:"Screenshot date: June 14. Screenshot shows +1 more hidden item."}]},
    {name:"Week 4", tone:"dark", focus:"Jun 15 – Jun 21 screenshot schedule", verified:true, source:"User screenshot from Kingshot calendar", days:[{event:"Truegold Wonders", category:"Event/Pack", type:"Event", icon:"✨", packs:[{name:"Truegold Wonders", type:"Event", note:"Screenshot calendar item"},{name:"Custom Forging Set", type:"Pack", note:"Screenshot calendar item"}], prep:"Screenshot date: June 15."},{event:"Truegold Wonders", category:"Event/Pack", type:"Event", icon:"✨", packs:[{name:"Truegold Wonders", type:"Event", note:"Screenshot calendar item"},{name:"Governor Stamina", type:"Pack", note:"Screenshot calendar item"}], prep:"Screenshot date: June 16."},{event:"Truegold Wonders", category:"Event/Pack", type:"Event", icon:"✨", packs:[{name:"Truegold Wonders", type:"Event", note:"Screenshot calendar item"},{name:"Charm Craftsman", type:"Pack", note:"Screenshot calendar item"},{name:"Troop Training", type:"Pack", note:"Screenshot calendar item"},{name:"Additional item hidden in screenshot", type:"More", note:"Screenshot shows +1 more; verify by expanding this day on Kingshot."}], prep:"Screenshot date: June 17."},{event:"Truegold Wonders", category:"Event/Pack", type:"Event", icon:"✨", packs:[{name:"Truegold Wonders", type:"Event", note:"Screenshot calendar item"},{name:"Charm Craftsman", type:"Pack", note:"Screenshot calendar item"},{name:"Troop Training", type:"Pack", note:"Screenshot calendar item"},{name:"Additional items hidden in screenshot", type:"More", note:"Screenshot shows +4 more; verify by expanding this day on Kingshot."}], prep:"Screenshot date: June 18."},{event:"Truegold Wonders", category:"Event/Pack", type:"Event", icon:"✨", packs:[{name:"Truegold Wonders", type:"Event", note:"Screenshot calendar item"},{name:"Top Governor - Governor Gear", type:"Pack", note:"Screenshot calendar item"},{name:"Hall of Governors", type:"Pack", note:"Screenshot calendar item"},{name:"Additional items hidden in screenshot", type:"More", note:"Screenshot shows +5 more; verify by expanding this day on Kingshot."}], prep:"Screenshot date: June 19."},{event:"Truegold Wonders", category:"Event/Pack", type:"Event", icon:"✨", packs:[{name:"Truegold Wonders", type:"Event", note:"Screenshot calendar item"},{name:"Top Governor - Governor Gear", type:"Pack", note:"Screenshot calendar item"},{name:"Hall of Governors", type:"Pack", note:"Screenshot calendar item"},{name:"Additional items hidden in screenshot", type:"More", note:"Screenshot shows +3 more; verify by expanding this day on Kingshot."}], prep:"Screenshot date: June 20."},{event:"Wishful Emporium", category:"Pack", type:"Pack", icon:"🧞", packs:[{name:"Wishful Emporium", type:"Pack", note:"Screenshot calendar item"},{name:"Top Governor - Governor Gear", type:"Pack", note:"Screenshot calendar item"},{name:"Hall of Governors", type:"Pack", note:"Screenshot calendar item"},{name:"Additional items hidden in screenshot", type:"More", note:"Screenshot shows +2 more; verify by expanding this day on Kingshot."}], prep:"Screenshot date: June 21."}]}
  ];

  var lastCalendarGridKey = '';

  function toUtcMidnight(d){ return Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()); }
  function parseAnchor(){
    try{
      var saved = localStorage.getItem(STORAGE_ANCHOR);
      var savedVersion = localStorage.getItem(STORAGE_VERSION);
      if(saved && savedVersion === CALENDAR_VERSION && !isNaN(Date.parse(saved))) return new Date(saved);
    }catch(e){}
    return new Date(DEFAULT_ANCHOR);
  }
  function setAnchorForCurrentPosition(weekIndex, dayIndex){
    var now = new Date();
    var today = toUtcMidnight(now);
    var cycleOffset = (weekIndex * 7) + dayIndex;
    var anchor = new Date(today - (cycleOffset * MS_DAY));
    try{
      localStorage.setItem(STORAGE_ANCHOR, anchor.toISOString());
      localStorage.setItem(STORAGE_VERSION, CALENDAR_VERSION);
    }catch(e){}
    return anchor;
  }
  function resetAnchor(){ try{ localStorage.removeItem(STORAGE_ANCHOR); localStorage.removeItem(STORAGE_VERSION); }catch(e){} }
  function getState(date){
    var now = date || new Date();
    var anchor = parseAnchor();
    var anchorMid = toUtcMidnight(anchor);
    var todayMid = toUtcMidnight(now);
    var daysSince = Math.floor((todayMid - anchorMid) / MS_DAY);
    var normalized = ((daysSince % 28) + 28) % 28;
    var weekIndex = Math.floor(normalized / 7);
    var dayIndex = normalized % 7;
    var day = calendarWeeks[weekIndex].days[dayIndex];
    var nextReset = new Date(todayMid + MS_DAY);
    var tomorrowNorm = (normalized + 1) % 28;
    var tomorrowWeek = Math.floor(tomorrowNorm / 7);
    var tomorrowDay = tomorrowNorm % 7;
    return {
      now: now,
      anchor: anchor,
      weekIndex: weekIndex,
      dayIndex: dayIndex,
      week: calendarWeeks[weekIndex],
      day: day,
      dayName: dayNames[dayIndex],
      shortDayName: shortDayNames[dayIndex],
      nextReset: nextReset,
      nextDay: calendarWeeks[tomorrowWeek].days[tomorrowDay],
      nextDayName: dayNames[tomorrowDay],
      daysSince: daysSince
    };
  }
  function pad(n){ return String(n).padStart(2,'0'); }
  function formatCountdown(ms){
    if(ms < 0) ms = 0;
    var total = Math.floor(ms/1000);
    var h = Math.floor(total/3600); total %= 3600;
    var m = Math.floor(total/60); var s = total % 60;
    return pad(h)+':'+pad(m)+':'+pad(s);
  }
  function utcClock(d){ return pad(d.getUTCHours())+':'+pad(d.getUTCMinutes())+':'+pad(d.getUTCSeconds())+' UTC'; }
  function packsForDay(day){ return dailyPacks.concat(day.packs || []); }
  function daySpecificPacks(day){ return day.packs || []; }
  function dayStripPacks(day){ return (day.packs && day.packs.length ? day.packs : [{name:day.event,type:day.type,note:''}]); }
  function el(id){ return document.getElementById(id); }
  function htmlEscape(str){ return String(str).replace(/[&<>"']/g, function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]; }); }
  function renderPackList(target, packs){
    if(!target) return;
    target.innerHTML = packs.map(function(p){ return '<li><strong>'+htmlEscape(p.name)+'</strong><span>'+htmlEscape(p.type)+(p.note ? ' · '+htmlEscape(p.note) : '')+'</span></li>'; }).join('');
  }
  function renderTodayWidgets(){
    var state = getState();
    var eventName = el('todayEventName');
    if(!eventName) return;
    var packs = packsForDay(state.day);
    eventName.textContent = state.day.icon + ' ' + state.day.event;
    var meta = el('todayEventMeta'); if(meta) meta.textContent = state.week.name+' • '+state.dayName+' • '+state.day.category+' • '+state.day.type;
    var prep = el('todayEventPrep'); if(prep) prep.textContent = state.day.prep;
    var count = el('todayCountdown'); if(count) count.textContent = formatCountdown(state.nextReset - state.now);
    var clock = el('todayUtcNow'); if(clock) clock.textContent = utcClock(state.now);
    var next = el('todayNextEvent'); if(next) next.textContent = 'Next: '+state.nextDayName+' — '+state.nextDay.event;
    var week = el('todayWeekPill'); if(week) week.textContent = state.week.name;
    var source = el('todaySourceNote'); if(source) source.textContent = 'Default tracker reset: Week 1 Monday is May 25, 2026 UTC. Week 2 Monday is Jun 1, 2026 UTC, so Jun 2 becomes Week 2 Tuesday after reset.';
    renderPackList(el('todayPacksList'), packs);
  }
  function renderFullCalendar(){
    var state = getState();
    var title = el('calendarTodayTitle');
    if(!title) return;
    var packs = packsForDay(state.day);
    title.textContent = state.day.icon + ' ' + state.day.event;
    var meta = el('calendarTodayMeta'); if(meta) meta.textContent = state.week.name+' • '+state.dayName+' • '+state.day.category+' • '+state.day.type;
    var prep = el('calendarTodayPrep'); if(prep) prep.textContent = state.day.prep;
    var count = el('calendarCountdown'); if(count) count.textContent = formatCountdown(state.nextReset - state.now);
    var clock = el('calendarUtcNow'); if(clock) clock.textContent = utcClock(state.now);
    var next = el('calendarNextEvent'); if(next) next.textContent = state.nextDayName+' — '+state.nextDay.event;
    renderPackList(el('calendarPacksList'), packs);

    var renderKey = state.weekIndex + '-' + state.dayIndex + '-' + state.anchor.toISOString();
    var grid = el('calendarWeekGrid');
    if(grid && lastCalendarGridKey !== renderKey){
      grid.innerHTML = calendarWeeks.map(function(week, wi){
        var days = week.days.map(function(day, di){
          var active = wi === state.weekIndex && di === state.dayIndex ? ' is-current' : '';
          var verified = week.verified ? ' verified' : '';
          return '<article class="calendar-day-card'+active+verified+'" data-week="'+wi+'" data-day="'+di+'">'
            + '<div class="day-card-top"><span>'+shortDayNames[di]+'</span><em>'+week.name+'</em></div>'
            + '<h3>'+htmlEscape(day.icon+' '+day.event)+'</h3>'
            + '<p>'+htmlEscape(day.category+' • '+day.type)+'</p>'
            + '<div class="day-pack-strip">'+dayStripPacks(day).map(function(p){return '<span>'+htmlEscape(p.name)+'</span>';}).join('')+'</div>'
            + '</article>';
        }).join('');
        return '<section class="calendar-week-panel" data-week-panel="'+wi+'"><div class="week-panel-head"><div><h2>'+week.name+'</h2><p>'+htmlEscape(week.focus)+'</p></div><span>'+(week.verified?'Public seed':'Kingdom editable')+'</span></div><div class="calendar-days-row">'+days+'</div></section>';
      }).join('');
      grid.querySelectorAll('[data-week][data-day]').forEach(function(card){
        card.addEventListener('click', function(){
          setAnchorForCurrentPosition(Number(card.getAttribute('data-week')), Number(card.getAttribute('data-day')));
          lastCalendarGridKey = '';
          renderFullCalendar(); renderTodayWidgets();
        });
      });
      lastCalendarGridKey = renderKey;
    }

    var timeline = el('calendarNextSeven');
    if(timeline && timeline.dataset.renderKey !== renderKey){
      var rows = [];
      for(var i=0;i<7;i++){
        var idx = (((state.weekIndex*7+state.dayIndex+i)%28)+28)%28;
        var wi = Math.floor(idx/7), di = idx%7;
        var d = calendarWeeks[wi].days[di];
        rows.push('<li'+(i===0?' class="active"':'')+'><span>'+shortDayNames[di]+'</span><strong>'+htmlEscape(d.event)+'</strong><em>'+htmlEscape(calendarWeeks[wi].name)+'</em></li>');
      }
      timeline.innerHTML = rows.join('');
      timeline.dataset.renderKey = renderKey;
    }

    var weekSelect = el('calendarWeekSelect');
    var daySelect = el('calendarDaySelect');
    if(weekSelect && daySelect){
      if(!weekSelect.dataset.ready){
        weekSelect.innerHTML = calendarWeeks.map(function(w,i){ return '<option value="'+i+'">'+w.name+'</option>'; }).join('');
        daySelect.innerHTML = dayNames.map(function(d,i){ return '<option value="'+i+'">'+d+'</option>'; }).join('');
        weekSelect.dataset.ready = '1';
      }
      weekSelect.value = String(state.weekIndex);
      daySelect.value = String(state.dayIndex);
    }
  }
  function bindControls(){
    var save = el('saveCalendarPosition');
    if(save && !save.dataset.bound){
      save.dataset.bound='1';
      save.addEventListener('click', function(){
        var wi = Number(el('calendarWeekSelect').value || 0);
        var di = Number(el('calendarDaySelect').value || 0);
        setAnchorForCurrentPosition(wi, di);
        lastCalendarGridKey = '';
        renderFullCalendar(); renderTodayWidgets();
      });
    }
    var reset = el('resetCalendarPosition');
    if(reset && !reset.dataset.bound){
      reset.dataset.bound='1';
      reset.addEventListener('click', function(){
        resetAnchor();
        lastCalendarGridKey = '';
        renderFullCalendar(); renderTodayWidgets();
      });
    }
  }
  function init(){
    bindControls();
    renderTodayWidgets();
    renderFullCalendar();
    setInterval(function(){ renderTodayWidgets(); renderFullCalendar(); }, 1000);
  }
  window.FAMEventCalendar = {weeks:calendarWeeks, dailyPacks:dailyPacks, specialNotes:specialNotes, getState:getState, setAnchorForCurrentPosition:setAnchorForCurrentPosition, resetAnchor:resetAnchor, renderTodayWidgets:renderTodayWidgets, renderFullCalendar:renderFullCalendar};
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function(){ init(); syncLiveCalendar(); }); else { init(); syncLiveCalendar(); }
})();
