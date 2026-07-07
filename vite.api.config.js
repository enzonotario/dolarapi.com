import { URL, fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import devServer from '@hono/vite-dev-server'

export default defineConfig({
  plugins: [
    devServer({
      entry: './api/api.js',
    }),
  ],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./api', import.meta.url)),
    },
    extensions: ['.js', '.json', '.jsx', '.mjs', '.ts', '.tsx'],
  },

  build: {
    outDir: './dist',
    emptyOutDir: false,
    rollupOptions: {
      input: './api/api.js',
      output: {
        format: 'esm',
        entryFileNames: 'servidor/[name].js',
        chunkFileNames: 'servidor/[name].js',
        assetFileNames: 'servidor/[name].[ext]',
        exports: 'auto',
      },
    },
  },
})
