/**
 * Inspect and optimise the brand assets in public/brand/.
 *
 * Why this exists: the source logos are AI-generated raster art on a large canvas
 * with a lot of empty padding around the actual mark. Sizing them by height in CSS
 * therefore shrinks the *artwork* to near-invisibility while the padding does the
 * work. They're also 1–2 MB each, which is slow enough that the hero image had not
 * finished decoding by the time the page was screenshotted.
 *
 * Usage:
 *   node scripts/brand-assets.mjs inspect
 *   node scripts/brand-assets.mjs build
 *
 * `build` writes optimised siblings; it never overwrites a source file. Originals
 * are preserved in ../tenderside-documentation/ and docs/.
 *
 * Uses sharp, which is already present as a Next.js image-optimisation dependency.
 */
import sharp from "sharp";
import { readdir, stat } from "node:fs/promises";
import { join, parse } from "node:path";

const DIR = "public/brand";
const mode = process.argv[2] ?? "inspect";

const kb = (n) => `${Math.round(n / 1024)} KB`;

async function inspect() {
  for (const name of (await readdir(DIR)).filter((f) => /\.(png|webp)$/.test(f))) {
    const p = join(DIR, name);
    const meta = await sharp(p).metadata();
    const { size } = await stat(p);

    let artwork = "n/a";
    try {
      const { info } = await sharp(p)
        .trim({ threshold: 10 })
        .toBuffer({ resolveWithObject: true });
      const pw = Math.round((info.width / meta.width) * 100);
      const ph = Math.round((info.height / meta.height) * 100);
      artwork = `${info.width}x${info.height} — ${pw}% x ${ph}% of canvas`;
    } catch (e) {
      artwork = `trim failed (${e.message.split("\n")[0]})`;
    }

    console.log(
      `${name.padEnd(30)} ${String(meta.width).padStart(5)}x${String(meta.height).padEnd(6)} ` +
        `${kb(size).padStart(8)}  alpha=${meta.hasAlpha ? "y" : "n"}  artwork: ${artwork}`,
    );
  }
}

async function build() {
  // Logos: trim the dead padding so CSS sizing acts on the mark itself, then
  // emit a webp at a sane pixel density for its display size.
  const logos = [
    { src: "tenderside-horizontal.png", out: "tenderside-horizontal.webp", width: 520 },
    { src: "tenderside-logo.png", out: "tenderside-mark.webp", width: 320 },
  ];

  for (const { src, out } of logos) {
    const p = join(DIR, src);
    const before = (await stat(p)).size;
    const meta = await sharp(p).metadata();

    const info = await sharp(p)
      .trim({ threshold: 10 })
      .resize({ width: logos.find((l) => l.src === src).width, withoutEnlargement: true })
      .webp({ quality: 90, alphaQuality: 100 })
      .toFile(join(DIR, out));

    console.log(
      `${src} -> ${out}\n   ${meta.width}x${meta.height} ${kb(before)}  ->  ` +
        `${info.width}x${info.height} ${kb(info.size)}  (trimmed + webp)`,
    );
  }

  // Hero photo: opaque, so no trim. Cap at a sensible max and let webp do the work.
  const heroSrc = join(DIR, "hero-journal-sunset.png");
  const heroBefore = (await stat(heroSrc)).size;
  const heroMeta = await sharp(heroSrc).metadata();
  const hero = await sharp(heroSrc)
    .resize({ width: 1400, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(join(DIR, "hero-journal-sunset.webp"));
  console.log(
    `hero-journal-sunset.png -> .webp\n   ${heroMeta.width}x${heroMeta.height} ${kb(heroBefore)}  ->  ` +
      `${hero.width}x${hero.height} ${kb(hero.size)}`,
  );

  // Favicon: square, opaque, small.
  const iconSrc = join(DIR, "app-icon.png");
  const iconBefore = (await stat(iconSrc)).size;
  const icon = await sharp(iconSrc)
    .resize({ width: 512, height: 512, fit: "cover" })
    .png({ compressionLevel: 9, palette: true })
    .toFile(join(DIR, "app-icon-512.png"));
  console.log(
    `app-icon.png -> app-icon-512.png\n   ${kb(iconBefore)}  ->  ${kb(icon.size)}`,
  );
}

if (mode === "build") await build();
else await inspect();
