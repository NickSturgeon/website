import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import markdown from 'vite-plugin-md'
import anchor from 'markdown-it-anchor'
import toc from 'markdown-it-toc-done-right'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      include: [/\.vue$/, /\.md$/],
    }), 
    markdown({ 
      markdownItSetup: md => {
        md.use(anchor)
        md.use(toc)
      },
    }),
  ],
  resolve: {},
  server: {
    port: 5465, // LINK
  }
})
