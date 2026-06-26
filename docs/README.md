---
description: >-
  A quick synthesis of why Solana protocols struggle with user onboarding, and a
  guide to solving it and applying the fix in your own project.
---

# Solana UI/UX Onboarding Kit

Solana wants mass adoption, but it was built by and for people who already master its rules: seed phrases, self-custody, the irreversibility of every transaction. For someone arriving from Web2, the entry point is either full of friction or simply missing. That is where most newcomers give up, long before they ever reach the product.

Onboarding, though, is a design problem before it is a technical one. How an app explains, guides, and protects a first-time user is what decides whether they cross the border between curiosity and adoption, and, in a context of irreversible actions, between protecting themselves and losing funds.

So we put it to the test. This document is a heuristic analysis of how 13 Solana apps welcome, or fail to welcome, a beginner. The failures repeated enough to become patterns; that finding is what turned a study into a project: an open source kit to fix onboarding at the ecosystem level, not app by app.

The research draws on 390 evaluated items: 13 apps from the Solana ecosystem, each assessed across 30 items under the Nielsen heuristic protocol, in which 10 heuristics are examined through 3 questions each. The resulting averages range from 0.53, set by Tangem as the benchmark, to 4.00 for Orca and Kamino, where an entry layer is altogether absent. Together they form a snapshot of the market in the first half of 2026.

## Summary

| # | Chapter | What it covers |
|---|---------|----------------|
| 1 | [Introduction](introduction.md) | The problem we investigate, and why it is above all an adoption problem. |
| 2 | [How the analysis was conducted](methodology.md) | The evaluation protocol, the severity scale, and the impact types. |
| 3 | [The overall landscape](landscape.md) | The 13 apps, their scores, and the three maturity tiers. |
| 4 | [Recurring patterns](recurring-patterns.md) | The four gaps that reappear across almost every protocol, plus a fifth pattern. |
| 5 | [Where risk becomes a block](critical-issues.md) | The concentration of critical items and the cases of financial risk. |
| 6 | [What stood out the most](key-observations.md) | The readings that reorient the project. |
| 7 | [From diagnosis to design system](conclusion.md) | Mapping each gap to a buildable pattern, and how it will be delivered. |
| 8 | [Applying the kit](applying-the-kit.md) 🚧 | The guide, components, and Claude skill that put the research into practice (under construction). |

{% hint style="success" %}
**The thesis, in one sentence.** Solana's onboarding failures are not idiosyncratic, they are patterns. And recurring patterns call for systemic solutions: an entry-point design system, open source and easy to adopt, not one-off app-by-app fixes.
{% endhint %}
