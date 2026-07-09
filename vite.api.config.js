import { fileURLToPath, URL } from 'node:url'
import devServer from '@hono/vite-dev-server'
import { defineConfig } from 'vite'

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
