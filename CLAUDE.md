# CLAUDE.md — Tenderside Implementation Specification

**Purpose of this file:** This is the authoritative implementation reference for Claude Code.
The full product documentation lives in the founder's Claude.ai project (not this repo).
This file consolidates every locked decision from those documents and the strategy sessions
so the repo is self-sufficient. When this file conflicts with anything else in the repo,
this file wins — except the design system (see §11).

Last consolidated: July 2026.

---

## 1. What Tenderside is

Tenderside (umbrella company: **Prime73 AI**) is an AI-powered personal narrative platform.
A user completes a guided, emotionally intelligent conversation across **9 sections**, and
the system composes a beautifully written, shareable **personal manual** — a document that
helps the people who love them understand how they work.

**Core thesis:** most relationship pain comes from lack of legibility, not lack of love.

**Category positioning:** "AI to improve human-to-human understanding" — the AI is a means
to a human-readable artifact, NOT the relationship itself. The conversation has a defined
start and end. The product must never foster dependence on the AI. This positioning is
strategic (regulatory posture + press framing); acquisition language is relational and
concrete ("help your partner finally understand you"), not abstract.

**Beachhead persona (locked):** Relationship Builders — people 6–24 months into a serious
relationship. Every copy decision, default, and flow optimizes for this persona.

**The validation gate (locked):** **35%+ share rate within 7 days of manual creation.**
This is the single number that decides everything. Instrument it from the first deployed
version. If manuals don't get shared, nothing else matters — go back to the receiving moment.

### What Tenderside is NOT (resist all drift toward these)

- NOT a journaling app
- NOT a personality test (no MBTI / enneagram / archetype framing, ever)
- NOT a coaching or therapy tool
- NOT an AI companion (no persistent relationship with the AI, no re-engagement hooks to talk to the AI)
- NOT a decision-making assistant
- NOT a "self-discovery" product (that framing tested poorly — relational framing wins)
- NOT a social network
- NOT a B2B HR/team tool (B2B is explicitly post-validation)

If a feature request pulls toward any of these, flag it before implementing.

---

## 2. Supersession ledger — read before trusting older docs

The project-knowledge documents were authored under the prior brand and evolved over time.
The following decisions are LOCKED and override anything older:

| Superseded | Current (locked) |
| --- | --- |
| Product name "Lume", then "This is me." | **Tenderside** (no legacy names in code, copy, or metadata) |
| 7-section conversation (old business plan) | **9-section conversation** (Questionnaire + Engine docs are authoritative) |
| OpenAI API (old business plan) | **Anthropic API** (server-side only) |
| Supabase for MVP | **No database for MVP — Upstash Redis** (Supabase/auth is a post-MVP decision) |
| Vercel KV | **Upstash Redis** (Vercel KV is deprecated) |
| "Self-discovery" copy framing | **Relational framing** ("help them understand you") |
| Google Analytics | **PostHog** for product analytics |
| Next.js 14 (pinned) | **Next.js latest stable (16.x)** — Next 14 aged out of security support carrying unpatched RSC cache-poisoning, App Router XSS, SSRF and DoS advisories. Unpinned July 2026, while the scaffold was still four files and the migration was free. Keep current; do not re-pin to a major. |
| Product name "Lume" → "This is me." → "NexaMe" | **Tenderside** (final; no legacy names anywhere in code, copy, or metadata) |
| Eclipsed-sphere mark, then gold N-monolith mark | **Wordmark/mark pending redesign for Tenderside** — ink/gold/parchment system unchanged; the N-monolith no longer matches the name. Tagline "Understand. Grow. Become." retained pending brand review; landing/conversion copy stays relational |

Old docs referencing "SelfOS" describe the platform vision — the intelligence layer name is
fine internally, but the MVP is the consumer loop only. Translation Engine, Receiver
Companion, Evolution Tracker, couples mode, editions, Stripe, B2B: all post-validation.

---

## 3. Tech stack (locked)

| Layer | Choice |
| --- | --- |
| Framework | Next.js (latest stable — currently 16.x), App Router, TypeScript strict (no `any` escape hatches; no `@ts-ignore` without an explaining comment) |
| Styling | Tailwind CSS, tokens from the design system in this repo (§11) |
| State/persistence (MVP) | Upstash Redis (conversation state, manual storage, share tokens, rate limiting) |
| AI | Anthropic API — all calls via server-side route handlers only |
| Hosting | Vercel |
| Analytics | PostHog (funnel + share-rate instrumentation, §9) |
| Auth (MVP) | None for Phase 1–3. Phase 4 lean: Redis-backed magic links. Decision deferred until Phase 3 ships. |

No new dependencies without flagging them and justifying each one.

---

## 4. Security non-negotiables

1. **Anthropic API key is server-side only.** Never in client bundles, never in
   `NEXT_PUBLIC_*`. All model calls go through `/api/*` route handlers. (This was a live
   flaw in an early prototype — treat as a hard rule.)
2. **Rate limiting** on every AI route (Upstash Redis-based), per-IP and per-session.
3. **No PII in logs.** Never log conversation content, answers, manual text, names, or
   emails. Log event types, timings, token counts, error codes only.
4. **Share tokens** are unique, non-guessable (crypto-random, ≥128 bits), revocable by the
   sender, and never enumerable.
5. **Conversation content is sensitive by definition.** Encrypt at rest where the platform
   allows; minimize retention; no third-party processors beyond the locked stack.

---

## 5. Compliance requirements (MVP scope — not post-validation)

Tenderside sits in a gray zone relative to emerging companion-chatbot law (CA SB 243, NY,
WA HB 2225, OR SB 1546 with private right of action, CT PA 26-15 effective Oct 1 2026,
EU AI Act Art. 50 effective Aug 2 2026 for EU users). Tenderside is arguably NOT a companion
chatbot (bounded, task-oriented, artifact-producing) — but the baseline is cheap now and
expensive to retrofit. Build into MVP:

1. **AI disclosure** — clear, conspicuous "You're talking with an AI guide" at conversation
   start. Not buried in a ToS link.
2. **Recording consent** — explicit consent step before the conversation begins, covering
   that responses are stored and used to compose the manual (wiretap-grade consent: chatbot
   wiretap suits under ECPA/state statutes are the fastest-growing AI litigation category).
3. **Crisis protocol** — already specified in the safety system (§7.6): detect self-harm /
   abuse / suicidal-ideation language, pause generation, respond warmly, surface crisis
   resources. Log the event type (never the content).
4. **Age gate** — 18+ self-attestation at entry. No minor-directed features, ever.

Verify final legal posture with an attorney pre-public-launch; none of the above blocks a
private beta.

---

## 6. The product flow (end to end)

```
Landing (relational framing)
  → Onboarding (disclosure + consent + age gate + "what you'll create")
  → 9-section guided conversation (save & resume)
  → Generation moment ("Create My Manual" — user-initiated, never automatic)
  → Manual reveal (section-by-section, then full view)
  → Feedback ("Does this sound like you?") + inline editing
  → Share ceremony (sender flow)
  → Recipient experience (the actual product — see §8)
  → Recipient CTA: "Make My Own"  ← the entire growth loop in one button
```

### 6.1 The 9 sections (order and emotional arc — locked)

| # | Section | Depth | AI energy |
| --- | --- | --- | --- |
| 1 | How I Communicate | Entry-level | Warm, light — build rapport |
| 2 | What I Need to Feel Safe | Moderate | Thoughtful, affirming |
| 3 | Where I'm Tender (Triggers) | Deep | Gentle, spacious — **emotional check-in before section** |
| 4 | When I'm Overwhelmed | Deep | Still, patient — **check-in before; the "note for when I can't speak" is the most sacred input** |
| 5 | How I Navigate Disagreements | Mod-deep | Clear, non-judgmental — normalize conflict shame |
| 6 | The Lines That Keep Me Whole (Boundaries) | Moderate | Empowering, not exposing |
| 7 | How I Love and Want to Be Loved | Mod-deep | Warm, tender — let it breathe |
| 8 | A Guide to Showing Up for Me (Support) | Practical | Clear, concrete |
| 9 | What I Wish You Knew | Deepest | Reverent, minimal — **check-in before; AI speaks least here** |

### 6.2 Conversation mechanics

- One question at a time. Progress shown as a subtle chapter arc — never "question 14 of 63".
- Input types: free text (expandable), tappable multi-select cards with "Other", letter-space
  (distinct warm treatment for note-writing prompts).
- **Skip** is always available, warm, never penalized; skipped questions offered again at the end.
- **Save & resume** at any point (Redis session). Warm departure + return copy.
- **Dynamic follow-ups:** max 1 per section, only when an answer reveals something the
  scripted flow doesn't cover; always framed as an invitation.
- **Callbacks:** reference earlier answers in later sections, 2–3 per conversation max.
- **Response patterns** (from the AI Behavior Spec): Acknowledge→Bridge→Ask (default);
  Reflect→Deepen (powerful shares); Hold→Affirm→Offer Choice (painful shares);
  Celebrate→Transition (section completion); Witness (Section 9 — "I hear you." and space).
- Pacing sensitivity: quick answerers get rhythm; slow answerers get spaciousness.

### 6.3 The generation moment

- User-initiated: "Create My Manual" button after Section 9's closing affirmation.
- Generation experience is a designed moment, not a spinner: warm gold light animation,
  fragments of the user's own answers appearing and dissolving. 45–60s minimum perceived
  duration even if processing finishes faster; 90s hard ceiling.

---

## 7. The transformation engine

### 7.1 Architecture (locked): three API stages

The conceptual pipeline is Capture → Analyze → Synthesize → Transform → Polish. It is
implemented as **three model stages** (three prompts / calls):

| Stage | Covers | Output |
| --- | --- | --- |
| **Analysis** | Analyze + Synthesize: extract 4 signal layers (emotional themes, behavioral patterns, relational cues, tone signals); merge redundancies; find each section's emotional throughline | Structured analysis object (JSON) |
| **Composition** | Transform: apply voice-shift rules, map to the 9-section manual structure, write in the user's register | Draft manual (all 9 sections) |
| **Polish** | Polish: whole-document coherence pass; generate each section's "A Note for You"; enforce formatting rules | Final manual |

The prompts live in `/prompts/` as versioned files (`*.v1.md`). They were **authored from**
the source specifications in `documentation/` — chiefly "Engine — Answer-to-Manual
Transformation Logic" and "AI — Training and Behavior Specification" — not transcribed from
them. No literal prompt texts ever existed; see `prompts/README.md` for provenance. The
rules below are the spec those prompts must satisfy.

### 7.2 Voice-shift rules (inviolable)

- Questionnaire voice ("I need...") → manual voice speaking TO the loved one ("I need you to know...").
- **Match the person's register** — poetic stays poetic, plain stays plain, guarded stays brief.
  Never impose a voice they didn't use.
- Never amplify vulnerability beyond what was shared. Never pad thin answers.
- **NEVER** clinical/therapeutic language ("attachment style", "codependency", "trauma
  response") unless the user used those exact words.
- **NEVER** add emotions or experiences the person didn't express.
- **NEVER** soften strong feelings ("it makes me furious" stays furious).
- **ALWAYS** preserve powerful exact phrases as woven-in direct quotes.
- Goal: the best version of what they said — not different, just clearer.

### 7.3 Preservation hierarchy

Four tiers govern how much the engine may edit any answer (Engine doc §4.2). The
percentages are quoted to the composition prompt so the tiers mean something concrete:

| Tier | Editing | Applies to |
| --- | --- | --- |
| **Sacred** | 5–10% — grammar and flow only | The Overwhelm Note; the Section 9 letter opening; any phrase clearly crafted with care |
| **High** | 15–25% — clarity and formatting | "A Note for You" sources; self-authored scripts; deeply personal revelations |
| **Standard** | 40–60% — restructured, woven into narrative | Most answers — behaviours, preferences, patterns |
| **Condensed** | 60–80% — merged and distilled | Redundant answers saying the same thing across prompts |

Highest-preservation inputs:

1. **The Overwhelm Note** (Section 4, "note for when I can't speak") — highest priority of all.
2. Section 9 letter opening — engine intervention at absolute minimum (~80% user's words / 20% connective tissue).
3. Any "If I could leave a small note..." answers — used verbatim or near-verbatim when powerful.

**Two answers are NEVER included in the manual.** Both are enforced structurally, by
filtering on `excludeFromManual` in `lib/questionnaire/sections.ts` before the engine
input is assembled — not by asking a prompt to remember:

- **Section 2's origin question** ("Can you trace this need back?") — the Engine doc calls
  this "private archaeology — for the person's awareness, not the reader's." It shapes the
  gentleness of the section; its content never surfaces. Leaking it would put a childhood
  memory into a document handed to a partner.
- **Section 9's "How does sharing this feel?"** multi-select — tone calibration only.

### 7.4 "A Note for You" (per-section closing)

- Primary source: the final prompt of each questionnaire section; enrich from the section's
  most emotionally revealing answer if thin.
- Voice: whispered aside — intimate, slightly more vulnerable than the body.
- 2–4 sentences max. Always italicized. Never opens with "Dear".

**Support scripts (Section 8):** if the user supplies their own healing phrases, use them
verbatim with light polish. If they don't, generate 3–4 drawn from their core needs,
trigger responses, overwhelm needs and conflict-repair language. Scripts must sound like
what *that person* would want to hear — never generic affirmation.

### 7.5 Manual output rules

- Per section: Title (gold accent) → 2–4 flowing prose paragraphs → "A Note for You".
- Reads like a letter, not a report: no bullet lists in the body (exception: support
  scripts in Section 8 if the user's style is list-oriented), no numbered items, no
  clinical headers. Warm human subsection headers ("How I express myself best").
- Length calibration: minimal answers → 150–250 words/section; moderate → 250–400;
  deep → 400–600. Whole manual **never exceeds 4,000 words**.

### 7.6 Edge cases

- **Crisis content:** engine does NOT generate a manual; warm message + crisis resources;
  user may continue when ready or save and return (see §5.3).
- **Contradictory answers:** hold space for complexity; never force consistency. The engine
  may gently name the tension ("Sometimes I need space. And sometimes, in the very same
  moment, I need you not to go. Both are true.") but never resolves it.
- **Gaps** are softened, never fabricated. Too-thin answers → omit the subsection gracefully;
  never generic filler ("like many people...", "this is common..."). A fully skipped section
  renders exactly: *"This section is still finding its words. It may be added later as
  clarity grows."*
- **Very short answers across the board** (majority 1–5 words) → generate a condensed
  single-page manual rather than padding. A short manual that sounds true is better than a
  long one that sounds fabricated.
- **Non-English answers:** the manual is generated in the same language as the answers.
  Voice rules apply across all languages.
- **User writes about someone else** ("my partner always...") → gently recentre on their own
  experience ("When that happens, I feel..."). The manual is about them, not anyone else.
- **Repeated phrases:** if a powerful phrase appears in several answers, use it once, in its
  strongest placement, rather than repeating it.

---

## 8. The share system — the recipient experience IS the product

Development attention has historically over-concentrated on the creation flow. The moment a
partner opens the manual is structurally the most important interaction in the product.
Budget disproportionate polish here.

### 8.1 Sender flow (a ceremony, not a link copy)

1. "Share My Manual" from manual view.
2. Recipient input: name + email — **up to 2 recipients for MVP**.
3. Message customization: warm default provided ("I want to share something with you...");
   editable, replaceable, or omittable.
4. Confirmation moment: "You're about to share your manual with [Name]. This is brave." →
   gold "Share My Manual" button. Secondary: "Not yet — save for later."
5. Generate unique secure token link; send branded email invitation.

### 8.2 Recipient flow

1. **Email:** subject "[Name] shared something personal with you"; sender's message; gold
   "Open Their Manual" button.
2. **Landing:** "[Name]'s Tenderside Manual" + orientation ("This is a personal guide to
   understanding someone who trusts you. Read it with care.") → "Begin Reading".
3. **Reading:** section-by-section, gentle pacing, "A Note for You" visually highlighted.
   Closing: "This manual was shared with you as an act of trust."
4. **Response (optional):** predefined ("I read your manual. Thank you.") or custom; sender
   is notified on open and on response (open notification only — no read-depth tracking).
5. **The growth loop:** persistent, warm "Make My Own" CTA. This button is the viral
   mechanism; treat its placement and copy as a first-class design problem.

### 8.3 Share security

Tokens per §4.4. Links revocable from the sender's view. Recipient pages are read-only,
no-index, and require the token — never a guessable slug.

---

## 9. Instrumentation (day one, before polish)

PostHog events — the funnel is the whole scoreboard:

```
landing_view → onboarding_start → consent_complete → conversation_start
→ section_complete (1..9, with per-section timing + skip flags)
→ manual_generated → manual_share_initiated → manual_shared
→ recipient_open → recipient_read_complete → recipient_response
→ recipient_make_my_own_click
```

Derived metrics: per-section drop-off, skip rates, edit rates per manual section,
"sounds like me" ratings, and **the gate: shares within 7 days of generation / manuals
generated**. Ship the metric before shipping polish.

---

## 10. Build phases

Each phase has a binary Definition of Done. Do not start the next phase before the DoD passes.

**Phase 1 — Conversation loop.**
Onboarding (disclosure/consent/age gate) + all 9 sections with save/resume, skip,
check-ins, streaming responses via `/api/conversation` (the scaffold's route is the
security-pattern reference). DoD: a stranger can complete all 9 sections on mobile web
with no assistance, state survives refresh, no client-side API key, rate limiting live.

**Phase 2 — Engine + manual.**
Three-stage engine, generation moment, section-by-section reveal, full manual view
(single theme: Minimal Glow / Classic layout), feedback prompt, inline editing.
DoD: a completed conversation reliably produces a ≤4,000-word manual obeying §7 rules,
crisis path verified with test inputs, generation ≤90s.

**Phase 3 — Share loop + instrumentation.**
Sender ceremony, email delivery, recipient experience, notifications, revocation,
"Make My Own" CTA, full PostHog funnel. DoD: end-to-end loop works
(create → share → recipient opens → clicks Make My Own → lands in onboarding),
share-rate metric computes correctly on test data.

**Phase 4 — Auth + hardening (decide then).**
Redis-backed magic links (current lean — decision deferred until Phase 3 ships),
account/manual management, performance (<2s page loads, <5s AI responses),
cross-browser + accessibility pass, error handling for API timeouts / connection loss
mid-answer.

**Then: beta.** 20–30 users → structured feedback + interviews → fix "must fix" →
50–100 soft-launch users → measure the 35% gate. Everything after that is gated on
the number.

---

## 11. Brand + design system

- The **design system in this repo (from Claude Design) is authoritative** for tokens,
  components, spacing, and interaction patterns. Do not re-derive styles.
- It must express the locked brand values: near-black background, antique gold `#B08D3E`,
  parchment/pearl palette, **Fraunces** display + **Inter** UI. If the repo's design
  system diverges from these values, **flag the discrepancy — do not silently override
  in either direction.**
- The brand mark is being redesigned for the Tenderside name (the prior gold
  N-monolith is retired). Until the new mark lands, use the Tenderside wordmark in
  Fraunces with the trailing gold period ("Tenderside.") as the interim mark.
  The final mark ships as a static asset for MVP (no generated/animated
  component). It should feel reverent, not decorative.
- Copy tone: warm, direct, emotionally honest. Never therapeutic, never self-help,
  never "unlock your potential". Test: if a line could appear on a meditation app,
  rewrite it.

---

## 12. Working preferences for Claude Code sessions

- **Ship over plan.** The founder has a documented pattern of extensive planning as
  avoidance. If a request reads as more planning when implementation is what's needed,
  say so plainly.
- **Honest math over motivational framing.** If something will take longer, say so.
  If an approach won't serve the share-rate gate, say so.
- One coherent unit of work per session; don't sprawl across files unnecessarily.
- Reference-ready deliverables: complete, scannable code; comments explain the *why*.
- All Prime73/Tenderside work happens on **personal devices and accounts only** — never
  Qolo equipment, accounts, or infrastructure. Standing rule.

---

## 13. Open questions / known unknowns

- **Domains:** SECURED — tenderside.com, .app, .dev, .net, .org, .info all registered
  (July 2026), ICANN email verified. **Canonical production domain: tenderside.com**
  (bare, no www). All other domains and www variants 301-redirect to it. Every
  share link, OG tag, email link, and QR code uses https://tenderside.com — never
  any other TLD.
- **Social handles:** @tendersideapp claimed on TikTok and Instagram. Bare
  @tenderside is held by third parties on both platforms (an online store on IG;
  unknown holder on TikTok) — post-launch acquisition conversations, not blockers.
- **Legal entity:** Florida LLC formation in progress via Sunbiz (direct filing;
  entity-name decision — Prime73 AI LLC d/b/a Tenderside vs. Tenderside LLC —
  pending attorney input). LLC must exist before beta users.
- **Trademark:** Attorney knockout search + Intent-To-Use filing for TENDERSIDE
  pending — filed BY THE LLC, not the individual. Gates PUBLIC launch (not
  private beta). Brief must cover: the IG store using "tenderside," the TikTok
  @tenderside holder, and Match Group's TINDER-adjacent enforcement history.
- **Auth approach** for Phase 4 not finalized (magic-links lean; defer).
- **The 35% share-rate target is itself the central unvalidated assumption.**
  Instrument from the first deployed version.
- Legal review of companion-chatbot classification (§5) before public launch.

---

## 14. Where the deep source docs live

**They live in `../tenderside-documentation/`** — a sibling folder, deliberately OUTSIDE
this repo (47 files, `.docx` and `.pdf`). Read them directly; there is no longer any need
to ask the founder to paste anything.

They are kept out of the repo on purpose: they include the Monetization Blueprint, the
Investor and Collaborator Vision Document, the Executive Summary, Founder Scripts and the
Production Roadmap. Committing them would write the business model and investor materials
into git history permanently, where they are painful to remove and exposed the moment the
repo is public. **Do not move them back in, and do not commit them.** Nothing in the build
reads from them at runtime — the content they supply is already ported into
`lib/questionnaire/` and `prompts/`.

Two cautions when reading them:

1. **All of them are legacy-branded** — "This is me", "Lume"/"Lumé", "NexaMe", "SelfOS".
   Per §2, no legacy name may reach code, copy, or metadata. Rebrand on port.
2. **Where a document conflicts with this file, this file wins** (§2 supersession ledger) —
   except the questionnaire content and engine transformation rules, where the source
   documents are authoritative and this file is a summary of them.

The documents:

- Business plan / executive summary *(note: partially superseded — see §2)*
- Technical implementation guide
- AI training & behavior specification (full response patterns, few-shot examples)
- Engine — Answer-to-Manual transformation logic (full per-section mapping + example transformations)
- Questionnaire — all 9 sections' exact prompts and multi-select options
- Experience architecture — complete user journey (screen-level specs)
- Manual format specification
- MVP launch playbook (beta protocol, launch-week cadence, analytics plan)

**Correction (July 2026):** earlier versions of this file stated that the Analysis /
Composition / Polish prompts existed as copy-paste-ready texts to be versioned verbatim.
A search of all 33 documents found no such texts — the Technical Implementation Guide in
fact *instructs* that a system prompt be written ("write a comprehensive system prompt of
3,000–6,000 tokens that encodes the complete Behavior Spec"). The prompts in `/prompts/`
are therefore authored deliverables, traceable line-by-line to the specs but not
transcriptions. Treat them as code: review them, version them, never edit a shipped
version in place.

The questionnaire content *did* exist verbatim and is ported as typed data in
`lib/questionnaire/sections.ts` — 9 sections, 47 questions, with each answer's
preservation tier, manual mapping, and exclusion flag. `lib/questionnaire/verify.ts`
asserts the invariants (both exclusions, both sacred answers, check-ins before 3/4/9);
run it with `npm run verify:questionnaire`.
