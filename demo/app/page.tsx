import Link from "next/link";

// Index of the showroom. One entry per pattern family, added as each is built.
const families = [
  {
    href: "/errors",
    title: "Actionable errors",
    description:
      "Block alerts for the six failures that stop a transaction, each with the action that resolves it.",
    ready: true,
  },
  {
    href: "/confirmations",
    title: "Pre-action confirmation",
    description:
      "Four templates chosen by how much an irreversible action costs, plus the destination address field.",
    ready: true,
  },
  {
    href: "/seed-phrase",
    title: "Seed phrase education",
    description:
      "Custody choice, the stakes, a blurred phrase, and proof it was written down.",
    ready: true,
  },
  { href: "", title: "Gate anticipation", description: "The four-step KYC flow.", ready: false },
  { href: "", title: "Inline help and glossary", description: "Tooltip with two triggers.", ready: false },
  { href: "", title: "Post-onboarding welcome", description: "Greeting plus three next steps.", ready: false },
];

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-[var(--so-width-wide)] flex-col gap-6 p-8">
      <header className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold">Solana Onboarding Kit</h1>
        <p className="text-[var(--so-text-muted)]">
          Component showroom. Every colour comes from a token, so overriding one
          token in globals.css rethemes all of them.
        </p>
      </header>

      <ul className="flex flex-col gap-3">
        {families.map((family) => (
          <li key={family.title}>
            {family.ready ? (
              <Link
                href={family.href}
                className="flex flex-col gap-1 rounded-[var(--so-radius-lg)] border border-[var(--so-border)] bg-[var(--so-surface)] p-4"
              >
                <span className="font-semibold">{family.title}</span>
                <span className="text-sm text-[var(--so-text-muted)]">
                  {family.description}
                </span>
              </Link>
            ) : (
              <div className="flex flex-col gap-1 rounded-[var(--so-radius-lg)] border border-dashed border-[var(--so-border)] p-4 opacity-60">
                <span className="font-semibold">{family.title}</span>
                <span className="text-sm text-[var(--so-text-muted)]">
                  {family.description} Not built yet.
                </span>
              </div>
            )}
          </li>
        ))}
      </ul>
    </main>
  );
}
