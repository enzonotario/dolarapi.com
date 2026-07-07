import { expect, it } from 'vitest'
import { interpretarVariacion } from '@/ar/extractores/ambito/interpretarVariacion.js'

it('interpreta variacion porcentual positiva', () => {
  expect(interpretarVariacion('2,50%')).toBe(2.5)
  expect(interpretarVariacion('0,50%')).toBe(0.5)
  expect(interpretarVariacion('10,00%')).toBe(10)
})

it('interpreta variacion porcentual negativa', () => {
  expect(interpretarVariacion('-1,54%')).toBe(-1.54)
  expect(interpretarVariacion('-0,34%')).toBe(-0.34)
})

it('interpreta variacion cero', () => {
  expect(interpretarVariacion('0,00%')).toBe(0)
})

it('retorna nulo para valores invalidos', () => {
  expect(interpretarVariacion(null)).toBeNull()
  expect(interpretarVariacion(undefined)).toBeNull()
  expect(interpretarVariacion('')).toBeNull()
  expect(interpretarVariacion('S/C')).toBeNull()
  expect(interpretarVariacion('N/A')).toBeNull()
  expect(interpretarVariacion('--')).toBeNull()
})
