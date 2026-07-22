"use client";

import { Loader2 } from "lucide-react";
import { useEffect, useId, useState, type ReactNode } from "react";
import { Callout } from "./callout";
import { ModalShell } from "./modal-shell";
import { SummaryTable, type SummaryRow } from "./summary-table";
import type { Severity } from "./severity";

/**
 * The last thing a user sees before an action they cannot take back.
 *
 * Risk is not a sequence of screens, it is four templates. Classify the action
 * first, and only classify at all when the product cannot undo it: confirming
 * everything teaches people to click through, which is what makes the one dialog
 * that mattered invisible. The rule lives in design-guidelines/decisions.md.
 *
 * What risk decides is the colour of the callout, whether the confirm button is
 * destructive, and whether a typed phrase is required. What it does not decide
 * is which blocks appear. A summary table belongs to any action that moves
 * amounts, and a consequence list to any action that destroys something, at
 * whatever level. The Figma source dropped the table when it reached high risk
 * and dropped the list when it reached critical, which reads as a rule that
 * graver actions deserve less explanation. It is not one, so the blocks are
 * yours to combine.
 */

export type Risk = "low" | "medium" | "high" | "critical";

/** Risk maps to a callout colour, and to whether the confirm button is red. */
const calloutSeverity: Record<Risk, Severity> = {
  low: "neutral",
  medium: "warning",
  high: "danger",
  critical: "danger",
};

const isDestructive = (risk: Risk) => risk === "high" || risk === "critical";

export interface ConfirmationDialogProps {
  open: boolean;
  /** Cancel, close, Escape and the backdrop all land here. */
  onCancel: () => void;
  onConfirm: () => void;
  risk: Risk;
  /**
   * A 24px icon naming the action, not the risk. Send, swap, trash, shield-off:
   * the same level covers actions that look nothing alike.
   */
  icon?: ReactNode;
  /** Ask a question when a decision is being requested. */
  title: string;
  description: ReactNode;
  /** The numbers to check. Include whenever amounts are involved. */
  summary?: SummaryRow[];
  /** What will be lost. Include whenever something is destroyed. */
  consequences?: string[];
  /** The one thing the user must not miss. Its colour comes from the risk. */
  callout?: { heading?: string; body: ReactNode };
  /**
   * Typing this word unlocks the confirm button. Use the verb of the action in
   * capitals, REVOKE rather than CONFIRM: typing what will happen is the part
   * that makes the user read it. The comparison ignores case, since the friction
   * that protects is having to type the word, not the caps lock.
   */
  confirmPhrase?: string;
  confirmPhraseLabel?: (phrase: string) => ReactNode;
  confirmPhrasePlaceholder?: string;
  confirmLabel: string;
  cancelLabel?: string;
  /** While true the confirm button shows progress and both actions are inert. */
  busy?: boolean;
}

export function ConfirmationDialog({
  open,
  onCancel,
  onConfirm,
  risk,
  icon,
  title,
  description,
  summary,
  consequences,
  callout,
  confirmPhrase,
  confirmPhraseLabel,
  confirmPhrasePlaceholder = "Type here",
  confirmLabel,
  cancelLabel = "Cancel",
  busy = false,
}: ConfirmationDialogProps) {
  const [typed, setTyped] = useState("");
  const inputId = useId();

  // A phrase left over from the last time would unlock the button before the
  // user has read anything.
  useEffect(() => {
    if (!open) setTyped("");
  }, [open]);

  const unlocked =
    !confirmPhrase ||
    typed.trim().toLowerCase() === confirmPhrase.trim().toLowerCase();

  return (
    <ModalShell open={open} onClose={onCancel} label={title}>
      <div className="flex flex-col gap-4">
        {icon && (
          <span className="text-[var(--so-text)]" aria-hidden>
            {icon}
          </span>
        )}

        <div className="flex flex-col gap-2">
          <h2 className="pr-8 text-xl font-semibold">{title}</h2>
          <p className="text-sm leading-relaxed text-[var(--so-text-muted)]">
            {description}
          </p>
        </div>

        {summary && summary.length > 0 && <SummaryTable rows={summary} />}

        {consequences && consequences.length > 0 && (
          <ul className="flex flex-col gap-2 text-sm text-[var(--so-danger-text)]">
            {consequences.map((consequence) => (
              <li key={consequence} className="flex gap-2">
                <span
                  className="mt-2 size-1 shrink-0 rounded-full bg-current"
                  aria-hidden
                />
                <span className="leading-relaxed">{consequence}</span>
              </li>
            ))}
          </ul>
        )}

        {callout && (
          <Callout severity={calloutSeverity[risk]} heading={callout.heading}>
            {callout.body}
          </Callout>
        )}

        {confirmPhrase && (
          <div className="flex flex-col gap-2">
            <label htmlFor={inputId} className="text-sm">
              {confirmPhraseLabel ? (
                confirmPhraseLabel(confirmPhrase)
              ) : (
                <>
                  To confirm, type <strong>{confirmPhrase}</strong> below
                </>
              )}
            </label>
            <input
              id={inputId}
              value={typed}
              onChange={(event) => setTyped(event.target.value)}
              placeholder={confirmPhrasePlaceholder}
              autoComplete="off"
              className="rounded-[var(--so-radius-sm)] border border-[var(--so-border)] px-3 py-2 text-sm"
            />
          </div>
        )}

        {/* Reversed so the DOM keeps cancel before confirm, matching the reading
            order on a wide screen, while stacking puts the action the user came
            for on top. */}
        <div className="mt-2 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            disabled={busy}
            className="rounded-[var(--so-radius-sm)] border border-[var(--so-border)] bg-transparent px-4 py-2 text-sm font-semibold disabled:opacity-50"
          >
            {cancelLabel}
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={busy || !unlocked}
            className={`inline-flex items-center justify-center gap-2 rounded-[var(--so-radius-sm)] px-4 py-2 text-sm font-semibold disabled:bg-[var(--so-disabled-surface)] disabled:text-[var(--so-disabled-text)] ${
              isDestructive(risk)
                ? "bg-[var(--so-danger)] text-[var(--so-danger-fg)]"
                : "bg-[var(--so-primary)] text-[var(--so-primary-fg)]"
            }`}
          >
            {busy && <Loader2 className="size-4 animate-spin" aria-hidden />}
            {confirmLabel}
          </button>
        </div>
      </div>
    </ModalShell>
  );
}
