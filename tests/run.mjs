#!/usr/bin/env node
//
// Checks that the skill is installable and internally consistent.
//
//   npm test
//
// No dependencies and no API key, so it runs in CI and on a fresh clone. The
// packaging convention this follows uses a TypeScript runner with an SDK
// dependency for model-in-the-loop evaluation; those belong in the eval suite,
// which answers "does the skill behave well". This answers "is the skill
// coherent", which has to pass first and has to pass everywhere.
//
// Every check here exists because something in this repository decided
// something, and a decision nobody enforces is a decision that expires.

import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join, dirname, resolve, relative } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SKILL = join(ROOT, "skills", "solana-onboarding");

let failures = 0;
let checks = 0;

function check(name, fn) {
  checks++;
  try {
    const detail = fn();
    console.log(`  ok   ${name}${detail ? `  (${detail})` : ""}`);
  } catch (error) {
    failures++;
    console.error(`  FAIL ${name}`);
    console.error(`       ${error.message.split("\n").join("\n       ")}`);
  }
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function filesUnder(dir, extension) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) return filesUnder(path, extension);
    return path.endsWith(extension) ? [path] : [];
  });
}

const markdown = filesUnder(SKILL, ".md");
const skillFile = join(SKILL, "SKILL.md");

console.log("\nSkill packaging\n");

check("SKILL.md exists at the conventional path", () => {
  assert(existsSync(skillFile), "skills/solana-onboarding/SKILL.md is missing");
  return relative(ROOT, skillFile);
});

check("frontmatter declares a name and a description", () => {
  const source = readFileSync(skillFile, "utf8");
  const frontmatter = source.match(/^---\s*\n([\s\S]*?)\n---/);
  assert(frontmatter, "no frontmatter block");
  const name = frontmatter[1].match(/^name:\s*(.+)$/m)?.[1]?.trim();
  const description = frontmatter[1].match(/^description:\s*(.+)$/m)?.[1]?.trim();
  assert(name === "solana-onboarding", `name is "${name}", expected the folder name`);
  assert(description && description.length > 40, "description is missing or too short to route on");
  return `${description.length} character description`;
});

check("the description says when to use the skill, not only what it is", () => {
  const source = readFileSync(skillFile, "utf8");
  const description = source.match(/^description:\s*(.+)$/m)[1];
  assert(
    /\buse when\b/i.test(description),
    "no trigger phrase. An agent picks a skill from its description, so it has to\n" +
      "say when to reach for this one, not only what it contains.",
  );
});

check("SKILL.md stays a router", () => {
  const lines = readFileSync(skillFile, "utf8").split("\n").length;
  assert(
    lines < 200,
    `SKILL.md is ${lines} lines. It loads on every turn, so detail belongs in\n` +
      "references/, which loads only when needed.",
  );
  return `${lines} lines`;
});

console.log("\nInternal consistency\n");

check("every file SKILL.md points at exists", () => {
  const source = readFileSync(skillFile, "utf8");
  const referenced = [...source.matchAll(/`(references\/[\w./-]+|methodology\/[\w./-]+|components\/[\w./-]+)`/g)]
    .map((match) => match[1])
    .filter((path) => !path.endsWith("/"));
  const missing = referenced.filter((path) => !existsSync(join(SKILL, path)));
  assert(missing.length === 0, `missing: ${missing.join(", ")}`);
  return `${new Set(referenced).size} paths`;
});

check("relative links inside the skill resolve", () => {
  const broken = [];
  for (const file of markdown) {
    const source = readFileSync(file, "utf8");
    for (const [, target] of source.matchAll(/\]\(([^)#][^)]*)\)/g)) {
      const path = target.split("#")[0].trim();
      if (!path || /^(https?:|mailto:)/.test(path)) continue;
      if (!existsSync(resolve(dirname(file), decodeURIComponent(path)))) {
        broken.push(`${relative(ROOT, file)} -> ${path}`);
      }
    }
  }
  assert(broken.length === 0, broken.join("\n"));
  return `${markdown.length} files`;
});

check("the component manifest lists files that exist", () => {
  const manifest = JSON.parse(
    readFileSync(join(SKILL, "components", "manifest.json"), "utf8"),
  );
  const missing = [];
  for (const [name, component] of Object.entries(manifest.components)) {
    for (const file of component.installs) {
      if (!existsSync(join(SKILL, "components", file))) missing.push(`${name} -> ${file}`);
    }
  }
  assert(missing.length === 0, missing.join("\n"));
  assert(
    existsSync(join(SKILL, "components", manifest.stylesheet)),
    `stylesheet ${manifest.stylesheet} is missing`,
  );
  return `${Object.keys(manifest.components).length} components`;
});

check("help topics resolve to headings on the help page", () => {
  const links = readFileSync(join(SKILL, "components", "help-links.ts"), "utf8");
  const topics = [...links.matchAll(/^\s{2}\w+:\s*"([^"]+)",$/gm)].map((m) => m[1]);
  assert(topics.length > 0, "no topics found in help-links.ts");

  const help = readFileSync(join(ROOT, "docs", "help.md"), "utf8");
  const anchors = [...help.matchAll(/^#{2,3}\s+(.+)$/gm)].map(([, heading]) =>
    heading
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-"),
  );

  const orphans = topics.filter((topic) => !anchors.includes(topic));
  assert(
    orphans.length === 0,
    `these topics have no heading on the help page, so their "learn more" links\n` +
      `land at the top of it: ${orphans.join(", ")}`,
  );
  return `${topics.length} topics`;
});

check("links into our own repository point at paths that exist", () => {
  // Pages published to GitBook link with absolute URLs, because a relative repo
  // path does not resolve on the web. Those are invisible to a relative-link
  // check and, worse, keep working until the change they describe lands: a link
  // to a folder we are about to rename passes every review and breaks on merge.
  const broken = [];
  const docs = filesUnder(join(ROOT, "docs"), ".md").concat(
    ["README.md", "getting-started.md", "CONTRIBUTING.md"]
      .map((name) => join(ROOT, name))
      .filter(existsSync),
  );

  for (const file of docs) {
    const source = readFileSync(file, "utf8");
    const pattern =
      /https:\/\/github\.com\/draaujpeg\/solana-uiux-onboarding-kit\/(?:tree|blob)\/main\/([^)\s#]+)/g;
    for (const [, path] of source.matchAll(pattern)) {
      if (!existsSync(join(ROOT, decodeURIComponent(path)))) {
        broken.push(`${relative(ROOT, file)} -> ${path}`);
      }
    }
  }
  assert(broken.length === 0, broken.join("\n"));
});

console.log("\nDisclosure\n");

check("no evaluated product is named anywhere in the skill", () => {
  // The findings came from measuring third-party products. The skill ships into
  // strangers' repositories, so it carries what was learned and not who was
  // graded. Enforced rather than remembered.
  const names = [
    "tangem", "backpack", "exodus", "dex screener", "dexscreener", "solflare",
    "okx", "phantom", "trust wallet", "jupiter", "meteora", "orca", "kamino",
  ];
  const found = [];
  for (const file of [...markdown, ...filesUnder(SKILL, ".ts"), ...filesUnder(SKILL, ".tsx")]) {
    const source = readFileSync(file, "utf8").toLowerCase();
    for (const name of names) {
      if (source.includes(name)) found.push(`${relative(ROOT, file)}: ${name}`);
    }
  }
  assert(found.length === 0, found.join("\n"));
  return `${names.length} names checked`;
});

console.log(
  `\n${checks - failures}/${checks} checks passed\n`,
);

process.exit(failures === 0 ? 0 : 1);
