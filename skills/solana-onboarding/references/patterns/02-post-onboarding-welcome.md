# 02. Post-onboarding welcome

## The gap

The flow ends abruptly. Setup completes and the user is dropped into an empty
wallet or a dense interface with no tour, no checklist and no indication of what
to do next. Onboarding delivered them and then abandoned them.

What the thirteen showed:

- A major wallet ends both its flows with a "get started" button and drops the
  user straight into the main screen, which is empty.
- A large exchange is the sharpest case. Immediately after finishing
  verification the user meets an interface of overwhelming density, even in its
  simplified mode, with an unexplained toggle between two products and no
  first-steps screen at all. Someone who completed verification in order to buy
  crypto has to find out where that lives on their own.
- Another exchange offers no guidance after verification either, despite ranking
  among the three best products in the sample.
- Even the highest-scoring product of all, which has no critical items anywhere,
  lacks a post-onboarding step.

This is a gap that good products have. It is not a symptom of carelessness, it
is a symptom of finishing at the wrong line.

## When it applies

At the end of any entry flow: after a wallet is created or imported, after a
wallet connects to an app for the first time, after verification is approved.

It matters most on the social login path, which explains the least and therefore
leaves the user with the least idea of what they now hold.

## The component

`welcome-dialog`. One component, two configurations: a banner for a wallet, a
logo and category line for an app the user may be meeting for the first time.

## Rules

**Three steps, in the order they should be done.** A list long enough to feel
like homework is skipped, and the point is to be read.

**Each step is a real next action in this product**, not a description of the
product. "Add funds" is a step. "Trade with confidence" is a slogan.

**The wording is never assumed.** What comes next in a wallet is not what comes
next in an exchange or a lending product. Propose a set, explain why those three,
and wait. A plausible guess is worse than an obvious blank, because it survives
review by looking finished.

**One primary action.** The steps inform; the buttons decide. Two competing
primaries put the user back where they started.

## Copy to propose

Read the product first. The three steps come from what it actually does and what
state the user is in when they arrive.

For a wallet with no balance, funding is almost always step one, because nothing
else is possible without it. For an app the user has just connected to, the
steps are the shape of a first successful action.

Where the product has a genuine risk the user has not addressed yet, such as a
recovery phrase they skipped writing down, that belongs here as a step.

## What to ask

- What is the first thing a user should do in this product, honestly?
- What state are they in when they arrive here: new wallet, imported wallet,
  connected wallet, freshly verified?
- Does the product have art for this, or should the slot be left out?
- Is there anything they still need to do that the flow let them skip?
