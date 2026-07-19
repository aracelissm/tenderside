import Image from "next/image";
import Link from "next/link";

/**
 * Legal column links are placeholders until the policies exist — they point at
 * routes that aren't built yet, so they're rendered as plain text rather than
 * dead links. Wire them up when Privacy/Terms land (needed before beta, §5).
 */
const COLUMNS = [
  {
    heading: "Product",
    items: [
      { label: "How It Works", href: "#how-it-works" },
      { label: "The Manual", href: "#the-manual" },
      { label: "When They Read It", href: "#the-moment" },
    ],
  },
  {
    heading: "Company",
    items: [{ label: "About", href: null }],
  },
  {
    heading: "Legal",
    items: [
      { label: "Privacy", href: null },
      { label: "Terms", href: null },
    ],
  },
] as const;

export function Footer() {
  return (
    <footer
      className="border-t pb-10 pt-14"
      style={{ background: "var(--near-black)", borderColor: "var(--border-subtle)" }}
    >
      <div className="container-nx">
        <div
          className="grid gap-8 border-b pb-10 md:grid-cols-[1.6fr_repeat(3,1fr)]"
          style={{ borderColor: "var(--divider)" }}
        >
          <div>
            <Image
              src="/brand/tenderside-horizontal.webp"
              alt="Tenderside"
              width={520}
              height={99}
              className="h-[44px] w-auto"
            />
            <p
              className="mt-4 italic"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "18px",
                color: "var(--text-secondary)",
                maxWidth: "30ch",
              }}
            >
              Where you can be fully you.
            </p>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.heading}>
              <p className="nx-caption mb-4">{col.heading}</p>
              <ul className="flex flex-col gap-3">
                {col.items.map((item) => (
                  <li key={item.label}>
                    {item.href ? (
                      <Link
                        href={item.href}
                        className="transition-colors duration-fast hover:text-gold-300"
                        style={{ fontSize: "var(--fs-small)", color: "var(--text-secondary)" }}
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <span
                        style={{ fontSize: "var(--fs-small)", color: "var(--text-tertiary)" }}
                      >
                        {item.label}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-6">
          <span className="nx-caption">© 2026 Tenderside · Prime73 AI</span>
          <span className="nx-caption">The Human Manual</span>
        </div>
      </div>
    </footer>
  );
}
