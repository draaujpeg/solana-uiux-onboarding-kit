"use client";

import { GlossaryTooltip } from "@kit/glossary-tooltip";
import { helpUrl } from "@kit/help-links";

// The three terms the research found most often used without explanation, in the
// two places jargon actually appears: inside a sentence, and as the label of a
// value in a summary row.
export default function GlossaryPage() {
  return (
    <main className="mx-auto flex w-full max-w-[var(--so-width-wide)] flex-col gap-8 p-8">
      <header className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold">Inline help and glossary</h1>
        <p className="text-[var(--so-text-muted)]">
          A definition where the word is. Click a dotted word, hover or tab to an
          icon. Escape closes, and so does a click outside.
        </p>
      </header>

      <section className="flex flex-col gap-4 rounded-[var(--so-radius-lg)] border border-[var(--so-border)] bg-[var(--so-surface)] p-6">
        <h2 className="font-semibold">Review your transfer</h2>
        <p className="text-sm leading-relaxed">
          You will pay an estimated{" "}
          <GlossaryTooltip
            term="network fee"
            title="Network fee, also called gas"
            definition="A small amount paid to the validators that process your transaction. On Solana it is usually a fraction of a cent."
            learnMore={{ href: helpUrl("networkFee") }}
          />{" "}
          of <strong>0.000005 SOL</strong>. The final amount may vary slightly
          depending on the network.
        </p>
      </section>

      <section className="flex flex-col gap-4 rounded-[var(--so-radius-lg)] border border-[var(--so-border)] bg-[var(--so-surface)] p-6">
        <h2 className="font-semibold">Swap details</h2>
        <dl className="flex flex-col gap-3 text-sm">
          <div className="flex items-center justify-between gap-4">
            <dt className="text-[var(--so-text-muted)]">
              <GlossaryTooltip
                trigger="icon"
                placement="bottom"
                term="Slippage"
                title="Slippage, the variation you accept"
                definition="The largest difference you will accept between the price shown and the final price."
                learnMore={{ href: helpUrl("slippage") }}
              />
            </dt>
            <dd className="font-semibold">0.5%</dd>
          </div>
          <div className="flex items-center justify-between gap-4">
            <dt className="text-[var(--so-text-muted)]">
              <GlossaryTooltip
                trigger="icon"
                placement="bottom"
                term="Price impact"
                title="Price impact"
                definition="How much your swap moves the token's own price. Large trades in small pools move it more."
                learnMore={{ href: helpUrl("priceImpact") }}
              />
            </dt>
            <dd className="font-semibold">Under 0.01%</dd>
          </div>
        </dl>
      </section>
    </main>
  );
}
