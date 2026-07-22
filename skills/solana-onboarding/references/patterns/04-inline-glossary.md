# 04. Inline glossary

## The gap

Native crypto vocabulary presented with no translation and no explanation at the
point of use, assuming a specialist. Swap, perps, DCA, slippage, priority fee,
MEV protection, blind signing, LTV, liquidation.

The reason this is worse than it sounds: an unexplained term does not read as
something to look up. It reads as something the reader should already know, and
looking it up means admitting they do not. So they guess, or they leave.

What the thirteen showed:

- A leading aggregator exposes swap, perps, DCA, slippage, priority fee, MEV
  protection and route with no glossary or inline explanation, alongside a
  sidebar of eleven or twelve advanced products with no taglines and no
  distinction of complexity.
- A large exchange offers an unexplained choice between a simplified and an
  advanced mode, plus ambiguous tax wording such as "source of income" in its
  verification.
- A liquidity DEX failed the entire match-with-the-real-world heuristic:
  language, terms and logic do not make sense to an ordinary user.
- A lending product does the same with its own vocabulary, where collateral, LTV
  and liquidation carry direct financial consequences.
- Even the highest-scoring product in the sample leaves ecosystem particulars
  unclear for someone arriving from outside.

## When it applies

The first time a term appears in a flow. Not every time, which turns a product
into a dictionary, and not once in a footer, which is where nobody looks.

Two shapes, matching how the word appears:

- Inside a sentence: the word is underlined and opens on click, because a
  sentence is read.
- As the label of a value in a row: an information icon after the label, opening
  on hover or focus, because a row is scanned.

## The component

`glossary-tooltip`, with `trigger="underline"` or `trigger="icon"`.

## Rules

**Never explain jargon with jargon.** The kit's own network fee definition used
to mention validators, which has an entry of its own for exactly this reason.
Check every definition for a second unexplained term.

**Define, do not advise.** "The largest difference you accept between the price
shown and the final price" is a definition. "Higher is faster but you may receive
less" is guidance, and it belongs in the warning that fires when the setting is
risky, which is pattern 05.

**Progressive disclosure.** Hide advanced products and options behind a mode
rather than explaining twelve things at once. The study recommended this
specifically for the two densest interfaces it scored.

**Link onward.** Every term has a longer version on the help page, reached
through `help-links.ts`.

## Copy to propose

Take the terms from the product's own screens rather than from a list of crypto
words. `references/glossary.md` holds what the kit already defines.

Where a term has a common English pair and a local one, give both in the title:
users search for the word they saw, which is not always the word in their
language.

## What to ask

- Which words appear on the product's screens that a first-time user would not
  know? Read the screens rather than asking in the abstract.
- Does the product have a mode for advanced features, or is everything exposed
  at once?
- Where should "learn more" point: the kit's help page, or their documentation?
