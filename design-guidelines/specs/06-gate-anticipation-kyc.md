# Spec 06 — Gate anticipation / KYC (4-step flow)

**Figma file:** `mw0jpUr7tX6uI4fozEQGnm`
**Frames:** `71:613`, `71:836`, `72:1022`, `72:1249`

> **Source caveat — read first.** The Figma MCP server returned a hard rate-limit error on every
> call (`Starter plan` tool-call cap) for both `get_design_context` and `get_variable_defs`, on all
> four nodes. This spec was therefore derived from the committed 1440x1024 PNG exports in
> `design-guidelines/components/06-gate-anticipation-kyc/`. All copy is verbatim from the renders.
> All measurements are read off the 1440-wide export and are **approximate to ~2px**. Section 8
> (`--sds-*` tokens) could **not** be retrieved — see that section.

---

## Shared shell (identical across all four frames)

- **Type:** centered modal / dialog over a flat light-gray page backdrop (`#D0D0D0`-ish). No page
  chrome, no header, no close (X) button on any frame.
- **Modal:** 640px wide, horizontally centered, white surface, corner radius ~16px, soft drop
  shadow (large blur, low opacity, slight y-offset). Height is content-driven: ~485 / ~461 / ~577 /
  ~573px for steps 1-4.
- **Padding:** 32px on all sides; inner content column is 576px.
- **Vertical rhythm:** step dots -> title -> subtitle -> content blocks -> footer actions.
  Block gaps ~24px, title-to-subtitle ~12px, subtitle-to-content ~24-32px.
- **Step indicator:** a row of **4 dots**, ~8px diameter, ~8px gap, centered, sitting ~16px below
  the modal's top padding edge. Active dot is near-black and filled; inactive dots are light gray.
  Active index advances 1 -> 2 -> 3 -> 4 across the frames. No labels, no connecting line, no
  numbers, no percentage.
- **Typography:** single sans stack (Inter-like). Title ~24px semibold, near-black, centered.
  Subtitle ~15-16px regular, muted gray, centered, wraps to 2 lines on steps 1 and 4.
- **Footer:** a two-slot action row, ~40px tall buttons, with the primary action right-aligned at
  ~280px wide and the secondary occupying the left half.

---

## Step 1 — `71:613` "KYC - Antecipação" (requirements preview)

### 1. Purpose

Shown **before** the user hits the withdrawal/transfer gate. It pre-announces the KYC requirement,
lists exactly what will be needed, states why it is required (legal), and reassures on data use.
Removes the friction of being blocked by a surprise wall mid-task and of starting an upload without
the documents at hand.

### 2. Layout

Modal 640px, height ~485px. Stack: dots -> title -> 2-line subtitle -> **1px full-width horizontal
divider** (light gray, spanning the 576px content column) -> 3-item requirement list -> reassurance
box -> footer. The divider is unique to this step.

### 3. Copy (all real copy; **no SDS lorem-ipsum placeholders on any of the four frames**)

| PT (verbatim) | Proposed EN |
| --- | --- |
| O que você vai precisar | What you'll need |
| Para liberar saques e transferências, precisamos confirmar sua identidade. É um processo padrão exigido por lei. | To unlock withdrawals and transfers, we need to confirm your identity. This is a standard process required by law. |
| Documento com foto (RG, CNH ou passaporte) | Photo ID (national ID, driver's license, or passport) |
| Uma selfie rápida para comparar com o documento | A quick selfie to match against the document |
| Boa iluminação e câmera desbloqueada | Good lighting and camera access enabled |
| Seus dados são usados só para verificação e não são compartilhados. | Your data is used only for verification and is never shared. |
| Agora não | Not now |
| Começar verificação | Start verification |

### 4. Requirement list

Three rows, **icon + single-line label only** — no per-item description, no checkmarks, no time
estimates. Icon ~16px, muted dark gray, left-aligned in a fixed gutter (~28px); label ~15px,
near-black. Row height ~38px. Items in order: document, selfie, lighting/camera (see table above).

### 5. Upload affordance

Not present on this step.

### 6. Interactive elements

Footer, left to right: **"Agora não"** — ghost / text-only, no border or fill, centered in the left
half; **"Começar verificação"** — primary, filled near-black (`#2A2A2A`-ish), white label, ~280px
wide, ~40px tall, radius ~8px, right-aligned. No links, no radios.

### 7. Icons

Document/file-text (requirement 1), camera (requirement 2), sun/brightness (requirement 3),
shield (reassurance box). All outline style, ~16px.

### 10. Notes

The reassurance box is a bordered container (1px light-gray border, radius ~8px, ~44px tall) with
shield icon + one line of ~13-14px text; it is *not* colored as an alert.

---

## Step 2 — `71:836` "KYC - Escolha e Upload do Documento"

### 1. Purpose

Collects the document type and the file itself in one screen. Removes friction by letting the user
pick the document they actually have and by stating format/size limits up front instead of failing
after upload.

### 2. Layout

Modal 640px, height ~461px (shortest of the four). Stack: dots -> title -> 1-line subtitle ->
3-across radio-card row -> upload dropzone -> footer. No divider.

### 3. Copy

| PT (verbatim) | Proposed EN |
| --- | --- |
| Envie seu documento | Upload your document |
| Escolha o tipo e envie uma foto nítida das duas faces, se houver. | Choose the type and upload a sharp photo of both sides, if applicable. |
| RG / CNH / Passaporte | National ID / Driver's license / Passport |
| Clique para fazer upload | Click to upload |
| JPG, PNG ou PDF · até 10 MB | JPG, PNG, or PDF · up to 10 MB |
| Voltar | Back |
| Continuar | Continue |

### 4. Status lists

Not present on this step.

### 5. Upload affordance

A single **dropzone card**: full 576px wide, ~148px tall, 1px light-gray border, radius ~8px, white
fill, no dashed stroke in the render. Contents stacked and centered: upload icon (~24px, tray with
up-arrow) -> bold ~15px label "Clique para fazer upload" -> ~13px muted hint
"JPG, PNG ou PDF · até 10 MB". Accepted formats: **JPG, PNG, PDF**; max size **10 MB**.
Only the **empty** state is drawn. Selected-file and error states are **not present** in Figma and
must be designed. The copy says "clique", so click-to-browse is the stated affordance; drag-and-drop
is not mentioned.

### 6. Interactive elements

**Radio card row**: three equal-width cards (~186px each, ~8px gap), ~44px tall, 1px border, radius
~8px, each containing a native-looking radio circle (~16px) + label. First card ("RG") is selected —
filled dark inner dot; the card's border is not visibly emphasized beyond that.
**Footer**: "Voltar" ghost/text-only on the left; "Continuar" primary on the right but rendered in
its **disabled** state (light-gray fill `#E0E0E0`-ish, mid-gray label) because no file is selected.

### 7. Icons

Upload tray/arrow (dropzone), three radio indicators. No other icons.

### 10. Notes

The disabled primary is the only place in the set where a button's disabled state is shown; it
confirms Continue is gated on file presence.

---

## Step 3 — `72:1022` "KYC - Em Análise" (under review)

### 1. Purpose

Post-submission holding state. Confirms receipt, sets an explicit expectation of how long review
takes and how the user will be told, and itemizes what has already landed. Removes the "did it go
through / do I need to sit here" anxiety.

### 2. Layout

Modal 640px, height ~577px. Stack: dots -> title -> 1-line subtitle -> **status panel** ->
**3-item vertical timeline**. There is **no footer / no buttons on this step**.

### 3. Copy

| PT (verbatim) | Proposed EN |
| --- | --- |
| Verificando seus dados | Verifying your details |
| Você já fez sua parte. Agora é com a gente. | You've done your part. We'll take it from here. |
| Análise em andamento | Review in progress |
| Estamos revisando os documentos enviados. Você receberá um e-mail assim que concluirmos. | We're reviewing the documents you sent. You'll get an email as soon as we're done. |
| Prazo estimado: até 24 horas | Estimated time: up to 24 hours |
| Documentos recebidos | Documents received |
| Frente e verso do RG enviados com sucesso. | Front and back of the ID uploaded successfully. |
| Selfie recebida | Selfie received |
| Foto aceita para comparação. | Photo accepted for matching. |
| Verificação em andamento | Verification in progress |
| Aguardando confirmação da equipe. | Waiting on our team's confirmation. |

### 4. Status list

Two distinct constructs:

**(a) Status panel** — bordered card, 576px wide, ~200px tall, 1px light-gray border, radius ~8px.
Centered stack: spinner glyph (~24px, radial tick spinner, mid-gray) -> bold ~15px "Análise em
andamento" -> ~14px muted 2-line description -> a clock icon + ~13px muted line
**"Prazo estimado: até 24 horas"** (the only stated duration in the flow).

**(b) Vertical timeline** — three items, each: an ~8px filled **dot** in a ~24px left gutter, a
bold ~15px near-black label, and a ~13-14px muted description underneath. Consecutive items are
joined by a thin vertical connector line running from the dot down to the next item. Dot color
carries state: items 1 and 2 are **green** (done), item 3 is **light gray** (pending). No
checkmarks, no per-item timestamps. Order: Documentos recebidos -> Selfie recebida ->
Verificação em andamento.

### 5. Upload affordance

Not present.

### 6. Interactive elements

**None.** This is a purely informational, non-dismissible state as drawn.

### 7. Icons

Radial spinner (panel), clock (ETA line), three timeline dots (not icons).

### 10. Notes

Because there is no button and no close control, the component needs an externally supplied exit
(auto-advance on poll, or a caller-provided dismiss).

---

## Step 4 — `72:1249` "KYC - Rejeição com Próximo Passo Acionável"

### 1. Purpose

Failure state that is explicitly actionable: it names each defect, tells the user exactly how to fix
it, discloses how many retries remain, and offers a human escape hatch. Removes the dead-end of a
generic "verification failed".

### 2. Layout

Modal 640px, height ~573px. Stack: dots -> title -> 2-line subtitle -> two **error cards** (~24px
gap) -> retry-count notice box -> footer with two buttons.

### 3. Copy

| PT (verbatim) | Proposed EN |
| --- | --- |
| Verificação não aprovada | Verification not approved |
| Encontramos problemas nos documentos enviados. Veja o que precisa ser corrigido: | We found problems with the documents you sent. Here's what needs fixing: |
| Foto do documento com baixa qualidade | Document photo is low quality |
| A imagem ficou borrada ou cortada. Tire a foto em superfície plana, com boa luz, sem reflexo. | The image is blurry or cropped. Take the photo on a flat surface, in good light, with no glare. |
| Selfie não corresponde ao documento | Selfie doesn't match the document |
| Certifique-se de estar com o rosto visível, sem óculos de sol ou boné, olhando para a câmera. | Make sure your face is visible, no sunglasses or cap, looking at the camera. |
| Você tem mais 2 tentativas. Após isso, entre em contato com o suporte. | You have 2 attempts left. After that, please contact support. |
| Falar com suporte | Talk to support |
| Reenviar documentos | Resubmit documents |

### 4. Status / error list

Two **error cards**, each 576px wide, ~96-104px tall, pale red fill (`#FDECEC`-ish), 1px red border,
radius ~8px, ~16px internal padding. Layout inside: ~16px red icon in a left gutter, then a bold
~15px dark-red title and a ~14px red 2-line remedy description. Each card pairs a **defect** with a
**fix instruction** — no severity chips, no timestamps, no per-item retry action.

Below them: a **neutral notice box** (white fill, 1px light-gray border, radius ~8px, ~44px tall)
with a refresh/retry-arrows icon + one line stating the remaining attempt count (**2**).

### 5. Upload affordance

Not present on this step — re-upload is delegated to the "Reenviar documentos" button, which should
route back to step 2.

### 6. Interactive elements

Footer, left to right: **"Falar com suporte"** — secondary, **filled light-gray** (`#EDEDED`-ish)
with dark label, ~280px wide (this is the only frame where the secondary is a filled button rather
than a ghost); **"Reenviar documentos"** — primary, filled near-black, white label, ~280px wide,
right-aligned. No links.

### 7. Icons

Image/picture-with-x (error card 1), camera (error card 2), circular refresh arrows (retry notice).

### 10. Notes

The step dots still show 4-of-4 active here, i.e. rejection is modeled as the terminal step of the
same progression rather than a branch off step 3.

---

## 8. Tokens used (`--sds-*`)

**Not retrievable.** `mcp__figma__get_variable_defs` failed with the Starter-plan rate-limit error on
all four nodes, so no variable names or values can be reported. Reporting invented `--sds-*` names
would be fabrication. What can be stated from the renders, as *observed values* only (not token
names), grouped as requested:

- **Color:** page backdrop light gray; surface white; text near-black for titles/labels, mid-gray
  for subtitles/descriptions; borders light gray; primary button fill near-black with white label;
  disabled button fill light gray with mid-gray label; secondary button fill lighter gray (step 4);
  danger surface pale red with red border and dark-red text; success green for completed timeline
  dots; neutral light gray for the pending dot and inactive step dots.
- **Size / spacing:** modal width 640; content column 576; padding 32; block gap ~24; button height
  ~40; primary button width ~280; radii ~16 (modal) and ~8 (cards, buttons, boxes); icon 16 for
  inline, 24 for hero (upload, spinner); step dot 8 with 8 gap.
- **Typography:** title ~24 semibold; subtitle ~15-16 regular; card/list title ~15 semibold; body and
  description ~14 regular; meta lines (formats, ETA, notice) ~13 regular. Single sans family.

**Action for whoever picks this up:** re-run `get_variable_defs` on `71:613`, `71:836`, `72:1022`,
`72:1249` once the Figma quota resets and fill this section in before authoring components.

---

## 9. Props a React component would need

**Composition recommendation:** one stateful orchestrator, `KycFlow`, holding `step` and submission
state, rendering four presentational step components. The four screens share the modal shell, the
dot indicator, the title/subtitle head, and the footer slot — that shell should be a single
`KycModalShell` used by all four. Do not build four independent modals.

```ts
type KycStep = 'requirements' | 'upload' | 'review' | 'rejected';
type DocType  = 'rg' | 'cnh' | 'passport';

// Shell
interface KycModalShellProps {
  step: number;          // 1-4, drives the dot indicator
  totalSteps?: number;   // default 4
  title: string;
  subtitle?: string;
  showDivider?: boolean; // true only on step 1
  children: React.ReactNode;
  footer?: React.ReactNode; // omitted on step 3
}

// Orchestrator
interface KycFlowProps {
  initialStep?: KycStep;
  requirements?: { icon: IconName; label: string }[]; // defaults to the 3 Figma items
  privacyNote?: string;
  documentTypes?: { value: DocType; label: string }[];
  accept?: string[];          // ['image/jpeg','image/png','application/pdf']
  maxSizeMb?: number;         // 10
  etaLabel?: string;          // 'Prazo estimado: até 24 horas'
  reviewSteps?: { label: string; description: string; status: 'done' | 'pending' }[];
  rejectionReasons?: { icon: IconName; title: string; remedy: string }[];
  attemptsRemaining?: number; // 2
  onDefer?(): void;           // 'Agora não'
  onStart?(): void;
  onBack?(): void;
  onSubmit?(file: File, docType: DocType): Promise<void>;
  onContactSupport?(): void;
  onResubmit?(): void;        // routes back to 'upload'
}
```

Internal state the orchestrator owns: `selectedDocType` (defaults to `rg`), `file`, `uploadError`,
and a derived `canContinue = Boolean(file)` that drives the disabled primary on step 2.

---

## 10. Cross-frame notes / oddities

1. **No `close` control anywhere.** None of the four frames has an X, an overlay-dismiss cue, or an
   Esc affordance. Dismissal must be added for accessibility (focus trap + Esc + labelled dialog).
2. **Step 3 has no buttons at all** — the only screen without a footer. It cannot be exited from
   within the component as drawn.
3. **Secondary button style is inconsistent**: ghost/text-only on steps 1 and 2, filled light-gray on
   step 4. Pick one before implementing, or make it an explicit `secondaryVariant` prop.
4. **Only the empty upload state exists.** Selected-file and upload-error states are not present in
   Figma and are the biggest gap for implementation.
5. **Rejection reuses the 4th dot** rather than branching, so the dot indicator is a step counter,
   not a success-path progress bar. `step` should be passed explicitly, not derived from outcome.
6. The dropzone border is solid, not dashed, and the label says "clique" — drag-and-drop is implied
   by the pattern but **not stated** in the design. Do not claim DnD in the copy unless it is built.
7. All copy is real Portuguese product copy; **no SDS lorem-ipsum placeholders appear on any frame.**
8. Only one duration is stated anywhere in the flow: "até 24 horas" on step 3.
