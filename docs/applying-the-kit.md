---
description: >-
  How to take this research from diagnosis to practice: the design guidelines,
  components, and Claude skill that apply the kit to your own product.
---

# Applying the kit

The previous chapters diagnose where Solana onboarding fails and turn those failures into patterns. This final chapter is the bridge from reading to building: a practical guide to applying the kit, with each gap mapped to a flow, a component, and a way to put it into your own product.

{% hint style="info" %}
**The materials exist; this chapter does not yet.** The components, the rules behind them and the agent skill that applies them are all built and installable, listed below. What is still being written is this walkthrough: the guided path from a diagnosed gap to a shipped screen.
{% endhint %}

## Install it

```bash
npx skills add draaujpeg/solana-uiux-onboarding-kit
```

Then describe what you have. "Review the onboarding in this repo" runs an audit against the same thirty questions used in [chapter 2](methodology.md). "Our swap shows this error and users vanish" finds the pattern behind it and builds the screen. Components are copied into your project, so you own and edit them, with nothing to keep updated.

It works with any agent that reads Agent Skills: Claude Code, Codex, Copilot, Gemini CLI, Cursor, Windsurf, Cline, OpenCode.

## What this chapter will cover

* **From gap to flow.** A step-by-step walkthrough that takes each recurring pattern from the research and shows the onboarding flow that fills it.
* **Components.** The reusable building blocks behind those flows, with usage notes and the friction they are meant to remove.
* **Using it in your project.** How to adopt the kit when designing a new onboarding or reviewing an existing one, including the Claude skill that applies the guidelines directly inside Claude Code.

## The materials

While the guide is being finalized, these are the parts of the kit and where they live:

| Material | Where | Status |
|---|---|---|
| Components, specs and the rules they are built to | [`design-guidelines/`](https://github.com/draaujpeg/solana-uiux-onboarding-kit/tree/main/design-guidelines) | ✅ Complete |
| The agent skill | [`skills/solana-onboarding/`](https://github.com/draaujpeg/solana-uiux-onboarding-kit/tree/main/skills/solana-onboarding) | ✅ Complete |
| Research synthesis | [`docs/`](README.md) | ✅ Complete |
| Help and glossary, written for the end user | [`help.md`](help.md) | ✅ Complete |
| This walkthrough | here | 🚧 Being written |

{% hint style="info" %}
Want to follow along or contribute? Star and watch the [GitHub repository](https://github.com/draaujpeg/solana-uiux-onboarding-kit) for updates as the guidelines, components, and skill are released.
{% endhint %}
