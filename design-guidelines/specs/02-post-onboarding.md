# Spec 02 — Post-onboarding empty states

File: `mw0jpUr7tX6uI4fozEQGnm`. Both frames are 1440x1024 desktop artboards. Both are **modal
dialogs (SDS `Dialog` + `Dialog Body`) centered over a scrim**, not in-page empty states. The
"app chrome" behind them is a flat screenshot bitmap (solana.com PT page / orca.so/pools),
blurred by the scrim — there is no real nav, balance header or tabs to build.

Shared shell (identical in both frames):

- Scrim: full-viewport flex column, center/center, `bg rgba(20,20,20,0.8)`, `backdrop-blur 16px`
  (`--sds-size-depth-800` used as blur value).
- Dialog Body card: white bg, 1px border `#d9d9d9`, radius 16 (`--sds-size-radius-400`),
  padding 32 (`--sds-size-space-800`), `max-width 600`, `width 100%`, gap 24
  (`--sds-size-space-600`), Drop Shadow/400 (two-layer).
- Inner "Slot": flex column, gap 24, full width.
- Separator: SDS `Menu Separator` — 1px rule `#d9d9d9`, padding-y 8, padding-x 0.
- Step rows: SDS `Card` (variant Default / Horizontal), each holding one numbered item:
  29x29 circle `--sds-color-background-neutral-default #5a5a5a`, radius full, number in
  Body Base 16 / `#f3f3f3`; gap 10 to the text block; text block gap 8 with
  Heading 24/600/-0.48px `#1e1e1e` + Body 16/400/1.4 `#757575`.
- Button Group: row, gap 16, both buttons `flex 1` (Align = Justify), padding 12, radius 8,
  label Single Line/Body Base 16.

---

## Frame `65:4619` — Empty State - Wallet

1. **Purpose** — Shown right after wallet creation: the wallet exists but has zero balance.
   Explains what the wallet is for and pushes the user to fund it.
2. **Layout structure** — Modal card (shared shell above). Vertical stack:
   image banner 160px tall (full width) → title+subtitle text block (gap 12, center aligned) →
   Menu Separator → step card 1 → step card 2 → step card 3 → Button Group. No real app chrome.
3. **Copy** (all real, no lorem ipsum in the rendered slot):
   - `Sua carteira está pronta` → "Your wallet is ready"
   - `Aqui você guarda e movimenta seus tokens na Solana. Para começar, você precisa adicionar fundos.`
     → "This is where you hold and move your tokens on Solana. To get started, you need to add funds."
   - `1` / `Adicione fundos` → "Add funds";
     `Transfira SOL ou outro token de uma exchange para o endereço desta carteira.`
     → "Transfer SOL or another token from an exchange to this wallet's address."
   - `2` / `Explore apps` → "Explore apps";
     `Com saldo, você pode usar protocolos DeFi, comprar NFTs e muito mais.`
     → "With a balance you can use DeFi protocols, buy NFTs and much more."
   - `3` / `Guarde sua frase de recuperação` → "Store your recovery phrase";
     `Se ainda não anotou, faça isso agora. Sem ela, não há como recuperar o acesso.`
     → "If you haven't written it down yet, do it now. Without it there is no way to recover access."
   - Buttons: `Ver endereço` → "View address"; `Como adicionar fundos` → "How to add funds".
   - **SDS placeholder copy (do not ship):** the Code Connect layer of the Dialog still carries
     `textHeading="Como você quer proteger sua carteira?"`, `textBody="Body text"` and the SDS Card
     default `"Body text for whatever you'd like to say. Add main takeaway points, quotes,
     anecdotes, or even a very very short story."` / `"Title"`. None of these render.
4. **Next-step actions** — Two side-by-side buttons, equal width, last block of the card:
   1. `Ver endereço` — secondary/Neutral (bg `#e3e3e3`, border `#767676`, text `#1e1e1e`).
   2. `Como adicionar fundos` — primary/Brand (bg + border `#2c2c2c`, text `#f5f5f5`).
   The three numbered cards are informational only — `button` prop is true on the Card component
   but no button renders inside them.
5. **Placeholder art** — Top of the card, full width, height 160. Fill `--sds-color-slate-200`
   `#e3e3e3` with the SDS "image" glyph centered at 20% opacity. This is the SDS image-placeholder,
   i.e. the slot intended for the client's own banner art. It is a *placeholder*, not real art.
6. **Icons** — Only the SDS image-placeholder glyph inside the banner, plus the three numeric
   badges (1/2/3 as text, not icons). Buttons have `hasIconStart`/`hasIconEnd` = false. No other icons.
7. **Tokens used**
   - color: `--sds-color-slate-200`, `--sds-color-background-default-default`,
     `--sds-color-background-neutral-default`, `--sds-color-background-neutral-tertiary`,
     `--sds-color-background-brand-default`, `--sds-color-border-default-default`,
     `--sds-color-border-neutral-secondary`, `--sds-color-border-brand-default`,
     `--sds-color-text-default-default`, `--sds-color-text-default-secondary`,
     `--sds-color-text-neutral-on-neutral`, `--sds-color-text-brand-on-brand`,
     `--sds-color-black-100`, `--sds-color-black-200`.
   - size: `--sds-size-space-0/200/300/400/600/800`, `--sds-size-padding-sm`,
     `--sds-size-radius-200/400/full`, `--sds-size-stroke-border`,
     `--sds-size-depth-0/100/400/800/negative-100`.
   - typography: `--sds-typography-heading-{font-family,font-weight,size-base}`,
     `--sds-typography-subheading-{font-family,font-weight,size-medium}`,
     `--sds-typography-body-{font-family,font-weight-regular,size-medium}`;
     styles Heading, Subheading, Body Base, Single Line/Body Base, Drop Shadow/400.
8. **Props a React component would need** — `open`, `onDismiss` (dismissible is false in Figma,
   so likely omit a close button), `bannerSrc` / `bannerAlt` (the 160px art slot),
   `title`, `description`, `steps: { number, title, description }[]`,
   `primaryAction: { label, onClick }`, `secondaryAction: { label, onClick }`.
9. **Notes / oddities** — Dialog is `dismissible={false}`, so there is no X / close affordance.
   Title+subtitle are center-aligned while the step rows are left-aligned. Step badges are 29px
   (odd, non-token value) and the badge-to-text gap is a raw 10px, not a space token.
   The stale `textHeading` "Como você quer proteger sua carteira?" suggests this frame was
   duplicated from a wallet-protection dialog.

---

## Frame `67:1347` — Empty State - DeFi

1. **Purpose** — First visit to a third-party DeFi app (background is orca.so/pools) with a wallet
   already created but not connected. Introduces the app, explains what it does, and drives to
   connecting the wallet.
2. **Layout structure** — Same modal shell. Vertical stack: brand header card (logo 64x64 + name +
   category, horizontal, gap 24, text gap 4) → centered title+subtitle block (gap 12) →
   left-aligned app description paragraph → Menu Separator → step card 1 → step 2 → step 3 →
   Button Group. Note the Dialog here is absolutely positioned at 1440x1024. No real app chrome.
3. **Copy** (all real; no lorem ipsum present in this frame):
   - `Bem-vindo a [Nome]` → "Welcome to [Name]" — `[Nome]` is an intentional interpolation slot.
   - `Exchange descentralizada · Solana` → "Decentralized exchange · Solana"
   - `Sua carteira está pronta` → "Your wallet is ready"
   - `Aqui você guarda e movimenta seus tokens na Solana. Para começar, você precisa adicionar fundos.`
     → "This is where you hold and move your tokens on Solana. To get started, you need to add funds."
   - `Troque tokens e forneça liquidez diretamente na Solana. Sem intermediários, sem conta obrigatória.`
     → "Swap tokens and provide liquidity directly on Solana. No middlemen, no mandatory account."
   - `1` / `Conecte sua carteira` → "Connect your wallet";
     `Phantom, Solflare ou qualquer carteira Solana compatível.`
     → "Phantom, Solflare or any compatible Solana wallet."
   - `2` / `Escolha os tokens` → "Choose the tokens";
     `Selecione o que você quer trocar e quanto.` → "Select what you want to swap and how much."
   - `3` / `Confirme na carteira` → "Confirm in your wallet";
     `A transação vai aparecer para você aprovar antes de ser enviada.`
     → "The transaction will appear for you to approve before it is sent."
   - Buttons: `Saiba mais` → "Learn more"; `Conectar carteira` → "Connect wallet".
4. **Next-step actions** — Two equal-width buttons at the bottom:
   1. `Saiba mais` — secondary/Neutral (same styling as wallet frame).
   2. `Conectar carteira` — primary/Brand.
   Step cards are informational only.
5. **Placeholder art** — No 160px banner. Instead a 64x64 square named `Logo` at the top-left of
   the header row, filled `--sds-color-slate-200` `#e3e3e3` with the SDS image glyph at 20%
   opacity. So yes: the DeFi variant's art slot is the brand/app logo, and it is currently the SDS
   placeholder, not a real logo. Note it is square (no radius applied).
6. **Icons** — Only the SDS image-placeholder glyph inside the 64px logo box, plus the 1/2/3
   numeric badges. No other icons, no icons in buttons.
7. **Tokens used** — Same set as the wallet frame, minus the standalone banner usage and plus
   `--sds-size-space-100` (4, header text gap). Color / size / typography groupings are otherwise
   identical to section 7 above.
8. **Props a React component would need** — `appName`, `appCategory` (subtitle line),
   `appLogoSrc` / `appLogoAlt`, `title`, `description`, `appDescription` (the left-aligned
   paragraph), `steps: { number, title, description }[]`, `primaryAction`, `secondaryAction`,
   `open`. Effectively the same component as the wallet one with an optional `header` slot and an
   optional `banner` slot — one component with two configurations is viable.
9. **Notes / oddities** — Content mixes alignments: header left, title block center, app
   description left. The `Sua carteira está pronta` / `Aqui você guarda...` block is copy-pasted
   verbatim from the wallet frame and reads oddly here (it talks about adding funds while the CTA
   is "connect wallet") — flag for copy review. `[Nome]` must be replaced at runtime. As in the
   wallet frame: not dismissible, 29px badges, raw 10px badge gap.
