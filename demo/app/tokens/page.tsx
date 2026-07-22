// Every token, as a swatch. Reviewing a token layer by hunting for the one
// component that happens to use a tone is how an unused token survives for
// months: it is not on screen anywhere, so nobody notices it is not on screen
// anywhere. This page shows all of them, in whatever theme the host declares.

type Token = { name: string; note?: string };

const groups: { title: string; tokens: Token[] }[] = [
  {
    title: "Surface",
    tokens: [
      { name: "--so-surface", note: "reads --card, then --background" },
      { name: "--so-surface-muted", note: "reads --muted" },
    ],
  },
  {
    title: "Text",
    tokens: [
      { name: "--so-text", note: "reads --foreground" },
      { name: "--so-text-muted", note: "reads --muted-foreground" },
      { name: "--so-text-subtle", note: "word numbers, error codes" },
    ],
  },
  {
    title: "Structure",
    tokens: [
      { name: "--so-border", note: "reads --border" },
      { name: "--so-primary", note: "reads --primary" },
      { name: "--so-primary-fg", note: "reads --primary-foreground" },
      { name: "--so-disabled-surface" },
      { name: "--so-disabled-text" },
    ],
  },
  {
    title: "Danger",
    tokens: [
      { name: "--so-danger", note: "reads --destructive, drives the three below" },
      { name: "--so-danger-fg" },
      { name: "--so-danger-surface" },
      { name: "--so-danger-border" },
      { name: "--so-danger-text" },
    ],
  },
  {
    title: "Warning",
    tokens: [
      { name: "--so-warning" },
      { name: "--so-warning-fg" },
      { name: "--so-warning-surface" },
      { name: "--so-warning-border" },
      { name: "--so-warning-text" },
    ],
  },
  {
    title: "Success",
    tokens: [
      { name: "--so-success", note: "KYC timeline dots" },
      { name: "--so-success-text", note: "the correct-word message" },
    ],
  },
];

export default function TokensPage() {
  return (
    <main className="mx-auto flex w-full max-w-[var(--so-width-wide)] flex-col gap-8 p-8">
      <header className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold">Tokens</h1>
        <p className="text-[var(--so-text-muted)]">
          Every colour the components can paint with. Open this page in the
          comparison view to see both themes at once.
        </p>
      </header>

      {groups.map((group) => (
        <section key={group.title} className="flex flex-col gap-3">
          <h2 className="font-semibold">{group.title}</h2>
          <ul className="flex flex-col gap-2">
            {group.tokens.map((token) => (
              <li
                key={token.name}
                className="flex items-center gap-4 rounded-[var(--so-radius-sm)] border border-[var(--so-border)] p-3"
              >
                <span
                  className="size-10 shrink-0 rounded-[var(--so-radius-sm)] border border-[var(--so-border)]"
                  style={{ background: `var(${token.name})` }}
                  aria-hidden
                />
                <span className="flex min-w-0 flex-col">
                  <span className="font-[family-name:var(--so-font-mono)] text-sm">
                    {token.name}
                  </span>
                  {token.note && (
                    <span className="text-sm text-[var(--so-text-muted)]">
                      {token.note}
                    </span>
                  )}
                </span>
                <span
                  className="ml-auto shrink-0 text-sm"
                  style={{ color: `var(${token.name})` }}
                >
                  Sample text
                </span>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </main>
  );
}
