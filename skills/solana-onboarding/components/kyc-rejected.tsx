"use client";

import { Camera, ImageOff, RotateCcw } from "lucide-react";
import type { ComponentType } from "react";

/**
 * Rejection, said in a way the user can act on.
 *
 * The research found this exact screen failing hardest: "document not accepted",
 * with no indication of whether the problem was glare, an expiry date or a
 * mismatch, so the user resubmits the same files until the attempts run out.
 * Every item here pairs the defect with the fix, and the remaining attempts are
 * stated rather than discovered.
 */

export interface KycRejection {
  icon?: ComponentType<{ className?: string }>;
  /** What was wrong. */
  title: string;
  /** What to do differently. Without this the item is just a complaint. */
  remedy: string;
}

const defaultRejections: KycRejection[] = [
  {
    icon: ImageOff,
    title: "Document photo is low quality",
    remedy:
      "The image is blurry or cropped. Take the photo on a flat surface, in good light, with no glare.",
  },
  {
    icon: Camera,
    title: "Selfie does not match the document",
    remedy:
      "Make sure your face is visible, with no sunglasses or cap, looking at the camera.",
  },
];

export interface KycRejectedProps {
  onContactSupport: () => void;
  onResubmit: () => void;
  rejections?: KycRejection[];
  attemptsRemaining?: number;
}

export function KycRejected({
  onContactSupport,
  onResubmit,
  rejections = defaultRejections,
  attemptsRemaining = 2,
}: KycRejectedProps) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="pr-8 text-xl font-semibold">Verification not approved</h2>
      <p className="text-sm leading-relaxed text-[var(--so-text-muted)]">
        We found problems with the documents you sent. Here is what needs fixing:
      </p>

      <ul className="flex flex-col gap-3">
        {rejections.map((rejection) => (
          <li
            key={rejection.title}
            className="flex gap-3 rounded-[var(--so-radius-sm)] border border-[var(--so-danger-border)] bg-[var(--so-danger-surface)] p-4 text-[var(--so-danger-text)]"
          >
            {rejection.icon && (
              <rejection.icon className="mt-0.5 size-4 shrink-0" />
            )}
            <span className="flex flex-col gap-1">
              <span className="text-sm font-semibold">{rejection.title}</span>
              <span className="text-sm leading-relaxed">{rejection.remedy}</span>
            </span>
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
