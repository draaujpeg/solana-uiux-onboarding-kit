"use client";

import { useEffect, useState } from "react";
import { KycRejected } from "./kyc-rejected";
import { KycRequirements } from "./kyc-requirements";
import { KycReview } from "./kyc-review";
import { KycUpload } from "./kyc-upload";
import { ModalShell } from "./modal-shell";
import { StepDots } from "./step-dots";

/**
 * Identity verification, from the warning that it is coming to the rejection
 * that explains itself.
 *
 * Rejection is a branch, not a fifth step. The Figma source left the fourth dot
 * lit on the rejection screen, which tells the user they have finished when they
 * have not, so the stage is passed explicitly rather than inferred from how far
 * along the flow got.
 *
 * Leaving with a file chosen but not sent asks first, since that work is lost.
 * Leaving while a review is running does not: the review continues, the email
 * arrives, and nothing depends on the dialog staying open.
 */

export type KycStage = "requirements" | "upload" | "review" | "rejected";

export interface KycFlowProps {
  open: boolean;
  /** Start elsewhere to show a returning user their current state. */
  initialStage?: KycStage;
  onClose: () => void;
  /** The user chose to deal with verification later. */
  onDefer: () => void;
  /** Send the document. Resolve to move to the review stage. */
  onSubmit: (file: File, documentType: string) => Promise<void> | void;
  onContactSupport: () => void;
}

export function KycFlow({
  open,
  initialStage = "requirements",
  onClose,
  onDefer,
  onSubmit,
  onContactSupport,
}: KycFlowProps) {
  const [stage, setStage] = useState<KycStage>(initialStage);
  const [busy, setBusy] = useState(false);
  const [hasUnsentFile, setHasUnsentFile] = useState(false);
  const [confirmingExit, setConfirmingExit] = useState(false);

  useEffect(() => {
    if (!open) {
      setStage(initialStage);
      setBusy(false);
      setHasUnsentFile(false);
      setConfirmingExit(false);
    }
  }, [open, initialStage]);

  const requestClose = () => {
    if (stage === "upload" && hasUnsentFile) setConfirmingExit(true);
    else onClose();
  };

  const submit = async (file: File, documentType: string) => {
    setBusy(true);
    try {
      await onSubmit(file, documentType);
      setHasUnsentFile(false);
      setStage("review");
    } finally {
      setBusy(false);
    }
  };

  // The dots count the path to a decision. Rejection is a branch off the review,
  // so it keeps the review's position rather than lighting a further step.
  const stepOf: Record<KycStage, number> = {
    requirements: 1,
    upload: 2,
    review: 3,
    rejected: 3,
  };

  return (
    <ModalShell
      open={open}
      onClose={requestClose}
      width="wide"
      label="Identity verification"
    >
      {confirmingExit ? (
        <div className="flex flex-col gap-4">
          <h2 className="pr-8 text-xl font-semibold">Leave without sending?</h2>
          <p className="text-sm leading-relaxed text-[var(--so-text-muted)]">
            The document you chose has not been sent yet. If you leave now you
            will need to pick it again.
          </p>
          <div className="mt-2 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => setConfirmingExit(false)}
              className="rounded-[var(--so-radius-sm)] border border-[var(--so-border)] bg-transparent px-4 py-2 text-sm font-semibold"
            >
              Keep going
            </button>
            <button
              type="button"
              onClick={onClose}
              className="rounded-[var(--so-radius-sm)] bg-[var(--so-primary)] px-4 py-2 text-sm font-semibold text-[var(--so-primary-fg)]"
            >
              Leave
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <StepDots current={stepOf[stage]} total={3} className="mb-2" />

          {stage === "requirements" && (
            <KycRequirements
              onDefer={onDefer}
              onStart={() => setStage("upload")}
            />
          )}

          {stage === "upload" && (
            <KycUpload
              busy={busy}
              onBack={() => setStage("requirements")}
              onFileChange={(file) => setHasUnsentFile(Boolean(file))}
              onSubmit={submit}
            />
          )}

          {stage === "review" && <KycReview onClose={onClose} />}

          {stage === "rejected" && (
            <KycRejected
              onContactSupport={onContactSupport}
              onResubmit={() => setStage("upload")}
            />
          )}
        </div>
      )}
    </ModalShell>
  );
}
