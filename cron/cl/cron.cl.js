import tryToCatch from 'try-to-catch'
import extraer from '@/cl/investing.extractor.cl.js'
import { grupo, logError } from '@/log.js'
import {
  escribirRutaRegion,
  leerRutaRegion,
} from '@/utils/rutas.js'

export default async function () {
  const log = grupo({
    cron: 'cron.cl.js',
  })

  log.info('Inicio')

  const valoresActuales = (await leerRutaRegion('cl', '/cotizaciones')) || []

  const [error, valoresNuevos] = await tryToCatch(extraer)

  if (error) {
    logError(log, error)
    log.info('Fin')
    return
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
    escribirRutaRegion('cl', `/cotizaciones/${moneda}`, cotizacion)
  })

  escribirRutaRegion('cl', '/cotizaciones', cotizaciones)

  log.info('Fin')
}
