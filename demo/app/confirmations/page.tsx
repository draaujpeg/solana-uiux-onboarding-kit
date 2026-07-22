"use client";

import { useState } from "react";
import { ArrowLeftRight, Send, ShieldOff, Trash2 } from "lucide-react";
import { AddressField } from "@kit/address-field";
import { ConfirmationDialog } from "@kit/confirmation-dialog";

// One button per template, so each can be opened and read on its own. The last
// two are both critical: one is the plain type-to-confirm, the other combines a
// consequence list with it, which the Figma source never did but the rules allow
// and this action needs.
type Which = null | "low" | "medium" | "high" | "revoke" | "disconnect";

const iconClass = "size-6";

export default function ConfirmationsPage() {
  const [open, setOpen] = useState<Which>(null);
  const [busy, setBusy] = useState(false);
  const [address, setAddress] = useState("");

  const close = () => setOpen(null);

  // Stands in for a real transaction, so the busy state can be seen.
  const confirm = () => {
    setBusy(true);
    setTimeout(() => {
      setBusy(false);
      close();
    }, 1600);
  };

  const buttons: { which: Exclude<Which, null>; label: string; note: string }[] = [
    { which: "low", label: "Send 5 SOL", note: "Low risk" },
    { which: "medium", label: "Swap 50 USDC", note: "Medium risk" },
    { which: "high", label: "Withdraw all liquidity", note: "High risk" },
    { which: "revoke", label: "Revoke app access", note: "Critical risk" },
    {
      which: "disconnect",
      label: "Disconnect account",
      note: "Critical risk, reclassified from the source",
    },
  ];

  return (
    <main className="mx-auto flex w-full max-w-[var(--so-width-wide)] flex-col gap-8 p-8">
      <header className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold">Pre-action confirmation</h1>
        <p className="text-[var(--so-text-muted)]">
          Four templates chosen by how much the action costs, not four steps.
          Escape, the close control and the backdrop all cancel. Confirm to see
          the busy state.
        </p>
      </header>

      <ul className="flex flex-col gap-3">
        {buttons.map((button) => (
          <li key={button.which}>
            <button
              type="button"
              onClick={() => setOpen(button.which)}
              className="flex w-full flex-col gap-1 rounded-[var(--so-radius-lg)] border border-[var(--so-border)] bg-[var(--so-surface)] p-4 text-left"
            >
              <span className="font-semibold">{button.label}</span>
              <span className="text-sm text-[var(--so-text-muted)]">
                {button.note}
              </span>
            </button>
          </li>
        ))}
      </ul>

      <section className="flex flex-col gap-4 rounded-[var(--so-radius-lg)] border border-[var(--so-border)] bg-[var(--so-surface)] p-6">
        <h2 className="font-semibold">Where to send?</h2>
        <AddressField
          label="Destination wallet address"
          value={address}
          onChange={setAddress}
          placeholder="Paste the address here, for example 7xKp...3mNz"
          warningHeading="Check the address carefully"
          warningBody="Transactions on Solana are irreversible. One wrong character sends to a different address, with no way to undo."
          link={{ label: "How do I copy the correct address?", onClick: () => {} }}
        />
      </section>

      <ConfirmationDialog
        open={open === "low"}
        onCancel={close}
        onConfirm={confirm}
        busy={busy}
        risk="low"
        icon={<Send className={iconClass} />}
        title="Confirm send?"
        description="You are sending 5 SOL to 7xKp...3mNz. Transactions on Solana cannot be undone."
        confirmLabel="Confirm send"
      />

      <ConfirmationDialog
        open={open === "medium"}
        onCancel={close}
        onConfirm={confirm}
        busy={busy}
        risk="medium"
        icon={<ArrowLeftRight className={iconClass} />}
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

      <ConfirmationDialog
        open={open === "high"}
        onCancel={close}
        onConfirm={confirm}
        busy={busy}
        risk="high"
        icon={<Trash2 className={iconClass} />}
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

      <ConfirmationDialog
        open={open === "revoke"}
        onCancel={close}
        onConfirm={confirm}
        busy={busy}
        risk="critical"
        icon={<ShieldOff className={iconClass} />}
        title="Revoke wallet access"
        description="You are about to remove this app's access to your wallet. Any active approval will be cancelled."
        callout={{
          heading: "This action cannot be undone",
          body: "All automatic approvals will be cancelled immediately.",
        }}
        confirmPhrase="REVOKE"
        confirmLabel="Revoke access"
      />

      <ConfirmationDialog
        open={open === "disconnect"}
        onCancel={close}
        onConfirm={confirm}
        busy={busy}
        risk="critical"
        icon={<ShieldOff className={iconClass} />}
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
    </main>
  );
}
