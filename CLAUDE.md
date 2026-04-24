# CLAUDE.md · The Springs Restaurant site

Static marketing site for The Springs Restaurant (London, ON). An event venue first, restaurant second. Restored historic church hosting weddings, showers, birthdays, corporate events, celebrations of life, and every milestone in between. The a-la-carte restaurant continues to operate day-to-day, but the owner's long-term direction is events-only. Site is a rebuild of `thespringsrestaurant.com` consolidating what previously lived split across the main site and a Square Online site.

Primary users: couples planning weddings, families planning showers and birthdays, corporate and pharmaceutical event planners, families booking celebrations of life, and guests looking to reserve a table. Primary business goal: drive event bookings (via the Square appointments link and the mailto inquiry forms). Secondary goal: keep the restaurant reservation flow humming.

- **Live site:** https://momentumedia.github.io/the-springs-restaurant/
- **Repo:** https://github.com/momentumedia/the-springs-restaurant (public)
- **Deploy:** GitHub Pages on `main` branch. Any push auto-rebuilds in 30 to 60 seconds.

---

## Rule 0 · Do not fabricate

The whole project is organized around not inventing content. Hard constraints, not preferences.

- **No invented menu items, prices, chef names, founding year, or "three days for a croissant" style details.** Use only facts from this file, visible in `images/`, or supplied by the user.
- **Stock photography is allowed in two places:** (1) hero background imagery under `images/hero/`, and (2) event-category imagery under `images/stock/` (weddings, corporate, celebrations-of-life, milestones) where we don't have real photos yet. Real photography always leads when available. Dish photos, actual-venue interior/exterior photos, owners, real-event photos from The Springs must remain real and never be stocked over.
- Stock images must live inside `images/stock/` (subfoldered by category) so we can always tell what's real. Never put stock anywhere else.
- If a fact isn't verified, either cut it or (on `audit.html` only) prefix with "Estimated" or "Typical".

## Rule 1 · Writing rules

These apply to every HTML, every CSS comment, every alt text, every commit message.

- **No em dashes (`—`).** Use periods, commas, or middle dot (`·`).
- **No en dashes (`–`) for ranges.** Write "9am to 5pm", not "9am–5pm".
- Hyphens in compounds are fine (`farm-to-table`, `pre-order`, `hors-d'oeuvre`).
- First-person plural voice (`we`, `our`).
- No marketing clichés (`passionate`, `curated`, `elevated`).
- Grep before finishing: `grep -RE '[—–]' *.html css/ js/` must return zero matches.

## Rule 2 · Canonical URLs (do not change without asking)

- **Square reservation URL:**
  `https://book.squareup.com/appointments/us98yrta83eva6/location/0G40BYAWMQCB0/services?buttonTextColor=ffffff&color=5ea581&locale=en&referrer=so`
- **Instagram:** `https://instagram.com/thespringsrestaurant`
- **Facebook:** `https://www.facebook.com/profile.php?id=100086305566439`
- **Phone:** `(519) 657-1100` · `tel:15196571100`
- **Address:** `310 Springbank Dr, London, ON`

## Verified facts (safe to use verbatim)

- Positioning: "Event venue in a restored historic church" · "Casual fine-dining bistro" · "Farm-to-table"
- **Event USPs (owner-confirmed literal, 2026-04-23):**
  - Any hour. Mornings, nights, holidays, middle of the night.
  - No venue fee.
  - No deposit.
  - No minimum spend.
  - No restrictions.
- Event types hosted (owner-supplied, with priority):
  - Priority 1: weddings, bridal showers, wedding showers, birthdays
  - Priority 2: celebrations of life, corporate events, pharmaceutical events
  - Priority 3: communion, baptism, retirement, graduation, bachelor, engagement, proposal
- Restaurant hours: Sun to Wed and Sat: 4:30pm to close. Thu to Fri: lunch 12pm to 3pm, dinner 3pm to close.
- Events run at any hour (see USPs above) · the Sun to Wed / Thu to Fri / Sat schedule above is for a-la-carte dining only.
- Accessibility: complimentary on-site parking, wheelchair accessible
- Capacity: main venue up to 85 · private room up to 35 · outdoor tent extends capacity beyond 85
- Event set-menu prices: Lunch Deluxe $65 · Lunch Premium $75 · Dinner Deluxe $79 · Dinner Deluxe Plus $99 · Dinner Premium $115 · two hors-d'oeuvre tiers
- Square appointments URL (see Rule 2) handles **both** table reservations and event bookings.

---

## Project overview

- 14-page static site. No framework, no build step, no backend.
- **Pages:**
  - Events-first core: `index`, `events` (hub), `weddings`, `corporate-events`, `celebration-of-life`, `milestones`, `other-events`
  - Supporting: `set-menus`, `private-dining`, `gallery`, `about`, `contact`
  - Restaurant: `menu`
  - Internal: `audit` (noindex)
- **Primary CTA site-wide:** Square appointments URL (Rule 2). Labeled contextually. "Book your event" on event pages, "Reserve a table" on menu/restaurant pages, "Book now" on the homepage.
- **Secondary (parallel) event-inquiry flow:** HTML forms with `data-mailto` for guests who prefer a conversation before booking. Placeholder inbox addresses, see TODOs.
- **SEO infrastructure** (new as of the events-first rebuild): canonical links, Open Graph + Twitter cards, favicons, `robots.txt`, `sitemap.xml`, schema.org markup on every page (`EventVenue`, `LocalBusiness`, `Restaurant`, `Service`, `FAQPage`, `BreadcrumbList` where appropriate).

## Tech stack

- HTML5, vanilla CSS, vanilla JS. No framework. No bundler.
- **Fonts:** Fraunces (serif display) + Inter (sans body), loaded from Google Fonts via `<link>` in each page's `<head>`.
- **No package manager, no `package.json`, no lockfile.** Do not introduce one without asking.
- **Schema.org JSON-LD** on `index.html` (Restaurant + OpeningHoursSpecification).
- **Hosting:** GitHub Pages. No separate server, no CDN config, no DNS to manage beyond what GitHub provides.

## Repo structure

```
/
├── index.html  events.html
├── weddings.html  corporate-events.html  celebration-of-life.html  milestones.html
├── menu.html  set-menus.html  private-dining.html
├── gallery.html  about.html  contact.html
├── audit.html
├── robots.txt  sitemap.xml
├── favicon.ico  apple-touch-icon.png
├── css/styles.css          · single stylesheet, CSS custom properties on :root
├── js/main.js              · observer, tabs, lightbox, mailto forms, active nav
├── images/
│   ├── plates/             · real dish photos (kebab-case)
│   ├── venue/              · real interior/exterior/tent photos
│   ├── events/             · real Springs event photos (weddings, corporate, decorated setups)
│   ├── platters/           · real catering platters
│   ├── set-menus/          · Square set-menu images (prices in filename)
│   ├── hero/               · stock hero backgrounds (carve-out from Rule 0)
│   ├── stock/              · stock event-category imagery (carve-out from Rule 0)
│   │   ├── weddings/
│   │   ├── corporate/
│   │   ├── celebrations-of-life/
│   │   └── milestones/
│   ├── logo/springs-logo.webp
│   ├── owners/owners.png
│   └── <originals>         · user-uploaded originals with spaces in names
│                             (dish photos IMG_9555-9560, IMG_6887/6890, Menu 1-6.jpeg/jpg)
├── CLAUDE.md
└── .gitignore              · .DS_Store, IDE noise, node_modules (defensive)
```

**Never reference originals with spaces from HTML.** Copy to a proper subfolder with a kebab-case name first.

Plan file (outside the repo): `/Users/pavanchaudhari/.claude/plans/make-a-plan-with-dapper-scott.md` — context for why the site is structured this way.

---

## Local development

- **Install:** none.
- **Preview locally:** `python3 -m http.server 8732` then open `http://localhost:8732/`.
- **Build:** none.
- **Lint / typecheck / tests:** none configured. See Definition of Done for manual checks.
- **Deploy:** `git push origin main`. Pages rebuilds automatically.

## Definition of done

Before declaring any task complete:

1. `grep -RE '[—–]' *.html css/ js/` returns zero matches.
2. Every `src=` and `background-image: url(...)` points to a file that exists.
3. All 14 public pages return HTTP 200 via local server:
   ```bash
   python3 -m http.server 8732 &
   for p in index events weddings corporate-events celebration-of-life milestones other-events menu set-menus private-dining gallery about contact audit; do
     curl -s -o /dev/null -w "$p %{http_code}\n" http://localhost:8732/$p.html
   done
   ```
4. Nav is identical across all 14 pages (same links, same order, same active-state logic).
5. Page opens in a browser and the 375px mobile layout reads correctly.
6. New text follows Rule 1. New content follows Rule 0.
7. Every page has: unique `<title>`, unique meta description, canonical, OG tags, Twitter card, favicon link, and at least one schema.org JSON-LD block appropriate to the page type.
8. After pushing: confirm live URL serves the change (`curl -I https://momentumedia.github.io/the-springs-restaurant/`).

---

## Coding rules

- **No framework, no dependencies.** If tempted to add React, Tailwind, jQuery, or npm, stop and ask.
- **CSS variables live on `:root`** in `styles.css`. Reuse them. Do not hard-code the palette.
- **Palette:** `--ivory #f8f4ec` · `--charcoal #1f1d1a` · `--forest #2b4232` (brand green from logo) · `--brass #a88a5b`.
- **Responsive breakpoints:** 375 / 768 / 1024 / 1440.
- **Animation:** `IntersectionObserver` driven `.reveal` → `.reveal.is-visible` pattern. Use existing classes. No new animation libraries.
- **File naming:** kebab-case for images and HTML routes.
- **Shared header/footer are inlined per page.** When editing nav or footer, edit all 14 HTML files. Grep first:
  `grep -l 'class="nav-links"' *.html`
- **Keep pages under ~15 KB of HTML.** If a page grows past that, the content probably belongs on its own route. Exception: `menu.html` runs ~33 KB because the full a-la-carte, drinks, wine, spirits, and dessert menus are all interactive tabs on one route; splitting would break the tab UX.
- **Comments:** rare. Only when the reason isn't obvious from the code. No "Added by X for Y" notes.
- **Refactor vs patch:** prefer small, local patches. Don't rewrite a page to change a section.

## Testing guidance

No automated tests. Manual verification only.

- Browser check at 375 / 768 / 1024 / 1440.
- Tab through interactive elements; focus rings must be visible.
- Click every nav link on every page.
- Open the lightbox on `gallery.html` and `set-menus.html`; confirm it closes on click and on Escape.
- Confirm the Square URL opens in a new tab.

Do not add a testing framework. If a check is important enough to automate, ask first.

## UI/UX rules

- Editorial feel. Generous whitespace, serif display, eyebrow labels, restrained color use.
- Every "Reserve" CTA uses the Square URL from Rule 2. No exceptions.
- **Hero patterns:** `.hero` (~92vh), `.hero-mid` (68vh), `.hero-short` (52vh). Background image via `.hero-media` inline `background-image`. Add `.hero-darker` for lighter background photos where default scrim isn't enough (in use on `private-dining.html`).
- **Hero image on `index.html`** is stock (`images/hero/hero-plated.jpg`, Pexels, Valeria Boltneva). All other heroes use real photos.
- **Image alts are mandatory and descriptive.** Not "photo", not "image". Describe what's in the plate or the room.
- **Accessibility:**
  - Every form field has a `<label>`.
  - Keep visible focus states (default browser `:focus` outlines are fine; don't remove without replacement).
  - Tabs use `role="tab"` / `role="tabpanel"` / `aria-selected`. Follow the pattern in `menu.html` and `gallery.html`.
- **Loading / empty / error states:** static site; mostly means graceful image fallbacks (alt text). Forms hand off to the user's mail client via `mailto:`; no confirmation UI, no toasts.

## Forms & data

- Forms use `data-mailto="address@..."` and `data-subject="..."`. `js/main.js` URL-encodes values and opens `mailto:`.
- **Current placeholder inboxes (TODO: replace with real addresses):**
  - `events@thespringsrestaurant.com` — events + private dining
  - `hello@thespringsrestaurant.com` — general contact
- No backend, no database, no cookies, no analytics. Don't add any without asking.

## Security / privacy

- **No secrets in code.** There are no API keys in this repo; there should never be. If a feature needs one, stop and ask.
- **No analytics / tracking / pixels** without explicit approval. Current third-party scripts are limited to Google Fonts (`<link>`) and the Google Maps iframe on `contact.html`.
- **External links** use `target="_blank" rel="noopener"`. Preserve this.
- No PII is collected or logged. Forms hand off to the user's mail client; no server sees content.
- **The repo is public.** Do not commit anything you wouldn't want on the open web (internal emails, client invoices, etc.).

---

## Git / workflow rules

- Repo is public at `github.com/momentumedia/the-springs-restaurant`. `main` is the deploy branch.
- **Every push to `main` deploys to production** (GitHub Pages, ~30 to 60 seconds). Treat `main` accordingly.
- **Large image pushes can hit HTTP 400.** If a push fails, raise the buffer: `git config http.postBuffer 524288000` (already set on this checkout).
- Prefer one commit per logical change with a descriptive message. No `wip` commits on `main` if avoidable.
- Do not mass-reformat untouched files.
- Do not rename image files referenced from HTML without updating every reference.
- Do not delete user-supplied originals in `images/` (the files with spaces in the names) — they're the source of truth for the renamed copies.
- Ask before: destructive deletions, introducing a dependency or build tool, changing the Square reservation URL, making the repo private again, changing visibility, editing `CLAUDE.md` substantively.

## Review checklist (self-check before handing work back)

- [ ] Rule 0 — no fabricated facts introduced.
- [ ] Rule 1 — `grep -RE '[—–]'` across changed files returns zero matches.
- [ ] Rule 2 — every `Reserve` / `Book` CTA points to the canonical Square URL.
- [ ] Every `src=` / `background-image: url()` I added resolves to a committed file.
- [ ] Nav link count consistent across all 9 pages (if I touched nav).
- [ ] New CSS uses `:root` variables, not hard-coded colors.
- [ ] All pages HTTP 200 on local server.
- [ ] 375px mobile layout reads correctly.
- [ ] No framework / package manager / build step introduced.
- [ ] After push: live URL serves the change (`curl -I https://momentumedia.github.io/the-springs-restaurant/`).

## Known pitfalls

- **Dashes sneak in from AI prose and pasted copy.** Always re-run the dash grep before finishing.
- **Header + footer are duplicated across 13 HTML files.** Nav changes = 13 edits. No template system. A search-and-replace is the right tool.
- **Event subnav dropdown is CSS-only** (hover + focus-within on desktop, always-expanded under the mobile overlay). No JS state. Edits need to preserve the `has-sub` class and the `.submenu` structure exactly or the dropdown breaks.
- **Image originals have spaces and capitalization** (`Main Venue Holds up to 85 People.jpg`, `event set menu lunch deluxe 65.webp`). Never reference them directly from HTML — they are mirrored into kebab-case copies under topic subfolders. Use those.
- **`menu.html` is fully populated** from user-supplied menu screenshots (`images/Menu 1.jpeg` through `menu 6.jpg`). 5 tabs: Lunch, Dinner, Cocktails & Beer, Wine & Spirits, Dessert & Digestifs. Prices are CAD from those screenshots. Do not fabricate additions; if the menu rotates, ask for updated screenshots and re-transcribe.
- **`set-menus.html` prices come from the set-menu image filenames.** They are verified from the Square listing. Source of truth unless the user says otherwise.
- **Forest brand green** is `#2b4232`, matched to the logo. `forest-light` `#5ea581` matches the Square booking button color. Do not drift.
- **Pages deploy on push.** Pushing a half-finished change to `main` puts it on the public URL. There is no staging branch.

---

## TODOs (waiting on the user)

- [x] ~~Real a-la-carte menu text (lunch, dinner, wine, dessert) to replace placeholders in `menu.html`.~~ · transcribed April 2026 from user-supplied Menu 1-6 screenshots.
- [ ] Real inquiry email addresses to replace `events@` / `hello@` placeholders in forms.
- [ ] Owner names if they want attribution on `about.html`.
- [ ] Any awards, press, or reviews to quote.
- [ ] Decide if a `staging` branch or PR-preview flow is wanted before further changes to `main`.
- [ ] Replace the stock `images/hero/hero-plated.jpg` with a real Springs plate when a good photo exists.
