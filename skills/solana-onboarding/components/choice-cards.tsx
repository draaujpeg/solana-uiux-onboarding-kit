"use client";

import type { ReactNode } from "react";

/**
 * A fork in a flow, presented as cards rather than a list of radio buttons,
 * because each option needs a sentence explaining what the user is signing up
 * for. Used for the custody choice, where picking wrong is expensive and the
 * words "recovery phrase" mean nothing to the person reading them.
 *
 * The tag is the honest part. One option is easier and one is more demanding,
 * and saying so is better than letting the user discover it three screens later.
 */

export interface Choice {
  id: string;
  icon?: ReactNode;
  title: string;
  description: string;
  tag?: { label: string; tone: "positive" | "warning" };
}

export interface ChoiceCardsProps {
  choices: Choice[];
  onSelect: (id: string) => void;
  className?: string;
}

const tagTone = {
  positive:
    "bg-[var(--so-success-surface)] text-[var(--so-success-text)]",
  warning: "bg-[var(--so-warning-surface)] text-[var(--so-warning-text)]",
};

export function ChoiceCards({
  choices,
  onSelect,
  className = "",
}: ChoiceCardsProps) {
  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      {choices.map((choice) => (
        <button
          key={choice.id}
          type="button"
          onClick={() => onSelect(choice.id)}
          className="flex w-full gap-4 rounded-[var(--so-radius-sm)] border border-[var(--so-border)] p-4 text-left"
        >
          {choice.icon && (
            <span className="mt-0.5 shrink-0 text-[var(--so-text)]" aria-hidden>
              {choice.icon}
            </span>
          )}
          <span className="flex min-w-0 flex-col gap-2">
            <span className="font-semibold">{choice.title}</span>
            <span className="text-sm leading-relaxed text-[var(--so-text-muted)]">
              {choice.description}
            </span>
            {choice.tag && (
              <span
                className={`self-start rounded-[var(--so-radius-sm)] px-2 py-1 text-xs font-semibold ${tagTone[choice.tag.tone]}`}
              >
                {choice.tag.label}
              </span>
            )}
          </span>
        </button>
      ))}
    </div>
  );
}
