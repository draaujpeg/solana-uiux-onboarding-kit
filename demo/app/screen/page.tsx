"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { screens } from "./screens";

// One screen, alone, with no page chrome around it. The board embeds this once
// per cell.
function Screen() {
  const id = useSearchParams().get("id");
  const screen = screens.find((entry) => entry.id === id);

  if (!screen) {
    return (
      <main className="p-6 text-sm text-[var(--so-text-muted)]">
        No screen called {id ?? "nothing"}.
      </main>
    );
  }

  return (
    <main className="flex flex-1 items-center justify-center p-6">
      {screen.node}
    </main>
  );
}

// useSearchParams opts the route into client rendering, which Next asks to be
// declared rather than inferred.
export default function ScreenPage() {
  return (
    <Suspense>
      <Screen />
    </Suspense>
  );
}
