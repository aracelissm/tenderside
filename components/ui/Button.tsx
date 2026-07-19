import Link from "next/link";

type Variant = "primary" | "secondary";
type Size = "sm" | "lg";

const HEIGHT: Record<Size, string> = {
  sm: "var(--control-h-sm)",
  lg: "var(--control-h-lg)",
};

/**
 * Primary = gold gradient on near-black text with a soft glow.
 * Secondary = gold hairline outline.
 * Both meet the 44px touch target at lg; sm is nav-only (36px) where the
 * surrounding hit area covers the difference.
 */
export function Button({
  href,
  children,
  variant = "primary",
  size = "lg",
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-pill font-medium whitespace-nowrap " +
    "transition-all duration-base ease-standard active:translate-y-px active:scale-[0.99]";

  const style: React.CSSProperties =
    variant === "primary"
      ? {
          height: HEIGHT[size],
          padding: size === "lg" ? "0 28px" : "0 18px",
          background: "var(--gradient-gold)",
          color: "var(--text-on-gold)",
          boxShadow: "var(--glow-gold-sm)",
          fontSize: size === "lg" ? "var(--fs-body)" : "var(--fs-small)",
        }
      : {
          height: HEIGHT[size],
          padding: size === "lg" ? "0 28px" : "0 18px",
          border: "1px solid var(--border-strong)",
          color: "var(--gold-300)",
          fontSize: size === "lg" ? "var(--fs-body)" : "var(--fs-small)",
        };

  const hover =
    variant === "primary"
      ? "hover:brightness-110 hover:shadow-glow"
      : "hover:border-strong hover:text-gold-100";

  return (
    <Link href={href} className={`${base} ${hover} ${className}`} style={style}>
      {children}
    </Link>
  );
}
