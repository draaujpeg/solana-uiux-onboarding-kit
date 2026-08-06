# Changelog

What changed between versions, newest first. The skill's version lives in the
`metadata` block of
[`SKILL.md`](skills/solana-onboarding/SKILL.md); this file explains what each one
means for someone who installed an earlier copy.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and
the project uses [semantic versioning](https://semver.org/): the first number
changes when a component's props change in a way that breaks an existing install,
the second when something is added, the third for fixes.

## [1.1.0] — 2026-08-06

### Added

- **Chapter 9, [the kit in the field](docs/field-audit.md).** The audit grid run
  against a product outside the original thirteen: a widely used, actively
  maintained open-source Solana wallet, read at a released version and left
  unnamed. Average severity 1.87 of 4, twelve items at 3 or above, two at 4.
  This closes the known limit recorded under 1.0.0.

### Changed

- **Question 14 of the audit grid** now asks whether a validation proves what it
  claims to, not whether one is present. The audit scored a naive Partial on a
  recovery phrase confirmation that looked thorough, until the paste handler
  showed the check could be satisfied from the clipboard. A pass the user
  believes is worse than no check.

### What the audit sent back, not yet acted on

- The clipboard prohibition holds, and now rests on better evidence than the
  study gave it. The audited product ships a copy control under the recovery
  phrase, beneath a well-written warning, which is what a rule has to survive to
  be worth stating absolutely.
- The pre-reveal warning in
  [pattern 01](skills/solana-onboarding/references/patterns/01-seed-phrase-education.md)
  is weaker than the audited product's version, which uses a concrete analogy,
  names the attack, and enforces a delay before the button works. To be revised
  in a release of its own, since it changes a component.

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
  study's findings. Closed after this release, in
  [chapter 9](docs/field-audit.md).
