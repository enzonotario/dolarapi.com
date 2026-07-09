import tryToCatch from 'try-to-catch'
import { grupo, logError } from '@/log.js'
import extraerDolar from '@/mx/banxico.extractor.js'
import { escribirRutaRegion } from '@/utils/rutas.js'

export default async function () {
  const log = grupo({
    cron: 'cron.mx.js',
  })

  log.info('Inicio')

  const [error] = await tryToCatch(guardarCotizaciones, log)

  if (error) {
    logError(log, error)
  }

  log.info('Fin')
}

async function guardarCotizaciones(log) {
  const [error, dolar] = await tryToCatch(extraerDolar)

  if (error) {
    logError(log, error, {
      extractor: 'banxico.extractor.js',
    })
    return
  }

  const cotizaciones = [dolar].filter(c => c !== null)

  cotizaciones.map((cotizacion) => {
    escribirRutaRegion('mx', `/cotizaciones/${cotizacion.moneda.toLowerCase()}`, cotizacion)
  })

  escribirRutaRegion('mx', '/cotizaciones', cotizaciones)
}
