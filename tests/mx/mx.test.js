import { describe, expect, it } from 'vitest'
import extraer from '@/mx/banxico.extractor.js'

describe('mx.dolarapi.com', () => {
  it('extraer dolares', async () => {
    const dolar = await extraer()

    if (dolar) {
      expect(dolar).toBeTypeOf('object')
      expect(dolar.moneda).toBeTypeOf('string')
      expect(dolar.fix).toBeTypeOf('number')
      expect(dolar.compra).toBeTypeOf('number')
      expect(dolar.venta).toBeTypeOf('number')
      expect(dolar.fechaActualizacion).toBeTypeOf('object')
    }
  }, {
    timeout: 10000,
  })
})
