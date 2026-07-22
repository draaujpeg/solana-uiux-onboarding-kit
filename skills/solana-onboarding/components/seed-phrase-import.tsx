"use client";

import { Eye, EyeOff } from "lucide-react";
import { useEffect, useId, useMemo, useState } from "react";
import { Callout } from "./callout";
import { ModalShell } from "./modal-shell";

/**
 * Bringing an existing wallet in, which is how a large share of users arrive.
 *
 * This screen is the one an attacker most wants to imitate, because a phishing
 * page that looks like it is the whole attack. So it says plainly that the
 * phrase never leaves the device and that no support agent will ever ask for it.
 * A user who reads that here has a chance of recognising its absence elsewhere.
 *
 * The field is masked by default and pasting is expected: people keep phrases in
 * password managers, and forcing twelve separate inputs pushes them towards
 * retyping from a photo. Length is checked, spelling is not: only the wallet can
 * say whether a phrase is valid, and a component that guesses would reject
 * correct phrases in languages it does not know about.
 */

export interface SeedPhraseImportFlowProps {
  open: boolean;
  onCancel: () => void;
  /** Receives the normalised words. Validation against the wordlist is yours. */
  onImport: (words: string[]) => void;
  /** Lengths the wallet accepts. Twelve and twenty four are the usual pair. */
  acceptedLengths?: number[];
  /** Set while the wallet is deriving the account, to disable the actions. */
  busy?: boolean;
  /** Shown when the wallet rejects the phrase. */
  error?: string;
}

export function SeedPhraseImportFlow({
  open,
  onCancel,
  onImport,
  acceptedLengths = [12, 24],
  busy = false,
  error,
}: SeedPhraseImportFlowProps) {
  const [raw, setRaw] = useState("");
  const [visible, setVisible] = useState(false);
  const fieldId = useId();

  useEffect(() => {
    if (!open) {
      setRaw("");
      setVisible(false);
    }
  }, [open]);

  const words = useMemo(
    () => raw.trim().toLowerCase().split(/\s+/).filter(Boolean),
    [raw],
  );

  const complete = acceptedLengths.includes(words.length);

  return (
    <ModalShell open={open} onClose={onCancel} label="Import a wallet">
      <div className="flex flex-col gap-4">
        <h2 className="pr-8 text-xl font-semibold">Import a wallet</h2>
        <p className="text-sm leading-relaxed text-[var(--so-text-muted)]">
          Enter the recovery phrase of the wallet you already have. Separate the
          words with spaces, in the order you wrote them down.
        </p>

        <Callout severity="warning" heading="Only ever type this here">
          Your phrase stays on this device and is never sent anywhere. No support
          agent, from this app or any other, will ever ask you for it. Anyone who
          does is stealing from you.
        </Callout>

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <label htmlFor={fieldId} className="text-sm font-semibold">
              Recovery phrase
            </label>
            <button
              type="button"
              onClick={() => setVisible((previous) => !previous)}
              className="inline-flex items-center gap-2 text-sm text-[var(--so-text-muted)]"
            >
              {visible ? (
                <EyeOff className="size-4" aria-hidden />
              ) : (
                <Eye className="size-4" aria-hidden />
              )}
              {visible ? "Hide" : "Show"}
            </button>
          </div>

          <textarea
            id={fieldId}
            value={raw}
            onChange={(event) => setRaw(event.target.value)}
            rows={3}
            autoComplete="off"
            spellCheck={false}
            aria-invalid={Boolean(error)}
            aria-describedby={`${fieldId}-status`}
            className={`resize-none rounded-[var(--so-radius-sm)] border px-3 py-2 text-sm ${
              visible ? "" : "[-webkit-text-security:disc]"
            } ${error ? "border-[var(--so-danger-border)]" : "border-[var(--so-border)]"}`}
          />

          <p
            id={`${fieldId}-status`}
            className={`text-sm ${error ? "text-[var(--so-danger-text)]" : "text-[var(--so-text-muted)]"}`}
          >
            {error
              ? error
              : `${words.length} of ${acceptedLengths.join(" or ")} words`}
          </p>
        </div>

        <div className="mt-2 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            disabled={busy}
            className="rounded-[var(--so-radius-sm)] border border-[var(--so-border)] bg-transparent px-4 py-2 text-sm font-semibold disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => onImport(words)}
            disabled={!complete || busy}
            className="rounded-[var(--so-radius-sm)] bg-[var(--so-primary)] px-4 py-2 text-sm font-semibold text-[var(--so-primary-fg)] disabled:bg-[var(--so-disabled-surface)] disabled:text-[var(--so-disabled-text)]"
          >
            Import wallet
          </button>
        </div>
      </div>
    </ModalShell>
  );
}
