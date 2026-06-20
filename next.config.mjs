import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));

// On GitHub Pages the site is served from https://<user>.github.io/<repo>/,
// so assets/links must be prefixed with the repo name. Enabled only in the
// Pages build via the GITHUB_PAGES env var (set in the deploy workflow).
const repo = "Financial-App";
const isGithubPages = process.env.GITHUB_PAGES === "true";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Pin the workspace root to this folder (the machine has other lockfiles).
  outputFileTracingRoot: __dirname,
  // Emit a fully static site to ./out (app is 100% static, no server code).
  output: "export",
  // Static export can't use the Next.js image optimizer.
  images: { unoptimized: true },
  // Subpath base for GitHub Pages project sites.
  basePath: isGithubPages ? `/${repo}` : undefined,
  assetPrefix: isGithubPages ? `/${repo}/` : undefined,
};

export default nextConfig;
