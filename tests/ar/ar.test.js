import { describe, expect, it } from 'vitest'
import { extraerAmbito } from '@/ar/acciones/extraccion/extraerAmbito.esjs'
import { extraerExchanges } from '@/ar/acciones/extraccion/extraerExchanges.esjs'
import { extraerInvertirOnline } from '@/ar/acciones/extraccion/extraerInvertirOnline.esjs'
import { extraerCotizaciones } from '@/ar/bna.extractor.esjs'
import { extraerDolares } from '@/ar/dolarhoy.dolares.extractor.esjs'

describe(
  'dolarapi.com (Argentina)',
  () => {
    it('dolarhoy.dolares.extractor.esjs', async () => {
      const dolares = await extraerDolares()

      expect(dolares.length).toBeGreaterThan(0)

      dolares.forEach((dolar) => {
        expect(dolar).toBeTypeOf('object')
        expect(dolar.moneda).toBeTypeOf('string')
        expect(dolar.nombre).toBeTypeOf('string')
        expect(dolar.compra).toBeTypeOf('number')
        expect(dolar.venta).toBeTypeOf('number')
        expect(dolar.fechaActualizacion).toBeTypeOf('object')
      })

      const casas = [
        'oficial',
        'blue',
        'bolsa',
        'contadoconliqui',
        'mayorista',
        'cripto',
      ]

      casas.forEach((casa) => {
        const dolar = dolares.find((dolar) => dolar.casa === casa)
        expect(dolar).not.toBeUndefined()
      })
    })

    it('bna.extractor.esjs', async () => {
      const cotizaciones = await extraerCotizaciones()

      expect(cotizaciones.length).toBeGreaterThan(0)

      cotizaciones.forEach((cotizacion) => {
        expect(cotizacion).toBeTypeOf('object')
        expect(cotizacion.moneda).toBeTypeOf('string')
        expect(cotizacion.casa).toBeTypeOf('string')
        expect(cotizacion.compra).toBeTypeOf('number')
        expect(cotizacion.venta).toBeTypeOf('number')
        expect(cotizacion.fechaActualizacion).toBeTypeOf('object')
      })

      const monedasEsperadas = ['USD']

      monedasEsperadas.forEach((moneda) => {
        const cotizacion = cotizaciones.find(
          (cotizacion) => cotizacion.moneda === moneda,
        )
        expect(cotizacion).not.toBeUndefined()
      })
    })

    it('extraerInvertirOnline', async () => {
      const cotizaciones = await extraerInvertirOnline()

      expect(Array.isArray(cotizaciones)).toBe(true)

      if (cotizaciones.length > 0) {
        cotizaciones.forEach((cotizacion) => {
          expect(cotizacion).toBeTypeOf('object')
          expect(cotizacion.moneda).toBeTypeOf('string')
          expect(cotizacion.compra).toBeTypeOf('number')
          expect(cotizacion.venta).toBeTypeOf('number')
          expect(cotizacion.fechaActualizacion).toBeTypeOf('object')
        })
      }
    })

    it('extraerAmbito', async () => {
      const dolares = await extraerAmbito()

      expect(Array.isArray(dolares)).toBe(true)

      if (dolares.length > 0) {
        dolares.forEach((dolar) => {
          expect(dolar).toBeTypeOf('object')
          expect(dolar.moneda).toBeTypeOf('string')
          expect(dolar.casa).toBeTypeOf('string')
          expect(dolar.nombre).toBeTypeOf('string')
          expect(dolar.venta).toBeTypeOf('number')
          expect(dolar.fechaActualizacion).toBeTypeOf('object')
        })

        const dolarBna = dolares.find(dolar => dolar.casa === 'bna')
        expect(dolarBna).not.toBeUndefined()
        expect(dolarBna.nombre).toBe('BNA')
      }
    })

    it('extraerExchanges', async () => {
      const cotizaciones = await extraerExchanges()

      expect(cotizaciones.length).toBeGreaterThan(0)

      cotizaciones.forEach((cotizacion) => {
        expect(cotizacion).toBeTypeOf('object')
        expect(cotizacion.exchange).toBeTypeOf('string')
        expect(Array.isArray(cotizacion.par)).toBe(true)
        expect(cotizacion.fechaActualizacion).toBeTypeOf('object')
      })

      const exchangesEsperados = [
        'belo',
        'fiwind',
        'dolarapp',
        'satoshitango',
        'lemon',
      ]

      exchangesEsperados.forEach((exchange) => {
        const cotizacion = cotizaciones.find((c) => c.exchange === exchange)
        expect(cotizacion).not.toBeUndefined()
      })
    })
  },
  {
    timeout: 100000,
  },
)
