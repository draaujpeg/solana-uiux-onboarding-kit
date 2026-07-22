import type { ReactNode } from "react";

/**
 * The what-you-are-about-to-do table: label on the left, value on the right, one
 * row per number the user should check before committing.
 *
 * It belongs to any action that moves amounts, whatever its risk level. The
 * Figma source only drew it on the medium-risk swap, which reads as a rule that
 * higher risk needs less detail. It is not one.
 *
 * A description list rather than a table element, since these are pairs of
 * labels and values, not a grid with meaningful columns.
 */

export interface SummaryRow {
  label: string;
  value: ReactNode;
}

export interface SummaryTableProps {
  rows: SummaryRow[];
  className?: string;
}

export function SummaryTable({ rows, className = "" }: SummaryTableProps) {
  return (
    <dl
      className={`divide-y divide-[var(--so-border)] rounded-[var(--so-radius-sm)] border border-[var(--so-border)] ${className}`}
    >
      {rows.map((row) => (
        <div
          key={row.label}
          className="flex items-center justify-between gap-4 px-4 py-3 text-sm"
        >
          <dt className="text-[var(--so-text-muted)]">{row.label}</dt>
          <dd className="text-right font-semibold">{row.value}</dd>
        </div>
      ))}
    </dl>
  );
}
