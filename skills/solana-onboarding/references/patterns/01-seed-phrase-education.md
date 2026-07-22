# 01. Seed phrase education

## The gap

The most transversal failure in the study, and the one that costs the most when
it lands. The recovery phrase is presented as a central concept at the moment of
maximum consequence, with no analogy, no context, and no bridge to the custodial
experience the user is arriving from. They are told "if you lose this, nobody can
recover it" without that sentence being translated into anything they already
understand.

What the thirteen showed:

- **Phantom** carries its single severity 4 here. At the moment the phrase is
  displayed, a user with a question is completely alone: no tooltip, no help
  icon, no chat. The documentation exists, outside the flow, and does not help
  at the deciding instant.
- **Trust Wallet** has two severity 4 items, both here. Losing the phrase means
  permanent, irreversible loss of funds, with no assisted recovery and no
  recognition mechanism to replace it.
- **Solflare** does not show the phrase at account creation at all, breaking the
  convention the user expects and leaving them unclear on how they would ever
  recover access.
- **Ledger** demands 24 words with the heaviest memorisation load in the sample.

## When it applies

Whenever a product creates a self-custodial wallet, and whenever it imports one.

Not on the social login path: there is no phrase to teach. See
`custody-paths.md` before proposing anything here, because proposing seed
education on that path produces a screen about nothing.

## The components

`seed-phrase-flow` for creation: the custody fork, the stakes, the reveal, the
check. `seed-phrase-import` for a wallet the user already has.

## Rules

**Show the phrase.** Solflare's omission is worse than a clumsy reveal. A user
who never saw it does not know they need it.

**Explain before revealing, not after.** The screen before the phrase is where
the analogy goes, while the user can still act on it. Afterwards it is
decoration.

**The phrase arrives hidden and reveals on a deliberate press.** Asking someone
to check that nobody is watching and then showing the words the instant they
dismiss that screen makes the request theatre.

**Never a copy control.** Any process on the machine reads the clipboard, and
copying encourages exactly the digital storage the previous screen warned
against. Its absence is a decision. Say so if asked to add one.

**Check that it was written down, and gate on the check.** Without it the
product showed some words and hoped. The user finds out whether they copied them
correctly on the day they need them, which is the worst possible day.

**Assume no word count.** Twelve is common, twenty four is normal. Nothing in
the copy should name a number that the wallet might contradict.

## Copy to propose

Lead the custody fork with what self-custody is worth, not with what it costs.
"Words only you know, lose them and you lose access, no exceptions" is true and
frightens people away from the option that gives them the most control. State
the guarantee first and the responsibility second.

The three rules before the reveal are concrete actions, not warnings: nobody
looking at the screen, no photographs, written on paper in order.

Adapt all of it to the product. The structure is fixed, the wording is theirs.

## What to ask

- Does the product create wallets, import them, or both? Offering only creation
  turns away everyone who already has a wallet.
- Is there a social login path too? If so, this pattern does not apply to it.
- How many words does the wallet generate?
- Is there anywhere the user can review the phrase later, and does reaching it
  require the phrase itself?
