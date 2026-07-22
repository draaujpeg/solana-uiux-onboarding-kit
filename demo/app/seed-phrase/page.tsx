"use client";

import { useState } from "react";
import { SeedPhraseFlow } from "@kit/seed-phrase-flow";

// A sample phrase, all real BIP-39 words. The Figma source's ninth word was
// "silve", which is not one, and a mock that cannot exist is a mock nobody can
// test against.
const words = [
  "apple",
  "river",
  "stone",
  "mirror",
  "candle",
  "forest",
  "eagle",
  "pocket",
  "silver",
  "bridge",
  "cloud",
  "window",
];

export default function SeedPhrasePage() {
  const [open, setOpen] = useState(false);
  const [outcome, setOutcome] = useState<string | null>(null);

  const finish = (message: string) => {
    setOutcome(message);
    setOpen(false);
  };

  return (
    <main className="mx-auto flex w-full max-w-[var(--so-width-wide)] flex-col gap-6 p-8">
      <header className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold">Seed phrase education</h1>
        <p className="text-[var(--so-text-muted)]">
          Choose custody, understand the stakes, see the phrase, prove it was
          written down. The phrase arrives blurred, and once it has been shown,
          closing asks before discarding it. There is no copy control, on
          purpose.
        </p>
      </header>

      <button
        type="button"
        onClick={() => {
          setOutcome(null);
          setOpen(true);
        }}
        className="self-start rounded-[var(--so-radius-sm)] bg-[var(--so-primary)] px-4 py-2 text-sm font-semibold text-[var(--so-primary-fg)]"
      >
        Create a wallet
      </button>

      {outcome && (
        <p className="text-sm text-[var(--so-text-muted)]">{outcome}</p>
      )}

      <SeedPhraseFlow
        open={open}
        words={words}
        // Randomised per attempt in a real product; fixed here so the demo is
        // predictable to check against.
        challenges={[1, 5, 7, 10]}
        onChooseSocial={() => finish("Social custody chosen, no phrase to back up.")}
        onComplete={() => finish("Phrase confirmed, wallet ready.")}
        onAbandon={() => finish("Left the flow, phrase discarded.")}
      />
    </main>
  );
}
