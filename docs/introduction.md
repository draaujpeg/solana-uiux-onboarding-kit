---
description: The problem we are investigating and why it is, above all, an adoption issue.
---

# 1. Introduction — the problem we are investigating

The Solana ecosystem, like crypto in general, was built by and for people who already master its rules. Wallets, DEXs, aggregators, and lending platforms assume a user who knows what a seed phrase is, understands self-custody, recognizes _slippage_, and accepts the irreversibility of transactions as a natural condition. For someone arriving from Web2 — from custodial exchanges, digital banks, any product where "I forgot my password" is a button and not a sentence of permanent loss — that assumption is precisely the breaking point.

Onboarding is where this rupture either happens or is avoided. It is the border between the user who adopts and the one who abandons; and, in a financial context of irreversible actions, it is also the border between the user who protects themselves and the one who loses funds for not having understood what they were doing.

This investigation started from a practical question:

{% hint style="info" %}
**Where, exactly, does the Solana ecosystem's onboarding fail the beginner, and do these failure points repeat enough to become design patterns?**
{% endhint %}

The short answer is yes. And it is this repetition that justifies the next phase of the work: turning a one-off diagnosis into reusable, systemic solutions.

## The adoption question

But there is a second question, and it is the one that gives economic meaning to everything else:

{% hint style="info" %}
**Can a standardized, reusable entry-point UI/UX system actually move the needle on the adoption of the network's products?**
{% endhint %}

The answer is also yes, and the reason is direct. Every failure we mapped in onboarding is, in practice, a user who gives up before becoming an active user — or worse, who loses funds and never comes back. Abandonment is not a marketing problem solved by bringing more people to the door; it is a product problem, solved by making sure that whoever reaches the door can get through it. Well-resolved entry patterns — seed phrase education, contextual help, inline glossary, gate anticipation — attack exactly the point where the funnel leaks. That is why the design system is not a parallel aesthetic effort: it is the cheapest and most cross-cutting adoption lever the ecosystem has available, because a single well-designed solution replicates across dozens of products that today repeat the same mistake.

---

➡️ Continue to [**2. How the analysis was conducted**](methodology.md).
