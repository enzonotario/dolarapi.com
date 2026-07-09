import fs from 'node:fs'
import Database from 'better-sqlite3'

export function asegurarDirectorio(ruta) {
  try {
    fs.mkdirSync(ruta, {
      recursive: true,
    })
  }
  catch (e) {}

  return true
}

export function abrirBD(rutaDb) {
  return new Database(rutaDb)
}

export function asegurarTabla(db, sql) {
  db.exec(sql)
}

export function prepararUpsert(db, sql) {
  return db.prepare(sql)
}

export function ejecutarTransaccion(db, stmt, items) {
  const tx = db.transaction((rows) => {
    for (const row of rows) {
      stmt.run(row)
    }
  })

  tx(items)
}

export function cerrarBD(db) {
  db.close()
}
