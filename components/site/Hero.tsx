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
            Headline and body are the design prototype's copy, unchanged.

            Sizing: the ceiling is 52px rather than the prototype's 68px because
            the longest line ("Transform Relationships.", 24 chars) does not fit
            the ~575px left column above that — at 68px it wraps to a ragged
            fourth line. text-wrap:balance is the safety net if the copy changes.
          */}
          <h1
            className="mt-5"
            style={{
              fontSize: "clamp(34px, 3.8vw, 52px)",
              lineHeight: 1.05,
              textWrap: "balance",
            }}
          >
            Create Your Manual.
            <br />
            Share Understanding.
            <br />
            <span className="nx-gold-text">Transform Relationships.</span>
          </h1>

          <p className="nx-body mt-6 text-[18px] leading-relaxed" style={{ maxWidth: "46ch" }}>
            Tenderside helps you create a living manual that explains who you
            are, how you think, and what you need to thrive. Share it with the
            people who matter most.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button href="/begin">
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
