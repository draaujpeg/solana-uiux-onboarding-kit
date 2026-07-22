// Fails when a component paints with a literal value instead of a token.
//
// The token layer is what lets a copied component adopt the host product's
// brand. A single hard-coded colour opts that component out of it, silently, and
// the defect only shows up in somebody else's product months later. Prose in
// CLAUDE.md asks for the rule; this enforces it.
//
// Run: npm run lint:tokens

import { readdir, readFile } from "node:fs/promises";
import { join, relative } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");
const COMPONENTS = join(ROOT, "skills", "solana-onboarding", "components");

// The Tailwind palette, which is just as literal as a hex code.
const PALETTE =
  "red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose|slate|gray|zinc|neutral|stone";

// tokens.css is where the kit's own literals belong. brand-marks.tsx holds
// third party logos, whose colours are fixed by their owners' trademark terms
// and must not be themed to match a product.
const EXEMPT = new Set(["tokens.css", "brand-marks.tsx"]);

const FORBIDDEN = [
  {
    pattern: /#[0-9a-fA-F]{3,8}\b/,
    what: "a hex colour",
    fix: "use a --so-* token from tokens.css",
  },
  {
    pattern: /\b(rgb|rgba|hsl|hsla|oklch|color-mix)\s*\(/,
    what: "a computed colour",
    fix: "use a --so-* token from tokens.css",
  },
  {
    pattern: new RegExp(
      `\\b(bg|text|border|ring|fill|stroke|from|via|to|decoration|outline|shadow)-(${PALETTE})-\\d{2,3}\\b`,
    ),
    what: "a Tailwind palette colour",
    fix: "use a --so-* token, for example bg-[var(--so-danger-surface)]",
  },
];

async function filesIn(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const found = [];
  for (const entry of entries) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) found.push(...(await filesIn(path)));
    else if (/\.(ts|tsx|css)$/.test(entry.name) && !EXEMPT.has(entry.name))
      found.push(path);
  }
  return found;
}

const problems = [];

for (const file of await filesIn(COMPONENTS)) {
  const lines = (await readFile(file, "utf8")).split("\n");
  lines.forEach((line, index) => {
    for (const rule of FORBIDDEN) {
      const match = line.match(rule.pattern);
      if (match) {
        problems.push({
          file: relative(ROOT, file),
          line: index + 1,
          value: match[0],
          what: rule.what,
          fix: rule.fix,
        });
      }
    }
  });
}

if (problems.length === 0) {
  console.log("Tokens: no literal values in components.");
  process.exit(0);
}

console.error(
  `Tokens: ${problems.length} literal value(s) found. Components must paint only with --so-* tokens, otherwise they cannot adopt the host product's brand.\n`,
);
for (const problem of problems) {
  console.error(
    `  ${problem.file}:${problem.line}  ${problem.value}  is ${problem.what}, ${problem.fix}`,
  );
}
process.exit(1);
