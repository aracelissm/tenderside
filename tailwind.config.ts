import type { Config } from "tailwindcss";

/**
 * Tailwind maps onto the design-system CSS custom properties rather than
 * redefining them. The tokens in app/globals.css stay the single source of
 * truth (CLAUDE.md §11) — this file only exposes them to utility classes so
 * components can use `bg-surface-2` instead of `style={{ background: 'var(...)' }}`.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "near-black": "var(--near-black)",
        charcoal: "var(--charcoal)",
        gold: {
          100: "var(--gold-100)",
          300: "var(--gold-300)",
          500: "var(--gold-500)",
          700: "var(--gold-700)",
          900: "var(--gold-900)",
          DEFAULT: "var(--antique-gold)",
        },
        ivory: {
          "050": "var(--ivory-050)",
          100: "var(--ivory-100)",
          200: "var(--ivory-200)",
          300: "var(--ivory-300)",
        },
        surface: {
          1: "var(--surface-1)",
          2: "var(--surface-2)",
          3: "var(--surface-3)",
          ivory: "var(--surface-ivory)",
        },
        content: {
          primary: "var(--text-primary)",
          secondary: "var(--text-secondary)",
          tertiary: "var(--text-tertiary)",
          "on-gold": "var(--text-on-gold)",
          "on-ivory": "var(--text-on-ivory)",
        },
        accent: {
          teal: "var(--accent-teal)",
          green: "var(--accent-green)",
          blue: "var(--accent-blue)",
          violet: "var(--accent-violet)",
          terracotta: "var(--accent-terracotta)",
          blush: "var(--accent-blush)",
        },
      },
      borderColor: {
        subtle: "var(--border-subtle)",
        DEFAULT: "var(--border-default)",
        strong: "var(--border-strong)",
      },
      fontFamily: {
        display: ["var(--font-cormorant)", "Georgia", "serif"],
        body: ["var(--font-montserrat)", "system-ui", "sans-serif"],
        mono: ["var(--font-plex-mono)", "ui-monospace", "monospace"],
      },
      borderRadius: {
        xs: "var(--radius-xs)",
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
        "2xl": "var(--radius-2xl)",
        pill: "var(--radius-pill)",
      },
      boxShadow: {
        sm: "var(--shadow-sm)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
        xl: "var(--shadow-xl)",
        ivory: "var(--shadow-ivory)",
        "glow-sm": "var(--glow-gold-sm)",
        glow: "var(--glow-gold)",
        "glow-lg": "var(--glow-gold-lg)",
        focus: "var(--focus-ring)",
      },
      maxWidth: {
        container: "var(--container-max)",
        prose: "var(--container-prose)",
      },
      transitionTimingFunction: {
        standard: "var(--ease-standard)",
        out: "var(--ease-out)",
        "in-out": "var(--ease-in-out)",
      },
      transitionDuration: {
        fast: "140ms",
        base: "240ms",
        slow: "420ms",
      },
      animation: {
        float: "nx-float 6s ease-in-out infinite",
        "pulse-glow": "nx-pulse-glow 7s ease-in-out infinite",
        "fade-up": "nx-fade-up 0.9s var(--ease-out) both",
      },
    },
  },
  plugins: [],
};

export default config;
