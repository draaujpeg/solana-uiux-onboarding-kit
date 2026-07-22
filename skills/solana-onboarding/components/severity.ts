/**
 * Severity is the one axis shared by every alerting surface in the kit: error
 * alerts, inline warnings and confirmation callouts all skin themselves from
 * here. Keeping the mapping in one place is what stops a red border drifting
 * away from its red text three components later.
 *
 * Severity controls colour only. It never controls layout, and it is
 * deliberately independent of which component is rendering: a block alert can
 * be a warning, and an inline warning can be a danger.
 */
export type Severity = "neutral" | "warning" | "danger";

export interface SeveritySkin {
  /** Background tint of the panel. */
  surface: string;
  /** 1px border of the panel. */
  border: string;
  /** Title and body colour. */
  text: string;
  /** Leading icon colour, usually the darkest tone of the family. */
  icon: string;
}

export const severitySkin: Record<Severity, SeveritySkin> = {
  neutral: {
    surface: "bg-[var(--so-surface)]",
    border: "border-[var(--so-border)]",
    text: "text-[var(--so-text)]",
    icon: "text-[var(--so-text-muted)]",
  },
  warning: {
    surface: "bg-[var(--so-warning-surface)]",
    border: "border-[var(--so-warning-border)]",
    text: "text-[var(--so-warning-text)]",
    icon: "text-[var(--so-warning-text)]",
  },
  danger: {
    surface: "bg-[var(--so-danger-surface)]",
    border: "border-[var(--so-danger-border)]",
    text: "text-[var(--so-danger-text)]",
    icon: "text-[var(--so-danger-text)]",
  },
};

/** Convenience: every skin class for a severity, space separated. */
export function severityClasses(severity: Severity): string {
  const skin = severitySkin[severity];
  return `${skin.surface} ${skin.border} ${skin.text}`;
}
