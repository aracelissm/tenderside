import type { Metadata } from "next";
import { PageShell } from "@/components/site/PageShell";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Log In",
  description: "Accounts are coming. Here's how to get back to your manual in the meantime.",
};

/**
 * There is no auth yet — it's Phase 4, and the current lean is Redis-backed
 * magic links (CLAUDE.md §10). The nav asks for a Log In button, so this page
 * exists to tell the truth rather than 404 or fake a sign-in form.
 *
 * Replace wholesale when auth lands. Nothing here should be mistaken for a
 * working account system: no email field, no password field, no illusion that
 * submitting something would do anything.
 */
export default function LoginPage() {
  return (
    <PageShell eyebrow="Accounts" title="We don't have logins yet.">
      <div className="flex flex-col gap-5">
        <p className="nx-body text-[17px] leading-relaxed">
          Tenderside is in beta, and accounts aren&rsquo;t built. That&rsquo;s a
          deliberate order of operations — we&rsquo;d rather get the
          conversation and the manual right first than ask you to make a password
          before you know whether any of this is for you.
        </p>

        <div
          className="rounded-lg border p-6"
          style={{
            background: "var(--surface-2)",
            borderColor: "var(--border-subtle)",
          }}
        >
          <p className="nx-caption mb-3">Getting back to your work</p>
          <p className="nx-body leading-relaxed">
            A conversation you&rsquo;ve started resumes on the same device and
            browser — you can close the tab and come back to it. A manual
            you&rsquo;ve shared lives at its own private link, and so does the
            copy you keep. Hold on to that link and you&rsquo;ll always have your
            way back in.
          </p>
        </div>

        <p className="nx-body text-[17px] leading-relaxed">
          When accounts do arrive, they&rsquo;ll be a link sent to your email —
          no password to invent, none to forget.
        </p>

        <div className="mt-4 flex flex-wrap gap-4">
          <Button href="/#start">Create My Manual</Button>
          <Button href="/" variant="secondary">
            Back to home
          </Button>
        </div>
      </div>
    </PageShell>
  );
}
