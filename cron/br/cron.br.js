import tryToCatch from 'try-to-catch'
import { guardarCotizacionesBr } from '@/br/db.br.js'
import extraer from '@/br/investing.extractor.br.js'
import { grupo, logError } from '@/log.js'
import {
  escribirRutaRegion,
  leerRutaRegion,
} from '@/utils/rutas.js'

export default async function () {
  const log = grupo({
    cron: 'cron.br.js',
  })

  log.info('Inicio')

  const valoresActuales = (await leerRutaRegion('br', '/cotacoes')) || []

  const [errorExtraccion, valoresNuevos] = await tryToCatch(extraer)

  if (errorExtraccion) {
    logError(log, errorExtraccion)
    log.info('Fin')
    return
  }

  const cotizaciones = valoresActuales.map((cotizacion) => {
    const cotizacionNueva = valoresNuevos.find(item => item && item.moeda === cotizacion.moeda)

    if (cotizacionNueva) {
      return cotizacionNueva
    }

    return cotizacion
  })

  valoresNuevos.forEach((cotizacionNueva) => {
    if (cotizacionNueva && !cotizaciones.find(c => c.moeda === cotizacionNueva.moeda)) {
      cotizaciones.push(cotizacionNueva)
    }
  })

  cotizaciones.map((cotizacion) => {
    const moneda = cotizacion.moeda.toLowerCase()
    escribirRutaRegion('br', `/cotacoes/${moneda}`, cotizacion)
  })

  escribirRutaRegion('br', '/cotacoes', cotizaciones)

  const [errorDb] = await tryToCatch(guardarCotizacionesBr, cotizaciones)

  if (errorDb) {
    logError(log, errorDb, {
      accion: 'guardarCotizacionesBr',
    })
  }

  log.info('Fin')
}
