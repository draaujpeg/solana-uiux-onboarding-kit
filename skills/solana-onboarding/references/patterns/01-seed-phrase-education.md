# 01. Seed phrase education

## The gap

The most transversal failure in the study, and the one that costs the most when
it lands. The recovery phrase is presented as a central concept at the moment of
maximum consequence, with no analogy, no context, and no bridge to the custodial
experience the user is arriving from. They are told "if you lose this, nobody can
recover it" without that sentence being translated into anything they already
understand.

What the thirteen showed:

- One of the most technically polished wallets in the sample carries its **only**
  severity 4 here. At the moment the phrase is displayed, a user with a question
  is completely alone: no tooltip, no help icon, no chat. Documentation exists,
  outside the flow, and does not help at the deciding instant.
- Another widely used wallet has **two** severity 4 items, both here. Losing the
  phrase means permanent, irreversible loss of funds, with no assisted recovery
  and no recognition mechanism to replace it.
- A third wallet does not show the phrase at account creation **at all**,
  breaking the convention the user expects and leaving them unclear on how they
  would ever recover access.
- A hardware wallet demands 24 words, the heaviest memorisation load in the
  sample, with nothing to ease it.

What the field audit added, from a product that does this better than the study's
thirteen and, on this screen, better than the kit's first version: the analogy
can be stated outright rather than gestured at, the theft attempt can be named
before it happens, and the control that reveals the phrase can be made to wait.
The rules below now carry all three.

## When it applies

Whenever a product creates a self-custodial wallet, and whenever it imports one.

Not on the social login path: there is no phrase to teach. See
`custody-paths.md` before proposing anything here, because proposing seed
education on that path produces a screen about nothing.

## The components

`seed-phrase-flow` for creation: the custody fork, the stakes, the reveal, the
check. `seed-phrase-import` for a wallet the user already has.

## Rules

**Show the phrase.** Omitting it is worse than revealing it clumsily. A user who
never saw it does not know they need it.

**Explain before revealing, not after.** The screen before the phrase is where
the analogy goes, while the user can still act on it. Afterwards it is
decoration.

**State the analogy, do not gesture at it.** Name something the user already
owns, a bank login is the one that lands, and then name the single way this
differs from it: no password to change, no one to call. An instruction to keep
something safe is advice. A comparison to a thing they already protect is a
model they can reason with, and it is the difference between a screen that warns
and a screen that teaches.

**Name the theft, not the category.** "Never share your phrase" is forgotten by
the time it matters. What survives is being told in advance the exact shape the
attempt will take: someone claiming to be support, an administrator, or staff,
in a hurry, on whichever app they find the user. Inoculation works on specifics.
Say the product's own name in that sentence, because that is the name the thief
will use.

**The reveal control waits, and says why it is waiting.** A checkbox can be
ticked in half a second by someone who read nothing, so it proves intent but not
attention. A few seconds before the control opens keeps the screen in front of
the user long enough to be read, and stops the reflex press. It has to announce
itself: a disabled control that explains nothing reads as a broken product, and
the kit's own rule is that no action is ever disabled without saying why.

Do not stack this with more ceremony elsewhere. The wait is affordable here
precisely because it happens once, on a screen the user reaches only when a
phrase is about to be created.

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

The impersonation line is the one piece of copy on this screen to insist on
keeping. Products soften it, because naming your own support team as the thing
to distrust reads as an admission. It is the opposite: it is the sentence that
still works months later, in a conversation the product will never see.

Adapt all of it to the product. The structure is fixed, the wording is theirs.

## What to ask

- Does the product create wallets, import them, or both? Offering only creation
  turns away everyone who already has a wallet.
- Is there a social login path too? If so, this pattern does not apply to it.
- How many words does the wallet generate?
- Is there anywhere the user can review the phrase later, and does reaching it
  require the phrase itself?
