import type { Metadata } from "next";
import { PageShell } from "@/components/site/PageShell";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Tenderside is free while in beta.",
};

/**
 * Honest placeholder page. Pricing genuinely isn't decided — monetisation is
 * post-validation per CLAUDE.md §2, and the beta exists to measure the share
 * rate, not willingness to pay. Saying that plainly is better than inventing
 * tiers we'd have to walk back, and better than a nav link that 404s.
 */
export default function PricingPage() {
  return (
    <PageShell eyebrow="Pricing" title="Free while we're in beta.">
      <div className="flex flex-col gap-5">
        <p className="nx-body text-[17px] leading-relaxed">
          Tenderside is free right now, and it will stay free for everyone who
          joins during the beta. No card, no trial clock, no upgrade prompt in
          the middle of a hard question.
        </p>
        <p className="nx-body text-[17px] leading-relaxed">
          We haven&rsquo;t set a price yet, because we&rsquo;re not finished
          learning what this is worth to the people using it. When that changes,
          beta users will hear it from us first — and anything you&rsquo;ve
          already written stays yours either way.
        </p>

        <div
          className="mt-4 rounded-lg border p-6"
          style={{
            background: "var(--surface-2)",
            borderColor: "var(--border-subtle)",
          }}
        >
          <p className="nx-caption mb-3">What you get today</p>
          <p className="nx-body leading-relaxed">
            The full nine-section conversation, your complete manual, and private
            links to share it with up to two people. All of it, at no cost.
          </p>
        </div>

        <div className="mt-4">
          <Button href="/#start">Create My Manual</Button>
        </div>
      </div>
    </PageShell>
  );
}
