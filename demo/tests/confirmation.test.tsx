import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ConfirmationDialog } from "@kit/confirmation-dialog";

// The typed phrase is the kit's strongest guarantee, and the one the type system
// cannot make. TypeScript forces a critical confirmation to be given a phrase;
// only a test can say the comparison actually gates the button.
const critical = {
  open: true,
  onCancel: () => {},
  onConfirm: () => {},
  risk: "critical" as const,
  title: "Revoke wallet access",
  description: "This removes the app's access.",
  confirmPhrase: "REVOKE",
  confirmLabel: "Revoke access",
};

describe("a critical confirmation", () => {
  it("keeps the confirm button locked until the phrase is typed", async () => {
    const user = userEvent.setup();
    const onConfirm = vi.fn();
    render(<ConfirmationDialog {...critical} onConfirm={onConfirm} />);

    const confirm = screen.getByRole("button", { name: "Revoke access" });
    expect(confirm).toBeDisabled();

    await user.type(screen.getByRole("textbox"), "REVOKE");
    expect(confirm).toBeEnabled();

    await user.click(confirm);
    expect(onConfirm).toHaveBeenCalledOnce();
  });

  it("does not unlock on a phrase that only looks right", async () => {
    const user = userEvent.setup();
    render(<ConfirmationDialog {...critical} />);

    await user.type(screen.getByRole("textbox"), "REVOK");
    expect(screen.getByRole("button", { name: "Revoke access" })).toBeDisabled();
  });

  it("ignores case, because the caps lock protects nobody", async () => {
    const user = userEvent.setup();
    render(<ConfirmationDialog {...critical} />);

    await user.type(screen.getByRole("textbox"), "revoke");
    expect(screen.getByRole("button", { name: "Revoke access" })).toBeEnabled();
  });

  it("forgets a phrase typed last time", async () => {
    const user = userEvent.setup();
    const { rerender } = render(<ConfirmationDialog {...critical} />);

    await user.type(screen.getByRole("textbox"), "REVOKE");
    expect(screen.getByRole("button", { name: "Revoke access" })).toBeEnabled();

    // Closing and reopening must not leave the button unlocked before the user
    // has read anything.
    rerender(<ConfirmationDialog {...critical} open={false} />);
    rerender(<ConfirmationDialog {...critical} open />);

    expect(screen.getByRole("button", { name: "Revoke access" })).toBeDisabled();
  });
});

describe("a lesser confirmation", () => {
  it("confirms without ceremony", async () => {
    const user = userEvent.setup();
    const onConfirm = vi.fn();
    render(
      <ConfirmationDialog
        open
        onCancel={() => {}}
        onConfirm={onConfirm}
        risk="low"
        title="Confirm send?"
        description="You are sending 5 SOL."
        confirmLabel="Confirm send"
      />,
    );

    await user.click(screen.getByRole("button", { name: "Confirm send" }));
    expect(onConfirm).toHaveBeenCalledOnce();
  });

  it("cancels rather than letting the dialog close itself", () => {
    const onCancel = vi.fn();
    const { container } = render(
      <ConfirmationDialog
        open
        onCancel={onCancel}
        onConfirm={() => {}}
        risk="low"
        title="Confirm send?"
        description="You are sending 5 SOL."
        confirmLabel="Confirm send"
      />,
    );

    // Escape on a native dialog is the browser's job, and jsdom does not do it,
    // so this fires the event the browser would fire. What is under test is
    // ours: that the handler runs and prevents the default close, which would
    // otherwise shut the element while React still believed it was open.
    const dialog = container.querySelector("dialog")!;
    const cancel = new Event("cancel", { cancelable: true, bubbles: true });
    fireEvent(dialog, cancel);

    expect(onCancel).toHaveBeenCalled();
    expect(cancel.defaultPrevented).toBe(true);
  });
});
