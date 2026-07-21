import { AlertTriangle, Info } from "lucide-react";
import { severityClasses, type Severity } from "@kit/severity";

// Foundation check. Once the components exist this page becomes the index of
// the showroom; for now it proves the plumbing: tokens resolve, the kit's
// modules import from outside the app, Tailwind scans them, and both fonts load.
const samples: { severity: Severity; title: string; body: string }[] = [
  {
    severity: "neutral",
    title: "Check the address carefully",
    body: "Transactions on Solana are irreversible. One wrong character sends to a different address, with no way to undo.",
  },
  {
    severity: "warning",
    title: "High slippage",
    body: "At 5%, you accept receiving up to 5% less than the amount shown. We recommend between 0.1% and 1% for most swaps.",
  },
  {
    severity: "danger",
    title: "No network connection",
    body: "We could not process your transaction right now. This is usually temporary, try again in a few seconds.",
  },
];

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-[var(--so-width-wide)] flex-col gap-6 p-8">
      <header className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold text-[var(--so-text)]">
          Solana Onboarding Kit
        </h1>
        <p className="text-[var(--so-text-muted)]">
          Component showroom. Every colour below comes from a token, so
          overriding one token in globals.css rethemes all of them.
        </p>
      </header>

      {samples.map((sample) => (
        <section
          key={sample.severity}
          className={`flex gap-3 rounded-[var(--so-radius-sm)] border p-4 ${severityClasses(
            sample.severity,
          )}`}
        >
          {sample.severity === "neutral" ? (
            <Info className="mt-0.5 size-4 shrink-0" aria-hidden />
          ) : (
            <AlertTriangle className="mt-0.5 size-4 shrink-0" aria-hidden />
          )}
          <div className="flex flex-col gap-1">
            <p className="font-semibold">{sample.title}</p>
            <p className="text-sm">{sample.body}</p>
          </div>
        </section>
      ))}

      <p className="font-[family-name:var(--so-font-mono)] text-[11px] uppercase tracking-wider text-[var(--so-text-subtle)]">
        RPC_CONNECTION_FAILED
      </p>
    </main>
  );
}
