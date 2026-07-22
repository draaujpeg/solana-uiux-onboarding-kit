"use client";

import { KeyRound } from "lucide-react";
import { useEffect, useState } from "react";
import { GoogleMark, ProviderSignInButton } from "./brand-marks";
import { ChoiceCards, type Choice } from "./choice-cards";
import { helpUrl } from "./help-links";
import { ModalShell } from "./modal-shell";
import { SeedPhraseConfirm } from "./seed-phrase-confirm";
import { SeedPhraseReveal } from "./seed-phrase-reveal";
import { SeedPhraseWarning } from "./seed-phrase-warning";
import { StepDots } from "./step-dots";

/**
 * The custody flow: choose how the wallet is secured, understand what a recovery
 * phrase costs, see it, and prove it was written down.
 *
 * The choice screen sits outside the numbered steps, because it is a fork rather
 * than progress: picking the social option ends the flow here. It ends because
 * an embedded wallet provider owns everything after that press, and there is no
 * phrase to write down. See references/custody-paths.md, which also covers
 * importing an existing wallet, the third way in.
 *
 * Leaving is where this flow differs from a confirmation. Once the phrase has
 * been shown, closing means the wallet exists and nobody has its backup, so the
 * exit asks first and says what that costs. The dialog shell deliberately knows
 * nothing about this, since only the flow knows what the user would lose.
 */

export type CustodyChoice = "social" | "phrase";

const choices: Choice[] = [
  {
    id: "phrase",
    icon: <KeyRound className="size-5" />,
    title: "Use a recovery phrase",
    explain: {
      title: "Recovery phrase",
      definition:
        "A list of ordinary words, generated once, that rebuilds your wallet on any device. It is the wallet, which is why it is written on paper and never typed into anything you did not open yourself.",
      href: helpUrl("recoveryPhrase"),
    },
    description:
      "Maximum security. The wallet answers only to your words, so no one can open it, freeze it or hand it to anyone else, us included. Keep them safe and it is yours alone.",
    actionLabel: "Set up a recovery phrase",
  },
];

type Stage = "choice" | "warning" | "reveal" | "confirm";

export interface SeedPhraseFlowProps {
  open: boolean;
  /** The phrase to back up. Any length: nothing here assumes twelve. */
  words: string[];
  /** One-based positions to ask for. Randomise these per attempt. */
  challenges: number[];
  /** The user picked the social option, so there is no phrase to back up. */
  onChooseSocial: () => void;
  /** The phrase was shown and confirmed. */
  onComplete: () => void;
  /** The user left. Anything already generated is the caller's to discard. */
  onAbandon: () => void;
}

export function SeedPhraseFlow({
  open,
  words,
  challenges,
  onChooseSocial,
  onComplete,
  onAbandon,
}: SeedPhraseFlowProps) {
  const [stage, setStage] = useState<Stage>("choice");
  const [confirmingExit, setConfirmingExit] = useState(false);

  useEffect(() => {
    if (!open) {
      setStage("choice");
      setConfirmingExit(false);
    }
  }, [open]);

  // Before the phrase exists on screen, leaving costs nothing.
  const exitIsCostly = stage === "reveal" || stage === "confirm";

  const requestClose = () => {
    if (exitIsCostly) setConfirmingExit(true);
    else onAbandon();
  };

  const stepOf: Record<Stage, number> = {
    choice: 0,
    warning: 1,
    reveal: 2,
    confirm: 3,
  };

  return (
    <ModalShell
      open={open}
      onClose={requestClose}
      label="Secure your wallet"
    >
      {confirmingExit ? (
        <div className="flex flex-col gap-4">
          <h2 className="pr-8 text-xl font-semibold">Leave without finishing?</h2>
          <p className="text-sm leading-relaxed text-[var(--so-text-muted)]">
            Your recovery phrase has not been confirmed yet. If you leave now,
            this phrase is discarded and you will start again from a new one.
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
              onClick={onAbandon}
              className="rounded-[var(--so-radius-sm)] bg-[var(--so-danger)] px-4 py-2 text-sm font-semibold text-[var(--so-danger-fg)]"
            >
              Leave and discard
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {stage !== "choice" && (
            <StepDots current={stepOf[stage]} total={3} className="mb-2" />
          )}

          {stage === "choice" && (
            <>
              <h2 className="pr-8 text-xl font-semibold">
                How do you want to protect your wallet?
              </h2>
              <p className="text-sm leading-relaxed text-[var(--so-text-muted)]">
                Choose how access to your account is stored. You can change this
                later in settings.
              </p>
              {/* The provider's own button, unrestyled. People recognise it
                  before they read it, and that recognition is the security
                  signal, so making it match the product costs more than it
                  gains. */}
              <ProviderSignInButton
                mark={<GoogleMark />}
                label="Continue with Google"
                onClick={onChooseSocial}
              />

              <div className="flex items-center gap-3 text-sm text-[var(--so-text-muted)]">
                <span className="h-px flex-1 bg-[var(--so-border)]" />
                Or
                <span className="h-px flex-1 bg-[var(--so-border)]" />
              </div>

              <ChoiceCards
                choices={choices}
                onSelect={() => setStage("warning")}
              />
            </>
          )}

          {stage === "warning" && (
            <SeedPhraseWarning
              onBack={() => setStage("choice")}
              onReveal={() => setStage("reveal")}
            />
          )}

          {stage === "reveal" && (
            <SeedPhraseReveal
              words={words}
              onBack={() => setStage("warning")}
              onContinue={() => setStage("confirm")}
            />
          )}

          {stage === "confirm" && (
            <SeedPhraseConfirm
              words={words}
              challenges={challenges}
              onBack={() => setStage("reveal")}
              onConfirm={onComplete}
            />
          )}
        </div>
      )}
    </ModalShell>
  );
}
