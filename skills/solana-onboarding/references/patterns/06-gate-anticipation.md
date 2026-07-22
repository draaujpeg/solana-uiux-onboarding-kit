# 06. Gate anticipation

## The gap

A requirement that arrives as a surprise, after the user has invested time. They
proceed, reach the thing they came to do, and are stopped by a condition nobody
mentioned. The cost is not the requirement, it is the sequence.

What the thirteen showed:

- An exchange with a built-in wallet makes verification a total block: without
  it, no trading feature is available at all. The study scored the surprise, not
  the requirement, because it breaks the expectation set at the start of the
  flow.
- A hardware wallet hides the sharpest example. Interacting with Solana dApps
  needs blind signing enabled manually on the device, a step that is not
  documented in the main interface and that **silently blocks transactions
  without explaining why**. The user is stuck with no idea what is wrong.
- A large exchange gates features by region and by verification level,
  discoverable only on reaching them, which the study recorded as the most
  unexpected behaviour in the sample.

Blind signing is worth dwelling on: it is one point that combines jargon,
missing contextual help and a silent block. Three of the kit's patterns fail at
once, which is why an audit should look for gates specifically rather than
hoping they surface.

## When it applies

Any condition that stands between the user and something they can already see:
identity verification, a region restriction, a minimum balance, a device setting,
an account level, an approval that must be granted first.

The rule is that the gate is announced **before** the investment of time, not at
the moment of collision.

## The component

`kyc-flow` for identity verification, whose first screen is this pattern: what
will be needed, why, and an honest way to defer.

For gates that are not verification, the shape is the same and the component is
usually a `callout` or a `confirmation-dialog` at low risk, placed at the point
where the user commits rather than where they collide.

## Rules

**Announce before, not on arrival.** A gate the user can see coming is a
decision. The same gate at the moment of collision is a lost session.

**"Not now" is a real option.** Removing it does not make anybody verify faster,
it makes them leave without knowing they can come back.

**List what is physically needed.** A document, a camera, decent light. Someone
who starts an upload without their ID in reach abandons it.

**Say how long it takes and how they will be told.** A wait with no stated end is
where users resubmit to provoke an answer, which is how a queue fills with
duplicates.

**Give them somewhere to watch it.** A review outlasts the session that started
it.

**A silent block is the worst version of this.** If a setting must be enabled
elsewhere, detect the failure and explain the steps. Do not let the transaction
fail with a generic message.

## Copy to propose

Say why the requirement exists. "Required by law" is short, true, and defuses
most of the resentment, which is otherwise aimed at the product.

State what happens to the data. The user is about to photograph their ID for a
company they met ten minutes ago.

## What to ask

- What gates exist in this product, including the ones that are not verification?
- At what moment does the user currently discover each one?
- Which provider runs the verification, and does it return usable reasons for a
  rejection? See `custody-paths.md`.
- How long does review take, and how is the user notified?
- Is there a screen where they can check the status later?
