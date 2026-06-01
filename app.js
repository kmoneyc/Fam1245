// ═══ FAM GUIDE v4.1 JS ═══
var K1245_BIRTH = new Date(2025, 10, 5);
function getServerAge() { return Math.floor((new Date() - K1245_BIRTH) / 86400000); }

var STOPWORDS = new Set(['the','a','an','is','are','was','were','be','do','does','did','have','has','had','will','would','could','should','what','which','where','when','how','why','who','that','this','and','or','but','for','of','in','on','at','to','with','my','your','our','their','i','me','we','you','he','she','it','they','le','la','les','un','une','des','du','de','et','ou','est','sont','mon','ma','mes','nous','vous','el','los','las','es','mi','tu','su','en','con','para','por','que','lo','bir','bu','ve','da','ben','sen','ne','ki','var','hai','ka','ko','se','ke']);

function tokenize(str) {
  return str.toLowerCase().replace(/[^a-z0-9\u00C0-\u024F\u0900-\u097F\s\-']/g,' ').split(/\s+/).filter(function(w){return w.length>1&&!STOPWORDS.has(w);});
}

var QA_INDEX = [
{title:'Events & Packs Calendar',section:'home',answer:'Use the Events & Packs calendar for live UTC day tracking, current event, available packs, and the 4-week rotation. Open it from the home page or Calculators hub.',tags:['event calendar','packs','today event','current event','calendar','utc reset','what pack today']},
{title:'Bear Hunt - Overview',section:'bear',answer:'Bear Hunt runs every 2 days for 30 minutes. Goal: deal maximum damage. Max reward = 1.2B total alliance damage.',tags:['bear','bear hunt','pitfall','forgehammer','ours','chasse','caza','oso','damage','rewards','score','points','nasil','kaise','kayf']},
{title:'Bear Hunt - Best Joiner Hero',section:'bear',answer:'First slot must be Chenko or Amaine. They give Lethality and Attack buffs. Never use Gordon or Jabel.',tags:['chenko','amaine','joiner','join rally','first hero','first slot','lethality','who to send bear','yeonwoo','margot','kahraman','batal']},
{title:'Bear Hunt - Best Formation',section:'bear',answer:'Gen 3 leaders: 10/20/70. Joiners: max archers (10/10/80+). Gen 4+: 1/10/89. Archers deal +10% vs Bear.',tags:['bear formation','ratio bear','10 20 70','1 10 89','archer bear','how many archers','okcu','teerchi']},
{title:'Bear Hunt - Moose is Useless',section:'bear',answer:'Do NOT use Moose for Bear. Bear has no Health bar. Moose skill = zero damage. Use Mighty Bison instead.',tags:['moose bear','moose useless','pet bear','which pet bear','mighty bison','lion pet bear']},
{title:'Bear Hunt - Coordination',section:'fam',answer:'FAM uses the name-call method: type "next" in chat after each rally notification.',tags:['bear coordination','bear rotation','name call','next bear','order rally']},
{title:'Rally Joiner - How It Works',section:'quickref',answer:'Only your first slot hero FIRST SKILL matters when joining. Your gear, charms, pets = zero as joiner.',tags:['joiner','join rally','how join','first hero slot','rally mechanics','katilimci','jundi']},
{title:'Garrison Joiner Setup',section:'quickref',answer:'Best: Chenko, Amane, Saul, Fahd. Formation: 60/20/20.',tags:['garrison joiner','garnison','how garrison','garrison setup','kale','qila','garnizon']},
{title:'Rally - Why Hero Kicked?',section:'quickref',answer:'Rally takes top 4 highest-level joiner skills. Level 5 Gordon kicks Level 4 Chenko. Check yellow flag.',tags:['hero kicked','kicked rally','yellow flag','joiner kicked','hero replaced']},
{title:'Widget - When Does It Work?',section:'quickref',answer:'Widgets only work for LEADER. Zero for joiners. NOT in solo. Upgrade at 2-4-6-8-10 only.',tags:['widget','widget works','widget rally','widget solo','does widget work','widget upgrade','2 4 6 8 10']},
{title:'Formation - Attack',section:'quickref',answer:'General attack: 50/20/30. If enemy inf-heavy: 30/20/50.',tags:['formation attack','attack troops','50 20 30','saldiri','hujum']},
{title:'Counter System',section:'quickref',answer:'Infantry beats Cavalry. Cavalry beats Archers. Archers beat Infantry. Cavalry 20% chance to bypass Infantry.',tags:['counter','counter system','who beats who','infantry cavalry archer','triangle','20%']},
{title:'Troop Training - When?',section:'kvk',answer:'Save training speedups for KvK Day 4. Outside KvK, train continuously.',tags:['train troops','when train','training speedup','best time train','egitim']},
{title:'Troop Promotion T9-T10',section:'power',answer:'Promotion is more efficient than training fresh. Barracks > Promotion tab. Earns KvK Day 4 points.',tags:['promote','promotion','t9 t10','upgrade troops','terfi']},
{title:'Swordland - Overview',section:'events',answer:'1-hour alliance PvP battle. Capture buildings for Relic Points. Troops injured only.',tags:['swordland','sword','relic points','pvp event','kilic','talwar']},
{title:'Swordland - Which Building?',section:'events',answer:'Royal Stables first (50% TP reduction), then Sanctums, then Bell Tower. Swordshrine at 15 min.',tags:['which building swordland','royal stables','sanctum','swordshrine','hall reformation','bell tower']},
{title:'Swordland - Heal Reset',section:'events',answer:'Leave battlefield, heal, rejoin after ~12 minutes free.',tags:['leave swordland','heal swordland','free heal','rejoin']},
{title:'Swordland - Never Leave',section:'events',answer:'Leave completely = ZERO rewards. Stay for the TALLY.',tags:['leave battle','zero rewards','tally']},
{title:'Swordland - Hall of Reformation',section:'events',answer:'+15% Attack AND +15% Damage Reduction for your team. Unlocks minute 15.',tags:['hall reformation','15%','attack buff swordland','damage reduction']},
{title:'Swordland - Arsenal Supplies',section:'events',answer:'Points drop on ground when building changes hands. Collect them.',tags:['arsenal supplies','scattered points','drop points','collect points']},
{title:'TAC - Phases',section:'events',answer:'1 hour: Prep(3min) > Seize(17min) > Garrison(20min, +1800pts/min) > Temple(20min, 50k bonus).',tags:['tac','tri alliance','phases tac','garrison tac','temple tac']},
{title:'TAC - Temple of Tides',section:'events',answer:'Opens minute 40. 50,000 points. Rush it. Need A29/B29/C29.',tags:['temple','temple tides','50000','50k','a29 b29 c29']},
{title:'TAC - Buffs Dont Work',section:'events',answer:'Speed/capacity/size buffs NOT in TAC. Troops unlimited. Tier = research.',tags:['buffs tac','speed buff tac','unlimited troops','do buffs work']},
{title:'KvK - What to Save',section:'fam',answer:'Construction speedups(D1), research(D2), hero shards+roulette(D3), training speedups(D4), pet marks(D5).',tags:['kvk save','what save kvk','speedups kvk','before kvk','hazirlik','tayyari']},
{title:'KvK - Matchmaking',section:'kvk',answer:'Uses highest historical power. Shedding power does NOT help. Developer confirmed.',tags:['matchmaking kvk','power kvk','shed power','historical power','eslesme']},
{title:'KvK - Battle Phase',section:'kvk',answer:'10:00-22:00 UTC Saturday. Shield before 10:00 UTC.',tags:['kvk battle time','when kvk','saturday kvk','utc kvk','shield kvk']},
{title:'Healing - No Speedup Trick',section:'fam',answer:'Heal 200-400 troops at a time. Spam heal button = no speedups needed.',tags:['heal','healing','batch heal','how heal no speedup','heal free','tedavi','ilaj']},
{title:'Infirmary Full',section:'fam',answer:'Full infirmary = excess troops die permanently. Monitor space.',tags:['infirmary full','troops die','hospital full','overflow','hastane']},
{title:'Pet Priority - F2P',section:'pets',answer:'1.Lion 2.Mighty Bison 3.Bison 4.Cheetah 5.Rhino 6.Bear. Lynx=Level 20 stop.',tags:['pet priority','best pet','which pet','lion pet','mighty bison','pet f2p','hayvan','janwar']},
{title:'Pet Priority - Spender',section:'pets',answer:'1.Mighty Bison 2.Rhino 3.Bear 4.Moose 5.Lion 6.Bison. Lynx=20.',tags:['pet spender','whale pet','best pet spender','p2w pet']},
{title:'Lynx - Stop at 20',section:'pets',answer:'Level 20 only. Unlocks 4 daily Pet Adventures. Stop permanently.',tags:['lynx','lynx level','lynx stop','lynx 20','vasak']},
{title:'Cheetah - Why Level?',section:'pets',answer:'Level 20 ASAP. Generates pet food for all pets every 2 hours.',tags:['cheetah','pet food','generate pet food','why cheetah','cita']},
{title:'Pet Refinement Stats',section:'pets',answer:'Priority: 1.Inf Health 2.Arc Lethality 3.Cav Lethality 4.Cav Health 5.Inf Lethality 6.Arc Health.',tags:['refinement','taming marks','pet stats','infantry health','archer lethality','islah']},
{title:'Pet - Leader Only in Rally',section:'pets',answer:'Only RALLY LEADER pets count. Joiner pets = zero.',tags:['pet rally','does my pet help','joiner pet']},
{title:'Gen 3 Heroes',section:'heroes',answer:'Attack: Amadeus/Petra/Marlin. Bear: Helga/Petra/Marlin. Garrison: Eric/Hilde/Jaeger.',tags:['gen 3 hero','which hero','best hero','petra','helga','eric']},
{title:'Gen 4 Heroes',section:'heroes',answer:'Rosa (Archer, Roulette), Alcar (Infantry, KvK), Margot (Cavalry, HoH). Save gems for Rosa.',tags:['gen 4 hero','rosa','alcar','margot','new hero','when gen 4']},
{title:'Hero Skill Upgrade',section:'heroes',answer:'JOIN rallies: only upgrade first expedition skill. LEAD: upgrade all.',tags:['upgrade skill','skill book','first skill','expedition skill','beceri']},
{title:'Hero Gear Priority',section:'gear',answer:'Hero Gear unlocks at TC15 and matters when you lead. Enhancement can use XP parts or spare gear; gear XP values: Gray 10, Green 30, Blue 60, Purple 150. Mastery Forging needs TC20 + Gold Gear Lv20 and uses Forgehammers. Concentrate on main rally/garrison heroes.',tags:['gear priority','what upgrade gear','hero gear','infantry gloves','archer helmet','mithril','forgehammers','mastery forging']},
{title:'Widget Level',section:'gear',answer:'2-4-6-8-10 ONLY. Skip odd. Multiplicative = strongest boost.',tags:['widget upgrade','widget level','widget 2 4 6 8 10','widget strongest']},
{title:'Gov Gear & Charms',section:'gear',answer:'Governor Gear unlocks at TC22 and Governor Charms at TC25. Hood/Necklace = Cavalry Attack/Defense, Cloak/Breaches = Infantry Attack/Defense, Ring/Staff = Archer Attack/Defense. Charms add Health/Lethality. Artisan\'s Vision is required after Blue gear and is a major bottleneck.',tags:['gov gear','governor gear','charms','optimizer','offense build','imbuement','satin','gilded threads','artisan vision','charm guide','charm design']},
{title:'How to Increase Power',section:'power',answer:'Hero Gear > Pets > Gov Gear > Research. Troop power inflates matchmaking.',tags:['increase power','how get stronger','power fast','grow power','guc','taqat','kuvvet']},
{title:'F2P - How to Compete',section:'power',answer:'Join rallies. Rush TC30. Max Chenko/Amaine. Save gems for Roulette. Lion pet + Mystic Trial.',tags:['f2p','free to play','how compete','beginner','ucretsiz','muft']},
{title:'Research Priority',section:'power',answer:'1.Squad Lethality 2.Squad Health 3.Inf Attack 4.Arc Attack. Skip defense research.',tags:['research','research priority','academy','battle tech','arastirma']},
{title:'Truegold Crucible',section:'timeline',answer:'Day 150. Free to build. 5 refinements/day = ~10.5 TG daily.',tags:['crucible','truegold','daily refinement','tg5']},
{title:'Truegold Build Priority',section:'timeline',answer:'Town Center > Barracks/Range/Stable > Command Center.',tags:['truegold build','truegold priority','town center','barracks']},
{title:'Strongest Governor',section:'events',answer:'Focus milestones not leaderboard. Time building/research finishes during event. KvK overlap = double value.',tags:['strongest governor','milestones','kvk overlap','en guclu']},
{title:'All Out Kill Event',section:'events',answer:'Fight fully or shield completely. Only attack within +/-3 TC levels.',tags:['all out','kill event','shield','fight or shield','oldurme']},
{title:'Viking Invasion',section:'events',answer:'Empty city. Send troops to reinforce allies. Keep best heroes home. Dont heal during event.',tags:['viking','viking invasion','empty city','reinforce viking']},
{title:'Viking HQ Waves',section:'events',answer:'HQ on Waves 10 and 20. Recall march after Wave 9, garrison HQ, return after.',tags:['hq viking','wave 10','wave 20','garrison hq']},
{title:"Eternity's Reach",section:'events',answer:'Skill path R,R,L,L,R. Every 60s: occupy vein for 5k copper. Kill Cesari. Rush Fracture Veins.',tags:["eternity's reach","copper","vein","5000 copper","fracture","cesari","r r l l r"]},
{title:'Alliance Championship',section:'events',answer:'50/20/30. Activate buffs BEFORE registering (snapshot). 2-1 lane strategy.',tags:['alliance championship','register championship','50 20 30','lane strategy','snapshot']},
{title:'Championship Shop',section:'events',answer:"Artisan's Vision is the Governor Gear bottleneck after Blue. Prioritize it first, then Gilded Threads and Satin depending on your shortage.",tags:["artisan's vision","championship shop","gilded threads","satin","governor gear"]},
{title:'Mystic Trial Formations',section:'events',answer:'Coliseum:50/10/40 Forest:50/15/35 Crystal:60/20/20 Nexus:50/20/30 Molten:60/15/25 Spire:50/15/35.',tags:['mystic trial','trial formation','coliseum','crystal cave','radiant spire']},
{title:'Mithril Shop',section:'events',answer:'Buy Mithril out weekly. Then Enhancement XP > Mythic Shards > Lucky Chests.',tags:['mithril','mystic trial shop','what buy trial']},
{title:'Fishing Strategy',section:'events',answer:'Pause+Retreat to scout without spending attempt. Only mermaids re-roll.',tags:['fishing','mermaid','horn tide']},
{title:'Windward Voyage',section:'events',answer:'Stop merging at Premium tier.',tags:['windward voyage','ship merge','premium tier']},
{title:'Server Timeline',section:'timeline',answer:'Check Timeline page for auto-calculated age and upcoming unlocks.',tags:['what unlocks','upcoming','server age','timeline','when mighty bison','ne zaman','kab']},
{title:'Gen 4 Save',section:'timeline',answer:'Save gems for Rosa, Mythic Shards, Advanced Taming Marks for Mighty Bison.',tags:['gen 4 save','rosa roulette','gems gen 4','shards gen 4']},
{title:'FAM Commands',section:'fam',answer:'HEAL=heal. READY=healed. FILL=fill rallies. GAR=garrison. AT=attack. COMMS LOCK=only WC talks.',tags:['commands','heal command','ready','fill','gar','comms lock','dtk commands']},
{title:'FAM Battle Roles',section:'fam',answer:'War Chief=orders. Deputy=covers WC. Scout=reports. Opportunistic=cap empty buildings.',tags:['role','war chief','deputy','scout','opportunistic','what do i do']}
,
{title:'Masters - Overview',section:'masters',answer:'Masters added April 2026, unlocked at Gen 3. Three Masters exist: Pan, Valora, Roman. Each has 4 skills plus a talent.',tags:['masters','pan','valora','roman','april 2026','gen 3']},
{title:'Masters - F2P Priority',section:'masters',answer:'F2P priority: Pan first, Valora second, Roman last. Skip leveling Roman past 30. Pan boosts daily income (Intel Missions, Reserve Chests, Mystery Badges).',tags:['masters f2p','pan priority','f2p masters','which master','valora']},
{title:'Masters - P2W Priority',section:'masters',answer:'P2W priority: Roman or Valora first, Pan last. Roman for Arena, Valora for Bear Trap (extra troops). Pan is left for last because his utility doesnt move battle needle.',tags:['masters p2w','whale masters','roman priority','arena master']},
{title:'Truegold - TG8 vs T11',section:'truegold',answer:'For F2P/low spenders, T10-TG8 beats T11. T10-TG8 has an extra skill that wins 95% of fights vs T11-TG5 and 70% vs T11-TG6. T11 only catches up at TG7.',tags:['tg8','t11','t10','truegold path','which troops','t10 vs t11','tg5 vs tg8']},
{title:'Truegold - Tempered Truegold',section:'truegold',answer:'Tempered Truegold is unlocked at TG8 via Super Refinement in the Truegold Crucible. Cap is 100 refinements per week, resets Monday.',tags:['tempered truegold','super refinement','truegold crucible','tg8 materials']},
{title:'Truegold - Refinement Strategy',section:'truegold',answer:'Optimal strategy: Monday burn all 20 Tier 1 refinements. Tue-Sun do 1 per day in Tier 2 for the half-cost daily discount. Stay out of Tier 3+.',tags:['refinement weekly','tier 1 strategy','monday refinement','tempered weekly','daily refinement']},
{title:'Joiner Mechanics - Basics',section:'joiner',answer:'Only first-slot hero contributes a skill as a joiner. Up to 4 joiner skills per rally. Only joiners with maxed first skills count.',tags:['joiner basics','first slot','joiner skill','rally joiner','how joiners work']},
{title:'Joiner Mechanics - Stacking',section:'joiner',answer:'Same effect ID = additive. Different effect IDs = multiplicative. 4 Chenkos = 2.0 SkillMod. 2 Chenko + 2 Amane = 2.25 SkillMod. Mix IDs for 12.5% more damage.',tags:['joiner stacking','chenko amane','skillmod','effect id','effect_op','damage formula']},
{title:'Joiner Mechanics - Best Combos',section:'joiner',answer:'Best universal joiner combo: Saul + 2 Hilde + Chenko. For Bear: Chenko, Amadeus, Yeonwoo, Amane. Pure defense: Saul + Hilde + Gordon + Fahd.',tags:['best joiner','joiner combo','saul hilde','bear joiner','meta joiner']},
{title:'Joiner Mechanics - Gear Doesnt Matter',section:'joiner',answer:'Joiner gear and stats dont matter. Only the skill ID and percentage matter. No need to put gear on joiner heroes.',tags:['joiner gear','joiner stats','gear for joiner','strip gear bear']},
{title:'Tier List - Rally',section:'tierlist',answer:'S-tier rally heroes: Amadeus, Petra, Marlin, Rosa, Thrud. A-tier: Helga. Widget expedition skill drives rankings.',tags:['rally tier list','best rally hero','amadeus tier','petra tier']},
{title:'Tier List - Garrison',section:'tierlist',answer:'S-tier defenders: Jabel, Zoe, Hilde, Eric, Jaeger, Alcar, Margot, Vivian, Long Fei. A-tier: Saul (one growth skill).',tags:['garrison tier','defender tier','best defender','best garrison']},
{title:'Tier List - Bear Joiner',section:'tierlist',answer:'S-tier Bear joiners: Chenko, Amadeus, Yeonwoo, Amane, Margot, Vivian. Defense joiners are useless in Bear Hunt.',tags:['bear joiner tier','bear hunt heroes','damage joiner','attack joiner']},
{title:'Tri-Alliance Clash - Overview',section:'triclash',answer:'4-stage event, 1 hour Saturday. Prep 3 min, Seize and Conquer 17 min, Garrison Occupation 20 min, Temple Onslaught 20 min.',tags:['tri-alliance clash','tac','clash stages','saturday event']},
{title:'Tri-Alliance Clash - Map Points',section:'triclash',answer:'Garrisons (A24/B24/C24) give 1800 pts/min, 3x a Ruin Cluster. Temple first capture = 50k. A29/B29/C29 connect Transit Hubs to Temple - critical buildings.',tags:['clash map','garrison points','temple points','a29 b29 c29','transit hub']},
{title:'Tri-Alliance Clash - Team Setup',section:'triclash',answer:'Attack team slightly stronger. Two defender teams hold lanes and Garrison. Floaters react to pressure and cut enemy A29/B29/C29 in Stage 3.',tags:['clash teams','attack team','defender team','floater','clash strategy']},
{title:'Tri-Alliance Clash - Captains',section:'triclash',answer:'R4s assign Captains. Captains regenerate way more energy than regular players. Assign early - compounds across the whole event.',tags:['clash captains','r4 captain','energy regen','captain assignment']},
{title:'Kingdom Transfer - Eligibility',section:'transfer',answer:'Target kingdom within 90 days age, same hero gen, same Truegold era. You: under power cap, no combat, no alliance, not King, 25+ days since last transfer, under 4 chars in target.',tags:['transfer eligibility','can i transfer','transfer requirements','kingdom transfer']},
{title:'Kingdom Transfer - Costs',section:'transfer',answer:'Transfer Passes 150,000 Alliance Tokens each. Pass packs $5-$50 monthly. Buy the $5-$50 packs every month, save Passes. $100 packs are whale-only.',tags:['transfer cost','transfer pass','pass packs','alliance tokens transfer']},
{title:'Kingdom Transfer - What Resets',section:'transfer',answer:'Arena resets to 1000 pts. Excess resources over storehouse protection are deleted - secure or spend everything before transfer. Packs reset, some events carry over.',tags:['transfer reset','what carries over','transfer reset arena','resource transfer']},
{title:'Viking Vengeance - Basics',section:'vikings',answer:'20 waves, every 2 weeks Tue and Thu. Kill 50% of a wave to defend. 2 losses and Vikings stop attacking you. Shields dont work.',tags:['viking vengeance','vikings event','20 waves','viking tuesday thursday']},
{title:'Viking Vengeance - Strategy',section:'vikings',answer:'Empty your city, reinforce others. Send out Infantry and Cavalry. Archers can stay. Keep top 3 defensive heroes in Guard Station. Dont heal during event.',tags:['viking strategy','empty city vikings','reinforce vikings','viking heroes']},
{title:'Viking Vengeance - Waves 10 and 20',section:'vikings',answer:'After wave 9/19 fully completes, recall ONE strong march to defend HQ for waves 10/20. Then send it back to reinforce. Dont recall early.',tags:['viking wave 10','wave 20','viking hq','hq waves vikings']}
,
{title:'Governor Gear Materials',section:'gear',answer:"Satin sources include Terror rallies, Beast Slay, Viking Vengeance, Alliance Championship Shop, Swordland, Merchant Empire, Tidal Shop, and packs. Gilded Threads come from Viking, Championship Shop, Swordland, Merchant, Tidal, and packs. Artisan's Vision comes from Armament, Merchant, KoP Prep, Strongest Governor, Swordland/Tidal/KoP shops, Alliance Championship after Gen3, Champagne Fair, War Chant chests, and packs.",tags:['satin','gilded threads','artisan vision','governor gear materials','where get satin','where get vision']},
{title:'Governor Charm Materials',section:'gear',answer:'Charm Guides and Charm Designs come from Eternity\'s Reach, Swordland Shop, Tidal Shop, Kingdom of Power Shop, Strongest Governor, Merchant Empire, Champagne Fair, and packs. Designs also appear in Alliance Brawl, KoP Event, and Officer Project.',tags:['charm guide','charm design','charm materials','where get charms','governor charms']},
{title:'Gear Unlocks',section:'timeline',answer:'Key unlocks: TC15 Hero Gear, TC20 Mastery Forging, TC22 Governor Gear, TC25 Governor Charms, TC30 Truegold. Save materials before these breakpoints.',tags:['tc15','tc20','tc22','tc25','tc30','gear unlock','governor gear unlock','charms unlock','truegold unlock']}
];

function scoreMatch(item,tokens){var score=0;var tagStr=item.tags.join(' ');var titleStr=item.title.toLowerCase();var answerStr=item.answer.toLowerCase();for(var t=0;t<tokens.length;t++){var tok=tokens[t];if(item.tags.indexOf(tok)>=0)score+=10;else if(tagStr.indexOf(tok)>=0)score+=tok.length>4?6:3;if(titleStr.indexOf(tok)>=0)score+=4;if(answerStr.indexOf(tok)>=0)score+=1;}var hits=tokens.filter(function(tk){return tagStr.indexOf(tk)>=0||titleStr.indexOf(tk)>=0;}).length;if(hits>=2)score+=hits*2;return score;}

var searchSelected=0,searchFiltered=[];
function openSearch(){document.getElementById('searchOverlay').classList.add('open');setTimeout(function(){document.getElementById('searchInput').focus();},100);}
function closeSearch(){document.getElementById('searchOverlay').classList.remove('open');document.getElementById('searchInput').value='';document.getElementById('searchResults').innerHTML='<div class="search-hint">ASK ANYTHING &middot; ANY LANGUAGE &middot; ENTER TO JUMP</div>';searchFiltered=[];searchSelected=0;}
function closeSearchIfBg(e){if(e.target===document.getElementById('searchOverlay'))closeSearch();}
document.addEventListener('keydown',function(e){if(e.key==='Escape')closeSearch();if(e.key==='/'&&!document.getElementById('searchOverlay').classList.contains('open')){e.preventDefault();openSearch();}});

function doSearch(){var raw=document.getElementById('searchInput').value.trim();var res=document.getElementById('searchResults');if(!raw){res.innerHTML='<div class="search-hint">ASK ANYTHING &middot; ANY LANGUAGE &middot; ENTER TO JUMP</div>';searchFiltered=[];return;}var tokens=tokenize(raw);if(!tokens.length){res.innerHTML='<div class="search-empty">Try typing a few more words</div>';return;}var scored=QA_INDEX.map(function(item){return{item:item,score:scoreMatch(item,tokens)};}).filter(function(r){return r.score>0;}).sort(function(a,b){return b.score-a.score;}).slice(0,4);searchFiltered=scored.map(function(r){return r.item;});searchSelected=0;renderResults();}

function renderResults(){var res=document.getElementById('searchResults');if(!searchFiltered.length){res.innerHTML='<div style="padding:1rem 0.8rem"><div style="font-family:Cinzel,serif;font-size:0.78rem;color:var(--amber);margin-bottom:0.5rem">No guide entry found</div><div style="font-size:0.74rem;color:var(--text);line-height:1.6;margin-bottom:0.75rem">Not in the guide yet. Reach out directly:</div><div style="font-family:IBM Plex Mono,monospace;font-size:0.7rem;color:var(--text-dim);line-height:1.8"><div><strong style="color:var(--gold)">R5</strong> Ace</div><div><strong style="color:var(--blue)">R4 EU</strong> Carol / Djedje / Samette</div><div><strong style="color:var(--blue)">R4 US</strong> Cam / Vee</div><div><strong style="color:var(--green)">R4 AS</strong> Passenger / Linkaac</div></div></div>';return;}res.innerHTML=searchFiltered.map(function(r,i){return'<div class="search-result'+(i===searchSelected?' sr-selected':'')+'" onclick="jumpTo(\''+r.section+'\')"><div class="sr-section">'+r.section.toUpperCase()+' &rarr;</div><div class="sr-title">'+r.title+'</div><div class="sr-snippet">'+r.answer+'</div></div>';}).join('');}

function searchKey(e){if(e.key==='ArrowDown'){searchSelected=Math.min(searchSelected+1,searchFiltered.length-1);renderResults();}if(e.key==='ArrowUp'){searchSelected=Math.max(searchSelected-1,0);renderResults();}if(e.key==='Enter'&&searchFiltered.length)jumpTo(searchFiltered[searchSelected].section);}
function jumpTo(section){closeSearch();showPage(section);}

// NAV
var currentPage='home';
function showPage(id){currentPage=id;document.querySelectorAll('.page').forEach(function(p){p.classList.remove('active');});document.querySelectorAll('nav a').forEach(function(a){a.classList.remove('active');});var page=document.getElementById('page-'+id);if(page)page.classList.add('active');var nav=document.getElementById('nav-'+id);if(nav)nav.classList.add('active');document.querySelectorAll('.mobile-nav a[data-page]').forEach(function(a){if(a.getAttribute('data-page')===id)a.classList.add('mob-active');else a.classList.remove('mob-active');});window.scrollTo(0,0);}
function toggleExpand(id){var el=document.getElementById(id);el.classList.toggle('open');var tr=el.querySelector('.expand-trigger');if(tr)tr.setAttribute('aria-expanded',el.classList.contains('open'));}
function showGen(n){document.querySelectorAll('.gen-tab').forEach(function(t,i){var a=i===n-1;t.classList.toggle('active',a);t.setAttribute('aria-selected',a);t.setAttribute('tabindex',a?'0':'-1');});document.querySelectorAll('.gen-panel').forEach(function(p,i){p.classList.toggle('active',i===n-1);});}

// PASSWORD
function checkPW(){var input=document.getElementById('pwInput'),gate=document.getElementById('fam-gate'),content=document.getElementById('fam-content'),err=document.getElementById('pwError');if(!input||!gate||!content||!err)return;if(input.value.toLowerCase().trim()==='dtk1246'){gate.style.display='none';content.style.display='block';try{sessionStorage.setItem('fam_auth','1');}catch(e){}}else{err.textContent='Incorrect passphrase.';input.value='';input.focus();setTimeout(function(){err.textContent='\u00a0';},2500);}}

// TIMELINE
var MILESTONES=[{day:0,label:'Generation 1 Heroes',detail:'Amadeus, Jabel, Saul, Howard, Quinn',category:'hero'},{day:14,label:'Fog lifts - Plains',detail:'Map expands',category:'map'},{day:38,label:'Fog lifts - Fertile Land',detail:'Map expands further',category:'map'},{day:40,label:'Generation 2 Heroes',detail:'Hilde, Marlin, Zoe',category:'hero'},{day:45,label:'Alliance Resource Exchange',detail:'Trade resources',category:'feature'},{day:54,label:'First Castle Battle',detail:'Biweekly event begins',category:'event'},{day:55,label:'Gen 1 Pets',detail:'Gray Wolf, Lynx, Bison',category:'pet'},{day:70,label:'Age of Truegold + KvK',detail:'TG1-TG4 + Kingdom of Power',category:'truegold'},{day:75,label:'Gen 2 Pets',detail:'Cheetah and Moose',category:'pet'},{day:105,label:'Gen 3 Pets + Heroes',detail:'Lion, Grizzly + Petra, Helga, Eric, Jaeger',category:'pet'},{day:150,label:'TG5 + Crucible',detail:'Free daily Truegold income',category:'truegold'},{day:170,label:"Artisan's Vision Shop",detail:'Critical Gov Gear material',category:'feature'},{day:190,label:'Gen 4 Heroes + Pets',detail:'Rosa, Alcar, Margot + Mighty Bison, Giant Rhino',category:'hero'},{day:220,label:'War Academy',detail:'T11 troops + advanced research',category:'war'},{day:270,label:'Gen 5 Heroes + Pets',detail:'Long Fei, Vivian, Thrud',category:'hero'},{day:310,label:'TG8 + Tempered Truegold',detail:'Major power spike',category:'truegold'},{day:350,label:'Gen 6 Heroes + Pets',detail:'Regal White Lion, War Elephant',category:'hero'}];
var CAT_COLOR={hero:'var(--gold)',pet:'var(--green)',truegold:'var(--amber)',event:'var(--blue)',feature:'var(--text-dim)',map:'var(--text-muted)',war:'var(--red)'};

function updateTimeline(age){age=parseInt(age);document.getElementById('currentAge').textContent=age;var future=MILESTONES.filter(function(m){return m.day>age;}).sort(function(a,b){return a.day-b.day;});var ntxt=document.getElementById('nextUnlockText'),ndays=document.getElementById('nextUnlockDays');if(future.length>0){var n=future[0];ntxt.textContent=n.label;var d=n.day-age;ndays.textContent=d===0?'Unlocks today!':'In '+d+' day'+(d===1?'':'s')+' (Day '+n.day+')';}
var up=document.getElementById('upcomingList');up.innerHTML=future.slice(0,6).map(function(m){var d=m.day-age;return'<div style="display:flex;align-items:flex-start;gap:0.6rem;padding:0.35rem 0;border-bottom:1px solid rgba(42,42,42,0.4)"><div style="font-family:IBM Plex Mono,monospace;font-size:0.65rem;color:var(--amber);width:55px;flex-shrink:0">+'+d+'d</div><div style="flex:1"><div style="font-size:0.74rem;color:'+(CAT_COLOR[m.category]||'var(--text)')+';font-weight:500">'+m.label+'</div><div style="font-size:0.65rem;color:var(--text-dim);margin-top:1px">'+m.detail+'</div></div></div>';}).join('');
var sorted=MILESTONES.slice().sort(function(a,b){return a.day-b.day;});document.getElementById('timelineBody').innerHTML=sorted.map(function(m){var past=m.day<=age,cur=m.day>age&&m.day<=age+14;return'<tr style="'+(past?'opacity:0.4':cur?'background:rgba(76,142,201,0.07)':'')+'"><td style="'+(past?'color:var(--text-muted)':cur?'color:var(--amber)':'color:var(--text)')+";font-family:IBM Plex Mono,monospace;font-size:0.7rem\">Day "+m.day+(past?' \u2713':cur?' \u2190':'')+'</td><td style="color:'+(past?'var(--text-muted)':CAT_COLOR[m.category]||'var(--text)')+'">'+m.label+'</td><td style="font-size:0.67rem;color:var(--text-dim)">'+m.detail+'</td></tr>';}).join('');
var hd=document.getElementById('home-timeline-desc');if(hd)hd.textContent='Day '+age+' now \u00B7 Next unlocks \u00B7 What to prepare';
var thd=document.getElementById('timeline-header-desc');if(thd)thd.textContent='K1245 is Day '+age+' \u00B7 What\'s unlocking next \u00B7 What to prepare now';
var pnl=document.getElementById('prepare-now-label');if(pnl)pnl.textContent='What to Prepare Right Now (Day '+age+')';
buildPrepCards(age);}

function buildPrepCards(age){var grid=document.getElementById('prepare-now-grid');if(!grid)return;var cards='';var g4=190-age;if(g4>0&&g4<=60){cards+='<div class="qr-card" style="border-color:rgba(76,142,201,0.4)"><div class="qr-card-header" style="background:rgba(76,142,201,0.09)"><h3>Gen 4 Heroes - ~'+g4+' days</h3></div><div class="qr-card-body prose"><p>Save gems for Rosa Roulette, General Mythic Shards, do not burn on Gen 3.</p></div></div>';cards+='<div class="qr-card" style="border-color:rgba(76,142,201,0.4)"><div class="qr-card-header" style="background:rgba(76,142,201,0.09)"><h3>Gen 4 Pets - ~'+g4+' days</h3></div><div class="qr-card-body prose"><p>Save Promotion Medallions, pet food, Advanced Taming Marks for Mighty Bison.</p></div></div>';}
var av=170-age;if(av>0&&av<=30)cards+='<div class="qr-card"><div class="qr-card-header"><h3>Championship Shop - Day 170 (~'+av+' days)</h3></div><div class="qr-card-body prose"><p>Artisan\'s Vision coming soon. Buy out every week.</p></div></div>';
else if(av<=0)cards+='<div class="qr-card"><div class="qr-card-header"><h3>Championship Shop - Active</h3></div><div class="qr-card-body prose"><p>Artisan\'s Vision available. Buy out every week.</p></div></div>';
var tg=150-age;if(tg>0&&tg<=10)cards+='<div class="qr-card"><div class="qr-card-header"><h3>Crucible - Day 150 (~'+tg+' days)</h3></div><div class="qr-card-body prose"><p>Build immediately when it unlocks. 5 free daily refinements.</p></div></div>';
else if(tg<=0&&tg>-30)cards+='<div class="qr-card"><div class="qr-card-header"><h3>Crucible - Active</h3></div><div class="qr-card-body prose"><p>5 free refinements daily. Never miss a day.</p></div></div>';
var wa=220-age;if(wa>0&&wa<=30)cards+='<div class="qr-card"><div class="qr-card-header"><h3>War Academy - Day 220 (~'+wa+' days)</h3></div><div class="qr-card-body prose"><p>Save TG Dust and research speedups now.</p></div></div>';
if(!cards)cards='<div class="qr-card"><div class="qr-card-body prose"><p>No immediate prep items. Check timeline for upcoming milestones.</p></div></div>';
grid.innerHTML=cards;}

// BACK TO TOP
window.addEventListener('scroll',function(){var btn=document.getElementById('back-to-top');if(btn)btn.classList.toggle('visible',window.scrollY>400);},{passive:true});

// SESSION RESTORE
try{if(sessionStorage.getItem('fam_auth')==='1'){var g=document.getElementById('fam-gate'),c=document.getElementById('fam-content');if(g&&c){g.style.display='none';c.style.display='block';}}}catch(e){}

// INIT - auto-calculate server age
var autoAge=getServerAge();
var slider=document.getElementById('ageSlider');
if(slider){slider.value=Math.min(Math.max(autoAge,70),400);}
updateTimeline(autoAge);

// GOOGLE TRANSLATE
function googleTranslateElementInit(){new google.translate.TranslateElement({pageLanguage:'en',includedLanguages:'fr,de,es,pt,ar,hi,tr,zh-CN,sv,ur,nl,it,pl,ro,ru,ja,ko',layout:google.translate.TranslateElement.InlineLayout.SIMPLE,autoDisplay:false},'google_translate_element');}

// FAM GUIDE ASSISTANT v4.16 — local personal helper / router
var chatOpen=false;

var SITE_LINKS = {
  calculators:{label:'Calculators Hub',url:'calculators.html',tags:['calculator','calculators','tools','tool hub','optimizer','calculate','planner']},
  castle:{label:'Castle Battle Rally Planner',url:'calc-castle.html',tags:['castle','rally','timer','attack rally','defense rally','interval','start time','utc rally']},
  bearSim:{label:'Bear Hunt Formation Simulator',url:'calc-bear-sim.html',tags:['bear simulator','bear sim','bear ratio','bear formation calculator','frakinator','bear optimizer']},
  mysticSim:{label:'Mystic Trial Simulator',url:'calc-mystic-sim.html',tags:['mystic trial','mystic simulator','no heroes','trial composition','forest of life']},
  battleSim:{label:'Battle Simulator',url:'calc-battle-sim.html',tags:['battle simulator','battle sim','combat simulator','heroes simulator','matchup']},
  simTheory:{label:'Simulation Theory Lab',url:'calc-sim-theory.html',tags:['simulation theory','battle math','sim math','frakinator math']},

  master:{label:'Master Calculator',url:'calc-masters.html',tags:['master','valora','pan','roman','affinity','emblem','manuscript']},
  heroGear:{label:'Hero Gear Optimizer Lite',url:'calc-hero-gear-optimizer.html',tags:['hero gear optimizer','hero gear','gear optimizer','mithril','forgehammers','forgehammer','gear profile']},
  classicGear:{label:'Classic Hero Gear Calculator',url:'calc-gear.html',tags:['classic gear','gear table','gear calculator','stat lookup']},
  governorGear:{label:'Governor Gear Optimizer',url:'calc-governor-gear.html',tags:['governor gear','gov gear','satin','gilded threads','artisan vision','vision']},
  charms:{label:'Governor Charms Optimizer',url:'calc-charms.html',tags:['charms','charm guide','charm guides','charm design','charm designs']},
  petsCalc:{label:'Pets Planner',url:'calc-pets.html',tags:['pet calculator','pet planner','pet level','taming marks','pet food']},
  widgets:{label:'Hero Widgets Planner',url:'calc-widgets.html',tags:['widget calculator','widgets planner','hero widgets','widget parts']},
  love:{label:'Love Royale Calculator',url:'calc-love-royale.html',tags:['love royale','ratio','troop ratio','10/10/80','formation calculator']},
  eventsCalc:{label:'Event Score Builder',url:'calc-events.html',tags:['event points','score builder','strongest governor','kingdom of power','armament','officer project']},
  calendar:{label:'Events & Packs Calendar',url:'event-calendar.html',tags:['calendar','packs','pack today','current event','events and packs','reset']},
  troops:{label:'Troop Training Calculator',url:'calc-troops.html',tags:['troop training','training calculator','train troops','speedups troops']},
  truegold:{label:'Truegold & Dust Calculator',url:'calc-truegold.html',tags:['truegold','dust','tempered truegold','tg8']},
  construction:{label:'Construction Time Calculator',url:'calc-construction.html',tags:['construction','build time','building speedups','construction speed']},
  buildings:{label:'Building Upgrades Calculator',url:'calc-buildings.html',tags:['building upgrades','building costs','town center','upgrade building']},
  shards:{label:'Hero Shards Calculator',url:'calc-shards.html',tags:['hero shards','shards','star up','stars']},
  comparison:{label:'Hero Comparison',url:'calc-comparison.html',tags:['hero comparison','compare heroes','hero stats']},
  research:{label:'Research Planner',url:'calc-research.html',tags:['research planner','research','war academy','academy']},
  gift:{label:'Gift Codes',url:'gift-codes.html',tags:['gift codes','code','codes','redeem']},
  transfer:{label:'Alliance Transfer Planner',url:'transfer-planner.html',tags:['transfer','transfer planner','invite','player list','migration']},
  changelog:{label:'Changelog',url:'changelog.html',tags:['changelog','updates','version','new features']}
};

var GUIDE_LINKS = {
  home:{label:'Home',page:'home',tags:['home','main']},
  quickref:{label:'Quick Reference',page:'quickref',tags:['quick ref','joiner','first slot','formation','rally mechanics','counter']},
  bear:{label:'Bear Hunt Guide',page:'bear',tags:['bear','bear hunt','pitfall','bear formation','bear damage']},
  events:{label:'Events Guide',page:'events',tags:['swordland','tac','events','viking','all out','event guide']},
  kvk:{label:'KvK Guide',page:'kvk',tags:['kvk','kingdom vs kingdom','battle phase','shield','training day']},
  heroes:{label:'Hero Builds',page:'heroes',tags:['heroes','hero build','gen 3','gen 4','rosa','petra','marlin']},
  tierlist:{label:'Hero Tier List',page:'tierlist',tags:['tier list','hero tier','best hero']},
  pets:{label:'Pets Guide',page:'pets',tags:['pets','pet priority','lynx','cheetah','bison','lion']},
  gear:{label:'Gear Guide',page:'gear',tags:['gear guide','hero gear','governor gear','charms','widgets']},
  power:{label:'Power Growth Guide',page:'power',tags:['power','grow power','increase power','f2p','research priority']},
  timeline:{label:'Server Timeline',page:'timeline',tags:['timeline','unlock','server age','gen','truegold crucible']},
  fam:{label:'FAM Internal',page:'fam',tags:['fam','rules','nap','procedure','r4','r5','alliance']}
};

function toggleChat(){
  chatOpen=!chatOpen;
  var box=document.getElementById('fam-chat');
  if(!box)return;
  box.classList.toggle('open',chatOpen);
  if(chatOpen&&!document.getElementById('chat-messages').children.length){
    addMsg('bot', assistantWelcome());
    renderSmartSuggestions('home');
  }
  if(chatOpen)setTimeout(function(){document.getElementById('chat-input').focus();},150);
}

function assistantWelcome(){
  return 'Hey! I’m your FAM Guide Assistant. I can help you find guides, calculators, event tools, gift codes, rally planners, hero/pet/gear advice, and FAM procedures.\n\nTry things like:\n• “open castle rally planner”\n• “what should I save for KvK?”\n• “which calculator for charms?”\n• “bear formation?”';
}

function makeLink(url,label){return '<a class="chat-link-btn" href="'+url+'">'+label+'</a>';}
function makeNav(page,label){return '<a class="chat-link-btn" onclick="showPage(\''+page+'\');toggleChat()">'+label+'</a>';}

function addMsg(role,text){
  var c=document.getElementById('chat-messages');
  if(!c)return;
  var d=document.createElement('div');
  d.className='msg msg-'+role;
  var processed=String(text)
    .replace(/\[NAV:([a-zA-Z0-9_-]+)\|([^\]]+)\]/g,function(m,page,label){return makeNav(page,label);})
    .replace(/\[NAV:([a-zA-Z0-9_-]+)\]/g,function(m,page){
      var guide=Object.values(GUIDE_LINKS).find(function(g){return g.page===page;});
      return makeNav(page,'Open '+(guide?guide.label:page));
    })
    .replace(/\[LINK:([^|\]]+)\|([^\]]+)\]/g,function(m,url,label){return makeLink(url,label);});
  d.innerHTML=processed.replace(/\n/g,'<br>');
  c.appendChild(d);
  c.scrollTop=c.scrollHeight;
}

function renderSmartSuggestions(context){
  var s=document.getElementById('chat-suggestions');
  if(!s)return;
  var suggestions = {
    home:[
      ['Find calculators','Which calculators do we have?'],
      ['Today event?','What event and packs are today?'],
      ['Castle rally','Open castle rally planner'],
      ['Gear help','Which gear calculator should I use?'],
      ['KvK save?','What should I save for KvK?']
    ],
    combat:[
      ['Bear formation','Best formation for Bear Hunt?'],
      ['Joiner hero','What hero for first slot joiner?'],
      ['Love ratio','Open Love Royale calculator'],
      ['Hero widgets','Open hero widgets planner']
    ],
    growth:[
      ['Governor gear','Open governor gear optimizer'],
      ['Charms','Open charms optimizer'],
      ['Pets','What pet should I prioritize?'],
      ['Research','Open research planner']
    ]
  }[context] || [];
  s.style.display='flex';
  s.innerHTML=suggestions.map(function(x){return '<button class="sug-btn" onclick="askChat(\''+x[1].replace(/'/g,"\\'")+'\')">'+x[0]+'</button>';}).join('');
}

function askChat(text){document.getElementById('chat-input').value=text;sendChatLocal();}

function scoreLink(link,tokens){
  var hay=(link.label+' '+(link.tags||[]).join(' ')).toLowerCase();
  var score=0;
  tokens.forEach(function(t){
    if(hay.indexOf(t)>=0)score+=2;
    (link.tags||[]).forEach(function(tag){if(tag.indexOf(t)>=0||t.indexOf(tag)>=0)score+=3;});
  });
  return score;
}

function searchTools(tokens){
  return Object.keys(SITE_LINKS).map(function(k){return {key:k,item:SITE_LINKS[k],score:scoreLink(SITE_LINKS[k],tokens)};})
    .filter(function(r){return r.score>0;}).sort(function(a,b){return b.score-a.score;});
}

function searchGuides(tokens){
  return Object.keys(GUIDE_LINKS).map(function(k){return {key:k,item:GUIDE_LINKS[k],score:scoreLink(GUIDE_LINKS[k],tokens)};})
    .filter(function(r){return r.score>0;}).sort(function(a,b){return b.score-a.score;});
}

function wantsOpen(text){
  return /\b(open|go to|link|show|take me|where is|where do i|which calculator|calculator|planner|optimizer|tool)\b/i.test(text);
}

function buildToolReply(results){
  var top=results.slice(0,4);
  var reply='I found the best tool for that:\n\n';
  top.forEach(function(r,i){reply+=(i+1)+'. '+r.item.label+' [LINK:'+r.item.url+'|Open]\n';});
  if(results.length>4)reply+='\nMore tools are in the hub: [LINK:calculators.html|Open Calculators Hub]';
  return reply;
}

function buildGuideReply(results){
  var top=results.slice(0,3);
  var reply='This guide section should help:\n\n';
  top.forEach(function(r,i){reply+=(i+1)+'. '+r.item.label+' [NAV:'+r.item.page+'|Open]\n';});
  return reply;
}

function routeSpecial(text,tokens){
  var lower=text.toLowerCase();

  if(/\b(all calculators|calculator list|tools list|toolkit|what calculators|which calculators)\b/.test(lower)){
    return 'Here are the main calculator groups:\n\n• Featured: Master, Events & Packs, Castle Rally, Love Royale\n• Optimization: Hero Gear, Governor Gear, Charms, Pets, Widgets\n• Growth: Troops, Truegold, Construction, Buildings, Research\n• Heroes: Shards and Hero Comparison\n• Events: Event Score Builder\n\n[LINK:calculators.html|Open Calculators Hub]';
  }

  if(/\b(today|current|now).*\b(event|pack|packs)\b|\bpack today\b|\bevent today\b/.test(lower)){
    return 'For live daily tracking, use the Events & Packs Calendar. It shows the current event, packs available today, UTC reset countdown, and the 4-week rotation.\n\n[LINK:event-calendar.html|Open Events & Packs Calendar]';
  }

  if(/\b(gift|code|codes|redeem)\b/.test(lower)){
    return 'Use the Gift Codes page for active codes, copy buttons, and the redeem link.\n\n[LINK:gift-codes.html|Open Gift Codes]';
  }

  if(/\btransfer|invite|migration|move alliance|player list\b/.test(lower)){
    return 'Use the Alliance Transfer Planner to track player power, kingdom, invite type, status, and notes.\n\n[LINK:transfer-planner.html|Open Transfer Planner]';
  }

  if(/\bhelp|what can you do|commands|assistant\b/.test(lower)){
    return assistantWelcome()+'\n\nUseful links:\n[LINK:calculators.html|Calculators]\n[LINK:event-calendar.html|Events & Packs]\n[NAV:quickref|Quick Reference]\n[NAV:fam|FAM Internal]';
  }

  return null;
}

function sendChatLocal(){
  var input=document.getElementById('chat-input');
  var text=input.value.trim();
  if(!text)return;
  input.value='';
  input.style.height='auto';
  addMsg('user',text);

  var tokens=tokenize(text);
  if(!tokens.length){
    addMsg('bot','Could you rephrase that? Try keywords like “bear”, “castle”, “charms”, “KvK”, “gift codes”, or “gear optimizer”.');
    return;
  }

  var special=routeSpecial(text,tokens);
  if(special){addMsg('bot',special);renderSmartSuggestions('home');return;}

  var toolResults=searchTools(tokens);
  var guideResults=searchGuides(tokens);
  var qaScored=QA_INDEX.map(function(item){return{item:item,score:scoreMatch(item,tokens)};})
    .filter(function(r){return r.score>0;})
    .sort(function(a,b){return b.score-a.score;});

  if(wantsOpen(text) && toolResults.length){
    addMsg('bot',buildToolReply(toolResults));
    renderSmartSuggestions('growth');
    return;
  }

  if(qaScored.length>0){
    var best=qaScored[0].item;
    var reply=best.answer+'\n\n[NAV:'+best.section+']';
    if(toolResults.length && toolResults[0].score>=3){
      reply+='\n\nHelpful tool: '+toolResults[0].item.label+' [LINK:'+toolResults[0].item.url+'|Open]';
    }
    if(qaScored.length>1&&qaScored[1].score>qaScored[0].score*0.6){
      reply+='\n\nRelated guide: '+qaScored[1].item.title+' [NAV:'+qaScored[1].item.section+']';
    }
    addMsg('bot',reply);
    renderSmartSuggestions(/bear|rally|hero|formation/.test(text.toLowerCase())?'combat':'growth');
    return;
  }

  if(toolResults.length){
    addMsg('bot',buildToolReply(toolResults));
    renderSmartSuggestions('home');
    return;
  }

  if(guideResults.length){
    addMsg('bot',buildGuideReply(guideResults));
    renderSmartSuggestions('home');
    return;
  }

  addMsg('bot','I could not find an exact match yet, but I can still route you:\n\n[LINK:calculators.html|Open Calculators Hub]\n[LINK:event-calendar.html|Open Events & Packs]\n[NAV:quickref|Open Quick Reference]\n[NAV:fam|Open FAM Procedures]\n\nFor alliance-specific problems, ask an R4/R5 in-game.');
  renderSmartSuggestions('home');
}

// ═══ SIDEBAR LOGIC ═══
function isMobile(){
  return window.matchMedia('(max-width: 1024px)').matches;
}

function openSidebar(){
  document.body.classList.remove('sidebar-collapsed');
  document.body.classList.add('sidebar-open');
  try{ localStorage.setItem('fam_sidebar_open','1'); }catch(e){}
}

function toggleSidebar(){
  document.body.classList.remove('sidebar-collapsed');
  document.body.classList.toggle('sidebar-open');
  try{
    localStorage.setItem('fam_sidebar_open',
      document.body.classList.contains('sidebar-open') ? '1' : '0');
    localStorage.removeItem('fam_sidebar_collapsed');
  }catch(e){}
}

function closeSidebar(){
  document.body.classList.remove('sidebar-open');
  document.body.classList.remove('sidebar-collapsed');
  try{ localStorage.setItem('fam_sidebar_open','0'); }catch(e){}
}

function closeSidebarOnMobile(){
  closeSidebar();
}

function syncSidebarMode(){
  // Sidebar is an overlay on every screen size now, so it never pushes layout/footer.
  document.body.classList.remove('sidebar-collapsed');
}

// Start closed every page load so desktop does not look broken or shifted.
(function(){
  document.body.classList.remove('sidebar-open');
  document.body.classList.remove('sidebar-collapsed');
  try{
    localStorage.removeItem('fam_sidebar_collapsed');
    localStorage.setItem('fam_sidebar_open','0');
  }catch(e){}
})();

// Wire controls in JS instead of depending only on inline onclick handlers.
function setupSidebarControls(){
  var toggle = document.querySelector('.sidebar-toggle');
  var close = document.querySelector('.sidebar-close');
  var backdrop = document.querySelector('.sidebar-backdrop');

  if(toggle && toggle.dataset.sidebarReady !== '1'){
    toggle.dataset.sidebarReady = '1';
    toggle.addEventListener('click', function(e){
      e.preventDefault();
      toggleSidebar();
      toggle.setAttribute('aria-expanded', document.body.classList.contains('sidebar-open') ? 'true' : 'false');
    });
  }
  if(close && close.dataset.sidebarReady !== '1'){
    close.dataset.sidebarReady = '1';
    close.addEventListener('click', function(e){
      e.preventDefault();
      closeSidebar();
      if(toggle) toggle.setAttribute('aria-expanded', 'false');
    });
  }
  if(backdrop && backdrop.dataset.sidebarReady !== '1'){
    backdrop.dataset.sidebarReady = '1';
    backdrop.addEventListener('click', function(e){
      e.preventDefault();
      closeSidebar();
      if(toggle) toggle.setAttribute('aria-expanded', 'false');
    });
  }
}

if(document.readyState === 'loading'){
  document.addEventListener('DOMContentLoaded', setupSidebarControls);
} else {
  setupSidebarControls();
}

// On resize/orientation change: keep overlay behavior and remove stale states
window.addEventListener('resize', syncSidebarMode);
window.addEventListener('orientationchange', function(){
  setTimeout(syncSidebarMode, 150);
});

// Close sidebar on Escape key
window.addEventListener('keydown', function(e){
  if(e.key === 'Escape' && document.body.classList.contains('sidebar-open')){
    closeSidebar();
    var toggle = document.querySelector('.sidebar-toggle');
    if(toggle) toggle.setAttribute('aria-expanded', 'false');
  }
});

