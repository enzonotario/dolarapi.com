import { describe, expect, it, vi } from 'vitest'
import extraer from '@/cl/investing.extractor.cl.js'

vi.mock('@/utils/firecrawl.js', () => ({
  debeEjecutarFirecrawlAhora: vi.fn().mockReturnValue(true),
  scrapearConFirecrawl: vi.fn().mockResolvedValue({
    compra: 5.5,
    venta: 5.6,
    ultimoCierre: 5.4,
  }),
}))

describe('extraer cotizaciones', () => {
  it('extraer cotizaciones de un texto', async () => {
    const cotizaciones = await extraer()

    expect(Array.isArray(cotizaciones)).toBe(true)

    if (cotizaciones.length > 0) {
      cotizaciones.forEach((cotizacion) => {
        expect(cotizacion).toBeTypeOf('object')
        expect(cotizacion.moneda).toBeTypeOf('string')
        expect(cotizacion.nombre).toBeTypeOf('string')
        expect(cotizacion.compra).toBeTypeOf('number')
        expect(cotizacion.venta).toBeTypeOf('number')
        expect(cotizacion.ultimoCierre).toBeTypeOf('number')
      })
    }
  }, {
    timeout: 30000,
  })
})
