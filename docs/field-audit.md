---
description: >-
  The audit grid run against a real product, outside the original thirteen: what
  it scored, what it confirmed about the study, and what it changed in the kit.
---

# The kit in the field

The study behind this kit scored thirteen products. The kit then turned those findings into an audit grid and a set of components, and for a while that was the whole evidence chain: a diagnosis, and a set of answers derived from it. What was missing was the return trip. A grid that has only ever been run by the people who wrote it is a grid that has never been tested.

This chapter is that return trip. The thirty questions from [chapter 2](methodology.md) were run against a product that was not part of the original thirteen, by someone reading it fresh, to answer one question: does the grid find what it claims to find, in a product nobody chose for it?

## What was audited, and why it is not named

The subject is a widely used, actively maintained open-source Solana wallet. It is a real product with real users and real funds, not a demo. It is not named here, for the same reason the original thirteen are not named anywhere in this kit: the findings are what transfer, and which company was measured is theirs.

Anonymity has a cost, and it should be stated rather than glossed over. A named audit is verifiable; this one asks you to take the reading on trust. The compensation is that every finding below is tied to something concrete enough to recognise if you have built one of these flows yourself, and none of it depends on knowing whose product it is. Exact file paths are withheld deliberately, for the same reason.

## How it was read

The audit was run against the product's source at a released version, reading the onboarding screens, the strings file that holds every word the user sees, and the navigation that connects them. Not a walkthrough of a running build.

That method has a shape worth naming, because it changes which of the thirty questions can be answered honestly:

* **What it reads well.** Wording, because the strings are all in one file. Control flow, because the navigation is explicit. What is warned and what is not. Which errors exist and what they say. Whether a screen is guarded, and by what.
* **What it reads poorly.** Timing, animation and perceived speed. Anything that depends on how a real device behaves under a slow network. Whether a screen that looks fine is legible at arm's length in daylight.

So questions 19 to 21, on efficiency, are scored conservatively, and the reader should treat those three cells as the weakest in the table. Every other score is grounded in something specific in the product.

Scope is the onboarding flow, from the first screen to the first moment of real use: the choice of how to get a wallet, creating one, the recovery phrase, confirming it, naming the wallet, and setting a PIN. The first payment is adjacent rather than inside that line, and where it is cited below it is marked as such.

## The result

**Average severity: 1.87 of 4.** Twelve of the thirty items scored 3 or higher. Two scored 4.

The average is the least interesting number here, and the grid says as much: an average hides the single catastrophic item. This product is not a bad one. Much of it is careful, and some of it is better than anything in the original thirteen. What the grid found was not a product built without thought. It was a product where the thought is unevenly distributed, and where the two worst items sit in the gap between the parts that got attention and the parts that did not.

## Findings, worst first

### 1. The recovery phrase can be copied to the clipboard

**Severity 4. Impact: distrust, and the loss of funds.** Question 13, error prevention.

The screen that reveals the twenty-four word recovery phrase carries a **Copy to Clipboard** control directly beneath the words, and a confirmation toast that tells the user it worked.

This is the one thing the kit forbids without exception, and it is worth being precise about why, because the control looks like a courtesy. The clipboard on both mobile platforms is readable by other processes, is synchronised across devices by the operating system, and is the first thing malware reads. A recovery phrase is not a password: there is no reset, no support line, and no reversal. Putting it on the clipboard converts a secret that existed only on paper into one that has been broadcast to every process on the device and, with cross-device clipboard sync, to a second device entirely.

The control also exists because it is genuinely useful, which is what makes it survive review. Someone who wants to store the phrase in a password manager needs it in a copyable form. The answer is not to argue with that user, it is to make the safe path the easy one: an explicit export into a named password manager, behind a warning, is a different act from a copy button sitting under the words by default.

Closes it: **seed phrase education**, pattern 01. The kit's reveal component has no clipboard control, by design, and the rule is written into the skill so an agent will not add one back.

### 2. The last step of onboarding shows a raw exception

**Severity 4. Impact: block.** Question 26, help users recover from errors.

The final step, where the wallet is written to storage and the account created, catches its errors and puts the exception's own string on screen. Whatever the underlying library said, in the words it said it, is what the user reads.

This is the failure the study identified as the strongest single driver of permanent abandonment, and it is here in its purest form: at the last step, after the user has written down a recovery phrase and confirmed it word by word, with no action offered and nothing to do but leave. A user who reaches this has invested the most and is given the least.

The same step has a second, quieter version of the same problem. When the account list comes back empty, which a code comment attributes to the user moving through the screen too fast, the handler returns without doing anything. No error, no advance, no feedback. The button was pressed and the app did nothing.

Closes it: **actionable errors**, pattern 05. Every error names what happened, why, and one thing the user can do next.

### 3. One object, five names

**Severity 3. Impact: confusion.** Questions 4 and 5, match with the real world.

Across the onboarding the same twenty-four words are called a **seed phrase**, a **secret phrase**, a **recovery phrase**, the wallet's **security words**, and its **security key**. One screen introduces them with a sentence saying the words represent the user's **private key**, which is a sixth name and, strictly, a different object.

For a reader who already knows what a BIP39 mnemonic is, these are synonyms and the variation is invisible. For the person this kit is about, they are five different things, and the reasonable conclusion is that the app is asking about five different things. The word **private key** doing double duty is the sharpest instance, because elsewhere the same flow offers importing an actual private key as a separate path.

Developer vocabulary also reaches the surface in a few places: one error refers to a **txn**, and the import flow explains **derivation paths** to a user who has just chosen the beginner path.

Closes it: **inline glossary**, pattern 04, and the copy rules, which start by fixing one name per object.

### 4. The confirmation step can be satisfied from the clipboard

**Severity 3. Impact: distrust.** Question 14, validations before critical actions.

The screen that asks the user to confirm the phrase word by word accepts a paste, and a paste fills every word at once.

The confirmation exists to prove one thing: that the user wrote the phrase down and can read it back. A paste proves the phrase is still on the clipboard, which is exactly what the first finding put there. The two failures compound. The app offers a copy, then accepts that copy as evidence of a written record that may not exist, and the user reaches their wallet believing they have passed a check they never took.

Closes it: **seed phrase education**, pattern 01, whose confirmation step accepts typed and selected words only.

### 5. The same screen is guarded in one place and unguarded in the other

**Severity 3. Impact: confusion, and risk.** Question 10, consistency.

The product has a genuinely good warning screen, described under what it gets right below. Reaching the recovery phrase from settings puts that warning in front of it, with a timed delay before the user can proceed.

Reaching the same phrase, rendered by the same component, during onboarding shows it immediately. No warning, no delay, no instruction to check who can see the screen.

The asymmetry is exactly backwards. The settings path is taken by someone who already has a wallet, already knows what the phrase is, and went looking for it on purpose. The onboarding path is taken by someone seeing a recovery phrase for the first time in their life. The product wrote the right screen and then put it in front of the wrong user.

This is the failure the kit's audit mode is told to hunt for specifically, because it hides well: nothing looks wrong on either screen. The defect is only visible when the two are compared.

Closes it: **seed phrase education**, pattern 01, where the pre-reveal warning is part of the flow rather than a wrapper someone remembered to apply.

### 6. Four ways in, no explanation of any

**Severity 3. Impact: confusion.** Question 23, elements with a clear purpose.

The first screen asks what the user would like to do and offers four options: import a wallet, create a new one, connect one hardware device, connect another. Each is a single line of text with an icon. None carries a description.

A user who knows what those words mean does not need help. A user who does not cannot choose, and two of the four options are brand names of hardware they may never have heard of. The first screen of the product is a fork with no signposts, and the cost of picking wrong is not symmetric: choosing create when you meant import is recoverable, and the reverse can waste a long detour.

Closes it: **custody paths**, which is the skill's first stop for anything about creating or importing, and the choice-card component that carries a description per option.

### 7. No sense of where you are

**Severity 3. Impact: confusion.** Question 3, visibility of system status.

There is no step indicator anywhere in the onboarding. The user learns they are on word seven of twenty-four, which is progress within a screen, but never that the phrase is step two of four. A progress component exists in the product's own library and is not used here.

The cost is specific rather than cosmetic. Someone deciding whether to start writing down twenty-four words needs to know how much more is coming, and a flow that will not say invites the user to postpone, which in practice means leaving.

Closes it: the step indicator carried by the kit's seed phrase and verification flows.

### 8. No help anywhere in the flow

**Severity 3. Impact: confusion.** Questions 28 and 30, help and documentation.

There is no link to help, no support entry point, and no contextual explanation anywhere in the onboarding. Not a link to another tab, which is what the study criticised in most of the thirteen. Nothing at all.

Question 30 asks specifically about support at the critical moments, and the grid names them: the phrase reveal, a failed transaction, a rejected verification. At the phrase reveal there is a copy control and two sentences. At the failure there is an exception string. This is the one heuristic where this product scores below the study's average rather than at it.

Closes it: **inline contextual help**, pattern 03, which puts the explanation on the screen where the question occurs.

### 9. A wrong word says nothing

**Severity 2, rising to 3 in combination.** Questions 25 and 27.

When the user selects the wrong word during confirmation, the screen shakes and the phone vibrates. No text appears. The feedback is real and immediate, which is why this is not scored higher, but it is entirely non-verbal: it says something is wrong and never says what, and it is the same shake whether the user picked a wrong word or has the wrong phrase entirely.

There is a separate instance of the same habit elsewhere in the flow, where a dialog's title and body are swapped: the full sentence sits in the title slot and a two-word label sits in the body. It is a small defect and it is visible to anyone who reads the strings file, which is a fair indication of how often error copy gets reviewed compared with the screens.

Closes it: **actionable errors**, pattern 05.

## What it gets right

Half of an audit that only lists faults is a worse audit. Three things here are better than what the study found in the original thirteen, and one of them is better than what the kit shipped.

**The warning screen.** Before revealing the phrase from settings, the product asks whether the user would give away their bank username and password, answers its own question, and names the exact social engineering script the user will eventually meet, including someone claiming to work for the company. Then it holds the button disabled for a few seconds with a visible countdown. That is a well-made screen: it uses an analogy from the user's existing world, it inoculates against a specific attack rather than warning in general, and the delay prevents the reflex tap. The kit's pre-reveal warning is weaker than this, and this chapter is the reason it is being revised.

**Irreversibility is stated plainly.** At the reveal, in red, the product says that no one can recover these words. Not "keep them safe", which is advice, but a statement of what is true. The study found most products softening this into a suggestion.

**Sending is a deliberate act.** The payment screen, which is adjacent to onboarding rather than inside it, requires a swipe rather than a tap to send, and warns when the destination address belongs to a program rather than a person. Both are the right instinct: friction proportional to what the action costs, and a warning about the destination, not just the amount.

**The efficient parts are genuinely efficient.** Word autocomplete restricted to valid words, automatic detection of derivation paths on import, a command-line import path, hardware wallet support, twelve or twenty-four word phrases. The grid warns that a good score on this heuristic should be read with suspicion, and that warning applies here: everything in that list serves a user who already knows what they are doing, and the product's thinnest moments are all in the same place, which is the first ten minutes of someone's first wallet.

## What this changed in the kit

The audit was supposed to test the product. It also tested the grid, and both came back with corrections.

* **The pre-reveal warning is being revised.** The audited product's version is better than the kit's: it uses a concrete analogy, names the attack, and enforces a delay. The kit's specification will adopt all three.
* **Question 14 needed sharpening.** "Are there validations before critical actions" scored a naive Partial on first pass, because the confirmation screen exists and looks thorough. It took reading the paste handler to see that the validation can be satisfied without the user having done the thing it validates. The grid now says to check what a validation actually proves, not that one is present.
* **The clipboard rule earned its absoluteness.** It was written as a flat prohibition on the strength of the study. Finding it in a careful product, sitting under a well-written warning, next to a phrase that says no one can recover these words, is better evidence than the study gave: this is not an oversight that careless teams make. It is a courtesy that survives review because it is genuinely convenient.

## The grid, tested

The grid was built from thirteen products and had never been run by a stranger. On this product it found twelve items at severity 3 or above, and the two worst were both invisible to a screen-by-screen reading: one is a control that looks helpful, the other is a comparison between two screens that are individually fine. That is the outcome the grid was designed for, and it is the argument for scoring all thirty questions rather than stopping when a flow starts to look reasonable.

It also confirmed the study's transversal finding. The single most pervasive failure here, present on nearly every screen, was vocabulary: the product is written in fluent Web3, and never translates. That is what the study found across thirteen products, and it is the first thing to fix in this one.

## Every item

Severity: 0 no problem, 1 cosmetic, 2 minor friction, 3 hinders use, 4 blocks use or risks funds.

| # | Question | Verdict | Sev | Impact |
|---|---|:-:|:-:|---|
| 1 | Immediate feedback after an action | Partial | 2 | Friction |
| 2 | Clear when loading or processing | Yes | 0 | |
| 3 | User knows where they are in the flow | No | 3 | Confusion |
| 4 | Language is simple and natural | Partial | 3 | Confusion |
| 5 | Terms make sense to the user | No | 3 | Confusion |
| 6 | Information follows an intuitive logic | Partial | 1 | Friction |
| 7 | A way to go back or cancel | Partial | 2 | Friction |
| 8 | The user can undo actions | Partial | 1 | Friction |
| 9 | The user does not get stuck | No | 3 | Block |
| 10 | Similar elements behave the same way | No | 3 | Confusion |
| 11 | Design follows known patterns | Yes | 1 | |
| 12 | No unexpected behaviours | Partial | 1 | Confusion |
| 13 | Errors are prevented before they happen | No | 4 | Distrust |
| 14 | Validations before critical actions | Partial | 3 | Distrust |
| 15 | The user is warned before irreversible actions | Partial | 3 | Distrust |
| 16 | Important information is visible | Yes | 1 | |
| 17 | Suggestions or autocomplete | Yes | 0 | |
| 18 | The user avoids having to remember | Partial | 2 | Friction |
| 19 | The flow is fast and efficient | Yes | 0 | |
| 20 | Shortcuts for advanced users | Yes | 0 | |
| 21 | Useful automations | Yes | 0 | |
| 22 | The interface is clean | Yes | 0 | |
| 23 | Elements have a clear purpose | No | 3 | Confusion |
| 24 | Focus on the essentials | Partial | 1 | Friction |
| 25 | Error messages are clear | Partial | 2 | Confusion |
| 26 | The system explains how to fix the problem | No | 4 | Block |
| 27 | The user can recover easily | Partial | 2 | Friction |
| 28 | Help is accessible | No | 3 | Confusion |
| 29 | The system guides the user | Partial | 2 | Confusion |
| 30 | Support at critical moments | No | 3 | Confusion |

## Where this audit could not reach

Stated plainly, because the study flagged its own gaps and an audit that hides them is worth less than one that does not.

* **Anything that depends on running it.** Perceived speed, animation, how the flow behaves on a slow connection, whether a screen is legible in daylight. Questions 19 to 21 rest on the thinnest evidence in the table.
* **The hardware paths.** The two hardware wallet options were not followed. They are onboarding paths and they were not scored.
* **Everything after the first use.** The empty state a new user lands in, and whether anything explains what to do next, was out of scope. On the evidence of the rest, it is where the next audit should start.
* **One reader.** The original study scored thirteen products; this is one product read once. It tests whether the grid finds real things. It does not establish how the grid behaves across readers, which is the next thing worth knowing about it.
