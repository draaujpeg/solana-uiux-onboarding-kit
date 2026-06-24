---
description: The concentration of critical items and the cases of irreversible financial risk.
---

# 5. The most critical: where risk becomes a block

Severity 4 is not "very bad" — it is **a block or irreversible financial risk**. The concentration of these items is the most serious finding of the investigation:

| App              | Sev-4 items | Nature of the critical issue                                  |
| ---------------- | :---------: | ------------------------------------------------------------- |
| **Orca**         |   30 / 30   | Total absence of onboarding (uniform marking)                 |
| **Kamino**       |   29 / 30   | Total absence + user gets stuck in the flow                   |
| **Meteora**      |      3      | Cluttered design failed entirely + zero error prevention      |
| **Trust Wallet** |      2      | Seed loss = permanent block; no support at the critical moment |
| **Phantom**      |      1      | Seed phrase displayed with no inline support                  |

Two findings deserve highlighting.

{% hint style="danger" %}
**The financial block from the absence of a safety net.** In Trust Wallet, losing the seed phrase means a permanent, irreversible block of the funds — no assisted recovery, no recognition mechanism to replace it. The product works on the happy path but exposes the user to total loss with no safeguard whatsoever. It is the kind of failure that does not show up in a low average, but that, when it materializes, is catastrophic.
{% endhint %}

**The silent gate.** In Ledger, _blind signing_ must be enabled manually on the device to interact with Solana dApps — a step undocumented in the main interface that **blocks transactions without explaining why**. The user is stuck without understanding the reason. It is the emblematic case of a failure that mixes jargon, absence of contextual help, and a block — three of our patterns in a single point.

**KYC as a trap.** In OKX, documents rejected without specific diagnosis ("document not accepted", without saying whether it was glare, validity, or a mismatch) lead the user to resubmit the same files indefinitely — made worse for the Brazilian user, whose documents in Portuguese create friction in a system calibrated for other countries. In Backpack, mandatory KYC works as a total blocking gate that arrives as a negative surprise.

---

➡️ Continue to [**6. What stood out the most**](key-observations.md).
