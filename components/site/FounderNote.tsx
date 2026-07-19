import { Reveal } from "@/components/ui/Reveal";

/**
 * A small, quiet founder aside. Deliberately understated — it sits between two
 * larger sections as a breath, not as a headline. Small type, real quotation
 * marks, attribution beneath.
 *
 * The wording is placeholder written by Claude and attributed to the founder;
 * it should be replaced with her own sentence. A founder quote only does its
 * job if it actually sounds like the founder.
 */
export function FounderNote() {
  return (
    <section className="py-16">
      <Reveal className="container-nx">
        <figure className="mx-auto max-w-[52ch] text-center">
          <blockquote>
            <p
              className="italic"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "22px",
                lineHeight: 1.5,
                color: "var(--gold-100)",
              }}
            >
              &ldquo;I built this because the people who loved me were still
              guessing. I&rsquo;d never actually given them anything to
              read.&rdquo;
            </p>
          </blockquote>

          <figcaption className="mt-5 flex items-center justify-center gap-3">
            <span
              aria-hidden
              className="block h-px w-6"
              style={{ background: "var(--border-strong)" }}
            />
            <cite className="nx-caption not-italic">
              Aracelis Sanchez · Founder
            </cite>
            <span
              aria-hidden
              className="block h-px w-6"
              style={{ background: "var(--border-strong)" }}
            />
          </figcaption>
        </figure>
      </Reveal>
    </section>
  );
}
