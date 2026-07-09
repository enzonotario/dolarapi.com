import tryToCatch from 'try-to-catch'
import { grupo, logError } from '@/log.js'
import { escribirRutaRegion } from '@/utils/rutas.js'
import { abrirBD, cerrarBD } from '@/utils/sqlite.js'
import extraerDolarBcv, { extraerEurBcv } from '@/ve/bcv.extractor.js'
import { guardarCotizacionesVe } from '@/ve/db.ve.js'
import extraerDolarYadio, { extraerEurYadio } from '@/ve/yadio.extractor.js'

const RUTA_DB = './datos/ve/ve.sqlite'

function fechaHoyVe() {
  const offsetMs = -4 * 60 * 60 * 1000

  return new Date(new Date().getTime() + offsetMs)
    .toISOString()
    .slice(0, 10)
}

function clampearFechaHoy(fechaActualizacion) {
  if (!fechaActualizacion)
    return fechaActualizacion

  const hoy = fechaHoyVe()
  const fechaStr = fechaActualizacion.slice(0, 10)

  if (fechaStr > hoy)
    return `${hoy}${fechaActualizacion.slice(10)}`

  return fechaActualizacion
}

function yaExisteOficialEnDb(db, moneda, fechaActualizacion) {
  const fecha = fechaActualizacion.slice(0, 10)

  return (db
    .prepare('SELECT 1 FROM cotizaciones WHERE moneda = ? AND fuente = \'oficial\' AND date(fechaActualizacion) = date(?)')
    .get(moneda, fecha) != null)
}

export default async function () {
  const log = grupo({
    cron: 'cron.ve.js',
  })

  log.info('Inicio')

  const extraido = await extraer(log)

  const [errorDb] = await tryToCatch(guardarEnDb, extraido, log)

  if (errorDb) {
    logError(log, errorDb, {
      etapa: 'guardado',
    })
  }

  const [errorEndpoints] = await tryToCatch(generarEndpoints, log)

  if (errorEndpoints) {
    logError(log, errorEndpoints, {
      etapa: 'endpoints',
    })
  }

  log.info('Fin')
}

async function extraer(log) {
  const [errorBcv, dolarBcv] = await tryToCatch(extraerDolarBcv)

  if (errorBcv) {
    logError(log, errorBcv, {
      extractor: 'bcv.extractor.js',
    })
  }

  const [errorEurBcv, euroBcv] = await tryToCatch(extraerEurBcv)

  if (errorEurBcv) {
    logError(log, errorEurBcv, {
      extractor: 'bcv.extractor.js (EUR)',
    })
  }

  const [errorYadio, dolaresYadio] = await tryToCatch(extraerDolarYadio)

  if (errorYadio) {
    logError(log, errorYadio, {
      extractor: 'yadio.extractor.js',
    })
  }

  const [errorEurYadio, euroYadio] = await tryToCatch(extraerEurYadio)

  if (errorEurYadio) {
    logError(log, errorEurYadio, {
      extractor: 'yadio.extractor.js (EUR)',
    })
  }

  return {
    dolarBcv,
    dolaresYadio,
    euroBcv,
    euroYadio,
  }
}

async function guardarEnDb({ dolarBcv, dolaresYadio, euroBcv, euroYadio }, log) {
  const cotizaciones = []

  if (dolarBcv) {
    cotizaciones.push({
      moneda: 'USD',
      fuente: 'oficial',
      nombre: 'Dólar',
      compra: dolarBcv.compra,
      venta: dolarBcv.venta,
      promedio: dolarBcv.promedio,
      fechaActualizacion: dolarBcv.fechaActualizacion,
    })
  }

  if (euroBcv) {
    cotizaciones.push({
      moneda: 'EUR',
      fuente: 'oficial',
      nombre: 'Euro',
      compra: euroBcv.compra,
      venta: euroBcv.venta,
      promedio: euroBcv.promedio,
      fechaActualizacion: euroBcv.fechaActualizacion,
    })
  }

  if (dolaresYadio && dolaresYadio.length > 0) {
    dolaresYadio.forEach((d) => {
      cotizaciones.push({
        moneda: 'USD',
        fuente: 'paralelo',
        nombre: 'Paralelo',
        compra: d.compra,
        venta: d.venta,
        promedio: d.promedio,
        fechaActualizacion: d.fechaActualizacion,
      })
    })
  }

  if (euroYadio) {
    cotizaciones.push({
      moneda: 'EUR',
      fuente: 'paralelo',
      nombre: 'Paralelo',
      compra: euroYadio.compra,
      venta: euroYadio.venta,
      promedio: euroYadio.promedio,
      fechaActualizacion: euroYadio.fechaActualizacion,
    })
  }

  if (cotizaciones.length === 0)
    return

  const db = abrirBD(RUTA_DB)
  const cotizacionesNuevas = cotizaciones.filter(c => c.fuente !== 'oficial' || !yaExisteOficialEnDb(db, c.moneda, c.fechaActualizacion))

  cerrarBD(db)

  if (cotizacionesNuevas.length > 0) {
    const [error] = await tryToCatch(guardarCotizacionesVe, cotizacionesNuevas)

    if (error) {
      logError(log, error, {
        accion: 'guardarCotizacionesVe',
      })
    }
  }
}

async function generarEndpoints(log) {
  const db = abrirBD(RUTA_DB)
  const hoy = fechaHoyVe()

  function obtenerActual(moneda, fuente) {
    return db
      .prepare(`SELECT * FROM cotizaciones
       WHERE moneda = ? AND fuente = ? AND date(fechaActualizacion) <= ?
       ORDER BY fechaActualizacion DESC
       LIMIT 1`)
      .get(moneda, fuente, hoy)
  }

  function filaAEndpoint(fila) {
    if (!fila)
      return null

    return {
      ...fila,
      fechaActualizacion: clampearFechaHoy(fila.fechaActualizacion),
    }
  }

  const usdOficial = filaAEndpoint(obtenerActual('USD', 'oficial'))
  const usdParalelo = filaAEndpoint(obtenerActual('USD', 'paralelo'))
  const eurOficial = filaAEndpoint(obtenerActual('EUR', 'oficial'))
  const eurParalelo = filaAEndpoint(obtenerActual('EUR', 'paralelo'))

  const orden = ['oficial', 'paralelo']

  const dolares = [usdOficial, usdParalelo]
    .filter(Boolean)
    .sort((a, b) => orden.indexOf(a.fuente) - orden.indexOf(b.fuente))

  dolares.forEach(d => escribirRutaRegion('ve', `/dolares/${d.fuente}`, d))
  escribirRutaRegion('ve', '/dolares', dolares)

  const cotizaciones = [usdOficial, eurOficial].filter(Boolean)
  escribirRutaRegion('ve', '/cotizaciones', cotizaciones)

  const euros = [eurOficial, eurParalelo]
    .filter(Boolean)
    .sort((a, b) => orden.indexOf(a.fuente) - orden.indexOf(b.fuente))

  euros.forEach(e => escribirRutaRegion('ve', `/euros/${e.fuente}`, e))
  escribirRutaRegion('ve', '/euros', euros)

  const rutas = [{
    moneda: 'USD',
    fuente: 'oficial',
    ruta: '/historicos/dolares/oficial',
  }, {
    moneda: 'USD',
    fuente: 'paralelo',
    ruta: '/historicos/dolares/paralelo',
  }, {
    moneda: 'EUR',
    fuente: 'oficial',
    ruta: '/historicos/euros/oficial',
  }, {
    moneda: 'EUR',
    fuente: 'paralelo',
    ruta: '/historicos/euros/paralelo',
  }]

  const dolaresHistoricos = []
  const eurosHistoricos = []
  const dolaresPorFecha = {}
  const eurosPorFecha = {}

  for (const { moneda, fuente, ruta } of rutas) {
    const filas = db
      .prepare(`SELECT * FROM cotizaciones
       WHERE (moneda, fuente, fechaActualizacion) IN (
         SELECT moneda, fuente, max(fechaActualizacion)
         FROM cotizaciones
         WHERE moneda = ? AND fuente = ?
         GROUP BY moneda, fuente, date(fechaActualizacion)
       )
       ORDER BY fechaActualizacion`)
      .all(moneda, fuente)

    const historico = []

    for (const f of filas) {
      const item = {
        fuente,
        compra: f.compra,
        venta: f.venta,
        promedio: f.promedio,
        fecha: f.fechaActualizacion.slice(0, 10),
      }

      if (moneda === 'EUR')
        item.moneda = 'EUR'

      historico.push(item)

      const fecha = item.fecha
      const [yyyy, mm, dd] = fecha.split('-')

      await escribirRutaRegion('ve', `${ruta}/${yyyy}/${mm}/${dd}`, item)

      if (moneda === 'USD') {
        if (!dolaresPorFecha[fecha])
          dolaresPorFecha[fecha] = []

        dolaresPorFecha[fecha].push(item)
      }
      else {
        if (!eurosPorFecha[fecha])
          eurosPorFecha[fecha] = []

        eurosPorFecha[fecha].push(item)
      }
    }

    await escribirRutaRegion('ve', ruta, historico)

    if (moneda === 'USD') {
      dolaresHistoricos.push({
        fuente,
        historico,
      })
    }
    else {
      eurosHistoricos.push({
        fuente,
        historico,
      })
    }
  }

  cerrarBD(db)

  for (const fecha of Object.keys(dolaresPorFecha)) {
    const [yyyy, mm, dd] = fecha.split('-')
    const items = dolaresPorFecha[fecha]

    items.sort((a, b) => orden.indexOf(a.fuente) - orden.indexOf(b.fuente))
    await escribirRutaRegion('ve', `/historicos/dolares/${yyyy}/${mm}/${dd}`, items)
  }

  for (const fecha of Object.keys(eurosPorFecha)) {
    const [yyyy, mm, dd] = fecha.split('-')
    const items = eurosPorFecha[fecha]

    items.sort((a, b) => orden.indexOf(a.fuente) - orden.indexOf(b.fuente))
    await escribirRutaRegion('ve', `/historicos/euros/${yyyy}/${mm}/${dd}`, items)
  }

  function aplanarPorDia(historicos) {
    const porFecha = {}

    historicos.forEach(({ fuente, historico }) => {
      historico.forEach((item) => {
        const fecha = item.fecha

        if (!porFecha[fecha])
          porFecha[fecha] = {}

        porFecha[fecha][fuente] = item
      })
    })
    const fechas = Object
      .keys(porFecha)
      .sort()

    const resultado = []

    fechas.forEach((fecha) => {
      ['oficial', 'paralelo'].forEach((fuente) => {
        const item = porFecha[fecha][fuente]

        if (item) {
          resultado.push({
            fuente,
            compra: item.compra,
            venta: item.venta,
            promedio: item.promedio,
            fecha,
          })
        }
      })
    })
    return resultado
  }

  await escribirRutaRegion('ve', '/historicos/dolares', aplanarPorDia(dolaresHistoricos))
  await escribirRutaRegion('ve', '/historicos/euros', aplanarPorDia(eurosHistoricos).map(e => ({
    ...e,
    moneda: 'EUR',
  })))
}
