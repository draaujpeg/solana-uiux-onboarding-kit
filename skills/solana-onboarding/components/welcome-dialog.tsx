"use client";

import type { ReactNode } from "react";
import { ModalShell } from "./modal-shell";

/**
 * The screen that catches the user when onboarding ends.
 *
 * The research found flows stopping dead: setup completes and the user is left
 * in an empty wallet or a dense interface with no tour, no checklist and no idea
 * what to do next. Onboarding delivered them and then abandoned them.
 *
 * What is fixed here is the shape, a greeting and three next steps, and it is
 * three because a list long enough to feel like homework gets skipped. What is
 * not fixed is the wording: the steps depend entirely on what the product does,
 * so the skill proposes them and the user edits before anything ships.
 *
 * The same component covers a wallet, where a banner sits at the top, and a
 * third-party app, where a logo and a category line introduce a product the user
 * may never have heard of. It matters most for someone who arrived through a
 * social login, since that path explains the least and leaves them holding a
 * wallet nobody described.
 */

export interface WelcomeStep {
  title: string;
  description: string;
}

export interface WelcomeAction {
  label: string;
  onClick: () => void;
}

export interface WelcomeDialogProps {
  open: boolean;
  onClose: () => void;
  /** Full width art at the top. The product's own, not the kit's. */
  banner?: ReactNode;
  /** Identifies an app the user may be seeing for the first time. */
  brand?: { logo: ReactNode; name: string; category?: string };
  title: string;
  description: string;
  /** One line on what the product does. Skip it when the user knows already. */
  appDescription?: string;
  /** Three, in the order they should be done. */
  steps: WelcomeStep[];
  primaryAction: WelcomeAction;
  secondaryAction?: WelcomeAction;
}

export function WelcomeDialog({
  open,
  onClose,
  banner,
  brand,
  title,
  description,
  appDescription,
  steps,
  primaryAction,
  secondaryAction,
}: WelcomeDialogProps) {
  return (
    <ModalShell open={open} onClose={onClose} width="wide" label={title}>
      <div className="flex flex-col gap-6">
        {banner && (
          <div className="overflow-hidden rounded-[var(--so-radius-sm)]">
            {banner}
          </div>
        )}

        {brand && (
          <div className="flex items-center gap-4">
            <div className="shrink-0">{brand.logo}</div>
            <div className="flex flex-col">
              <span className="font-semibold">{brand.name}</span>
              {brand.category && (
                <span className="text-sm text-[var(--so-text-muted)]">
                  {brand.category}
                </span>
              )}
            </div>
          </div>
        )}

        <div className="flex flex-col gap-2">
          <h2 className="pr-8 text-xl font-semibold">{title}</h2>
          <p className="text-sm leading-relaxed text-[var(--so-text-muted)]">
            {description}
          </p>
          {appDescription && (
            <p className="text-sm leading-relaxed text-[var(--so-text-muted)]">
              {appDescription}
            </p>
          )}
        </div>

        <hr className="border-[var(--so-border)]" />

        <ol className="flex flex-col gap-4">
          {steps.map((step, index) => (
            <li key={step.title} className="flex gap-4">
              <span
                className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[var(--so-primary)] text-sm font-semibold text-[var(--so-primary-fg)]"
                aria-hidden
              >
                {index + 1}
              </span>
              <span className="flex flex-col gap-1">
                <span className="font-semibold">{step.title}</span>
                <span className="text-sm leading-relaxed text-[var(--so-text-muted)]">
                  {step.description}
                </span>
              </span>
            </li>
          ))}
        </ol>

        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          {secondaryAction && (
            <button
              type="button"
              onClick={secondaryAction.onClick}
              className="rounded-[var(--so-radius-sm)] border border-[var(--so-border)] bg-transparent px-4 py-2 text-sm font-semibold"
            >
              {secondaryAction.label}
            </button>
          )}
          <button
            type="button"
            onClick={primaryAction.onClick}
            className="rounded-[var(--so-radius-sm)] bg-[var(--so-primary)] px-4 py-2 text-sm font-semibold text-[var(--so-primary-fg)]"
          >
            {primaryAction.label}
          </button>
        </div>
      </div>
    </ModalShell>
  );
}
