"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";

/**
 * Sticky nav. Translucent at rest, opaque + gold hairline after scrollY > 12.
 *
 * Links are on-page anchors rather than routes: Pricing and Log In are
 * deliberately absent (Stripe is post-validation per §2, auth is Phase 4 per
 * §10). Advertising either would promise something the MVP doesn't have.
 */
const LINKS = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "The Manual", href: "#the-manual" },
  { label: "When They Read It", href: "#the-moment" },
] as const;

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="sticky top-0 z-50 transition-all duration-base ease-standard"
      style={{
        height: "76px",
        background: scrolled ? "rgba(11,11,13,0.86)" : "rgba(11,11,13,0.4)",
        backdropFilter: "blur(14px)",
        borderBottom: scrolled ? "1px solid var(--border-subtle)" : "1px solid transparent",
      }}
    >
      <nav className="container-nx flex h-full items-center gap-10">
        <Link href="/" className="flex shrink-0 items-center" aria-label="Tenderside home">
          <Image
            src="/brand/tenderside-horizontal.png"
            alt="Tenderside"
            width={300}
            height={200}
            priority
            className="h-[42px] w-auto"
          />
        </Link>

        <ul className="hidden flex-1 items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="transition-colors duration-fast hover:text-gold-300"
                style={{
                  fontSize: "var(--fs-small)",
                  color: "var(--text-secondary)",
                }}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="ml-auto flex items-center gap-3 md:ml-0">
          <Button href="#start" size="sm">
            Create My Manual
          </Button>
        </div>
      </nav>
    </header>
  );
}
