import antfu from '@antfu/eslint-config'

export default antfu({
  typescript: false,
  vue: true,
  ignores: [
    '**/datos/**',
  ],
})
