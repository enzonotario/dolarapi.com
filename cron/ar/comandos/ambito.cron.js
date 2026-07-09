import tryToCatch from 'try-to-catch'
import { consultarAmbito } from '@/ar/acciones/consulta/consultarAmbito.js'
import { grupo, logError } from '@/log.js'
import { escribirRuta } from '@/utils/rutas.js'

export async function cronAmbito() {
  const log = grupo({
    cron: 'cron.ar.js',
    comando: 'cronAmbito',
  })

  const [error, dolares] = await tryToCatch(consultarAmbito)

  if (error) {
    logError(log, error)
    return
  }

  escribirRuta(`/ambito/dolares`, dolares)

  dolares.map((dolar) => {
    escribirRuta(`/ambito/dolares/${dolar.casa}`, dolar)
  })
}
