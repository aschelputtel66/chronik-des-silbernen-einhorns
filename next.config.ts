import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_PAGES === "true";
const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "chronik-des-silbernen-einhorns";
const pagesBasePath = `/${repositoryName}`;

const nextConfig: NextConfig = {
  ...(isGitHubPages
    ? {
        output: "export",
        trailingSlash: true,
        basePath: pagesBasePath,
        assetPrefix: pagesBasePath,
        images: { unoptimized: true },
        typescript: { tsconfigPath: "tsconfig.pages.json" },
      }
    : {}),
};

export default nextConfig;
