import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { ValueGrid } from "@/components/site/ValueGrid";
import { FounderNote } from "@/components/site/FounderNote";
import { ManualShowcase } from "@/components/site/ManualShowcase";
import { ShareMoment } from "@/components/site/ShareMoment";
import { ClosingCTA } from "@/components/site/ClosingCTA";
import { Footer } from "@/components/site/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <ValueGrid />
        <FounderNote />
        <ManualShowcase />
        <ShareMoment />
        <ClosingCTA />
      </main>
      <Footer />
    </>
  );
}
