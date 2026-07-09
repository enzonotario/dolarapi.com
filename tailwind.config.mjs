import { getIconCollections, iconsPlugin } from '@egoist/tailwindcss-icons'

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  plugins: [
    iconsPlugin({
      collections: getIconCollections(['mdi']),
    }),
  ],
}
