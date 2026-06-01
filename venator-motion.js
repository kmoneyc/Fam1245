// FAM v4.25 cinematic scroll + card animation layer
(function(){
  "use strict";

  function ready(fn){
    if(document.readyState === "loading") document.addEventListener("DOMContentLoaded", fn);
    else fn();
  }

  function markRevealTargets(){
    var selectors = [
      ".page-header",
      ".page-search",
      ".alert",
      ".section-label",
      ".today-board",
      ".command-category",
      ".home-card",
      ".qr-card",
      ".expandable",
      ".calc-tile",
      ".calc-category-section",
      ".calc-card",
      ".tool-card",
      ".sim-card",
      ".sim-panel",
      ".opt-card",
      ".opt-panel",
      ".planner-card",
      ".result-panel",
      ".calendar-hero",
      ".calendar-control-panel",
      ".changelog-entry",
      ".data-table-wrap"
    ];
    document.querySelectorAll(selectors.join(",")).forEach(function(el, index){
      if(el.dataset.revealReady === "1") return;
      el.dataset.revealReady = "1";
      el.classList.add("reveal-on-scroll");
      el.style.setProperty("--reveal-delay", Math.min(index % 8, 7) * 45 + "ms");
    });
  }

  function setupReveal(){
    markRevealTargets();
    if(!("IntersectionObserver" in window)){
      document.querySelectorAll(".reveal-on-scroll").forEach(function(el){el.classList.add("is-visible");});
      return;
    }
    var observer = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, {threshold:0.12, rootMargin:"0px 0px -45px 0px"});

    document.querySelectorAll(".reveal-on-scroll").forEach(function(el){observer.observe(el);});
  }

  function setupTilt(){
    var cards = ".home-card,.command-category,.qr-card,.calc-tile,.tool-card,.sim-card,.opt-card,.today-card";
    document.querySelectorAll(cards).forEach(function(card){
      if(card.dataset.tiltReady === "1") return;
      card.dataset.tiltReady = "1";
      card.addEventListener("mousemove", function(e){
        if(window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        var rect = card.getBoundingClientRect();
        var x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
        var y = ((e.clientY - rect.top) / rect.height - 0.5) * -8;
        card.style.setProperty("--tilt-x", y.toFixed(2) + "deg");
        card.style.setProperty("--tilt-y", x.toFixed(2) + "deg");
        card.classList.add("is-tilting");
      });
      card.addEventListener("mouseleave", function(){
        card.classList.remove("is-tilting");
        card.style.removeProperty("--tilt-x");
        card.style.removeProperty("--tilt-y");
      });
    });
  }


  function setupThemeGuide(){
    var key = "fam_theme_guide_seen_v1";
    try{
      if(localStorage.getItem(key) === "1") return;
    }catch(e){}
    var themeBtn = document.querySelector("[data-theme-toggle]");
    if(!themeBtn) return;

    setTimeout(function(){
      if(document.querySelector(".theme-guide-popover")) return;
      themeBtn.classList.add("theme-guide-highlight");
      var pop = document.createElement("div");
      pop.className = "theme-guide-popover";
      pop.setAttribute("role","dialog");
      pop.setAttribute("aria-label","Theme guide");
      pop.innerHTML =
        '<strong>Choose your look</strong>' +
        '<p>Tap the moon theme button to switch between Light, Fire, and Purple themes. Your choice is saved for next time.</p>' +
        '<div class="theme-guide-actions">' +
          '<button type="button" class="theme-guide-try">Change theme</button>' +
          '<button type="button" class="theme-guide-dismiss">Got it</button>' +
        '</div>';
      document.body.appendChild(pop);

      function closeGuide(){
        themeBtn.classList.remove("theme-guide-highlight");
        if(pop && pop.parentNode) pop.parentNode.removeChild(pop);
        try{localStorage.setItem(key,"1");}catch(e){}
      }

      pop.querySelector(".theme-guide-try").addEventListener("click", function(){
        if(window.FAM_THEME && typeof window.FAM_THEME.toggle === "function") window.FAM_THEME.toggle();
        closeGuide();
      });
      pop.querySelector(".theme-guide-dismiss").addEventListener("click", closeGuide);
      setTimeout(function(){
        if(document.body.contains(pop)) closeGuide();
      }, 13000);
    }, 900);
  }

  function setupScrollPrompt(){
    document.querySelectorAll("[data-scroll-next]").forEach(function(btn){
      btn.addEventListener("click", function(){
        var target = document.querySelector(".section-label-primary,.calc-category-section,.page-search");
        if(target) target.scrollIntoView({behavior:"smooth", block:"start"});
      });
    });
  }

  function setupPageRefresh(){
    var original = window.showPage;
    if(typeof original === "function" && !window.__famShowPageAnimated){
      window.__famShowPageAnimated = true;
      window.showPage = function(){
        var result = original.apply(this, arguments);
        setTimeout(function(){
          markRevealTargets();
          document.querySelectorAll(".page.active .reveal-on-scroll").forEach(function(el){
            el.classList.remove("is-visible");
            requestAnimationFrame(function(){ el.classList.add("is-visible"); });
          });
          setupTilt();
          window.scrollTo({top:0, behavior:"smooth"});
        }, 40);
        return result;
      };
    }
  }

  ready(function(){
    setupReveal();
    setupTilt();
    setupScrollPrompt();
    setupPageRefresh();
    setupThemeGuide();
  });
})();