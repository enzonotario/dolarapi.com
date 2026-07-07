import { describe, expect, it } from 'vitest'
import { extraerExchanges } from '@/ar/acciones/extraccion/extraerExchanges.js'

describe('extraerExchanges', () => {
  it('extrae cotizaciones de exchanges', async () => {
    const cotizaciones = await extraerExchanges()

    const cotizacionesAtributos = cotizaciones.map(cotizacion => ({
      exchange: cotizacion.exchange,
      par: cotizacion.par,
      parCriptomoneda: cotizacion.parCriptomoneda,
    }))

    console.table(cotizacionesAtributos)

    expect(cotizaciones.length).toBeGreaterThan(0)
    for (const cotizacion of cotizaciones) {
      expect(cotizacion).toBeTypeOf('object')

      expect(cotizacion.compra).toBeTypeOf('number')

      if (cotizacion.venta)
        expect(cotizacion.venta).toBeTypeOf('number')

      expect(cotizacion.par).toBeTypeOf('object')

      if (cotizacion.parCriptomoneda)
        expect(cotizacion.parCriptomoneda).toBeTypeOf('object')

      expect(cotizacion.fechaActualizacion).toBeTypeOf('object')
    }
  }, {
    timeout: 10000,
  })
})
