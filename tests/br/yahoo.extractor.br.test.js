import { describe, expect, it, vi } from 'vitest'
import extractor from '@/br/yahoo.extractor.br.js'

vi.mock('@/utils/firecrawl.js', () => ({
  debeEjecutarFirecrawlAhora: vi.fn().mockReturnValue(true),
  scrapearConFirecrawl: vi.fn().mockResolvedValue({
    compra: 5.5,
    venda: 5.6,
    fechoAnterior: 5.4,
    dataAtualizacao: '2025-01-15T12:00:00.000Z',
  }),
}))

describe('yahoo.extractor.br.js', () => {
  it('extrae USD/BRL desde Investing.com usando Firecrawl', {
    timeout: 60000,
  }, async () => {
    const dato = await extractor()

    expect(dato).toBeTypeOf('object')
    expect(dato.moeda).toBe('USD')
    expect(dato.nome).toBeTypeOf('string')
    expect(dato.compra).toBeTypeOf('number')
    expect(dato.venda).toBeTypeOf('number')
    expect(dato.fechoAnterior).toBeTypeOf('number')
    expect(typeof dato.dataAtualizacao).toBe('string')
    expect(dato.compra).toBeGreaterThan(0)
    expect(dato.venda).toBeGreaterThan(0)
    expect(dato.fechoAnterior).toBeGreaterThan(0)
  })
})
