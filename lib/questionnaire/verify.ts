/**
 * Structural assertions over the questionnaire data.
 *
 * Run with: npx tsx lib/questionnaire/verify.ts
 * (or via `npm run verify:questionnaire` once tsx is available)
 *
 * These guard the invariants that would be expensive to discover in production —
 * particularly the two exclusions, which are the difference between a manual that
 * honours a confidence and one that breaks it.
 */
import { SECTIONS, TOTAL_QUESTIONS, EXCLUDED_QUESTION_IDS } from "./sections";

const problems: string[] = [];
const check = (ok: boolean, msg: string) => {
  if (!ok) problems.push(msg);
};

// ── Shape ────────────────────────────────────────────────────────────────
check(SECTIONS.length === 9, `expected 9 sections, got ${SECTIONS.length}`);

SECTIONS.forEach((s, i) => {
  check(s.number === i + 1, `section ${i} out of order (number=${s.number})`);
  check(s.questions.length > 0, `section ${s.number} has no questions`);
  check(s.intro.length > 0, `section ${s.number} missing intro`);
  check(s.closing.length > 0, `section ${s.number} missing closing`);

  s.questions.forEach((q) => {
    check(
      q.id.startsWith(`s${s.number}.`),
      `${q.id} does not belong to section ${s.number}`,
    );
    check(q.prompt.length > 0, `${q.id} missing prompt`);

    if (q.input === "multiselect") {
      check(!!q.options?.length, `${q.id} is multiselect with no options`);
    } else {
      check(!q.options, `${q.id} is ${q.input} but declares options`);
    }

    if (q.input === "dual-text") {
      check(q.dualLabels?.length === 2, `${q.id} dual-text needs exactly 2 labels`);
    }

    // An answer either has a destination in the manual, or is explicitly excluded.
    // Anything else is captured and silently dropped — which is worse than either.
    const hasDestination = q.mapsTo !== null;
    check(
      hasDestination !== !!q.excludeFromManual,
      `${q.id}: mapsTo/excludeFromManual disagree (mapsTo=${q.mapsTo}, excluded=${!!q.excludeFromManual})`,
    );
  });
});

// ── Unique ids ───────────────────────────────────────────────────────────
const ids = SECTIONS.flatMap((s) => s.questions.map((q) => q.id));
const dupes = ids.filter((id, i) => ids.indexOf(id) !== i);
check(dupes.length === 0, `duplicate question ids: ${dupes.join(", ")}`);

// ── The two exclusions (CLAUDE.md §7.3) ──────────────────────────────────
check(
  EXCLUDED_QUESTION_IDS.length === 2,
  `expected exactly 2 excluded questions, got ${EXCLUDED_QUESTION_IDS.length}: ${EXCLUDED_QUESTION_IDS.join(", ")}`,
);
check(
  EXCLUDED_QUESTION_IDS.includes("s2.q4"),
  "s2.q4 (origin question) must be excluded from the manual",
);
check(
  EXCLUDED_QUESTION_IDS.includes("s9.q4"),
  "s9.q4 (how sharing feels) must be excluded from the manual",
);

// ── The two sacred answers (Engine doc §4.2) ─────────────────────────────
const sacred = SECTIONS.flatMap((s) =>
  s.questions.filter((q) => q.preservation === "sacred").map((q) => q.id),
);
check(
  sacred.includes("s4.q5"),
  "s4.q5 (the overwhelm note) must be preservation tier `sacred`",
);
check(
  sacred.includes("s9.q3"),
  "s9.q3 (the letter opening) must be preservation tier `sacred`",
);

// ── Check-ins before sections 3, 4, 9 (CLAUDE.md §6.1) ───────────────────
const checkIns = SECTIONS.filter((s) => s.checkInBefore).map((s) => s.number);
check(
  JSON.stringify(checkIns) === JSON.stringify([3, 4, 9]),
  `check-ins expected before sections 3,4,9 — got ${checkIns.join(",")}`,
);

// ── Every section declares a resolvable "A Note for You" source ──────────
// Engine doc §4.5. Section 8 has no dedicated "tell them one thing" prompt in
// the source questionnaire, so its note comes from the enrichment path — that is
// declared explicitly rather than left for a prompt to work out.
SECTIONS.forEach((s) => {
  const source = s.questions.find((q) => q.id === s.noteForYouSourceId);
  check(
    !!source,
    `section ${s.number}: noteForYouSourceId "${s.noteForYouSourceId}" is not one of its questions`,
  );
  check(
    !source?.excludeFromManual,
    `section ${s.number}: note source ${s.noteForYouSourceId} is excluded from the manual`,
  );

  const hasDedicatedPrompt = s.questions.some((q) => q.mapsTo === "A note for you");
  if (!hasDedicatedPrompt && s.number !== 9) {
    check(
      !!s.noteForYouByEnrichment,
      `section ${s.number} has no dedicated note prompt and must set noteForYouByEnrichment`,
    );
  }
});

// ── Report ───────────────────────────────────────────────────────────────
console.log(`sections:           ${SECTIONS.length}`);
console.log(`questions:          ${TOTAL_QUESTIONS}`);
console.log(`excluded:           ${EXCLUDED_QUESTION_IDS.join(", ")}`);
console.log(`sacred:             ${sacred.join(", ")}`);
console.log(`check-ins before:   ${checkIns.join(", ")}`);
console.log(
  `per-section counts: ${SECTIONS.map((s) => s.questions.length).join(", ")}`,
);

if (problems.length) {
  console.error(`\n${problems.length} PROBLEM(S):`);
  for (const p of problems) console.error(`  ✗ ${p}`);
  process.exit(1);
}
console.log("\nAll structural checks passed.");
