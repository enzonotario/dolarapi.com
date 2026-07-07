import path from 'node:path'
import Database from 'better-sqlite3'
import { describe, expect, it } from 'vitest'
import { faker } from '@faker-js/faker'
import { abrirBD, asegurarDirectorio, asegurarTabla, cerrarBD, ejecutarTransaccion, prepararUpsert } from '@/utils/sqlite.js'

const directorioTemporal = path.join('datos', 'br')
const archivoBD = path.join(directorioTemporal, 'br.sqlite')

describe('utils/sqlite.js en contexto BR', () => {
  it('crea la base de datos y guarda filas', () => {
    asegurarDirectorio(directorioTemporal)
    const db = abrirBD(archivoBD)
    asegurarTabla(
      db,
      'CREATE TABLE IF NOT EXISTS cotacoes_utils (moeda TEXT PRIMARY KEY, nome TEXT, compra REAL, venda REAL, fechoAnterior REAL, dataAtualizacao TEXT)',
    )
    const stmt = prepararUpsert(
      db,
      'INSERT INTO cotacoes_utils (moeda, nome, compra, venda, fechoAnterior, dataAtualizacao) VALUES (@moeda, @nome, @compra, @venda, @fechoAnterior, @dataAtualizacao) ON CONFLICT(moeda) DO UPDATE SET nome=excluded.nome, compra=excluded.compra, venda=excluded.venda, fechoAnterior=excluded.fechoAnterior, dataAtualizacao=excluded.dataAtualizacao',
    )

    const compra = faker.number.float()
    const venda = compra + faker.number.float()
    const fechoAnterior = compra - faker.number.float()
    const dataAtualizacao = faker.date.recent({ days: 3 }).toISOString()

    const fila = { moeda: 'USD', nome: 'Dólar', compra, venda, fechoAnterior, dataAtualizacao }

    ejecutarTransaccion(db, stmt, [fila])
    cerrarBD(db)

    const db2 = new Database(archivoBD)
    const count = db2.prepare('SELECT COUNT(*) as c FROM cotacoes_utils').get().c
    const usd = db2.prepare('SELECT * FROM cotacoes_utils WHERE moeda = ?').get('USD')
    db2.close()

    expect(count).toBe(1)
    expect(usd).toBeTruthy()
    expect(usd.compra).toBeCloseTo(compra, 2)
  })

  it('hace upsert sobre la misma clave', () => {
    const db = abrirBD(archivoBD)
    const stmt = prepararUpsert(
      db,
      'INSERT INTO cotacoes_utils (moeda, nome, compra, venda, fechoAnterior, dataAtualizacao) VALUES (@moeda, @nome, @compra, @venda, @fechoAnterior, @dataAtualizacao) ON CONFLICT(moeda) DO UPDATE SET nome=excluded.nome, compra=excluded.compra, venda=excluded.venda, fechoAnterior=excluded.fechoAnterior, dataAtualizacao=excluded.dataAtualizacao',
    )

    const compra1 = faker.number.float()
    const venda1 = compra1 + faker.number.float()
    const fechoAnterior1 = compra1 - faker.number.float()
    const dataAtualizacao1 = new Date(Date.now() + 1000).toISOString()

    const fila1 = { moeda: 'USD', nome: 'Dólar', compra: compra1, venda: venda1, fechoAnterior: fechoAnterior1, dataAtualizacao: dataAtualizacao1 }

    const compra2 = compra1 + faker.number.float()
    const venda2 = compra2 + faker.number.float()
    const dataAtualizacao2 = new Date(Date.parse(dataAtualizacao1) + faker.number.int({ min: 1_000, max: 10_000 })).toISOString()

    const fila2 = { ...fila1, compra: compra2, venda: venda2, dataAtualizacao: dataAtualizacao2 }

    ejecutarTransaccion(db, stmt, [fila1])
    ejecutarTransaccion(db, stmt, [fila2])
    cerrarBD(db)

    const db2 = new Database(archivoBD)
    const count = db2.prepare('SELECT COUNT(*) as c FROM cotacoes_utils').get().c
    const usd = db2.prepare('SELECT * FROM cotacoes_utils WHERE moeda = ?').get('USD')
    db2.close()

    expect(count).toBe(1)
    expect(usd).toBeTruthy()
    expect(usd.compra).toBeCloseTo(compra2, 2)
    expect(usd.venda).toBeCloseTo(venda2, 2)
  })
})
