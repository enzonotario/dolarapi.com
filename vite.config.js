import { URL, fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

export default defineConfig({
  test: {},

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./cron', import.meta.url)),
    },
    extensions: [
      '.js',
      '.json',
      '.jsx',
      '.mjs',
      '.ts',
      '.tsx',
    ],
  },

  build: {
    outDir: './dist/cron',
    emptyOutDir: false,
    rollupOptions: {
      input: './cron/index.js',
      output: {
        format: 'esm',
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        assetFileNames: '[name].[ext]',
        exports: 'auto',
      },
    },
  },
})
