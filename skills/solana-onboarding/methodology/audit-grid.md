# The audit grid

The protocol the research used to score 13 Solana products, so an audit run by
this skill produces something comparable to those results rather than a fresh
opinion.

Nielsen's ten heuristics, each broken into three concrete questions. Thirty items
per product. The questions are the researchers' own, translated from the
evaluation spreadsheet; the notes under each heuristic are what the study found
when it asked them, and the pattern named is what closes the gap.

Score the **onboarding flow**, from the first screen to the first moment of real
use, not the whole product. Say so when something falls outside that line.

## How to score

Each item gets a verdict, a severity, and, when it fails, an impact type.

**Verdict**: Yes, it is met. Partial, met with caveats. No, not met.

**Severity**, calibrated by what it costs the user rather than by how wrong it
looks:

| | |
|:-:|---|
| 0 | No problem |
| 1 | Cosmetic |
| 2 | Minor, friction |
| 3 | High, hinders use |
| 4 | Critical, blocks use or risks losing funds |

The product's score is the average of the thirty severities, empty counting as
zero. Report the average, and separately report how many items sit at 3 or 4,
because an average hides the single catastrophic item.

**Impact**, for every failure:

| | |
|---|---|
| Confusion | Does not understand |
| Friction | Extra effort |
| Block | Cannot proceed |
| Distrust | Loses confidence |

The distinction earns its place: in a context of irreversible money, distrust
costs far more than friction, and the two are easy to score identically.

## 1. Visibility of system status

- **1.** Does the system give immediate feedback after an action?
- **2.** Is it clear when something is loading or processing?
- **3.** Does the user know where they are in the flow?

A transaction that has been submitted and not confirmed is the case that matters
here, because the user cannot tell it apart from one that failed, and retrying
can spend the money twice. Step indicators were commonly missing or unclear.

Closes it: **actionable errors** for the submitted-but-unconfirmed state, and
the step indicator carried by the seed phrase and KYC flows.

## 2. Match between the system and the real world

- **4.** Is the language simple and natural?
- **5.** Do the terms make sense to the user?
- **6.** Does the information follow an intuitive logic?

The most transversal failure in the study. Products are written in native Web3
vocabulary with no translation for someone arriving from a bank or an exchange.
"Recovery phrase" appears as a central concept with no analogy at all, and terms
like swap, slippage, priority fee and blind signing appear unexplained at the
point of use.

Closes it: **inline glossary**, and the help page behind it.

## 3. User control and freedom

- **7.** Is there a way to go back or cancel?
- **8.** Can the user undo actions?
- **9.** Does the user get stuck in any flow?

Registration flows with no way back were found repeatedly, including one where
the desktop version had no back control at all. Being unable to review a
recovery phrase before confirming it was called out specifically.

Closes it: dialogs that close, with Escape and a control, and a back step
between reveal and confirmation. Where leaving costs something, the flow asks
first rather than removing the exit.

## 4. Consistency and standards

- **10.** Do similar elements behave the same way?
- **11.** Does the design follow known patterns?
- **12.** Are there no unexpected behaviours?

The unexpected behaviour that hurt most was discovering that features are gated
by region or verification level only on reaching them.

Closes it: **gate anticipation**.

## 5. Error prevention

- **13.** Does the system prevent errors before they happen?
- **14.** Are there validations before critical actions?
- **15.** Is the user warned before irreversible actions?

Question 15 is the heart of the whole kit. Most products treat an irreversible
transfer with the same ceremony as a reversible setting. Ask it of every action
that moves value or touches a key, and score each one separately in your notes
even though the grid has a single cell.

Closes it: **pre-action confirmation**, chosen by
`references/risk-classification.md`, plus the destination address warning.

## 6. Recognition rather than recall

- **16.** Is important information visible?
- **17.** Does the system offer suggestions or autocomplete?
- **18.** Does the user avoid having to remember things?

Item 18 has an honest answer of "no" for any self-custody wallet: remembering, or
rather recording, the recovery phrase is the model. What the study penalised was
demanding it without teaching it.

Closes it: **seed phrase education**, which replaces recall with a written record
and a check that the record is correct.

## 7. Flexibility and efficiency of use

- **19.** Is the flow fast and efficient?
- **20.** Are there shortcuts for advanced users?
- **21.** Are there useful automations?

The one heuristic where crypto products generally score well. Read a good result
here with suspicion: the study found the most technically polished onboardings
were sometimes the worst for a beginner, because efficiency for the fluent and
adequacy for the newcomer are different things.

## 8. Aesthetic and minimalist design

- **22.** Is the interface clean and free of excess?
- **23.** Do elements have a clear purpose?
- **24.** Is the focus on the essentials?

The failure is usually a screen appearing with no explanation of why it exists,
or a mode toggle whose two sides are never described.

Closes it: **post-onboarding welcome** for the first-run case.

## 9. Help users recognise, diagnose and recover from errors

- **25.** Are error messages clear?
- **26.** Does the system explain how to fix the problem?
- **27.** Can the user recover easily?

Question 26 is where the study found the strongest single driver of permanent
abandonment. Errors state a symptom and stop: "swap failed", "document not
accepted", a disabled button with no reason. One evaluation recorded users
resubmitting identical documents indefinitely because nothing said what was
wrong.

Score 26 as a failure whenever an error names a problem without an action that
addresses it, even if the message is otherwise well written.

Closes it: **actionable errors**, and `references/error-codes.md` maps a real
error to the right one.

## 10. Help and documentation

- **28.** Is help accessible?
- **29.** Does the system guide the user?
- **30.** Is there support at critical moments?

Almost every product has documentation, often good. The failure is location, not
existence: another tab, another site, never the screen where the question
appeared. Question 30 is the sharp one, and the critical moments are the seed
phrase reveal, a failed transaction, and a rejected verification.

Closes it: **inline contextual help**, and the **post-onboarding welcome** for
question 29.

## Reporting

Order findings by severity, not by heuristic number. Nobody reads a report that
opens on a cosmetic issue.

For each finding: what was observed, the severity and why that number, the impact
type, and the pattern that closes it. Recommend, do not install.

Two things to state plainly if they are true. That the product has no entry layer
at all, which the study found in three of thirteen, and where the answer is to
build rather than to refine. And where you could not evaluate, for instance a
verification you did not complete, since the study flagged its own gaps and an
audit that hides them is worth less than one that does not.
