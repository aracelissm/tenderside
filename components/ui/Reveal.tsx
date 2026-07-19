"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Scroll-reveal wrapper. Per the design system: sections start at
 * opacity 0 / translateY(28px) and animate in once when they enter the
 * viewport (threshold 0.15, rootMargin bottom -60px, fire once).
 *
 * ── Fails open, deliberately ──────────────────────────────────────────────
 * An earlier version started hidden and only became visible when
 * IntersectionObserver fired. That makes the animation load-bearing: if the
 * observer never fires, the content is invisible forever. This is not
 * hypothetical — it was caught during review in a browser where IO never
 * fired at all, and the entire homepage below the hero rendered blank.
 *
 * So the contract is inverted. Content is visible by default; the animation is
 * a pure enhancement that only ever *starts* things hidden once we have
 * confirmed an observer is actually running. Anything that goes wrong —
 * no IO support, a throwing constructor, JS disabled, hydration never
 * completing — degrades to plain visible content, which is the correct
 * failure mode for a page whose job is to be read.
 */
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  /** Stagger in ms — grid children use index * 90. */
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  /** Whether we've taken control and are animating. Until then: plain visible. */
  const [armed, setArmed] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect reduced motion: no animation at all, just show it.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    if (typeof IntersectionObserver === "undefined") return;

    let observer: IntersectionObserver;
    try {
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              setVisible(true);
              observer.disconnect();
            }
          }
        },
        { threshold: 0.15, rootMargin: "0px 0px -60px 0px" },
      );
      observer.observe(el);
    } catch {
      // Observer unavailable or threw — leave the content plainly visible.
      return;
    }

    // Only hide once the observer is genuinely watching.
    setArmed(true);

    // Safety net: if the observer somehow never reports (which is what happened
    // in the browser that surfaced this bug), reveal anyway rather than leaving
    // the section blank.
    const failsafe = window.setTimeout(() => setVisible(true), 1200);

    return () => {
      window.clearTimeout(failsafe);
      observer.disconnect();
    };
  }, []);

  const hidden = armed && !visible;

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: hidden ? 0 : 1,
        transform: hidden ? "translateY(28px)" : "translateY(0)",
        transition: `opacity 0.7s var(--ease-out) ${delay}ms, transform 0.7s var(--ease-out) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
