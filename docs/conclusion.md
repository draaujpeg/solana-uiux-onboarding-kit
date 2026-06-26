---
description: Mapping each gap to a buildable pattern and how the design system will be delivered.
---

# 7. Conclusion, from diagnosis to design system

Reading the 13 protocols together delivers a conclusion that is, at once, a problem and an opportunity: **the Solana ecosystem's onboarding failures are not idiosyncratic, they are patterns.** The same four or five gaps reappear app after app, category after category. And recurring patterns call for **systemic solutions, not one-off fixes**. That is exactly what justifies and directs building a design system.

## From each gap to a buildable pattern

Each recurring gap identified here translates, almost directly, into a **reusable component or pattern** to be produced:

| Diagnosed gap                          | Design pattern to systematize                                                                                            |
| -------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| Seed phrase with no mental model       | A **seed phrase education** component: analogy + context at the moment of display, with assisted confirmation           |
| Drop into the empty screen             | A **post-onboarding** pattern: first-steps checklist/tour, guided initial state                                         |
| Help outside the flow                  | An **inline contextual help** system: tooltips and support at the point and moment of the question                     |
| Jargon without translation             | An **inline glossary with progressive disclosure**: use plain language during onboarding or explain the term on first appearance, hiding advanced complexity |
| Errors that do not teach               | An **actionable error message** component: every error states what happened, optionally adding how to fix it           |
| Unexpected gates (KYC, blind signing)  | A **gate anticipation** pattern: signal requirements before the time investment                                         |
| Irreversible actions without warning   | A **pre-action confirmation/review** pattern: highlight the consequence before delegating to the wallet                |

This direct mapping, from each observed problem to a buildable pattern, is the most valuable output of this synthesis. It allows the design system to be not a collection of aesthetic good intentions, but an **evidence-calibrated response** to real, measured, and recurring failures, with concrete references both from those who already solved them well and from those who need the greater effort.

## The next phase

The next phase, therefore, has a clear direction: **produce a design system that materializes, as components, the solutions proposed for each gap located in the research and analysis**, turning the most frequent and most critical failure points into reusable primitives, prioritized by the combination of recurrence (how cross-cutting the problem is) and severity (how much it costs when it fails). The end goal is not to make each app pretty. It is to build the entry layer that the ecosystem systematically forgot to offer to those who arrive.

{% hint style="info" %}
**How it will be delivered.** The design system will be offered as **open source**, with **standardized components** that already carry best practices built in, yet remain **open to customization**. Each product adapts color, tone, and brand without rewriting the onboarding logic that solves the gap. To make adoption genuinely easy, distribution will happen through a **Claude skill** and also a **Figma file** with components ready for the design team. The bet is to minimize the friction between the pattern that works and the product that needs it, because a design system only changes the ecosystem if it is trivial to adopt.
{% endhint %}

## The economic consequence

And this is where the diagnosis meets its economic consequence. Each pattern systematized in this document is, in the end, a plugged funnel leak: one fewer beginner who gives up at the seed phrase, one fewer KYC that becomes a negative surprise, one fewer transaction that fails without explanation. **That is why UI/UX design is not an aesthetic cost. It is the cheapest and most cross-cutting adoption lever available to the network**, because a single well-designed solution replicates across dozens of products that today repeat exactly the same mistake. Solving onboarding systemically does not improve one app at a time. It improves the conversion rate of the entire ecosystem, transforming Solana's entry point from an expert filter into a viable path for those coming from Web2. That is the bet: that adoption, in an environment of irreversible actions, is won less by attracting new people and more by making sure that whoever arrives can, at last, stay.

This return compounds across the ecosystem. For the builder, the kit removes a recurring cost: no team has to solve onboarding from zero, and a shared reference saves weeks of research and iteration for every product that adopts it. For the network, the investment behaves like infrastructure rather than a one-off. Every team that adopts the patterns improves its own users' experience, and the benefit accrues to the whole ecosystem at once.

---

_Synthesis document · 13 apps · 390 items evaluated · Nielsen protocol (10 heuristics × 3 questions)._
