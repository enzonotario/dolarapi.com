import { describe, expect, it } from 'vitest'
import extraerDolarOficial from '@/bo/bcb.extractor.js'
import extraerBinance from '@/bo/binance-bo.extractor.js'

describe('bo.dolarapi.com', () => {
  it('dolar oficial', {
    timeout: 15000,
  }, async () => {
    const dolar = await extraerDolarOficial()

    expect(dolar).not.toBeNull()
    expect(dolar).toBeTypeOf('object')
    expect(dolar.moneda).toBe('USD')
    expect(dolar.casa).toBe('oficial')
    expect(dolar.nombre).toBe('Oficial')
    expect(dolar.compra).toBeTypeOf('number')
    expect(dolar.venta).toBeTypeOf('number')
    expect(dolar.compra).toBeGreaterThan(0)
    expect(dolar.venta).toBeGreaterThan(0)
    expect(dolar.compra).toBe(dolar.venta)
    expect(dolar.fechaActualizacion).toBeTypeOf('object')
    expect(dolar.fechaActualizacion.getTime()).not.toBeNaN()
  })

  it('dolar binance-bo', {
    timeout: 15000,
  }, async () => {
    const dolar = await extraerBinance()

    expect(dolar).not.toBeNull()
    expect(dolar).toBeTypeOf('object')
    expect(dolar.moneda).toBe('USD')
    expect(dolar.casa).toBe('binance')
    expect(dolar.nombre).toBe('Binance')
    expect(dolar.compra).toBeTypeOf('number')
    expect(dolar.venta).toBeTypeOf('number')
    expect(dolar.compra).toBeGreaterThan(0)
    expect(dolar.venta).toBeGreaterThan(0)
    expect(dolar.fechaActualizacion).toBeTypeOf('object')
  })
})
