# 05. Actionable errors

## The gap

Errors that diagnose without teaching. The message names a symptom and stops:
"swap failed", "document not accepted", a disabled button with no reason. The
study called this the strongest single driver of permanent abandonment, and it is
the largest family in the kit for that reason.

What the thirteen showed:

- **OKX** rejects verification documents with "document not accepted", without
  saying whether the problem was glare, an expiry date or a mismatch. Users
  resubmit the same files indefinitely, with automated support that does not
  resolve it. Worse for Brazilian users, whose documents create friction in a
  system calibrated elsewhere.
- **Jupiter** returns technical, non-actionable messages, "some routes failed to
  load", "swap failed", with no in-context support at the moment of failure.
- **Exodus**, one of the best in the sample, disables its continue button on a
  weak password without saying why or how to fix it. The user recovers only
  "after thinking about it for a while".
- **Trust Wallet** and **Ledger** both signal failures without guiding the
  correction, which the study scored as distrust rather than friction.

## When it applies

Every failure the user can see. The test is whether the screen contains the
action that resolves it, not whether the sentence is well written.

Two components, chosen by when the message appears rather than by how bad it is:

- **After something stopped**: `error-alert`, always red.
- **Beside a field, while there is still time**: `inline-warning`, always amber.

That placement rule is what lets a user learn one thing: red means it stopped,
amber means there is still time. Severity is not a judgement call.

## The component

`error-alert` and `inline-warning`. `references/error-codes.md` maps a real error
from the product to the right one.

## Rules

**Say what happened, then what to do, then give the control that does it.** An
alert with no action is a dead end, and this component is the wrong choice for
one.

**No arithmetic.** "You have 12.4 USDC but this needs 50 plus the fee" asks the
reader to subtract in order to learn they are short. Say they are short.

**The machine-readable code goes last and demoted**, in the mono face. It exists
for a support conversation, not for the user to decode.

**Do not answer questions nobody asked.** A wallet-not-connected alert
reassuring the user about key custody is answering a question that has not come
up yet, in the middle of a task.

**Never assert a cause you cannot know.** Verification failures are the case:
see `components/kyc-rejection-causes.ts`.

**An inline warning has no dismiss.** The condition that caused it is still true.
Hiding it hides information the user needs.

## Copy to propose

The title is a plain-language symptom, never the code. The body explains the
cause and what happens next, in the second person.

Where the product interpolates real values, keep the sentence readable without
them: a user reading "you need 0.000005 SOL" should not need to know what SOL is
to understand they are missing something.

## What to ask

- What errors does this product actually produce? Ask for the strings or the
  codes rather than guessing from the domain.
- Which of them can the user resolve, and how? An error with no route out needs a
  support path, not a retry button.
- Is there a support channel reachable from inside the flow?
