import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

/**
 * Fonts are vendored into app/fonts/ and loaded with next/font/local rather
 * than next/font/google. Two reasons:
 *
 *  1. Hermetic builds — next/font/google fetches from fonts.googleapis.com at
 *     build time. On any network that TLS-intercepts (corporate proxy, some
 *     AV), that fetch fails and Next SILENTLY falls back to system fonts, so
 *     the build "succeeds" while shipping the wrong typography.
 *  2. No third-party request path for a product whose content is sensitive
 *     by definition (CLAUDE.md §4.5).
 *
 * Cormorant Garamond and Montserrat are variable fonts — one file spans the
 * whole weight range, hence the `weight` ranges below. IBM Plex Mono is static.
 * Latin subset only. Families match docs/design-system/tokens/fonts.css.
 */
const cormorant = localFont({
  src: [
    { path: "./fonts/cormorant-variable.woff2", weight: "400 700", style: "normal" },
    { path: "./fonts/cormorant-variable-italic.woff2", weight: "400 500", style: "italic" },
  ],
  variable: "--font-cormorant",
  display: "swap",
});

const montserrat = localFont({
  src: [{ path: "./fonts/montserrat-variable.woff2", weight: "300 700", style: "normal" }],
  variable: "--font-montserrat",
  display: "swap",
});

const plexMono = localFont({
  src: [
    { path: "./fonts/plexmono-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/plexmono-500.woff2", weight: "500", style: "normal" },
    { path: "./fonts/plexmono-600.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://tenderside.com"),
  title: {
    default: "Tenderside",
    template: "%s · Tenderside",
  },
  description:
    "Create a personal manual that helps the people who love you understand how you work.",
  openGraph: {
    title: "Tenderside",
    description:
      "Create a personal manual that helps the people who love you understand how you work.",
    url: "https://tenderside.com",
    siteName: "Tenderside",
    type: "website",
  },
  icons: {
    icon: "/brand/app-icon-512.png",
    apple: "/brand/app-icon-512.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#0B0B0D",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${montserrat.variable} ${plexMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
