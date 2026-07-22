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
 * Say the trade-off in the description rather than in a badge. The custody fork
 * carried a "full control" tag once, and it read as marketing sitting next to a
 * sentence that already made the same claim and could qualify it.
 */

export interface Choice {
  id: string;
  icon?: ReactNode;
  title: string;
  description: string;
  /** Defines the term in the title, in place, for whoever has not met it. */
  explain?: { title: string; definition: ReactNode; href?: string };
  actionLabel: string;
}

export interface ChoiceCardsProps {
  choices: Choice[];
  onSelect: (id: string) => void;
  className?: string;
}

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
                    learnMore={
                      choice.explain.href
                        ? { href: choice.explain.href }
                        : undefined
                    }
                  />
                ) : (
                  choice.title
                )}
              </span>
              <span className="text-sm leading-relaxed text-[var(--so-text-muted)]">
                {choice.description}
              </span>
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
