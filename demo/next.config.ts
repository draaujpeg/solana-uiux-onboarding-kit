import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    // The kit's components live in ../skills, outside this app, so that the
    // demo renders the very same files the skill copies into a user's project
    // rather than a drifting duplicate. Turbopack refuses to resolve above its
    // root, so the root is raised to the repository.
    root: path.join(import.meta.dirname, ".."),
  },
};

export default nextConfig;
