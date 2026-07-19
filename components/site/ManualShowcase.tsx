import { Lock, Sparkles, RefreshCw, Share2, ChevronRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

/** The one light section — champagne surface, the register the manual is read in. */
const FEATURES = [
  { Icon: Lock, title: "Private by default", body: "Nobody sees it until you decide who does. Revoke any link, any time." },
  { Icon: Sparkles, title: "Your words, clarified", body: "The engine never adds feelings you didn't express or softens ones you did." },
  { Icon: RefreshCw, title: "Yours to edit", body: "Read it back, change anything that doesn't sound like you, before it goes anywhere." },
  { Icon: Share2, title: "Built to be sent", body: "A private link and a note, to the people who've earned it." },
] as const;

const SECTIONS = [
  { title: "How I Communicate", sub: "What I mean when I go quiet" },
  { title: "When I'm Overwhelmed", sub: "A note for when I can't speak" },
  { title: "The Lines That Keep Me Whole", sub: "My boundaries, plainly said" },
  { title: "What I Wish You Knew", sub: "The part I've never said out loud" },
] as const;

export function ManualShowcase() {
  return (
    <section
      id="the-manual"
      className="py-20"
      style={{ background: "var(--surface-ivory)", color: "var(--text-on-ivory)" }}
    >
      <div className="container-nx grid items-center gap-14 lg:grid-cols-[1fr_1.1fr]">
        <Reveal>
          <h2 style={{ color: "var(--text-on-ivory)", fontSize: "clamp(30px, 3.6vw, 40px)" }}>
            Your manual. Your words.
            <br />
            <span style={{ color: "var(--gold-700)" }}>Something they can hold onto.</span>
          </h2>

          <div className="mt-9 grid gap-7 sm:grid-cols-2">
            {FEATURES.map((f) => (
              <div key={f.title}>
                <f.Icon size={20} strokeWidth={1.6} color="#A8842A" />
                <h3
                  className="mt-3"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "15px",
                    fontWeight: 600,
                    color: "var(--text-on-ivory)",
                    lineHeight: 1.3,
                  }}
                >
                  {f.title}
                </h3>
                <p style={{ fontSize: "13px", color: "#5a564d", lineHeight: 1.5, marginTop: 4 }}>
                  {f.body}
                </p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Dark manual preview card sitting on the ivory surface */}
        <Reveal delay={90}>
          <div
            className="rounded-xl p-6"
            style={{ background: "var(--near-black)", boxShadow: "var(--shadow-lg)" }}
          >
            <div className="mb-6 flex items-center justify-between">
              <span className="nx-caption">My Manual · v1.0 · Updated today</span>
              <span
                className="rounded-pill border px-3 py-1"
                style={{
                  borderColor: "var(--border-strong)",
                  color: "var(--gold-300)",
                  fontSize: "12px",
                }}
              >
                Share
              </span>
            </div>

            <div className="mb-6 text-center">
              <p style={{ fontFamily: "var(--font-display)", fontSize: "30px", color: "var(--text-primary)" }}>
                Maya Ellis
              </p>
              <p className="nx-caption mt-1">The Human Manual</p>
            </div>

            <ul className="flex flex-col gap-2">
              {SECTIONS.map((s) => (
                <li
                  key={s.title}
                  className="flex items-center justify-between rounded-md px-4 py-3"
                  style={{ background: "var(--surface-2)" }}
                >
                  <span>
                    <span
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "17px",
                        color: "var(--text-primary)",
                        display: "block",
                      }}
                    >
                      {s.title}
                    </span>
                    <span className="nx-caption">{s.sub}</span>
                  </span>
                  <ChevronRight size={16} color="var(--brand-gold)" />
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
