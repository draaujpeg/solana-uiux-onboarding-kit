"use client";

import { useState } from "react";
import { KycFlow, type KycStage } from "@kit/kyc-flow";

// Each entry opens the flow at a different point, since a returning user does
// not start at the beginning: they come back to a review that is still running,
// or to a rejection waiting for them.
const entries: { stage: KycStage; label: string; note: string }[] = [
  {
    stage: "requirements",
    label: "Start verification",
    note: "Shown before the gate, so the requirement is not a surprise",
  },
  {
    stage: "upload",
    label: "Upload a document",
    note: "Try a file over 10 MB, or a .txt, to see the refusal",
  },
  {
    stage: "review",
    label: "Under review",
    note: "The waiting state, which says how long and how you will be told",
  },
  {
    stage: "rejected",
    label: "Rejected",
    note: "Every defect paired with the fix, and the attempts left",
  },
];

export default function KycPage() {
  const [stage, setStage] = useState<KycStage | null>(null);
  const [outcome, setOutcome] = useState<string | null>(null);

  const finish = (message: string) => {
    setOutcome(message);
    setStage(null);
  };

  return (
    <main className="mx-auto flex w-full max-w-[var(--so-width-wide)] flex-col gap-6 p-8">
      <header className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold">Gate anticipation</h1>
        <p className="text-[var(--so-text-muted)]">
          Identity verification announced before it blocks anything, and a
          rejection that says what to do next. Choosing a file and then closing
          asks first.
        </p>
      </header>

      <ul className="flex flex-col gap-3">
        {entries.map((entry) => (
          <li key={entry.stage}>
            <button
              type="button"
              onClick={() => {
                setOutcome(null);
                setStage(entry.stage);
              }}
              className="flex w-full flex-col gap-1 rounded-[var(--so-radius-lg)] border border-[var(--so-border)] bg-[var(--so-surface)] p-4 text-left"
            >
              <span className="font-semibold">{entry.label}</span>
              <span className="text-sm text-[var(--so-text-muted)]">
                {entry.note}
              </span>
            </button>
          </li>
        ))}
      </ul>

      {outcome && (
        <p className="text-sm text-[var(--so-text-muted)]">{outcome}</p>
      )}

      {stage && (
        <KycFlow
          open
          initialStage={stage}
          onClose={() => finish("Closed the flow.")}
          onDefer={() => finish("Deferred, the gate is known about now.")}
          // Stands in for the upload request, so the busy state can be seen.
          onSubmit={() =>
            new Promise((resolve) => setTimeout(resolve, 1600))
          }
          onContactSupport={() => finish("Handed off to support.")}
          // Whatever screen the product uses for verification status.
          onTrackProgress={() => finish("Sent to the verification status page.")}
        />
      )}
    </main>
  );
}
