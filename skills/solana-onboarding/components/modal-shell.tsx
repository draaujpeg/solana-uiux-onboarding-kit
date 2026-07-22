"use client";

import { X } from "lucide-react";
import { useEffect, useRef, type ReactNode } from "react";

/**
 * The dialog every modal in the kit is built on.
 *
 * It uses the native `<dialog>` element rather than a hand-rolled overlay,
 * because the browser then owns the parts that are easy to get wrong and easy to
 * forget: focus is trapped while open, Escape closes, the rest of the page is
 * inert, and the backdrop is a real pseudo-element rather than a div that
 * swallows clicks. The Figma source had no close control anywhere, which is the
 * gap this closes.
 *
 * Where leaving is costly, such as with the recovery phrase on screen or a KYC
 * upload half done, the flow that owns the dialog is the one that asks before
 * closing. The shell stays unopinionated about that on purpose: it cannot know
 * what the user would lose.
 */

export interface ModalShellProps {
  open: boolean;
  /** Called by the close control, by Escape and by a click on the backdrop. */
  onClose: () => void;
  /** Compact suits confirmations and the seed phrase flow, wide suits KYC. */
  width?: "compact" | "wide";
  /** Accessible name for the dialog. */
  label: string;
  /** Accessible name for the close control. */
  closeLabel?: string;
  children: ReactNode;
  className?: string;
}

export function ModalShell({
  open,
  onClose,
  width = "compact",
  label,
  closeLabel = "Close",
  children,
  className = "",
}: ModalShellProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    // showModal is what traps focus and makes the page behind inert. Calling it
    // twice throws, hence the open check.
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-label={label}
      // The width tokens are maximums, so a narrow screen gets the full width
      // minus a margin rather than a dialog running off the edge.
      className={`relative m-auto w-[calc(100%-2rem)] rounded-[var(--so-radius-lg)] bg-[var(--so-surface)] p-6 text-[var(--so-text)] backdrop:bg-[var(--so-scrim)] ${
        width === "wide"
          ? "max-w-[var(--so-width-wide)]"
          : "max-w-[var(--so-width-compact)]"
      } ${className}`}
      onCancel={(event) => {
        // Escape would close the element directly, leaving React's state saying
        // it is still open. Let the caller drive it instead.
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === ref.current) onClose();
      }}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label={closeLabel}
        className="absolute right-4 top-4 rounded-[var(--so-radius-sm)] p-1 text-[var(--so-text-muted)]"
      >
        <X className="size-5" aria-hidden />
      </button>

      {children}
    </dialog>
  );
}
