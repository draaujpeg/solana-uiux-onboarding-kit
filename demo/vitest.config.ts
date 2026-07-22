import path from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

// The component tests live in the demo workspace because that is where React
// and the toolchain already are. What they test lives in skills/, imported
// through the same @kit alias the showroom uses, so the tests exercise the file
// the skill installs rather than a copy.
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@kit": path.join(import.meta.dirname, "..", "skills", "solana-onboarding", "components"),
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./tests/setup.ts"],
    include: ["tests/**/*.test.tsx"],
  },
});
