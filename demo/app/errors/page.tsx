"use client";

import { useState } from "react";
import {
  AlertTriangle,
  Ban,
  DollarSign,
  FileX,
  TrendingDown,
  Unplug,
  WifiOff,
} from "lucide-react";
import { ErrorAlert } from "@kit/error-alert";
import { InlineWarning } from "@kit/inline-warning";

// The six block alerts of the actionable-error family, with the icons settled in
// design-guidelines/decisions.md. The Figma source pasted one chain-link glyph
// across the wallet, KYC and slippage alerts; only the wallet one was even close.
const iconClass = "size-4";

export default function ErrorsPage() {
  const [busy, setBusy] = useState(false);

  // Stands in for a real retry, so the loading state can be seen.
  const retry = () => {
    setBusy(true);
    setTimeout(() => setBusy(false), 1600);
  };

  return (
    <main className="mx-auto flex w-full max-w-[var(--so-width-wide)] flex-col gap-8 p-8">
      <header className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold">Actionable errors</h1>
        <p className="text-[var(--so-text-muted)]">
          Every alert names what happened, says what to do, and carries the
          control that does it. Press a primary action to see the busy state.
        </p>
      </header>

      <ErrorAlert
        icon={<WifiOff className={iconClass} />}
        title="No network connection"
        description="We could not process your transaction right now. This is usually temporary, try again in a few seconds."
        code="RPC_CONNECTION_FAILED"
        primaryAction={{ label: "Try again", onClick: retry }}
        busy={busy}
        onDismiss={() => {}}
      />

      <ErrorAlert
        icon={<DollarSign className={iconClass} />}
        title="Insufficient balance"
        description="You do not have enough balance for this transaction. Add funds and try again."
        code="INSUFFICIENT_FUNDS"
        primaryAction={{ label: "Add funds", onClick: () => {} }}
        onDismiss={() => {}}
      />

      <ErrorAlert
        icon={<Ban className={iconClass} />}
        title="Transaction not confirmed"
        description="Your transaction was submitted but was not confirmed in time. Check your history before retrying, to avoid duplicates."
        code="TRANSACTION_TIMEOUT"
        primaryAction={{ label: "Try again", onClick: () => {} }}
        onDismiss={() => {}}
      />

      <ErrorAlert
        icon={<Unplug className={iconClass} />}
        title="Wallet not connected"
        description="To continue, connect your Solana wallet."
        code="WALLET_NOT_CONNECTED"
        primaryAction={{ label: "Connect wallet", onClick: () => {} }}
        onDismiss={() => {}}
      />

      <ErrorAlert
        icon={<FileX className={iconClass} />}
        title="Verification not completed"
        description="We found a problem with the documents you submitted. Here is what needs fixing:"
        reasons={[
          "Document photo is low quality or cropped.",
          "Selfie does not match the document photo.",
        ]}
        code="KYC_DOCUMENT_REJECTED"
        secondaryAction={{ label: "Contact support", onClick: () => {} }}
        primaryAction={{ label: "Resubmit documents", onClick: () => {} }}
        onDismiss={() => {}}
      />

      <ErrorAlert
        icon={<TrendingDown className={iconClass} />}
        title="Price moved during the swap"
        description="The price moved beyond the limit you set (0.5%). Your transaction was cancelled automatically, to protect you."
        code="SLIPPAGE_TOLERANCE_EXCEEDED"
        secondaryAction={{ label: "Increase limit", onClick: () => {} }}
        primaryAction={{ label: "Try again", onClick: () => {} }}
        onDismiss={() => {}}
      />

      <header className="mt-6 flex flex-col gap-2">
        <h2 className="text-xl font-semibold">Inline warnings</h2>
        <p className="text-[var(--so-text-muted)]">
          These sit beside the field they are about, while the user can still
          change their mind. Amber, no code, no buttons, nothing to dismiss. The
          cards around them are demo scaffolding, not part of the kit.
        </p>
      </header>

      <section className="flex flex-col gap-4 rounded-[var(--so-radius-lg)] border border-[var(--so-border)] bg-[var(--so-surface)] p-6">
        <h3 className="font-semibold">Configure swap</h3>
        <label className="flex flex-col gap-2 text-sm">
          <span className="text-[var(--so-text-muted)]">
            Slippage tolerance
          </span>
          <span className="flex items-center gap-2 rounded-[var(--so-radius-sm)] border border-[var(--so-border)] px-3 py-2">
            <input
              defaultValue="5"
              inputMode="decimal"
              className="w-full bg-transparent outline-none"
            />
            <span className="text-[var(--so-text-muted)]">%</span>
          </span>
        </label>
        <InlineWarning
          icon={<AlertTriangle className={iconClass} />}
          title="High slippage"
          description="The price can move either way while your swap is processed. If it moves in your favour you receive more, and this setting is what caps the other direction: at 5%, you accept receiving up to 5% less than shown. We recommend between 0.1% and 1% for most swaps."
          link={{ label: "Why does this happen?", onClick: () => {} }}
        />
      </section>

      <section className="flex flex-col gap-4 rounded-[var(--so-radius-lg)] border border-[var(--so-border)] bg-[var(--so-surface)] p-6">
        <h3 className="font-semibold">Send tokens</h3>
        <dl className="flex flex-col gap-2 text-sm">
          <div className="flex justify-between">
            <dt className="text-[var(--so-text-muted)]">Amount</dt>
            <dd className="font-semibold">50 USDC</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-[var(--so-text-muted)]">Network fee</dt>
            <dd className="font-semibold">0.000005 SOL</dd>
          </div>
        </dl>
        <InlineWarning
          icon={<DollarSign className={iconClass} />}
          title="Not enough SOL for the fee"
          description="You have 0 SOL. You need at least 0.000005 SOL to pay the network fee, even though the transfer is in USDC."
          link={{ label: "How do I get SOL?", onClick: () => {} }}
        />
      </section>
    </main>
  );
}
