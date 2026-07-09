import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import Database from 'better-sqlite3'
import { describe, expect, it } from 'vitest'
import extraerBcv, { extraerEurBcv } from '@/ve/bcv.extractor.js'
import cron from '@/ve/cron.ve.js'
import extraerYadio, { extraerEurYadio } from '@/ve/yadio.extractor.js'

describe('ve.dolarapi.com', () => {
  it('extraer dolar paralelo de Yadio', async () => {
    const cotizaciones = await extraerYadio()

    expect(cotizaciones).toHaveLength(1)
    expect(cotizaciones[0].fuente).toBe('paralelo')
    expect(cotizaciones[0].promedio).toBeGreaterThan(0)
  }, 10000)

  it('extraer dolar oficial de BCV', async () => {
    const cotizacion = await extraerBcv()

    expect(cotizacion.fuente).toBe('oficial')
    expect(cotizacion.promedio).toBeGreaterThan(0)
  }, 10000)

  it('extraer euro oficial de BCV', async () => {
    const cotizacion = await extraerEurBcv()

    expect(cotizacion).not.toBeNull()
    expect(cotizacion.fuente).toBe('oficial')
    expect(cotizacion.nombre).toBe('Euro')
    expect(cotizacion.moneda).toBe('EUR')
    expect(cotizacion.promedio).toBeGreaterThan(0)
    expect(cotizacion.fechaActualizacion).toBeTruthy()
  }, 10000)

  it('extraer euro de Yadio', async () => {
    const cotizacion = await extraerEurYadio()

    expect(cotizacion).not.toBeNull()
    expect(cotizacion.fuente).toBe('euro')
    expect(cotizacion.nombre).toBe('Euro')
    expect(cotizacion.moneda).toBe('EUR')
    expect(cotizacion.promedio).toBeGreaterThan(0)
    expect(cotizacion.fechaActualizacion).toBeTruthy()
  }, 10000)

  it('ejecutar cron completo', async () => {
    await cron()

    // /dolares — generado desde DB
    const rutaDolares = resolve('datos/ve/v1/dolares/index.json')
    const dolares = JSON.parse(readFileSync(rutaDolares, 'utf-8'))

    expect(dolares.length).toBeGreaterThan(0)
    expect(dolares[0]).toMatchObject({
      fuente: 'oficial',
      nombre: 'Dólar',
      moneda: 'USD',
      compra: null,
      venta: null,
      promedio: expect.any(Number),
      fechaActualizacion: expect.any(String),
    })
    if (dolares.length > 1) {
      expect(dolares[1]).toMatchObject({
        fuente: 'paralelo',
        nombre: 'Paralelo',
        moneda: 'USD',
        compra: null,
        venta: null,
        promedio: expect.any(Number),
        fechaActualizacion: expect.any(String),
      })
    }

    // /cotizaciones — generado desde DB
    const rutaCotizaciones = resolve('datos/ve/v1/cotizaciones/index.json')
    const cotizaciones = JSON.parse(readFileSync(rutaCotizaciones, 'utf-8'))

    expect(cotizaciones).toHaveLength(2)
    expect(cotizaciones).toMatchObject([
      {
        fuente: 'oficial',
        nombre: 'Dólar',
        moneda: 'USD',
        compra: null,
        venta: null,
        promedio: expect.any(Number),
        fechaActualizacion: expect.any(String),
      },
      {
        fuente: 'oficial',
        nombre: 'Euro',
        moneda: 'EUR',
        compra: null,
        venta: null,
        promedio: expect.any(Number),
        fechaActualizacion: expect.any(String),
      },
    ])

    // /euros — generado desde DB
    const rutaEuros = resolve('datos/ve/v1/euros/index.json')
    const euros = JSON.parse(readFileSync(rutaEuros, 'utf-8'))

    expect(euros.length).toBeGreaterThanOrEqual(1)
    expect(euros[0]).toMatchObject({
      fuente: 'oficial',
      nombre: 'Euro',
      moneda: 'EUR',
      compra: null,
      venta: null,
      promedio: expect.any(Number),
      fechaActualizacion: expect.any(String),
    })
    if (euros.length > 1) {
      expect(euros[1]).toMatchObject({
        fuente: 'paralelo',
        nombre: 'Paralelo',
        moneda: 'EUR',
        compra: null,
        venta: null,
        promedio: expect.any(Number),
        fechaActualizacion: expect.any(String),
      })
    }

    // DB
    const archivoBD = resolve('datos/ve/ve.sqlite')
    const db = new Database(archivoBD)
    const usd = db.prepare('SELECT * FROM cotizaciones WHERE moneda = ? AND fuente = ? ORDER BY fechaActualizacion DESC LIMIT 1').get('USD', 'oficial')
    const eur = db.prepare('SELECT * FROM cotizaciones WHERE moneda = ? AND fuente = ? ORDER BY fechaActualizacion DESC LIMIT 1').get('EUR', 'oficial')
    db.close()

    expect(usd).toMatchObject({
      moneda: 'USD',
      fuente: 'oficial',
      nombre: 'Dólar',
    })
    expect(eur).toMatchObject({
      moneda: 'EUR',
      fuente: 'oficial',
      nombre: 'Euro',
    })
    expect(usd.promedio).toBeGreaterThan(0)
    expect(eur.promedio).toBeGreaterThan(0)

    // Historicos
    const historicoOficial = JSON.parse(readFileSync(resolve('datos/ve/v1/historicos/dolares/oficial/index.json'), 'utf-8'))
    expect(Array.isArray(historicoOficial)).toBe(true)
    expect(historicoOficial.length).toBeGreaterThan(0)
    expect(historicoOficial[0]).toMatchObject({
      fuente: 'oficial',
      promedio: expect.any(Number),
      fecha: expect.any(String),
    })
  }, 60000)
})
