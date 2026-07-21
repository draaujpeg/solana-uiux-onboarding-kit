# Demo

A showroom for the kit's components. It is not a product and it is not what
anyone installs: it exists so the components can be seen running, and so nothing
is called finished before it compiles.

Run it from the repository root, which is an npm workspace covering both this
app and the component source:

```bash
npm install
npm run dev
```

## How it is wired

The components are not copied in here. They live in
[`../skills/solana-onboarding/components/`](../skills/solana-onboarding/components/),
the same files the skill writes into a user's project, and this app imports them
through the `@kit/*` alias. One copy, no drift.

Four consequences of that arrangement, all handled in config:

- `next.config.ts` raises the Turbopack root to the repository, because
  Turbopack will not resolve modules above its own root.
- `app/globals.css` adds an `@source` line so Tailwind scans the component
  folder for class names.
- `tsconfig.json` maps the alias and includes the folder.
- The repository is an npm workspace, so the packages the components import
  resolve from outside this app. What they need is declared in
  [`../skills/solana-onboarding/package.json`](../skills/solana-onboarding/package.json),
  which doubles as the list a host project has to install.

A host project keeps the components inside its own app, so it needs none of
these.

## Checking that a component adapts

Every colour comes from a `--so-*` token, and those tokens read the shadcn/ui
names first. Declare `--destructive`, `--primary` or `--radius` in
`app/globals.css`, reload, and every component should follow with no edit of its
own. If one does not, it is painting with a literal value and needs fixing.
