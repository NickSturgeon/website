import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import markdown from "vite-plugin-md";
import anchor from "markdown-it-anchor";
import toc from "markdown-it-toc-done-right";

import { slugify } from "./src/utilities";

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
          // @ts-ignore -- complains about function parameters but it is valid
          permalink: anchor.permalink.headerLink({ safariReaderFix: true }),
          tabIndex: false,
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
