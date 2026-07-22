"use client";

import { useEffect } from "react";

/**
 * Lets a page be loaded in a forced theme with `?theme=dark`.
 *
 * Only the demo needs this. It declares the same two variables a host declares,
 * on the document root, so the kit adapts through exactly the path a real
 * product uses rather than through a switch built for the occasion. Reading
 * `window.location` after mount rather than the router's hooks keeps it out of
 * the way of static rendering.
 */
export function ThemeFromQuery() {
  useEffect(() => {
    const theme = new URLSearchParams(window.location.search).get("theme");
    const root = document.documentElement;
    if (theme === "dark") {
      root.style.setProperty("--background", "#101012");
      root.style.setProperty("--foreground", "#ededed");
    } else if (theme === "light") {
      root.style.setProperty("--background", "#ffffff");
      root.style.setProperty("--foreground", "#1e1e1e");
    }
  }, []);

  return null;
}
