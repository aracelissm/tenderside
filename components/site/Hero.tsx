import Image from "next/image";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Copy is relational, not self-discovery (§2 supersession). The prototype's
 * "It's more than self-discovery" framing tested poorly; the beachhead persona
 * is 6–24 months into a serious relationship, so the promise is about being
 * understood by a specific person — not about learning about yourself.
 *
 * Layout matches the design system prototype: 1.05fr / 0.95fr grid, ambient
 * gold blob top-right, image bleeding past its column with a radial mask.
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden" id="start">
      {/* Ambient gold glow — decorative only */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-40 h-[700px] w-[700px] animate-pulse-glow"
        style={{ background: "var(--gradient-gold-radial)", filter: "blur(20px)" }}
      />

      <div className="container-nx relative grid items-center gap-10 pb-[88px] pt-20 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="animate-fade-up">
          <p className="nx-eyebrow">Where you can be fully you</p>

          {/*
            The hero reads as the founder speaking, not as marketing copy. For a
            product that asks people to write down their most private material,
            a named human saying why is a stronger opening than a brand voice.

            Semantics: the h1 stays an h1 inside the blockquote so the page keeps
            a single real heading. The quote marks are decorative and hidden from
            assistive tech; the attribution carries the meaning.

            Sizing: the longest line ("The people who love you", 23 chars) fits
            the ~575px column at the clamp ceiling. text-wrap:balance is the
            safety net if the copy is edited.
          */}
          <blockquote className="relative mt-5">
            <span
              aria-hidden
              className="absolute -left-6 -top-6 select-none leading-none"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "96px",
                color: "var(--brand-gold)",
                opacity: 0.28,
              }}
            >
              &ldquo;
            </span>

            <h1
              style={{
                fontSize: "clamp(36px, 4vw, 56px)",
                lineHeight: 1.05,
                textWrap: "balance",
              }}
            >
              The people who love you
              <br />
              are still guessing.
              <br />
              <span className="nx-gold-text">Hand them the manual.</span>
            </h1>

            <p
              className="nx-body mt-6 text-[18px] leading-relaxed"
              style={{ maxWidth: "46ch" }}
            >
              Tenderside walks you through nine honest conversations, then writes
              them into something your partner can actually read — how you
              communicate, what you need when you&rsquo;re overwhelmed, and the
              things you&rsquo;ve never quite found the words for.
            </p>

            <footer className="mt-6 flex items-center gap-3">
              <span
                aria-hidden
                className="block h-px w-8"
                style={{ background: "var(--border-strong)" }}
              />
              <cite
                className="not-italic"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "var(--fs-caption)",
                  letterSpacing: "var(--track-caption)",
                  textTransform: "uppercase",
                  color: "var(--text-tertiary)",
                }}
              >
                Aracelis Sanchez · Founder
              </cite>
            </footer>
          </blockquote>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button href="#start">
              Create My Manual
              <ArrowRight size={18} strokeWidth={1.75} />
            </Button>
            <Button href="#how-it-works" variant="secondary">
              <Play size={16} strokeWidth={1.75} />
              Watch How It Works
            </Button>
          </div>

          <p className="nx-caption mt-6">Takes about 30 minutes · Free while in beta</p>
        </div>

        <Reveal>
          <Image
            src="/brand/hero-journal-sunset.webp"
            alt="A journal open beside the Tenderside manual on a desk at sunset"
            width={1400}
            height={933}
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="h-auto w-[122%] max-w-none animate-float"
            style={{
              margin: "0 -11%",
              maskImage:
                "radial-gradient(ellipse 70% 68% at 50% 50%, #000 46%, transparent 88%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 70% 68% at 50% 50%, #000 46%, transparent 88%)",
            }}
          />
        </Reveal>
      </div>
    </section>
  );
}
