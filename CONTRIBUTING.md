# Contributing

Thanks for your interest in the Solana UIUX Onboarding Kit. Contributions are welcome — from fixing a typo in the research to proposing a new design pattern or improving the Claude skill.

## Ways to contribute

- **Open an issue** to report a problem, question a finding, or suggest a pattern or component.
- **Open a pull request** to propose a concrete change (text, guidelines, components, or skill).
- **Fork and adapt** the material for your own product — that's what the license is for.

## Workflow

The `main` branch is protected: it cannot be pushed to directly. Every change goes through a pull request.

```bash
# 1. Create a branch off main
git checkout -b my-change

# 2. Make your changes, then commit
git add .
git commit -m "type: short description"

# 3. Push the branch and open a PR
git push -u origin my-change
gh pr create        # or open it on GitHub

# 4. Once checks pass, squash-merge the PR into main
```

When you open a PR, a [template](.github/pull_request_template.md) pre-fills the description — please keep its sections. Changes to `docs/`, `design-guidelines/`, or `skill/` automatically request review from the relevant owner (see [CODEOWNERS](.github/CODEOWNERS)).

## Commit conventions

Use a short, imperative summary, optionally prefixed with a type:

- `docs:` — research, documentation, or README changes
- `feat:` — a new pattern, component, or skill capability
- `fix:` — a correction
- `chore:` — tooling, config, or repository housekeeping

Prefer **squash merges** so each PR lands as a single, clean commit on `main`.

## Style

- Match the tone and structure of the existing content.
- Keep internal links relative and valid.
- Everything in the repository is in English.

## Repository structure

- `docs/` — the research synthesis (heuristic analysis) in chapters (GitBook source)
- `design-guidelines/` — design principles, patterns, and components
  - `design-guidelines/components/` — design tokens and UI components
- `skill/` — the Claude skill and its usage guide
- `getting-started.md` — the product's entry point
