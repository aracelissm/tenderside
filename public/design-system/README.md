# Handoff: Tenderside Marketing Website

## Overview
This package is a developer handoff for the **Tenderside** marketing website homepage —
*Tenderside, The Human Manual*, a luxury AI-driven self-discovery product.
People answer guided questions, AI generates their personal **Manual** (an owner's
guide to how they think and what they need), and they share it with the people who
matter to deepen relationships. The homepage must feel premium, editorial, and
cinematic — deep near-black with antique-gold accents — and pull the visitor
downward with motion and clear hierarchy.

## About the Design Files
The files in this bundle are **design references created in HTML** — a prototype
showing the intended look, layout, and motion. They are **not production code to
ship directly.** Your task is to **recreate this design in the target codebase's
environment** using its established patterns and libraries.

A **Next.js 14 (App Router) reference implementation** was authored for this design;
its exact structure is documented under "Recommended implementation" below so you
can reproduce it 1:1. If the target repo already has a framework/design system, use
that instead and treat the Next.js layout as a guide.

- `tenderside-website-preview.html` — the full homepage prototype (open in any browser).
  This is the source of truth for layout, spacing, color, type, and motion.
- `styles.css` + `tokens/` — the real design tokens (CSS custom properties). Use
  these exact values; do not approximate.

## Fidelity
**High-fidelity (hifi).** Final colors, typography, spacing, and interactions.
Recreate the UI pixel-perfectly using the codebase's libraries and patterns.

---

## Screens / Views

### Homepage (single scrolling page)
One continuous page, dark canvas, centered content column (`max-width: 1200px`,
`padding: 0 32px`). Sections top-to-bottom: **Nav → Hero → ValueGrid →
ManualShowcase → CompatBand → ClosingCTA → Footer.** Every section fades/slides up
on scroll into view.

#### 1. Nav (sticky)
- **Layout:** sticky top bar, height `76px`, flex row: logo (left) · link list
  (flex:1) · auth buttons (right), gap `40px`.
- **Background:** translucent near-black with `backdrop-filter: blur(14px)`.
  At scrollY≤12 → `rgba(11,11,13,0.4)`, no border. After scroll →
  `rgba(11,11,13,0.86)` + `1px` bottom border `rgba(212,175,55,0.18)`. Transitions
  over 240ms.
- **Logo:** 34×34 gold app-icon (`tenderside-icon.png`, `border-radius:8px`) +
  wordmark "TENDERSIDE" in the display serif, `24px`, `letter-spacing:0.14em`.
- **Links:** `How It Works, The Manual, For Relationships, Pricing, About` (+ Home).
  Body font `14px`, color `--text-secondary`; active link is gold with a `1px` gold
  underline.
- **Buttons:** "Log In" (secondary/outline, sm) + "Get Started" (primary/gold, sm).

#### 2. Hero
- **Layout:** 2-col grid `1.05fr 0.95fr`, gap `40px`, padding `80px 32px 88px`.
- **Ambient glow:** absolutely-positioned 700×700 radial gold blob top-right,
  `filter: blur(20px)`, animation `nx-pulse-glow 7s` infinite (opacity 0.5↔0.85,
  scale 1↔1.06).
- **Left column** (animates in with `nx-fade-up 0.9s`):
  - Eyebrow: "Where You Can Be Fully You" — mono, `12px`, `letter-spacing:0.22em`,
    uppercase, gold.
  - H1: display serif, `clamp(40px,5vw,68px)`, `line-height:1.02`,
    `letter-spacing:-0.02em`. Three lines: "Create Your Manual." / "Share
    Understanding." / "Transform Relationships." — the **third line uses the gold
    gradient clipped to text** (`background: var(--gradient-gold);
    -webkit-background-clip:text; color:transparent`).
  - Paragraph: body `18px`, `line-height:1.6`, `--text-secondary`, `max-width:46ch`,
    margin `24px 0 32px`. Copy: "Tenderside helps you create a living manual that
    explains who you are, how you think, and what you need to thrive. Share it with
    the people who matter most."
  - Buttons: "Create My Manual" (primary lg, trailing arrow-right icon) + "Watch
    How It Works" (secondary lg, leading play icon).
- **Right column:** `imagery/hero-journal-sunset.png` — a cinematic photo of a
  gratitude journal open beside the *Tenderside · The Human Manual* book on a warm
  wooden desk at sunset (lamp, candle, mountain-lake view). Rendered `width:122%`
  with negative side margins (`margin:0 -11%`) so it bleeds past the column, and
  masked with a **radial fade** (`mask-image: radial-gradient(ellipse 70% 68% at
  50% 50%, #000 46%, transparent 88%)`) so it dissolves seamlessly into the
  near-black canvas — no border, no card. Animation `nx-float 6s` infinite
  (translateY 0↔-14px). This image *shows the product* (the journal + branded book)
  so the visitor immediately understands what Tenderside is.
- **Trust bar** (below hero, padding-bottom `48px`): caption "Trusted by people
  building deeper connections" then a row (gap `44px`, `opacity:0.55`) of press
  names in display serif italic `22px`: Forbes, Entrepreneur, yahoo!finance,
  Business Insider, Benzinga.

#### 3. ValueGrid
- **Background:** `--surface-1` (#141414) with `1px` gold-subtle top+bottom borders,
  padding `72px 0`.
- **Heading (centered):** H2 "It's more than self-discovery." `clamp(30px,3.6vw,40px)`
  + subhead "It's shared clarity." in display serif italic `30px`, gold.
- **Grid:** `repeat(auto-fit, minmax(240px,1fr))`, gap `20px`. Four cards, each
  reveals with a staggered delay (`i * 90ms`).
- **Card:** `--surface-2` (#1C1C1E), `1px` border `--border-default`, radius `16px`,
  padding `24px`, flex column gap `14px`. Hover: lift `translateY(-3px)`, border →
  gold-strong, subtle gold glow.
  - Icon in a `46px` circle (`1px` gold-strong border, gold glyph `22px`).
  - Title: display serif `21px`.
  - Body: body `14px`, `line-height:1.5`, `--text-secondary`.
  - "Learn more →" link in gold.
  - Cards: **Create Your Manual** (icon: book) / **Share with Purpose** (share) /
    **They Understand You** (eye-off) / **Stronger Connections** (users). Copy in
    the prototype.

#### 4. ManualShowcase (the one light section)
- **Background:** `--warm-ivory` (#F1E4C6), black text, padding `80px 0`.
- **Layout:** 2-col grid `1fr 1.1fr`, gap `56px`.
- **Left:** H2 (near-black) "Your Manual. Your Story. Organized. Beautiful."
  with "Always Evolving." in `--gold-700`. Below: 2×2 feature grid (gap `28px`),
  each = gold icon (`#A8842A`) + bold `15px` near-black title + `13px` `#5a564d`
  body: Private & Secure / Living Document / AI-Powered Insights / Made to Share.
- **Right:** a **dark Manual preview card** on the ivory bg — `--near-black` bg,
  radius `20px`, padding `24px`, `--shadow-lg`. Header row: caption "My Manual · v1.0
  · Updated today" + small "Share" secondary button. Centered name "Aracelis
  Sanchez" (display serif `30px`) + caption "The Human Manual". Then 4 rows
  (`--surface-2`, radius `12px`): How I Think / How I Communicate / What Motivates
  Me / How To Support Me — each with title, sub-caption, trailing gold chevron.

#### 5. CompatBand
- **Layout:** 2-col grid `0.9fr 1.1fr`, gap `56px`, padding `80px 0`.
- **Left card:** gold variant + glow, padding `36px`, centered column. Row of two
  gold-ring avatars around "Aracelis & Maurice" (display serif `20px`). A **gold
  ProgressRing at 88%** (`size 150`, sublabel "Strong connection"). Then four
  labelled gold ProgressBars: Communication 94, Emotional Needs 91, Values
  Alignment 89, Life Vision 85.
- **Right:** eyebrow "For Relationships", H2 "See how you align. Where you thrive.
  Where you grow.", body paragraph, "Compare Manuals" primary button.

#### 6. ClosingCTA
- Full-width, centered, padding `104px 0`, `1px` gold-subtle top border. Radial gold
  glow overlay at `opacity:0.6`. H2 `clamp(34px,4.4vw,52px)`, `max-width:18ch`: "The
  deepest connections start with understanding yourself." + primary "Create My
  Manual" button.

#### 7. Footer
- `--near-black`, `1px` gold-subtle top border, padding `56px 0 40px`.
- Top: 4-col grid `1.6fr repeat(3,1fr)`, gap `32px`, bottom-bordered. Col 1 = logo +
  wordmark + display-serif italic tagline "Understand yourself deeply. Share
  yourself authentically. Grow together." Cols 2–4 = link lists under mono captions
  Product / Company / Legal.
- Bottom row: "© 2024 Tenderside. All rights reserved." · "The Human Manual"
  (both mono captions, tertiary color).

---

## Interactions & Behavior
- **Scroll-reveal:** every section wrapper starts `opacity:0; translateY(28px)` and
  transitions to visible (`opacity 0.7s, transform 0.7s`, ease-out
  `cubic-bezier(0.16,1,0.3,1)`) when it enters the viewport (IntersectionObserver,
  threshold 0.15, `rootMargin: 0px 0px -60px 0px`, fire once). Grid children stagger
  by `90ms`.
- **Nav** toggles background/border on `scrollY > 12`.
- **Hero** entrance: `nx-fade-up` on the copy column; monolith floats
  (`nx-float 6s`); glow pulses (`nx-pulse-glow 7s`).
- **Buttons:** hover — primary brightens (`filter:brightness(1.06)`) and deepens
  gold glow; secondary shifts border+text to gold. Press — `translateY(1px)
  scale(0.99)`. Transitions 140–240ms.
- **Cards (interactive):** hover lifts `-3px`, border → gold-strong, subtle glow.
- **Reduced motion:** `@media (prefers-reduced-motion: reduce)` disables all
  animations and shows content in its final state.
- Nav links and CTAs are visual in the prototype; wire to real routes
  (`/how-it-works`, `/manual`, `/for-relationships`, `/pricing`, `/about`, `/signup`).

## State Management
Minimal — the homepage is presentational. Client state needed only for:
- Nav `active` link (string) and `scrolled` boolean (scroll listener).
- `Reveal` visibility boolean per wrapper (IntersectionObserver).
- Button/Card local hover/active booleans.
No data fetching required for the homepage.

## Design Tokens
Authoritative values live in `styles.css` → `tokens/*.css`. Key ones:
- **Colors:** Near Black `#0B0B0D`, Antique Gold `#D4AF37`, Warm Ivory `#F1E4C6`,
  Cosmic Green `#2F7A68`. Surfaces `#141414 / #1C1C1E / #262626`. Text `#F1E4C6`
  (primary), `#B7B4AC` (secondary), `#8C8577` (tertiary). Gold ramp
  `#F1E4C6 / #E7C97A / #D4AF37 / #A8842A / #6E561A`.
- **Gradients:** gold `linear-gradient(135deg,#F1E4C6,#D4AF37 45%,#A8842A)`; gold
  radial glow; green `linear-gradient(135deg,#3E9E86,#2F7A68)`; ink.
- **Borders:** subtle `rgba(212,175,55,0.18)`, default `rgba(245,241,232,0.10)`,
  strong `rgba(212,175,55,0.45)`.
- **Type:** display = Cormorant Garamond (→ Cormorant Garamond), body = Montserrat (→ Hanken
  Grotesk), mono = IBM Plex Mono (→ IBM Plex Mono). Scale H1 72 / H2 40 / H3 24 /
  body 16 / small 14 / caption 12. Eyebrow tracking 0.22em; caption tracking 0.05em.
- **Spacing:** 8px base — 4/8/12/16/24/32/48/64/96/128.
- **Radii:** 4/8/12/16/24/32/pill(999).
- **Shadows/glow:** `--shadow-lg: 0 18px 48px rgba(0,0,0,0.55)`;
  `--glow-gold: 0 0 40px rgba(212,175,55,0.28)`; `--glow-gold-sm: 0 0 16px ...0.25`.
- **Motion:** ease-standard `cubic-bezier(0.4,0,0.2,1)`, ease-out
  `cubic-bezier(0.16,1,0.3,1)`; durations 140 / 240 / 420ms.

## Assets
In `assets/` (originals from `github.com/aracelissm/tenderside`):
- `logos/tenderside-logo.png` — primary gold monolith + wordmark (dark bg only)
- `logos/tenderside-symbol.png` — monolith symbol (hero art)
- `logos/tenderside-icon.png` — square app icon (nav/footer)
- `imagery/hero-journal-sunset.png` — hero art: gratitude journal + branded book at sunset (current homepage hero)
- `imagery/homepage-hero.png`, `imagery/manual-hero.png` — cinematic hero art
> The Tenderside logos are rendered gold-on-black; use only on dark surfaces. No flat
> vector logo was provided.

## ⚠️ Substitutions (pending real brand assets)
- **Fonts** — Cormorant Garamond / Montserrat / IBM Plex Mono are commercial and were **not** provided.
  Closest Google Fonts substitute: Cormorant Garamond / Montserrat / IBM Plex
  Mono. Swap for licensed files (`next/font/local`) when available.
- **Icons** — Tenderside's bespoke line-icon set exists only as raster art. The
  prototype/reference uses **lucide-react** as the closest thin-line match, mapped
  by concept (communication→message-circle, blind-spots→eye-off,
  growth-areas→sprout, relationships→users, etc.). Swap for the real SVGs later.

---

## Recommended implementation (Next.js 14 App Router)

Reproduce this structure (the reference implementation matched it exactly):

```
app/
  layout.js      # next/font (Cormorant Garamond, Montserrat, IBM Plex Mono)
                 # exposes --font-cormorant / --font-hanken / --font-plex-mono on <html>;
                 # imports globals.css; sets metadata + themeColor #0B0B0D
  page.js        # composes: <Nav/><Hero/><ValueGrid/><ManualShowcase/>
                 #           <CompatBand/><ClosingCTA/><Footer/>
  globals.css    # paste tokens/*.css values into :root; base resets;
                 # .container/.nx-eyebrow/.nx-caption/.reveal utilities;
                 # keyframes nx-float / nx-pulse-glow / nx-fade-up; reduced-motion
components/
  ui/    Button Card Badge Icon ProgressBar ProgressRing Avatar Reveal
         # 'use client' on any using hooks (Button, Card, Icon, ProgressRing, Reveal)
  site/  Nav Hero ValueGrid ManualShowcase CompatBand ClosingCTA Footer
public/
  logos/ imagery/   # copy from this bundle's assets/
```

Notes for the build:
- Font families are set via `next/font/google` variables in `layout.js`; `globals.css`
  references them as `--font-display / --font-body / --font-mono`.
- Icon component wraps `lucide-react`; keep a concept→glyph map so swapping to real
  Tenderside icons later is a one-file change.
- All component styling in the reference is inline style objects reading the CSS
  custom properties — you may convert to CSS Modules/Tailwind to match your repo, but
  keep the exact token values.
- `Reveal` = IntersectionObserver wrapper adding `.is-visible`; used on every section.

## Files in this bundle
- `README.md` — this document (self-sufficient).
- `tenderside-website-preview.html` — the homepage prototype (source of truth).
- `styles.css`, `tokens/` — design tokens (exact values).
- `assets/logos/`, `assets/imagery/` — brand imagery.
