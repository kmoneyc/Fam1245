(function(){
  function setupCalculatorHub(){
    var search=document.querySelector('[data-calc-search]');
    var chips=[].slice.call(document.querySelectorAll('[data-calc-filter]'));
    var tiles=[].slice.call(document.querySelectorAll('[data-calc-card]'));
    if(!tiles.length) return;
    var active='all';
    function apply(){
      var q=(search&&search.value||'').trim().toLowerCase();
      var visible=0;
      tiles.forEach(function(tile){
        var cats=(tile.getAttribute('data-category')||'').toLowerCase();
        var text=tile.textContent.toLowerCase();
        var matchCat=active==='all' || cats.indexOf(active)>-1;
        var matchQ=!q || text.indexOf(q)>-1;
        var show=matchCat && matchQ;
        tile.style.display=show?'flex':'none';
        if(show) visible++;
      });
      var count=document.querySelector('[data-calc-count]');
      if(count) count.textContent=visible+' tool'+(visible===1?'':'s')+' shown';
    }
    chips.forEach(function(chip){
      chip.addEventListener('click',function(){
        active=chip.getAttribute('data-calc-filter')||'all';
        chips.forEach(function(c){c.classList.toggle('active',c===chip);});
        apply();
      });
    });
    if(search) search.addEventListener('input',apply);
    apply();
  }
  function setupGenericTabs(){
    document.querySelectorAll('[data-tab-group]').forEach(function(group){
      var name=group.getAttribute('data-tab-group');
      var buttons=[].slice.call(document.querySelectorAll('[data-tab-btn="'+name+'"]'));
      var panels=[].slice.call(document.querySelectorAll('[data-tab-panel="'+name+'"]'));
      buttons.forEach(function(btn){
        btn.addEventListener('click',function(){
          var target=btn.getAttribute('data-tab-target');
          buttons.forEach(function(b){b.classList.toggle('active',b===btn);});
          panels.forEach(function(p){p.classList.toggle('active',p.getAttribute('data-tab-id')===target);});
        });
      });
    });
  }
  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',function(){setupCalculatorHub();setupGenericTabs();});
  }else{setupCalculatorHub();setupGenericTabs();}
})();
