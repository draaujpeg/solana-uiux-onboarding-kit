"use client";

import { useState } from "react";

// Two iframes rather than two columns on one page. The kit's tokens resolve on
// the document root, so a light and a dark copy need two documents; a wrapper
// div would inherit whatever the outer page already resolved and prove nothing.
const pages = [
  { href: "/tokens", label: "Tokens, every colour at once" },
  { href: "/errors", label: "Actionable errors" },
  { href: "/confirmations", label: "Pre-action confirmation" },
  { href: "/seed-phrase", label: "Seed phrase" },
  { href: "/kyc", label: "Gate anticipation" },
  { href: "/glossary", label: "Inline help" },
  { href: "/welcome", label: "Welcome" },
];

export default function ComparePage() {
  const [page, setPage] = useState(pages[0].href);

  return (
    <main className="flex h-screen flex-col gap-4 p-6">
      <header className="flex flex-wrap items-center gap-4">
        <h1 className="text-xl font-semibold">Light and dark, side by side</h1>
        <label className="flex items-center gap-2 text-sm">
          <span className="text-[var(--so-text-muted)]">Page</span>
          <select
            value={page}
            onChange={(event) => setPage(event.target.value)}
            className="rounded-[var(--so-radius-sm)] border border-[var(--so-border)] bg-[var(--so-surface)] px-2 py-1"
          >
            {pages.map((entry) => (
              <option key={entry.href} value={entry.href}>
                {entry.label}
              </option>
            ))}
          </select>
        </label>
        <p className="text-sm text-[var(--so-text-muted)]">
          Each side declares only a background and a foreground, the way a host
          does. Everything else is derived by the kit.
        </p>
      </header>

      <div className="grid min-h-0 flex-1 grid-cols-1 gap-4 lg:grid-cols-2">
        {(["light", "dark"] as const).map((theme) => (
          <section
            key={theme}
            className="flex min-h-0 flex-col overflow-hidden rounded-[var(--so-radius-lg)] border border-[var(--so-border)]"
          >
            <p className="border-b border-[var(--so-border)] px-4 py-2 text-sm font-semibold capitalize">
              {theme}
            </p>
            <iframe
              key={`${theme}-${page}`}
              src={`${page}?theme=${theme}`}
              title={`${page} in ${theme}`}
              className="min-h-0 flex-1 bg-white"
              style={theme === "dark" ? { background: "#101012" } : undefined}
            />
          </section>
        ))}
      </div>
    </main>
  );
}
