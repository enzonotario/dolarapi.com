import { describe, expect, it } from 'vitest'
import extraerDolarOficial from '@/bo/bcb.extractor.js'
import extraerBinance from '@/bo/binance-bo.extractor.js'

describe('bo.dolarapi.com', () => {
  it('dolar oficial', async () => {
    const dolar = await extraerDolarOficial()

    if (dolar) {
      expect(dolar).toBeTypeOf('object')
      expect(dolar.moneda).toBe('USD')
      expect(dolar.casa).toBe('oficial')
      expect(dolar.nombre).toBe('Oficial')
      expect(dolar.compra).toBeTypeOf('number')
      expect(dolar.venta).toBeTypeOf('number')
      expect(dolar.fechaActualizacion).toBeTypeOf('object')
    }
  }, {
    timeout: 10000,
  })

  it('dolar binance-bo', async () => {
    const dolar = await extraerBinance()
    console.log({ dolar })

    if (dolar) {
      expect(dolar).toBeTypeOf('object')
      expect(dolar.moneda).toBe('USD')
      expect(dolar.casa).toBe('binance')
      expect(dolar.nombre).toBe('Binance')
      expect(dolar.compra).toBeTypeOf('number')
      expect(dolar.venta).toBeTypeOf('number')
      expect(dolar.fechaActualizacion).toBeTypeOf('object')
    }
  }, {
    timeout: 10000,
  })
})
