"use client";

import { useState } from "react";
import { WelcomeDialog } from "@kit/welcome-dialog";

// Two configurations of one component. The wording below is a proposal, which is
// how it reaches a real product too: the skill drafts it from what the product
// does and the team edits before anything ships.
export default function WelcomePage() {
  const [open, setOpen] = useState<null | "wallet" | "app">(null);

  return (
    <main className="mx-auto flex w-full max-w-[var(--so-width-wide)] flex-col gap-6 p-8">
      <header className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold">Post-onboarding welcome</h1>
        <p className="text-[var(--so-text-muted)]">
          A greeting and three next steps, so setup does not end by dropping the
          user into an empty screen. The shape is fixed, the words are not.
        </p>
      </header>

      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={() => setOpen("wallet")}
          className="rounded-[var(--so-radius-sm)] bg-[var(--so-primary)] px-4 py-2 text-sm font-semibold text-[var(--so-primary-fg)]"
        >
          A new wallet
        </button>
        <button
          type="button"
          onClick={() => setOpen("app")}
          className="rounded-[var(--so-radius-sm)] border border-[var(--so-border)] bg-transparent px-4 py-2 text-sm font-semibold"
        >
          A first visit to an app
        </button>
      </div>

      <WelcomeDialog
        open={open === "wallet"}
        onClose={() => setOpen(null)}
        // The product's own art goes here. A placeholder stands in for it.
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
        secondaryAction={{ label: "Close", onClick: () => setOpen(null) }}
        primaryAction={{ label: "How to add funds", onClick: () => setOpen(null) }}
      />

      <WelcomeDialog
        open={open === "app"}
        onClose={() => setOpen(null)}
        brand={{
          logo: (
            <div className="flex size-16 items-center justify-center rounded-[var(--so-radius-sm)] bg-[var(--so-surface-muted)] text-xs text-[var(--so-text-muted)]">
              Logo
            </div>
          ),
          // The product's own name. The greeting around it is the component's,
          // so this is the only place the substitution happens.
          name: "[name]",
          category: "Decentralised exchange, Solana",
        }}
        title="Swap without an account"
        description="Connect a wallet to trade. Nothing is held for you, and there is nothing to sign up for."
        appDescription="Swap tokens and provide liquidity directly on Solana, with no intermediary."
        steps={[
          {
            title: "Connect your wallet",
            description: "Phantom, Solflare or any compatible Solana wallet.",
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
        secondaryAction={{ label: "Learn more", onClick: () => setOpen(null) }}
        primaryAction={{ label: "Connect wallet", onClick: () => setOpen(null) }}
      />
    </main>
  );
}
