# Spec 07 — Pre-action confirmation for irreversible actions

**Figma file:** `mw0jpUr7tX6uI4fozEQGnm`
**Frames:** `72:5514`, `72:5641`, `72:5750`, `72:5890`, `69:951`

> **SOURCE CAVEAT — read first.** The Figma MCP endpoints (`get_design_context`,
> `get_variable_defs`) returned a hard quota error on every attempt:
> *"You've reached the Figma MCP tool call limit on the Starter plan."* This is an
> account-plan cap, not a transient rate limit, so no node JSON and **no variable
> definitions could be retrieved**. This spec was therefore derived from the
> committed high-fidelity PNG exports of the exact same five frames, in
> `C:\Users\Matheus\projetos\SolanaUIUX\design-guidelines\components\07-pre-action-confirmation\`.
> Copy, structure, order, icons, states and relative colour are read directly off
> the renders and are reliable. **Numeric dimensions are measured from the raster
> and are approximate; Part D token names are inferred, not verified.**

---

## Part A — The risk ladder

### A.1 The additive assumption is only half true

The stated assumption was that each rung adds a friction layer *on top of* the
previous one. **The renders do not support a strictly cumulative ladder.** What
each rung actually does is **swap in one dominant evidence device** while keeping
the shared shell (icon → title → description → button row):

| Rung | Frame | Dominant device added | Devices from lower rungs retained |
|---|---|---|---|
| 1 low | `72:5514` | none — plain confirm | — |
| 2 medium | `72:5641` | summary table (4 rows) + amber warning callout | none new dropped |
| 3 high | `72:5750` | consequences list (3 red items) + red danger callout | **summary table dropped** |
| 4 critical | `72:5890` | type-to-confirm input + red danger callout | **summary table and consequences list both dropped** |

So the genuinely monotonic axes are (a) **callout severity**, (b) **amount of
required user work**, and (c) **whether the confirm button starts disabled** —
not the block count. Rung 4 is the *shortest* body of rungs 2-4.

### A.2 Severity / colour progression

| Rung | Callout | Callout bg | Callout border | Callout text | Body evidence colour |
|---|---|---|---|---|---|
| 1 | none | — | — | — | neutral grey body text |
| 2 | warning | pale yellow ≈ `#FDF9E7` | amber ≈ `#D4A72C` | dark amber/olive | neutral |
| 3 | danger | pale red ≈ `#FDE5E5` | red ≈ `#E5484D` | dark red ≈ `#A31515` | list items in red |
| 4 | danger | pale red ≈ `#FDE5E5` | red ≈ `#E5484D` | dark red ≈ `#A31515` | neutral (no list) |

Progression is neutral → warning → danger → danger. Rungs 3 and 4 share an
identical severity palette; the escalation from 3 to 4 is expressed purely
through the **required typed input**, not through colour.

### A.3 Button variants and labels

| Rung | Secondary (left) | Primary (right) | Primary style |
|---|---|---|---|
| 1 | `Cancelar` | `Confirmar envio` | dark neutral fill ≈ `#2C2C2C`, light text, enabled |
| 2 | `Cancelar` | `Confirmar swap` | dark neutral fill, enabled |
| 3 | `Cancelar` | `Fechar minha conta` | dark neutral fill, enabled |
| 4 | `Cancelar` | `Revogar acesso` | **grey fill ≈ `#C9C9C9`, grey text, disabled** |

**Notable inconsistency:** the primary CTA is the *same neutral dark button* on
rungs 1-3. It never becomes a red/destructive button, even on rung 3 ("Fechar
minha conta") where the whole body is red. The severity signal lives entirely in
the callout and list, never in the CTA. See Part F.

Secondary `Cancelar` is a borderless / ghost text button on all four rungs, left
of the primary, right-aligned pair.

### A.4 Rung 4 enable trigger

- Label: **`Para confirmar, digite REVOGAR abaixo`** — the token `REVOGAR` is
  rendered **bold** inline within an otherwise regular-weight sentence.
- The literal string to type is **`REVOGAR`** (uppercase, no quotes, no spaces).
- Input placeholder: `Digite aqui`.
- Case sensitivity is **not stated anywhere in the frame**. The design shows the
  target only in uppercase, so an uppercase-exact match is the faithful reading;
  a case-insensitive comparison is a defensible implementation choice but is
  *not* specified by the design.
- The frame captures only the **empty / disabled** state. No filled, valid,
  error, or focus state of the input is present in this frame set.

---

## Part B — Per-frame detail

Shared shell for all four modal rungs: white surface, corner radius ≈ 16px,
width ≈ 440px, uniform padding ≈ 24px on all sides, no visible header bar, no
close (×) affordance in the corner, no scrim/overlay drawn in the frame. The
grey canvas behind is the Figma page background, not a component scrim. Each
frame carries a small grey annotation caption *below* the modal — this is Figma
documentation text, **not part of the component**.

### B.1 `72:5514` — Irreversível - Confirmação Simples (rung 1, low)

- **Purpose:** cheap confirm before an ordinary irreversible on-chain send.
- **Stack (top → bottom):** paper-plane / send icon (24px, black outline) → title
  → 2-line description → button row. Icon→title ≈ 30px, title→body ≈ 13px,
  body→buttons ≈ 28px.
- **Copy:**
  - Title: `Confirmar envio?` → *"Confirm send?"*
  - Body: `Você está enviando 5 SOL para 7xKp...3mNz. Transações na Solana não podem ser desfeitas.` → *"You are sending 5 SOL to 7xKp…3mNz. Transactions on Solana cannot be undone."*
  - Buttons: `Cancelar` / `Confirmar envio` → *"Cancel" / "Confirm send"*
  - Caption (annotation): `baixo risco`
- **Interactive:** 2 buttons. Nothing else.
- **Icon:** send / paper plane, outline, ~24px, top-left of the content area.
- Contains a **truncated address** inline in the body: `7xKp...3mNz`.

### B.2 `72:5641` — Irreversível - Confirmação com Resumo (rung 2, medium)

- **Purpose:** review-then-confirm for a swap where the outcome is variable.
- **Stack:** shuffle/swap arrows icon → title → 2-line description → summary
  table → amber warning callout → button row.
- **Copy:**
  - Title: `Revisar e confirmar swap` → *"Review and confirm swap"*
  - Body: `Confira os detalhes antes de confirmar. Essa ação não pode ser desfeita.` → *"Check the details before confirming. This action cannot be undone."*
  - Buttons: `Cancelar` / `Confirmar swap` → *"Cancel" / "Confirm swap"*
  - Caption: `médio risco`
- **Summary table** — bordered container, radius ≈ 8px, full content width,
  4 rows separated by 1px hairlines, row height ≈ 47px, label left in grey,
  value right in bold black:

  | Label (PT) | Value | English label |
  |---|---|---|
  | `Você envia` | `50 USDC` | You send |
  | `Você recebe` | `0.351 SOL` | You receive |
  | `Taxa de rede` | `0.000005 SOL` | Network fee |
  | `Slippage máximo` | `0.5%` | Max slippage |

- **Warning callout:** triangle-exclamation icon + single paragraph, no bold
  heading. Text: `O valor final pode variar até 0.5% dependendo do preço no momento da confirmação.` → *"The final amount may vary by up to 0.5% depending on the price at the moment of confirmation."*
- **Interactive:** 2 buttons. Table rows are static (no expand/copy affordance).

### B.3 `72:5750` — Irreversível - Ação Destrutiva (rung 3, high)

- **Purpose:** permanent account closure; make the consequences legible before
  the user can act.
- **Stack:** trash-can icon → title → 2-line description → consequences list →
  red danger callout → button row.
- **Copy:**
  - Title: `Fechar esta conta?` → *"Close this account?"*
  - Body: `Isso é permanente. Antes de continuar, entenda o que vai acontecer:` → *"This is permanent. Before continuing, understand what will happen:"*
  - Buttons: `Cancelar` / `Fechar minha conta` → *"Cancel" / "Close my account"*
  - Caption: `alto risco`
- **Consequences list** — 3 items, each a red `×` glyph (~14px) at the left with
  hanging-indent red body text, ~12px between items:
  1. `Seu histórico de transações não estará mais acessível por aqui.` → *"Your transaction history will no longer be accessible here."*
  2. `Tokens na carteira não são afetados, mas você precisará de outro app para acessá-los.` → *"Tokens in your wallet are not affected, but you will need another app to access them."*
  3. `Posições abertas em protocolos DeFi continuam ativas e precisam ser encerradas manualmente.` → *"Open positions in DeFi protocols stay active and must be closed manually."*
- **Danger callout** — has a **bold heading + body**, unlike rung 2's single
  paragraph. Icon: circled `i` (info), red.
  - Heading: `Essa ação não pode ser desfeita` → *"This action cannot be undone"*
  - Body: `Encerre todas as posições abertas antes de continuar.` → *"Close all open positions before continuing."*
- **Interactive:** 2 buttons. Confirm is **enabled** — no extra gate at this rung.

### B.4 `72:5890` — Irreversível - Input Obrigatório (rung 4, critical)

- **Purpose:** revoke an app's wallet access; highest friction.
- **Stack:** `×` (close/cancel) icon → title → 3-line description → red danger
  callout → type-to-confirm label → text input → button row.
- **Copy:**
  - Title: `Revogar acesso à carteira` → *"Revoke wallet access"* (note: statement, not a question — rungs 1 and 3 use questions)
  - Body: `Você está prestes a remover o acesso deste app à sua carteira. Qualquer aprovação ativa será cancelada.` → *"You are about to remove this app's access to your wallet. Any active approval will be cancelled."*
  - Callout heading: `Essa ação não pode ser desfeita` → *"This action cannot be undone"*
  - Callout body: `Todas as aprovações automáticas serão canceladas imediatamente.` → *"All automatic approvals will be cancelled immediately."*
  - Confirm label: `Para confirmar, digite **REVOGAR** abaixo` → *"To confirm, type **REVOKE** below"*
  - Input placeholder: `Digite aqui` → *"Type here"*
  - Buttons: `Cancelar` / `Revogar acesso` → *"Cancel" / "Revoke access"*
  - Caption: `risco crítico`
- **Danger callout icon:** circled `×` (x-circle) — *different* from rung 3's
  circled `i`, despite identical colours and identical heading text.
- **Input:** full content width, height ≈ 38px, radius ≈ 8px, 1px light grey
  border, grey placeholder. No prefix/suffix, no character counter, no inline
  validation message shown.
- **Interactive:** 1 text input + 2 buttons; primary disabled in the captured state.

### B.5 Layout metrics summary (measured, approximate)

| Property | Rungs 1-4 modal | `69:951` card |
|---|---|---|
| Width | ≈ 440px | ≈ 640px |
| Padding | ≈ 24px | ≈ 24px |
| Corner radius | ≈ 16px | ≈ 16px |
| Inner block radius (table / callout / input) | ≈ 8px | ≈ 8px |
| Button height / radius | ≈ 36px / ≈ 8px | n/a |
| Block-to-block gap | ≈ 20-28px | ≈ 16-20px |

---

## Part C — `69:951` — Endereço de Destino (preventive address warning)

- **Position relative to the ladder:** it sits **before rung 1, not on the
  ladder**. It is not a modal and has no confirm/cancel pair — it is an inline
  form section that appears in the send flow *while the user is entering the
  destination*, i.e. prevention rather than confirmation. The annotation caption
  states the trigger explicitly: `aviso preventivo — aparece assim que o campo fica em foco` → *"preventive warning — appears as soon as the field gains focus"*. That makes it a **focus-triggered** disclosure.
- **Form factor:** wider card (≈640px) than the modals (≈440px), white, radius
  ≈16px, padding ≈24px. No icon in the header, unlike all four rungs.
- **Anatomy (top → bottom):**
  1. Section title `Para onde enviar?` → *"Where to send?"*
  2. Field label `Endereço da carteira de destino` → *"Destination wallet address"*
  3. Text input, full width, radius ≈8px, grey placeholder
     `Cole o endereço aqui (ex: 7xKp...3mNz)` → *"Paste the address here (e.g. 7xKp…3mNz)"*
  4. Neutral bordered callout (grey border, white fill — **not** amber, **not**
     red) containing:
     - circled `i` icon
     - Bold heading `Confira o endereço com atenção` → *"Check the address carefully"*
     - Body `Transações na Solana são irreversíveis. Um caractere errado envia para um endereço diferente — sem como desfazer.` → *"Transactions on Solana are irreversible. One wrong character sends to a different address, with no way to undo."*
     - Underlined text link `Como copiar o endereço correto?` → *"How do I copy the correct address?"*
- **Truncated address:** **no real truncated address is displayed.** The only
  occurrence of `7xKp...3mNz` is inside the input's *placeholder*, as a format
  example. The field is empty in this frame.
- **What it warns about:** irreversibility of Solana transfers and the fact that
  a single mistyped character silently routes funds to a different valid address.
- **Interactive:** 1 text input + 1 text link. No buttons.
- This is the only frame in the set with a **help link**, and the only one with a
  **neutral-severity callout**.

---

## Part D — `--sds-*` token union

**Tokens could not be retrieved.** `get_variable_defs` was quota-blocked on all
five nodes, and no token names appear anywhere in the repository (grep for
`--sds` / `sds-` over `C:\Users\Matheus\projetos\SolanaUIUX` returns nothing).
The list below is the **inferred** SDS default mapping from the measured pixel
values — treat every name as a hypothesis to be re-verified once the Figma quota
resets. Values are the measurements; names are the guess.

### Colour

| Measured value | Role in frames | Likely SDS token |
|---|---|---|
| `#FFFFFF` | modal / card surface | `--sds-color-background-default-default` |
| `#1E1E1E` | title, table values, callout headings | `--sds-color-text-default-default` |
| `#757575` | body copy, table labels, placeholders, captions | `--sds-color-text-default-secondary` |
| `#2C2C2C` | primary button fill (rungs 1-3) | `--sds-color-background-brand-default` |
| `#F5F5F5` | primary button label | `--sds-color-text-brand-on-brand` |
| `#C9C9C9` | disabled button fill (rung 4) | `--sds-color-background-disabled-default` |
| `#D9D9D9` / `#E3E3E3` | input + table borders, hairlines | `--sds-color-border-default-default` |
| `#FDF9E7` | rung 2 callout fill | `--sds-color-background-warning-tertiary` |
| `#D4A72C` | rung 2 callout border | `--sds-color-border-warning-default` |
| `#FDE5E5` | rung 3/4 callout fill | `--sds-color-background-danger-tertiary` |
| `#E5484D` | rung 3/4 callout border | `--sds-color-border-danger-default` |
| `#A31515` / `#C00` | danger text, `×` list glyphs | `--sds-color-text-danger-default` |

### Size / space

Radius ≈16px (surface) and ≈8px (inner blocks and buttons); padding 24px;
inter-block gaps in the 12 / 16 / 20 / 24 / 28px family; button height ≈36px;
input height ≈38px; icons 24px (header) and ~14-16px (inline/callout).
Likely `--sds-size-radius-200` / `-100`, `--sds-size-space-300…600`,
`--sds-size-icon-medium` / `-small`.

### Typography

Single sans family throughout (Inter-like, matching SDS default).

- Modal title: ~24px, semibold — likely `--sds-typography-title-hero` or `heading-base`
- Body / description: ~16px, regular, ~1.4 line-height — `--sds-typography-body-size-medium`
- Table label + value: ~16px, regular / bold — `body-size-medium` + `body-font-weight-strong`
- Callout heading: ~16px bold; callout body ~16px regular
- Button label: ~16px regular
- Annotation captions: ~14px, grey — Figma documentation only, not a component token

---

## Part E — React component shape

### E.1 Proposed props

```ts
type Risk = 'low' | 'medium' | 'high' | 'critical';

interface ConfirmationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  risk: Risk;                          // drives callout severity + which body slot renders
  icon?: React.ReactNode;              // send / swap / trash / x-circle — NOT derivable from risk
  title: string;
  description: string;
  /** rung 2 only */
  summary?: Array<{ label: string; value: string }>;
  /** rung 3 only */
  consequences?: string[];
  /** rungs 2-4; severity comes from `risk` */
  callout?: { heading?: string; body: string; icon?: React.ReactNode };
  /** rung 4 only — presence switches on the type-to-confirm gate */
  confirmPhrase?: string;              // e.g. 'REVOGAR'
  confirmPhraseLabel?: string;         // 'Para confirmar, digite {phrase} abaixo'
  confirmPhrasePlaceholder?: string;   // 'Digite aqui'
  caseSensitive?: boolean;             // default true; design does not specify
  confirmLabel: string;                // always bespoke: 'Confirmar envio', 'Revogar acesso', …
  cancelLabel?: string;                // default 'Cancelar'
  onConfirm: () => void | Promise<void>;
  loading?: boolean;                   // state not present in Figma; needed in practice
}
```

Derived, not props: confirm-button disabled state (`Boolean(confirmPhrase) && input !== confirmPhrase`), callout colour set, list glyph colour.

### E.2 One component or several?

**One component covers all four rungs.** The shell is genuinely identical —
same width, padding, radius, same icon/title/description header, same right-aligned
`Cancelar` + primary pair — and the three variable blocks (`summary`,
`consequences`, `confirmPhrase`) are mutually exclusive optional slots in a fixed
order. `risk` needs to drive only the callout palette; it should **not** be
allowed to imply which block renders, precisely because the ladder is not
cumulative (Part A.1) and a future rung-4 screen may well want a summary table too.

Recommended split: keep `ConfirmationDialog` as the single component, and factor
`<SummaryTable>`, `<ConsequenceList>`, `<SeverityCallout>` and
`<TypeToConfirmField>` as exported sub-components so callers can compose an
off-ladder combination via a `children` escape hatch.

**`69:951` must be a separate component.** It is not a dialog, has no
confirm/cancel, is a different width, is focus-triggered inline, and its callout
is neutral-severity with a help link. Model it as `<AddressFieldWithWarning>` (or
reuse `<SeverityCallout severity="neutral" link={…}>` inside a plain form field).

---

## Part F — Notes and inconsistencies

1. **Source integrity.** No Figma API data backs this spec — plan quota exhausted.
   Dimensions are raster measurements; token names in Part D are inferred. Re-run
   `get_design_context` + `get_variable_defs` on all five nodes before treating
   Part D as authoritative.
2. **The ladder is not additive.** Rung 3 drops rung 2's summary table; rung 4
   drops both the table and the consequences list. Only severity and required
   effort escalate monotonically. Either the frames are illustrative rather than
   compositional, or the family needs a documented rule for which blocks coexist.
3. **The destructive CTA is never red.** Rungs 3 and 4 use the same neutral dark
   primary button as rung 1. For an irreversible-action family this is the single
   most consequential gap — a danger button variant is conventional here and
   is missing.
4. **Callout icon drifts across rungs 3 and 4.** Identical heading text
   (`Essa ação não pode ser desfeita`), identical palette, but circled `i` on
   rung 3 and circled `×` on rung 4. Pick one.
5. **Rung 2's callout has no bold heading**, while rungs 3 and 4 do. The callout
   therefore has two structural shapes; the component needs `heading` optional.
6. **Rung 4's header icon is a bare `×`**, which reads as a dismiss control
   rather than a semantic icon — a collision risk with the (absent) close button.
7. **Title voice is inconsistent:** rungs 1 and 3 are questions
   (`Confirmar envio?`, `Fechar esta conta?`), rungs 2 and 4 are statements
   (`Revisar e confirmar swap`, `Revogar acesso à carteira`).
8. **Em-dashes present in copy** — `sem como desfazer` in `69:951` is preceded by
   an em-dash, and the annotation caption uses one too. The repo has an explicit
   "drop em-dashes" convention (commit `74c39cc`); reconcile at translation time.
9. **No case-sensitivity rule** is stated for the `REVOGAR` gate, and no filled /
   error / focus state of that input exists in the frame set.
10. **Missing states across the whole family:** no hover, focus, loading,
    success, or error states; no scrim/overlay; no close button; no mobile /
    narrow breakpoint. Mixed-locale strings remain (`swap`, `Slippage`, `DeFi`).
11. **No SDS lorem-ipsum placeholder text was found.** All copy in all five
    frames is real, purpose-written Portuguese. The only placeholder-like strings
    are legitimate input placeholders (`Digite aqui`,
    `Cole o endereço aqui (ex: 7xKp...3mNz)`) and the example address
    `7xKp...3mNz`, which is used consistently in both frames that mention one.
12. **Annotation captions** (`baixo risco`, `médio risco`, `alto risco`,
    `risco crítico`, `aviso preventivo — …`) are Figma documentation labels
    outside the card bounds. Do not ship them as component content.
