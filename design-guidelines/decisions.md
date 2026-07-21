# Component decisions

The rules the components are built to. Where this file and a
[spec](specs/) disagree, this file wins: the specs record the Figma source as it
was read, this one records what was decided afterwards.

Every rule here is also destined for the skill's `references/`, so it is written
to be applied, not admired. Each one says what to do, and the ones that are not
self-evident say why.

## Tokens

Components paint only with the `--so-*` variables defined in
[`tokens.css`](../skills/solana-onboarding/components/tokens.css). A literal
colour, radius or font in a component is a defect.

Each variable reads the host project's shadcn/ui equivalent first and falls back
to the value calibrated on the Figma source, so a project that already has a
theme is themed automatically. Tints that host projects rarely define, the alert
backgrounds and the warning and success tones, ship with the kit's values and
stay overridable one at a time.

Modal widths are two, not four: `--so-width-compact` (440px) for confirmations
and the seed phrase flow, `--so-width-wide` (640px) for KYC and the
post-onboarding welcome.

## Severity

Severity is `neutral`, `warning` or `danger`, and it controls colour only. It
never controls layout, and it is independent of which component is rendering: a
block alert can be a warning, and an inline warning can be a danger. The mapping
lives in [`severity.ts`](../skills/solana-onboarding/components/severity.ts).

The destructive primary button is red at high and critical risk. In the Figma
source every confirmation, including "close my account", uses the same dark
neutral button, which leaves the severity signal entirely in the callout. For a
family whose whole subject is irreversibility, the button has to carry it too.

## Icons

The family is [Lucide](https://lucide.dev), the continuation of the Feather set
the Figma source uses, so the stroke matches and most React projects already
have it.

Corrections to the source, where a chain-link glyph was pasted across three
unrelated alerts:

| Component | Icon |
|---|---|
| Network error | `wifi-off` |
| Insufficient balance, block and inline | `dollar-sign` |
| Transaction timeout | `ban` |
| Wallet not connected | `unplug` |
| KYC document rejected | `file-x` |
| Slippage tolerance exceeded | `trending-down` |
| High slippage, inline | `alert-triangle` |
| Critical confirmation header | `shield-off` |

Callouts take `alert-triangle` at warning and danger, `info` at neutral. In the
source the same sentence, "this action cannot be undone", carries a circled `i`
on one screen and a circled `x` on the next.

The dismiss control on a warning alert is amber, not red. Only the alert's own
severity may introduce a second colour.

## Risk classification

The four confirmation screens are templates selected by risk, not a sequence.
Before choosing one, classify the action:

| Level | Criterion | Examples |
|---|---|---|
| Low | Reversible, or low value | Connect an app, change a setting, small send to a saved address |
| Medium | Moves value with a variable outcome | Swap, add liquidity, stake, send to a new address |
| High | Removes or destroys something, but can be redone without the seed | Withdraw all liquidity, close a position, unstake with a penalty |
| Critical | Touches a key or a permission, **or can only be undone with the 12 words** | Revoke access, unlimited token approval, export the seed, transfer custody, disconnect the account from the app |

Escalate one level when the amount is a large share of the balance, when the
destination address has never been used before, or when nothing anywhere offers
an undo.

The governing rule is the last column of the critical row. Disconnecting an
account reads as harmless, "just reconnect", and strands anyone who never wrote
the phrase down. That is why the source's "Fechar esta conta?" screen is
critical rather than high, and needs the consequence list and the type-to-confirm
field together.

Which blocks appear is driven by the content of the action, not by the level: a
summary table when there are amounts at stake, a consequence list when something
is destroyed, a type-to-confirm field when the level is critical. The template is
the starting point, not a cage.

For the type-to-confirm field, the word is the verb of the action in capitals,
`REVOKE`, `CLOSE`, not a generic `CONFIRM`: typing what will happen is the part
that makes the user read it. The comparison ignores case. The friction that
protects is having to type the word, not getting the caps lock right.

## Accessibility

Every dialog closes, with a visible control and with Escape, and traps focus
while open. The source has no close affordance anywhere, and its KYC review
screen has no exit at all, which strands a user who simply wants out.

Where leaving is costly, closing asks first: while the recovery phrase is on
screen, and part way through KYC. The confirmation states what is lost, for
example that the phrase will have to be generated again.

Progress dots are decorative and are not focusable. In the source they are built
out of icon buttons, which would put empty stops in the keyboard path.

Block alerts announce as `role="alert"`, inline warnings as `aria-live="polite"`.
The icon-triggered tooltip opens on hover and on keyboard focus, and its trigger
carries an accessible name; the underlined-word trigger opens on click and is a
real button. Success and error in the seed phrase confirmation are never colour
alone.

## Responsive

Components work on narrow screens from the start. Solana wallets are heavily
used on phones, and the research covered mobile apps.

The two widths are maximums: below them a dialog goes full width with the page
padding reduced. Side-by-side button pairs stack, primary first. The KYC document
chooser stacks its three cards. The recovery phrase grid drops from three columns
to two.

## Component conventions

The secondary action is a ghost button, text only, on every screen. The source
uses a filled grey once, on the KYC rejection, which competes with the primary.

Titles ask a question when a decision is being requested, "Close this account?",
and state a fact when the screen informs, "Your wallet is ready".

Actions that can fail have a loading state, and the primary button is disabled
while it runs. Not present in the source, and not optional in practice.

An action is never disabled without saying why. The seed phrase confirmation
keeps its continue button disabled while a word is wrong, matching the step
before it, which correctly gates on its checkbox.

The recovery phrase renders blurred and reveals on a deliberate action. There is
never a copy-to-clipboard control: anything running on the machine can read the
clipboard, so its absence is a rule, not an omission.

The upload field has three states, empty, file selected and rejected, and states
its accepted formats and size limit before the user picks a file rather than
after.

## Copy

Components ship in English. The Figma copy is Portuguese and is translated, not
carried over.

Structure is fixed, wording is not. The post-onboarding welcome is a template: a
greeting plus three next steps, so nobody is stranded after connecting or
creating a wallet, with the wording written per product. The skill proposes it
and the user confirms, edits or picks an alternative. This holds for every
component that carries product text.

An error says what happened, then what to do about it. It carries the action that
resolves it and nothing more: the timeout alert asks the user to check their
history before retrying, and leaves reaching the history to the product's own
navigation rather than duplicating it in the alert.

Machine-readable error codes render in the mono face, last and visually demoted.
They are for support conversations, not for the user to decode.

No em dashes, matching the rest of the repository. The tooltip link reads
"Learn more" everywhere; the source component default disagreed with every
instance of itself. The sample phrase uses real BIP-39 words: the source's ninth
word, `silve`, is not one.
