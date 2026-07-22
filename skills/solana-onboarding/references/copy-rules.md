# Writing the copy

The components carry structure. The words are the product's, and getting them
wrong is how a good pattern lands badly.

## Propose, then wait

Never write final copy without agreement. The loop is:

1. Read the product. What it does, who arrives, what they came for.
2. Draft the wording, and say which decisions you made and why.
3. Wait. Let the user confirm, edit or replace it.
4. Then install.

The temptation is to skip step 3 because the draft is reasonable. Do not. A
plausible guess is worse than an obvious blank, because it survives review by
looking finished, and it ships in the product's own voice claiming things nobody
checked.

Where a screen needs several decisions, present them together rather than one at
a time. Nobody wants to answer six questions in six messages.

## Voice

**Second person, present tense.** "You are sending 5 SOL." Not "the user is
sending", not "5 SOL will be sent".

**Say what happened before why.** "The price moved past your limit, so the swap
was cancelled" reads correctly. Reversed, the reader spends the first clause not
knowing what it is about.

**No arithmetic.** Do not ask someone to subtract two numbers to learn they are
short. Do not ask them to compare a balance against a fee to work out what is
missing.

**No blame.** "You entered an invalid address" and "that address is not valid"
describe the same event, and only one of them tells someone they failed.

**Match the product's register.** A trading product and a first wallet are
written differently, and the kit's default wording is a starting point, not a
house style to impose.

## Structure, and what varies

Fixed: what blocks exist, in what order, and which component carries them. That
is what the evidence supports.

Not fixed: every sentence. Translate, rewrite, shorten, change the tone.

The one thing that must survive rewriting is the **claim**. If the original says
an action cannot be undone, the rewrite says so too. Softening that to sound
friendlier is how a warning becomes decoration.

## What is not the product's to change

Two pieces of wording belong to the kit and are not editable.

**The recovery notice** on critical actions that detach a wallet, which states
that only the recovery phrase can restore access. Everywhere else the skill
proposes and the user edits; not here, because this is the sentence the whole kit
exists to make somebody read, and the actions needing it are exactly the ones
that read as harmless.

**The hedge in verification failures.** The wording says a cause *may* apply
rather than that it *did*, because the product usually does not know which check
failed. A product whose provider returns reliable specifics may say "was"
instead, with the specifics. It may not keep the confident tone without them.

If a user insists on changing either, explain why it is written that way and let
them decide. It is their product. Do not change it silently.

## Numbers, amounts and interpolation

**Keep the sentence readable without the values.** Someone who does not know what
SOL is should still understand they are missing something.

**Round for humans where precision does not matter**, and keep full precision
where it does. A fee of 0.000005 SOL is precise and meaningless; "less than a
cent" is neither, and is more useful.

**Never interpolate a raw error string into a sentence written for a user.** That
is what the code slot is for.

## Language

Components ship in English. Products ship in whatever their users read.

Translate rather than transliterate. Some terms have no local equivalent in
common use, "swap" among them, and forcing one produces a word the user has never
seen in any other product. Where the ecosystem uses the English word, keep it and
define it, which is what the glossary is for.

Watch for terms that carry legal weight in a jurisdiction, particularly around
identity verification and tax. Ask rather than translate confidently.

## What to ask

- Who arrives at this screen, and what were they trying to do?
- Is there a voice or tone guide, or existing copy to match?
- Which language ships first, and are there others?
- Is there a legal or compliance review these words have to pass? Verification
  and irreversibility wording often does.
