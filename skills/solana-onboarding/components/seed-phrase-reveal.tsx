"use client";

import { Eye } from "lucide-react";
import { useState } from "react";
import { Callout } from "./callout";

/**
 * The recovery phrase itself.
 *
 * It arrives blurred, behind a deliberate press. The previous screen asks the
 * user to check that nobody is looking, and showing the words the instant that
 * screen is dismissed would make that request theatre: the phrase would already
 * be on a shared monitor by the time anyone acted on it.
 *
 * There is no copy-to-clipboard control, and there will not be one. Any process
 * on the machine can read the clipboard, so the convenience is a theft vector,
 * and copying encourages exactly the digital storage the screen before it warns
 * against. Its absence is a decision, not an oversight.
 *
 * The word count is whatever the wallet produces. Twelve is common and twenty
 * four is not rare, so nothing here assumes a number.
 */

export interface SeedPhraseRevealProps {
  words: string[];
  onBack: () => void;
  onContinue: () => void;
}

export function SeedPhraseReveal({
  words,
  onBack,
  onContinue,
}: SeedPhraseRevealProps) {
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <h2 className="pr-8 text-xl font-semibold">Your recovery phrase</h2>
      <p className="text-sm leading-relaxed text-[var(--so-text-muted)]">
        Write the words down in the order they appear. You will confirm some of
        them on the next screen.
      </p>

      <div className="relative">
        <ol
          className={`grid grid-cols-2 gap-2 sm:grid-cols-3 ${
            revealed ? "" : "blur-sm select-none"
          }`}
          // Hidden from assistive tech until revealed, so a screen reader does
          // not announce the phrase before the user has asked for it.
          aria-hidden={!revealed}
        >
          {words.map((word, index) => (
            <li
              key={`${index}-${word}`}
              className="flex gap-2 rounded-[var(--so-radius-sm)] border border-[var(--so-border)] px-3 py-2 text-sm"
            >
              <span className="text-[var(--so-text-subtle)]">{index + 1}</span>
              <span className="font-semibold">{word}</span>
            </li>
          ))}
        </ol>

        {!revealed && (
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              type="button"
              onClick={() => setRevealed(true)}
              className="inline-flex items-center gap-2 rounded-[var(--so-radius-sm)] bg-[var(--so-primary)] px-4 py-2 text-sm font-semibold text-[var(--so-primary-fg)]"
            >
              <Eye className="size-4" aria-hidden />
              Show phrase
            </button>
          </div>
        )}
      </div>

      <Callout>
        The order of the words is part of the key. Do not change the sequence.
      </Callout>

      <div className="mt-2 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={onBack}
          className="rounded-[var(--so-radius-sm)] border border-[var(--so-border)] bg-transparent px-4 py-2 text-sm font-semibold"
        >
          Back
        </button>
        <button
          type="button"
          onClick={onContinue}
          disabled={!revealed}
          className="rounded-[var(--so-radius-sm)] bg-[var(--so-primary)] px-4 py-2 text-sm font-semibold text-[var(--so-primary-fg)] disabled:bg-[var(--so-disabled-surface)] disabled:text-[var(--so-disabled-text)]"
        >
          I have written it down
        </button>
      </div>
    </div>
  );
}
