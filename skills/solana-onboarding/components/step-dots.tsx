/**
 * Progress through a multi-step flow.
 *
 * Decorative for the mouse, spoken for the screen reader. The Figma source built
 * these out of icon buttons, which would have put empty stops in the keyboard
 * path: nothing to press, and no way to know why the focus ring landed there.
 */

export interface StepDotsProps {
  /** One-based. */
  current: number;
  total: number;
  className?: string;
}

export function StepDots({ current, total, className = "" }: StepDotsProps) {
  return (
    <div className={`flex items-center justify-center gap-2 ${className}`}>
      <span className="sr-only">
        Step {current} of {total}
      </span>
      {Array.from({ length: total }, (_, index) => (
        <span
          key={index}
          aria-hidden
          className={`size-2 rounded-full ${
            index < current
              ? "bg-[var(--so-primary)]"
              : "bg-[var(--so-disabled-surface)]"
          }`}
        />
      ))}
    </div>
  );
}
