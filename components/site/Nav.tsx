"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";

/**
 * Sticky nav. Translucent at rest, opaque + gold hairline after scrollY > 12.
 *
 * Full link set per the design prototype. Every destination is real — anchors
 * where the section exists on this page, routes where it doesn't. Nothing here
 * links to a page that hasn't been written; a nav item that goes nowhere costs
 * more trust than the item was worth.
 */
const LINKS = [
  { label: "Home", href: "/" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "The Manual", href: "#the-manual" },
  { label: "For Relationships", href: "#the-moment" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
] as const;

export function Nav() {
  const pathname = usePathname();
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
        {/*
          Symbol as image + wordmark as live text, matching the design prototype
          (34x34 icon + "TENDERSIDE" in the display serif at 0.14em tracking).

          The full raster lockup was used here first and read blurry: its tagline
          is ~8px tall in the source artwork, so at nav size it renders under 2px.
          No amount of resolution fixes rasterised micro-type — the fix is to set
          it as real text, which stays crisp at any size and zoom.
        */}
        <Link
          href="/"
          className="flex shrink-0 items-center gap-3"
          aria-label="Tenderside home"
        >
          <Image
            src="/brand/tenderside-mark.webp"
            alt=""
            width={320}
            height={299}
            priority
            className="h-[34px] w-auto"
          />
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "24px",
              letterSpacing: "0.14em",
              color: "var(--brand-gold)",
              lineHeight: 1,
            }}
          >
            TENDERSIDE
          </span>
        </Link>

        <ul className="hidden flex-1 items-center gap-6 lg:flex">
          {LINKS.map((l) => {
            const active = l.href === "/" && pathname === "/";
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="whitespace-nowrap transition-colors duration-fast hover:text-gold-300"
                  style={{
                    fontSize: "var(--fs-small)",
                    color: active ? "var(--brand-gold)" : "var(--text-secondary)",
                    borderBottom: active ? "1px solid var(--brand-gold)" : "none",
                    paddingBottom: active ? "2px" : "0",
                  }}
                >
                  {l.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="ml-auto flex items-center gap-3 lg:ml-0">
          <Button href="/login" variant="secondary" size="sm">
            Log In
          </Button>
          <Button href="/begin" size="sm">
            Get Started
          </Button>
        </div>
      </nav>
    </header>
  );
}
