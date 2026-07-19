import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function ClosingCTA() {
  return (
    <section
      className="relative overflow-hidden border-t py-[104px] text-center"
      style={{ borderColor: "var(--border-subtle)" }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: "var(--gradient-gold-radial)", opacity: 0.6 }}
      />
      <Reveal className="container-nx relative">
        <h2
          className="mx-auto"
          style={{ fontSize: "clamp(34px, 4.4vw, 52px)", maxWidth: "18ch" }}
        >
          They want to get this right. Give them something to work with.
        </h2>
        <div className="mt-10 flex justify-center">
          <Button href="#start">
            Create My Manual
            <ArrowRight size={18} strokeWidth={1.75} />
          </Button>
        </div>
      </Reveal>
    </section>
  );
}
