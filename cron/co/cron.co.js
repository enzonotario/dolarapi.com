import tryToCatch from 'try-to-catch'
import { guardarCotizacionesCo } from '@/co/db.co.js'
import extraer from '@/co/investing.extractor.co.js'
import extraerTrm from '@/co/trm.extractor.co.js'
import { grupo, logError } from '@/log.js'
import {
  escribirRutaRegion,
  leerRutaRegion,
} from '@/utils/rutas.js'

export default async function () {
  const log = grupo({
    cron: 'cron.co.js',
  })

  try {
    log.info('Inicio')

    const valoresActuales = (await leerRutaRegion('co', '/cotizaciones')) || []

    const valoresNuevos = await extraer()

    const [errorTrm, trm] = await tryToCatch(extraerTrm)

    if (errorTrm) {
      logError(log, errorTrm, 'Error al extraer TRM')
    }

    const cotizaciones = valoresActuales.map((cotizacion) => {
      const cotizacionNueva = valoresNuevos.find(item => item && item.moneda === cotizacion.moneda)

      if (cotizacionNueva) {
        return cotizacionNueva
      }

      return cotizacion
    })

    valoresNuevos.forEach((cotizacionNueva) => {
      if (cotizacionNueva && !cotizaciones.find(c => c.moneda === cotizacionNueva.moneda)) {
        cotizaciones.push(cotizacionNueva)
      }
    })

    cotizaciones.map((cotizacion) => {
      const moneda = cotizacion.moneda.toLowerCase()
      escribirRutaRegion('co', `/cotizaciones/${moneda}`, cotizacion)
    })

    escribirRutaRegion('co', '/cotizaciones', cotizaciones)

    if (!errorTrm && trm) {
      escribirRutaRegion('co', '/trm', trm)
    }

    try {
      guardarCotizacionesCo(cotizaciones)
    }
    catch (e) {
      logError(log, e, 'Error al guardar en la base de datos')
    }

    log.info('Fin')
  }
  catch (error) {
    logError(log, error)
  }
}
