"use client";

import { FileCheck, Upload } from "lucide-react";
import { useId, useState } from "react";

/**
 * Choosing a document type and attaching the file.
 *
 * The limits are stated before the picker opens, not after the upload fails.
 * That single ordering removes the loop the research found in one exchange,
 * where a user resubmits the same rejected file because nothing ever said what
 * was wrong with it.
 *
 * Three states, where the Figma source drew only the first: nothing chosen, a
 * file chosen, and a file refused. The refusal names the reason and leaves the
 * chosen type alone, so the user is not sent back to the start of the screen.
 */

export interface DocumentType {
  value: string;
  label: string;
}

const defaultTypes: DocumentType[] = [
  { value: "id", label: "National ID" },
  { value: "licence", label: "Driver's licence" },
  { value: "passport", label: "Passport" },
];

export interface KycUploadProps {
  onBack: () => void;
  onSubmit: (file: File, documentType: string) => void;
  types?: DocumentType[];
  accept?: string[];
  maxSizeMb?: number;
  busy?: boolean;
  /** Called when a file is chosen or cleared, so the flow knows what is at stake. */
  onFileChange?: (file: File | null) => void;
}

export function KycUpload({
  onBack,
  onSubmit,
  types = defaultTypes,
  accept = ["image/jpeg", "image/png", "application/pdf"],
  maxSizeMb = 10,
  busy = false,
  onFileChange,
}: KycUploadProps) {
  const [documentType, setDocumentType] = useState(types[0].value);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const groupName = useId();

  const choose = (chosen: File | null) => {
    if (!chosen) {
      setFile(null);
      setError(null);
      onFileChange?.(null);
      return;
    }
    if (!accept.includes(chosen.type)) {
      setFile(null);
      setError("That file type is not accepted. Use JPG, PNG or PDF.");
      onFileChange?.(null);
      return;
    }
    if (chosen.size > maxSizeMb * 1024 * 1024) {
      setFile(null);
      setError(`That file is larger than ${maxSizeMb} MB. Try a smaller photo.`);
      onFileChange?.(null);
      return;
    }
    setFile(chosen);
    setError(null);
    onFileChange?.(chosen);
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="pr-8 text-xl font-semibold">Upload your document</h2>
      <p className="text-sm leading-relaxed text-[var(--so-text-muted)]">
        Choose the type and upload a sharp photo of both sides, if it has them.
      </p>

      <fieldset className="flex flex-col gap-2">
        <legend className="sr-only">Document type</legend>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          {types.map((type) => (
            <label
              key={type.value}
              className={`flex items-center gap-2 rounded-[var(--so-radius-sm)] border px-3 py-2 text-sm ${
                documentType === type.value
                  ? "border-[var(--so-primary)]"
                  : "border-[var(--so-border)]"
              }`}
            >
              <input
                type="radio"
                name={groupName}
                value={type.value}
                checked={documentType === type.value}
                onChange={() => setDocumentType(type.value)}
                className="size-4"
              />
              {type.label}
            </label>
          ))}
        </div>
      </fieldset>

      {/*
        A label wrapping the input, rather than a hidden input driven by a
        separate button. That arrangement leaves a keyboard with two stops, one
        of them a file field with no accessible name. Here there is one control,
        it is named by the text inside it, and focus-within puts the ring where
        the user can see it.
      */}
      <label
        className={`flex cursor-pointer flex-col items-center gap-2 rounded-[var(--so-radius-sm)] border p-8 text-center focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 ${
          error
            ? "border-[var(--so-danger-border)]"
            : "border-[var(--so-border)]"
        }`}
      >
        <input
          type="file"
          accept={accept.join(",")}
          onChange={(event) => choose(event.target.files?.[0] ?? null)}
          className="sr-only"
        />
        {file ? (
          <>
            <FileCheck
              className="size-6 text-[var(--so-success-text)]"
              aria-hidden
            />
            <span className="text-sm font-semibold">{file.name}</span>
            <span className="text-sm text-[var(--so-text-muted)]">
              Choose a different file
            </span>
          </>
        ) : (
          <>
            <Upload className="size-6 text-[var(--so-text-muted)]" aria-hidden />
            <span className="text-sm font-semibold">Click to upload</span>
            <span className="text-sm text-[var(--so-text-muted)]">
              JPG, PNG or PDF, up to {maxSizeMb} MB
            </span>
          </>
        )}
      </label>

      {error && (
        <p role="alert" className="text-sm text-[var(--so-danger-text)]">
          {error}
        </p>
      )}

      <div className="mt-2 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={onBack}
          disabled={busy}
          className="rounded-[var(--so-radius-sm)] border border-[var(--so-border)] bg-transparent px-4 py-2 text-sm font-semibold disabled:opacity-50"
        >
          Back
        </button>
        <button
          type="button"
          onClick={() => file && onSubmit(file, documentType)}
          disabled={!file || busy}
          className="rounded-[var(--so-radius-sm)] bg-[var(--so-primary)] px-4 py-2 text-sm font-semibold text-[var(--so-primary-fg)] disabled:bg-[var(--so-disabled-surface)] disabled:text-[var(--so-disabled-text)]"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
