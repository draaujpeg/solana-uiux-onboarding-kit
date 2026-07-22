# 03. Inline contextual help

## The gap

Help exists in almost every product, and often it is good: 24/7 chat, structured
documentation, articles for everything. The failure is location, not existence.
The help is in another tab, on another site, never on the screen and at the
instant the question appears.

The study found this in practically the whole sample, and it is what turns
several other gaps into severity 4 items rather than severity 2 ones.

What the thirteen showed:

- **Phantom**'s only severity 4: at the seed phrase reveal, the moment of maximum
  consequence, there is no tooltip, no help icon, no chat. Documentation exists,
  outside the flow, and does not resolve the decisive instant.
- **Trust Wallet** has no assistance at exactly the highest-risk steps, storing
  the phrase and configuring security.
- **Solflare** has 24/7 chat and structured docs, with no direct contextual link
  at the moment of an error or a security warning.
- **Jupiter** offers no in-context support call to action at the moment a swap
  fails.
- **DEX Screener** has no help, guidance or support of any kind.

## When it applies

At the three critical moments the study identified: the recovery phrase reveal, a
failed transaction, and a rejected verification. Then anywhere a term appears
that the user is unlikely to know, which is pattern 04.

The test is not "is this documented". It is "can they get the answer without
leaving the screen".

## The component

`glossary-tooltip` for a definition in place. For a failure that needs more than
a definition, the answer is usually the error component from pattern 05 carrying
a real action, not a help link.

## Rules

**Help at the moment, not help in general.** A link to a help centre from a
failing screen is the failure this pattern exists to fix, not the fix.

**Reachable by keyboard and by touch.** A title attribute is invisible to both.
The icon trigger opens on focus as well as hover.

**It does not replace the action.** If the user needs to do something, give them
the control. Explaining why they are stuck, without unsticking them, is still
being stuck.

## Copy to propose

Answer the question the user actually has at that moment, which is usually "what
happens if I get this wrong", not "what is the definition of this word".

Keep it to what fits without scrolling. The long version lives on the help page,
one tap away, and `help-links.ts` points there.

## What to ask

- What are the three moments in this product where a user is most likely to be
  stuck and most exposed?
- Is there existing documentation to link to, or does the kit's help page stand
  in for now?
- Is there a support channel, and can it be reached from inside the flow rather
  than from a footer?
