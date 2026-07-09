import ar from '@/ar/cron.ar.js'
import bo from '@/bo/cron.bo.js'
import br from '@/br/cron.br.js'
import cl from '@/cl/cron.cl.js'
import co from '@/co/cron.co.js'
import { grupo } from '@/log.js'
import mx from '@/mx/cron.mx.js'
import uy from '@/uy/cron.uy.js'
import ve from '@/ve/cron.ve.js'

const regiones = [{
  id: 'ar',
  fn: ar,
}, {
  id: 'cl',
  fn: cl,
}, {
  id: 've',
  fn: ve,
}, {
  id: 'uy',
  fn: uy,
}, {
  id: 'mx',
  fn: mx,
}, {
  id: 'bo',
  fn: bo,
}, {
  id: 'br',
  fn: br,
}, {
  id: 'co',
  fn: co,
}]

export async function iniciar(comando) {
  const log = grupo({
    cron: 'app.js',
  })

  const regionFiltro = process.env.CRON_REGION
  const aEjecutar = regionFiltro ? regiones.filter(r => r.id === regionFiltro) : regiones

  if (aEjecutar.length === 0) {
    log.info(`Región "${regionFiltro}" no encontrada`)
    return
  }

  log.info(`Iniciando cron${regionFiltro ? ` (${regionFiltro})` : ''}`)

  for (const { fn } of aEjecutar) {
    await fn()
  }

  log.info('Cron finalizado')
}
