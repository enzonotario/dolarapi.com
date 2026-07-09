import base from '../tailwind.config.mjs'

/** @type {import('tailwindcss').Config} */
export default {
  ...base,
  content: [
    './.vitepress/theme/**/*.{vue,js,ts,jsx,tsx}',
    './.vitepress/config.js',
    './**/*.md',
    '../node_modules/vitepress-openapi/src/**/*.{vue,js,ts,jsx,tsx}',
  ],
}
