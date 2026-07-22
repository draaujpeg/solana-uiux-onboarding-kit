# Installing a component

Components are copied into the project, not installed as a package. The user
ends up owning ordinary files they can read and edit, with nothing to keep
updated and no version of this kit pinned anywhere.

That only works if the copy is complete. A confirmation dialog without its modal
shell is a build error the user discovers after you have gone.

## What to copy

`components/manifest.json` answers this. It is generated from the imports
themselves and checked in CI, so it cannot drift from what the components
actually need.

For a component, read its entry and copy every file in `installs`. That list is
already resolved through the whole chain: `confirmation-dialog` brings the
callout, the modal shell, the summary table and the severity palette, and you do
not need to work that out.

`installPackages` lists what must be installed from npm, resolved the same way.
In practice this is `lucide-react`.

The `client` flag says whether the file carries `"use client"`. It matters in a
Next.js app: importing a client component from a server component is fine,
importing a server component into a client boundary is not.

## Where to put it

Follow the project, do not impose a layout.

Look for an existing components directory and match it: `components/ui`,
`src/components`, `app/_components`. Match the case convention of the files
already there. If the project has nothing, `components/onboarding/` is a
reasonable default, and say that you chose it.

Copy the files unchanged apart from import paths. Editing a component while
installing it is how a kit becomes twelve slightly different kits.

## The stylesheet

`tokens.css` is imported once, from the project's global stylesheet, before the
components render. Without it every colour falls back to nothing.

```css
@import "./tokens.css";
```

The tokens read the shadcn/ui names first, so a project that already defines
`--background`, `--foreground`, `--border`, `--primary`, `--destructive` and
`--radius` is themed with no further work. Check whether they exist and tell the
user which way it went, because "it already matches your brand" and "it looks
like the kit" are different outcomes and only one of them is a surprise.

Tailwind v4 users need the components directory scanned. If the components sit
inside the app it already is.

## Wiring the help links

`help-links.ts` points at this kit's help page. If the product has its own
documentation, change `HELP_BASE_URL` once and every link follows.

Ask. Pointing a user at somebody else's documentation is a decision, not a
default, and leaving the links pointing here is still better than links that go
nowhere, which is what the research found nearly everywhere.

## After copying

Run the project's build, not just a type check. Fix what you broke, and do not
leave a component half wired because the demo of it worked.

Then show the user the component rendered in their own project. A screenshot of
the kit's demo proves nothing about theirs.

## What not to do

Do not copy the whole `components/` directory. Installing eleven components to
use one leaves the user maintaining ten they never asked for.

Do not vendor the kit as a dependency, a submodule or a symlink. The point of
copying is that they own the result.

Do not rewrite the component to match the project's conventions on the way in.
Adapt the import paths and stop. If the project's conventions genuinely conflict,
say so and let the user decide.
