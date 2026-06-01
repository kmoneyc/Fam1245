(function(){
  var KEY='fam_theme';
  var THEMES=['pink','fire','purple'];
  var CONFIG={
    pink:{label:'Light', icon:'☾', color:'#fff7fb', title:'Switch theme'},
    fire:{label:'Fire', icon:'☾', color:'#151313', title:'Switch theme'},
    purple:{label:'Purple', icon:'☾', color:'#17151f', title:'Switch theme'}
  };

  function valid(theme){
    return THEMES.indexOf(theme) >= 0 ? theme : 'pink';
  }

  function current(){
    try{return valid(localStorage.getItem(KEY)||'pink');}
    catch(e){return 'pink';}
  }

  function applyTheme(theme){
    theme = valid(theme);
    document.documentElement.setAttribute('data-theme', theme);
    if(document.body) document.body.setAttribute('data-theme', theme);
    var meta=document.querySelector('meta[name="theme-color"]');
    if(meta) meta.setAttribute('content', CONFIG[theme].color);

    document.querySelectorAll('[data-theme-toggle]').forEach(function(btn){
      btn.setAttribute('aria-pressed', theme !== 'pink' ? 'true' : 'false');
      btn.setAttribute('data-current-theme', theme);
      var icon=btn.querySelector('[data-theme-icon]');
      var label=btn.querySelector('[data-theme-label]');
      if(icon) icon.textContent = CONFIG[theme].icon;
      if(label) label.textContent = CONFIG[theme].label;
      btn.setAttribute('title', CONFIG[theme].title + ' · current: ' + CONFIG[theme].label);
      btn.setAttribute('aria-label', 'Toggle color theme. Current theme: ' + CONFIG[theme].label);
    });
  }

  function nextTheme(){
    var theme = valid(document.documentElement.getAttribute('data-theme') || current());
    var index = THEMES.indexOf(theme);
    return THEMES[(index + 1) % THEMES.length];
  }

  function toggleTheme(){
    var next = nextTheme();
    try{localStorage.setItem(KEY,next);}catch(e){}
    applyTheme(next);
  }

  function setup(){
    applyTheme(current());
    document.querySelectorAll('[data-theme-toggle]').forEach(function(btn){
      if(btn.dataset.themeReady === '1') return;
      btn.dataset.themeReady='1';
      btn.addEventListener('click',toggleTheme);
    });
  }

  window.FAM_THEME={apply:applyTheme,toggle:toggleTheme,current:current,themes:THEMES};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',setup);else setup();
})();