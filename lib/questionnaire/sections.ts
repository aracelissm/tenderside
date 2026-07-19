import type { Section } from "./types";

/**
 * The nine sections, verbatim from the source documents in
 * ../tenderside-documentation/ (deliberately outside this repo).
 *
 * Question set follows the Engine doc's transformation map (§3.1–3.9) — that map
 * defines which prompts have a destination in the manual, so it is the canonical
 * list. The Guided Reflection Journey contributes the option lists; where it
 * carries a prompt the Engine has no mapping for, that prompt is omitted rather
 * than captured-and-discarded (noted inline).
 *
 * Legacy branding in the sources ("This is me Manual™", "SelfOS") is rebranded
 * per CLAUDE.md §2. Emotional content, ordering and phrasing are otherwise the
 * founder's, not rewritten.
 */
export const SECTIONS: readonly Section[] = [
  // ── 1 ──────────────────────────────────────────────────────────────────
  {
    number: 1,
    id: "communication",
    title: "How You Communicate",
    manualTitle: "How I Communicate",
    depth: "entry",
    aiEnergy: "Warm, light, building rapport. This is the first real question — earn trust before asking for depth.",
    checkInBefore: false,
    intro:
      "Let's start somewhere familiar — the way you talk, the way you share what's inside. Everyone has a rhythm. Let's find yours.",
    closing:
      "Thank you for that. You just gave someone a map to your voice. That's a gift. Take a breath. When you're ready, let's go a little deeper.",
    noteForYouSourceId: "s1.q6",
    questions: [
      {
        id: "s1.q1",
        prompt:
          "When something important is on your mind — a feeling, a frustration, a thought you can't shake — what do you usually do with it?",
        input: "multiselect",
        options: [
          "Talk it through right away",
          "Write it down first",
          "Go quiet and process internally",
          "Wait until I feel safe enough to share",
        ],
        allowOther: true,
        preservation: "standard",
        mapsTo: "How I express myself best",
      },
      {
        id: "s1.q2",
        prompt:
          "And when you do share — what's the way that feels most natural?",
        helper:
          "Some people need to be face-to-face. Others feel safer in a text or a voice note.",
        input: "multiselect",
        options: [
          "Face-to-face conversation",
          "Text or written messages",
          "Long, deep talks",
          "Quick check-ins",
          "Voice notes",
          "Creative expression (art, music, etc.)",
        ],
        allowOther: true,
        preservation: "standard",
        mapsTo: "How I express myself best",
      },
      {
        id: "s1.q3",
        prompt:
          "Now, picture a moment where you felt truly heard by someone. Not just listened to — but heard. What did they do? What made that moment different?",
        input: "text",
        preservation: "standard",
        mapsTo: "What helps me feel heard",
      },
      {
        id: "s1.q4",
        prompt:
          "Now the other side — because this matters too. What shuts you down? What makes you stop sharing?",
        input: "multiselect",
        options: [
          "Raised voices",
          "Being interrupted",
          "Dismissive body language",
          "Sarcasm or eye-rolling",
          'Being told I\'m "too much" or "too sensitive"',
          "Feeling rushed",
        ],
        allowOther: true,
        preservation: "standard",
        mapsTo: "What shuts me down",
      },
      {
        id: "s1.q5",
        prompt:
          "And when you go quiet — because we all do sometimes — what's usually happening inside? And what do you need in that moment from the people around you?",
        input: "text",
        preservation: "high",
        mapsTo: "A note for you",
      },
      {
        id: "s1.q6",
        prompt:
          "Last one for this part. If you could leave a small note for the people who love you — just a few honest lines about how you communicate — what would it say?",
        input: "letter",
        preservation: "high",
        mapsTo: "A note for you",
      },
    ],
  },

  // ── 2 ──────────────────────────────────────────────────────────────────
  {
    number: 2,
    id: "safety",
    title: "What You Need to Feel Safe",
    manualTitle: "What I Need to Feel Safe",
    depth: "moderate",
    aiEnergy: "Thoughtful, affirming, gently curious.",
    checkInBefore: false,
    intro:
      "Safety isn't just about locked doors and steady ground. It's emotional too — that feeling that you can be exactly who you are without consequence. Let's talk about what makes you feel held.",
    closing:
      "You just named something most people spend years trying to understand about themselves. That takes honesty. I see you. Let's keep going.",
    noteForYouSourceId: "s2.q5",
    questions: [
      {
        id: "s2.q1",
        prompt:
          "If you could name the emotional needs that matter most to you — the ones that, when they're met, make everything feel okay — what would they be?",
        helper: "Select all that resonate.",
        input: "multiselect",
        options: [
          "Reassurance",
          "Consistency",
          "Honesty",
          "Gentleness",
          "Space to feel without fixing",
          "Quality time",
          "Physical closeness",
          "Verbal affirmation",
          "Autonomy",
          "Predictability",
          "Patience",
        ],
        allowOther: true,
        preservation: "standard",
        mapsTo: "My core emotional needs",
      },
      {
        id: "s2.q2",
        prompt:
          "And on an ordinary day — not a crisis, just a regular Tuesday — how do those needs show up?",
        helper:
          "For example: I need a good-morning text. I need 10 minutes of silence when I get home. I need to know the plan.",
        input: "text",
        preservation: "standard",
        mapsTo: "How these needs show up day-to-day",
      },
      {
        id: "s2.q3",
        prompt:
          "Now here's a tender one. When those needs aren't being met — when something's missing — what happens to you?",
        helper: "There's no wrong answer here.",
        input: "multiselect",
        options: [
          "Withdraw and go silent",
          "Overfunction and take care of everyone else",
          "Get anxious or clingy",
          "Feel resentful but not say anything",
          "Shut down emotionally",
          "Become irritable",
        ],
        allowOther: true,
        preservation: "standard",
        mapsTo: "When my needs aren't met",
      },
      {
        id: "s2.q4",
        prompt:
          "Can you trace this need back? Is there an early memory, a moment, a season of your life where this need first became important?",
        helper:
          "This one is optional — and it stays with you. It shapes how gently your manual is written, but it is never printed in it.",
        input: "text",
        optional: true,
        preservation: "standard",
        // Engine doc §3.2, "Critical Rule — The Origin Question": the ONLY
        // question whose answer is intentionally excluded from the manual.
        // Private archaeology — for the person's awareness, not the reader's.
        mapsTo: null,
        excludeFromManual: true,
      },
      {
        id: "s2.q5",
        prompt:
          "If the people who love you could understand just one thing about what you need to feel safe — one thing that would change everything — what would it be?",
        input: "text",
        preservation: "high",
        mapsTo: "A note for you",
      },
    ],
  },

  // ── 3 ──────────────────────────────────────────────────────────────────
  {
    number: 3,
    id: "tender",
    title: "Where You're Tender",
    manualTitle: "My Triggers & Sensitivities",
    depth: "deep",
    aiEnergy:
      "Gentle, spacious. Never minimize, never dramatize, never pathologize. Present tenderness as human and worthy of care.",
    checkInBefore: true,
    intro:
      "We all carry tender places — spots where old pain meets present moments. This isn't about blame or brokenness. It's about awareness. And the people who love you deserve to know where to step gently.",
    closing:
      "That was brave. The tender places are the hardest to name — and you just did. Let's keep going, gently.",
    noteForYouSourceId: "s3.q5",
    questions: [
      {
        id: "s3.q1",
        prompt:
          "What tends to activate you — the things that flip a switch inside, even when you wish they wouldn't?",
        input: "multiselect",
        options: [
          "Feeling dismissed or ignored",
          "Being compared to others",
          "Sudden changes in plans",
          "Shifts in someone's tone",
          "Feeling like a burden",
          "Being criticized publicly",
          "Perceiving rejection",
          "Feeling controlled",
          "Silence or withdrawal from someone I love",
          "Being lied to",
        ],
        allowOther: true,
        preservation: "standard",
        mapsTo: "Things that activate me",
      },
      {
        id: "s3.q2",
        prompt:
          "And underneath that trigger — if you sit with it for a moment — what's the feeling beneath the feeling?",
        helper: "Take your time with this one.",
        input: "multiselect",
        options: [
          "Fear of abandonment",
          "Fear of not being enough",
          "Fear of being too much",
          "Shame",
          "Helplessness",
          "Loss of control",
          "Old grief",
          "Loneliness",
        ],
        allowOther: true,
        // Presented ONLY in the language the person used. No clinical upgrades.
        preservation: "high",
        mapsTo: "What's underneath the trigger",
      },
      {
        id: "s3.q3",
        prompt:
          "When you're activated, there's usually a difference between what people see on the outside and what's actually happening inside. Can you describe both?",
        input: "dual-text",
        dualLabels: ["On the outside, I...", "On the inside, I..."],
        preservation: "high",
        mapsTo: "What you see vs. what's happening",
      },
      {
        id: "s3.q4",
        prompt:
          "When you're in that activated place — what helps you come back to yourself? What can someone do — or not do — that actually helps?",
        input: "text",
        preservation: "standard",
        mapsTo: "How to approach me when I'm activated",
      },
      {
        id: "s3.q5",
        prompt:
          "And if you could tell the people who love you one thing about your triggers — something that would change the way they respond — what would it be?",
        input: "text",
        preservation: "high",
        mapsTo: "A note for you",
      },
    ],
  },

  // ── 4 ──────────────────────────────────────────────────────────────────
  {
    number: 4,
    id: "overwhelm",
    title: "When You're Overwhelmed",
    manualTitle: "What Happens When I'm Overwhelmed",
    depth: "deep",
    aiEnergy:
      "Still, patient. Use warm human language for stress responses — never clinical labels unless the person used them first.",
    checkInBefore: true,
    intro:
      "Overwhelm is the body's way of saying 'too much, too fast.' And everyone's version looks different. Let's map yours — so the people around you can recognize it and respond with care, even when you can't ask.",
    closing:
      "You just gave your future self a voice for the moments when words disappear. That's extraordinary.",
    noteForYouSourceId: "s4.q5",
    questions: [
      {
        id: "s4.q1",
        prompt:
          "When stress builds up and it all becomes too much — what happens to you?",
        helper: "Or maybe it's a blend — that's very common.",
        input: "multiselect",
        options: [
          "Fight — I get sharp, frustrated, need to fix or confront",
          "Flight — I pull away, need space, need to move",
          "Freeze — I shut down, can't think or speak or decide",
          "Fawn — I over-accommodate, say I'm fine, absorb everyone else's feelings",
        ],
        allowOther: true,
        preservation: "standard",
        mapsTo: "My go-to stress response",
      },
      {
        id: "s4.q2",
        prompt:
          "And from the outside — what does your overwhelm look like? What would someone see?",
        helper:
          "Do you get quiet? Snap? Cry? Clean the house? Scroll your phone? Disappear into work?",
        input: "text",
        preservation: "standard",
        mapsTo: "What it looks like from the outside",
      },
      {
        id: "s4.q3",
        prompt:
          "Here's the important one. What do you actually need when you're overwhelmed — even if you can't say it in the moment?",
        input: "multiselect",
        options: [
          "Space and silence",
          "Someone to sit with me quietly",
          "Physical touch (hug, hand-hold)",
          "To be told everything will be okay",
          "A practical plan or next step",
          "To cry without being fixed",
          "Time alone to regulate",
          "A change of scenery",
        ],
        allowOther: true,
        preservation: "standard",
        mapsTo: "What I actually need in that moment",
      },
      {
        id: "s4.q4",
        prompt:
          "And the opposite — what's the worst thing someone can do when you're in that place?",
        input: "text",
        preservation: "standard",
        mapsTo: "What I actually need in that moment",
      },
      {
        id: "s4.q5",
        prompt:
          "Imagine you could write a small note — something the people who love you could read when you're too overwhelmed to speak. A note that says what you need when you can't say it. What would it say?",
        input: "letter",
        // Engine doc §3.4: "the highest preservation priority of ANY answer in
        // the questionnaire." Their emergency voice. It must sound like them,
        // not like the engine. Light grammatical smoothing only.
        preservation: "sacred",
        mapsTo: "A note for you",
      },
    ],
  },

  // ── 5 ──────────────────────────────────────────────────────────────────
  {
    number: 5,
    id: "conflict",
    title: "How You Navigate Disagreements",
    manualTitle: "How I Navigate Disagreements",
    depth: "moderate-deep",
    aiEnergy:
      "Clear, non-judgmental. Avoidance is not weakness; directness is not aggression. Normalize conflict shame.",
    checkInBefore: false,
    intro:
      "Conflict is not the enemy of love — disconnection is. And everyone has a pattern when things get hard. Let's map yours — not to judge it, but to understand it.",
    closing:
      "Conflict is where love is tested — and you just mapped the way through yours. That's powerful. Let's talk about something just as important: your boundaries.",
    noteForYouSourceId: "s5.q5",
    questions: [
      {
        id: "s5.q1",
        prompt:
          "When a disagreement starts — maybe with a partner, a friend, a family member — what's your first instinct?",
        input: "multiselect",
        options: [
          "Address it head-on immediately",
          "Avoid it and hope it passes",
          "Go quiet and need time before responding",
          "Get defensive",
          "Shut down and withdraw",
          "Try to smooth it over quickly",
        ],
        allowOther: true,
        preservation: "standard",
        mapsTo: "My natural conflict pattern",
      },
      {
        id: "s5.q2",
        prompt:
          "And during the conflict itself — what do you need to stay in it without shutting down?",
        input: "multiselect",
        options: [
          "Calm, steady voices",
          "A break before continuing",
          "Reassurance that we're okay",
          "Directness — just say what you mean",
          "Physical space",
          "Emotional validation before solutions",
          "Eye contact",
        ],
        allowOther: true,
        preservation: "standard",
        mapsTo: "What I need during conflict",
      },
      {
        id: "s5.q3",
        prompt:
          "Now the escalators — the things that make it worse. What turns a disagreement into something bigger?",
        input: "multiselect",
        options: [
          "Stonewalling or the silent treatment",
          "Bringing up past issues",
          "Ultimatums or threats",
          "Yelling or raised voices",
          "Dismissing my feelings",
          "Walking away without a word",
          "Being told I'm overreacting",
        ],
        allowOther: true,
        preservation: "standard",
        mapsTo: "What escalates things for me",
      },
      {
        id: "s5.q4",
        prompt:
          "And after the storm passes — what does repair look like for you? How does someone come back to you?",
        helper:
          "A soft word? A written note? Physical closeness? Acknowledgment? Time?",
        input: "text",
        preservation: "standard",
        mapsTo: "How to repair with me",
      },
      {
        id: "s5.q5",
        prompt:
          "If you could tell the people who love you one thing about how you handle conflict — what would help them the most?",
        input: "text",
        preservation: "high",
        mapsTo: "A note for you",
      },
    ],
  },

  // ── 6 ──────────────────────────────────────────────────────────────────
  {
    number: 6,
    id: "boundaries",
    title: "The Lines That Keep You Whole",
    manualTitle: "My Boundaries",
    depth: "moderate",
    aiEnergy:
      "Empowering, not exposing. Firm boundaries are stated without apology and never softened.",
    checkInBefore: false,
    intro:
      "Boundaries are not walls. They're the architecture that lets you stay open. And naming them — clearly, without apology — is one of the most loving things you can do for yourself and the people around you.",
    closing:
      "Boundaries are love in structure form. You just named the shape of yours. Now let's talk about the heart — how you love and how you want to be loved.",
    noteForYouSourceId: "s6.q5",
    questions: [
      {
        id: "s6.q1",
        prompt:
          "Let's start with the firm ones — the non-negotiables. The things that, no matter what, you need to be honored.",
        helper:
          "These might be about how people speak to you, your privacy, your time, your space, your body, topics that are off-limits.",
        input: "text",
        preservation: "standard",
        mapsTo: "Boundaries I hold firmly",
      },
      {
        id: "s6.q2",
        prompt:
          "Now the growing edges — the boundaries you're still learning to hold. Where are you still finding your footing?",
        helper:
          "Maybe it's saying no. Maybe it's not over-explaining yourself. Maybe it's protecting your energy when someone drains it.",
        input: "text",
        preservation: "standard",
        mapsTo: "Boundaries I'm still learning to hold",
      },
      {
        id: "s6.q3",
        prompt: "When you set a boundary, how does it usually come out?",
        input: "multiselect",
        options: [
          "State it directly and clearly",
          "Hint at it and hope people notice",
          "Set it but feel guilty",
          "Struggle to set it at all",
          "Set it through withdrawal",
          "Write it rather than say it",
        ],
        allowOther: true,
        preservation: "standard",
        mapsTo: "How I communicate boundaries",
      },
      {
        id: "s6.q4",
        prompt:
          "And when someone crosses a boundary — what happens inside you? And what do you usually do?",
        input: "multiselect",
        options: [
          "Address it immediately",
          "Let it go and feel resentful later",
          "Shut down or withdraw",
          "Overexplain myself",
          "Feel guilty for having the boundary",
          "Get upset but not say why",
        ],
        allowOther: true,
        preservation: "standard",
        mapsTo: "How to honor my boundaries",
      },
      {
        id: "s6.q5",
        prompt:
          "What do you wish the people who love you understood about your boundaries?",
        input: "text",
        preservation: "high",
        mapsTo: "A note for you",
      },
    ],
  },

  // ── 7 ──────────────────────────────────────────────────────────────────
  {
    number: 7,
    id: "love",
    title: "How You Love and Want to Be Loved",
    manualTitle: "Affection & Connection",
    depth: "moderate-deep",
    aiEnergy: "Warm, tender — let it breathe.",
    checkInBefore: false,
    intro:
      "Love has a language — and yours is unique. It was shaped by everything you've lived, lost, and longed for. Let's translate it together.",
    closing:
      "You just described the shape of your love. That's one of the most beautiful things a person can do. Almost there. Let's talk about how to show up for you.",
    noteForYouSourceId: "s7.q6",
    questions: [
      {
        id: "s7.q1",
        prompt: "How do you naturally show love?",
        helper: "Select all that apply.",
        input: "multiselect",
        options: [
          "Acts of service (doing things for people)",
          "Words of affirmation (saying how I feel)",
          "Quality time (undivided attention)",
          "Physical touch (closeness, holding, warmth)",
          "Gift-giving (thoughtful gestures)",
          "Creating experiences",
          "Protective care",
          "Quiet presence",
        ],
        allowOther: true,
        preservation: "standard",
        mapsTo: "How I show love",
      },
      {
        id: "s7.q2",
        prompt:
          "And how do you most want to receive love? This might be different from how you give it — that's common and completely okay. What fills your cup?",
        input: "text",
        preservation: "standard",
        mapsTo: "How I receive love best",
      },
      {
        id: "s7.q3",
        prompt:
          "Think of a moment when you felt deeply connected to someone. Not just close — connected. What was happening? What made it feel that way?",
        input: "text",
        preservation: "standard",
        mapsTo: "What makes me feel most connected",
      },
      {
        id: "s7.q4",
        prompt: "And the opposite — what makes you feel disconnected?",
        input: "multiselect",
        options: [
          "Someone is physically present but emotionally absent",
          "Promises are broken",
          "I feel like an afterthought",
          "There's no quality time",
          "Affection feels performative",
          "Communication drops off",
          "I'm not prioritized",
        ],
        allowOther: true,
        preservation: "standard",
        mapsTo: "What makes me feel disconnected",
      },
      {
        id: "s7.q5",
        prompt:
          "Is there a small thing — maybe something no one would think of — that always makes you feel loved?",
        input: "text",
        // Engine doc §3.7 calls this "a golden detail" — often the single most
        // actionable line in the whole manual. Must be surfaced, not buried.
        preservation: "high",
        mapsTo: "How I receive love best",
      },
      {
        id: "s7.q6",
        prompt:
          "And if you could design the perfect moment of connection — no limits, just feeling — what would it look like?",
        input: "text",
        preservation: "high",
        mapsTo: "A note for you",
      },
    ],
  },

  // ── 8 ──────────────────────────────────────────────────────────────────
  {
    number: 8,
    id: "support",
    title: "A Guide to Showing Up for You",
    manualTitle: "How to Support Me",
    depth: "moderate",
    aiEnergy:
      "Clear, concrete, practical. This is the section a reader scans in a real moment — usefulness beats lyricism.",
    checkInBefore: false,
    intro:
      "Sometimes the people who love us want to help but don't know how. This section is your way of telling them — clearly, specifically, from the heart.",
    closing:
      "You just wrote a support guide — from the inside out. The people who read this will know exactly how to show up for you. One more section. The most important one.",
    noteForYouSourceId: "s8.q5",
    noteForYouByEnrichment: true,
    questions: [
      {
        id: "s8.q1",
        prompt: "When you're sad — really sad — what helps, and what makes it harder?",
        input: "dual-text",
        dualLabels: [
          "The best thing someone can do is...",
          "...and the worst thing is...",
        ],
        preservation: "standard",
        mapsTo: "When I'm sad",
      },
      {
        id: "s8.q2",
        prompt: "When you're anxious — when the worry is running — what helps, and what makes it worse?",
        input: "dual-text",
        dualLabels: [
          "The best thing someone can do is...",
          "...and the worst thing is...",
        ],
        preservation: "standard",
        mapsTo: "When I'm anxious",
      },
      {
        id: "s8.q3",
        prompt: "When you're angry — what do you need, and what should they avoid?",
        input: "dual-text",
        dualLabels: [
          "The best thing someone can do is...",
          "...and the worst thing is...",
        ],
        preservation: "standard",
        mapsTo: "When I'm angry",
      },
      {
        id: "s8.q4",
        prompt:
          "Now the bright side — when you're celebrating something, when something good happens — how do you want the people who love you to show up?",
        input: "text",
        preservation: "standard",
        mapsTo: "When I'm celebrating",
      },
      {
        id: "s8.q5",
        prompt:
          "Are there words — actual phrases — that always land well with you? Things you love hearing?",
        helper:
          "These might become the scripts in your manual — the words that feel like medicine.",
        input: "text",
        // Self-authored scripts are used verbatim with light polish (Engine §3.8).
        preservation: "high",
        mapsTo: "Scripts you can use",
      },
      {
        id: "s8.q6",
        prompt:
          "And the opposite — words or phrases that never land well, even when someone means them kindly?",
        input: "text",
        preservation: "standard",
        mapsTo: "Please avoid",
      },
    ],
  },

  // ── 9 ──────────────────────────────────────────────────────────────────
  {
    number: 9,
    id: "wish-you-knew",
    title: "What You Wish They Knew",
    manualTitle: "What I Wish You Knew",
    depth: "deepest",
    aiEnergy:
      "Reverent, minimal. Use Pattern 5 — Witness. Say almost nothing. 'I hear you.' Then space. Let their words be the last thing on the screen.",
    checkInBefore: true,
    intro:
      "This is the heart of everything we've built together. The most honest, most tender, most courageous part. Take your time here. Write from the place inside you that rarely gets to speak. I'm right here.",
    closing:
      "You did something beautiful today. You sat with yourself — honestly, gently, without rushing — and you named the parts of you that most people never learn to say out loud. Thank you for trusting me with this.",
    noteForYouSourceId: "s9.q3",
    questions: [
      {
        id: "s9.q1",
        prompt:
          "If you could make the people who love you understand one thing about you — one thing that would change everything — what would it be?",
        input: "text",
        preservation: "high",
        mapsTo: "The emotional thesis",
      },
      {
        id: "s9.q2",
        prompt:
          "Is there something you've never said out loud — but wish you could? Something that lives quietly inside you, waiting to be heard?",
        input: "text",
        preservation: "high",
        mapsTo: "The tender revelation",
      },
      {
        id: "s9.q3",
        prompt:
          "And finally — if you could write the opening lines of a letter to the people who love you... a letter that begins with everything you wish they knew... how would it start?",
        input: "letter",
        // Engine doc §3.9 "Minimum Intervention Rule": ~80% their words, 20%
        // connective tissue. If they wrote something beautiful, the engine's job
        // is to FRAME it, not rewrite it.
        preservation: "sacred",
        mapsTo: "Section closing — possibly verbatim",
      },
      {
        id: "s9.q4",
        prompt: "Before we close — how does it feel to have shared all of this?",
        helper: "Select all that apply. This one is just between us.",
        input: "multiselect",
        options: [
          "Brave",
          "Terrifying",
          "Freeing",
          "Vulnerable",
          "Necessary",
          "Hopeful",
          "Like being truly seen",
        ],
        allowOther: true,
        preservation: "standard",
        // Engine doc §3.9: NEVER included in the manual. Tone calibration only —
        // it tells the engine how much emotional weight the person is carrying.
        mapsTo: null,
        excludeFromManual: true,
      },
    ],
  },
] as const;

/** Total prompts across all nine sections. */
export const TOTAL_QUESTIONS = SECTIONS.reduce(
  (n, s) => n + s.questions.length,
  0,
);

/** Questions whose answers must never reach the engine's manual-generating input. */
export const EXCLUDED_QUESTION_IDS: readonly string[] = SECTIONS.flatMap((s) =>
  s.questions.filter((q) => q.excludeFromManual).map((q) => q.id),
);

export function getSection(number: number): Section | undefined {
  return SECTIONS.find((s) => s.number === number);
}

export function getQuestion(id: string) {
  for (const section of SECTIONS) {
    const question = section.questions.find((q) => q.id === id);
    if (question) return { section, question };
  }
  return undefined;
}
