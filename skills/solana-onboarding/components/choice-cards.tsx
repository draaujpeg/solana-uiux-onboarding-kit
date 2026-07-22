"use client";

import type { ReactNode } from "react";
import { GlossaryTooltip } from "./glossary-tooltip";

/**
 * A fork in a flow, presented as cards rather than a list of radio buttons,
 * because each option needs a sentence explaining what the user is signing up
 * for. Used for the custody choice, where picking wrong is expensive and the
 * words "recovery phrase" mean nothing to the person reading them.
 *
 * The card is not itself a button. Its action is, which leaves room in the title
 * for a definition of whatever jargon the option is named after, and avoids the
 * nested interactive elements that make a card-as-button unusable with a
 * keyboard or a screen reader.
 *
 * The tag is the honest part. One option is easier and one is more demanding,
 * and saying so is better than letting the user discover it three screens later.
 */

export interface Choice {
  id: string;
  icon?: ReactNode;
  title: string;
  description: string;
  /** Defines the term in the title, in place, for whoever has not met it. */
  explain?: { title: string; definition: ReactNode };
  tag?: { label: string; tone: "positive" | "warning" };
  actionLabel: string;
}

export interface ChoiceCardsProps {
  choices: Choice[];
  onSelect: (id: string) => void;
  className?: string;
}

const tagTone = {
  positive: "bg-[var(--so-success-surface)] text-[var(--so-success-text)]",
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
        <div
          key={choice.id}
          className="flex flex-col gap-3 rounded-[var(--so-radius-sm)] border border-[var(--so-border)] p-4"
        >
          <div className="flex gap-3">
            {choice.icon && (
              <span
                className="mt-0.5 shrink-0 text-[var(--so-text)]"
                aria-hidden
              >
                {choice.icon}
              </span>
            )}
            <div className="flex min-w-0 flex-col gap-2">
              <span className="flex flex-wrap items-center gap-2 font-semibold">
                {choice.explain ? (
                  <GlossaryTooltip
                    trigger="icon"
                    placement="bottom"
                    term={choice.title}
                    title={choice.explain.title}
                    definition={choice.explain.definition}
                  />
                ) : (
                  choice.title
                )}
              </span>
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
            </div>
          </div>

          <button
            type="button"
            onClick={() => onSelect(choice.id)}
            className="self-start rounded-[var(--so-radius-sm)] bg-[var(--so-primary)] px-4 py-2 text-sm font-semibold text-[var(--so-primary-fg)]"
          >
            {choice.actionLabel}
          </button>
        </div>
      ))}
    </div>
  );
}
