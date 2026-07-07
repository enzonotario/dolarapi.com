import { describe, expect, it, vi } from 'vitest'
import { scrapearConFirecrawl, debeEjecutarFirecrawlAhora } from '@/utils/firecrawl.js'
import { grupo } from '@/log.js'

describe('firecrawl.js', () => {
  it('debeEjecutarFirecrawlAhora retorna true a las 12 y 20 UTC y false en otras horas', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2025-01-15T12:00:00.000Z'))
    expect(debeEjecutarFirecrawlAhora()).toBe(true)
    vi.setSystemTime(new Date('2025-01-15T20:00:00.000Z'))
    expect(debeEjecutarFirecrawlAhora()).toBe(true)
    vi.setSystemTime(new Date('2025-01-15T14:00:00.000Z'))
    expect(debeEjecutarFirecrawlAhora()).toBe(false)
    vi.useRealTimers()
  })

  it('scrapea una URL con Firecrawl y retorna JSON estructurado', {
    timeout: 60000,
  }, async () => {
    const log = grupo({ test: 'firecrawl.test.js' })
    const fetchOriginal = globalThis.fetch
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        success: true,
        data: {
          json: {
            compra: 5.5,
            venda: 5.6,
            fechoAnterior: 5.4,
            dataAtualizacao: '2025-01-15T12:00:00.000Z',
          },
        },
      }),
    })

    const url = 'https://es.investing.com/currencies/usd-brl'

    const resultado = await scrapearConFirecrawl(log, {
      url,
      prompt: 'Extrae los valores de compra (bid), venta (ask), cierre anterior (prevClose) y fecha de actualización de la cotización de la moneda.',
      schema: {
        compra: {
          type: 'number',
          description: 'Valor de compra (bid) de la moneda',
        },
        venda: {
          type: 'number',
          description: 'Valor de venta (ask) de la moneda',
        },
        fechoAnterior: {
          type: 'number',
          description: 'Valor de cierre anterior (prevClose) de la moneda',
        },
        dataAtualizacao: {
          type: 'string',
          description: 'Fecha y hora de actualización en formato ISO 8601',
        },
      },
      required: ['compra', 'venda', 'fechoAnterior', 'dataAtualizacao'],
    })

    expect(resultado).toBeTypeOf('object')
    expect(resultado.compra).toBeTypeOf('number')
    expect(resultado.venda).toBeTypeOf('number')
    expect(resultado.fechoAnterior).toBeTypeOf('number')
    expect(resultado.dataAtualizacao).toBeTypeOf('string')
    expect(resultado.compra).toBe(5.5)
    expect(resultado.venda).toBe(5.6)
    expect(resultado.fechoAnterior).toBe(5.4)
    globalThis.fetch = fetchOriginal
  })

  it('lanza error cuando la URL es inválida', {
    timeout: 60000,
  }, async () => {
    const log = grupo({ test: 'firecrawl.test.js' })
    const fetchOriginal = globalThis.fetch
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 404,
      text: async () => 'Not Found',
    })

    const url = 'https://example.invalid/page-that-does-not-exist'

    await expect(async () => {
      await scrapearConFirecrawl(log, {
        url,
        prompt: 'Extrae cualquier dato',
        schema: {
          dato: {
            type: 'string',
            description: 'Un dato cualquiera',
          },
        },
        required: ['dato'],
      })
    }).rejects.toThrow()
    globalThis.fetch = fetchOriginal
  })
})
