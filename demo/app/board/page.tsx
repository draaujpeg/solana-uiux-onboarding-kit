"use client";

import { useState } from "react";
import { groups, screens } from "../screen/screens";

// Every screen the kit produces, on one page, in rows by family. The Figma
// board's job, done with the components themselves.
//
// Each cell is an iframe rather than an inline render, for a reason that is not
// laziness: half of these are native dialogs, which the browser puts in the top
// layer, and only one can be open per document. Separate documents also mean a
// cell cannot be styled by the page around it, so what you review is what the
// component does on its own.
export default function BoardPage() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [zoom, setZoom] = useState(1);

  return (
    <main className="flex flex-col gap-8 p-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold">Every screen</h1>
          <p className="text-[var(--so-text-muted)]">
            {screens.length} screens across {groups.length} families. Real
            components, one document each, so the dialogs render as dialogs.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-sm">
          <label className="flex items-center gap-2">
            <span className="text-[var(--so-text-muted)]">Theme</span>
            <select
              value={theme}
              onChange={(event) =>
                setTheme(event.target.value as "light" | "dark")
              }
              className="rounded-[var(--so-radius-sm)] border border-[var(--so-border)] bg-[var(--so-surface)] px-2 py-1"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </label>
          <label className="flex items-center gap-2">
            <span className="text-[var(--so-text-muted)]">Size</span>
            <input
              type="range"
              min={0.6}
              max={1.4}
              step={0.1}
              value={zoom}
              onChange={(event) => setZoom(Number(event.target.value))}
            />
          </label>
        </div>
      </header>

      {groups.map((group) => (
        <section key={group} className="flex flex-col gap-3">
          <h2 className="font-semibold">{group}</h2>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {screens
              .filter((screen) => screen.group === group)
              .map((screen) => (
                <figure key={screen.id} className="flex shrink-0 flex-col gap-2">
                  <div
                    className="overflow-hidden rounded-[var(--so-radius-lg)] border border-[var(--so-border)]"
                    style={{ width: 560 * zoom, height: 460 * zoom }}
                  >
                    <iframe
                      key={`${screen.id}-${theme}`}
                      src={`/screen?id=${screen.id}&theme=${theme}`}
                      title={screen.label}
                      loading="lazy"
                      className="origin-top-left border-0"
                      style={{
                        width: 560,
                        height: 460,
                        transform: `scale(${zoom})`,
                        background: theme === "dark" ? "#101012" : "#ffffff",
                      }}
                    />
                  </div>
                  <figcaption className="text-sm text-[var(--so-text-muted)]">
                    {screen.label}
                  </figcaption>
                </figure>
              ))}
          </div>
        </section>
      ))}
    </main>
  );
}
