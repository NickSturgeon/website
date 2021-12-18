import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

import { markdown } from "./src/markdown";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      include: [/\.vue$/, /\.md$/],
    }),
    markdown(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
