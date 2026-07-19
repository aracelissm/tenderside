import { BookOpen, PenLine, Send, HeartHandshake } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Icons come from lucide-react per the design handoff, mapped by concept so
 * swapping in Tenderside's bespoke line-icon set later is a one-file change.
 */
const CARDS = [
  {
    Icon: BookOpen,
    title: "Nine honest sections",
    body: "How you communicate. What you need to feel safe. Where you're tender. What happens when you're overwhelmed. One question at a time, and you can skip any of them.",
  },
  {
    Icon: PenLine,
    title: "Written in your voice",
    body: "Not analysed, not diagnosed, not padded out. If you said it plainly, it stays plain. If a sentence of yours was perfect, it stays exactly as you wrote it.",
  },
  {
    Icon: Send,
    title: "Made to be handed over",
    body: "A manual nobody reads is a diary. This one is built for the moment you send it — to a partner, up to two people, by a private link only they can open.",
  },
  {
    Icon: HeartHandshake,
    title: "They finally get it",
    body: "Most relationship pain isn't a shortage of love. It's a shortage of legibility. This closes that gap without you having to say it all out loud.",
  },
] as const;

export function ValueGrid() {
  return (
    <section
      id="how-it-works"
      className="border-y py-[72px]"
      style={{ background: "var(--surface-1)", borderColor: "var(--border-subtle)" }}
    >
      <div className="container-nx">
        <Reveal>
          <div className="text-center">
            <h2 style={{ fontSize: "clamp(30px, 3.6vw, 40px)" }}>
              Being loved isn&rsquo;t the same as being understood.
            </h2>
            <p
              className="mt-2 italic"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "30px",
                color: "var(--brand-gold)",
              }}
            >
              This is how you close the distance.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {CARDS.map((c, i) => (
            <Reveal key={c.title} delay={i * 90}>
              <article
                className="group h-full rounded-lg border p-6 transition-all duration-base ease-standard hover:-translate-y-[3px] hover:shadow-glow-sm"
                style={{
                  background: "var(--surface-2)",
                  borderColor: "var(--border-default)",
                }}
              >
                <div
                  className="mb-4 flex h-[46px] w-[46px] items-center justify-center rounded-pill border"
                  style={{ borderColor: "var(--border-strong)" }}
                >
                  <c.Icon size={22} strokeWidth={1.5} color="var(--brand-gold)" />
                </div>
                <h3 style={{ fontSize: "21px" }}>{c.title}</h3>
                <p className="nx-body mt-3 text-[14px] leading-relaxed">{c.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
