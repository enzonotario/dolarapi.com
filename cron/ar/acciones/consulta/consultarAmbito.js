import tryToCatch from 'try-to-catch'
import { extraerAmbito } from '@/ar/acciones/extraccion/extraerAmbito.js'
import { grupo, logError } from '@/log.js'
import { leerRuta } from '@/utils/rutas.js'
import { unificar } from '@/utils/unificar.js'

async function nuevosValores() {
  const log = grupo({
    cron: 'cron.ar.js',
    accion: 'consultarAmbito',
  })

  const [error, dolares] = await tryToCatch(extraerAmbito)

  if (error) {
    logError(log, error, {
      extractor: 'extraerAmbito',
    })
    return []
  }

  return dolares
}

export async function consultarAmbito() {
  const valoresActuales = await leerRuta('/ambito/dolares')

  const valoresNuevos = await nuevosValores()

  const dolares = unificar(valoresActuales, valoresNuevos, 'casa')

  return dolares
}
