# Spec — Patterns 03 (Inline contextual help) & 04 (Inline glossary)

File: `mw0jpUr7tX6uI4fozEQGnm`. All three frames share ONE Figma component: **Tooltip** (node `67:2429`, keywords `toggletip, popover`).

> **Data-source caveat.** `get_design_context` + `get_variable_defs` succeeded for `69:427` only; the Figma MCP Starter-plan call limit was hit before `67:1848` and `67:2532` could be queried. Those two are specced from the 1440x1024 PNG exports committed at `design-guidelines/components/04-inline-glossary/*.png` (frame width 1440, exported 1x, so pixel readings below are direct). Measurements marked *(measured)* are from the PNG, not from Figma metadata.

---

## Shared component — Tooltip (`67:2429`)

Code Connect exposes these props on the instance in `69:427`:
`textTitle`/`title`, `booleanHasBody`/`hasBody` (true), `textBody`/`body`, `slotSlot`/`slot` (holds an `<ArrowRight />` icon), `variantPlacement`/`placement` = `"Top"`.

**Anatomy** (top to bottom): title (Body Strong 16/1.4) → body (Body Small 14/1.4) → link row = "Entenda mais" + right-arrow icon (16px, in `slot`). Container: white surface, 1px border, rounded, drop shadow, downward caret centred on the bottom edge.

| Property | Value |
|---|---|
| Background | `--sds-color-background-default-default` `#ffffff` |
| Border | `--sds-size-stroke-border` 1px, `--sds-color-border-default-default` `#d9d9d9` |
| Radius | `--sds-size-radius-400` = 16 |
| Padding | `--sds-size-space-300` = 12 (all sides) *(measured ~10-12)* |
| Gap between blocks | `--sds-size-space-0` = 0 / small; visually ~8 *(measured)* |
| Shadow | `Drop Shadow/200` — two stacked drop shadows, offset (0, 1), radius 4, spread 0, colors `--sds-color-black-100` `#0c0c0d0d` and `--sds-color-black-200` `#0c0c0d1a` |
| Width | ~320px in `69:427` and `67:1848`; ~320px in `67:2532` *(measured; no explicit max-width token exposed)* |
| Height | ~158px in `69:427` *(measured)*, content-driven |
| Caret | Solid triangle on the **bottom edge, horizontally centred**, ~16 wide x ~8 tall *(measured)*, same fill+border as body |
| Placement | Variant `Placement = Top` (tooltip sits above the trigger). Other variant values not observed. |
| Title color | `--sds-color-text-default-default` `#1e1e1e` |
| Body color | `--sds-color-text-neutral-default` `#303030` |
| Link color | Blue *(measured, ~`#2563eb`); no `--sds-*` blue variable was returned for this node* |

A thin full-width horizontal rule sits between title and body **only** in `67:1848` *(measured)*; it is absent in `69:427` and `67:2532`. Possibly a divider sub-element, possibly a background artifact — verify before implementing.

---

## Frame `69:427` — Tooltip (pattern 03, standalone)

**Purpose.** The bare tooltip surface in isolation, no trigger. This is the spec/preview artboard for the popover itself.

**Anatomy.** Frame background `--sds-color-background-neutral-secondary` `#cdcdcd`, flex column, centered, `gap: 32`. Children: the Tooltip instance, then a caption label. **No trigger element is present in this frame.**

**Copy.**

| PT (verbatim) | Proposed EN |
|---|---|
| `Slippage (tolerância de variação)` | Slippage (price-variation tolerance) |
| `A diferença máxima que você aceita entre o preço mostrado e o preço final. Quanto maior, mais rápido — mas você pode receber menos.` | The maximum difference you accept between the price shown and the final price. Higher means faster — but you may receive less. |
| `Entenda mais` | Learn more |
| `visualização do tooltip` (caption, 14px, `--sds-color-text-default-secondary` `#757575`) | tooltip preview — **annotation, not product UI** |

Glossary term exemplified: **Slippage**.

**Stale prop values (not rendered).** Code Connect reports `textTitle="Title"` and a `textBody` containing a flattened dump of the *other* frame's content: `"Você vai pagar uma taxa de rede / Jargão / Taxa de rede (gas fee) / Um valor pequeno pago aos validadores que processam sua transação. Na Solana, costuma ser menos de R$0,01. / Entender mais / estimada de 0.000005 SOL. O valor final pode variar levemente dependendo da rede."` These are component-default / detached values — the canvas renders the Slippage copy. Note the default says **"Entender mais"** while every rendered instance says **"Entenda mais"** — pick one.

No SDS lorem-ipsum placeholders in the rendered content; `"Title"` in the default props is the only SDS-style placeholder.

---

## Frame `67:1848` — Termo em Texto Corrido (pattern 04, term in running body copy)

**Purpose.** Define an unfamiliar term the first time it appears inside a sentence, without breaking reading flow or pushing the user off the screen.

**Anatomy.** A white card (radius ~16, padding ~24, shadow) containing a heading (`Rev…`, truncated behind the tooltip in the export — likely "Revisar"/"Revisão"; **cannot confirm**) and a body paragraph. The Tooltip floats above, `Placement = Top`, caret pointing down at the marked term; left edge of the tooltip is roughly aligned near the term, not centred on it *(measured)*.

**Copy.**

| PT (verbatim) | Proposed EN |
|---|---|
| Body: `Você vai pagar uma taxa de rede estimada de 0.000005 SOL. O valor final pode variar levemente dependendo da rede.` (`taxa de rede` is the trigger; `0.000005 SOL.` is bold) | You'll pay an estimated network fee of 0.000005 SOL. The final amount may vary slightly depending on the network. |
| Tooltip title: `Taxa de rede (gas fee)` | Network fee (gas fee) |
| Tooltip body: `Um valor pequeno pago aos validadores que processam sua transação. Na Solana, costuma ser menos de R$0,01.` | A small amount paid to the validators that process your transaction. On Solana it's usually under R$0.01. |
| Link: `Entenda mais` | Learn more |
| Caption: `clique no termo sublinhado para abrir o tooltip` | click the underlined term to open the tooltip — **annotation, not product UI** |

Glossary term exemplified: **Taxa de rede / gas fee**.

---

## Frame `67:2532` — Termo em Linha de Campo (pattern 04, term in a field/label row)

**Purpose.** Same definition affordance, but for a key-value summary row (swap details) where the label is a term of art and there is no sentence to underline.

**Anatomy.** A white card (radius ~16, shadow) containing a stack of label/value rows separated by hairline dividers. Value column right-aligned and bold-ish; label column left, secondary grey. Visible rows *(measured; two labels are covered by the tooltip in the export)*:

- `[label hidden]` → `0.5%` (almost certainly the Slippage row)
- `[label hidden]` → `Alta` ("High")
- `Impacto de preço` + info icon → `< 0.01%`

The Tooltip floats above the `Impacto de preço` row, `Placement = Top`, caret pointing down at the icon.

**Copy.**

| PT (verbatim) | Proposed EN |
|---|---|
| Row label: `Impacto de preço` | Price impact |
| Row values: `0.5%`, `Alta`, `< 0.01%` | 0.5%, High, < 0.01% |
| Tooltip title: `Impacto de preço (price impact)` | Price impact |
| Tooltip body: `O quanto o seu swap vai mover o preço do token. Transações grandes em pools pequenos têm impacto maior.` | How much your swap will move the token's price. Large trades in small pools have a bigger impact. |
| Link: `Entenda mais` | Learn more |
| Caption: `passe o cursor por cima do termo com ícone para abrir o tooltip` | hover the term with the icon to open the tooltip — **annotation, not product UI** |

Glossary term exemplified: **Impacto de preço / price impact**.

---

## 4. Trigger integration — body text vs field row

| | `67:1848` running text | `67:2532` field row |
|---|---|---|
| Marker | The term itself, **underlined**, inline in the sentence | Plain label text, **no underline** |
| Icon | None | Info circle `ⓘ`, ~16px, outline style, immediately after the label with ~6-8px gap *(measured)* |
| Color | Term appears in the normal body color with a visible underline (reads as a link affordance); slight blue cast in the export | Label stays secondary grey `#757575`; icon same grey |
| Position | Mid-sentence, flows with the text; tooltip anchors to the term's box | Start of the row, left-aligned; tooltip anchors to the icon |
| Interaction (per caption) | **click** | **hover** |
| Typography | Inherits Body ~16/1.4 from the paragraph | Row label ~16, secondary color |

So the same tooltip has two distinct trigger variants: `underline` (inline word) and `icon` (label adornment), with different default open behaviour.

---

## 5. Tokens used (from `get_variable_defs` on `69:427`)

**Color**

- `--sds-color-background-default-default` `#ffffff` — tooltip surface
- `--sds-color-background-neutral-secondary` `#cdcdcd` — artboard backdrop only
- `--sds-color-border-default-default` `#d9d9d9` — tooltip border
- `--sds-color-text-default-default` `#1e1e1e` — title
- `--sds-color-text-neutral-default` `#303030` — body
- `--sds-color-text-default-secondary` `#757575` — caption / secondary label
- `--sds-color-black-100` `#0c0c0d0d`, `--sds-color-black-200` `#0c0c0d1a` — shadow layers

**Size / space**

- `--sds-size-stroke-border` `1`
- `--sds-size-space-0` `0`, `--sds-size-space-300` `12`
- `--sds-size-radius-400` `16`
- `--sds-size-depth-0` `0`, `--sds-size-depth-025` `1`, `--sds-size-depth-100` `4` (shadow geometry)

**Typography**

- `--sds-typography-body-font-family` `Inter`
- `--sds-typography-body-size-medium` `16`, `--sds-typography-body-size-small` `14`
- `--sds-typography-body-font-weight-strong` `600`, `--sds-typography-body-font-weight-regular` `400`
- Composite styles: `Body Strong` (Inter SemiBold 16/1.4, ls 0) — title; `Body Small` (Inter Regular 14/1.4, ls 0) — body & caption
- Composite effect: `Drop Shadow/200`

No blue link token was returned — the "Entenda mais" color is currently a raw hex, not a variable. Flag as a token gap.

---

## 6. Inferred React props

```ts
type GlossaryTooltipProps = {
  term: string;                       // "taxa de rede" / "Impacto de preço" — the trigger text
  title: string;                      // "Taxa de rede (gas fee)" — tooltip heading
  definition: string;                 // body copy
  hasBody?: boolean;                  // maps to Figma booleanHasBody; title-only tooltip when false
  learnMoreHref?: string;             // renders the "Entenda mais →" row; omit to hide
  learnMoreLabel?: string;            // default "Entenda mais"
  placement?: 'top' | 'bottom' | 'left' | 'right';  // Figma exposes Placement; only "Top" observed
  trigger?: 'underline' | 'icon';     // 67:1848 vs 67:2532
  triggerOn?: 'hover' | 'click';      // captions imply click for underline, hover for icon
  icon?: ReactNode;                   // Figma `slot`; currently ArrowRight in the link row
  maxWidth?: number;                  // ~320 observed
};
```

For accessibility the icon variant needs an accessible name (the row label alone is not enough) and, since Figma names the component a *toggletip*, the click variant should render as a `<button>` with `aria-expanded`, not a passive `title`.

## 7. Notes / oddities

- **Hover vs click are both specified, by trigger type**, only via the grey annotation captions under each frame — not via Figma variants. The component itself has no interaction property.
- **No "?" badge and no "!" badge variant exists.** The only icon in the file is an outline info circle `ⓘ` (field-row trigger) and a right-arrow in the link row. Do not invent a `?`/`!` pair.
- **`Placement` variant exists but only `Top` is used** across all three frames. Bottom/left/right variants were not inspected (rate limit) — assume they exist but are unverified.
- **Copy inconsistency:** component default says `Entender mais`, all rendered instances say `Entenda mais`.
- **Frame 03 has no trigger at all** — it is a preview board. Pattern 03 ("inline contextual help") therefore has no distinct trigger design of its own in this file; it reuses the pattern-04 triggers.
- The tooltip **overlaps and obscures** the card it belongs to in both pattern-04 exports (it covers the card's heading in `67:1848` and two label rows in `67:2532`). Real implementation needs collision/flip logic; the Figma frames do not model it.
- Both pattern-04 tooltips are left-anchored near their trigger rather than centred on it, while the caret is drawn centred on the tooltip's own bottom edge — so in `67:1848` the caret does not point exactly at the underlined word. Treat the caret as offset-positionable, not fixed-centre.
- The horizontal rule under the title in `67:1848` only (see shared anatomy) is unconfirmed.
