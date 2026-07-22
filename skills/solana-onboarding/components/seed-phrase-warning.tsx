"use client";

import { CameraOff, EyeOff, PenLine } from "lucide-react";
import { useId, useState } from "react";
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
}

export function SeedPhraseWarning({
  onBack,
  onReveal,
}: SeedPhraseWarningProps) {
  const [acknowledged, setAcknowledged] = useState(false);
  const checkboxId = useId();

  return (
    <div className="flex flex-col gap-4">
      <h2 className="pr-8 text-xl font-semibold">
        Before you see your recovery phrase
      </h2>

      <Callout severity="warning">
        These words are the only way to recover your wallet.{" "}
        <strong>No one can help you if you lose them.</strong>
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
          disabled={!acknowledged}
          className="rounded-[var(--so-radius-sm)] bg-[var(--so-primary)] px-4 py-2 text-sm font-semibold text-[var(--so-primary-fg)] disabled:bg-[var(--so-disabled-surface)] disabled:text-[var(--so-disabled-text)]"
        >
          Show my phrase
        </button>
      </div>
    </div>
  );
}
