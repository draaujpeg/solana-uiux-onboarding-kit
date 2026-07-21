"use client";

import { useState } from "react";
import { Ban, DollarSign, FileX, TrendingDown, Unplug, WifiOff } from "lucide-react";
import { ErrorAlert } from "@kit/error-alert";

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
        description={
          <>
            You have <strong>12.4 USDC</strong>, but this transaction needs{" "}
            <strong>50 USDC</strong> plus the network fee. Add funds and try
            again.
          </>
        }
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
        description="To continue, connect your Solana wallet. Your keys stay on your device, this app has no access to them."
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
    </main>
  );
}
