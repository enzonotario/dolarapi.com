import { describe, expect, it } from 'vitest'
import extraerBcv, { extraerEurBcv } from '@/ve/bcv.extractor.js'

describe('bcv.extractor', () => {
  it('extrae cotización USD del BCV', async () => {
    const resultado = await extraerBcv()

    expect(resultado).not.toBeNull()
    expect(resultado.fuente).toBe('oficial')
    expect(resultado.promedio).toBeGreaterThan(0)
    expect(resultado.fechaActualizacion).toBeTruthy()
  }, 15000)

  it('extrae cotización EUR del BCV', async () => {
    const resultado = await extraerEurBcv()

    expect(resultado).not.toBeNull()
    expect(resultado.fuente).toBe('oficial')
    expect(resultado.moneda).toBe('EUR')
    expect(resultado.promedio).toBeGreaterThan(0)
    expect(resultado.fechaActualizacion).toBeTruthy()
  }, 15000)
})
