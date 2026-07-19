# Prompts

Versioned prompt texts for the Tenderside conversation guide and the three-stage
transformation engine.

## Provenance — read this before editing

CLAUDE.md §7.1 and §14 previously stated that the Analysis / Composition / Polish
prompts "exist as authored, copy-paste-ready texts in project knowledge" and should
be versioned here "verbatim rather than rewritten."

**They did not exist.** A search of all 33 documents found no literal prompt texts.
What exists is source material of unusual quality:

| Document | What it provides |
| --- | --- |
| `Engine — Answer-to-Manual Transformation Logic` | The five-step pipeline, voice-shift rules, per-section transformation map, preservation hierarchy, global rules, edge cases |
| `AI — Training and Behavior Specification` | Identity, voice principles, tone calibration matrix, do/don't language, emotional signal detection, the five response patterns, crisis protocol |
| `AI — Technical Implementation Guide` | Explicitly instructs: *"Write a comprehensive system prompt (3,000–6,000 tokens) that encodes the complete Behavior Spec"*, plus the block-structure diagram |
| `Questionnaire` (×2) | The nine sections — spoken prompts and multi-select options |

So these prompts are **authored from those specifications**, not transcribed. Every
rule in them traces to a source document; nothing here is invented product opinion.
Where a prompt states a numeric threshold (edit percentages, word counts, sentence
limits), that number comes from the Engine doc.

The questionnaire content itself *did* exist verbatim and is ported as data in
`lib/questionnaire/sections.ts` with only rebranding applied.

## Versioning

Files are suffixed `.v1`. Never edit a shipped version in place once it has
generated a manual a real user has seen — add `.v2` and switch the reference. Prompt
changes alter output for everyone, and being unable to explain why last month's
manual read differently is a support problem you cannot answer after the fact.

## Files

| File | Stage | Output |
| --- | --- | --- |
| `conversation-system.v1.md` | Guide | Streamed conversational turns during the 9 sections |
| `engine-analysis.v1.md` | 1 of 3 | Structured JSON — four signal layers + per-section throughline |
| `engine-composition.v1.md` | 2 of 3 | Draft manual, all nine sections |
| `engine-polish.v1.md` | 3 of 3 | Final manual — coherence, "A Note for You", formatting |

## Two structural guarantees

Two questionnaire answers must never reach the manual:

- `s2.q4` — the origin question ("can you trace this need back?"). The Engine doc
  calls it *"private archaeology — for the person's awareness, not the reader's."*
- `s9.q4` — "how does sharing this feel". Tone calibration only.

These are enforced **in code**, by filtering on `excludeFromManual` before the
engine input is assembled — not by asking a prompt to remember. The prompts restate
the rule as defence in depth, but the filter is the guarantee. A prompt that drifts
on this leaks a childhood memory into a document someone hands their partner.
