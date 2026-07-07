import { assert, it } from 'vitest'
import { interpretarValorMonetario } from '@/ar/extractores/dolarhoy/interpretarValorMonetario.js'

it('interpreta valor monetario', () => {
  assert(interpretarValorMonetario('1') === 1)
  assert(interpretarValorMonetario('1.0') === 1)
  assert(interpretarValorMonetario('1.01') === 1.01)
  assert(interpretarValorMonetario('$123') === 123)
  assert(interpretarValorMonetario('$1,000') === 1000)
  assert(interpretarValorMonetario('$1,000.00') === 1000)
  assert(interpretarValorMonetario('$1,000.01') === 1000.01)
})
