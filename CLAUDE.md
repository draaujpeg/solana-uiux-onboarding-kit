# Solana UI/UX Onboarding Kit

An open-source kit that fixes the onboarding gaps found across 13 Solana apps.
Three pillars: [`docs/`](docs/) is the research, [`design-guidelines/`](design-guidelines/)
turns each diagnosed gap into a component, and [`skills/`](skills/) is the Claude
skill that applies those components inside someone else's product.

## Language

Talk to the user in Brazilian Portuguese, in plain words, explaining any term
that is not everyday language.

Everything committed is in English: code, component copy, documentation, commit
messages. The Figma source is in Portuguese and gets translated, never carried
over as is.

## Where the truth lives

- [`design-guidelines/decisions.md`](design-guidelines/decisions.md) is the rule
  of record for building components. **Read it before writing or changing one.**
- [`design-guidelines/specs/`](design-guidelines/specs/) describes the Figma
  source as it was read, defects included. It is descriptive, not prescriptive:
  where it and `decisions.md` disagree, `decisions.md` wins.
- [`design-guidelines/components/`](design-guidelines/components/) holds the PNG
  exports, one folder per pattern.

## Commands

Run these from the repository root. It is an npm workspace holding the demo app
and the component source, so one `npm install` covers both.

```bash
npx markdownlint-cli2   # must pass before committing any .md
npm run dev             # see the components running
npm run build           # compile and type-check, the checkpoint
npm run lint
npm run lint:tokens     # fails on any literal colour inside a component
npm run manifest        # regenerate after changing a component's imports
npm test                # the skill checks, then what the components do
npm run hooks           # install the pre-commit hook, once per clone
```

## Always

- Paint components only with the `--so-*` tokens from
  [`tokens.css`](skills/solana-onboarding/components/tokens.css). That token
  layer is what lets a copied component adopt the host product's brand.
- Run the build before calling a component done. CI runs it too.
- Work on a branch and commit per delivery. Changes reach `main` through a PR.

## Never

- Never write a literal colour, radius, spacing or font family inside a
  component. It defeats the token layer and it will not adapt.
- Never copy a component into `demo/`. The demo imports them from
  `skills/solana-onboarding/components/` deliberately, so the showroom and the
  installed file can never drift apart.
- Never ship a copy-to-clipboard control for the recovery phrase. Anything
  running on the machine can read the clipboard.
- Never use em dashes in prose.
- Never weaken a check to make it pass.
