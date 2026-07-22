# From an error to a component

A user arrives with a real error: a string from their logs, a screenshot, a
message their product shows today. This turns it into the right component and
the right sentence.

Read `patterns/05-actionable-errors.md` for why the family exists. This file is
the lookup.

## First, place it

Two questions, in order.

**Has something already stopped?** Then it is a block alert, `error-alert`, and
it is red. **Or is the user still typing, with time to change course?** Then it
is an inline warning, `inline-warning`, and it is amber.

That is the whole severity decision. It does not depend on how bad the error
feels, and the user gets one rule to learn: red stopped me, amber is a heads-up.

**Can the user resolve it here?** If yes, the alert carries the control that
does it. If no, it carries the route to whoever can, which is usually support.
An alert with neither is a dead end, and this component is the wrong answer for
one: fix the sentence or remove the screen.

## What the kit already carries

Six block alerts, each with the code the components display.

| Code | Means | Action offered |
|---|---|---|
| `RPC_CONNECTION_FAILED` | The network could not be reached | Try again |
| `INSUFFICIENT_FUNDS` | Balance below what the transaction needs | Add funds |
| `TRANSACTION_TIMEOUT` | Submitted, not confirmed in time | Try again, after checking history |
| `WALLET_NOT_CONNECTED` | An action needs a wallet that is not connected | Connect wallet |
| `KYC_DOCUMENT_REJECTED` | Identity verification failed | Resubmit, or contact support |
| `SLIPPAGE_TOLERANCE_EXCEEDED` | Price moved past the limit, so the swap cancelled | Raise the limit, or retry |

And two inline warnings: a slippage tolerance set above the safe band, and no
SOL to pay a fee when the transfer itself is in another token.

## Mapping a product's own errors

Most real errors are not on that list. They map onto it, because the list is
organised by what the user must do rather than by what the code says.

Common shapes, as a starting point rather than a catalogue. Confirm each against
the product, since libraries rename errors and programs define their own:

| What the product sees | Usually becomes |
|---|---|
| Wallet adapter reporting no wallet connected or none selected | `WALLET_NOT_CONNECTED` |
| The user rejecting the signature request in their wallet | Often nothing at all, see below |
| Blockhash not found, or a stale blockhash | `RPC_CONNECTION_FAILED`, retry |
| Confirmation timing out while awaiting a signature status | `TRANSACTION_TIMEOUT` |
| Simulation failing for want of lamports, or a debit with no prior credit | `INSUFFICIENT_FUNDS` |
| A swap program's slippage error | `SLIPPAGE_TOLERANCE_EXCEEDED` |
| Rate limiting or a node refusing the request | `RPC_CONNECTION_FAILED` |
| A custom program error with a number and no text | See the rule below |

**The user rejecting their own signature is not an error.** They decided not to
proceed. Showing red for a deliberate choice teaches people that the product
treats their decisions as failures. Return them to the screen they were on, and
say nothing unless something needs undoing.

**A custom program error with only a number needs a translation before it needs a
component.** "Custom program error: 0x1" tells the user nothing, and passing it
through as the title is the failure this whole pattern exists to fix. Find what
the number means in that program, write the sentence, and keep the raw value in
the code slot where support can find it.

## The code slot

It goes last, in the mono face, visually demoted. It is for a support
conversation, not for the user to decode.

Use the product's real code, not the kit's, wherever one exists. A code the user
can quote and the product cannot search is worse than none.

Where there is genuinely no code, leave it out. The prop is optional.

## What to ask

- Which errors does this product actually produce? Ask for the strings or the
  handler, and read them. Guessing from the domain produces alerts for failures
  that never happen and misses the ones that do.
- For each: can the user fix it themselves, and how?
- Is there a support channel reachable from inside the flow?
- Which errors are the most frequent? Those deserve the most attention, and
  frequency rarely matches severity.
