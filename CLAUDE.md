# CLAUDE.md · The Springs Restaurant site

Static marketing site for The Springs Restaurant (London, ON). Casual fine-dining bistro in a restored historic church, with a sizable events business. Rebuild of `thespringsrestaurant.com` consolidating what was previously split between the main site and a Square Online site.

Primary users: guests looking to reserve, couples planning weddings, corporate event planners, families booking celebrations of life. Primary business goal: drive Square reservations and event inquiries.

---

## Rule 0 · Do not fabricate

The whole project is organized around not inventing content. These are hard constraints, not preferences:

- **No invented menu items, prices, chef names, founding year, or "three days for a croissant" style details.** Use only facts from this file, visible in `images/`, or supplied by the user.
- **No stock photography.** Every photo under `images/` is real. Never add a placeholder or stock image.
- If a fact isn't verified, either cut it or (on `audit.html` only) prefix with "Estimated" or "Typical".

## Rule 1 · Writing rules

These apply to every HTML, every CSS comment, every alt text, every commit message:

- **No em dashes (`—`).** Use periods, commas, or middle dot (`·`).
- **No en dashes (`–`) for ranges.** Write "9am to 5pm", not "9am–5pm".
- Hyphens in compounds are fine (`farm-to-table`, `pre-order`, `hors-d'oeuvre`).
- First-person plural voice (`we`, `our`).
- No marketing clichés (`passionate`, `curated`, `elevated`).
- Verification grep before finishing: `grep -RE '[—–]' *.html css/ js/` must return zero matches.

---

## Project overview

- **What it is:** 9-page static site. No framework, no build step, no backend.
- **Pages:** `index`, `menu`, `events`, `set-menus`, `private-dining`, `gallery`, `about`, `contact`, `audit`.
- **Reservation flow:** external link to Square appointments (see Rule 2 below). All "Reserve" / "Book a Table" CTAs must use this exact URL.
- **Event inquiry flow:** HTML forms with `data-mailto` that open the user's mail client on submit. Placeholder inbox addresses currently in use (TODO below).

## Rule 2 · Canonical external URLs (do not change without asking)

- **Square reservation URL:** `https://book.squareup.com/appointments/us98yrta83eva6/location/0G40BYAWMQCB0/services?buttonTextColor=ffffff&color=5ea581&locale=en&referrer=so`
- **Instagram:** `https://instagram.com/thespringsrestaurant`
- **Facebook:** `https://www.facebook.com/profile.php?id=100086305566439`
- **Phone:** `(519) 657-1100` · `tel:15196571100`
- **Address:** `310 Springbank Dr, London, ON`

## Verified facts (safe to use verbatim)

- Positioning: "Casual fine-dining bistro" · "Restored historic church" · "Farm-to-table"
- Hours: Sun to Wed and Sat: 4:30pm to close. Thu to Fri: lunch 12pm to 3pm, dinner 3pm to close.
- Accessibility: complimentary on-site parking, wheelchair accessible
- Capacity: main venue up to 85 · private room up to 35 · outdoor tent extends beyond 85
- Event set-menu prices: Lunch Deluxe $65 · Lunch Premium $75 · Dinner Deluxe $79 · Dinner Deluxe Plus $99 · Dinner Premium $115 · plus two hors-d'oeuvre tiers

---

## Tech stack

- **HTML5, vanilla CSS, vanilla JS.** No framework. No bundler.
- **Fonts:** Fraunces (serif display) + Inter (sans body), loaded from Google Fonts via `<link>` in each page's `<head>`.
- **No package manager, no `package.json`, no lockfile.** Do not introduce one without asking.
- **Schema.org JSON-LD** on `index.html` (Restaurant + OpeningHoursSpecification).
- **Preview:** `python3 -m http.server 8732` from the repo root.

---

## Repo structure

```
/
├── index.html  menu.html  events.html  set-menus.html
├── private-dining.html  gallery.html  about.html  contact.html
├── audit.html
├── css/styles.css          · single stylesheet, CSS custom properties on :root
├── js/main.js              · observer, tabs, lightbox, mailto forms, active nav
├── images/
│   ├── plates/             · dish photos (kebab-case names)
│   ├── venue/              · interior/exterior/tent
│   ├── events/             · weddings, corporate, decorated setups
│   ├── platters/           · catering platters
│   ├── set-menus/          · Square set-menu images (prices in filename)
│   ├── logo/springs-logo.webp
│   ├── owners/owners.png
│   └── <originals>         · user-uploaded originals (spaces in names)
└── CLAUDE.md  (this file)
```

**Never reference originals with spaces in HTML.** Copy/rename into a proper subfolder first.

Plan file (outside the repo): `/Users/pavanchaudhari/.claude/plans/make-a-plan-with-dapper-scott.md` — useful context for why the site is structured this way.

---

## Local development

- **Install:** none. No dependencies.
- **Preview:** `python3 -m http.server 8732` then open `http://localhost:8732/`.
- **Build:** none.
- **Lint / typecheck / tests:** none configured. See Definition of Done for manual checks.

---

## Definition of done

Before declaring any task complete:

1. `grep -RE '[—–]' *.html css/ js/` returns zero matches.
2. Every `src=` and `background-image: url(...)` points to a file that exists. Quick check:
   ```bash
   python3 -m http.server 8732 &
   for p in index menu events set-menus private-dining gallery about contact audit; do
     curl -s -o /dev/null -w "$p %{http_code}\n" http://localhost:8732/$p.html
   done
   ```
3. All 9 pages render HTTP 200.
4. Nav link count is identical across all 9 pages (currently 7 links).
5. Page opens in a browser and the mobile breakpoint (375px) looks right.
6. New text follows Rule 1. New content follows Rule 0.

---

## Coding rules

- **No framework, no dependencies.** If tempted to add React, Tailwind, jQuery, or npm, stop and ask.
- **CSS variables live on `:root`** in `styles.css`. Reuse them. Do not hard-code the palette.
- **Palette:** `--ivory #f8f4ec`, `--charcoal #1f1d1a`, `--forest #2b4232` (brand green from logo), `--brass #a88a5b`.
- **Responsive breakpoints:** 375 / 768 / 1024 / 1440.
- **Animation:** `IntersectionObserver` driven `.reveal` + `.reveal.is-visible` pattern. Use the existing classes. Do not add new animation libraries.
- **File naming:** kebab-case for images and HTML routes. `private-dining.html`, not `privateDining.html`.
- **Shared header/footer are inlined per page.** When editing nav or footer, edit all 9 files. Grep first:
  ```
  grep -l 'class="nav-links"' *.html
  ```
- **Keep pages under ~15 KB of HTML.** If a page is growing past that, the content probably belongs on its own route.
- **Comments:** rare. Only when the reason isn't obvious from the code.
- **No trailing summaries in HTML comments.** No "Added by X for Y" notes.

---

## Testing guidance

No automated tests. Verification is manual:

- Browser check at 375 / 768 / 1024 / 1440.
- Tab through every interactive element; focus rings must be visible.
- Click every nav link on every page.
- Open the lightbox on `gallery.html` and `set-menus.html`; confirm it closes on click and on Escape.
- Confirm the Square reservation URL opens in a new tab.

Do not add a testing framework. If a check is important enough to automate, ask first.

---

## UI/UX rules

- **Editorial feel.** Generous whitespace, serif display type, eyebrow labels, restrained color use.
- **Every "Reserve" CTA uses the Square URL from Rule 2.** No exceptions.
- **Hero patterns:** `.hero` (full, ~92vh), `.hero-mid` (68vh), `.hero-short` (52vh). Background image via `.hero-media` inline `background-image`.
- **Image alts are mandatory and descriptive.** Not "photo", not "image". Describe what's in the plate or the room.
- **Accessibility:**
  - Every form field has a `<label>`.
  - Interactive elements have visible focus states (provided by default browser styles; do not remove `:focus` outlines without replacing them).
  - Tabs use `role="tab"` / `role="tabpanel"` / `aria-selected`; follow the pattern already in `menu.html` and `gallery.html`.
- **Loading / empty / error states:** static site; these mostly mean graceful image fallbacks (alt text). Forms show no confirmation UI — they hand off to the user's mail client via `mailto:`. Do not add toast libraries.

---

## Forms & data

- Forms use `data-mailto="address@..."` and `data-subject="..."`. The handler in `js/main.js` URL-encodes form values and opens `mailto:`.
- **Current placeholder inboxes (TODO: replace with real addresses from the restaurant):**
  - `events@thespringsrestaurant.com` — events + private dining
  - `hello@thespringsrestaurant.com` — general contact
- No backend, no database, no cookies, no analytics. Do not add any without asking.

---

## Security / privacy

- **No secrets in code.** There are no API keys in this repo; there should never be any. If a feature needs one, stop and ask.
- **No analytics / tracking / pixels** without explicit approval. The current state is zero third-party scripts beyond Google Fonts and an embedded Google Maps iframe (`contact.html`).
- **External links** to Instagram, Facebook, Square, Google Maps all use `target="_blank" rel="noopener"`. Preserve this.
- No PII is collected or logged. Forms hand off to the user's mail client; no server sees the content.

---

## Git / workflow rules

- This repo is not currently under git (per environment info). If git is initialized later, do not commit without asking.
- Do not mass-reformat untouched files.
- Do not rename existing image files that are referenced from HTML without updating every reference.
- Do not delete files in `images/` — they include user-supplied originals with spaces in the names that are the source of truth for the renamed copies.
- Ask before: destructive deletions, introducing any dependency or build tool, changing the Square reservation URL, editing `CLAUDE.md` substantively.

---

## Review checklist (self-check before handing work back)

- [ ] Rule 0: no fabricated facts introduced.
- [ ] Rule 1: grep for `[—–]` across all changed files returns zero matches.
- [ ] Rule 2: every `Reserve` / `Book` CTA points to the canonical Square URL.
- [ ] Every `src=` and `background-image: url()` I added resolves to an existing file.
- [ ] Nav link count is still consistent across all 9 pages (if I edited nav).
- [ ] New CSS uses existing `:root` variables, not hard-coded colors.
- [ ] Pages open at HTTP 200 via `python3 -m http.server 8732`.
- [ ] Mobile (375px) layout still reads correctly.
- [ ] I have not introduced a framework, package manager, or build step.

---

## Known pitfalls

- **Dashes sneak in from AI-generated prose and from pasted copy.** Always re-run the dash grep before finishing.
- **Header + footer are duplicated across 9 HTML files.** A change to nav means 9 edits. There is no template system. A search-and-replace is the right tool.
- **Image originals have spaces and capitalization in filenames** (`Main Venue Holds up to 85 People.jpg`, `event set menu lunch deluxe 65.webp`). Never reference them directly from HTML — they're already mirrored into kebab-case copies under topic subfolders. Use those.
- **`menu.html` currently has no real menu items.** The tabs are structured placeholders that CTA out to the phone or reservation link. Do not fabricate items to fill them. Wait for supplied content.
- **`set-menus.html` prices come from the set-menu image filenames.** They are verified from the Square listing. Treat as source of truth unless the user says otherwise.
- **The forest/brand green** is `#2b4232`, matched to the logo. The `forest-light` `#5ea581` matches the Square booking button color. Do not drift.

---

## TODOs (items waiting on the user)

- [ ] Real a-la-carte menu text (lunch, dinner, wine, dessert).
- [ ] Real inquiry email addresses to replace the `events@` / `hello@` placeholders in forms.
- [ ] Owner names if they want attribution on `about.html`.
- [ ] Any awards / press / reviews to quote.
- [ ] Decision on whether to add git + a deployment pipeline.
