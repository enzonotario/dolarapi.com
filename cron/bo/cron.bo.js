import tryToCatch from 'try-to-catch'
import extraerDolarOficial from '@/bo/bcb.extractor.js'
import extraerDolarBinance from '@/bo/binance-bo.extractor.js'
import { grupo, logError } from '@/log.js'
import { escribirRutaRegion } from '@/utils/rutas.js'

export default async function () {
  const log = grupo({
    cron: 'cron.bo.js',
  })

  log.info('Inicio')

  const [error] = await tryToCatch(guardarDolares, log)

  if (error) {
    logError(log, error)
  }

  log.info('Fin')
}

async function guardarDolares(log) {
  const dolares = []

  const [errorOficial, dolarOficial] = await tryToCatch(extraerDolarOficial)

  if (errorOficial) {
    logError(log, errorOficial, {
      extractor: 'bcb.extractor.js',
    })
  }
  else {
    dolares.push(dolarOficial)
  }

  const [errorBinance, dolarBinance] = await tryToCatch(extraerDolarBinance)

  if (errorBinance) {
    logError(log, errorBinance, {
      extractor: 'binance-bo.extractor.js',
    })
  }
  else {
    dolares.push(dolarBinance)
  }

  dolares.map((cotizacion) => {
    escribirRutaRegion('bo', `/dolares/${cotizacion.casa}`, cotizacion)
  })

  escribirRutaRegion('bo', '/dolares', dolares)
}
