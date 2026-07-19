import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";

/** Shared chrome for the secondary routes so nav/footer stay consistent. */
export function PageShell({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <Nav />
      <main className="container-nx py-20">
        <p className="nx-eyebrow">{eyebrow}</p>
        <h1
          className="mt-4"
          style={{ fontSize: "clamp(34px, 4vw, 52px)", lineHeight: 1.08, textWrap: "balance" }}
        >
          {title}
        </h1>
        <div className="mt-10 max-w-prose">{children}</div>
      </main>
      <Footer />
    </>
  );
}
