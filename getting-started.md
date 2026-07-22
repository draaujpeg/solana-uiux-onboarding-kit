# Getting started

The shortest path into the Solana UIUX Onboarding Kit.

## Install the skill

The kit is an agent skill. Install it and your agent can diagnose an onboarding
flow, or build the screen that fixes one, inside your own project.

```bash
npx skills add draaujpeg/solana-uiux-onboarding-kit
```

Or clone the repository and run the installer, which supports `--project` to
install into one project and `--link` to keep it updated with a git pull:

```bash
./install.sh
```

It works with any agent that reads Agent Skills: Claude Code, Codex, Copilot,
Gemini CLI, Cursor, Windsurf, Cline, OpenCode.

## Use it

Nothing to memorise. Say what you have:

- "Review the onboarding in this repo" runs the audit, scoring the flow against
  the same thirty questions the research used, and reports what is missing.
- "Our swap shows `custom program error: 0x1` and users vanish" finds the
  pattern for that failure and builds the screen.
- "We need a confirmation before users revoke access" classifies how risky the
  action is, and tells you if it needs no dialog at all.

The components are copied into your project. They are not a dependency, there is
nothing to keep updated, and you own and edit the result.

## Read the research

The kit is grounded in a heuristic study of 13 Solana onboarding flows. The
[research synthesis](docs/) is eight short chapters going from the diagnosis to
the patterns worth systematising, plus a [help page](docs/help.md) written for
the end user rather than for the team.

## See the components

The [design guidelines](design-guidelines/) hold the component exports, the
written specs, and the rules they are built to. To see them running:

```bash
npm install
npm run dev
```

Want to help build the next phases? See [CONTRIBUTING](CONTRIBUTING.md).
