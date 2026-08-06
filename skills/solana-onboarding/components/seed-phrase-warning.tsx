"use client";

import { CameraOff, EyeOff, PenLine } from "lucide-react";
import { useEffect, useId, useState } from "react";
import { Callout } from "./callout";

/**
 * The screen before the recovery phrase appears.
 *
 * The research found the phrase is almost always shown at the moment of maximum
 * consequence with no bridge to anything the user already understands. This
 * screen is that bridge, and the checkbox is not a legal formality: it is the
 * beat that stops someone revealing their phrase on a shared screen because they
 * were clicking through.
 *
 * Reveal stays disabled until the box is ticked, which the Figma source got
 * right here and then contradicted two screens later.
 *
 * Three things here came from the field audit in docs/field-audit.md, where a
 * shipping wallet's version of this screen was better than ours:
 *
 * 1. The analogy is stated, not gestured at. Naming something the user already
 *    owns, then naming the one way this differs from it, does the work that
 *    "keep these safe" cannot.
 * 2. The impersonation script is named. A general warning about sharing is
 *    forgotten; being told in advance the exact sentence a thief will use is
 *    what the user recognises months later, when someone says it.
 * 3. The reveal control waits. A checkbox can be ticked in half a second by
 *    someone who read nothing, so the box alone proves intent, not attention.
 *    The wait is short, and it says why it is there, because a disabled control
 *    that explains nothing is its own failure.
 */

const defaultRules = [
  { icon: EyeOff, text: "Make sure no one is looking at your screen right now." },
  { icon: CameraOff, text: "Do not photograph it or save it on your phone." },
  {
    icon: PenLine,
    text: "Write it on paper, in order. The sequence is part of the key.",
  },
];

export interface SeedPhraseWarningProps {
  onBack: () => void;
  onReveal: () => void;
  /**
   * Seconds the reveal control waits before it can be pressed. Long enough to
   * read the screen, short enough not to read as a broken button. Pass 0 to
   * remove the wait, which is the wrong trade on a phrase the user cannot
   * replace.
   */
  revealDelaySeconds?: number;
}

export function SeedPhraseWarning({
  onBack,
  onReveal,
  revealDelaySeconds = 5,
}: SeedPhraseWarningProps) {
  const [acknowledged, setAcknowledged] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(revealDelaySeconds);
  const checkboxId = useId();

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const timer = setTimeout(() => setSecondsLeft(secondsLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [secondsLeft]);

  const waiting = secondsLeft > 0;
  const blocked = waiting || !acknowledged;

  // Announced once per state rather than once per second: a live region that
  // recounts the seconds talks over everything else on the screen.
  const blockedReason = waiting
    ? "Take a moment to read this screen before continuing."
    : acknowledged
      ? ""
      : "Tick the box above when you are ready.";

  return (
    <div className="flex flex-col gap-4">
      <h2 className="pr-8 text-xl font-semibold">
        Before you see your recovery phrase
      </h2>

      <Callout severity="warning">
        Think of the login to your bank. If someone had it, you would change the
        password and call support.{" "}
        <strong>
          These words have no password to change and no one to call.
        </strong>{" "}
        Whoever reads them owns this wallet, and there is no way to take it back.
      </Callout>

      <ul className="flex flex-col gap-3">
        {defaultRules.map((rule) => (
          <li key={rule.text} className="flex gap-3 text-sm">
            <rule.icon
              className="mt-0.5 size-4 shrink-0 text-[var(--so-text-muted)]"
              aria-hidden
            />
            <span className="leading-relaxed">{rule.text}</span>
          </li>
        ))}
      </ul>

      <Callout severity="danger" heading="No one will ever ask you for these words">
        Not support, not an administrator, not anyone who says they work here.
        However urgent they sound and whichever app they message you on, someone
        asking for these words is stealing from you.
      </Callout>

      <div className="rounded-[var(--so-radius-sm)] border border-[var(--so-border)] p-4">
        <label htmlFor={checkboxId} className="flex gap-3 text-sm">
          <input
            id={checkboxId}
            type="checkbox"
            checked={acknowledged}
            onChange={(event) => setAcknowledged(event.target.checked)}
            className="mt-0.5 size-4 shrink-0"
          />
          <span className="leading-relaxed">
            I am somewhere private and ready to write it down.
          </span>
        </label>
      </div>

      {blocked && (
        <p className="text-xs leading-relaxed text-[var(--so-text-muted)]">
          <span aria-live="polite">{blockedReason}</span>
          {waiting && (
            <span aria-hidden> The button opens in {secondsLeft}s.</span>
          )}
        </p>
      )}

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
          onClick={onReveal}
          disabled={blocked}
          className="rounded-[var(--so-radius-sm)] bg-[var(--so-primary)] px-4 py-2 text-sm font-semibold text-[var(--so-primary-fg)] disabled:bg-[var(--so-disabled-surface)] disabled:text-[var(--so-disabled-text)]"
        >
          Show my phrase
        </button>
      </div>
    </div>
  );
}
