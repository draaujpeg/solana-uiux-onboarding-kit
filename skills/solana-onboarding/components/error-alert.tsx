"use client";

import { Loader2, X } from "lucide-react";
import type { ReactNode } from "react";
import { severitySkin } from "./severity";

/**
 * The block alert: an error that stopped something, stated in the user's words,
 * with the action that resolves it attached.
 *
 * The research behind this kit found errors that diagnose without teaching to be
 * the strongest single driver of abandonment. So the contract here is that an
 * alert names what happened, says what to do, and carries the control that does
 * it. A message with no action is a dead end and should not use this component.
 *
 * A block alert is always danger, because it appears after something stopped.
 * Amber belongs to the inline warning, which appears beside a field while there
 * is still time to act. Colour is therefore not a prop here: the user gets to
 * learn one thing, red stopped me and amber is a heads-up, and the rule cannot
 * be broken by whoever is in a hurry.
 */

export interface ErrorAlertAction {
  label: string;
  onClick: () => void;
}

export interface ErrorAlertProps {
  /**
   * A 16px icon. The caller supplies it rather than the component deriving it
   * from the code, so that the mapping from error to glyph lives in one place
   * the whole kit can read instead of being buried in here.
   */
  icon: ReactNode;
  /** What happened, in plain language. Never the machine code. */
  title: string;
  /** Why it happened and what happens next. A node, so amounts can be emphasised. */
  description: ReactNode;
  /**
   * Machine-readable code, rendered last and demoted. It exists for support
   * conversations, not for the user to decode.
   */
  code?: string;
  /** Itemised causes, used when a single sentence cannot say what to fix. */
  reasons?: string[];
  /** The action that resolves the error. */
  primaryAction?: ErrorAlertAction;
  /** An escape hatch, rendered before the primary action. */
  secondaryAction?: ErrorAlertAction;
  /** While true the primary action shows progress and both actions are inert. */
  busy?: boolean;
  /** Providing this renders the dismiss control. */
  onDismiss?: () => void;
  /** Accessible name for the dismiss control. */
  dismissLabel?: string;
  className?: string;
}

export function ErrorAlert({
  icon,
  title,
  description,
  code,
  reasons,
  primaryAction,
  secondaryAction,
  busy = false,
  onDismiss,
  dismissLabel = "Dismiss",
  className = "",
}: ErrorAlertProps) {
  const skin = severitySkin.danger;

  return (
    <div
      role="alert"
      className={`w-full max-w-[var(--so-width-alert)] rounded-[var(--so-radius-lg)] border p-5 ${skin.surface} ${skin.border} ${skin.text} ${className}`}
    >
      <div className="flex items-start gap-3">
        <span className={`mt-0.5 shrink-0 ${skin.icon}`} aria-hidden>
          {icon}
        </span>

        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <p className="font-semibold">{title}</p>
          <p className="text-sm leading-relaxed">{description}</p>

          {reasons && reasons.length > 0 && (
            <ul className="flex flex-col gap-1 text-sm">
              {reasons.map((reason) => (
                <li key={reason} className="flex gap-2">
                  {/* A plain dot, so the only cross in the component stays the
                      dismiss control and keeps meaning one thing. */}
                  <span
                    className="mt-2 size-1 shrink-0 rounded-full bg-current"
                    aria-hidden
                  />
                  <span>{reason}</span>
                </li>
              ))}
            </ul>
          )}

          {(primaryAction || secondaryAction) && (
            // Reversed so the DOM keeps secondary before primary, matching the
            // left-to-right reading order on a wide screen, while the stacked
            // layout on a narrow one puts the resolving action on top.
            <div className="mt-2 flex flex-col-reverse gap-2 sm:flex-row sm:items-center">
              {secondaryAction && (
                // Outlined, not text-only: inside a tinted panel a borderless
                // label reads as part of the message rather than as a control.
                <button
                  type="button"
                  onClick={secondaryAction.onClick}
                  disabled={busy}
                  className={`rounded-[var(--so-radius-sm)] border bg-transparent px-3 py-2 text-sm font-semibold disabled:opacity-50 ${skin.border}`}
                >
                  {secondaryAction.label}
                </button>
              )}

              {primaryAction && (
                <button
                  type="button"
                  onClick={primaryAction.onClick}
                  disabled={busy}
                  className="inline-flex items-center justify-center gap-2 rounded-[var(--so-radius-sm)] bg-[var(--so-danger)] px-3 py-2 text-sm font-semibold text-[var(--so-danger-fg)] disabled:opacity-70"
                >
                  {busy && <Loader2 className="size-4 animate-spin" aria-hidden />}
                  {primaryAction.label}
                </button>
              )}
            </div>
          )}

          {code && (
            <p className="mt-1 font-[family-name:var(--so-font-mono)] text-[11px] uppercase tracking-wider opacity-60">
              {code}
            </p>
          )}
        </div>

        {onDismiss && (
          <button
            type="button"
            onClick={onDismiss}
            aria-label={dismissLabel}
            className={`-mr-1 -mt-1 shrink-0 rounded-[var(--so-radius-sm)] p-1 ${skin.icon}`}
          >
            <X className="size-4" aria-hidden />
          </button>
        )}
      </div>
    </div>
  );
}
