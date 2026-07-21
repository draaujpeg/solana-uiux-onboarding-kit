"use client";

import { Loader2, X } from "lucide-react";
import type { ReactNode } from "react";
import { severitySkin, type Severity } from "./severity";

/**
 * The block alert: an error that stopped something, stated in the user's words,
 * with the action that resolves it attached.
 *
 * The research behind this kit found errors that diagnose without teaching to be
 * the strongest single driver of abandonment. So the contract here is that an
 * alert names what happened, says what to do, and carries the control that does
 * it. A message with no action is a dead end and should not use this component.
 *
 * Severity is colour only. A block alert can be a warning, and an inline warning
 * elsewhere can be a danger, so nothing here is hard-coded per component.
 */

/** An error is either a failure or a caution. It is never neutral. */
export type AlertSeverity = Extract<Severity, "danger" | "warning">;

export interface ErrorAlertAction {
  label: string;
  onClick: () => void;
}

export interface ErrorAlertProps {
  severity?: AlertSeverity;
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
  severity = "danger",
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
  const skin = severitySkin[severity];

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
                  <X className="mt-1 size-3 shrink-0" aria-hidden />
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
                <button
                  type="button"
                  onClick={secondaryAction.onClick}
                  disabled={busy}
                  className="rounded-[var(--so-radius-sm)] px-3 py-2 text-sm font-semibold underline underline-offset-2 disabled:opacity-50"
                >
                  {secondaryAction.label}
                </button>
              )}

              {primaryAction && (
                <button
                  type="button"
                  onClick={primaryAction.onClick}
                  disabled={busy}
                  className={`inline-flex items-center justify-center gap-2 rounded-[var(--so-radius-sm)] px-3 py-2 text-sm font-semibold disabled:opacity-70 ${
                    severity === "danger"
                      ? "bg-[var(--so-danger)] text-[var(--so-danger-fg)]"
                      : "bg-[var(--so-warning)] text-[var(--so-warning-fg)]"
                  }`}
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
