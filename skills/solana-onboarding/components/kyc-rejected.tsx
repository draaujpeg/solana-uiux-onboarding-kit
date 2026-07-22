"use client";

import { RotateCcw } from "lucide-react";
import { kycRejectionCauses, kycRejectionIntro } from "./kyc-rejection-causes";

/**
 * Rejection, said in a way the user can act on.
 *
 * The research found this exact screen failing hardest: "document not accepted",
 * with no indication of whether the problem was glare, an expiry date or a
 * mismatch, so the user resubmits the same files until the attempts run out.
 *
 * The answer is not to assert a reason the product usually does not have. It is
 * to name the causes that are worth checking, say plainly that any of them might
 * apply, and state how many tries are left. See kyc-rejection-causes.ts for why
 * the wording hedges, and why it is shared with the block alert.
 */

export interface KycRejectedProps {
  onContactSupport: () => void;
  onResubmit: () => void;
  /** Replace only if the provider returns specifics worth trusting. */
  intro?: string;
  causes?: string[];
  attemptsRemaining?: number;
}

export function KycRejected({
  onContactSupport,
  onResubmit,
  intro = kycRejectionIntro,
  causes = kycRejectionCauses,
  attemptsRemaining = 2,
}: KycRejectedProps) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="pr-8 text-xl font-semibold">Verification not approved</h2>
      <p className="text-sm leading-relaxed text-[var(--so-text-muted)]">
        {intro}
      </p>

      <ul className="flex flex-col gap-2 rounded-[var(--so-radius-sm)] border border-[var(--so-danger-border)] bg-[var(--so-danger-surface)] p-4 text-sm text-[var(--so-danger-text)]">
        {causes.map((cause) => (
          <li key={cause} className="flex gap-2">
            <span
              className="mt-2 size-1 shrink-0 rounded-full bg-current"
              aria-hidden
            />
            <span className="leading-relaxed">{cause}</span>
          </li>
        ))}
      </ul>

      <div className="flex gap-3 rounded-[var(--so-radius-sm)] border border-[var(--so-border)] p-4 text-sm">
        <RotateCcw
          className="mt-0.5 size-4 shrink-0 text-[var(--so-text-muted)]"
          aria-hidden
        />
        <span className="leading-relaxed text-[var(--so-text-muted)]">
          You have {attemptsRemaining} attempts left. After that, contact
          support.
        </span>
      </div>

      <div className="mt-2 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={onContactSupport}
          className="rounded-[var(--so-radius-sm)] border border-[var(--so-border)] bg-transparent px-4 py-2 text-sm font-semibold"
        >
          Talk to support
        </button>
        <button
          type="button"
          onClick={onResubmit}
          className="rounded-[var(--so-radius-sm)] bg-[var(--so-primary)] px-4 py-2 text-sm font-semibold text-[var(--so-primary-fg)]"
        >
          Resubmit documents
        </button>
      </div>
    </div>
  );
}
