import Image from "next/image";

/**
 * Token specimen — a proving surface for the design system, not the homepage.
 * It renders every token so type, color, elevation and motion can be verified
 * against docs/design-system/ before any product UI is built on top.
 *
 * This route is replaced by the real landing page once the tokens are signed off.
 */

function Swatch({ name, value }: { name: string; value: string }) {
  return (
    <div className="flex flex-col gap-2">
      <div
        className="h-16 rounded-md border"
        style={{ background: value, borderColor: "var(--border-default)" }}
      />
      <div>
        <div className="nx-caption" style={{ color: "var(--text-secondary)" }}>
          {name}
        </div>
        <div className="nx-caption">{value}</div>
      </div>
    </div>
  );
}

function Section({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section
      className="py-12 border-t"
      style={{ borderColor: "var(--border-subtle)" }}
    >
      <div className="nx-eyebrow mb-3">{eyebrow}</div>
      <h2 className="mb-8">{title}</h2>
      {children}
    </section>
  );
}

export default function TokenSpecimen() {
  const goldRamp = [
    ["--gold-100", "#F1E4C6"],
    ["--gold-300", "#E7C97A"],
    ["--gold-500", "#D4AF37"],
    ["--gold-700", "#A8842A"],
    ["--gold-900", "#6E561A"],
  ] as const;

  const surfaces = [
    ["--near-black", "#0B0B0D"],
    ["--surface-1", "#141414"],
    ["--surface-2", "#1C1C1E"],
    ["--surface-3", "#262626"],
    ["--surface-ivory", "#F1E4C6"],
  ] as const;

  const accents = [
    ["--accent-teal", "#3E9E86"],
    ["--accent-green", "#2F7A68"],
    ["--accent-blue", "#5B8FB8"],
    ["--accent-violet", "#9B7BC4"],
    ["--accent-terracotta", "#C98A5C"],
    ["--accent-blush", "#CFA8A0"],
  ] as const;

  const radii = ["xs", "sm", "md", "lg", "xl", "2xl"] as const;
  const glows = [
    ["glow-gold-sm", "var(--glow-gold-sm)"],
    ["glow-gold", "var(--glow-gold)"],
    ["glow-gold-lg", "var(--glow-gold-lg)"],
  ] as const;

  return (
    <main className="container-nx py-16">
      {/* ── Masthead ─────────────────────────────────────────────── */}
      <header className="pb-12">
        <Image
          src="/brand/tenderside-horizontal.webp"
          alt="Tenderside"
          width={520}
          height={99}
          priority
          className="h-auto w-[320px] max-w-full"
        />
        <p className="nx-caption mt-6">
          Design token specimen · docs/design-system
        </p>
      </header>

      {/* ── Type ─────────────────────────────────────────────────── */}
      <Section eyebrow="Typography" title="Cormorant Garamond · Montserrat · IBM Plex Mono">
        <div className="flex flex-col gap-6">
          <div>
            <span className="nx-caption">display · 84px</span>
            <div className="nx-display">Tenderside</div>
          </div>
          <div>
            <span className="nx-caption">h1 · 72px</span>
            <h1>Create your manual.</h1>
          </div>
          <div>
            <span className="nx-caption">h1 · gold gradient clip</span>
            <h1 className="nx-gold-text">Transform relationships.</h1>
          </div>
          <div>
            <span className="nx-caption">h2 · 40px</span>
            <h2>What I wish you knew</h2>
          </div>
          <div>
            <span className="nx-caption">h3 · 24px</span>
            <h3>A note for you</h3>
          </div>
          <div>
            <span className="nx-caption">body · 16px · Montserrat</span>
            <p className="nx-body max-w-prose">
              Most relationship pain comes from lack of legibility, not lack of
              love. A manual is the difference between being loved and being
              understood.
            </p>
          </div>
          <div>
            <span className="nx-caption">display italic · the &ldquo;Note for You&rdquo; voice</span>
            <p
              className="text-2xl italic"
              style={{ fontFamily: "var(--font-display)", color: "var(--gold-300)" }}
            >
              I don&rsquo;t always know how to say this out loud. That&rsquo;s why I wrote it down.
            </p>
          </div>
          <div>
            <span className="nx-caption">eyebrow · mono · 0.22em tracking</span>
            <div className="nx-eyebrow">Where you can be fully you</div>
          </div>
        </div>
      </Section>

      {/* ── Color ────────────────────────────────────────────────── */}
      <Section eyebrow="Color" title="Gold ramp">
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
          {goldRamp.map(([n, v]) => (
            <Swatch key={n} name={n} value={v} />
          ))}
        </div>
      </Section>

      <Section eyebrow="Color" title="Surfaces">
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
          {surfaces.map(([n, v]) => (
            <Swatch key={n} name={n} value={v} />
          ))}
        </div>
      </Section>

      <Section eyebrow="Color" title="Accents (categorical)">
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">
          {accents.map(([n, v]) => (
            <Swatch key={n} name={n} value={v} />
          ))}
        </div>
      </Section>

      {/* ── Gradients ────────────────────────────────────────────── */}
      <Section eyebrow="Effects" title="Gradients">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <Swatch name="--gradient-gold" value="var(--gradient-gold)" />
          <Swatch name="--gradient-champagne" value="var(--gradient-champagne)" />
          <Swatch name="--gradient-green" value="var(--gradient-green)" />
          <Swatch name="--gradient-ink" value="var(--gradient-ink)" />
        </div>
      </Section>

      {/* ── Glow ─────────────────────────────────────────────────── */}
      <Section eyebrow="Effects" title="Gold glow — the signature accent">
        <div className="flex flex-wrap gap-10 py-6">
          {glows.map(([label, shadow]) => (
            <div key={label} className="flex flex-col items-center gap-4">
              <div
                className="h-20 w-20 rounded-pill"
                style={{ background: "var(--gradient-gold)", boxShadow: shadow }}
              />
              <span className="nx-caption">{label}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Radii ────────────────────────────────────────────────── */}
      <Section eyebrow="Layout" title="Radii">
        <div className="flex flex-wrap gap-6">
          {radii.map((r) => (
            <div key={r} className="flex flex-col items-center gap-3">
              <div
                className="h-20 w-20 border"
                style={{
                  background: "var(--surface-2)",
                  borderColor: "var(--border-strong)",
                  borderRadius: `var(--radius-${r})`,
                }}
              />
              <span className="nx-caption">{r}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Surfaces + elevation ─────────────────────────────────── */}
      <Section eyebrow="Elevation" title="Cards on dark, and the ivory Manual surface">
        <div className="grid gap-6 md:grid-cols-2">
          <div
            className="rounded-lg border p-6"
            style={{
              background: "var(--surface-2)",
              borderColor: "var(--border-default)",
              boxShadow: "var(--shadow-lg)",
            }}
          >
            <h3 className="mb-2">How I Communicate</h3>
            <p className="nx-body">Dark card · surface-2 · shadow-lg</p>
          </div>

          <div
            className="rounded-lg p-6"
            style={{
              background: "var(--surface-ivory)",
              color: "var(--text-on-ivory)",
              boxShadow: "var(--shadow-ivory)",
            }}
          >
            <h3 style={{ color: "var(--text-on-ivory)" }} className="mb-2">
              The Manual page
            </h3>
            <p
              style={{ color: "#5a564d", fontFamily: "var(--font-body)" }}
              className="text-base leading-relaxed"
            >
              Champagne document surface · shadow-ivory. This is the register the
              manual itself is read in.
            </p>
          </div>
        </div>
      </Section>

      {/* ── Motion ───────────────────────────────────────────────── */}
      <Section eyebrow="Motion" title="Float · pulse-glow · fade-up">
        <div className="flex flex-wrap items-center gap-16 py-8">
          <div className="flex flex-col items-center gap-4">
            <Image
              src="/brand/tenderside-mark.webp"
              alt=""
              width={320}
              height={299}
              className="h-auto w-[120px] animate-float"
            />
            <span className="nx-caption">float 6s</span>
          </div>
          <div className="flex flex-col items-center gap-4">
            <div
              className="h-24 w-24 rounded-pill animate-pulse-glow"
              style={{ background: "var(--gradient-gold-radial)" }}
            />
            <span className="nx-caption">pulse-glow 7s</span>
          </div>
          <div className="flex flex-col items-center gap-4">
            <div
              className="h-24 w-24 rounded-lg animate-fade-up border"
              style={{
                background: "var(--surface-2)",
                borderColor: "var(--border-strong)",
              }}
            />
            <span className="nx-caption">fade-up 0.9s</span>
          </div>
        </div>
        <p className="nx-caption">
          All motion disabled under prefers-reduced-motion
        </p>
      </Section>

      {/* ── Controls ─────────────────────────────────────────────── */}
      <Section eyebrow="Components" title="Buttons — primary, secondary (44px touch target)">
        <div className="flex flex-wrap items-center gap-4">
          <button
            className="rounded-pill px-7 font-medium transition-all duration-base ease-standard hover:brightness-110"
            style={{
              height: "var(--control-h-lg)",
              background: "var(--gradient-gold)",
              color: "var(--text-on-gold)",
              boxShadow: "var(--glow-gold-sm)",
              fontFamily: "var(--font-body)",
            }}
          >
            Create My Manual
          </button>
          <button
            className="rounded-pill border px-7 transition-all duration-base ease-standard"
            style={{
              height: "var(--control-h-lg)",
              borderColor: "var(--border-strong)",
              color: "var(--gold-300)",
              fontFamily: "var(--font-body)",
            }}
          >
            Not yet — save for later
          </button>
        </div>
      </Section>

      <footer className="border-t pt-8 pb-4" style={{ borderColor: "var(--border-subtle)" }}>
        <p className="nx-caption">
          Tokens ported verbatim from docs/design-system/tokens · tenderside.com
        </p>
      </footer>
    </main>
  );
}
