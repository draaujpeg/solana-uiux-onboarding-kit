"use client";

import type { ReactNode } from "react";
import { severitySkin } from "./severity";

/**
 * The inline warning: a caution that sits beside the field it is about, while
 * the user can still change their mind.
 *
 * It is not a smaller block alert. Nothing has failed here, so there is no error
 * code to quote to support, no action button to press, and nothing to dismiss:
 * the warning stays as long as the input that caused it does. All it offers is a
 * link, for the user who wants to understand before deciding.
 *
 * Always amber, because it appears while there is still time. Red belongs to the
 * block alert, which appears after something stopped.
 */

export interface InlineWarningLink {
  label: string;
  href?: string;
  onClick?: () => void;
}

export interface InlineWarningProps {
  /** A 16px icon, supplied by the caller. */
  icon: ReactNode;
  /** The condition, in plain language. */
  title: string;
  /** What it means for the user, in their own numbers where possible. */
  description: ReactNode;
  /** Optional explanation the user can open without leaving the form. */
  link?: InlineWarningLink;
  className?: string;
}

export function InlineWarning({
  icon,
  title,
  description,
  link,
  className = "",
}: InlineWarningProps) {
  const skin = severitySkin.warning;

  return (
    <div
      // Polite, not assertive: this appears while the user is still typing, and
      // interrupting a screen reader mid-field is worse than waiting for a pause.
      aria-live="polite"
      className={`flex w-full gap-3 rounded-[var(--so-radius-sm)] border p-4 ${skin.surface} ${skin.border} ${skin.text} ${className}`}
    >
      <span className={`mt-0.5 shrink-0 ${skin.icon}`} aria-hidden>
        {icon}
      </span>

      <div className="flex min-w-0 flex-col gap-1">
        <p className="font-semibold">{title}</p>
        <p className="text-sm leading-relaxed">{description}</p>

        {link &&
          (link.href ? (
            <a
              href={link.href}
              className="mt-1 self-start text-sm underline underline-offset-2"
            >
              {link.label}
            </a>
          ) : (
            <button
              type="button"
              onClick={link.onClick}
              className="mt-1 self-start text-sm underline underline-offset-2"
            >
              {link.label}
            </button>
          ))}
      </div>
    </div>
  );
}
