# Risk classification

How to decide which confirmation an action gets, or whether it gets one at all.
Load this before proposing a `ConfirmationDialog`, and before judging one that
already exists.

Work through the steps in order and stop at the first answer.

## Step 0. Does it need a confirmation?

**Can the product undo it on its own, without the user asking anyone for help?**

If yes, ship no dialog. Changing a setting, opening a screen, connecting an app
that can be disconnected again: none of these get one.

This step matters more than the ones after it. Confirming everything teaches
people to click through, and a user trained to click through is a user who will
click through the one dialog that mattered. Adding a confirmation is not a free
way to look careful, it spends the attention the next warning needs.

## Step 1. Look it up

Most actions in a Solana product are already known. If the action matches a row,
take the level and skip to step 3.

| Level | Actions |
|---|---|
| **Critical** | Revoke access or an approval · grant an unlimited token approval · export, view or back up the seed phrase · transfer authority over an account · disconnect or remove an account from the app · delete a wallet · change custody |
| **High** | Withdraw all liquidity · close a position · unstake with a penalty · burn a token · remove a saved address · close a token account |
| **Medium** | Swap · send to an address not used before · add liquidity · stake · bridge to another chain · borrow or repay · lend · mint at a cost |
| **Low** | Send to an address already used · claim a reward · approve one ordinary transaction · sign a message with no financial effect |

The catalogue is a shortcut, not the rule. When a product's action only looks
like a row, treat it as unknown and use step 2.

## Step 2. Ask, in this order

Four questions. The first **yes** decides.

1. **Would undoing it require the recovery phrase? Or does it touch a key, a
   permission, or custody itself?** → **critical**
2. **Does it remove or destroy something the user holds, in a way they would have
   to rebuild?** → **high**
3. **Can the result differ from what the screen shows, because of price, timing,
   or a third party?** → **medium**
4. Otherwise → **low**

Question 1 is the one that gets missed. Some of the actions it catches read as
harmless, disconnecting an account most of all, and the damage only appears for
the person who never wrote their phrase down. When in doubt on question 1, answer
yes: the cost of over-protecting a single action is one extra typed word, and the
cost of under-protecting it is everything the user holds.

## Step 3. Choose the blocks

The level decides the callout colour, whether the confirm button is destructive,
and whether a phrase must be typed. It does **not** decide which blocks appear.
Those come from what the action does:

| Include | When |
|---|---|
| `summary` | Amounts are involved and there is more than one number worth checking |
| `consequences` | Something is lost, ends, or stops working |
| `callout` | There is one sentence the user must not miss |
| `confirmPhrase` | The level is critical. Required by the component, not optional |
| `seedRecoveryNotice` | The action detaches a wallet or account: removing, disconnecting, deleting |

Blocks combine freely. An action can carry a summary, a consequence list and a
typed phrase at once. The Figma source never drew that combination, because each
of its screens illustrated one device, which is not the same as a rule.

For `confirmPhrase`, use the verb of the action in capitals, `REVOKE` or
`DISCONNECT`, never a generic `CONFIRM`. Typing what will happen is the part that
makes the user read it. The comparison ignores case.

`seedRecoveryNotice` renders wording the kit owns and does not let the product
change. Everywhere else the skill proposes copy and the user edits it; here it
does not, because this is the sentence the whole kit exists to make somebody
read.

## Reading it backwards, in audit mode

The same table finds what is missing. Look for irreversible actions in the
codebase and check what guards them. Two failures, in order of how often they
appear:

1. **A confirmation one level too low.** Far more common than a missing one, and
   much harder to see, since the screen looks like somebody thought about it. A
   plain "are you sure?" in front of something only the recovery phrase can undo
   is the case to hunt for.
2. **No confirmation at all** in front of an irreversible action.

Where to look: wallet-adapter calls, instruction and method names, route names,
and the labels on buttons. Those are candidates, not conclusions. Confirm the
list with the developer before reporting, because a name says what a function is
called, not what it does.
