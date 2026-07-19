import type { Metadata } from "next";
import { PageShell } from "@/components/site/PageShell";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "About",
  description:
    "Most relationship pain comes from a lack of legibility, not a lack of love. Tenderside exists to close that gap.",
};

/**
 * Written from the product thesis and positioning in CLAUDE.md §1 — the
 * founder's own framing, not invented.
 *
 * Deliberately contains NO biography. There is a Founder's story and a Brand
 * Manifesto in ../tenderside-documentation/, but a personal history is the one
 * thing that has to be written by the person who lived it. The page reads as
 * complete without it; drop a personal section in above "What this is not"
 * whenever you want to.
 */
export default function AboutPage() {
  return (
    <PageShell
      eyebrow="About"
      title="Being loved isn't the same as being understood."
    >
      <div className="flex flex-col gap-5">
        <p className="nx-body text-[17px] leading-relaxed">
          Most relationship pain doesn&rsquo;t come from a shortage of love. It
          comes from a shortage of legibility — from two people who care about
          each other enormously and are still, years in, guessing at how the
          other one works.
        </p>
        <p className="nx-body text-[17px] leading-relaxed">
          The things that would help most are the hardest to say out loud. What
          you need when you&rsquo;re overwhelmed. Why you go quiet. The sentence
          you&rsquo;ve been carrying for years and have never found the right
          moment for. They&rsquo;re not secrets. They&rsquo;re just difficult to
          say in the middle of an ordinary Tuesday.
        </p>
        <p className="nx-body text-[17px] leading-relaxed">
          Tenderside gives you a quieter place to say them. Nine guided
          conversations, one question at a time, at whatever pace you need — and
          then a manual written in your own words that you can hand to someone
          who has earned it.
        </p>

        <h2 className="mt-6" style={{ fontSize: "28px" }}>
          What this is not
        </h2>
        <p className="nx-body text-[17px] leading-relaxed">
          It isn&rsquo;t therapy, and it isn&rsquo;t a substitute for it. It
          isn&rsquo;t a personality test — there&rsquo;s no type, no score, no
          category at the end. And it isn&rsquo;t a companion you&rsquo;re meant
          to keep talking to.
        </p>
        <p className="nx-body text-[17px] leading-relaxed">
          The conversation has a beginning and an end. What matters is what it
          leaves you with, and who you give it to. The AI is a means to a human
          document — nothing more than that, and nothing less.
        </p>

        <p
          className="mt-6 italic"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "24px",
            color: "var(--gold-300)",
          }}
        >
          Where you can be fully you.
        </p>

        <div className="mt-4">
          <Button href="/#start">Create My Manual</Button>
        </div>
      </div>
    </PageShell>
  );
}
