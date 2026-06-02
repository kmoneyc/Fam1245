# FAM 1245 — Kingshot Field Manual

Alliance field manual for FAM Alliance, Kingshot server K1245.

---

## 🚀 Deploy to Cloudflare Pages (3 minutes)

1. Go to **https://pages.cloudflare.com** → sign up (free, no credit card)
2. Dashboard → **Workers & Pages** → **Create** → **Pages** tab → **Upload assets**
3. Project name: `fam1245` → **Create project**
4. **Drag the unzipped `fam1245_site` folder** onto the upload area
5. Click **Deploy site**

✓ Done — live in ~30 seconds at `https://fam1245.pages.dev`

### Future updates
Workers & Pages → fam1245 → Create new deployment → drag updated folder → Deploy.

### Custom domain
Project → Custom domains → Set up a custom domain. Cloudflare handles SSL automatically.

---

## 📁 Files in this folder

| File | Purpose |
|------|---------|
| index.html | Main page — all guide content |
| style.css | All styling and responsive layout |
| app.js | Search, navigation, chat assistant |
| calculators.html | Gear optimizer + stat lookup + cost reference |
| hero.webp | Hero banner (modern browsers) |
| hero.jpg | Hero banner fallback |
| _headers | Cloudflare cache + security headers |
| _redirects | Cloudflare routing |

---

## ⚡ Performance

- Total site size: **852 KB** — loads fast on any connection
- Hero served as WebP (263 KB) with JPG fallback (334 KB)
- CSS/JS cached for 7 days, images for 1 year
- Pure static — no backend, no database, no server

---

## 🛠️ Updating Content

All guide content lives in `index.html`. Search for section markers like `<!-- ═══ BEAR HUNT ═══ -->` and edit the HTML directly.

To change the FAM Internal password: open `app.js`, find `fam_authed`, update logic nearby.

To swap the hero image: replace `hero.webp` and `hero.jpg` (keep same filenames).

---

## 🆘 Alternative hosts

- **Netlify** — netlify.com/drop (drag folder)
- **Vercel** — `vercel.json` already configured
- **GitHub Pages** — push to repo, enable Pages in Settings


## v4.3 updates
- Added light/dark theme toggle. Light keeps the pink + white look; dark uses pink + purple/gray.
- Redesigned Calculators Hub with search, filters, badges, and tool cards.
- Added a starter Master Calculator page with Calculate, Tables, and Compare tabs.
- Added stronger footer links and top navigation shortcuts.


## v4.4 Events & Packs update
- Added Events & Packs Calendar with live UTC reset countdown.
- Added main-page today event and pack widget.
- Reorganized navigation into Guides, Calculators, Events, Strategies, and Alliance.
- Moved Master Calculator into the Calculators flow instead of a top-level main-site shortcut.


## May 16, 2026 update
- Events & Packs default tracker is calibrated to Saturday, Week 3.
- The tracker rotates automatically from that baseline using UTC reset.
- Master Calculator remains inside the Calculators hub/navigation instead of being treated as a main section.
- Light theme stays pink/white; dark theme uses pink + purple/gray.


## v4.6 additions
- Gift Codes page with current active seed list, copy buttons, redeem link, and local custom code notes.
- Alliance Transfer Planner with localStorage roster, power totals, invite/status tracking, JSON import/export, and copy summary.
- Love Royale Calculator for troop ratio ranking from attack/lethality stats.
- Changelog page for release notes and planned tools.

## v4.7 final polish
- Desktop hero banner now shows the full 1245 FAM Alliance image without cropping.
- Mobile hero behavior remains unchanged.
- Love Royale ratio outputs now use compact styled pills so 10/10/80 and similar ratios fit cleanly.
- Ran a full static bug sweep for JavaScript, CSS, links, and duplicate IDs.
## v4.8 assistant + Love Royale fixes

- Fixed FAM Guide Assistant styling for the live chat markup.
- Tightened Love Royale ratio sizing so 10/10/80 stays inside the design on desktop and mobile.
- Added stronger responsive table rules for the Love Royale ranked results.
- Updated changelog and cache-busting build versions.



## v4.9 responsive hero artwork
- Added four generated hero images for ultrawide desktop, standard desktop, tablet, and mobile.
- Switched the homepage banner to a responsive picture element so the right image loads for the user's screen width.
- Reduced hero banner height on larger screens so the homepage feels less oversized.


## v4.10 mobile hero revert
- Restored the mobile homepage banner to the previous original hero image/framing.
- Kept generated responsive hero images for tablet, desktop, and ultrawide.
- Updated changelog and cache versions.


## v4.11 castle battle timing upgrade
- Added First Launch Delay controls with 1:00 beginner and 0:30 advanced presets.
- Reworked attack rally planning so Start Rally Plan uses live UTC + delay + longest march + buffer.
- Fixed buffer behavior so launch rows visibly move earlier and show buffered arrival time.
- Added the user's own rally as a highlighted leader row in attack results.
- Updated changelog and footer version.


## v4.12 defense rally timing upgrade
- Added Defense Rally First Launch Delay controls with Beginner 1:00 and Advanced 0:30 presets.
- Added Defense Buffer Before Arrival and made it change every defender send time.
- Included the user's own defense march as a highlighted leader row in defense results.
- Restored missing player-management functions in the Castle Battle calculator.


## v4.13 rally interval planner rebuild
- Rebuilt the Castle Battle calculator into a cleaner interval-based attack/defense planner.
- Added a Delay Between Rally Starts field that applies between every player.
- Added timer-based and exact UTC target setup for attack impact and defense arrival.
- Kept first launch delay, buffer, quick-add players, copy plans, theme support, and mobile layout.


## v4.14 optimizer tools expansion
- Added Governor Gear Optimizer, Governor Charms Optimizer, Pets Planner, Hero Widgets Planner, and Hero Gear Optimizer Lite.
- Rebuilt Event Points into an Event Score Builder.
- Updated Calculators Hub and homepage shortcuts.


## v4.15 calculator hub organization
- Reorganized the Calculators Hub into natural categories.
- Updated toolkit count to 18 tools.
- Ran full static checks for scripts, local links, CSS, duplicate IDs, and calculator button functions.


## v4.16 FAM Guide Assistant upgrade
- Upgraded the local assistant to route members to guide sections, calculators, event tools, gift codes, transfer planner, and FAM procedures.
- Added clickable link buttons inside assistant replies.
- Expanded suggestions and fallback routing while keeping the site static and fast.


## v4.17 K1245 live sync layer
- Added `fam-live-sync.js`, a safe static-site sync layer for Gift Codes, Events & Packs, calculator data, and K1245 transfer history references.
- Added cache/fallback badges so users can see whether data is live, cached, stale, or local fallback.
- Personalized fallback data and notes for Kingdom 1245.
- No private login, account tokens, or player credentials are used.


## v4.18 structure and contrast pass
- Made main chapter headers larger, boxed, and higher contrast.
- Moved Critical Rules higher on the homepage.
- Added darker grey structure tones to balance the pink theme.
- Improved card/header contrast on the homepage and calculator hub.


## v4.19 Simulation and Formation Lab
- Added Bear Hunt Formation Simulator, Mystic Trial Simulator, Battle Simulator, and Simulation Theory Lab.
- Organized the new tools under Simulators & Formation Lab in Calculators Hub.
- Updated homepage shortcuts and FAM Guide Assistant routing.
- The simulators use transparent FAM formulas and are designed for comparisons/calibration, not hidden exact game replication.


## v4.20 corrected Bear Hunt formula
- Replaced the Bear simulator's generic pressure score with the Bear-specific combat formula.
- Uses army = sqrt(troops_of_type × min(total_attacker_troops, bear_troops)).
- Uses attack_by_type = base_attack × (1 + attack_bonus) × lethality / 100.
- Uses bear_defense = bear_health × bear_defense / 100.
- Applies Archer +10% skill modifier by default and final score = ceil(round damage × 10 rounds).
- Verified against the 6k/6k/6k T6 TG0 example for 16,797 expected score.


## v4.21 Bear ratio UI and formula fix
- Rebuilt the Bear simulator UI to ask only for Infantry/Cavalry/Archery attack, lethality, troop-specific lead hero, and troop tier.
- Removed extra visible Bear defense/manual formula fields.
- Uses proportional Bear damage factor: 1/3 × Ainf × √finf + Acav × √fcav + 4/3 × Aarc × √farc × 1.1.
- Adds Alcar, Margot, and Rosa as troop-specific hero options.


## v4.22 Gray/Red Fire theme
- Added a third theme: Gray + Red Fire.
- Theme toggle now cycles Light → Dark → Fire.
- Theme button uses a moon-style icon.
- Added sidebar theme button above Guides.
- Applied fire theme styling across homepage, guides, calculators, and simulator pages.


## v4.23 Fire theme contrast final
- Fixed Fire theme contrast issues where light/white panels could appear in some components.
- Strengthened dark grey/red styling for cards, panels, inputs, tables, alerts, and assistant bubbles.
- Updated cache versions, changelog, and full site checks.


## v4.24 Wiki guide update pass
- Updated the Gear & Charms guide using Kingshot Wiki governor gear, hero gear, and town center unlock information.
- Added TC15/20/22/25/30 unlock reminders.
- Added Governor Gear/Charm slot mappings and material source notes.
- Updated Event and Power guides with premium material spending timing.
- Updated FAM Guide Assistant answers for gear, charms, and unlocks.


## Footer disclaimer updated
- Replaced the old fan-made footer wording with a professional independent-project disclaimer.
- Clarifies that the project is not affiliated with Kingshot or its developers and that game content/trademarks belong to their respective owners.


## v4.25 Venator-inspired theme rebuild
- Added a cinematic Venator-inspired visual layer without removing existing functionality.
- Added scroll reveal animations, hover shine, subtle tilt, stronger hero sections, CTA-style buttons, and show-more styling.
- Added a homepage command strip for fast access to today's events, calculators, and rules.
- Kept Light, Dark, and Fire themes intact.


## v4.26 Full Venator default rebuild
- Made the cinematic Fire/Venator style the default experience.
- Theme toggle now starts from Fire and cycles Fire → Light → Dark.
- Strengthened header, homepage hero, sidebar, cards, calculator hub, assistant, and mobile layout.
- Kept all existing features and tools intact.


## v4.27 Uploaded Venator theme integration
- Integrated the uploaded Venator web-app theme ZIP into the FAM static site.
- Added a new default Venator theme using the uploaded app's colors and layout patterns.
- Theme cycle is now Venator → Light → Dark → Fire.
- Added uploaded theme assets in `venator-assets/`.
- Kept all existing FAM guides, calculators, assistant, sync tools, and simulator functionality.


## v4.28 Three Venator theme system
- Removed the old theme cycle and rebuilt around three Venator-style themes only.
- Themes: Light + Pink, Fire + Gray, and Gray + Purple.
- Fire + Gray is the default for new visitors.
- Theme toggle cycles Pink → Fire → Purple.
- Applied the themes across homepage, guides, calculators, simulator pages, event calendar, assistant, tables, cards, forms, and mobile navigation.


## v4.29 Homepage hero frame fix
- Reframed the homepage FAM banner image to better match the Venator-style framed cover.
- Fixed hero button spacing so Open Tools and Quick Ref do not overlap the section below.
- Renamed Learn More to Quick Ref.
- Rechecked static site structure after changes.


## v4.30 Mobile header and theme guide
- Made Light + Pink the default theme.
- Optimized mobile header controls so search, theme, and menu fit.
- Made mobile sidebar fully scrollable so all options remain accessible.
- Added a first-visit theme guide pointing users to the theme button.
- Rechecked all pages and themes.


## v4.31 Homepage headline removal
- Removed the extra homepage “Statistics for your alliance.” text block.
- Kept the FAM banner, Open Tools, Quick Ref, and command strip.
- Adjusted spacing so the homepage flows naturally.


## v4.32 Calculator and theme naturalization
- Audited all calculator pages and patched shared theme coverage for legacy calculator UI.
- Updated calc-gear.html to load the shared calculator stylesheet.
- Improved Light + Pink, Fire + Gray, and Gray + Purple consistency across forms, tables, cards, buttons, and mobile layouts.
- Rechecked all pages and static assets.


## v4.33 Mobile text and hero frame fix
- Fixed oversized mobile calculator/guide titles so text stays inside borders.
- Added mobile text clamping and wrapping for headers, cards, badges, inputs, and tables.
- Moved “Don't Die in WAR! Fight gud :)” into the homepage hero frame.
- Kept Open Tools and Quick Ref side by side on mobile.
- Adjusted hero frame styling for Light + Pink, Fire + Gray, and Gray + Purple.


## v4.34 Critical Rules category
- Moved the Critical Rules block from the homepage into a dedicated Critical Rules page/category.
- Added Critical Rules to sidebar navigation, top navigation, and homepage command strip.
- Kept Rally Joiner Rule, Bear Joiner Preset, Garrison Joiner Preset, and Widget Rule content intact.


## v4.35 Layout alignment and unified frames
- Centered desktop top bar and footer alignment.
- Simplified the homepage hero into one clean frame.
- Kept the fight-good text inside the same hero frame.
- Converted guide/calculator hero text blocks into bordered cards across all themes.


## v4.36 Page layout repair
- Fixed homepage hero banner showing on internal pages.
- Replaced oversized internal page title blocks with compact framed title bars.
- Improved desktop header spacing and footer alignment.
- Kept homepage hero frame and fight-good text intact.


## v4.37 Header sidebar and hero strip cleanup
- Removed extra desktop header links and kept only logo, search, translator, theme, and menu.
- Fixed sidebar overlay so it no longer shifts footer or page content.
- Unified the homepage hero strip with the hero image frame.
- Rechecked pages and static assets.


## v4.38 Streamable hero embed
- Replaced the homepage static hero picture with the provided Streamable iframe embed.
- Kept the existing hero frame and “Don't Die in WAR! Fight gud :)” strip.
- Added responsive iframe sizing for desktop, tablet, and mobile.


## v4.39 Main hero image update
- Replaced the Streamable iframe hero embed with the uploaded FAM hero image.
- Added the image to `assets/fam-hero-main.png`.
- Kept the hero frame and “Don't Die in WAR! Fight gud :)” strip.


## v4.40 Clean hero frame
- Removed the homepage hero text strip and the white gap under the image.
- Kept only the hero picture on the main page.
- Restyled the hero border to match the Venator-style framed look more closely.


## v4.41 Events calendar spacing fix
- Added proper top spacing to the Events & Packs Calendar page.
- Matched standalone calendar spacing with the rest of the site.
- Added responsive mobile spacing for the calendar hero block.


## v4.41 Clean hero border and events spacing
- Added proper top spacing to the Events & Packs Calendar page.
- Removed decorative hero frame shapes from the homepage image.
- Kept a clean white border around the homepage hero picture.


## v4.42 Homepage hero button removal
- Removed the two standalone buttons under the homepage hero image.
- Kept the Track Today, Open Tools, and Critical Rules command blocks.
- Adjusted spacing under the hero image.


## v4.43 Sidebar and theme repair
- Fixed the desktop sidebar button.
- Sidebar now opens as an overlay on desktop and mobile.
- Sidebar no longer shifts footer or page content.
- Improved sidebar theme styling across Light + Pink, Fire + Gray, and Gray + Purple.


## v4.44 Daily changelog cleanup
- Cleaned the changelog page into grouped daily/24-hour sections.
- Consolidated the many same-day v4.25-v4.43 notes into one readable daily summary.
- Going forward, changelog updates should be grouped by 24-hour increments instead of every small build.


## v4.45 Mobile guide overflow repair
- Fixed right-side overflow on key guide pages including Quick Reference, Bear, Pets, Gear, Server Timeline, KvK, Vikings, Transfer, Joiner Mechanics, Tier List, and TrueGold.
- Added mobile containment for guide cards, tables, stat rows, tags, tabs, expandable sections, and phase timelines.
- Kept changelog updates grouped by 24-hour increments.


## v4.46 Mobile card header blend fix
- Blended the inner card headers and expandable section bars into their parent card blocks on mobile.
- Applied the fix across the key guide pages repaired in v4.45.
- Kept daily changelog grouping by 24-hour increments.


## v4.47 Remaining calculator theme pass
- Updated Hero Shards, Hero Comparison, Research Planner, Troop Training, Truegold & Dust, Construction Time, Building Upgrades, Hero Gear Optimizer, and Master Calculator pages to use the newer theme styling.
- Added final per-page CSS overrides for these older standalone calculator pages.
- Kept the changelog grouped by 24-hour increments.


## v4.48 Compact target calculator header repair
- Repaired the oversized/odd top hero blocks on the remaining calculator pages.
- Replaced the giant Venator-style page header treatment with a compact themed header.
- Kept the pages aligned with the rest of the site on desktop and mobile.


## v4.49 Decorative page art cleanup
- Removed leftover decorative versus/background art from the repaired calculator page headers.
- Added no-theme-art classes and final CSS overrides so only the homepage hero image displays.
- Kept changelog grouped by 24-hour increments.


## v4.50 Events mobile header overlap fix
- Fixed the Events & Packs Calendar mobile header overlap.
- Made the standalone Events header relative on phones so content no longer slides underneath it.
- Kept daily changelog grouping by 24-hour increments.


## v4.51 Full site theme audit
- Audited every HTML, CSS, and JS file.
- Normalized missing standalone calculator footers.
- Added final theme consistency CSS across standalone pages.
- Verified Light + Pink, Fire + Gray, and Gray + Purple theme coverage.
- Kept changelog grouped by 24-hour increments.


## v4.52 Cloudflare Functions KV D1 layer
- Added Cloudflare Pages Functions endpoints under `/functions/api`.
- Added KV/D1-ready data access with static JSON fallback.
- Added `/api/site-status` to confirm bindings after deployment.
- Added `cloudflare/schema.sql`, `cloudflare/seed.sql`, `wrangler.example.toml`, `_headers`, and `CLOUDFLARE_SETUP.md`.
- Updated `fam-live-sync.js` to try local `/api/*` endpoints before external/public endpoints.
- Kept changelog grouped by 24-hour increments.


## v4.53 GitHub Pages workflows and static database
- Converted the backend plan from Cloudflare Functions/KV/D1 to GitHub Pages static hosting.
- Removed Cloudflare-specific `/functions`, `cloudflare`, `_headers`, and `wrangler.example.toml` files.
- Added GitHub Actions workflows for deploy, validation, and scheduled JSON data refresh.
- Added static JSON database docs under `db/` and setup instructions in `GITHUB_PAGES_SETUP.md`.
- Updated `fam-live-sync.js` to read local `data/*.json` files first and cache them in `localStorage`.
- Added `.nojekyll` for GitHub Pages.


## v4.54 Events calendar Kingshot snapshot
- Updated Events & Packs Calendar with the visible public Kingshot Week 1 schedule.
- Corrected the default rotation anchor so Week 1 Monday is 2026-04-27 UTC and Saturday Week 3 remains 2026-05-16 UTC.
- Added daily pack notes: Pet Chests and Gear Enhancement.
- Added special note: Governor Stamina Pack appears for 3 days during Cesares Fury.
- Added editable Weeks 2–4 fallback data in `data/events.json`.
