import { describe, expect, it } from 'vitest'
import extraer from '@/uy/brou.extractor.js'

describe('uy.dolarapi.com', () => {
  it('extraer dolares', async () => {
    const cotizaciones = await extraer()

    expect(Array.isArray(cotizaciones)).toBe(true)

    if (cotizaciones.length > 0) {
      cotizaciones.forEach((cotizacion) => {
        expect(cotizacion).toBeTypeOf('object')
        expect(cotizacion.moneda).toBeTypeOf('string')
        expect(cotizacion.nombre).toBeTypeOf('string')
        expect(cotizacion.fechaActualizacion).toBeTypeOf('object')

        if (cotizacion.compra)
          expect(cotizacion.compra).toBeTypeOf('number')

        if (cotizacion.venta)
          expect(cotizacion.venta).toBeTypeOf('number')

        expect(cotizacion.compra || cotizacion.venta).toBeTruthy()
      })
    }
  }, {
    timeout: 10000,
  })
})
