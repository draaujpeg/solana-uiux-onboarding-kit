"use client";

import { AlertTriangle, Info } from "lucide-react";
import type { ReactNode } from "react";
import { severitySkin, type Severity } from "./severity";

/**
 * A short block that qualifies what is around it: the consequence a
 * confirmation carries, the caution attached to a field.
 *
 * Unlike the error family, severity here is a real choice, because it comes from
 * the meaning of the surrounding action rather than from where the block sits. A
 * confirmation's callout follows the risk level.
 *
 * The glyph follows severity rather than being passed in, so that the same
 * sentence cannot appear with a different icon on the next screen, which is what
 * the Figma source did with "this action cannot be undone".
 */

export interface CalloutLink {
  label: string;
  href?: string;
  onClick?: () => void;
}

export interface CalloutProps {
  severity?: Severity;
  /** Optional bold first line. Without it the callout is a single paragraph. */
  heading?: string;
  children: ReactNode;
  link?: CalloutLink;
  className?: string;
}

export function Callout({
  severity = "neutral",
  heading,
  children,
  link,
  className = "",
}: CalloutProps) {
  const skin = severitySkin[severity];
  const Icon = severity === "neutral" ? Info : AlertTriangle;

  return (
    <div
      className={`flex gap-3 rounded-[var(--so-radius-sm)] border p-4 ${skin.surface} ${skin.border} ${skin.text} ${className}`}
    >
      <Icon className={`mt-0.5 size-4 shrink-0 ${skin.icon}`} aria-hidden />

      <div className="flex min-w-0 flex-col gap-1 text-sm">
        {heading && <p className="font-semibold">{heading}</p>}
        <p className="leading-relaxed">{children}</p>

        {link &&
          (link.href ? (
            <a
              href={link.href}
              className="mt-1 self-start underline underline-offset-2"
            >
              {link.label}
            </a>
          ) : (
            <button
              type="button"
              onClick={link.onClick}
              className="mt-1 self-start underline underline-offset-2"
            >
              {link.label}
            </button>
          ))}
      </div>
    </div>
  );
}
