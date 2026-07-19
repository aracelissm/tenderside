/**
 * Questionnaire type model.
 *
 * Source of truth: ../tenderside-documentation/ (kept outside this repo so the
 * founder's commercial and investor material never enters git history) —
 *   · "Questionnaire — A Conversation With This Is Me"  (the guide's spoken prompts)
 *   · "Questionnaire — Guided Reflection Journey"        (the multi-select options)
 *   · "Engine — Answer-to-Manual Transformation Logic"   (mapping + preservation)
 *
 * Those documents are legacy-branded ("This is me", "SelfOS", "Lumé"). User-facing
 * strings here are rebranded to Tenderside per CLAUDE.md §2; the emotional content
 * and question order are unchanged.
 */

/** How the answer is captured. Drives which input component renders. */
export type InputType =
  /** Expandable free text. */
  | "text"
  /** Tappable cards, multiple allowed, plus an "Other" escape hatch. */
  | "multiselect"
  /** Two labelled free-text fields captured as one answer (e.g. outside/inside). */
  | "dual-text"
  /**
   * Distinct warm treatment for note-writing prompts (CLAUDE.md §6.2). These are
   * the highest-preservation inputs — the person is writing TO someone, not
   * answering a question.
   */
  | "letter";

/**
 * How much the engine may edit this answer (Engine doc §4.2).
 * The percentages are the doc's, and are quoted to the engine in the
 * composition prompt so the tiers mean something concrete.
 */
export type PreservationTier =
  /** 5–10% edit. Grammar and flow ONLY. The overwhelm note, the S9 letter opening. */
  | "sacred"
  /** 15–25% edit. Clarity and formatting. "A Note for You" sources, self-authored scripts. */
  | "high"
  /** 40–60% edit. Restructured, polished, woven into narrative. Most answers. */
  | "standard"
  /** 60–80% edit. Merged and distilled where answers repeat across prompts. */
  | "condensed";

export interface Question {
  /** Stable id — `s{section}.q{n}`. Never renumber; analytics and saved sessions key off it. */
  readonly id: string;
  /** The guide's spoken prompt, verbatim from the Conversation doc (rebranded). */
  readonly prompt: string;
  /** Optional framing shown beneath the prompt — examples, permission, context. */
  readonly helper?: string;
  readonly input: InputType;
  /** Present for `multiselect`. Verbatim from the Guided Reflection Journey doc. */
  readonly options?: readonly string[];
  /** `multiselect` always offers "Other" unless explicitly false. */
  readonly allowOther?: boolean;
  /** For `dual-text` — the two field labels. */
  readonly dualLabels?: readonly [string, string];
  readonly preservation: PreservationTier;
  /**
   * Which manual subsection this answer feeds (Engine doc §3.x).
   * `null` means it never reaches the manual — see `excludeFromManual`.
   */
  readonly mapsTo: string | null;
  /**
   * TRUE = this answer must NEVER appear in the generated manual.
   *
   * There are exactly two such questions in the entire questionnaire, and both
   * are load-bearing:
   *   · s2.q4 — the origin question. Engine doc calls this "private archaeology
   *     — for the person's awareness, not the reader's." Leaking it would put a
   *     childhood memory into a document handed to a partner.
   *   · s9.q4 — "how does sharing this feel". Tone calibration only.
   *
   * This is enforced structurally (the engine input is filtered before the model
   * ever sees it) rather than by asking a prompt to remember. Prompts drift.
   */
  readonly excludeFromManual?: boolean;
  /** Explicitly optional questions are presented as skippable-by-design, not just skippable. */
  readonly optional?: boolean;
}

export interface Section {
  /** 1–9. Order is locked (CLAUDE.md §6.1). */
  readonly number: number;
  readonly id: string;
  /** Section title as the questionnaire presents it. */
  readonly title: string;
  /** Title this section carries in the generated manual (Engine doc §3.x). */
  readonly manualTitle: string;
  readonly depth: "entry" | "moderate" | "moderate-deep" | "deep" | "deepest";
  /** Guidance passed to the conversation model for this section's tone. */
  readonly aiEnergy: string;
  /**
   * Sections 3, 4 and 9 require an emotional check-in before the section opens
   * (CLAUDE.md §6.1). The user can pause, continue, or come back later.
   */
  readonly checkInBefore: boolean;
  /** The guide's opening words for the section. */
  readonly intro: string;
  /** The guide's closing affirmation — Pattern 4, Celebrate → Transition. */
  readonly closing: string;
  /**
   * Which question seeds this section's "A Note for You".
   *
   * Engine doc §4.5: the primary source is normally the section's final
   * "if you could tell them one thing..." prompt. Section 8 has no such prompt in
   * the source questionnaire — its note comes from the doc's *enrichment* path
   * ("draw from the most emotionally revealing answer in that section"), which is
   * why this is declared per-section rather than inferred as "the last question".
   *
   * Making it explicit keeps the engine deterministic and stops a prompt from
   * having to guess.
   */
  readonly noteForYouSourceId: string;
  /** True where the note comes from enrichment rather than a dedicated prompt. */
  readonly noteForYouByEnrichment?: boolean;
  readonly questions: readonly Question[];
}
