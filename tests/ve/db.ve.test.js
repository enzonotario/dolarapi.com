import fs from 'node:fs'
import path from 'node:path'
import Database from 'better-sqlite3'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { faker } from '@faker-js/faker'

const directorioTemporal = path.join('datos', 've')
const archivoBD = path.join(directorioTemporal, 've.test.sqlite')

describe('guardarCotizacionesVe con SQLite real', () => {
  beforeEach(() => {
    if (fs.existsSync(archivoBD))
      fs.unlinkSync(archivoBD)
  })

  afterEach(() => {
    if (fs.existsSync(archivoBD))
      fs.unlinkSync(archivoBD)
  })

  it('crea la base de datos y guarda filas en la primera ejecución', async () => {
    const { guardarCotizacionesVe } = await import('@/ve/db.ve.js')

    const compra = faker.number.float()
    const venta = compra + faker.number.float()
    const promedio = (compra + venta) / 2
    const fechaActualizacion = faker.date.recent({ days: 3 }).toISOString()

    const fila = {
      moneda: 'USD',
      fuente: 'oficial',
      nombre: 'Dólar',
      compra,
      venta,
      promedio,
      fechaActualizacion,
    }

    const ok = guardarCotizacionesVe([fila], archivoBD)
    expect(ok).toBe(true)
    expect(fs.existsSync(archivoBD)).toBe(true)

    const db = new Database(archivoBD)
    const count = db.prepare('SELECT COUNT(*) as c FROM cotizaciones').get().c
    const usd = db.prepare('SELECT * FROM cotizaciones WHERE moneda = ? AND fuente = ?').get('USD', 'oficial')
    db.close()

    expect(count).toBe(1)
    expect(usd).toBeTruthy()
    expect(usd.compra).toBeCloseTo(compra, 2)
  })

  it('acumula historial en ejecuciones sucesivas', async () => {
    const { guardarCotizacionesVe } = await import('@/ve/db.ve.js')

    const compra1 = faker.number.float()
    const venta1 = compra1 + faker.number.float()
    const promedio1 = (compra1 + venta1) / 2
    const fechaActualizacion1 = new Date(Date.now() + 1000).toISOString()

    const primera = {
      moneda: 'USD',
      fuente: 'oficial',
      nombre: 'Dólar',
      compra: compra1,
      venta: venta1,
      promedio: promedio1,
      fechaActualizacion: fechaActualizacion1,
    }

    const compra2 = compra1 + faker.number.float()
    const venta2 = compra2 + faker.number.float()
    const fechaActualizacion2 = new Date(Date.parse(fechaActualizacion1) + faker.number.int({ min: 1_000, max: 10_000 })).toISOString()

    const segunda = {
      ...primera,
      compra: compra2,
      venta: venta2,
      fechaActualizacion: fechaActualizacion2,
    }

    guardarCotizacionesVe([primera], archivoBD)
    guardarCotizacionesVe([segunda], archivoBD)

    const db = new Database(archivoBD)
    const count = db.prepare('SELECT COUNT(*) as c FROM cotizaciones').get().c
    const usd = db.prepare('SELECT * FROM cotizaciones WHERE moneda = ? AND fuente = ? ORDER BY fechaActualizacion DESC LIMIT 1').get('USD', 'oficial')
    db.close()

    expect(count).toBe(2)
    expect(usd).toBeTruthy()
    expect(usd.compra).toBeCloseTo(compra2, 2)
    expect(usd.venta).toBeCloseTo(venta2, 2)
  })

  it('guarda múltiples cotizaciones con distinta moneda y fuente', async () => {
    const { guardarCotizacionesVe } = await import('@/ve/db.ve.js')

    const cotizaciones = [
      {
        moneda: 'USD',
        fuente: 'oficial',
        nombre: 'Dólar',
        compra: faker.number.float(),
        venta: faker.number.float(),
        promedio: faker.number.float(),
        fechaActualizacion: faker.date.recent().toISOString(),
      },
      {
        moneda: 'EUR',
        fuente: 'oficial',
        nombre: 'Euro',
        compra: faker.number.float(),
        venta: faker.number.float(),
        promedio: faker.number.float(),
        fechaActualizacion: faker.date.recent().toISOString(),
      },
    ]

    guardarCotizacionesVe(cotizaciones, archivoBD)

    const db = new Database(archivoBD)
    const count = db.prepare('SELECT COUNT(*) as c FROM cotizaciones').get().c
    const filas = db.prepare('SELECT * FROM cotizaciones ORDER BY moneda').all()
    db.close()

    expect(count).toBe(2)
    expect(filas[0].moneda).toBe('EUR')
    expect(filas[1].moneda).toBe('USD')
  })
})
