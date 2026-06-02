// FAM Events & Packs Calendar v1.2
// Updated from public Kingshot calendar visible snapshot plus FAM K1245 editable fallback data.
// Default baseline: Monday, Week 1 on 2026-04-27 UTC; equivalent to Saturday, Week 3 on 2026-05-16 UTC.
(function(){
  var MS_DAY = 86400000;
  var STORAGE_ANCHOR = 'fam_event_anchor_utc';
  var STORAGE_VERSION = 'fam_event_calendar_version';
  var CALENDAR_VERSION = '2026-06-01-kingshot-calendar-snapshot-v3';
  var DEFAULT_ANCHOR = '2026-04-27T00:00:00Z';
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
    {name:'Pet Chests', type:'Daily available', note:'Listed on the public Kingshot calendar as daily available.'},
    {name:'Gear Enhancement', type:'Daily available', note:'Listed on the public Kingshot calendar as daily available.'}
  ];

  var specialNotes = [
    'Governor Stamina Pack: available for 3 days during Cesares Fury.',
    'Does not include Custom Pet Chests or Enhance Gear unless those packs are explicitly listed for the day.',
    'Use the week/day selector if your kingdom is offset from the default K1245 anchor.'
  ];

  var calendarWeeks = [
    {
      name:'Week 1', tone:'pink', focus:'Public Kingshot visible snapshot — alliance events + pack windows', verified:true,
      source:'Kingshot.net visible calendar snapshot',
      days:[
        {
          event:'Alliance Championship',
          category:'Alliance',
          type:'Event',
          icon:'🏆',
          packs:[],
          prep:'Set teams, lanes, rally/garrison assignments, and healing rules before reset.'
        },
        {
          event:'Alliance Brawl',
          category:'Alliance',
          type:'Event',
          icon:'🥊',
          packs:[],
          prep:'Push alliance brawl objectives early and avoid wasting attempts after reset.'
        },
        {
          event:'Swordland Showdown',
          category:'PvP',
          type:'Event',
          icon:'⚔️',
          packs:[],
          prep:'Confirm teleport discipline, building priority, rally leads, and re-entry timing.'
        },
        {
          event:'Armament Competition 1',
          category:'Growth',
          type:'Event',
          icon:'🛡️',
          packs:[],
          prep:'Spend only the matching armament/gear items while the scoring window is active.'
        },
        {
          event:'Champagne Fair',
          category:'Pack/Event',
          type:'Pack',
          icon:'🍾',
          packs:[{name:'Champagne Fair', type:'Event pack', note:'Shown on the public calendar.'}],
          prep:'Check value before buying; prioritize bottlenecks instead of random power.'
        },
        {
          event:'Custom Selection',
          category:'Pack',
          type:'Pack',
          icon:'🎁',
          packs:[{name:'Custom Selection', type:'Event pack', note:'Shown on the public calendar.'}],
          prep:'Pick items tied to your current bottleneck.'
        },
        {
          event:'Combat Medic',
          category:'Pack',
          type:'Pack',
          icon:'⛑️',
          packs:[{name:'Combat Medic', type:'Event pack', note:'Shown on the public calendar.'}],
          prep:'Best value only during heavy healing/battle windows.'
        }
      ]
    },
    {
      name:'Week 2', tone:'violet', focus:'Sanctuary + armament/officer rotation — FAM editable fallback', verified:false,
      source:'FAM editable fallback; update data/events.json if Kingshot changes this week',
      days:[
        {
          event:'Sanctuary Battle',
          category:'Alliance',
          type:'Event',
          icon:'🏰',
          packs:[],
          prep:'Confirm rally leads, garrison leads, timers, and lane assignments.'
        },
        {
          event:'Cesares Fury',
          category:'PvE',
          type:'Event',
          icon:'🐺',
          packs:[{name:'Governor Stamina Pack', type:'Special 3-day pack', note:'Special note from the public calendar.'}],
          prep:'Use stamina after reset and coordinate alliance rally participation.'
        },
        {
          event:'Officer Project 1',
          category:'Growth',
          type:'Event',
          icon:'📜',
          packs:[],
          prep:'Hold officer/charm/project materials until this scoring window is active.'
        },
        {
          event:'Armament Competition 2',
          category:'Growth',
          type:'Event',
          icon:'🛡️',
          packs:[],
          prep:'Use matching armament upgrades only during the correct scoring variant.'
        },
        {
          event:'Golden Glaives',
          category:'Growth',
          type:'Event',
          icon:'⚜️',
          packs:[],
          prep:'Check milestone value before spending rare items.'
        },
        {
          event:'Fishing Tournament',
          category:'Event',
          type:'Event',
          icon:'🎣',
          packs:[],
          prep:'Use attempts consistently and claim rewards before reset.'
        },
        {
          event:'Officer Project 2',
          category:'Growth',
          type:'Event',
          icon:'📜',
          packs:[],
          prep:'Save project/charm materials for the matching score day.'
        }
      ]
    },
    {
      name:'Week 3', tone:'rose', focus:'Alliance pressure + pets/pack windows — FAM editable fallback', verified:false,
      source:'FAM editable fallback; default K1245 anchor was Saturday Week 3 on 2026-05-16 UTC',
      days:[
        {
          event:'Alliance Championship',
          category:'Alliance',
          type:'Event',
          icon:'🏆',
          packs:[],
          prep:'Refresh teams and make sure all assigned members are registered.'
        },
        {
          event:'Alliance Brawl',
          category:'Alliance',
          type:'Event',
          icon:'🥊',
          packs:[],
          prep:'Push alliance objectives and finish daily brawl tasks early.'
        },
        {
          event:'Swordland Showdown',
          category:'PvP',
          type:'Event',
          icon:'⚔️',
          packs:[],
          prep:'Set roles before battle starts; late assignments lose buildings.'
        },
        {
          event:'Armament Competition 1',
          category:'Growth',
          type:'Event',
          icon:'🛡️',
          packs:[],
          prep:'Score armament upgrades only if this variant is active.'
        },
        {
          event:'Beast Whisperer',
          category:'Pets',
          type:'Event',
          icon:'🦊',
          packs:[{name:'Pet Chests', type:'Daily available', note:'Public calendar daily pack.'}],
          prep:'Save pet marks and beast materials for scoring.'
        },
        {
          event:'Custom Selection',
          category:'Pack',
          type:'Pack',
          icon:'🎁',
          packs:[{name:'Custom Selection', type:'Event pack', note:'Selection pack window.'}],
          prep:'Choose bottleneck items only.'
        },
        {
          event:'Combat Medic',
          category:'Pack',
          type:'Pack',
          icon:'⛑️',
          packs:[{name:'Combat Medic', type:'Event pack', note:'Healing/combat support pack window.'}],
          prep:'Better during battle weeks than quiet growth weeks.'
        }
      ]
    },
    {
      name:'Week 4', tone:'dark', focus:'KvK / Kingdom of Power planning — FAM editable fallback', verified:false,
      source:'FAM editable fallback; verify in-game before KvK spend',
      days:[
        {
          event:'Kingdom of Power Prep I — City Construction',
          category:'KvK',
          type:'Event',
          icon:'👑',
          packs:[],
          prep:'Use construction speedups/upgrades only if this prep day is active.'
        },
        {
          event:'Kingdom of Power Prep II — Research',
          category:'KvK',
          type:'Event',
          icon:'📚',
          packs:[],
          prep:'Save research speedups and big tech completions for this day.'
        },
        {
          event:'Kingdom of Power Prep III — Hero Development',
          category:'KvK',
          type:'Event',
          icon:'⭐',
          packs:[],
          prep:'Use hero shards, recruitment, and hero XP when this day scores.'
        },
        {
          event:'Kingdom of Power Prep IV — Troop Training',
          category:'KvK',
          type:'Event',
          icon:'🪖',
          packs:[],
          prep:'Train/promote troops with speedups during this scoring window.'
        },
        {
          event:'Kingdom of Power Prep V — Pets / Beast',
          category:'KvK',
          type:'Event',
          icon:'🐾',
          packs:[{name:'Pet Chests', type:'Daily available', note:'Public calendar daily pack.'}],
          prep:'Save pet marks and beast materials for this scoring day.'
        },
        {
          event:'Kingdom of Power Battle / All Out',
          category:'PvP',
          type:'Event',
          icon:'🔥',
          packs:[{name:'Combat Medic', type:'Battle support', note:'May be useful around heavy combat windows.'}],
          prep:'Shield before battle opens, empty resources, and keep hospital space ready.'
        },
        {
          event:'Recovery + Reward Claim',
          category:'Cooldown',
          type:'Planning',
          icon:'📦',
          packs:[],
          prep:'Claim rewards, heal safely, rebuild resources, and prep for next rotation.'
        }
      ]
    }
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
    var source = el('todaySourceNote'); if(source) source.textContent = 'Default tracker: Week 1 Monday on Apr 27, 2026 UTC, matching Saturday Week 3 on May 16, 2026 UTC. Use Events & Packs to recalibrate if K1245 is offset.';
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
            + '<div class="day-pack-strip">'+packsForDay(day).map(function(p){return '<span>'+htmlEscape(p.name)+'</span>';}).join('')+'</div>'
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
