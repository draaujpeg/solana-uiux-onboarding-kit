"use client";

import { Camera, FileText, Shield, Sun } from "lucide-react";

/**
 * What verification will ask for, shown before the user hits the wall.
 *
 * The research found KYC arriving as a surprise gate: the user invests time,
 * reaches a withdrawal, and is stopped by a requirement nobody mentioned. This
 * screen moves that requirement earlier, when it costs a decision rather than a
 * lost session, and it lists the physical things needed so nobody starts an
 * upload without their document in reach.
 *
 * "Not now" is a real option. A gate the user can see coming is not a gate they
 * have to walk through this minute.
 */

const requirements = [
  { icon: FileText, label: "A photo ID: national ID, driver's licence or passport" },
  { icon: Camera, label: "A quick selfie, to match against the document" },
  { icon: Sun, label: "Good lighting and camera access enabled" },
];

export interface KycRequirementsProps {
  onDefer: () => void;
  onStart: () => void;
}

export function KycRequirements({ onDefer, onStart }: KycRequirementsProps) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="pr-8 text-xl font-semibold">What you will need</h2>
      <p className="text-sm leading-relaxed text-[var(--so-text-muted)]">
        To unlock withdrawals and transfers we need to confirm your identity. It
        is a standard process, required by law.
      </p>

      <hr className="border-[var(--so-border)]" />

      <ul className="flex flex-col gap-3">
        {requirements.map((requirement) => (
          <li key={requirement.label} className="flex gap-3 text-sm">
            <requirement.icon
              className="mt-0.5 size-4 shrink-0 text-[var(--so-text-muted)]"
              aria-hidden
            />
            <span className="leading-relaxed">{requirement.label}</span>
          </li>
        ))}
      </ul>

      <div className="flex gap-3 rounded-[var(--so-radius-sm)] border border-[var(--so-border)] p-4 text-sm">
        <Shield
          className="mt-0.5 size-4 shrink-0 text-[var(--so-text-muted)]"
          aria-hidden
        />
        <span className="leading-relaxed text-[var(--so-text-muted)]">
          Your data is used only for verification and is not shared.
        </span>
      </div>

      <div className="mt-2 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={onDefer}
          className="rounded-[var(--so-radius-sm)] border border-[var(--so-border)] bg-transparent px-4 py-2 text-sm font-semibold"
        >
          Not now
        </button>
        <button
          type="button"
          onClick={onStart}
          className="rounded-[var(--so-radius-sm)] bg-[var(--so-primary)] px-4 py-2 text-sm font-semibold text-[var(--so-primary-fg)]"
        >
          Start verification
        </button>
      </div>
    </div>
  );
}
