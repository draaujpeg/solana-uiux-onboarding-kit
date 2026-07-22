import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ErrorAlert } from "@kit/error-alert";
import { InlineWarning } from "@kit/inline-warning";
import { KycUpload } from "@kit/kyc-upload";

describe("a block alert", () => {
  it("announces itself and shows the code for support", () => {
    render(
      <ErrorAlert
        icon={<span />}
        title="No network connection"
        description="We could not process your transaction."
        code="RPC_CONNECTION_FAILED"
        primaryAction={{ label: "Try again", onClick: () => {} }}
      />,
    );

    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(screen.getByText("RPC_CONNECTION_FAILED")).toBeInTheDocument();
  });

  it("only offers a dismiss control when the caller handles one", () => {
    const { rerender } = render(
      <ErrorAlert icon={<span />} title="Failed" description="Something." />,
    );
    expect(screen.queryByRole("button", { name: /dismiss/i })).toBeNull();

    rerender(
      <ErrorAlert
        icon={<span />}
        title="Failed"
        description="Something."
        onDismiss={() => {}}
      />,
    );
    expect(screen.getByRole("button", { name: /dismiss/i })).toBeInTheDocument();
  });

  it("holds both actions inert while one is running", () => {
    render(
      <ErrorAlert
        icon={<span />}
        title="Failed"
        description="Something."
        busy
        secondaryAction={{ label: "Contact support", onClick: () => {} }}
        primaryAction={{ label: "Try again", onClick: () => {} }}
      />,
    );

    expect(screen.getByRole("button", { name: "Try again" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Contact support" })).toBeDisabled();
  });
});

describe("an inline warning", () => {
  it("cannot be dismissed, because the condition is still true", () => {
    render(
      <InlineWarning
        icon={<span />}
        title="High slippage"
        description="At 5% you accept receiving less."
        link={{ label: "Why does this happen?", href: "#" }}
      />,
    );

    // One control only, and it is the explanation. No dismiss, no buttons.
    expect(screen.queryByRole("button")).toBeNull();
    expect(screen.getByRole("link")).toHaveTextContent("Why does this happen?");
  });
});

describe("the document upload", () => {
  const file = (name: string, type: string, bytes: number) =>
    new File(["x".repeat(bytes)], name, { type });

  it("refuses a file that is too large, and says why", async () => {
    const user = userEvent.setup();
    render(<KycUpload onBack={() => {}} onSubmit={() => {}} maxSizeMb={1} />);

    await user.upload(
      screen.getByLabelText(/click to upload/i),
      file("id.png", "image/png", 2 * 1024 * 1024),
    );

    expect(screen.getByRole("alert")).toHaveTextContent(/larger than 1 MB/i);
    expect(screen.getByRole("button", { name: "Continue" })).toBeDisabled();
  });

  it("refuses a type it cannot read", () => {
    render(<KycUpload onBack={() => {}} onSubmit={() => {}} />);

    // Fired directly rather than through userEvent, which honours the accept
    // attribute and would never hand the file over. So does the browser's
    // picker, most of the time: the check exists for the times it does not,
    // when a file arrives by drag or through an "all files" filter.
    const input = screen.getByLabelText(/click to upload/i);
    fireEvent.change(input, {
      target: { files: [file("notes.txt", "text/plain", 10)] },
    });

    expect(screen.getByRole("alert")).toHaveTextContent(/not accepted/i);
  });

  it("keeps the chosen document type through a refusal", async () => {
    const user = userEvent.setup();
    render(<KycUpload onBack={() => {}} onSubmit={() => {}} />);

    await user.click(screen.getByLabelText("Passport"));
    fireEvent.change(screen.getByLabelText(/click to upload/i), {
      target: { files: [file("notes.txt", "text/plain", 10)] },
    });

    // Being refused should not send the user back to the top of the screen.
    expect(screen.getByLabelText("Passport")).toBeChecked();
  });

  it("submits an acceptable file with its type", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<KycUpload onBack={() => {}} onSubmit={onSubmit} />);

    const good = file("id.png", "image/png", 10);
    await user.upload(
      screen.getByLabelText(/click to upload/i),
      good,
    );
    await user.click(screen.getByRole("button", { name: "Continue" }));

    expect(onSubmit).toHaveBeenCalledWith(good, "id");
  });
});
