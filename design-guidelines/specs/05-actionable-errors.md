# Spec 05 — Actionable error messages

Figma file `mw0jpUr7tX6uI4fozEQGnm`. Eight frames: six block alerts + two inline warnings.

> **Source caveat — read first.** The Figma MCP server returned a hard quota error
> (`You've reached the Figma MCP tool call limit on the Starter plan`) on every single
> call, for both `get_design_context` and `get_variable_defs`, across all eight nodeIds.
> No design context and **no variable definitions could be retrieved**. This spec was
> therefore derived from the committed PNG exports of the same eight frames in
> `C:\Users\Matheus\projetos\SolanaUIUX\design-guidelines\components\05-actionable-errors\`.
> All copy, structure, icon usage, button counts/labels/variants, error codes and
> severity assignments below are read directly off those renders and are reliable.
> All pixel values are **measured from the exports** (1440x1024 canvas, 1x) and are
> approximate. **Part C token names could not be verified** — see that section.

---

## Part A — Shared anatomy

### A.1 Block alert (frames 69:1127, 69:1482, 69:1513, 69:1563, 69:1596, 69:1696)

Constant skeleton, top to bottom:

| Slot | Spec (measured) | Constant? |
|---|---|---|
| Container | width **480**, height hugs (198 for the 3 simple ones, 198 KYC, 198 slippage — all ~198-256) | width constant |
| Radius | ~**12** | constant |
| Border | **1px solid**, severity-toned (stronger than the fill) | constant |
| Background | severity-toned tint, very light | constant |
| Padding | ~**24** left/right, ~**20** top, ~**16** bottom | constant |
| Header row | icon (16px) + title, `align-items: center`, gap ~**12**; close **X** pinned right | constant |
| Icon slot | 16x16 line icon, severity-coloured, left of title | present in all 6, glyph varies |
| Title | ~**16px / 600 weight**, dark severity tone (near-maroon on danger, near-olive on warning) | constant |
| Explanation | ~**16px / 400**, mid severity tone, 3 lines max, indented to the title's left edge (i.e. it clears the icon gutter) | constant |
| Detail block | optional; between explanation and actions | **varies** (2 of 6) |
| Action row | 1 or 2 buttons, left-aligned, gap ~**8** | count varies |
| Error code | **monospace**, ~**10-11px**, uppercase, letter-spaced, muted/desaturated severity tone, **bottom-left, below the action row**, its own line | constant, all 6 |

**Constant across all six**

- 480px fixed-width panel, 12px radius, 1px severity border, light severity fill.
- Icon + title header row, with a dismiss **X** at the top-right (danger-toned, ~16px), present in **all six**.
- Title is a plain-language *symptom* statement, never the machine code.
- Body explains cause and what happens next, in second person ("você / sua").
- Machine-readable error code, monospace, rendered last and visually demoted — clearly
  a copy-for-support affordance, not primary content.
- Actions are left-aligned (not right-aligned as in a dialog), and are inside the panel.
- No timestamp, no severity word ("Erro"/"Aviso") in the title, no expand/collapse.

**What varies**

1. **Severity.** Five frames are danger (red). `69:1696` slippage-exceeded is **warning (amber)** despite being a block alert.
2. **Icon glyph.** wifi-off (network), dollar-sign (funds), prohibited/ban (timeout), chain-link (wallet), and — see Part E — chain-link again for **both** KYC and slippage.
3. **Action count/variant.** 4 frames = one primary button. 2 frames (KYC, slippage) = secondary-outline **left** + primary **right**.
4. **Detail block.** KYC inserts a *reason list* (X-bullet lines). Slippage inserts a *two-row key/value comparison table* with a hairline rule between rows.
5. **Panel height** grows with the detail block (198 -> ~230-256).
6. **Secondary/link action:** **not present** in any block alert. There is no "Learn more" link in the six panels — the only non-button affordance is the dismiss X.

### A.2 Inline warning (frames 69:497, 69:840)

These are **not** the block alert at a smaller size — they are a different component.

| Slot | Spec (measured) | Constant? |
|---|---|---|
| Placement | inside a parent form card, directly under the field/row it qualifies | constant |
| Width | **fills the parent card's content width** (~591 inside a 640 card) | constant |
| Radius | ~**8** (smaller than the block alert) | constant |
| Border | **1px solid** severity | constant |
| Background | light severity tint | constant |
| Padding | ~**16** all round | constant |
| Icon | 16x16, severity-coloured, left of title | glyph varies |
| Title | ~**15-16px / 600**, severity dark tone | constant |
| Explanation | ~**15-16px / 400**, 2 lines | constant |
| Link action | **underlined text link**, severity-coloured, own line, ~**14-15px**, bottom-left | constant, both |
| Error code | **not present** | — |
| Close X | **not present** | — |
| Buttons | **not present** | — |

**Constant:** icon + title + body + one underlined text link; no dismiss, no buttons, no code.
**Varies:** severity (69:497 is **warning/amber**, 69:840 is **danger/red**) and icon
(triangle-alert vs dollar-sign). So "inline" is a *layout* variant, not a severity variant —
severity is orthogonal on both families.

Both inline frames sit under a grey annotation caption that is **documentation, not part of
the component**: "aviso aparece quando o valor ultrapassa o limite seguro" (69:497) and
"erro contextual — aparece antes da tentativa de envio" (69:840).

---

## Part B — Per frame

### 69:1127 — Erro de Rede

- **Purpose:** RPC/network unreachable; transaction could not be submitted.
- **Code:** `RPC_CONNECTION_FAILED`
- **Severity:** danger. **Icon:** wifi-off.
- PT title: "Sem conexão com a rede"
- PT body: "Não conseguimos processar sua transação agora. Isso costuma ser temporário — tente novamente em alguns segundos."
- EN: "No network connection" / "We couldn't process your transaction right now. This is usually temporary — try again in a few seconds."
- **Actions:** 1 primary danger button, "Tentar novamente" (EN "Try again"). Plus dismiss X.

### 69:1482 — Saldo Insuficiente

- **Purpose:** balance below amount + fee.
- **Code:** `INSUFFICIENT_FUNDS`
- **Severity:** danger. **Icon:** dollar-sign.
- PT title: "Saldo insuficiente"
- PT body: "Você tem 12.4 USDC, mas essa transação precisa de 50 USDC + taxa de rede. Adicione fundos e tente de novo."
- EN: "Insufficient balance" / "You have 12.4 USDC, but this transaction needs 50 USDC + network fee. Add funds and try again."
- **Actions:** 1 primary danger button, "Adicionar fundos" (EN "Add funds"). Plus dismiss X.
- Body interpolates three runtime values (held balance, required amount, token symbol).

### 69:1513 — Transação Rejeitada / Timeout

- **Purpose:** submitted but not confirmed in time; warns against double-spend retry.
- **Code:** `TRANSACTION_TIMEOUT`
- **Severity:** danger. **Icon:** prohibited / ban circle.
- PT title: "Transação não confirmada"
- PT body: "Sua transação foi enviada mas não confirmada a tempo. Verifique o histórico antes de tentar novamente para evitar duplicatas."
- EN: "Transaction not confirmed" / "Your transaction was submitted but wasn't confirmed in time. Check your history before retrying to avoid duplicates."
- **Actions:** 1 primary danger button, "Tentar novamente" (EN "Try again"). Plus dismiss X.
- Note: the body tells the user to check history but offers **no** "Ver histórico" action — see Part E.

### 69:1563 — Carteira Não Conectada

- **Purpose:** gate action behind wallet connection; reassures on key custody.
- **Code:** `WALLET_NOT_CONNECTED`
- **Severity:** danger. **Icon:** chain-link.
- PT title: "Carteira não conectada"
- PT body: "Para continuar, conecte sua carteira Solana. Suas chaves ficam no seu dispositivo — este app não tem acesso a elas."
- EN: "Wallet not connected" / "To continue, connect your Solana wallet. Your keys stay on your device — this app has no access to them."
- **Actions:** 1 primary danger button, "Conectar carteira" (EN "Connect wallet"). Plus dismiss X.

### 69:1596 — Erro de KYC / Documento

- **Purpose:** identity verification rejected, with itemised reasons.
- **Code:** `KYC_DOCUMENT_REJECTED`
- **Severity:** danger. **Icon:** chain-link (**wrong glyph** — see Part E).
- PT title: "Verificação não concluída"
- PT body: "Encontramos um problema com os documentos enviados. Veja os detalhes abaixo e tente novamente."
- **Reason list** (X-bullet, muted danger tone, ~14px):
  - "Foto do documento com baixa qualidade ou cortada."
  - "Selfie não corresponde à foto do documento."
- EN: "Verification not completed" / "We found a problem with the documents you submitted. See the details below and try again." + "Document photo is low quality or cropped." / "Selfie doesn't match the document photo."
- **Actions:** 2 — secondary outline **"Falar com suporte"** (EN "Contact support") on the left, primary danger **"Reenviar documentos"** (EN "Resubmit documents") on the right. Plus dismiss X.

### 69:1696 — Slippage Excedido

- **Purpose:** swap auto-cancelled because price moved past the configured tolerance.
- **Code:** `SLIPPAGE_TOLERANCE_EXCEEDED`
- **Severity:** **warning (amber)** — the only non-danger block alert. **Icon:** chain-link (**wrong glyph**).
- PT title: "Preço mudou durante o swap"
- PT body: "O preço se moveu além do limite que você configurou (0.5%). Sua transação foi cancelada automaticamente para te proteger."
- EN: "Price moved during the swap" / "The price moved beyond the limit you set (0.5%). Your transaction was cancelled automatically to protect you."
- **Detail table** (label left in muted amber, value right in bold dark amber, hairline rule between):
  - "Preço esperado" / "50 USDC"
  - "Preço no momento" / "0.000005 SOL"
- **Actions:** 2 — secondary outline **"Aumentar limite"** (EN "Increase limit") left, primary **amber** **"Tentar novamente"** (EN "Try again") right. Plus dismiss X (rendered in **red**, not amber — see Part E).

### 69:497 — Slippage Alto (inline warning)

- **Purpose:** live warning when the user types a slippage tolerance above the safe band.
- **Code:** not present.
- **Severity:** warning (amber). **Icon:** triangle-alert.
- Host card: "Configurar swap" / field label "Tolerância de variação (slippage)" / numeric input showing `5` with a `%` suffix adornment.
- PT title: "Slippage alto"
- PT body: "Com 5%, você aceita receber até 5% a menos do que o valor mostrado. Recomendamos entre 0.1% e 1% para a maioria das trocas."
- EN: "High slippage" / "At 5%, you accept receiving up to 5% less than the amount shown. We recommend between 0.1% and 1% for most swaps."
- **Action:** one underlined text link, "Por que isso acontece?" (EN "Why does this happen?"). No buttons, no dismiss.

### 69:840 — Saldo Insuficiente para Gas (inline warning)

- **Purpose:** pre-submit block — no SOL to pay the fee even though the transfer is in USDC.
- **Code:** not present.
- **Severity:** **danger (red)**, despite being an inline warning. **Icon:** dollar-sign.
- Host card: "Enviar tokens" with rows "Valor / 50 USDC" and "Taxa de rede / 0.000005 SOL".
- PT title: "SOL insuficiente para a taxa"
- PT body: "Você tem 0 SOL. É preciso de pelo menos 0.000005 SOL para pagar a taxa de rede, mesmo que a transferência seja em USDC."
- EN: "Not enough SOL for the fee" / "You have 0 SOL. You need at least 0.000005 SOL to pay the network fee, even though the transfer is in USDC."
- **Action:** one underlined text link, "Como consigo SOL?" (EN "How do I get SOL?"). No buttons, no dismiss.

---

## Part C — Tokens

**`get_variable_defs` returned a quota error for all eight nodes, so the `--sds-*` variable
names are NOT AVAILABLE and are not reproduced here — inventing them would be worse than
omitting them.** What follows is the observed *value* set measured off the exports, grouped
as requested, so the token binding can be filled in on a later run when quota resets.

### Colour — danger family (frames 1127, 1482, 1513, 1563, 1596, 840)

| Role | Observed |
|---|---|
| surface / background tint | very light warm red (~#FDE9E8) |
| border | mid red (~#F0A9A2), 1px |
| text, title | dark maroon (~#7A1414) |
| text, body | strong red (~#C21A12) |
| text, error code | desaturated muted red (~#C98B86) |
| icon, default | dark maroon, matches title |
| button primary background | saturated red (~#E30A0A) |
| button primary label | white |
| button secondary border/label | dark maroon on transparent |

### Colour — warning family (frames 1696, 497)

| Role | Observed |
|---|---|
| surface / background tint | pale cream (~#FDF8E3) |
| border | amber/ochre (~#C9A227), 1px |
| text, title | dark olive-brown (~#6B4E00) |
| text, body | brown-amber (~#7A5A0A) |
| text, error code | muted ochre |
| detail label / detail value | muted ochre / bold dark olive |
| button primary background | amber (~#E5C158) with dark olive label |

### Size / space (shared, both severities)

- block alert width 480; inline warning fills parent content width
- radius: block 12, inline 8, button ~6, input ~6
- padding: block 24 / 20 / 24 / 16; inline 16 all round
- gaps: icon-to-title ~12, title-to-body ~6, body-to-actions ~16, actions-to-code ~14, button-to-button ~8
- icon 16x16; dismiss X 16x16

### Typography

- title: ~16 / 600
- body: ~16 / 400, ~1.45 line-height
- detail list & detail table: ~14 / 400 (labels) and 14 / 600 (values)
- button label: ~14-15 / 600
- text link: ~14-15 / 400 **underlined**
- **error code: monospace, ~10-11, uppercase, positive letter-spacing** — the only monospace
  run in the whole family, and the strongest single signal that it is machine-readable

**Danger-specific vs warning-specific:** every colour token above is severity-scoped; every
size/space and typography token is shared. A single component can therefore switch severity
by swapping one colour group.

---

## Part D — React component surface

**One component with variants is enough for the six block alerts. A second component is
required for the inline warnings** — they have no code slot, no dismiss, no buttons, and a
link-only action, so folding them in would leave most props inert.

```ts
type Severity = 'danger' | 'warning';

interface ErrorAlertProps {
  severity: Severity;                 // default 'danger'
  icon: ReactNode;                    // 16px; caller supplies the glyph
  title: string;
  description: ReactNode;             // allows interpolated amounts/tokens
  code: string;                       // e.g. 'RPC_CONNECTION_FAILED' — rendered monospace
  reasons?: string[];                 // KYC: X-bulleted list
  details?: Array<{ label: string; value: string }>; // slippage: comparison rows
  primaryAction: { label: string; onClick(): void };
  secondaryAction?: { label: string; onClick(): void }; // outline, rendered LEFT of primary
  onDismiss?: () => void;             // renders the top-right X when provided
  className?: string;
}

interface InlineWarningProps {
  severity: Severity;                 // 'warning' (69:497) or 'danger' (69:840)
  icon: ReactNode;
  title: string;
  description: ReactNode;
  link?: { label: string; href?: string; onClick?(): void }; // underlined text link
  className?: string;
}
```

Notes for the implementer:

- `reasons` and `details` are mutually exclusive in the current designs; typing them as a
  discriminated union would be defensible but the designs do not require it.
- `code` should be selectable text and is a natural place for a copy-on-click affordance —
  **that affordance is not in the Figma**, so add it only if asked.
- Button order is DOM-order secondary-then-primary, matching the visual left-to-right.
- `severity` drives only colours; no layout differs between danger and warning.
- Both components should render as `role="alert"` (block) / `aria-live="polite"` (inline);
  **not specified in Figma** — an implementation decision.

---

## Part E — Notes and inconsistencies

1. **Icon reuse bug.** `69:1596` (KYC) and `69:1696` (slippage) both use the **chain-link**
   icon that belongs to `69:1563` (wallet not connected). Neither is semantically right —
   KYC wants a document/ID glyph, slippage wants a trend/percent glyph. Looks like a
   copy-paste leftover; three frames share one glyph.
2. **Dismiss X colour on the amber alert.** `69:1696` is fully amber except the top-right
   X, which is rendered in the **danger red**. Almost certainly unintended.
3. **Slippage detail table is nonsense data.** "Preço esperado 50 USDC" is compared against
   "Preço no momento 0.000005 SOL" — different tokens, and 0.000005 SOL is the *gas fee*
   value reused from `69:840`. The two rows are not comparable; real copy needs both values
   in the same unit.
4. **Timeout alert has a dangling instruction.** `69:1513` tells the user to check history
   before retrying, but only offers "Tentar novamente" — the "check history" path has no
   affordance. Either add a secondary action or reword.
5. **Two different "insufficient balance" errors** exist with different treatments:
   `69:1482` (block, `INSUFFICIENT_FUNDS`, button) and `69:840` (inline, no code, link).
   Both use the dollar-sign icon. Intentional split by moment (post-attempt vs pre-attempt),
   but the naming should be disambiguated in code.
6. **Severity is not aligned to family.** One block alert is warning; one inline warning is
   danger. Do not hard-code severity per component.
7. **Error codes confirmed verbatim** for all six block alerts, exactly as anticipated:
   `RPC_CONNECTION_FAILED`, `INSUFFICIENT_FUNDS`, `TRANSACTION_TIMEOUT`,
   `WALLET_NOT_CONNECTED`, `KYC_DOCUMENT_REJECTED`, `SLIPPAGE_TOLERANCE_EXCEEDED`.
   The two inline warnings carry **no** code.
8. **No SDS lorem-ipsum placeholder text was found** in any of the eight frames — all copy
   is real, localised Portuguese. The only non-component text is the two grey annotation
   captions under the inline frames (A.2).
9. Em-dashes ("—") appear in four of the eight bodies. The repo's recent history includes a
   commit "drop em-dashes"; the Figma copy has not been updated to match that convention.
10. **Outstanding work:** re-run `get_design_context` + `get_variable_defs` on all eight
    nodeIds once Figma quota resets, to replace the measured values in Part C with real
    `--sds-*` token names and to confirm exact paddings, radii and auto-layout directions.
