import fs from 'node:fs'
import path from 'node:path'
import { faker } from '@faker-js/faker'
import Database from 'better-sqlite3'
import { describe, expect, it } from 'vitest'

const directorioTemporal = path.join('datos', 'br')
const archivoBD = path.join(directorioTemporal, 'br.sqlite')

describe('guardarCotizacionesBr con SQLite real', () => {
  it('crea la base de datos y guarda filas en la primera ejecución', async () => {
    const { guardarCotizacionesBr } = await import('@/br/db.br.js')

    const compra = faker.number.float()
    const venda = compra + faker.number.float()
    const fechoAnterior = compra - faker.number.float()
    const dataAtualizacao = faker.date.recent({ days: 3 }).toISOString()

    const fila = {
      moeda: 'USD',
      nome: 'Dólar',
      compra,
      venda,
      fechoAnterior,
      dataAtualizacao,
    }

    const ok = guardarCotizacionesBr([fila])
    expect(ok).toBe(true)
    expect(fs.existsSync(archivoBD)).toBe(true)

    const db = new Database(archivoBD)
    const count = db.prepare('SELECT COUNT(*) as c FROM cotacoes').get().c
    const usd = db.prepare('SELECT * FROM cotacoes WHERE moeda = ?').get('USD')
    db.close()

    expect(count).toBe(1)
    expect(usd).toBeTruthy()
    expect(usd.compra).toBeCloseTo(compra, 2)
  })

  it('realiza upsert en ejecuciones sucesivas sin duplicar filas', async () => {
    const { guardarCotizacionesBr } = await import('@/br/db.br.js')

    const compra1 = faker.number.float()
    const venda1 = compra1 + faker.number.float()
    const fechoAnterior1 = compra1 - faker.number.float()
    const dataAtualizacao1 = new Date(Date.now() + 1000).toISOString()

    const primera = {
      moeda: 'USD',
      nome: 'Dólar',
      compra: compra1,
      venda: venda1,
      fechoAnterior: fechoAnterior1,
      dataAtualizacao: dataAtualizacao1,
    }

    const compra2 = compra1 + faker.number.float()
    const venda2 = compra2 + faker.number.float()
    const dataAtualizacao2 = new Date(Date.parse(dataAtualizacao1) + faker.number.int({ min: 1_000, max: 10_000 })).toISOString()

    const segunda = {
      ...primera,
      compra: compra2,
      venda: venda2,
      dataAtualizacao: dataAtualizacao2,
    }

    guardarCotizacionesBr([primera])
    guardarCotizacionesBr([segunda])

    const db = new Database(archivoBD)
    const count = db.prepare('SELECT COUNT(*) as c FROM cotacoes').get().c
    const usd = db.prepare('SELECT * FROM cotacoes WHERE moeda = ?').get('USD')
    db.close()

    expect(count).toBe(1)
    expect(usd).toBeTruthy()
    expect(usd.compra).toBeCloseTo(compra2, 2)
    expect(usd.venda).toBeCloseTo(venda2, 2)
  })
})
