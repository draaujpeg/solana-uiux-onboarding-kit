# Changelog

What changed between versions, newest first. The skill's version lives in the
`metadata` block of
[`SKILL.md`](skills/solana-onboarding/SKILL.md); this file explains what each one
means for someone who installed an earlier copy.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and
the project uses [semantic versioning](https://semver.org/): the first number
changes when a component's props change in a way that breaks an existing install,
the second when something is added, the third for fixes.

## [1.0.0] — 2026-07-22

First complete version. The research, the components, and the skill that applies
them are all in place and installable.

### The skill

- A router `SKILL.md` that reads what the user brought, an error string or a
  broad request, rather than what they named, and loads one reference per task.
- Two modes: an **audit** that scores an onboarding flow against the thirty
  questions from the research, and an **implement** that proposes copy, waits for
  the user, and writes the component into their project.
- Seven pattern references, a risk-classification procedure, the custody paths, a
  from-error-to-component lookup, a glossary, and the copy rules, each grounded in
  what the study measured.
- A generated component manifest, so an install copies a component and everything
  it needs rather than one file that will not build.

### The components

- Twenty-one copy-in components across the seven patterns: actionable errors,
  pre-action confirmation, seed phrase education with import, gate anticipation,
  inline glossary, and the post-onboarding welcome.
- A semantic token layer. Components paint only with `--so-*` variables, which
  read the host project's shadcn/ui tokens first, so a copied component adopts the
  product's brand. Dark mode follows the product, not the operating system.

### Distribution

- Installable with `npx skills add draaujpeg/solana-uiux-onboarding-kit`, or the
  `install.sh` script with `--project`, `--path` and `--link`.

### Known limits

- Copy is proposed in English for the components; the skill translates per
  product.
- The audit has not yet been run against a live product to compare with the
  study's findings.
