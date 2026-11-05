import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { extraerCotizacion, extraerCotizacionEur } from '@/ve/bcv.extractor.js'

vi.mock('@/log.js', () => ({
  grupo: vi.fn(),
  logError: vi.fn(),
}))

describe.each([
  ['USD', extraerCotizacion],
  ['EUR', extraerCotizacionEur],
])('bcv.extractor %s', (moneda, extraer) => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-11-05T12:00:00Z'))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it.each([
    ['894,88760000', 894.8876],
    ['999,76919200', 999.769192],
    ['1.006,03263992', 1006.03263992],
    ['1.006', 1006],
    ['1.234.567,89012345', 1234567.89012345],
    [' \n 1.006,03263992\u00A0', 1006.03263992],
  ])('interpreta %s como %s', (valor, esperado) => {
    const html = `
      <div class="recuadrotsmc">
        <span>USD</span>
        <strong>${moneda === 'USD' ? valor : '894,88760000'}</strong>
      </div>
      <div class="recuadrotsmc">
        <span>EUR</span>
        <strong>${moneda === 'EUR' ? valor : '1.006,03263992'}</strong>
      </div>
      <span class="date-display-single" content="2026-11-05T00:00:00-04:00"></span>
    `

    expect(extraer(html)).toMatchObject({
      fuente: 'oficial',
      promedio: esperado,
      fechaActualizacion: '2026-11-05T00:00:00-04:00',
    })
  })
})
