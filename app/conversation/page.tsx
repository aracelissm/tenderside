import type { Metadata } from "next";
import { SECTIONS, TOTAL_QUESTIONS } from "@/lib/questionnaire/sections";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Your conversation",
  robots: { index: false, follow: false },
};

/**
 * Placeholder for the Phase 1 conversation loop.
 *
 * The onboarding gate hands off here after consent. The real screen — one
 * question at a time, streamed AI responses via /api/conversation, save/resume
 * through Redis, check-ins before sections 3/4/9, and the crisis path — is the
 * next build and needs the Anthropic + Upstash credentials.
 *
 * Until then this confirms the handoff works and shows what's coming, so the
 * whole path (landing → begin → consent → here) is testable end to end.
 */
export default function ConversationPlaceholder() {
  return (
    <main className="container-nx flex min-h-screen flex-col items-center justify-center py-20 text-center">
      <div className="max-w-[46ch]">
        <p className="nx-eyebrow mb-6">Your conversation</p>
        <h1 style={{ fontSize: "clamp(28px, 3.4vw, 40px)", lineHeight: 1.2, textWrap: "balance" }}>
          This is where we&rsquo;ll begin.
        </h1>
        <p className="nx-body mt-5 leading-relaxed">
          Thank you — your consent is recorded and you&rsquo;re ready. The
          guided conversation itself is being built right now: {SECTIONS.length}{" "}
          sections, {TOTAL_QUESTIONS} gentle questions, one at a time, at
          whatever pace feels right.
        </p>
        <p className="nx-caption mt-6">The first question lands here soon.</p>

        <div className="mt-10">
          <Button href="/" variant="secondary">
            Back to home
          </Button>
        </div>
      </div>
    </main>
  );
}
