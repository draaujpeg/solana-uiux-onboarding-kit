"use client";

import { useEffect, useId, useState } from "react";
import { Callout } from "./callout";
import { ModalShell } from "./modal-shell";

/**
 * Bringing an existing wallet in, which is how a large share of users arrive.
 *
 * This screen is the one an attacker most wants to imitate, because a phishing
 * page that looks like it is the whole attack. So it says plainly that the
 * phrase never leaves the device and that nobody should ever be shown it. A user
 * who reads that here has a chance of recognising its absence elsewhere.
 *
 * Numbered slots, not one long field, and nothing is masked. The order of the
 * words is part of the key, so a numbered slot shows the user exactly where they
 * are and where a word went missing, which a wrapped sentence never does. Masking
 * would fight the one thing this screen is for: checking, word by word, that what
 * was typed matches what is on the paper.
 *
 * Pasting the whole phrase into any slot fills the rest from there, because
 * people keep phrases in password managers and the alternative is retyping from
 * a photograph.
 *
 * Twelve slots by default. Wallets that use another length pass their own count:
 * what this component owns is the shape of the flow, not the rules of a
 * particular wallet.
 *
 * Length is checked, spelling is not. Only the wallet can say whether a phrase is
 * valid, and a component that guesses would reject correct phrases in wordlists
 * it does not know about.
 */

export interface SeedPhraseImportFlowProps {
  open: boolean;
  onCancel: () => void;
  /** Receives the normalised words. Validation against the wordlist is yours. */
  onImport: (words: string[]) => void;
  /** How many slots to show. Twelve unless the wallet says otherwise. */
  wordCount?: number;
  /** Set while the wallet is deriving the account, to disable the actions. */
  busy?: boolean;
  /** Shown when the wallet rejects the phrase. */
  error?: string;
}

export function SeedPhraseImportFlow({
  open,
  onCancel,
  onImport,
  wordCount = 12,
  busy = false,
  error,
}: SeedPhraseImportFlowProps) {
  const [words, setWords] = useState<string[]>(() => Array(wordCount).fill(""));
  const fieldPrefix = useId();

  useEffect(() => {
    if (!open) setWords(Array(wordCount).fill(""));
  }, [open, wordCount]);

  const setWordAt = (index: number, value: string) =>
    setWords((previous) => {
      const next = [...previous];
      next[index] = value.trim().toLowerCase();
      return next;
    });

  // A pasted phrase lands in whichever slot has focus and fills the rest from
  // there, so pasting into the first slot fills them all.
  const spreadFrom = (index: number, text: string) => {
    const pasted = text.trim().toLowerCase().split(/\s+/).filter(Boolean);
    if (pasted.length < 2) return false;
    setWords((previous) => {
      const next = [...previous];
      pasted.forEach((word, offset) => {
        if (index + offset < next.length) next[index + offset] = word;
      });
      return next;
    });
    return true;
  };

  const complete = words.every((word) => word.length > 0);

  return (
    <ModalShell open={open} onClose={onCancel} label="Import a wallet">
      <div className="flex flex-col gap-4">
        <h2 className="pr-8 text-xl font-semibold">Import a wallet</h2>
        <p className="text-sm leading-relaxed text-[var(--so-text-muted)]">
          Enter your recovery phrase in the same order you wrote it down. You can
          paste the whole phrase into the first slot.
        </p>

        <Callout severity="warning" heading="Only ever type this here">
          Your phrase stays on this device and is never sent anywhere. No support
          agent, from this app or any other, will ever ask you for it. Never show
          it to anyone.
        </Callout>

        <ol className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {words.map((word, index) => {
            const fieldId = `${fieldPrefix}-${index}`;
            return (
              <li key={index} className="flex items-center gap-2">
                <label
                  htmlFor={fieldId}
                  className="w-5 shrink-0 text-right text-sm text-[var(--so-text-subtle)]"
                >
                  {index + 1}
                </label>
                <input
                  id={fieldId}
                  value={word}
                  onChange={(event) => setWordAt(index, event.target.value)}
                  onPaste={(event) => {
                    if (spreadFrom(index, event.clipboardData.getData("text")))
                      event.preventDefault();
                  }}
                  autoComplete="off"
                  autoCapitalize="none"
                  spellCheck={false}
                  aria-label={`Word ${index + 1}`}
                  className={`w-full min-w-0 rounded-[var(--so-radius-sm)] border px-2 py-2 text-sm ${
                    error
                      ? "border-[var(--so-danger-border)]"
                      : "border-[var(--so-border)]"
                  }`}
                />
              </li>
            );
          })}
        </ol>

        {error && (
          <p className="text-sm text-[var(--so-danger-text)]">{error}</p>
        )}

        <div className="mt-2 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            disabled={busy}
            className="rounded-[var(--so-radius-sm)] border border-[var(--so-border)] bg-transparent px-4 py-2 text-sm font-semibold disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => onImport(words)}
            disabled={!complete || busy}
            className="rounded-[var(--so-radius-sm)] bg-[var(--so-primary)] px-4 py-2 text-sm font-semibold text-[var(--so-primary-fg)] disabled:bg-[var(--so-disabled-surface)] disabled:text-[var(--so-disabled-text)]"
          >
            Import wallet
          </button>
        </div>
      </div>
    </ModalShell>
  );
}
