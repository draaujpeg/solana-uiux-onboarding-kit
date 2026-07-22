"use client";

import { useId } from "react";
import { Callout, type CalloutLink } from "./callout";

/**
 * The destination address field, with the warning attached to it.
 *
 * This is prevention rather than confirmation, and it is the cheapest safety in
 * the whole kit: a mistyped character on Solana does not fail, it sends to a
 * different valid address that nobody controls. Warning at the moment of typing
 * costs nothing, while a confirmation afterwards is already too late to help
 * someone who pasted the wrong thing.
 *
 * Neutral severity on purpose. Nothing is wrong yet, and colouring a field red
 * before the user has made a mistake reads as an accusation.
 */

export interface AddressFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  /** Bold first line of the warning. */
  warningHeading: string;
  /** What can go wrong, in plain language. */
  warningBody: string;
  /** Optional way out for the user who is not sure how to copy an address. */
  link?: CalloutLink;
  className?: string;
}

export function AddressField({
  label,
  value,
  onChange,
  placeholder,
  warningHeading,
  warningBody,
  link,
  className = "",
}: AddressFieldProps) {
  const inputId = useId();

  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      <label htmlFor={inputId} className="text-sm text-[var(--so-text-muted)]">
        {label}
      </label>
      <input
        id={inputId}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        autoComplete="off"
        spellCheck={false}
        className="rounded-[var(--so-radius-sm)] border border-[var(--so-border)] px-3 py-2 text-sm"
      />
      <Callout heading={warningHeading} link={link}>
        {warningBody}
      </Callout>
    </div>
  );
}
