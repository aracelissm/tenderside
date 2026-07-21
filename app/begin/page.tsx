"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Lock, Sparkles, MessageCircleHeart } from "lucide-react";
import { SECTIONS } from "@/lib/questionnaire/sections";
import { recordConsent } from "@/lib/consent";

/**
 * The onboarding gate — Phase 1 entry (CLAUDE.md §5, §6).
 *
 * Follows the arrival → orientation → promise arc from the Experience
 * Architecture doc, rebranded to Tenderside and with the three compliance gates
 * woven into the final "promise" step rather than buried in a ToS link:
 *
 *   · AI disclosure     (§5.1) — stated plainly on the promise step
 *   · Recording consent (§5.2) — an explicit checkbox, affirmative action
 *   · 18+ age gate      (§5.4) — an explicit checkbox
 *
 * No account creation: the Experience doc placed a signup here, but §10 defers
 * auth to Phase 4, so "saving your journey" becomes the Redis session later, not
 * a wall now.
 *
 * The conversation route it hands off to is a placeholder until the Phase 1
 * conversation loop is built.
 */

const STEPS = ["welcome", "create", "how", "promise"] as const;
type Step = (typeof STEPS)[number];

export default function BeginPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("welcome");
  const [recordingOk, setRecordingOk] = useState(false);
  const [ageOk, setAgeOk] = useState(false);

  const go = (next: Step) => setStep(next);

  function begin() {
    if (!recordingOk || !ageOk) return;
    recordConsent();
    router.push("/conversation");
  }

  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Ambient warmth — the arrival should lower the heart rate, not sell */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 animate-pulse-glow"
        style={{ background: "var(--gradient-gold-radial)", filter: "blur(30px)", opacity: 0.5 }}
      />

      <div className="container-nx relative flex min-h-screen flex-col items-center justify-center py-20">
        {/* key on step forces the fade-up animation to replay on each transition */}
        <div key={step} className="w-full max-w-[46ch] animate-fade-up text-center">
          {step === "welcome" && (
            <>
              <p className="nx-eyebrow mb-8">Where you can be fully you</p>
              <h1
                style={{ fontSize: "clamp(32px, 4vw, 48px)", lineHeight: 1.15, textWrap: "balance" }}
              >
                This is a space for you.
              </h1>
              <p className="nx-body mt-6 text-[18px] leading-relaxed">
                No judgments. No scores. Just honesty — at your own pace. You can
                pause any time, skip anything, and change your mind as often as
                you need.
              </p>
              <PrimaryButton className="mt-10" onClick={() => go("create")}>
                Begin
              </PrimaryButton>
            </>
          )}

          {step === "create" && (
            <>
              <p className="nx-eyebrow mb-6">What you&rsquo;ll create</p>
              <h1 style={{ fontSize: "clamp(28px, 3.4vw, 40px)", lineHeight: 1.2, textWrap: "balance" }}>
                Your manual, in nine honest chapters.
              </h1>
              <p className="nx-body mx-auto mt-5 max-w-[40ch] leading-relaxed">
                Each one is shaped entirely by your words. Nothing is assumed.
                Everything is yours.
              </p>

              <ul className="mx-auto mt-8 grid max-w-[40ch] gap-2 text-left sm:grid-cols-2">
                {SECTIONS.map((s) => (
                  <li key={s.id} className="flex items-baseline gap-2">
                    <span className="nx-caption" style={{ color: "var(--gold-500)" }}>
                      {String(s.number).padStart(2, "0")}
                    </span>
                    <span style={{ fontFamily: "var(--font-display)", fontSize: "16px", color: "var(--text-primary)" }}>
                      {s.manualTitle}
                    </span>
                  </li>
                ))}
              </ul>

              <PrimaryButton className="mt-10" onClick={() => go("how")}>
                How does it work?
              </PrimaryButton>
              <BackLink onClick={() => go("welcome")} />
            </>
          )}

          {step === "how" && (
            <>
              <p className="nx-eyebrow mb-6">How it works</p>
              <div className="flex flex-col gap-7 text-left">
                <HowStep
                  Icon={MessageCircleHeart}
                  title="We talk."
                  body="A warm, guided conversation — one question at a time. Answer in your own words, short or long, poetic or plain."
                />
                <HowStep
                  Icon={Sparkles}
                  title="We listen."
                  body="Your answers are read with care. The patterns, the themes, the throughlines in what you share become the shape of your manual."
                />
                <HowStep
                  Icon={ArrowRight}
                  title="We create."
                  body="From your truth, your manual is written — in your voice, for the people you choose to share it with."
                />
              </div>
              <PrimaryButton className="mt-10" onClick={() => go("promise")}>
                One more thing&hellip;
              </PrimaryButton>
              <BackLink onClick={() => go("create")} />
            </>
          )}

          {step === "promise" && (
            <>
              <div
                className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-pill border"
                style={{ borderColor: "var(--border-strong)" }}
              >
                <Lock size={20} strokeWidth={1.5} color="var(--brand-gold)" />
              </div>
              <h1 style={{ fontSize: "clamp(28px, 3.4vw, 40px)", lineHeight: 1.2, textWrap: "balance" }}>
                A promise before we begin.
              </h1>
              <p className="nx-body mt-5 leading-relaxed">
                Everything you share here stays here — protected, private, yours.
                It&rsquo;s never shown to anyone without your explicit permission.
                There are no right or wrong answers, and you can pause, skip, or
                change anything, any time.
              </p>

              {/* AI disclosure — plain and conspicuous, not buried (§5.1) */}
              <p
                className="mt-5 rounded-md border px-4 py-3 text-left leading-relaxed"
                style={{
                  borderColor: "var(--border-subtle)",
                  background: "var(--surface-2)",
                  fontSize: "14px",
                  color: "var(--text-secondary)",
                }}
              >
                You&rsquo;ll be talking with an AI guide — not a person. It&rsquo;s
                here to help you find your words and turn them into your manual,
                nothing more. It has a beginning and an end.
              </p>

              {/* Explicit, affirmative consent — the two gates (§5.2, §5.4) */}
              <div className="mt-6 flex flex-col gap-4 text-left">
                <Check checked={recordingOk} onChange={setRecordingOk}>
                  I understand my answers are saved so my manual can be written
                  from them, and I consent to that.
                </Check>
                <Check checked={ageOk} onChange={setAgeOk}>
                  I&rsquo;m 18 or older.
                </Check>
              </div>

              <PrimaryButton
                className="mt-8"
                disabled={!recordingOk || !ageOk}
                onClick={begin}
              >
                I&rsquo;m ready
                <ArrowRight size={18} strokeWidth={1.75} />
              </PrimaryButton>
              <BackLink onClick={() => go("how")} />
            </>
          )}
        </div>
      </div>
    </main>
  );
}

function PrimaryButton({
  children,
  onClick,
  disabled,
  className = "",
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-2 rounded-pill px-8 font-medium transition-all duration-base ease-standard enabled:hover:brightness-110 enabled:hover:shadow-glow disabled:cursor-not-allowed disabled:opacity-40 ${className}`}
      style={{
        height: "var(--control-h-lg)",
        background: "var(--gradient-gold)",
        color: "var(--text-on-gold)",
        boxShadow: "var(--glow-gold-sm)",
        fontFamily: "var(--font-body)",
      }}
    >
      {children}
    </button>
  );
}

function BackLink({ onClick }: { onClick: () => void }) {
  return (
    <div className="mt-5">
      <button
        onClick={onClick}
        className="nx-caption transition-colors duration-fast hover:text-gold-300"
      >
        &larr; Back
      </button>
    </div>
  );
}

function HowStep({
  Icon,
  title,
  body,
}: {
  Icon: typeof Sparkles;
  title: string;
  body: string;
}) {
  return (
    <div className="flex gap-4">
      <div
        className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-pill border"
        style={{ borderColor: "var(--border-strong)" }}
      >
        <Icon size={18} strokeWidth={1.5} color="var(--brand-gold)" />
      </div>
      <div>
        <h3 style={{ fontSize: "20px" }}>{title}</h3>
        <p className="nx-body mt-1 text-[15px] leading-relaxed">{body}</p>
      </div>
    </div>
  );
}

function Check({
  checked,
  onChange,
  children,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  children: React.ReactNode;
}) {
  return (
    <label className="flex cursor-pointer items-start gap-3">
      <span
        className="mt-[2px] flex h-5 w-5 shrink-0 items-center justify-center rounded-[5px] border transition-colors duration-fast"
        style={{
          borderColor: checked ? "var(--brand-gold)" : "var(--border-strong)",
          background: checked ? "var(--gradient-gold)" : "transparent",
        }}
      >
        {checked && (
          <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden>
            <path
              d="M2 6.5L4.5 9L10 3"
              fill="none"
              stroke="var(--text-on-gold)"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </span>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only"
      />
      <span className="nx-body text-[14px] leading-relaxed">{children}</span>
    </label>
  );
}
