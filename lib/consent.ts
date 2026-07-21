/**
 * The consent record captured at onboarding (CLAUDE.md §5).
 *
 * Three things must be affirmatively agreed before the conversation begins:
 *   1. AI disclosure     — the user knows they're talking with an AI guide (§5.1)
 *   2. Recording consent — responses are stored and used to compose the manual,
 *                          "wiretap-grade" (§5.2)
 *   3. Age attestation   — 18 or older (§5.4)
 *
 * ── Persistence is intentionally a stub for now ──────────────────────────────
 * A wiretap-grade consent record needs to be provable server-side: a timestamp
 * and the exact consent text version, stored where it can't be edited after the
 * fact. That belongs in the Redis session record (Phase 1). Until that layer
 * exists, we persist to localStorage so the flow is testable end-to-end — but
 * this is NOT the legal record. `recordConsent` is the single seam that swaps to
 * a POST /api/session call when Redis lands; nothing else changes.
 */

/** Bump when the consent copy changes — the version is part of the record. */
export const CONSENT_VERSION = "2026-07-21.v1";

export interface ConsentRecord {
  /** ISO 8601, set at the moment of affirmative agreement. */
  agreedAt: string;
  /** Which consent copy the user actually saw and agreed to. */
  version: string;
  aiDisclosure: true;
  recordingConsent: true;
  ageAttested18Plus: true;
}

const STORAGE_KEY = "tenderside.consent";

/**
 * Record affirmative consent. Client-side stub today; becomes a server call in
 * Phase 1 so the record is tamper-evident. Returns the record so callers can
 * proceed immediately.
 */
export function recordConsent(): ConsentRecord {
  const record: ConsentRecord = {
    agreedAt: new Date().toISOString(),
    version: CONSENT_VERSION,
    aiDisclosure: true,
    recordingConsent: true,
    ageAttested18Plus: true,
  };
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
  } catch {
    // localStorage unavailable (private mode, disabled) — the flow still works;
    // the server record in Phase 1 is what will actually matter.
  }
  return record;
}

/** Whether this browser has a stored consent record for the current version. */
export function hasConsented(): boolean {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return false;
    const record = JSON.parse(raw) as Partial<ConsentRecord>;
    return record.version === CONSENT_VERSION;
  } catch {
    return false;
  }
}
