# VK Real Estate & Promoters — Thanjavur

A single-page site for a Thanjavur real-estate developer. React + Vite, CSS
Modules, Framer Motion, React Router.

```bash
npm install
npm run dev      # local development
npm run build    # regenerates sitemap.xml, then builds to dist/
npm run lint
```

---

## Structure

The site is **one page**. The only other routes are the two legal pages.

| Route             | What it is                        |
| ----------------- | --------------------------------- |
| `/`               | The entire site — seven sections  |
| `/privacy-policy` | Draft, needs legal review         |
| `/terms`          | Draft, needs legal review         |

The page, in order:

| #   | Section        | Anchor      | Answers                        |
| --- | -------------- | ----------- | ------------------------------ |
| —   | Hero           | —           | Who, what, where               |
| 01  | The Idea       | —           | Why property matters           |
| 02  | In Numbers     | —           | Track record                   |
| 03  | What We Do     | `#services` | Plots, villas, apartments, commercial |
| 04  | Developments   | `#projects` | What has been built            |
| 05  | Why Us         | `#why-us`   | Why trust them                 |
| 06  | The Location   | `#location` | Why Thanjavur                  |
| 07  | Contact        | `#contact`  | How to reach them              |

Navigation links are written `/#anchor` so they also work from the legal
routes. The nav highlights the section in view via `useScrollSpy`.

---

## Before launch — required

Everything a real business must supply lives in `src/data/`. Nothing is
hardcoded in a component.

### 1. `src/data/business.js` — the single source of truth

| Field                      | Currently            |
| -------------------------- | -------------------- |
| `contact.phoneDisplay/Href`| **Placeholder**      |
| `contact.whatsappNumber`   | **Placeholder**      |
| `contact.email`            | **Placeholder**      |
| `address.*`                | **Placeholder**      |
| `site.url`                 | **Placeholder domain** — also update `public/robots.txt` |
| `contact.formEndpoint`     | `null` — see below   |
| `credentials.reraNumber`   | `null` — hidden until set |
| `brand.established`        | `null`               |

Anything left `null` is **hidden**, not faked. Enter a RERA number and the
credentials strip appears; leave it null and nothing is claimed.

### 2. Statistics — `src/data/stats.js`

All four figures are `null`, so they render as `XX+` with a visible note
explaining they are placeholders. Enter a real number and it animates on
scroll and becomes eligible for structured data. **Never enter a figure the
company cannot evidence.**

### 3. Projects — `src/data/projects.js`

Six illustrative developments. Names, localities, prices, unit counts and
approvals are **not real** — replace wholesale. The shape matches what a CMS
would return, so swapping this file for a `fetch()` needs no component
changes.

### 4. Photography — `src/data/media.js`

Placeholder architectural photography from Unsplash, loaded from their CDN.
Replace with the company's own images:

1. Drop optimised files into `src/assets/photos/`
2. `import villa from "../assets/photos/villa.webp"`
3. Swap the `src` value and rewrite the `alt` text

Then remove the `images.unsplash.com` preconnect and preload from
`index.html`.

### 5. The enquiry form

With `contact.formEndpoint` set to `null`, the form validates and then hands
the enquiry to WhatsApp — so no lead is silently dropped into a form that
goes nowhere. Set it to a CRM or serverless endpoint and it POSTs JSON
instead.

### 6. Legal pages

`Privacy.jsx` and `Terms.jsx` are drafts written to describe how the site
actually behaves. Both carry a visible "requires legal review" notice.
**Have a lawyer review them and remove the notice.**

---

## The logo

The supplied artwork (`src/assets/photos/vk-logo.png`) had an opaque white
background and was 2 MB, so two web assets were generated from it:

- **`public/vk-mark.png`** — the monogram, background keyed to transparency.
  Used throughout the UI; legible on both white and navy.
- **`public/vk-logo.png`** — the full lockup, for structured data only. Its
  wordmark is near-black, so it is **not** safe on dark backgrounds.

The lockup prints "Real Estate & Promoters" typographically beside the mark
rather than relying on the artwork's baked-in text, which is illegible at
navigation size.

---

## Content rules this build follows

These were deliberate and are worth preserving:

- **No invented numbers.** Statistics show `XX+` until real data is supplied.
- **No fabricated reviews.** The testimonials section was removed rather than
  filled with fictional quotes.
- **No guaranteed returns.** The investment language describes factors to
  weigh, never a projected multiple.
- **Only verifiable local facts.** `src/data/locations.js` contains documented
  facts about Thanjavur only, with road distances marked approximate and a
  `lastReviewed` date.
- **Credentials appear only when real.** RERA, certifications and awards are
  hidden while `null`.

---

## Accessibility & performance notes

- Every animation collapses to a static render under `prefers-reduced-motion`.
- The enquiry dialog traps focus, closes on Escape and restores focus.
- The custom `Select` implements the full listbox keyboard pattern
  (arrows, Home/End, Enter/Space, Escape, type-ahead).
- Images reserve their aspect ratio, so cumulative layout shift is zero.
- The hero image is preloaded and marked `fetchpriority="high"` as the LCP
  element; everything else is lazy.
- The intro curtain waits on real signals (window load + fonts) with a hard
  2.6 s cap, and is skipped entirely under reduced motion. Disable it by
  removing `<Preloader />` from `App.jsx`.
