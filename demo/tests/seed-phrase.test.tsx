import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { SeedPhraseReveal } from "@kit/seed-phrase-reveal";
import { SeedPhraseConfirm } from "@kit/seed-phrase-confirm";
import { SeedPhraseImportFlow } from "@kit/seed-phrase-import";

const words = [
  "apple", "river", "stone", "mirror", "candle", "forest",
  "eagle", "pocket", "silver", "bridge", "cloud", "window",
];

describe("revealing the phrase", () => {
  it("hides it from assistive technology until asked", async () => {
    const user = userEvent.setup();
    const { container } = render(
      <SeedPhraseReveal words={words} onBack={() => {}} onContinue={() => {}} />,
    );

    const list = container.querySelector("ol");
    expect(list).toHaveAttribute("aria-hidden", "true");

    await user.click(screen.getByRole("button", { name: /show phrase/i }));
    expect(list).not.toHaveAttribute("aria-hidden", "true");
  });

  it("will not let the user continue past a phrase they never saw", async () => {
    const user = userEvent.setup();
    render(
      <SeedPhraseReveal words={words} onBack={() => {}} onContinue={() => {}} />,
    );

    const cont = screen.getByRole("button", { name: /written it down/i });
    expect(cont).toBeDisabled();

    await user.click(screen.getByRole("button", { name: /show phrase/i }));
    expect(cont).toBeEnabled();
  });

  it("offers no way to copy the phrase", async () => {
    const user = userEvent.setup();
    render(
      <SeedPhraseReveal words={words} onBack={() => {}} onContinue={() => {}} />,
    );
    await user.click(screen.getByRole("button", { name: /show phrase/i }));

    // A deliberate absence, not an omission: anything on the machine can read
    // the clipboard. This test exists so a future kindness cannot slip it in.
    for (const button of screen.getAllByRole("button")) {
      expect(button.textContent ?? "").not.toMatch(/copy/i);
    }
  });
});

describe("confirming the phrase", () => {
  const challenges = [1, 5, 7, 10];

  it("stays locked while any answer is wrong", async () => {
    const user = userEvent.setup();
    render(
      <SeedPhraseConfirm
        words={words}
        challenges={challenges}
        onBack={() => {}}
        onConfirm={() => {}}
      />,
    );

    const cont = screen.getByRole("button", { name: "Continue" });
    expect(cont).toBeDisabled();

    await user.type(screen.getByLabelText("Word 1"), "apple");
    await user.type(screen.getByLabelText("Word 5"), "candel");
    expect(screen.getByText(/does not match/i)).toBeInTheDocument();
    expect(cont).toBeDisabled();
  });

  it("unlocks once every word is right, ignoring case", async () => {
    const user = userEvent.setup();
    const onConfirm = vi.fn();
    render(
      <SeedPhraseConfirm
        words={words}
        challenges={challenges}
        onBack={() => {}}
        onConfirm={onConfirm}
      />,
    );

    await user.type(screen.getByLabelText("Word 1"), "Apple");
    await user.type(screen.getByLabelText("Word 5"), "candle");
    await user.type(screen.getByLabelText("Word 7"), "eagle");
    await user.type(screen.getByLabelText("Word 10"), "bridge");

    const cont = screen.getByRole("button", { name: "Continue" });
    expect(cont).toBeEnabled();
    await user.click(cont);
    expect(onConfirm).toHaveBeenCalledOnce();
  });
});

describe("importing a phrase", () => {
  it("spreads a pasted phrase across the slots", async () => {
    const user = userEvent.setup();
    const onImport = vi.fn();
    render(
      <SeedPhraseImportFlow
        open
        onCancel={() => {}}
        onImport={onImport}
      />,
    );

    const first = screen.getByLabelText("Word 1");
    await user.click(first);
    await user.paste(words.join(" "));

    expect(screen.getByLabelText("Word 12")).toHaveValue("window");

    await user.click(screen.getByRole("button", { name: /import wallet/i }));
    expect(onImport).toHaveBeenCalledWith(words);
  });

  it("will not import an incomplete phrase", async () => {
    const user = userEvent.setup();
    render(
      <SeedPhraseImportFlow open onCancel={() => {}} onImport={() => {}} />,
    );

    await user.type(screen.getByLabelText("Word 1"), "apple");
    expect(
      screen.getByRole("button", { name: /import wallet/i }),
    ).toBeDisabled();
  });
});
