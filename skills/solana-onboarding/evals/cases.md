# Cases

Twelve. Grouped by what they test, hardest first.

## Refusing

The cases the skill exists to get right, and the ones it will fail quietly.

### 1. An action that needs no dialog

> "Add a confirmation before the user changes their display currency."

**Passes** by saying no dialog is needed, because the setting is reversible, and
explaining that confirming reversible actions trains people to click through, so
the cost lands on the next warning rather than this screen.

**Trap:** building a competent low-risk confirmation. It looks like service.

### 2. A rejected signature is not an error

> "The user cancels in their wallet and we show nothing. Add an error for that."

**Passes** by declining. The user decided not to proceed, which is what that
button is for, and colouring a deliberate choice red teaches people the product
treats their decisions as failures. Returning them to the previous screen is the
whole behaviour.

### 3. A clipboard button for the recovery phrase

> "Users complain about typing 12 words. Add a copy button to the reveal screen."

**Passes** by refusing and saying why: any process on the machine can read the
clipboard, and copying encourages the digital storage the previous screen warns
against. Offering a better answer to the real complaint, such as the confirmation
step asking for fewer words, is a pass. Adding the button is a fail whatever the
justification.

### 4. Asserting why verification failed

> "Show the user which check failed when their KYC is rejected."

**Passes** by asking which provider runs verification and what it returns. If the
answer is nothing specific, the skill keeps the wording that says a cause **may**
apply. A confident wrong reason sends someone to fix what was never broken.

**Trap:** writing "your selfie did not match" because the component accepts a
list.

## Classifying

### 5. The action that looks harmless

> "We have a Disconnect account button. It just clears local state."

**Passes** by asking whether reconnecting needs the recovery phrase, and on
learning that it does, classifying the action as critical: consequence list, red
button, typed phrase, and the recovery notice.

**Trap:** low risk, because "disconnect" sounds administrative and the code only
clears local state. What the code does and what the user loses are different
questions.

### 6. A swap

> "Add a confirmation to our swap."

**Passes** at medium: the outcome cannot be predicted exactly. It includes the
summary table, because amounts are involved, and does not include a consequence
list, because nothing is destroyed.

### 7. Seed education on the social path

> "We use social login only. Where do we put the seed phrase screen?"

**Passes** by saying there is no phrase on that path, so the screen would be
about nothing, and pointing at where the kit does apply: the welcome, which
matters more here because this path explains the least. Asking whether the
provider offers a phrase export later, which would be a critical action, is a
strong pass.

## Routing

### 8. A pasted error

> "Our app shows `custom program error: 0x1` and users disappear."

**Passes** by treating the code as untranslated rather than as a title, asking
what that error means in that program, and only then choosing a component. Using
the raw string as the alert title is the exact failure the pattern exists to fix.

### 9. A broad request

> "Make our onboarding better."

**Passes** by auditing before building. Implementing first produces a well-made
screen in the wrong place.

### 10. A term nobody explained

> "Users do not understand what slippage means on our swap screen."

**Passes** with the glossary tooltip on the label, defining rather than advising,
and checks the definition for a second unexplained term.

## Building

### 11. Installing the full chain

> "Add the confirmation dialog to our Next app."

**Passes** by reading the manifest, copying all five files rather than the one
named, installing the package, importing the stylesheet, matching the project's
component directory, and building afterwards.

**Trap:** copying `confirmation-dialog.tsx` alone. It builds nothing.

### 12. Copy that was never agreed

> "Add the welcome screen for our lending app."

**Passes** by proposing three steps drawn from what the product does, saying why
those three, and waiting. Writing final copy and installing it is a fail even if
the wording is good, because a plausible guess survives review by looking
finished.

## Regression

Cheap to check, worth checking after any edit to the references.

- The skill never names an evaluated product. `npm test` enforces this; the case
  exists because a model can produce one in conversation without writing a file.
- An audit reports severity and impact type per finding, ordered by severity, and
  says plainly where it could not evaluate.
- A confirmation at critical risk always carries a typed phrase. The types
  enforce it in code; the case catches the skill proposing otherwise in prose.
