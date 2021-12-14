import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import path from "path";

import markdown from "vite-plugin-md";
import anchor from "markdown-it-anchor";
import toc from "markdown-it-toc-done-right";

function slugify(s: string) {
  const maxNumberOfSlugs = 10;
  return s
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-") // replace all whitespace with '-'
    .replace(/[^a-zA-Z0-9\-]/g, "") // remove all non-alphanumeric or '-' characters
    .split("-")
    .filter((x) => x !== "")
    .slice(0, maxNumberOfSlugs)
    .join("-");
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      include: [/\.vue$/, /\.md$/],
    }),
    markdown({
      markdownItSetup: (md) => {
        md.use(anchor, {
          level: 2,
          slugify: slugify,
        });
        md.use(toc, {
          level: 2,
          listType: "ul",
          slugify: slugify,
        });
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
