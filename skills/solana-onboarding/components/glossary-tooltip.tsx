"use client";

import { Info } from "lucide-react";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";

/**
 * A definition where the word is, at the moment the word is read.
 *
 * The research found help exists in almost every product and lives in the wrong
 * place: another tab, another site, never on the screen where the question
 * appears. Jargon is where that hurts most, because "slippage" or "network fee"
 * does not read as something to look up, it reads as something the reader should
 * already know, and looking it up means admitting otherwise.
 *
 * Two triggers, for two situations. An underlined word inside a sentence, opened
 * by clicking, because a sentence is read and the underline is the invitation. A
 * label with an information icon in a row of values, opened by hover or by
 * keyboard focus, because a row is scanned rather than read.
 *
 * It is a toggletip, not a title attribute: the content is interactive, it can
 * hold a link, and a title attribute is invisible to touch and to most
 * keyboards.
 *
 * Placement is a prop and there is no collision detection. In tight layouts pass
 * the side that fits, or swap the positioning for a library. The alternative was
 * shipping a dependency to solve a problem most usages do not have.
 */

export interface GlossaryTooltipProps {
  /** The word as it appears to the reader. */
  term: string;
  /** Heading of the popover. Usually the term plus its English or native pair. */
  title: string;
  definition: ReactNode;
  learnMore?: { label?: string; href?: string; onClick?: () => void };
  trigger?: "underline" | "icon";
  placement?: "top" | "bottom";
  className?: string;
}

export function GlossaryTooltip({
  term,
  title,
  definition,
  learnMore,
  trigger = "underline",
  placement = "top",
  className = "",
}: GlossaryTooltipProps) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLSpanElement>(null);
  const popoverId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const onPointer = (event: PointerEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  // The icon sits in a scanned row, so it opens on hover as well as focus. The
  // underlined word sits in a sentence, where hover would fire while reading.
  const hoverProps =
    trigger === "icon"
      ? {
          onMouseEnter: () => setOpen(true),
          onMouseLeave: () => setOpen(false),
          onFocus: () => setOpen(true),
          onBlur: () => setOpen(false),
        }
      : {};

  return (
    <span ref={wrapperRef} className={`relative inline-block ${className}`}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={popoverId}
        onClick={() => setOpen((previous) => !previous)}
        {...hoverProps}
        className={
          trigger === "underline"
            ? "underline decoration-dotted underline-offset-4"
            : "inline-flex items-center gap-1 text-[var(--so-text-muted)]"
        }
      >
        {term}
        {trigger === "icon" && (
          <>
            <Info className="size-4" aria-hidden />
            <span className="sr-only">What does this mean?</span>
          </>
        )}
      </button>

      {open && (
        <span
          id={popoverId}
          role="dialog"
          aria-label={title}
          className={`absolute left-0 z-10 flex w-[min(20rem,80vw)] flex-col gap-1 rounded-[var(--so-radius-lg)] border border-[var(--so-border)] bg-[var(--so-surface)] p-3 text-left shadow-lg ${
            placement === "top" ? "bottom-full mb-2" : "top-full mt-2"
          }`}
        >
          <span className="text-sm font-semibold text-[var(--so-text)]">
            {title}
          </span>
          <span className="text-sm leading-relaxed text-[var(--so-text-muted)]">
            {definition}
          </span>
          {learnMore &&
            (learnMore.href ? (
              <a
                href={learnMore.href}
                className="mt-1 self-start text-sm underline underline-offset-2"
              >
                {learnMore.label ?? "Learn more"}
              </a>
            ) : (
              <button
                type="button"
                onClick={learnMore.onClick}
                className="mt-1 self-start text-sm underline underline-offset-2"
              >
                {learnMore.label ?? "Learn more"}
              </button>
            ))}
        </span>
      )}
    </span>
  );
}
