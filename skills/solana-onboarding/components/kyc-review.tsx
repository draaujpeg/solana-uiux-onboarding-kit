"use client";

import { Clock, Loader2 } from "lucide-react";

/**
 * The wait after submitting.
 *
 * A holding screen earns its place by answering the two questions a waiting user
 * actually has: how long, and how will I be told. Without those it is a spinner,
 * and a spinner makes people sit and watch a screen that will not change, or
 * resubmit because they assume it failed.
 *
 * It closes, unlike its counterpart in the Figma source, which had no button, no
 * close control and no way out at all.
 */

export interface KycReviewStep {
  label: string;
  description: string;
  status: "done" | "pending";
}

const defaultSteps: KycReviewStep[] = [
  {
    label: "Documents received",
    description: "Both sides of your ID uploaded successfully.",
    status: "done",
  },
  {
    label: "Selfie received",
    description: "Photo accepted for matching.",
    status: "done",
  },
  {
    label: "Verification in progress",
    description: "Waiting on our team's confirmation.",
    status: "pending",
  },
];

export interface KycReviewProps {
  onClose: () => void;
  steps?: KycReviewStep[];
  eta?: string;
}

export function KycReview({
  onClose,
  steps = defaultSteps,
  eta = "Estimated time: up to 24 hours",
}: KycReviewProps) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="pr-8 text-xl font-semibold">Verifying your details</h2>
      <p className="text-sm leading-relaxed text-[var(--so-text-muted)]">
        You have done your part. We will take it from here.
      </p>

      <div className="flex flex-col items-center gap-2 rounded-[var(--so-radius-sm)] border border-[var(--so-border)] p-6 text-center">
        <Loader2
          className="size-6 animate-spin text-[var(--so-text-muted)]"
          aria-hidden
        />
        <p className="font-semibold">Review in progress</p>
        <p className="text-sm leading-relaxed text-[var(--so-text-muted)]">
          We are reviewing the documents you sent. You will get an email as soon
          as we are done.
        </p>
        <p className="mt-2 inline-flex items-center gap-2 text-sm text-[var(--so-text-muted)]">
          <Clock className="size-4" aria-hidden />
          {eta}
        </p>
      </div>

      <ol className="flex flex-col gap-4">
        {steps.map((step) => (
          <li key={step.label} className="flex gap-3">
            <span className="mt-1.5 flex shrink-0 flex-col items-center">
              <span
                className={`size-2 rounded-full ${
                  step.status === "done"
                    ? "bg-[var(--so-success)]"
                    : "bg-[var(--so-disabled-surface)]"
                }`}
                aria-hidden
              />
            </span>
            <span className="flex flex-col gap-1">
              <span className="text-sm font-semibold">
                {step.label}
                <span className="sr-only">
                  {step.status === "done" ? ", done" : ", pending"}
                </span>
              </span>
              <span className="text-sm leading-relaxed text-[var(--so-text-muted)]">
                {step.description}
              </span>
            </span>
          </li>
        ))}
      </ol>

      <div className="mt-2 flex justify-end">
        <button
          type="button"
          onClick={onClose}
          className="rounded-[var(--so-radius-sm)] border border-[var(--so-border)] bg-transparent px-4 py-2 text-sm font-semibold"
        >
          Close
        </button>
      </div>
    </div>
  );
}
