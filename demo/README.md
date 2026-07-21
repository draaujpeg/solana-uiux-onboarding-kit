# Demo

A showroom for the kit's components. It is not a product and it is not what
anyone installs: it exists so the components can be seen running, and so nothing
is called finished before it compiles.

```bash
cd demo
npm install
npm run dev
```

## How it is wired

The components are not copied in here. They live in
[`../skills/solana-onboarding/components/`](../skills/solana-onboarding/components/),
the same files the skill writes into a user's project, and this app imports them
through the `@kit/*` alias. One copy, no drift.

Three consequences of that arrangement, all handled in config:

- `next.config.ts` raises the Turbopack root to the repository, because
  Turbopack will not resolve modules above its own root.
- `app/globals.css` adds an `@source` line so Tailwind scans the component
  folder for class names.
- `tsconfig.json` maps the alias and includes the folder.

A host project keeps the components inside its own app, so it needs none of
these.

## Checking that a component adapts

Every colour comes from a `--so-*` token, and those tokens read the shadcn/ui
names first. Declare `--destructive`, `--primary` or `--radius` in
`app/globals.css`, reload, and every component should follow with no edit of its
own. If one does not, it is painting with a literal value and needs fixing.
