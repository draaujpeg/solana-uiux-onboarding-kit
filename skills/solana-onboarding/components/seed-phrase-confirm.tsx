"use client";

import { useId, useState } from "react";

/**
 * Proof that the phrase was actually written down.
 *
 * The check is the point of the whole flow. Without it the product has shown
 * some words and hopes for the best, and the user finds out whether they
 * copied them correctly on the day they need them, which is the worst possible
 * day to find out.
 *
 * Continue stays disabled while any answer is wrong. The Figma source left it
 * enabled with an error visible on screen, contradicting its own earlier screen
 * where a checkbox correctly gated the button.
 */

export interface SeedPhraseConfirmProps {
  words: string[];
  /** One-based positions to ask for. Randomise these per attempt. */
  challenges: number[];
  onBack: () => void;
  onConfirm: () => void;
}

export function SeedPhraseConfirm({
  words,
  challenges,
  onBack,
  onConfirm,
}: SeedPhraseConfirmProps) {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const fieldPrefix = useId();

  const statusOf = (position: number) => {
    const answer = answers[position];
    if (!answer) return "empty" as const;
    return answer.trim().toLowerCase() === words[position - 1].toLowerCase()
      ? ("correct" as const)
      : ("wrong" as const);
  };

  const allCorrect = challenges.every(
    (position) => statusOf(position) === "correct",
  );

  return (
    <div className="flex flex-col gap-4">
      <h2 className="pr-8 text-xl font-semibold">Confirm your phrase</h2>
      <p className="text-sm leading-relaxed text-[var(--so-text-muted)]">
        Type the words below. This confirms you wrote them down correctly.
      </p>

      <div className="flex flex-col gap-4">
        {challenges.map((position) => {
          const status = statusOf(position);
          const fieldId = `${fieldPrefix}-${position}`;
          return (
            <div key={position} className="flex flex-col gap-1">
              <label htmlFor={fieldId} className="text-sm font-semibold">
                Word {position}
              </label>
              <input
                id={fieldId}
                value={answers[position] ?? ""}
                onChange={(event) =>
                  setAnswers((previous) => ({
                    ...previous,
                    [position]: event.target.value,
                  }))
                }
                placeholder={`Type word ${position}`}
                autoComplete="off"
                spellCheck={false}
                aria-invalid={status === "wrong"}
                aria-describedby={status === "empty" ? undefined : `${fieldId}-status`}
                className={`rounded-[var(--so-radius-sm)] border px-3 py-2 text-sm ${
                  status === "wrong"
                    ? "border-[var(--so-danger-border)]"
                    : "border-[var(--so-border)]"
                }`}
              />
              {/* Never colour alone: each state says what it means in words. */}
              {status === "correct" && (
                <p
                  id={`${fieldId}-status`}
                  className="text-sm text-[var(--so-success-text)]"
                >
                  Correct
                </p>
              )}
              {status === "wrong" && (
                <p
                  id={`${fieldId}-status`}
                  className="text-sm text-[var(--so-danger-text)]"
                >
                  This does not match what you wrote down
                </p>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-2 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={onBack}
          className="rounded-[var(--so-radius-sm)] border border-[var(--so-border)] bg-transparent px-4 py-2 text-sm font-semibold"
        >
          See the phrase again
        </button>
        <button
          type="button"
          onClick={onConfirm}
          disabled={!allCorrect}
          className="rounded-[var(--so-radius-sm)] bg-[var(--so-primary)] px-4 py-2 text-sm font-semibold text-[var(--so-primary-fg)] disabled:bg-[var(--so-disabled-surface)] disabled:text-[var(--so-disabled-text)]"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
