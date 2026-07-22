# 07. Pre-action confirmation

## The gap

Irreversible actions confirmed with the same ceremony as reversible ones, or with
no ceremony at all. On Solana nothing is undone: no chargeback, no reversal, no
support queue. The check before the button is the only check there is.

What the thirteen showed:

- A leading aggregator has no review screen of its own. It hands the
  confirmation straight to the wallet, without highlighting harmful slippage,
  without warning about risky tokens, and without ever explaining
  irreversibility.
- A liquidity DEX failed the entire error-prevention heuristic: no prevention,
  no validation, no warning before actions with no way back, in a product where
  every action moves money.
- A major wallet has no prominent, plain-language warning that blockchain
  actions are irreversible.
- A lending product exposes collateral and liquidation with no protection layer
  at all.
- On the other side, the two products that score zero on this heuristic are both
  in the sample's top three overall. The correlation is not a coincidence.

## When it applies

Only for actions the product cannot undo, or can only undo at real cost. Run
`references/risk-classification.md`, which decides whether a dialog is needed at
all and, if so, which of the four templates.

That first question matters as much as the rest. Confirming everything trains
people to click through, and a user trained to click through is a user who will
click through the one dialog that mattered. A confirmation is not a free way to
look careful; it spends the attention the next warning needs.

## The component

`confirmation-dialog`, plus `address-field` for the destination warning, which is
prevention rather than confirmation and costs nothing.

## Rules

**Risk chooses the template. Content chooses the blocks.** A summary table
belongs to any action with amounts. A consequence list belongs to any action that
destroys something. They combine freely, at any level.

**The destructive button is red at high and critical.** A body coloured red above
a neutral button leaves the signal off the control the user actually presses.

**Critical actions are typed out**, using the verb of the action in capitals
rather than a generic word. Typing what will happen is the part that makes them
read it. The component requires the phrase, so this cannot be skipped.

**Anything only the recovery phrase can undo is critical**, however harmless it
looks. Disconnecting an account is the case: "just reconnect" is true only for
whoever wrote the phrase down.

**Warn at the address field, not after.** A mistyped Solana address is usually
still a valid address. The transaction succeeds and the money is gone, so a
confirmation afterwards is too late to help.

## Copy to propose

The title asks a question when a decision is being requested and states a fact
when the screen informs.

The description says what is about to happen in the user's own numbers, then
that it cannot be undone. Not the reverse: irreversibility means nothing until
they know what is becoming irreversible.

Consequences are specific and complete. "Your history will no longer be
accessible here" is a consequence. "This is permanent" is a label.

## What to ask

- Which actions in this product cannot be undone? Ask for the list rather than
  inferring it from function names.
- For each: can the product itself reverse it, can the user redo it, or does it
  need the recovery phrase?
- Does anything today confirm these, and at what strength?
- Are there amounts worth showing, and consequences worth listing?
