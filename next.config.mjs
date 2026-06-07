import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Pin the workspace root to this folder (the machine has other lockfiles).
  outputFileTracingRoot: __dirname,
  // Emit a fully static site to ./out (app is 100% static, no server code).
  output: "export",
  // Static export can't use the Next.js image optimizer.
  images: { unoptimized: true },
};

export default nextConfig;
