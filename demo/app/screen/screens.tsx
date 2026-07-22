"use client";

import type { ReactNode } from "react";
import {
  AlertTriangle,
  ArrowLeftRight,
  Ban,
  DollarSign,
  FileX,
  Send,
  ShieldOff,
  Trash2,
  TrendingDown,
  Unplug,
} from "lucide-react";
import { AddressField } from "@kit/address-field";
import { ChoiceCards } from "@kit/choice-cards";
import { ConfirmationDialog } from "@kit/confirmation-dialog";
import { ErrorAlert } from "@kit/error-alert";
import { GlossaryTooltip } from "@kit/glossary-tooltip";
import { InlineWarning } from "@kit/inline-warning";
import { KycRejected } from "@kit/kyc-rejected";
import { KycRequirements } from "@kit/kyc-requirements";
import { KycReview } from "@kit/kyc-review";
import { KycUpload } from "@kit/kyc-upload";
import { SeedPhraseConfirm } from "@kit/seed-phrase-confirm";
import { SeedPhraseImportFlow } from "@kit/seed-phrase-import";
import { SeedPhraseReveal } from "@kit/seed-phrase-reveal";
import { SeedPhraseWarning } from "@kit/seed-phrase-warning";
import { WelcomeDialog } from "@kit/welcome-dialog";
import { kycRejectionCauses, kycRejectionIntro } from "@kit/kyc-rejection-causes";

// One registry, read by the single-screen route and by the board. Every screen
// here is the real component with real props, not a picture of one, so the
// board cannot drift from what the kit installs.

const noop = () => {};
const icon = "size-4";
const bigIcon = "size-6";

const words = [
  "apple", "river", "stone", "mirror", "candle", "forest",
  "eagle", "pocket", "silver", "bridge", "cloud", "window",
];

/** Wraps the pieces that are not dialogs, so they sit on a page like one. */
function Sheet({ children, wide }: { children: ReactNode; wide?: boolean }) {
  return (
    <div
      className={`mx-auto w-full rounded-[var(--so-radius-lg)] border border-[var(--so-border)] bg-[var(--so-surface)] p-6 ${
        wide ? "max-w-[var(--so-width-wide)]" : "max-w-[var(--so-width-compact)]"
      }`}
    >
      {children}
    </div>
  );
}

export interface Screen {
  id: string;
  group: string;
  label: string;
  node: ReactNode;
}

export const screens: Screen[] = [
  // Actionable errors
  {
    id: "error-network",
    group: "Actionable errors",
    label: "Network",
    node: (
      <ErrorAlert
        icon={<Unplug className={icon} />}
        title="No network connection"
        description="We could not process your transaction right now. This is usually temporary, try again in a few seconds."
        code="RPC_CONNECTION_FAILED"
        primaryAction={{ label: "Try again", onClick: noop }}
        onDismiss={noop}
      />
    ),
  },
  {
    id: "error-balance",
    group: "Actionable errors",
    label: "Insufficient balance",
    node: (
      <ErrorAlert
        icon={<DollarSign className={icon} />}
        title="Insufficient balance"
        description="You do not have enough balance for this transaction. Add funds and try again."
        code="INSUFFICIENT_FUNDS"
        primaryAction={{ label: "Add funds", onClick: noop }}
        onDismiss={noop}
      />
    ),
  },
  {
    id: "error-timeout",
    group: "Actionable errors",
    label: "Not confirmed",
    node: (
      <ErrorAlert
        icon={<Ban className={icon} />}
        title="Transaction not confirmed"
        description="Your transaction was submitted but was not confirmed in time. Check your history before retrying, to avoid duplicates."
        code="TRANSACTION_TIMEOUT"
        primaryAction={{ label: "Try again", onClick: noop }}
        onDismiss={noop}
      />
    ),
  },
  {
    id: "error-wallet",
    group: "Actionable errors",
    label: "Wallet not connected",
    node: (
      <ErrorAlert
        icon={<Unplug className={icon} />}
        title="Wallet not connected"
        description="To continue, connect your Solana wallet."
        code="WALLET_NOT_CONNECTED"
        primaryAction={{ label: "Connect wallet", onClick: noop }}
        onDismiss={noop}
      />
    ),
  },
  {
    id: "error-kyc",
    group: "Actionable errors",
    label: "Verification failed",
    node: (
      <ErrorAlert
        icon={<FileX className={icon} />}
        title="Verification not completed"
        description={kycRejectionIntro}
        reasons={kycRejectionCauses}
        code="KYC_DOCUMENT_REJECTED"
        secondaryAction={{ label: "Contact support", onClick: noop }}
        primaryAction={{ label: "Resubmit documents", onClick: noop }}
        onDismiss={noop}
      />
    ),
  },
  {
    id: "error-slippage",
    group: "Actionable errors",
    label: "Slippage exceeded",
    node: (
      <ErrorAlert
        icon={<TrendingDown className={icon} />}
        title="Price moved during the swap"
        description="The price moved beyond the limit you set (0.5%). Your transaction was cancelled automatically, to protect you."
        code="SLIPPAGE_TOLERANCE_EXCEEDED"
        secondaryAction={{ label: "Increase limit", onClick: noop }}
        primaryAction={{ label: "Try again", onClick: noop }}
        onDismiss={noop}
      />
    ),
  },
  {
    id: "warning-slippage",
    group: "Actionable errors",
    label: "High slippage, inline",
    node: (
      <Sheet>
        <InlineWarning
          icon={<AlertTriangle className={icon} />}
          title="High slippage"
          description="The price can move either way while your swap is processed. If it moves in your favour you receive more, and this setting is what caps the other direction: at 5%, you accept receiving up to 5% less than shown."
          link={{ label: "Why does this happen?", href: "#" }}
        />
      </Sheet>
    ),
  },
  {
    id: "warning-gas",
    group: "Actionable errors",
    label: "No SOL for the fee, inline",
    node: (
      <Sheet>
        <InlineWarning
          icon={<DollarSign className={icon} />}
          title="Not enough SOL for the fee"
          description="You have 0 SOL. You need at least 0.000005 SOL to pay the network fee, even though the transfer is in USDC."
          link={{ label: "How do I get SOL?", href: "#" }}
        />
      </Sheet>
    ),
  },

  // Pre-action confirmation
  {
    id: "confirm-low",
    group: "Pre-action confirmation",
    label: "Low risk",
    node: (
      <ConfirmationDialog
        open
        onCancel={noop}
        onConfirm={noop}
        risk="low"
        icon={<Send className={bigIcon} />}
        title="Confirm send?"
        description="You are sending 5 SOL to 7xKp...3mNz. Transactions on Solana cannot be undone."
        confirmLabel="Confirm send"
      />
    ),
  },
  {
    id: "confirm-medium",
    group: "Pre-action confirmation",
    label: "Medium risk",
    node: (
      <ConfirmationDialog
        open
        onCancel={noop}
        onConfirm={noop}
        risk="medium"
        icon={<ArrowLeftRight className={bigIcon} />}
        title="Review and confirm swap"
        description="Check the details before confirming. This action cannot be undone."
        summary={[
          { label: "You send", value: "50 USDC" },
          { label: "You receive", value: "0.351 SOL" },
          { label: "Network fee", value: "0.000005 SOL" },
          { label: "Max slippage", value: "0.5%" },
        ]}
        callout={{
          body: "The final amount may vary by up to 0.5%, depending on the price at the moment of confirmation.",
        }}
        confirmLabel="Confirm swap"
      />
    ),
  },
  {
    id: "confirm-high",
    group: "Pre-action confirmation",
    label: "High risk",
    node: (
      <ConfirmationDialog
        open
        onCancel={noop}
        onConfirm={noop}
        risk="high"
        icon={<Trash2 className={bigIcon} />}
        title="Withdraw all liquidity?"
        description="This closes your position in the pool. Before continuing, understand what happens:"
        summary={[
          { label: "You withdraw", value: "1,240 USDC and 8.2 SOL" },
          { label: "Fees earned", value: "12.40 USDC" },
        ]}
        consequences={[
          "The position stops earning fees immediately.",
          "Re-entering the pool later happens at the price of that moment, not this one.",
          "Any pending rewards are claimed in the same transaction.",
        ]}
        callout={{
          heading: "This action cannot be undone",
          body: "Withdrawing is a new transaction, so re-entering costs the network fee again.",
        }}
        confirmLabel="Withdraw everything"
      />
    ),
  },
  {
    id: "confirm-critical",
    group: "Pre-action confirmation",
    label: "Critical risk",
    node: (
      <ConfirmationDialog
        open
        onCancel={noop}
        onConfirm={noop}
        risk="critical"
        icon={<ShieldOff className={bigIcon} />}
        title="Revoke wallet access"
        description="You are about to remove this app's access to your wallet. Any active approval will be cancelled."
        callout={{
          heading: "This action cannot be undone",
          body: "All automatic approvals will be cancelled immediately.",
        }}
        confirmPhrase="REVOKE"
        confirmLabel="Revoke access"
      />
    ),
  },
  {
    id: "confirm-critical-full",
    group: "Pre-action confirmation",
    label: "Critical, with consequences and recovery notice",
    node: (
      <ConfirmationDialog
        open
        onCancel={noop}
        onConfirm={noop}
        risk="critical"
        icon={<ShieldOff className={bigIcon} />}
        title="Disconnect this account?"
        description="This removes the account from this app. It looks reversible, and for most people it is not."
        consequences={[
          "Reconnecting requires your recovery phrase.",
          "If you never wrote the phrase down, the account cannot be recovered by anyone.",
          "Your tokens stay on the network, but you will need the phrase to reach them.",
        ]}
        seedRecoveryNotice
        confirmPhrase="DISCONNECT"
        confirmLabel="Disconnect account"
      />
    ),
  },
  {
    id: "address-field",
    group: "Pre-action confirmation",
    label: "Destination address warning",
    node: (
      <Sheet wide>
        <h2 className="mb-4 font-semibold">Where to send?</h2>
        <AddressField
          label="Destination wallet address"
          value=""
          onChange={noop}
          placeholder="Paste the address here, for example 7xKp...3mNz"
          warningHeading="Check the address carefully"
          warningBody="Transactions on Solana are irreversible. One wrong character sends to a different address, with no way to undo."
          link={{ label: "How do I copy the correct address?", href: "#" }}
        />
      </Sheet>
    ),
  },

  // Seed phrase
  {
    id: "seed-choice",
    group: "Seed phrase",
    label: "Custody choice",
    node: (
      <Sheet>
        <h2 className="mb-2 text-xl font-semibold">
          How do you want to protect your wallet?
        </h2>
        <p className="mb-4 text-sm leading-relaxed text-[var(--so-text-muted)]">
          Choose how access to your account is stored. You can change this later
          in settings.
        </p>
        <ChoiceCards
          choices={[
            {
              id: "phrase",
              title: "Use a recovery phrase",
              explain: {
                title: "Recovery phrase",
                definition:
                  "A list of ordinary words, generated once, that rebuilds your wallet on any device.",
              },
              description:
                "Maximum security. The wallet answers only to your words, so no one can open it, freeze it or hand it to anyone else, us included.",
              actionLabel: "Set up a recovery phrase",
            },
          ]}
          onSelect={noop}
        />
      </Sheet>
    ),
  },
  {
    id: "seed-warning",
    group: "Seed phrase",
    label: "Before the reveal",
    node: (
      <Sheet>
        <SeedPhraseWarning onBack={noop} onReveal={noop} />
      </Sheet>
    ),
  },
  {
    id: "seed-reveal",
    group: "Seed phrase",
    label: "The phrase, blurred",
    node: (
      <Sheet>
        <SeedPhraseReveal words={words} onBack={noop} onContinue={noop} />
      </Sheet>
    ),
  },
  {
    id: "seed-confirm",
    group: "Seed phrase",
    label: "Confirming the words",
    node: (
      <Sheet>
        <SeedPhraseConfirm
          words={words}
          challenges={[1, 5, 7, 10]}
          onBack={noop}
          onConfirm={noop}
        />
      </Sheet>
    ),
  },
  {
    id: "seed-import",
    group: "Seed phrase",
    label: "Importing a wallet",
    node: <SeedPhraseImportFlow open onCancel={noop} onImport={noop} />,
  },

  // KYC
  {
    id: "kyc-requirements",
    group: "Gate anticipation",
    label: "What you will need",
    node: (
      <Sheet wide>
        <KycRequirements onDefer={noop} onStart={noop} />
      </Sheet>
    ),
  },
  {
    id: "kyc-upload",
    group: "Gate anticipation",
    label: "Upload",
    node: (
      <Sheet wide>
        <KycUpload onBack={noop} onSubmit={noop} />
      </Sheet>
    ),
  },
  {
    id: "kyc-review",
    group: "Gate anticipation",
    label: "Under review",
    node: (
      <Sheet wide>
        <KycReview onClose={noop} onTrack={noop} />
      </Sheet>
    ),
  },
  {
    id: "kyc-rejected",
    group: "Gate anticipation",
    label: "Not approved",
    node: (
      <Sheet wide>
        <KycRejected onContactSupport={noop} onResubmit={noop} />
      </Sheet>
    ),
  },

  // Glossary
  {
    id: "glossary-sentence",
    group: "Inline help",
    label: "Term in a sentence",
    node: (
      <Sheet wide>
        <h2 className="mb-3 font-semibold">Review your transfer</h2>
        <p className="text-sm leading-relaxed">
          You will pay an estimated{" "}
          <GlossaryTooltip
            term="network fee"
            title="Network fee, also called gas"
            definition="A small amount paid to the validators that process your transaction. On Solana it is usually a fraction of a cent."
            learnMore={{ href: "#" }}
            placement="bottom"
          />{" "}
          of <strong>0.000005 SOL</strong>.
        </p>
      </Sheet>
    ),
  },
  {
    id: "glossary-row",
    group: "Inline help",
    label: "Term in a value row",
    node: (
      <Sheet wide>
        <h2 className="mb-3 font-semibold">Swap details</h2>
        <dl className="flex flex-col gap-3 text-sm">
          <div className="flex items-center justify-between gap-4">
            <dt className="text-[var(--so-text-muted)]">
              <GlossaryTooltip
                trigger="icon"
                placement="bottom"
                term="Slippage"
                title="Slippage, the variation you accept"
                definition="The largest difference you will accept between the price shown and the final price."
                learnMore={{ href: "#" }}
              />
            </dt>
            <dd className="font-semibold">0.5%</dd>
          </div>
        </dl>
      </Sheet>
    ),
  },

  // Welcome
  {
    id: "welcome-wallet",
    group: "Post-onboarding welcome",
    label: "A new wallet",
    node: (
      <WelcomeDialog
        open
        onClose={noop}
        banner={
          <div className="flex h-32 items-center justify-center bg-[var(--so-surface-muted)] text-sm text-[var(--so-text-muted)]">
            Your banner art
          </div>
        }
        title="Your wallet is ready"
        description="This is where you hold and move your tokens on Solana. To get started, you need to add funds."
        steps={[
          {
            title: "Add funds",
            description:
              "Transfer SOL or another token from an exchange to this wallet's address.",
          },
          {
            title: "Explore apps",
            description:
              "With a balance you can use DeFi protocols, buy NFTs and more.",
          },
          {
            title: "Store your recovery phrase",
            description:
              "If you have not written it down yet, do it now. Without it there is no way back in.",
          },
        ]}
        secondaryAction={{ label: "Close", onClick: noop }}
        primaryAction={{ label: "How to add funds", onClick: noop }}
      />
    ),
  },
  {
    id: "welcome-app",
    group: "Post-onboarding welcome",
    label: "A first visit to an app",
    node: (
      <WelcomeDialog
        open
        onClose={noop}
        brand={{
          logo: (
            <div className="flex size-16 items-center justify-center rounded-[var(--so-radius-sm)] bg-[var(--so-surface-muted)] text-xs text-[var(--so-text-muted)]">
              Logo
            </div>
          ),
          name: "[name]",
          category: "Decentralised exchange, Solana",
        }}
        title="Swap without an account"
        description="Connect a wallet to trade. Nothing is held for you, and there is nothing to sign up for."
        appDescription="Swap tokens and provide liquidity directly on Solana, with no intermediary."
        steps={[
          {
            title: "Connect your wallet",
            description: "Any Solana wallet the product supports.",
          },
          {
            title: "Choose the tokens",
            description: "Pick what you want to swap, and how much.",
          },
          {
            title: "Confirm in your wallet",
            description:
              "The transaction appears for you to approve before it is sent.",
          },
        ]}
        secondaryAction={{ label: "Learn more", onClick: noop }}
        primaryAction={{ label: "Connect wallet", onClick: noop }}
      />
    ),
  },
];

export const groups = [...new Set(screens.map((screen) => screen.group))];
