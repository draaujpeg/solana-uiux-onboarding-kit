# Trigger cases

Whether the skill is *chosen* in the first place. The cases in
[`cases.md`](cases.md) test what it does once it has been picked; these test the
step before, whether an agent reaches for it at all, from the description alone.

That step is invisible when it fails. A description too narrow leaves the skill
silent on a request that was squarely its job; a description too broad has it
butting into requests that are not. Neither shows up in the other suites.

## How to run these

By hand, and that is not a downgrade. The automated version of this test asks a
model "would you pick this skill?" and reads a yes or no. Running it yourself
tells you more: not just whether the skill fired, but whether it understood the
request and whether a refusal was for the right reason.

Setup:

1. A **fresh session**, in a directory that is **not this repository**, with the
   skill installed (`npx skills add draaujpeg/solana-uiux-onboarding-kit`).
2. Other skills installed alongside it if you have them. The real test is whether
   this one is chosen *among others*, not in isolation.
3. For each prompt below, **paste it and nothing else**. Do not name the skill,
   do not hint. Watch whether the skill activates.

An agent shows it activated by loading the skill, mentioning the kit, or
answering in its terms (patterns, risk levels, the audit). If it answers as a
generic assistant with no sign of the skill, it did not fire.

## Should fire

The real front doors. The skill should activate on every one.

1. Our swap throws an error and users just disappear after it.
2. How do I show a recovery phrase to a first-time user without scaring them off?
3. Users hit our KYC step as a surprise and most of them quit there.
4. I need a confirmation before someone revokes an app's wallet access.
5. Nobody understands what slippage means on our swap screen.
6. Review the onboarding flow in this project and tell me what's weak.
7. We drop people into an empty wallet after setup and they don't know what to do.
8. What's the right way to confirm an irreversible transaction on Solana?
9. Our error messages just say "failed" and people don't know how to recover.
10. How should I let users import an existing wallet by its seed words?
11. Design the first screen someone sees after connecting their wallet to our app.
12. Users abandon our signup. Where are we losing them?
13. We show `INSUFFICIENT_FUNDS` and users bounce. What should that screen say?
14. How do I warn someone before they send to a brand-new address?

## Should not fire

Near neighbours, on purpose. Each mentions something the skill touches, Solana, a
wallet, a UI, but sits outside what it is for. The skill should stay quiet, or at
most say this is not its job and step back.

- **15.** Write me an Anchor program in Rust for a staking pool.
- **16.** Set up wallet-adapter so my dapp can connect to a browser wallet.
- **17.** Build a React dashboard that charts our token's price.
- **18.** Deploy this Next.js site to Vercel.
- **19.** Write a smart contract test suite for our lending program.
- **20.** My onboarding email open rate is low, how do I improve the subject lines?

## Scoring

Count two numbers separately, and keep them separate.

- **Hits:** of the 14 should-fire cases, how many activated the skill.
- **False alarms:** of the 6 should-not-fire cases, how many activated it anyway.

A missed hit means the description does not reach a request that is the skill's
job, most likely because it lacks the words a developer actually used. Note which
words the prompt used that the description does not.

A false alarm means the description is greedy, firing on the mention of Solana or
a wallet rather than on onboarding itself. That is the more expensive failure: a
skill that interrupts is uninstalled faster than one that stays quiet.

The fix for either is the `description` in
[`../SKILL.md`](../SKILL.md), which is the only thing an agent reads when it
decides. Change it, reinstall, run these again.

## A note on who wrote these

The same person wrote the skill's description and these prompts, which is a bias:
they test the description against what its author meant, not against what a
stranger would say. The should-fire prompts were written to use a developer's
words rather than the kit's own vocabulary, but read them with suspicion, and
replace any that sound like they came from inside the project.
