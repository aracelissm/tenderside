import { Mail } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Replaces the prototype's CompatBand.
 *
 * The prototype rendered a couples compatibility score (88%, "Communication 94"),
 * but couples mode is explicitly post-validation (§2) and scoring pulls toward
 * the personality-test framing §1 forbids. Advertising it would also poison the
 * one number that matters — a landing page promising compatibility scoring
 * recruits people who want compatibility scoring, not people who want to be
 * understood, and the 35% share-rate gate would read false.
 *
 * What sits here instead is the receiving moment, which §8 names as the
 * structurally most important interaction in the product.
 */
export function ShareMoment() {
  return (
    <section id="the-moment" className="py-20">
      <div className="container-nx grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
        {/* The recipient's view — an opened manual with the Note for You */}
        <Reveal>
          <div
            className="rounded-xl border p-8"
            style={{
              background: "var(--surface-2)",
              borderColor: "var(--border-subtle)",
              boxShadow: "var(--glow-gold-sm)",
            }}
          >
            <div className="flex items-center gap-3">
              <Mail size={18} color="var(--brand-gold)" strokeWidth={1.6} />
              <span className="nx-caption">Maya shared something personal with you</span>
            </div>

            <div
              className="my-6 h-px w-full"
              style={{ background: "var(--divider)" }}
              aria-hidden
            />

            <p className="nx-body leading-relaxed">
              This is a personal guide to understanding someone who trusts you.
              Read it with care.
            </p>

            <blockquote
              className="mt-6 rounded-md border-l-2 py-2 pl-5"
              style={{ borderColor: "var(--brand-gold)" }}
            >
              <p className="nx-caption mb-2">A note for you</p>
              <p
                className="italic leading-relaxed"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "20px",
                  color: "var(--gold-100)",
                }}
              >
                When I go quiet, it isn&rsquo;t you. I&rsquo;m looking for the
                words. Stay near me and don&rsquo;t make me talk yet — that&rsquo;s
                the whole thing, that&rsquo;s all I need.
              </p>
            </blockquote>

            <p className="nx-caption mt-6">
              This manual was shared with you as an act of trust
            </p>
          </div>
        </Reveal>

        <Reveal delay={90}>
          <p className="nx-eyebrow">The moment that matters</p>
          <h2 className="mt-4" style={{ fontSize: "clamp(30px, 3.6vw, 40px)" }}>
            What happens when they open it.
          </h2>
          <p className="nx-body mt-5 leading-relaxed" style={{ maxWidth: "44ch" }}>
            They don&rsquo;t get a report or a score. They get you — in your own
            words, at your own volume, with the quiet parts left quiet.
          </p>
          <p className="nx-body mt-4 leading-relaxed" style={{ maxWidth: "44ch" }}>
            Most people read it in one sitting. A lot of them write back. That
            moment is the entire point of this product, so it&rsquo;s the part
            we&rsquo;ve worked hardest on.
          </p>
          <div className="mt-8">
            <Button href="#start">Create My Manual</Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
