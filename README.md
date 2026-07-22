# Solana UIUX Onboarding Kit

> A research-backed kit to fix Solana onboarding — easy to apply.

The Solana ecosystem was built by and for people who already understand seed phrases, self-custody, and the irreversibility of transactions. For everyone arriving from Web2, onboarding is where adoption breaks — and, in a context of irreversible money, where users either protect themselves or lose funds. This kit turns a heuristic study into reusable solutions: the **research** that proves the problem is systemic, the **design guidelines and components** that solve it, and a **Claude skill** that applies them — so any product can fix its entry flow instead of repeating the same mistakes.

This work was supported by **SuperteamBR** (Solana).

**Who it's for:** designers, devs, and builders in the Solana ecosystem.

## What's inside

| Pillar | Folder | Description |
|---|---|---|
| 📖 Research synthesis (book) | [`docs/`](docs/) | The full heuristic analysis in chapters, published via [GitBook](https://matheus-draau.gitbook.io/solana-onboarding-kit) |
| 📐 Design Guidelines | [`design-guidelines/`](design-guidelines/) | The components that fill the friction map, the specs behind them, and the rules they are built to |
| 🤖 Agent skill | [`skills/solana-onboarding/`](skills/solana-onboarding/) | The whole kit as a skill that diagnoses an onboarding flow and builds the screens that fix it |

## Quick start

```bash
npx skills add draaujpeg/solana-uiux-onboarding-kit
```

Then say what you have. "Review the onboarding in this repo" runs an audit
against the same thirty questions the research used. "Our swap shows this error
and users vanish" finds the pattern and builds the screen. Components are copied
into your project, so you own and edit them, with nothing to keep updated.

Works with any agent that reads Agent Skills: Claude Code, Codex, Copilot, Gemini
CLI, Cursor, Windsurf, Cline, OpenCode.

New here? [`getting-started.md`](getting-started.md) is the shortest path in.

## Status

- ✅ **Research & synthesis**: complete ([`docs/`](docs/))
- ✅ **Design guidelines & components**: 21 components across the seven patterns
- ✅ **Agent skill**: routes, audits, and installs into your project

## License

This project is dual-licensed:

- **Code** — the Claude skill and design components — under the [MIT License](LICENSE).
- **Research & documentation** under `docs/` under [CC BY 4.0](docs/LICENSE).

You are free to fork, use, and build upon the material; attribution is required for the research content.
