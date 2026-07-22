# Pattern 01 — Seed phrase education (4-step flow)

Figma file: `mw0jpUr7tX6uI4fozEQGnm`. All four frames are built from the Figma **Simple Design System (SDS)**
(`DialogBody`, `Card`, `Tag`, `Notification`, `CheckboxField`, `InputField`, `Button`, `ButtonGroup`, `IconButton`).
Common shell for every frame: full-bleed canvas `--sds-color-background-neutral-secondary` (#cdcdcd), centered
column, `gap 32`, with a small grey caption below the dialog naming the step (design annotation, not product copy).
Dialog = white card, radius `--sds-size-radius-400` (16), padding `--sds-size-space-800` (32) with `Drop Shadow/400`,
rendered ~400px wide in the frame (SDS guidance: overlays max-width 600).

---

## Step 0 — `65:2` "Pop-up Custody Method"

**1. Purpose.** Entry point of onboarding: the user chooses how their wallet access will be secured — a social/
Google-backed method or a self-custodial recovery phrase.

**2. Layout structure.** Modal dialog (`DialogBody`, variant `Card`, `dismissible = false`, so no close X).
Vertical stack: image placeholder banner (#E3E3E3, ~16:6, image icon) → heading (24/600) → body subtext (secondary
grey, centered) → `MenuSeparator` divider → Card 1 → Card 2. Card gap `--sds-size-space-400` (16); cards are
outlined (`Stroke` variant, 1px `--sds-color-border-default-default`, radius 8, padding 16, `Horizontal` direction:
icon left, text block right). Inside each card: heading → body → Tag pill (radius 8, full width).

**3. Copy.**

- `Como você quer proteger sua carteira?` → "How do you want to protect your wallet?" (real copy)
- `Escolha como guardar o acesso à sua conta. Você pode mudar isso depois nas configurações.` → "Choose how to store
  access to your account. You can change this later in settings." (real copy)
- Card 1 heading `Continuar com o Google` → "Continue with Google" (real)
- Card 1 body `Sua conta Google protege o acesso. Sem nada para anotar agora.` → "Your Google account protects
  access. Nothing to write down right now." (real)
- Card 1 tag `Mais fácil para começar` → "Easiest way to start" (real)
- Card 2 heading `Usar frase de recuperação` → "Use a recovery phrase" (real)
- Card 2 body `12 palavras que só você conhece. Se perdê-las, perde o acesso — sem exceção.` → "12 words only you
  know. If you lose them, you lose access — no exceptions." (real)
- Card 2 tag `Requer atenção extra` → "Requires extra care" (real)
- `escolha de método` → "method choice" — **frame caption / annotation, not product copy**
- Placeholder leftovers in the component props: `Body text`, `Body text for whatever you'd like to say. Add main
  takeaway points, quotes, anecdotes, or even a very very short story.` — **SDS lorem, overridden on canvas**

**4. Interactive elements.** Two full-width selectable Cards (`button = true`) acting as the choice targets. No
footer buttons, no checkbox, no dismiss control. Card 1 tag shown in `Hover` state; Card 2 tag in `Default`.

**5. Icons.** `LogIn` (arrow into bracket) on card 1; `Key` on card 2; generic image placeholder glyph in the banner.
Tag components have `removable = false`, so no X icons.

**6. Tokens.**

- color: `--sds-color-background-neutral-secondary`, `--sds-color-background-default-default`,
  `--sds-color-background-positive-secondary-hover` (#aff4c6), `--sds-color-background-warning-secondary` (#fff1c2),
  `--sds-color-text-default-default`, `--sds-color-text-default-secondary`,
  `--sds-color-text-positive-on-positive-secondary` (#02542d), `--sds-color-text-warning-on-warning-secondary`
  (#682d03), `--sds-color-border-default-default`, `--sds-color-icon-default-default`, `--sds-color-slate-200`,
  `--sds-color-black-100/200`
- size: `--sds-size-space-0/200/300/400/600/800`, `--sds-size-padding-sm`, `--sds-size-radius-200/400`,
  `--sds-size-stroke-border`, `--sds-size-depth-0/100/400/800/negative-100`
- typography: `--sds-typography-heading-*` (Inter 24/600), `--sds-typography-subheading-*` (Inter 20/400),
  `--sds-typography-body-*` (Inter 16 & 14, weights 400)

**7. Props.** `title`, `description`, `illustration` (brand image replacing the placeholder), `options[]` of
`{ id, icon, title, description, tagLabel, tagScheme: 'positive' | 'warning' }`, `onSelect(id)`, optional
`selectedId`, `open`.

**8. Notes.** Code Connect echoes stale prop values (both cards report heading "Continuar com o Google"; DialogBody
reports the step-0 heading on every frame) — trust the rendered canvas, not the prop strings. The banner is still the
grey SDS image placeholder; no real illustration exists. No dismiss affordance anywhere in the flow.

---

## Step 1 — `65:3871` "Aviso de Segurança Pré-ação"

**1. Purpose.** Pre-reveal interstitial: it explains the stakes of a recovery phrase and forces an explicit
acknowledgement before the phrase can be shown.

**2. Layout structure.** Same modal shell. Stack: 3-dot step indicator (small `IconButton`s, first Primary/filled,
others Neutral, size Small) → image placeholder banner → heading (centered, 24/600) → warning `Notification`
(variant `Alert`, background `--sds-color-background-warning-secondary`, 1px `--sds-color-border-warning-tertiary`,
radius 8, padding 12/16, icon left) → 3 icon+text rule rows (gap ~8-12, body 14-16) → outlined card containing the
checkbox (radius 8, padding 16) → `ButtonGroup` align `Justify` with two buttons.

**3. Copy.**

- `Antes de ver sua frase de recuperação` → "Before you see your recovery phrase" (real)
- Alert: `Essas 12 palavras são a única forma de recuperar sua carteira.` + bold `Ninguém pode ajudar se você as
  perder.` → "These 12 words are the only way to recover your wallet. **No one can help you if you lose them.**" (real)
- `Certifique-se de que ninguém está olhando sua tela agora.` → "Make sure no one is looking at your screen right
  now." (real)
- `Não tire foto nem salve no celular.` → "Don't take a photo or save it on your phone." (real)
- `Anote em papel em ordem. A sequência das palavras importa.` → "Write it on paper, in order. The word sequence
  matters." (real)
- Checkbox `Entendi, estou num lugar privado e pronto para anotar.` → "Got it — I'm in a private place and ready to
  write it down." (real)
- Buttons `Voltar` → "Back"; `Ver minha frase` → "Show my phrase" (real)
- `aviso pré-reveal` → "pre-reveal warning" — **frame caption, not product copy**
- Component-level leftovers: Notification `textTitle="Title"` / `textBody="Body text."`, and CheckboxField
  `description="estou num lugar privado e pronto para anotar."` with `hasDescription = false` — **not rendered**

**4. Interactive elements.** One `CheckboxField` (`Unchecked`, `Default`). Footer `ButtonGroup`: `Voltar` =
`Subtle` variant (text-only), `Ver minha frase` = `Primary` in **`Disabled` state** — the design explicitly gates the
reveal on the checkbox. Step dots are IconButtons but read as a non-interactive progress indicator.

**5. Icons.** `Info` (circle-i) inside the alert; `EyeOff`, `CameraOff`, `Edit2` (pencil) on the three rule rows;
image placeholder glyph in the banner; dot glyphs in the step indicator.

**6. Tokens.**

- color: `--sds-color-background-default-default/-secondary`, `--sds-color-background-neutral-secondary`,
  `--sds-color-background-warning-secondary`, `--sds-color-background-brand-default` (#2c2c2c),
  `--sds-color-background-disabled-default` (#d9d9d9), `--sds-color-border-default-default`,
  `--sds-color-border-brand-default/-tertiary`, `--sds-color-border-warning-tertiary` (#bf6a02),
  `--sds-color-border-disabled-default`, `--sds-color-text-default-default/-secondary`,
  `--sds-color-text-neutral-default/-on-neutral-tertiary`, `--sds-color-text-warning-on-warning-tertiary` (#522504),
  `--sds-color-text-disabled-on-disabled` (#b3b3b3), `--sds-color-icon-default-default`,
  `--sds-color-icon-warning-on-warning-tertiary`, `--sds-color-slate-200`, `--sds-color-black-100/200`
- size: `--sds-size-space-100/200/300/400/600/800`, `--sds-size-radius-100/200/400`, `--sds-size-stroke-border`,
  `--sds-size-depth-*`
- typography: `--sds-typography-heading-*`, `--sds-typography-body-size-medium/-small`,
  `--sds-typography-body-font-weight-regular/-strong` (600), `--sds-typography-scale-06` (32)

**7. Props.** `wordCount` (copy hard-codes 12), `title`, `warning: { text, emphasis }`, `rules[]` of
`{ icon, text }`, `acknowledgementLabel`, `checked` / `onCheckedChange`, `onBack`, `onReveal`,
`revealDisabled` (derived from `checked`), `step` / `totalSteps`, `illustration`.

**8. Notes.** The step indicator is built out of IconButtons rather than a real indicator component — it will be
keyboard-focusable if implemented literally; make it non-interactive. The image placeholder is still SDS grey. The
checkbox is wrapped in a bare `CardSlot`, i.e. an ad-hoc container, not a real SDS component.

---

## Step 2 — `65:4511` "Seed Phrase"

**1. Purpose.** Reveals the 12-word recovery phrase, numbered and in order, and asks the user to confirm they have
written it down before moving on.

**2. Layout structure.** Same modal shell. Stack: 3-dot indicator (second dot Primary) → heading (centered) →
subtext (secondary grey, centered) → 12-cell word grid, **3 columns × 4 rows**, gap ~8-12, each cell an outlined
chip (white bg, 1px `--sds-color-border-default-default`, radius 8, padding ~8/12) with a grey index number then the
word → informational `Notification` (variant `Message`, neutral `--sds-color-background-default-secondary` #f5f5f5,
1px border, radius 8, info icon left) → `ButtonGroup` align `Justify`. **No banner image on this frame.**

**3. Copy.**

- `Sua frase de recuperação` → "Your recovery phrase" (real)
- `Anote as palavras abaixo na ordem em que aparecem. Você vai precisar confirmar algumas delas no próximo passo.` →
  "Write down the words below in the order they appear. You'll need to confirm some of them in the next step." (real)
- Words (sample/mock data, not product copy): `apple, river, stone, mirror, candle, forest, eagle, pocket, silve,
  bridge, cloud, window`
- Message: `A ordem das palavras é parte da chave. Não altere a sequência.` → "The word order is part of the key.
  Don't change the sequence." (real)
- Buttons `Voltar` → "Back"; `Já anotei, continuar` → "I've written it down, continue" (real)
- `reveal da frase` → "phrase reveal" — **frame caption, not product copy**
- Leftovers: Notification `textTitle="Title"` / `textBody="Body text."` — **not rendered**

**4. Interactive elements.** Footer only: `Voltar` (`Subtle`) and `Já anotei, continuar` (`Primary`, `Default` —
enabled, no gating here). **No copy-to-clipboard control, no blur/reveal overlay, no "show phrase" toggle is present
in the design** — the words are rendered in plain view. Word cells are static, non-editable.

**5. Icons.** `Info` in the message notification; step-indicator dots. No copy or eye icon.

**6. Tokens.**

- color: `--sds-color-background-default-default/-secondary`, `--sds-color-background-neutral-secondary`,
  `--sds-color-background-brand-default` (#2c2c2c), `--sds-color-border-default-default/-secondary`,
  `--sds-color-border-brand-default`, `--sds-color-text-default-default/-secondary`,
  `--sds-color-text-neutral-default`, `--sds-color-text-brand-on-brand` (#f5f5f5),
  `--sds-color-icon-default-secondary`, `--sds-color-black-100/200`
- size: `--sds-size-space-100/200/300/400/600/800`, `--sds-size-radius-200/400`, `--sds-size-stroke-border`,
  `--sds-size-depth-*`
- typography: `--sds-typography-heading-*`, `--sds-typography-subheading-*`, `--sds-typography-body-size-medium/-small`,
  `--sds-typography-body-font-weight-regular`, `--sds-typography-scale-06`

**7. Props.** `words: string[]` (length drives the grid; design assumes 12), `columns` (default 3), `title`,
`description`, `noticeText`, `onBack`, `onContinue`, `continueLabel`, plus host-supplied extras the design lacks:
`onCopy`, `revealed` / `onReveal` if a blur gate is wanted.

**8. Notes.** Word 9 reads `silve`, which is not a BIP-39 word (likely a typo for `silver`) — mock data only. Cells
are anonymous `CardSlot`s, so there is no dedicated word-chip component in the file. Since the words render
unblurred, the "no one is looking at your screen" warning from step 1 is not backed by any masking affordance.

---

## Step 3 — `67:553` "Confirmação das Palavras"

**1. Purpose.** Verification step: the user re-types a subset of the phrase to prove it was written down correctly,
with per-field success and error feedback.

**2. Layout structure.** Same modal shell. Stack: 3-dot indicator (third dot Primary) → heading (centered) →
subtext (centered, secondary) → four stacked `InputField`s (label above, input below, helper/error text under;
inputs full width, radius 8, 1px border, padding ~8/12; field gap ~16-24) → a text link/`Subtle` button, centered →
full-width `Primary` button in a `ButtonGroup` (align `Justify`, `buttonStart = false`). **No banner image.**

**3. Copy.**

- `Confirme sua frase` → "Confirm your phrase" (real)
- `Digite as palavras pedidas abaixo. Isso confirma que você anotou corretamente.` → "Type the requested words
  below. This confirms you wrote them down correctly." (real)
- Labels `Palavra 1` / `Palavra 5` / `Palavra 7` / `Palavra 10` → "Word 1 / 5 / 7 / 10" (real, index is dynamic)
- Field 1 value `apple` (mock), success text `Correto!` → "Correct!" (real)
- Field 2 value `candel` (mock typo, demonstrating the error state), error `Não bate com o que você anotou` →
  "Doesn't match what you wrote down" (real)
- Placeholders `Digite a palavra 7` / `Digite a palavra 10` → "Type word 7 / 10" (real)
- Link `Voltar para ver a frase de novo` → "Go back to see the phrase again" (real)
- Button `Continuar` → "Continue" (real)
- `confirmação de palavras` → "word confirmation" — **frame caption, not product copy**
- Leftover: every InputField carries `description="Description"` with `hasDescription = false` — **SDS lorem, not rendered**

**4. Interactive elements.** Four text inputs. States present in the design: `Default` + filled + success message
(green `Correto!`), `Error` (red border + red message), and `Default` + `Placeholder` (empty). A `Subtle` button
styled as an underlined text link returns to step 2. Footer `Continuar` is `Primary` / `Default`, i.e. **shown
enabled even though one field is in error** — the design does not specify gating here.

**5. Icons.** None on this frame apart from the step-indicator dots. No eye/reveal or check-mark icons; success is
communicated by text colour only.

**6. Tokens.** `get_variable_defs` for this node could not be fetched (Figma MCP rate limit on the Starter plan).
From the style list returned by `get_design_context`, this frame uses the same set as step 2 plus a `Body Link`
style (Inter 16/400, underlined). Success green and error red are rendered but their token names were not captured —
they are the SDS positive/danger text tokens (approx. `--sds-color-text-success-default` /
`--sds-color-text-danger-default`); **verify before coding.**

**7. Props.** `challenges: { index: number; status: 'idle' | 'correct' | 'error' }[]` (design shows 4 of 12),
`values` / `onChange(index, value)`, `successText`, `errorText`, `placeholderTemplate` ("Digite a palavra {n}"),
`onBackToPhrase`, `onContinue`, `continueDisabled`, `step` / `totalSteps`.

**8. Notes.** Inconsistent with step 1, where the primary action is disabled until the gate is satisfied: here it is
enabled despite a visible error. Which words are challenged (1, 5, 7, 10) is a design sample and should be
randomised at runtime. Validation appears to be per-field and immediate, but no debounce or on-blur behaviour is
specified. The "back" affordance changes shape between steps (footer `Voltar` button vs. centred text link).

---

## Cross-frame observations

- Steps 1-3 share a 3-dot progress indicator; step 0 has none, so it reads as a pre-flow choice rather than step 1 of 4.
- Only steps 0 and 1 have the grey SDS image placeholder; steps 2 and 3 have none — the illustration slot is optional.
- Dialogs are never dismissible (`dismissible = false` on all four), so no close button or escape path is designed.
- Every heading prop reported by Code Connect is the stale step-0 string; the canvas text is authoritative.
