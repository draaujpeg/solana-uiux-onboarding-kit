---
description: The evaluation protocol, the severity scale, and the impact types.
---

# 2. How the analysis was conducted

The evaluation adopted **Nielsen's 10 usability heuristics** ([Nielsen, 1994](https://www.nngroup.com/books/usability-engineering/)) as its protocol, but with a methodological adaptation that adds granularity: each heuristic was broken down into **3 objective questions**, totaling **30 items per application**. Each item received:

* **A verdict**: _Yes_ (meets), _Partial_ (meets with caveats), or _No_ (does not meet);
* **A severity from 0 to 4**, calibrated by the impact on the user, not by the abstract presence of a problem:

| Severity | Meaning                                       |
| :------: | --------------------------------------------- |
|   **0**  | No problem                                     |
|   **1**  | Cosmetic                                       |
|   **2**  | Minor / friction                               |
|   **3**  | High, hinders use                              |
|   **4**  | Critical, blocks use or creates risk of loss   |

Each app's final score is the **average of the 30 severities** (empty cell = 0). Every failure was further classified by **impact type**:

* **Confusion**: does not understand;
* **Friction**: extra effort;
* **Block**: cannot proceed;
* **Distrust**: loses confidence.

This distinction matters because a problem that creates distrust in a context of irreversible money costs far more than one that creates mere friction.

Aggregated across the 13 apps, these verdicts, severities, and impact types compose a **friction map**: a structured view of where onboarding breaks across the ecosystem and how severely. The next chapters read that map tier by tier and pattern by pattern.

{% hint style="warning" %}
**Scope and methodological honesty.** The focus was always the **onboarding flow**, from the first screen to the first moment of real use, and not the entire product. In some cases (Backpack, OKX), the full registration/KYC was not completed by the user; this is flagged in the individual evaluations to preserve the honesty of the method. This report is also deliberately limited to the heuristic analysis: complementary interviews and a user survey were planned but set aside after low audience uptake, so rather than lean on thin or unrepresentative data, the synthesis rests entirely on the structured heuristic evaluation.
{% endhint %}

---

➡️ Continue to [**3. The overall landscape**](landscape.md).
