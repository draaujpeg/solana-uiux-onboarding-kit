# Solana UIUX Onboarding Kit

> Research, design guidelines, components, and a Claude skill to fix onboarding for Solana ecosystem products.

The Solana ecosystem was built by and for people who already understand seed phrases, self-custody, and the irreversibility of transactions. For everyone arriving from Web2, onboarding is where adoption breaks — and, in a context of irreversible money, where users either protect themselves or lose funds. This kit turns a heuristic study of **13 Solana apps (390 evaluated items)** into reusable solutions: the **research** that proves the problem is systemic, the **design guidelines and components** that solve it, and a **Claude skill** that applies them — so any product can fix its entry flow instead of repeating the same mistakes.

**Who it's for:** designers, product teams, and builders of Solana wallets, DEXs, aggregators, and lending products — plus anyone using Claude Code to design or review crypto onboarding flows.

## What's inside

| Pillar | Folder | Description |
|---|---|---|
| 📖 Research synthesis (book) | [`docs/`](docs/) | The full heuristic analysis in chapters, published via GitBook |
| 📐 Design Guidelines | [`design-guidelines/`](design-guidelines/) | Principles, patterns, and design components derived from the research |
| 🤖 Claude skill | [`skill/`](skill/) | Installable skill + [how to use it](skill/using-the-skill.md) |

## Quick start

1. **Read the research.** Start with the [synthesis](docs/) — 7 short chapters that go from the diagnosis to the proposed patterns (also publishable as a GitBook site).
2. **Explore the design guidelines.** Browse [`design-guidelines/`](design-guidelines/) for the principles, patterns, and components that turn each gap into a buildable solution.
3. **Use the Claude skill.** Follow [how to use it](skill/using-the-skill.md) to install the skill in Claude Code and apply the kit while designing or reviewing onboarding.

New here? [`getting-started.md`](getting-started.md) is the shortest path in.

## Status

- ✅ **Research & synthesis** — complete ([`docs/`](docs/))
- 🚧 **Design guidelines & components** — in progress
- 🚧 **Claude skill** — in progress

## License

This project is dual-licensed:

- **Code** — the Claude skill and design components — under the [MIT License](LICENSE).
- **Research & documentation** under `docs/` under [CC BY 4.0](docs/LICENSE).

You are free to fork, use, and build upon the material; attribution is required for the research content.
