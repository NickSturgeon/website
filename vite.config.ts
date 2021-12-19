import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

import { markdown } from "./src/utilities/markdown";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      include: [/\.vue$/, /\.md$/],
    }),
    markdown(),
  ],
});
